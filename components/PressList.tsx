import { ArrowRight } from "@/components/ArrowRight";
import { pressItems, type PressItem } from "@/data/press";

/**
 * The /press coverage list.
 *
 * Hairline rows rather than cards: every entry is four short fields pointing at
 * someone else's site, and the list only grows — a stack of `card-textured`
 * cards would read as noise long before it read as an archive. The row idiom
 * (divided `<ul>`, fixed-width left column, arrow that slides on hover) is the
 * one already used by the "Suggested entry points" list in `app/not-found.tsx`.
 *
 * Plain `<a>`, not `next/link`: every href is external, so there is nothing to
 * prefetch or client-route.
 */

// UTC is pinned for the same reason `formatPostDate` pins it in `lib/blog.ts`:
// a bare "YYYY-MM-DD" parses as midnight UTC, which is the previous day for
// anyone west of it, so an unpinned formatter shows the wrong month on the 1st.
const monthYear = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  timeZone: "UTC",
});

function formatPressDate(date: string) {
  return monthYear.format(new Date(date));
}

// ISO day strings sort correctly as strings — no Date objects, same as
// `getAllPosts` in `lib/blog.ts`.
function newestFirst(items: PressItem[]) {
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}

export function PressList() {
  const items = newestFirst(pressItems);

  if (items.length === 0) {
    return (
      <p className="max-w-2xl text-base leading-relaxed text-ink-muted">
        Coverage is being collected. In the meantime, the community writes up its
        own work on the blog.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item) => (
        <li key={item.url}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-1 py-5 transition-colors hover:text-accent sm:flex-row sm:items-baseline sm:gap-4"
          >
            {/* Fixed column so headlines start on one axis instead of stepping
                in and out with the length of the outlet's name. A long outlet
                may wrap, but the date is kept unbreakable so it never splits
                across lines as "Jan / 2026". */}
            <span className="text-sm text-ink-muted sm:w-56 sm:shrink-0">
              {item.outlet}
              <span className="whitespace-nowrap">
                <span aria-hidden="true"> · </span>
                <time dateTime={item.date}>{formatPressDate(item.date)}</time>
              </span>
            </span>

            <span className="flex-1 font-display text-lg font-semibold text-ink transition-colors group-hover:text-accent">
              {item.title}
            </span>

            <ArrowRight className="hidden shrink-0 self-center text-ink-muted transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 sm:block" />
          </a>
        </li>
      ))}
    </ul>
  );
}
