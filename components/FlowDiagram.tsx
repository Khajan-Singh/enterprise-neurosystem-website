export type FlowStep = {
  number: string;
  title: string;
  description?: string;
};

/**
 * A row of connected, numbered steps with a single pulse traveling the
 * full length of the connecting line in a looping animation — visualizes
 * a linear pipeline (e.g. sensor data flowing through to an early-warning
 * recommendation). Node columns are always equal-width (not sized to
 * title length) so spacing reads as even regardless of how long each
 * step's title is. Desktop: horizontal row, line pinned to the icon
 * row's vertical center via a fixed top offset. Mobile: stacked column
 * with a vertical line. Respects prefers-reduced-motion by freezing to
 * static nodes with no traveling pulse.
 */
export function FlowDiagram({
  steps,
  detailed = false,
  showTitles = true,
}: {
  steps: FlowStep[];
  detailed?: boolean;
  showTitles?: boolean;
}) {
  const n = steps.length;
  const inset = 50 / n; // % — half a column width, so the line spans first-to-last node center

  return (
    <div>
      {/*
        Desktop: even columns, continuous line + single traveling pulse.
        `overflow-x-clip` contains the pulse runner, whose box is as wide as the
        pulse's travel distance and so sticks out past the diagram at the end of
        each loop. Clipping only the x axis leaves the nodes' drop shadows intact.
      */}
      <div className="relative hidden overflow-x-clip lg:block">
        <div
          className="absolute top-7 h-px"
          style={{
            left: `${inset}%`,
            right: `${inset}%`,
            background: "color-mix(in srgb, var(--color-ink) 30%, var(--color-line))",
          }}
        />
        {/*
          The pulse travels the length of the line. `translateX: 100%` is
          relative to the element's own width, so the runner is sized to the
          exact travel distance and the dot rides pinned to its left edge —
          that keeps this a compositor-only transform instead of an animated
          `left`, which relayouts every frame.
        */}
        <div
          className="pointer-events-none absolute top-7"
          style={{ left: `${inset}%`, right: `${inset}%` }}
        >
          <div className="flow-pulse-x relative h-0 w-full">
            <div
              className="absolute h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: "var(--color-net-core)",
                boxShadow:
                  "0 0 5px color-mix(in srgb, var(--color-net-core) 25%, transparent)",
              }}
            />
          </div>
        </div>
        <div
          className="relative grid"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        >
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center px-2 text-center">
              <div
                className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full shadow-[0_6px_16px_-4px_rgba(43,58,103,0.45)]"
                style={{ background: "var(--color-accent)" }}
              >
                <span className="font-display text-base font-semibold text-white">
                  {step.number}
                </span>
              </div>
              {showTitles && (
                <h3 className="mt-3 font-display text-base font-semibold text-ink">
                  {step.title}
                </h3>
              )}
              {detailed && step.description && (
                <p className="mx-auto mt-1 max-w-[15rem] text-sm leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: stacked column, continuous vertical line + single traveling pulse */}
      <div className="relative flex flex-col lg:hidden">
        <div
          className="absolute left-7 top-7 w-px"
          style={{
            bottom: "1.75rem",
            background: "color-mix(in srgb, var(--color-ink) 30%, var(--color-line))",
          }}
        />
        <div
          className="pointer-events-none absolute left-7 top-7"
          style={{ bottom: "1.75rem" }}
        >
          <div className="flow-pulse-y relative h-full w-0">
            <div
              className="absolute h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: "var(--color-net-core)",
                boxShadow:
                  "0 0 5px color-mix(in srgb, var(--color-net-core) 25%, transparent)",
              }}
            />
          </div>
        </div>
        {steps.map((step, i) => (
          <div
            key={step.number}
            className={`relative flex items-start gap-4 ${i < n - 1 ? "pb-8" : ""}`}
          >
            <div
              className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full shadow-[0_6px_16px_-4px_rgba(43,58,103,0.45)]"
              style={{ background: "var(--color-accent)" }}
            >
              <span className="font-display text-base font-semibold text-white">
                {step.number}
              </span>
            </div>
            {(showTitles || (detailed && step.description)) && (
              <div className="pt-3">
                {showTitles && (
                  <h3 className="font-display text-base font-semibold text-ink">
                    {step.title}
                  </h3>
                )}
                {detailed && step.description && (
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    {step.description}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
