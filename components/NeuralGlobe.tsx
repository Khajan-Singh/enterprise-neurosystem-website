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

function rotatePoint(p: Point3, angleY: number, tiltX: number): Point3 {
  // Rotate around Y (spin), then apply a fixed tilt around X.
  const cosY = Math.cos(angleY);
  const sinY = Math.sin(angleY);
  const x1 = p.x * cosY + p.z * sinY;
  const z1 = -p.x * sinY + p.z * cosY;

  const cosX = Math.cos(tiltX);
  const sinX = Math.sin(tiltX);
  const y2 = p.y * cosX - z1 * sinX;
  const z2 = p.y * sinX + z1 * cosX;

  return { x: x1, y: y2, z: z2 };
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

    const points = fibonacciSphere(NODE_COUNT);
    const edges = buildEdges(points, NEIGHBORS_PER_NODE);
    const pulses: Pulse[] = [];

    const lineColor = cssColorToRgb(
      readColor("--color-net-line", "#737373"),
      "#737373",
    );
    const coreColor = cssColorToRgb(
      readColor("--color-net-core", "#ffa500"),
      "#ffa500",
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

    function project(p: Point3) {
      const scale = Math.min(width, height) * 0.42;
      const perspective = 2.6;
      const depthScale = perspective / (perspective + p.z);
      return {
        x: width / 2 + p.x * scale * depthScale,
        y: height / 2 + p.y * scale * depthScale,
        z: p.z,
        depthScale,
      };
    }

    function drawFrame(rotationAngle: number, withPulses: boolean) {
      ctx.clearRect(0, 0, width, height);

      const rotated = points.map((p) => rotatePoint(p, rotationAngle, TILT));
      const projected = rotated.map(project);

      type Drawable =
        | { kind: "edge"; edge: Edge; z: number }
        | { kind: "node"; index: number; z: number };

      const drawables: Drawable[] = [];
      edges.forEach((edge) => {
        const z = (rotated[edge[0]].z + rotated[edge[1]].z) / 2;
        drawables.push({ kind: "edge", edge, z });
      });
      rotated.forEach((p, i) => {
        drawables.push({ kind: "node", index: i, z: p.z });
      });
      drawables.sort((a, b) => a.z - b.z);

      const depthAlpha = (z: number) => {
        // z is roughly in [-1, 1]; map to [0.4, 1] so far-side edges
        // stay visible instead of fading to near-nothing.
        return 0.4 + ((z + 1) / 2) * 0.6;
      };

      for (const d of drawables) {
        if (d.kind === "edge") {
          const [i, j] = d.edge;
          const a = projected[i];
          const b = projected[j];
          const alpha = depthAlpha(d.z) * 0.75;
          ctx.strokeStyle = `rgba(${lineColor[0]}, ${lineColor[1]}, ${lineColor[2]}, ${alpha})`;
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        } else {
          const p = projected[d.index];
          const alpha = depthAlpha(d.z);
          const r = 1.6 + p.depthScale * 1.4;

          // soft glow
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3);
          glow.addColorStop(
            0,
            `rgba(${coreColor[0]}, ${coreColor[1]}, ${coreColor[2]}, ${alpha * 0.35})`,
          );
          glow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
          ctx.fill();

          // node ball — solid orange, matching the logo mark
          ctx.fillStyle = `rgba(${coreColor[0]}, ${coreColor[1]}, ${coreColor[2]}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (withPulses) {
        for (const pulse of pulses) {
          const [i, j] = pulse.edge;
          const a = rotated[i];
          const b = rotated[j];
          const lerp = {
            x: a.x + (b.x - a.x) * pulse.t,
            y: a.y + (b.y - a.y) * pulse.t,
            z: a.z + (b.z - a.z) * pulse.t,
          };
          const p = project(lerp);
          const fade = Math.sin(Math.PI * pulse.t); // ease in/out over the trip
          const alpha = depthAlpha(p.z) * fade;
          const r = 2.2 + p.depthScale * 1.6;

          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
          glow.addColorStop(
            0,
            `rgba(${coreColor[0]}, ${coreColor[1]}, ${coreColor[2]}, ${alpha * 0.9})`,
          );
          glow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(${coreColor[0]}, ${coreColor[1]}, ${coreColor[2]}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function tick(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
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

      if (running) rafId = requestAnimationFrame(tick);
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
