"use client";

import { useEffect, useRef } from "react";

/**
 * NeuralGlobe
 * --------------------------------------------------------------
 * A slowly rotating point-sphere of nodes with light pulses traveling
 * along the connecting arcs — an abstract read of "an overarching AI
 * network for the world." Node/edge styling matches the logo mark
 * (white nodes with a warm orange core, brand-blue connections).
 *
 * Self-contained canvas animation: no dependencies, respects
 * prefers-reduced-motion, and pauses when off-screen or the tab is
 * hidden.
 */

type Point3 = { x: number; y: number; z: number };
type Edge = [number, number];
type Pulse = { edge: Edge; t: number; speed: number };

const NODE_COUNT = 120;
const NEIGHBORS_PER_NODE = 5;
const ROTATION_SPEED = (2 * Math.PI) / 90; // radians/sec — full turn every ~90s
const TILT = 0.35; // fixed X-axis tilt, radians
const MAX_PULSES = 7;
// The sphere turns 4°/sec, so a 60fps frame advances an equatorial node by
// ~0.4px — full refresh rate buys nothing visible here and doubles the raster
// cost (~570 canvas draw ops per frame). The threshold is 90% of the interval
// so a display whose frames don't divide evenly into 33.3ms still lands on 30
// rather than slipping to the next multiple.
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1 / TARGET_FPS;
const FRAME_THRESHOLD = FRAME_INTERVAL * 0.9;
const PULSE_SPAWN_INTERVAL = 0.5; // seconds
const PULSE_SPEED_MIN = 0.35; // fraction of edge per second
const PULSE_SPEED_MAX = 0.6;

function fibonacciSphere(count: number): Point3[] {
  const points: Point3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // 1 -> -1
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    points.push({ x, y, z });
  }
  return points;
}

function buildEdges(points: Point3[], k: number): Edge[] {
  const edgeSet = new Set<string>();
  const edges: Edge[] = [];

  for (let i = 0; i < points.length; i++) {
    const distances: { j: number; d: number }[] = [];
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      const a = points[i];
      const b = points[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dz = a.z - b.z;
      distances.push({ j, d: dx * dx + dy * dy + dz * dz });
    }
    distances.sort((a, b) => a.d - b.d);
    for (let n = 0; n < k && n < distances.length; n++) {
      const j = distances[n].j;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push(i < j ? [i, j] : [j, i]);
      }
    }
  }
  return edges;
}

// Writes into `out` rather than returning a fresh object — this runs once per
// node per frame, so the allocations added up.
function rotatePointInto(
  p: Point3,
  angleY: number,
  tiltX: number,
  out: Point3,
): void {
  // Rotate around Y (spin), then apply a fixed tilt around X.
  const cosY = Math.cos(angleY);
  const sinY = Math.sin(angleY);
  const x1 = p.x * cosY + p.z * sinY;
  const z1 = -p.x * sinY + p.z * cosY;

  const cosX = Math.cos(tiltX);
  const sinX = Math.sin(tiltX);

  out.x = x1;
  out.y = p.y * cosX - z1 * sinX;
  out.z = p.y * sinX + z1 * cosX;
}

function readColor(varName: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  return value || fallback;
}

/**
 * Resolves any valid CSS color (hex, rgb(), or a keyword like "orange" —
 * which the CSS minifier substitutes for shorter hex values) to RGB
 * components, using the canvas itself as the parser instead of a
 * hand-rolled hex-only regex that silently breaks on keywords.
 */
