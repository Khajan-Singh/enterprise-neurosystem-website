const stats = [
  { value: "190+", label: "Participants" },
  { value: "30+", label: "Companies & institutions" },
  { value: "9", label: "Active climate/AI projects" },
  { value: "2", label: "Open workstreams" },
];

export function StatRow() {
  return (
    <dl className="grid grid-cols-2 gap-8 border-y border-line py-10 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt className="sr-only">{stat.label}</dt>
          <dd className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {stat.value}
          </dd>
          <p className="mt-1 text-sm text-ink-muted">{stat.label}</p>
        </div>
      ))}
    </dl>
  );
}
