const stats = [
  { value: "190+", label: "Participants" },
  { value: "30+", label: "Companies & institutions" },
  { value: "9+", label: "Active climate/AI projects" },
  { value: "Open", label: "Research Community" },
];

/**
 * Each pair is one `dt`/`dd` group. The label used to be duplicated — an
 * `sr-only` `dt` plus a visible `p` saying the same thing — which made screen
 * readers announce it twice. The label is now the real `dt`, and
 * `flex-col-reverse` keeps the value on top visually without reordering the
 * markup (a `dd` may not precede its `dt`).
 *
 * `justify-end` is what top-aligns the values across a row: the main axis of a
 * `column-reverse` box runs bottom-to-top, so flex-end is its top. Left at the
 * default the cells pack downward, and a stat whose label wraps to two lines
 * drags its neighbour's number out of line — visible in the 2x2 mobile grid.
 *
 * No `border-y` and no padding of its own: the numbers sit directly on the page
 * between the two blue bands, which already separate this strip from what's
 * above and below it. The rules were doing that job a second time. Vertical
 * space is the calling section's to set.
 */
export function StatRow() {
  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col-reverse justify-end">
          <dt className="mt-1.5 text-sm leading-snug text-pretty text-ink-muted">
            {stat.label}
          </dt>
          <dd className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
