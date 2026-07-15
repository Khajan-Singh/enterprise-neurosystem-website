"use client";

import { motion, useReducedMotion } from "framer-motion";

type Node = { x: number; y: number; r: number; label: string; kind: "sn" | "ai" | "root" };
type Edge = { from: Node; to: Node; delay: number };

// Three clusters of sensor networks (SN), each feeding one mid-tier AI
// node, all three converging on a single root AI node below. Cluster
// spacing is derived from the fan's own trig so adjacent clusters never
// overlap, and canvas bounds are set tight around the actual content so
// the tree fills its box instead of floating in empty space.
const FAN_DIST = 175;
const FAN_HALF_ANGLE = 65; // degrees
const SN_R = 30;
const MID_R = 46;
const MID_Y = 250;

const CLUSTER_SPACING = 420;
const CLUSTER_CENTERS = [230, 230 + CLUSTER_SPACING, 230 + CLUSTER_SPACING * 2];
const CANVAS_W = CLUSTER_CENTERS[2] + FAN_DIST + SN_R + 40;
const ROOT: Node = { x: CLUSTER_CENTERS[1], y: 590, r: 85, label: "AI", kind: "root" };
const ARROW_LEN = 110;
const CANVAS_H = ROOT.y + ROOT.r + 8 + ARROW_LEN + 40;

function buildCluster(cx: number): { mid: Node; sn: Node[] } {
  const mid: Node = { x: cx, y: MID_Y, r: MID_R, label: "AI", kind: "ai" };
  const sn: Node[] = [0, 1, 2, 3, 4].map((i) => {
    const angleDeg = -FAN_HALF_ANGLE + i * (FAN_HALF_ANGLE / 2);
    const angle = (angleDeg * Math.PI) / 180;
    return {
      x: cx + FAN_DIST * Math.sin(angle),
      y: MID_Y - FAN_DIST * Math.cos(angle),
      r: SN_R,
      label: "SN",
      kind: "sn" as const,
    };
  });
  return { mid, sn };
}

const clusters = CLUSTER_CENTERS.map(buildCluster);

const edges: Edge[] = [];
clusters.forEach((cluster, ci) => {
  cluster.sn.forEach((node, i) => {
    edges.push({ from: node, to: cluster.mid, delay: ci * 0.15 + i * 0.05 });
  });
});
clusters.forEach((cluster, ci) => {
  edges.push({ from: cluster.mid, to: ROOT, delay: 0.9 + ci * 0.1 });
});

const allNodes: Node[] = [
  ...clusters.flatMap((c) => c.sn),
  ...clusters.map((c) => c.mid),
  ROOT,
];

const fillFor = (kind: Node["kind"]) =>
  kind === "sn" ? "var(--color-net-core)" : "var(--color-accent)";

function Pulse({ edge, reduceMotion }: { edge: Edge; reduceMotion: boolean }) {
  if (reduceMotion) return null;
  return (
    <motion.circle
      r={7}
      style={{ fill: "var(--color-net-core)" }}
      filter="url(#archGlow)"
      initial={{ cx: edge.from.x, cy: edge.from.y, opacity: 0 }}
      animate={{
        cx: [edge.from.x, edge.to.x],
        cy: [edge.from.y, edge.to.y],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 0.7,
        delay: edge.delay,
        repeat: Infinity,
        repeatDelay: 3.3,
        ease: "easeInOut",
      }}
    />
  );
}

/**
 * An animated redraw of the sensor-network / AI hierarchy: three
 * clusters of "SN" sensor networks each feed a mid-tier "AI" node,
 * which converge on a single root AI node — with an arrow below
 * hinting the hierarchy continues to scale outward. Small pulses
 * travel bottom-up in a staggered, looping wave to narrate the data
 * flow described in the Architecture section's text. Respects
 * prefers-reduced-motion by rendering static nodes/edges with no pulses.
 */
export function ArchitectureDiagram() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <svg
      viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
      role="img"
      aria-label="Diagram: three clusters of sensor networks each feed a mid-tier AI node, which converge on a single root AI node that scales outward to cross-border analysis."
      className="h-full w-full"
    >
      <defs>
        <filter id="archGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker
          id="archArrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="8"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M0,0 L10,5 L0,10 z" style={{ fill: "var(--color-accent)" }} />
        </marker>
      </defs>

      {/* edges */}
      {edges.map((edge, i) => (
        <line
          key={i}
          x1={edge.from.x}
          y1={edge.from.y}
          x2={edge.to.x}
          y2={edge.to.y}
          style={{ stroke: "var(--color-line)" }}
          strokeWidth={2.5}
        />
      ))}

      {/* outward arrow below the root */}
      <line
        x1={ROOT.x}
        y1={ROOT.y + ROOT.r + 8}
        x2={ROOT.x}
        y2={ROOT.y + ROOT.r + 8 + ARROW_LEN}
        style={{ stroke: "var(--color-accent)" }}
        strokeWidth={5}
        markerEnd="url(#archArrow)"
      />
      {!reduceMotion && (
        <motion.circle
          r={6}
          style={{ fill: "var(--color-net-core)" }}
          filter="url(#archGlow)"
          initial={{ cy: ROOT.y + ROOT.r + 16, opacity: 0 }}
          animate={{
            cy: [ROOT.y + ROOT.r + 16, ROOT.y + ROOT.r + 8 + ARROW_LEN - 14],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 0.5,
            delay: 1.4,
            repeat: Infinity,
            repeatDelay: 3.5,
            ease: "easeInOut",
          }}
          cx={ROOT.x}
        />
      )}

      {/* traveling pulses */}
      {edges.map((edge, i) => (
        <Pulse key={i} edge={edge} reduceMotion={reduceMotion} />
      ))}

      {/* nodes */}
      {allNodes.map((node, i) => (
        <g key={i}>
          <circle cx={node.x} cy={node.y} r={node.r} style={{ fill: fillFor(node.kind) }} />
          <text
            x={node.x}
            y={node.y}
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fill: "#ffffff" }}
            fontSize={node.kind === "root" ? 30 : node.kind === "sn" ? 16 : 20}
            fontWeight={700}
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
