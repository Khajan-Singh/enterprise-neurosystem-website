import { CSSProperties, ReactNode } from "react";
import { mulberry32 } from "@/lib/rng";
import { ZoneDividers, ZoneHeader } from "@/components/FigureZones";

/*
  Overlay: five data layers, each lighting a scatter of raster cells. Every
  layer contains the same hidden cluster, but mixed among its own unrelated
  cells it reads as noise. Pressed together in zone 02 (multiply blending),
  only the cells all five agree on go dark, and once they land that
  agreement locks in solid while the single readings recede. Zone 03 keeps
  only the agreement, outlined, and raises the warning.

  The plates are the site's own cards laid flat: Paper White, the two-tone
  `.card-textured` border, and the `.card-surface` resting shadow projected
  onto the ground plane (the conclusion gets the hover shadow, as if lifted).

  Each zone's plate is sized from the figure's width via container query
  units, so the isometric stack scales with the card columns below it.

  Motion lives in globals.css ("How it works: Overlay"). On the homepage it
  runs in `mode="scroll"` inside the pinned hold; `timed` is what browsers
  without scroll timelines get, played once when the figure reveals.
*/
const COLS = 12;
const ROWS = 8;
const CLUSTER: [number, number][] = [
  [7, 2], [8, 2], [6, 3], [7, 3], [8, 3], [7, 4], [8, 4], [9, 4],
];
// Dense enough that each layer has clumps of its own, so the cluster can't be
// picked out of any single layer. Capped by the pool: 5 layers × 17 must fit in
// the 88 non-cluster cells without reuse, or two layers could agree by chance.
const NOISE_PER_LAYER = 17;
const key = (c: number, r: number) => `${c},${r}`;
const clusterKeys = new Set(CLUSTER.map(([c, r]) => key(c, r)));

// Each layer's own cells are drawn from one shuffled pool without replacement,
// so the cluster is the *only* place all five layers coincide.
const rand = mulberry32(7);
const pool: [number, number][] = [];
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) if (!clusterKeys.has(key(c, r))) pool.push([c, r]);
for (let i = pool.length - 1; i > 0; i--) {
  const j = Math.floor(rand() * (i + 1));
  [pool[i], pool[j]] = [pool[j], pool[i]];
}

// Ordered as the sensing is, from orbit down to the ground. Species (acoustic
// and behavioural monitoring) is the source only this network has. Top of the
// stack last in DOM order, so it paints over the layers beneath.
const LAYERS = ["Soil", "Species", "Ocean", "Atmosphere", "Satellite"].map((label, i) => ({
  label,
  dy: [2, 1, 0, -1, -2][i],
  lit: [...CLUSTER, ...pool.slice(i * NOISE_PER_LAYER, (i + 1) * NOISE_PER_LAYER)],
}));

// Cluster outline: every cell edge that doesn't border another cluster cell.
const contour = CLUSTER.flatMap(([c, r]) => {
  const edges: string[] = [];
  if (!clusterKeys.has(key(c, r - 1))) edges.push(`M${c} ${r}h1`);
  if (!clusterKeys.has(key(c, r + 1))) edges.push(`M${c} ${r + 1}h1`);
  if (!clusterKeys.has(key(c - 1, r))) edges.push(`M${c} ${r}v1`);
  if (!clusterKeys.has(key(c + 1, r))) edges.push(`M${c + 1} ${r}v1`);
  return edges;
}).join("");
const centroid = CLUSTER.reduce(
  (acc, [c, r]) => ({ x: acc.x + (c + 0.5) / CLUSTER.length, y: acc.y + (r + 0.5) / CLUSTER.length }),
  { x: 0, y: 0 },
);

const ALL_CELLS = Array.from({ length: COLS * ROWS }, (_, i) => [i % COLS, Math.floor(i / COLS)] as const);

