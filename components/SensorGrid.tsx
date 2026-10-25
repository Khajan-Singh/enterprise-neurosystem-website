import Image from "next/image";

const tiles = [
  { src: "/vision/sensor-satellite.jpg", alt: "Satellite in orbit above Earth" },
  { src: "/vision/sensor-camera.jpg", alt: "Camera trap monitoring wildlife in a forest" },
  { src: "/vision/sensor-forest.jpg", alt: "Environmental sensor embedded in forest floor" },
  { src: "/vision/sensor-river.jpg", alt: "Sensor deployed under a bridge monitoring a river" },
];

/**
 * Recreates the deck's "sensor network and AI architecture" graphic:
 * four sensing modalities (satellites, cameras, forest and river
 * sensors) arranged in a 2x2 grid, all feeding a single central AI
 * node — with connecting lines and a soft pulsing glow on the node to
 * read as "the AI box that connects them all."
 */
export function SensorGrid() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <line x1="38" y1="38" x2="50" y2="50" style={{ stroke: "var(--color-line)" }} strokeWidth="1" />
        <line x1="62" y1="38" x2="50" y2="50" style={{ stroke: "var(--color-line)" }} strokeWidth="1" />
        <line x1="38" y1="62" x2="50" y2="50" style={{ stroke: "var(--color-line)" }} strokeWidth="1" />
        <line x1="62" y1="62" x2="50" y2="50" style={{ stroke: "var(--color-line)" }} strokeWidth="1" />
      </svg>

      <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-3">
        {tiles.map((tile) => (
          <div
            key={tile.src}
            className="card-surface card-surface-hover card-textured relative overflow-hidden rounded-2xl"
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              className="object-cover"
              sizes="200px"
            />
          </div>
        ))}
      </div>

      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-14 w-14">
          {/*
            Radiating ring. Was an animated `boxShadow`, which repaints the
            node every frame; a scaled/faded sibling behind it stays on the
            compositor.
          */}
          <span
            aria-hidden="true"
            className="node-pulse-ring pointer-events-none absolute inset-0 rounded-full"
            style={{ background: "rgba(43,58,103,0.45)" }}
          />
          <div
            className="relative flex h-full w-full items-center justify-center rounded-full shadow-[0_8px_20px_-4px_rgba(43,58,103,0.5)]"
            style={{ background: "#2f6fed" }}
          >
            <span className="font-display text-sm font-semibold text-white">
              AI
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
