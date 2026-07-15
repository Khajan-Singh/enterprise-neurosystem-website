const organizations = [
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
}: {
  label?: string;
}) {
  return (
    <div>
      <p className="text-center text-xs font-medium uppercase tracking-widest text-ink-muted underline underline-offset-7">
        {label}
      </p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
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