/*
  Shadows are box-shadows on the plate itself, so they're rasterized once and
  ride the transform for free (an animated drop-shadow filter would re-run every
  frame). A screen-space offset of (0, d) is the plate-local offset (-√2·d, √2·d)
  under rotateZ(-45deg) rotateX(60deg), so these are the `.card-surface` rest and
  hover shadows from globals.css, converted.
*/
const SURFACES = {
  card: {
    background: "var(--color-bg)",
    border: "1.25px solid color-mix(in srgb, var(--color-ink) 30%, var(--color-line))",
    boxShadow: "-1.4px 1.4px 2px rgba(22,23,26,0.05), -20px 20px 28px -12px rgba(22,23,26,0.18)",
  },
  lifted: {
    background: "var(--color-bg)",
    border: "1.25px solid color-mix(in srgb, var(--color-ink) 45%, var(--color-line))",
    boxShadow: "-2.8px 2.8px 4px rgba(22,23,26,0.06), -34px 34px 40px -14px rgba(22,23,26,0.24)",
  },
  // The moving copies in zone 02: outline only, so the card beneath shows
  // through and the multiply blend has white to darken.
  ghost: {
    background: "transparent",
    border: "1.25px solid color-mix(in srgb, var(--color-ink) 18%, transparent)",
    boxShadow: "none",
  },
} satisfies Record<string, CSSProperties>;

const Tile = ({ c, r, opacity, className }: { c: number; r: number; opacity: number; className?: string }) => (
  <rect
    className={className}
    x={c + 0.18}
    y={r + 0.18}
    width="0.64"
    height="0.64"
    rx="0.14"
    fill="var(--color-accent)"
    fillOpacity={opacity}
  />
);

function Plate({
  className,
  zoneX,
  dy = 0,
  surface,
  size = "var(--pw)",
  grid = true,
  children,
  style,
}: {
  className: string;
  zoneX: string;
  dy?: number;
  surface: keyof typeof SURFACES;
  /** Plate width; zone 01's deck uses the smaller --pw1. */
  size?: string;
  grid?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`lay-plate absolute ${className}`}
      style={
        {
          left: zoneX,
          top: "50%",
          width: size,
          height: `calc(${size} * 2 / 3)`,
          // DESIGN.md rounded.md: rounded.lg (the cards' 16px) reads as a
          // pill at plate size
          borderRadius: "8px",
          transform: `translate(-50%, -50%) translateY(calc(var(--sp) * ${dy})) rotateX(60deg) rotateZ(-45deg)`,
          ...SURFACES[surface],
          ...style,
        } as CSSProperties
      }
    >
      <svg viewBox={`0 0 ${COLS} ${ROWS}`} className="h-full w-full overflow-visible" aria-hidden="true">
        {grid &&
          ALL_CELLS.map(([c, r]) => (
            <circle key={key(c, r)} cx={c + 0.5} cy={r + 0.5} r="0.075" fill="var(--color-net-line)" fillOpacity="0.55" />
          ))}
        {children}
      </svg>
    </div>
  );
}

const Z1 = "calc(var(--z) * var(--z1))";
const Z2 = "calc(var(--z) * 1.5 + 24px)";
const Z3 = "calc(var(--z) * 2.5 + 48px)";

