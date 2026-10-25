export function SectionHeading({
  title,
  description,
  align = "left",
  as: Tag = "h2",
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
  /**
   * The heading level. `h2` is right for a mid-page section, which is most
   * uses. A page-header band is the page's *own* title and should pass `h1`
   * so the document doesn't open at level 2. The visual treatment is
   * identical either way, only the outline changes.
   */
  as?: "h1" | "h2";
}) {
  // There is deliberately no eyebrow slot. The small uppercase label that
  // used to sit above a heading ("How it works", "Why it matters") repeated
  // what the heading already said. If a label carries real information, put
  // it in the title.
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <Tag className="font-display text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl">
        {title}
      </Tag>
      {description && (
        <p
          // Never `text-balance`: balancing shrinks a paragraph to whatever
          // width evens out its lines, so a centered description pulled in from
          // its measure and read as a narrow column.
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
