import type { CSSProperties } from "react";

type Node = { x: number; y: number; r: number; label: string; kind: "sn" | "ai" | "root" };
type Edge = { from: Node; to: Node; delay: number };

// Three clusters of sensor networks (SN), each feeding one mid-tier AI
// node, all three converging on a single root AI node below. The card
// this renders into is wide (full content width, modest height), so the
// canvas is deliberately landscape: three clusters sit side by side with
// generous horizontal room, and each cluster's SN fan is a true circular
// fan (FAN_DIST from its mid AI node) rather than needing the width/height
// decoupling a tall, narrow card would require. Cluster spacing is
// derived from the fan's own trig so adjacent clusters' SN nodes never
// overlap, and canvas bounds are set tight around the actual content so
// the tree fills its box instead of floating in empty space.
const FAN_DIST = 430;
const FAN_HALF_ANGLE = 34; // degrees
const SN_R = 60;
const MID_R = 105;
const ROOT_R = 130;
const MID_Y = 540;
const ROOT_GAP = 340; // vertical distance from the mid AI row down to the root
const MARGIN = 40;

const CLUSTER_SPACING = 650;
const FAN_REACH = FAN_DIST * Math.sin((FAN_HALF_ANGLE * Math.PI) / 180);
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
clusters.forEach((cluster) => {
  cluster.sn.forEach((node) => {
    edges.push({ from: node, to: cluster.mid, delay: 0 });
  });
});
clusters.forEach((cluster) => {
  edges.push({ from: cluster.mid, to: ROOT, delay: 2 });
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

function Pulse({ edge }: { edge: Edge }) {
  return (
    <circle
      className="arch-pulse"
      cx={edge.from.x}
      cy={edge.from.y}
      r={7}
      style={
        {
          fill: "var(--color-net-core)",
          "--dx": `${edge.to.x - edge.from.x}px`,
          "--dy": `${edge.to.y - edge.from.y}px`,
          animationDelay: `${edge.delay}s`,
        } as CSSProperties
      }
      filter="url(#archGlow)"
    />
  );
}

/**
 * An animated redraw of the sensor-network / AI hierarchy: three
 * clusters of "SN" sensor networks each feed a mid-tier "AI" node,
 * which converge on a single root AI node. Small pulses travel
 * top-down (SN → mid AI → root AI) in a looping wave to narrate the
 * data flow described in the Architecture section's text. All SN→mid
 * pulses fire in unison, then all mid→root pulses fire in unison after
 * a fixed delay, so the wave reads as two synchronized tiers cascading
 * downward rather than a per-node trickle; duration/repeatDelay are kept
 * slow so the motion reads as a smooth drift rather than a quick blip.
 * Respects prefers-reduced-motion by rendering static nodes/edges with
 * no pulses.
 */
export function ArchitectureDiagram() {
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
        <Pulse key={i} edge={edge} />
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