export function LayerStack({ mode = "timed" }: { mode?: "timed" | "scroll" }) {
  const halo = `lay-halo-${mode}`;
  return (
    <div
      data-mode={mode}
      role="img"
      aria-label="Five data layers (satellite, atmosphere, ocean, species, soil) each show scattered readings. Stacked together, only the cells all five agree on stand out, revealing one cluster, which is outlined and flagged as an early warning."
    >
      <ZoneHeader />
      <div className="@container mt-4">
        <div
          // Zone 01 is a compact deck (--pw1, tight --sp) and zones 02/03 get
          // the larger --pw, so the three zones carry similar visual weight and
          // the resolved map, not the stack, is the biggest object. At five
          // layers a full-size, widely spread stack made the left third twice
          // the height of the others. Phones get bigger plates and a fixed
          // spread: at a third of 342px the desktop proportions are a smudge.
          className="lay-stage relative isolate h-[160px] [--z1:0.5] sm:[--z1:0.4] [--pw1:calc(var(--z)*0.7)] [--pw:calc(var(--z)*0.82)] [--sp:14px] sm:h-[calc(var(--z)*0.66)] sm:[--pw1:calc(var(--z)*0.44)] sm:[--pw:calc(var(--z)*0.6)] sm:[--sp:calc(var(--z)*0.075)]"
          style={{ "--z": "calc((100cqw - 48px) / 3)" } as CSSProperties}
        >
          <ZoneDividers />

          {/* Zone 01: the layers, exploded */}
          {LAYERS.map((layer, i) => (
            <Plate
              key={layer.label}
              className="lay-z1"
              zoneX={Z1}
              dy={layer.dy}
              surface="card"
              size="var(--pw1)"
              style={{ "--d": `${0.15 + (4 - i) * 0.1}s`, "--i": 4 - i } as CSSProperties}
            >
              {layer.lit.map(([c, r]) => (
                <Tile key={key(c, r)} c={c} r={r} opacity={0.82} />
              ))}
            </Plate>
          ))}
          {/*
            Each label sits level with its plate's right corner, which projects
            to (0.589, -0.059) × plate width from the plate's centre.
          */}
          {LAYERS.map((layer, i) => (
            <span
              key={layer.label}
              className="lay-label absolute hidden -translate-y-1/2 text-xs font-medium tracking-widest text-ink-muted uppercase sm:block"
              style={
                {
                  left: `calc(${Z1} + var(--pw1) * 0.589 + 16px)`,
                  top: `calc(50% + var(--sp) * ${layer.dy} - var(--pw1) * 0.059)`,
                  "--d": `${0.35 + (4 - i) * 0.1}s`,
                  "--i": 4 - i,
                } as CSSProperties
              }
            >
              {layer.label}
            </span>
          ))}

          {/* Zone 02: the same layers pressed onto one card */}
          <Plate className="lay-base" zoneX={Z2} surface="card">
            {CLUSTER.map(([c, r]) => (
              <Tile key={key(c, r)} c={c} r={r} opacity={1} className="lay-lock" />
            ))}
          </Plate>
          {LAYERS.map((layer) => (
            <Plate
              key={layer.label}
              className="lay-z2 mix-blend-multiply"
              zoneX={Z2}
              surface="ghost"
              grid={false}
              style={{ "--dy0": `calc(var(--sp) * ${layer.dy})` } as CSSProperties}
            >
              <g className="lay-lit">
                {layer.lit.map(([c, r]) => (
                  <Tile key={key(c, r)} c={c} r={r} opacity={0.42} />
                ))}
              </g>
            </Plate>
          ))}

          {/* Zone 03: only what all five agree on */}
          <Plate className="lay-z3" zoneX={Z3} surface="lifted">
            <defs>
              <radialGradient id={halo}>
                <stop offset="0" style={{ stopColor: "var(--color-net-core)", stopOpacity: 0.45 }} />
                <stop offset="1" style={{ stopColor: "var(--color-net-core)", stopOpacity: 0 }} />
              </radialGradient>
            </defs>
            {CLUSTER.map(([c, r]) => (
              <Tile key={key(c, r)} c={c} r={r} opacity={1} />
            ))}
            <path
              className="lay-contour"
              d={contour}
              pathLength={1}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="0.06"
              strokeLinecap="round"
            />
            {/* The neural globe's node: an orange core in a soft glow. */}
            <circle className="lay-ring" cx={centroid.x} cy={centroid.y} r="0.42" fill="none" stroke="var(--color-net-core)" strokeWidth="0.07" />
            <g className="lay-mark">
              <circle cx={centroid.x} cy={centroid.y} r="1.5" fill={`url(#${halo})`} />
              <circle cx={centroid.x} cy={centroid.y} r="0.36" fill="var(--color-net-core)" />
            </g>
          </Plate>
          <span
            // Phones: zone 03 is narrower than the phrase, which ran it across the
            // zone divider, so it wraps to two centred lines within its column.
            className="lay-warn absolute w-(--z) -translate-x-1/2 text-center text-xs font-semibold tracking-widest text-ink uppercase sm:w-auto sm:whitespace-nowrap"
            style={{ left: Z3, top: "calc(50% + var(--pw) * 0.3 + 18px)" }}
          >
            Early warning
          </span>
        </div>
      </div>
    </div>
  );
}
