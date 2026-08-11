import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@/components/ArrowRight";

/**
 * The site's one arrow-pill link. Every pill that carries an arrow goes through
 * here — the homepage section closers ("Read the full vision", "See all
 * projects"), the hero's primary/secondary pair, the 404's homepage link, the
 * partners case-study link, and the "Back to all projects" links on the project
 * detail pages. Those last three used to be hand-written pills with a typed
 * "→"/"←" inside the label, which rendered in the body font rather than as the
 * site's drawn glyph and had no hover motion.
 *
 * `variant` picks the fill (solid = primary, ghost = secondary); `direction`
 * flips the arrow to the left and moves it ahead of the label, for links that
 * back out of a page rather than advance into one.
 */
export function SectionLink({
  href,
  children,
  variant = "ghost",
  direction = "forward",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "ghost" | "solid";
  direction?: "forward" | "back";
  className?: string;
}) {
  const fill =
    variant === "solid"
      ? "bg-ink text-bg transition-opacity hover:opacity-85"
      : "border border-ink/60 text-ink transition-colors hover:border-ink hover:bg-ink/5";

  const slide =
    direction === "back"
      ? "group-hover:-translate-x-1 group-focus-visible:-translate-x-1"
      : "group-hover:translate-x-1 group-focus-visible:translate-x-1";

  const Arrow = direction === "back" ? ArrowLeft : ArrowRight;
  const arrow = (
    <Arrow className={`transition-transform duration-200 ${slide}`} />
  );

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium ${fill} ${className}`}
    >
      {direction === "back" && arrow}
      {children}
      {direction === "forward" && arrow}
    </Link>
  );
}
