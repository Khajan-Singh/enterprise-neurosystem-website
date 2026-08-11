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
        className={`font-display text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl ${
          eyebrow ? "mt-3" : ""
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          // Never `text-balance`: balancing shrinks a paragraph to whatever
          // width evens out its lines, so a centered description pulled in from
          // its measure and read as a narrow column.
          //
          // Centered copy gets no `text-pretty` either. On the site's one
          // centered description (the homepage's consortium line) plain wrapping
          // at this measure ends the first line on its em dash, which is the
          // intended break; `text-pretty` re-flows to avoid the short last line
          // and drags "sharing" up beside the dash. Left-aligned copy has no
          // such break to protect and keeps the widow guard.
          className={`max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg ${
            align === "center" ? "mx-auto mt-4" : "mt-4 text-pretty"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
