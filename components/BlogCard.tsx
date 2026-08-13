import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ArrowRight";
import { formatPostDate, type Post } from "@/lib/blog";

/**
 * A post on the /blog index.
 *
 * The card spans the full Container width, like the cards on /partners and
 * /press — it's the text inside that is line-length-capped (`max-w-2xl`),
 * not the card. DESIGN.md's `max-w-3xl` rule is about long-form prose
 * (Mission, Charter, and a post's own body), not card lists.
 */
export function BlogCard({ post, eager = false }: { post: Post; eager?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-surface card-surface-hover card-textured group flex flex-col gap-6 rounded-2xl p-6 sm:p-8 md:flex-row md:items-start md:gap-8 md:p-10"
    >
      {post.hero && (
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl md:w-64">
          <Image
            src={post.hero}
            // Deliberately empty: the whole card is one link, so the image's
            // alt text is concatenated into that link's accessible name. The
            // title right beside it already names the destination, and
            // `heroAlt` is a full sentence — announcing both makes the link
            // name a paragraph. The description isn't lost; the same image
            // carries it in the post body, where it's the only label it has.
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            // The md branch matches `md:w-64`. Below that the image spans the
            // Container's content box, which is the viewport minus its px-6 /
            // sm:px-8 gutters — not the full viewport.
            sizes="(min-width: 768px) 256px, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 3rem)"
            // the topmost card is above the fold and is the index's LCP
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
          />
        </div>
      )}

      {/* min-w-0 so a long unbroken token in a title wraps instead of forcing
          the flex row wider than the card. */}
      <div className="flex min-w-0 flex-col">
        <p className="text-sm text-ink-muted">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </p>

        {/* h3, matching BoardCard / ProjectCard / DeploymentCard. The page's
            own SectionHeading is the h2, so a card title can't also be one.
            `text-pretty` because these titles run past 120 characters and wrap
            to three or four lines, which strands a single word on the last one. */}
        <h3 className="mt-2 max-w-2xl font-display text-xl font-semibold tracking-tight text-pretty text-ink">
          {post.title}
        </h3>

        {/* Clamped so the row of cards keeps a regular rhythm: these excerpts
            are Medium's own auto-generated ones and already trail off mid
            sentence, so the fourth line was never a sentence ending anyway. */}
        <p className="mt-3 line-clamp-3 max-w-2xl text-base leading-relaxed text-ink-muted">
          {post.excerpt}
        </p>

        <span className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent">
          Read post
          <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
