export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /**
   * The heading level. `h2` is right for a mid-page section, which is most
   * uses. A page-header band is the page's *own* title and should pass `h1`
   * so the document doesn't open at level 2 — the visual treatment is
   * identical either way, only the outline changes.
   */
  as?: "h1" | "h2";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
      )}
      <Tag
        className={`font-display text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl ${
          eyebrow ? "mt-3" : ""
        }`}
      >
        {title}
      </Tag>
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
