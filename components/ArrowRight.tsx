/**
 * The site's single right-arrow glyph, drawn rather than typed. It replaces the
 * literal "→" characters that had been sitting inside link text, so the arrow
 * scales with `currentColor`, aligns optically to the cap height, and can be
 * animated independently of the label.
 */
export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`h-4 w-4 fill-current ${className}`}
    >
      <path d="M9.5 2.5 15 8l-5.5 5.5-1.4-1.4L11.7 8.5H1v-1h10.7L8.1 3.9z" />
    </svg>
  );
}
