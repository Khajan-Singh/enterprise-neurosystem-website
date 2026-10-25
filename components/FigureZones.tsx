export const ZONES = [
  { number: "01", title: "Sense" },
  { number: "02", title: "Cross-correlate" },
  { number: "03", title: "Warn & advise" },
];

/**
 * The three stage labels, on the same `gap-6` grid as the step cards below so
 * each zone sits over its card, inset 24px to start on the card's text edge
 * (`p-6`). Desktop/tablet only: on phones the figure is a single card that
 * plays all three stages in place (see LayerStack's phone header).
 */
export function ZoneHeader({ className = "" }: { className?: string }) {
  return (
    <div className={`grid-cols-3 gap-6 ${className}`}>
      {ZONES.map((zone) => (
        <p
          key={zone.number}
          className="px-6 text-sm font-semibold text-ink"
        >
          {zone.title}
        </p>
      ))}
    </div>
  );
}

/** Hairlines at the centre of each grid gap, i.e. between the cards below. */
export function ZoneDividers({ className = "" }: { className?: string }) {
  return (
    <>
      {[
        "calc((100% - 48px) / 3 + 12px)",
        "calc((100% - 48px) * 2 / 3 + 36px)",
      ].map((left) => (
        <div
          key={left}
          aria-hidden="true"
          className={`absolute top-0 bottom-0 w-px bg-ink/10 ${className}`}
          style={{ left }}
        />
      ))}
    </>
  );
}
