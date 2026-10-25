import { ArrowRight as PhArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { ArrowLeft as PhArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { CaretDown as PhCaretDown } from "@phosphor-icons/react/dist/ssr/CaretDown";

/**
 * The site's icons, all from Phosphor so they share one stroke and one
 * geometry. These replaced hand-drawn SVG paths. Imported per icon from the
 * `ssr` build, which works in server and client components alike and keeps
 * the rest of the set out of the bundle.
 *
 * `ArrowLeft` exists for links that back out of a page; it must match the
 * right arrow in weight, since back and forward links sit on the same pages.
 */
export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <PhArrowRight aria-hidden="true" weight="bold" className={`h-4 w-4 ${className}`} />
  );
}

export function ArrowLeft({ className = "" }: { className?: string }) {
  return (
    <PhArrowLeft aria-hidden="true" weight="bold" className={`h-4 w-4 ${className}`} />
  );
}

export function CaretDown({ className = "" }: { className?: string }) {
  return (
    <PhCaretDown aria-hidden="true" weight="bold" className={`h-3.5 w-3.5 ${className}`} />
  );
}
