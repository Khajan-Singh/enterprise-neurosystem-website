const ZONES = [
  { number: "01", title: "Sense" },
  { number: "02", title: "Cross-correlate" },
  { number: "03", title: "Warn & advise" },
];

/**
 * The three stage labels, on the same `gap-6` grid as the step cards below so
 * each zone sits over its card. Inset 24px on sm+ to start on the card's text
 * edge (`p-6`); on phones the cards stack, so there's nothing to align to.
 */
export function ZoneHeader() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {ZONES.map((zone) => (
        <p
          key={zone.number}
          className="flex flex-col gap-x-2 text-xs font-medium tracking-widest text-ink-muted uppercase sm:flex-row sm:px-6"
        >
          <span className="text-accent">{zone.number}</span>
          <span>{zone.title}</span>
        </p>
      ))}
    </div>
  );
}

/** Hairlines at the centre of each grid gap, i.e. between the cards below. */
export function ZoneDividers() {
  return (
    <>
      {[
        "calc((100% - 48px) / 3 + 12px)",
        "calc((100% - 48px) * 2 / 3 + 36px)",
      ].map((left) => (
        <div
          key={left}
          aria-hidden="true"
          className="absolute top-0 bottom-0 w-px bg-ink/10"
          style={{ left }}
        />
      ))}
    </>
  );
}
