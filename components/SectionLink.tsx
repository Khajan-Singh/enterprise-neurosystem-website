import Link from "next/link";
import { ArrowRight } from "@/components/ArrowRight";

/**
 * The ghost-pill link that closes a homepage section ("Read the full vision",
 * "See all projects", ...). This was hand-written three times on the homepage
 * with a typed "→" on the end; it's one component now so the three read as the
 * same control, and the arrow — a real icon, not a Unicode glyph — carries the
 * only motion, sliding on hover/focus.
 */
export function SectionLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-full border border-ink/60 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/5"
    >
      {children}
      <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
    </Link>
  );
}
