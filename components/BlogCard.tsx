import Image from "next/image";
import Link from "next/link";
import { formatPostDate, type Post } from "@/lib/blog";

/**
 * A post on the /blog index.
 *
 * The card spans the full Container width, like the cards on /workstreams and
 * /partners — it's the text inside that is line-length-capped (`max-w-2xl`),
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
            alt={post.heroAlt || ""}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 768px) 256px, (min-width: 640px) 640px, 100vw"
            // the topmost card is above the fold and is the index's LCP
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
          />
        </div>
      )}

      <div className="flex flex-col">
        <p className="text-sm text-ink-muted">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </p>

        <h2 className="mt-2 max-w-2xl font-display text-xl font-semibold tracking-tight text-ink">
          {post.title}
        </h2>

        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
          {post.excerpt}
        </p>

        <span className="mt-4 w-fit text-sm font-medium text-accent">
          Read post
          <span
            aria-hidden="true"
            className="ml-1 inline-block transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
