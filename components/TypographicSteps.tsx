import { CSSProperties } from "react";

const STEPS = ["01", "02", "03"];

/*
  Quiet typographic: no illustration. Three light numerals on the card grid,
  joined by hairlines that run across the gaps, so the sequence reads as one
  sentence. The last rule ends in the single orange mark.

  Not used on any page yet: it didn't make the How-it-works argument, but it
  is kept on purpose as the reference for a planned site-wide typographic
  treatment. Its motion is in globals.css ("Typographic steps"). Wrap it in
  <Reveal> to play it.
*/
export function TypographicSteps() {
  return (
    <div
      role="img"
      aria-label="Three steps in sequence: sense, cross-correlate, warn and advise."
      className="grid grid-cols-3 gap-6"
    >
      {STEPS.map((n, i) => (
        <div key={n} className="flex items-end gap-4 sm:px-6">
          <span
            className="typo-num font-display text-5xl leading-none font-extralight tracking-[-0.04em] text-ink tabular-nums sm:text-7xl lg:text-8xl"
            style={{ "--d": `${0.1 + i * 0.22}s` } as CSSProperties}
          >
            {n}
          </span>
          <span
            aria-hidden="true"
            className={`typo-rule relative mb-[0.35em] h-px flex-1 origin-left bg-ink/35 ${
              i < STEPS.length - 1 ? "-mr-2 sm:-mr-8" : ""
            }`}
            style={{ "--d": `${0.35 + i * 0.22}s` } as CSSProperties}
          >
            {i === STEPS.length - 1 && (
              <span className="typo-tick absolute top-1/2 right-0 h-3 w-[3px] -translate-y-1/2 rounded-full bg-net-core" />
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
