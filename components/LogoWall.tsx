const defaultOrganizations = [
  "Stanford SLAC",
  "UC Berkeley",
  "IBM Research",
  "Intel",
  "Meta",
  "Reliance Jio",
  "Seagate",
  "Verizon",
  "Yahoo!",
  "EY",
];

export function LogoWall({
  label = "Participants come from organizations including",
  organizations = defaultOrganizations,
}: {
  label?: string;
  organizations?: string[];
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
        the raggedness but packed nineteen bordered pills into a solid mass.
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
