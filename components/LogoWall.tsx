/**
 * The organizations the consortium works with, set as a typeset list.
 *
 * This used to be a "logo wall" of rounded pills with each name typed inside,
 * the stock text-wordmark wall. Most of these organizations (UN bodies,
 * ministries, universities) have no logo we could honestly use, so the
 * names are the content: set large, in columns, with nothing around them.
 */
export function LogoWall({
  organizations,
  className = "",
}: {
  organizations: string[];
  className?: string;
}) {
  return (
    <ul
      className={`columns-2 gap-x-8 font-display text-base leading-snug font-semibold text-ink sm:columns-3 sm:text-lg ${className}`}
    >
      {organizations.map((org) => (
        <li key={org} className="break-inside-avoid py-1">
          {org}
        </li>
      ))}
    </ul>
  );
}

/**
 * The original pill wall: a small label over a centred, wrapping row of
 * organization names, each in its own card-style pill. Kept for /nlip, where
 * the user preferred the pills; the homepage and /partners use the typeset
 * list above.
 */
export function PillWall({
  label,
  organizations,
}: {
  label: string;
  organizations: string[];
}) {
  return (
    <div>
      <p className="text-center text-xs font-medium uppercase tracking-widest text-ink-muted underline underline-offset-7">
        {label}
      </p>
      {/*
        Two failure modes to stay between. gap-x-8 / gap-y-3 (32px against 12px)
        pulled the rows apart sideways while stacking them almost on top of each
        other, so the wrap points read as ragged. Dropping to an even 12px fixed
        the raggedness but packed the bordered pills into a solid mass.
        24px across / 16px down keeps the two gutters in proportion and gives
        each pill room to read as its own object.
      */}
      <ul className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-4">
        {organizations.map((org) => (
          <li
            key={org}
            className="card-surface card-surface-hover card-textured rounded-full px-4 py-1.5 font-display text-sm font-semibold text-ink"
          >
            {org}
          </li>
        ))}
      </ul>
    </div>
  );
}