function cssColorToRgb(value: string, fallbackHex: string): [number, number, number] {
  const probe = document.createElement("canvas").getContext("2d");
  if (!probe) return [0, 0, 0];
  probe.fillStyle = fallbackHex;
  probe.fillStyle = value;
  const normalized = probe.fillStyle;

  if (normalized.startsWith("#")) {
    const clean = normalized.slice(1);
    const num = parseInt(clean, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }
  const match = normalized.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (match) {
    return [Number(match[1]), Number(match[2]), Number(match[3])];
  }
  return [0, 0, 0];
}

// The geometry is deterministic, so build it once for the module rather than
// re-running the O(n²) neighbour search in every mount's effect.
const points = fibonacciSphere(NODE_COUNT);
const edges = buildEdges(points, NEIGHBORS_PER_NODE);

// Per-frame the drawing colours only vary in alpha. Building the rgba()
// strings up front (bucketed) avoids ~700 string allocations per frame.
const ALPHA_BUCKETS = 32;

function buildAlphaRamp(
  [r, g, b]: [number, number, number],
  maxAlpha: number,
): string[] {
  const ramp: string[] = [];
  for (let i = 0; i < ALPHA_BUCKETS; i++) {
    ramp.push(`rgba(${r}, ${g}, ${b}, ${(maxAlpha * (i + 1)) / ALPHA_BUCKETS})`);
  }
  return ramp;
}

function rampLookup(ramp: string[], alpha: number, maxAlpha: number): string {
  const i = Math.min(
    ALPHA_BUCKETS - 1,
    Math.max(0, Math.round((alpha / maxAlpha) * ALPHA_BUCKETS) - 1),
  );
  return ramp[i];
}

/**
 * A radial-gradient glow baked into a small offscreen canvas once, then
 * blitted per node with `globalAlpha`. The previous code called
 * `createRadialGradient` for every node and pulse on every frame (~127
 * gradient objects per frame, all garbage).
 */
function makeGlowSprite([r, g, b]: [number, number, number]): HTMLCanvasElement {
  const size = 64;
  const sprite = document.createElement("canvas");
  sprite.width = size;
  sprite.height = size;
  const sctx = sprite.getContext("2d");
  if (sctx) {
    const half = size / 2;
    const gradient = sctx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 1)`);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    sctx.fillStyle = gradient;
    sctx.fillRect(0, 0, size, size);
  }
  return sprite;
}

export function NeuralGlobe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    const container = canvas.parentElement;
    if (!container) return;

    const pulses: Pulse[] = [];

    const lineColor = cssColorToRgb(
      readColor("--color-net-line", "#737373"),
      "#737373",
    );
    const coreColor = cssColorToRgb(
      readColor("--color-net-core", "#ffa500"),
      "#ffa500",
    );

    const lineRamp = buildAlphaRamp(lineColor, 0.75);
    const nodeRamp = buildAlphaRamp(coreColor, 1);
    const glowSprite = makeGlowSprite(coreColor);

    // Reused every frame instead of reallocating three arrays of ~570 objects.
    const rotated: Point3[] = points.map(() => ({ x: 0, y: 0, z: 0 }));
    const projected = points.map(() => ({ x: 0, y: 0, z: 0, depthScale: 1 }));
    // Painter's-algorithm draw order. Indices < edges.length are edges, the
    // rest are nodes; `drawZ` holds each entry's depth for the sort. The order
    // array is sorted in place and reused — the sphere turns slowly, so it is
    // already nearly sorted from the previous frame.
    const drawZ = new Float32Array(edges.length + points.length);
    const drawOrder: number[] = Array.from(
      { length: edges.length + points.length },
      (_, i) => i,
    );

    const reduceMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let angle = 0;
    let spawnTimer = 0;
    let rafId = 0;
    let lastTime = performance.now();
    let running = false;
    let inView = true;

    const pulseScratch = { x: 0, y: 0, z: 0 };
    const projectedScratch = { x: 0, y: 0, z: 0, depthScale: 1 };

    function project(p: Point3, out: typeof projectedScratch) {
      const scale = Math.min(width, height) * 0.42;
      const perspective = 2.6;
      const depthScale = perspective / (perspective + p.z);
      out.x = width / 2 + p.x * scale * depthScale;
      out.y = height / 2 + p.y * scale * depthScale;
      out.z = p.z;
      out.depthScale = depthScale;
      return out;
    }

    // z is roughly in [-1, 1]; map to [0.4, 1] so far-side edges stay
    // visible instead of fading to near-nothing.
    function depthAlpha(z: number) {
      return 0.4 + ((z + 1) / 2) * 0.6;
    }

    function drawGlow(x: number, y: number, radius: number, alpha: number) {
      ctx.globalAlpha = alpha;
      ctx.drawImage(glowSprite, x - radius, y - radius, radius * 2, radius * 2);
      ctx.globalAlpha = 1;
    }

    function drawFrame(rotationAngle: number, withPulses: boolean) {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < points.length; i++) {
        rotatePointInto(points[i], rotationAngle, TILT, rotated[i]);
        project(rotated[i], projected[i]);
      }

      for (let e = 0; e < edges.length; e++) {
        drawZ[e] = (rotated[edges[e][0]].z + rotated[edges[e][1]].z) / 2;
      }
      for (let i = 0; i < points.length; i++) {
        drawZ[edges.length + i] = rotated[i].z;
      }
      drawOrder.sort((a, b) => drawZ[a] - drawZ[b]);

      ctx.lineWidth = 1.1;
      for (let n = 0; n < drawOrder.length; n++) {
        const d = drawOrder[n];

        if (d < edges.length) {
          const a = projected[edges[d][0]];
          const b = projected[edges[d][1]];
          ctx.strokeStyle = rampLookup(
            lineRamp,
            depthAlpha(drawZ[d]) * 0.75,
            0.75,
          );
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        } else {
          const p = projected[d - edges.length];
          const alpha = depthAlpha(drawZ[d]);
          const r = 1.6 + p.depthScale * 1.4;

          drawGlow(p.x, p.y, r * 3, alpha * 0.35);

          // node ball — solid orange, matching the logo mark
          ctx.fillStyle = rampLookup(nodeRamp, alpha, 1);
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (withPulses) {
        for (const pulse of pulses) {
          const a = rotated[pulse.edge[0]];
          const b = rotated[pulse.edge[1]];
          pulseScratch.x = a.x + (b.x - a.x) * pulse.t;
          pulseScratch.y = a.y + (b.y - a.y) * pulse.t;
          pulseScratch.z = a.z + (b.z - a.z) * pulse.t;
          const p = project(pulseScratch, projectedScratch);
          const fade = Math.sin(Math.PI * pulse.t); // ease in/out over the trip
          const alpha = depthAlpha(p.z) * fade;
          const r = 2.2 + p.depthScale * 1.6;

          drawGlow(p.x, p.y, r * 4, alpha * 0.9);

          ctx.fillStyle = rampLookup(nodeRamp, alpha, 1);
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function tick(now: number) {
      // Queue the next callback first so an early return still keeps the loop
      // alive; rAF stays at display rate and we simply skip the work.
      if (running) rafId = requestAnimationFrame(tick);

      const elapsed = (now - lastTime) / 1000;
      if (elapsed < FRAME_THRESHOLD) return;

      // Real elapsed time drives the motion, so rotation and pulse speeds are
      // unchanged by the cap — only how often they're sampled.
      const dt = Math.min(elapsed, 0.05);
      lastTime = now;

      angle += ROTATION_SPEED * dt;

      spawnTimer += dt;
      if (spawnTimer >= PULSE_SPAWN_INTERVAL && pulses.length < MAX_PULSES) {
        spawnTimer = 0;
        const edge = edges[Math.floor(Math.random() * edges.length)];
        pulses.push({
          edge,
          t: 0,
          speed:
            PULSE_SPEED_MIN + Math.random() * (PULSE_SPEED_MAX - PULSE_SPEED_MIN),
        });
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].t += pulses[i].speed * dt;
        if (pulses[i].t >= 1) pulses.splice(i, 1);
      }

      drawFrame(angle, true);
    }

    function start() {
      if (running) return;
      if (reduceMotionQuery.matches) {
        drawFrame(0.5, false);
        return;
      }
      running = true;
      lastTime = performance.now();
      rafId = requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
    }

    function syncRunning() {
      if (reduceMotionQuery.matches) {
        stop();
        drawFrame(0.5, false);
        return;
      }
      if (inView && !document.hidden) {
        start();
      } else {
        stop();
      }
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncRunning();
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(container);

    const onVisibilityChange = () => syncRunning();
    document.addEventListener("visibilitychange", onVisibilityChange);

    const onReduceMotionChange = () => syncRunning();
    reduceMotionQuery.addEventListener("change", onReduceMotionChange);

    syncRunning();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reduceMotionQuery.removeEventListener("change", onReduceMotionChange);
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} aria-hidden="true" className="block" />
    </div>
  );
}
