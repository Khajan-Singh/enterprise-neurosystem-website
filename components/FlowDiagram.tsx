"use client";

import { motion, useReducedMotion } from "framer-motion";

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
  const reduceMotion = useReducedMotion() ?? false;
  const n = steps.length;
  const inset = 50 / n; // % — half a column width, so the line spans first-to-last node center

  return (
    <div>
      {/* Desktop: even columns, continuous line + single traveling pulse */}
      <div className="relative hidden lg:block">
        <div
          className="absolute top-7 h-px"
          style={{
            left: `${inset}%`,
            right: `${inset}%`,
            background: "color-mix(in srgb, var(--color-ink) 30%, var(--color-line))",
          }}
        />
        {!reduceMotion && (
          <motion.div
            className="absolute top-7 h-2.5 w-2.5 -translate-y-1/2 rounded-full"
            style={{
              background: "var(--color-net-core)",
              boxShadow: "0 0 10px 2px rgba(255,165,0,0.55)",
            }}
            initial={{ left: `${inset}%`, opacity: 0 }}
            animate={{
              left: [`${inset}%`, `${100 - inset}%`],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: "easeInOut",
            }}
          />
        )}
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
        {!reduceMotion && (
          <motion.div
            className="absolute left-7 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
            style={{
              background: "var(--color-net-core)",
              boxShadow: "0 0 10px 2px rgba(255,165,0,0.55)",
            }}
            initial={{ top: "1.75rem", opacity: 0 }}
            animate={{
              top: ["1.75rem", "calc(100% - 1.75rem)"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: "easeInOut",
            }}
          />
        )}
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
