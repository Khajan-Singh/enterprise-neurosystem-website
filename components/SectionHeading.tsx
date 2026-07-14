export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl ${
          eyebrow ? "mt-3" : ""
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg ${
            align === "center" ? "mx-auto mt-4" : "mt-4"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
