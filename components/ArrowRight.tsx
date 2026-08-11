/**
 * The site's arrow glyphs, drawn rather than typed. They replace the literal
 * "→"/"←" characters that had been sitting inside link text, so the arrow
 * scales with `currentColor`, aligns optically to the cap height, and can be
 * animated independently of the label.
 *
 * `ArrowLeft` is the same path mirrored, not a second drawing — the two must
 * stay identical in weight and length, since back/forward links sit on the
 * same pages.
 */
const ARROW_PATH = "M9.5 2.5 15 8l-5.5 5.5-1.4-1.4L11.7 8.5H1v-1h10.7L8.1 3.9z";

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`h-4 w-4 fill-current ${className}`}
    >
      <path d={ARROW_PATH} />
    </svg>
  );
}

export function ArrowLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`h-4 w-4 fill-current ${className}`}
    >
      <path d={ARROW_PATH} transform="translate(16 0) scale(-1 1)" />
    </svg>
  );
}
