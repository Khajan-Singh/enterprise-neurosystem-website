"use client";

import { motion, useReducedMotion } from "framer-motion";

type Node = { x: number; y: number; r: number; label: string; kind: "sn" | "ai" | "root" };
type Edge = { from: Node; to: Node; delay: number };

// Three clusters of sensor networks (SN), each feeding one mid-tier AI
// node, all three converging on a single root AI node below. The card
// this renders into is portrait (narrower than it is tall), so the SN
// fan's horizontal spread and its vertical distance from the mid AI
// node are deliberately decoupled: FAN_ARC_R controls how wide/arced
// the fan looks (kept modest so three clusters fit side by side without
// overlapping), while FAN_LIFT is a separate, large vertical offset that
// pushes the whole fan up and away from its mid node. Coupling both to
// a single trig radius (as a true polar fan would) forces the canvas
// into a wide/landscape shape that gets badly letterboxed inside a
// portrait card; decoupling them lets the diagram stretch tall — SN
// fan up near the top, mid AI row centered lower, root AI near the
// bottom — filling the card's full height instead of leaving a long
// empty gap under a cluster of tiny nodes.
const FAN_ARC_R = 380;
const FAN_HALF_ANGLE = 36; // degrees
const FAN_LIFT = 1183;
const SN_R = 55;
const MID_R = 100;
const ROOT_R = 135;
const MID_Y = 1658;
const ROOT_GAP = 1128; // vertical distance from the mid AI row down to the root
const MARGIN = 40;

const CLUSTER_SPACING = 580;
const FAN_REACH = FAN_ARC_R * Math.sin((FAN_HALF_ANGLE * Math.PI) / 180);
const CENTER_X = CLUSTER_SPACING + FAN_REACH + SN_R + MARGIN;
const CLUSTER_CENTERS = [CENTER_X - CLUSTER_SPACING, CENTER_X, CENTER_X + CLUSTER_SPACING];
const CANVAS_W = CENTER_X * 2;
const ROOT: Node = { x: CENTER_X, y: MID_Y + ROOT_GAP, r: ROOT_R, label: "AI", kind: "root" };
const CANVAS_H = ROOT.y + ROOT.r + MARGIN;

function buildCluster(cx: number): { mid: Node; sn: Node[] } {
  const mid: Node = { x: cx, y: MID_Y, r: MID_R, label: "AI", kind: "ai" };
  const sn: Node[] = [0, 1, 2, 3, 4].map((i) => {
    const angleDeg = -FAN_HALF_ANGLE + i * (FAN_HALF_ANGLE / 2);
    const angle = (angleDeg * Math.PI) / 180;
    return {
      x: cx + FAN_ARC_R * Math.sin(angle),
      y: MID_Y - FAN_LIFT - FAN_ARC_R * Math.cos(angle),
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

// Trim each edge to the boundary of its target node (rather than its
// center) so the line visibly flows straight into the node instead of
// disappearing under it at an angle.
function trimmedEdge(edge: Edge) {
  const dx = edge.to.x - edge.from.x;
  const dy = edge.to.y - edge.from.y;
  const dist = Math.hypot(dx, dy);
  const ux = dx / dist;
  const uy = dy / dist;
  return {
    x1: edge.from.x + ux * edge.from.r,
    y1: edge.from.y + uy * edge.from.r,
    x2: edge.to.x - ux * edge.to.r,
    y2: edge.to.y - uy * edge.to.r,
  };
}

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
 * which converge on a single root AI node. Small pulses travel
 * bottom-up in a staggered, looping wave to narrate the data flow
 * described in the Architecture section's text. Respects
 * prefers-reduced-motion by rendering static nodes/edges with no pulses.
 */
export function ArchitectureDiagram() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <svg
      viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
      role="img"
      aria-label="Diagram: three clusters of sensor networks each feed a mid-tier AI node, which converge on a single root AI node."
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
      </defs>

      {/* edges */}
      {edges.map((edge, i) => {
        const { x1, y1, x2, y2 } = trimmedEdge(edge);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            style={{ stroke: "var(--color-line)" }}
            strokeWidth={3}
          />
        );
      })}

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
            fontSize={node.kind === "root" ? 62 : node.kind === "sn" ? 34 : 50}
            fontWeight={700}
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
