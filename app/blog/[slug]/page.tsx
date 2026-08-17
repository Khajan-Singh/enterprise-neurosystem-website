import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { AmbientShadow } from "@/components/AmbientShadow";
import { ArrowLeft } from "@/components/ArrowRight";
import { Reveal } from "@/components/Reveal";
import { PostBody } from "@/components/PostBody";
import { SectionSidebar } from "@/components/SectionSidebar";
import { formatPostDate, getAllPosts, getPostBySlug, getPostHeadings } from "@/lib/blog";
import { getAuthor } from "@/data/authors";
import { postDescriptions } from "@/data/post-descriptions";
import { OG_IMAGE } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/schema";

/** Every post is known at build time, so 404 anything else. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  // A post's own hero if it has one, otherwise the sitewide card — never an
  // empty `images`, which would leave the share as a bare link.
  const image = post.hero
    ? { url: post.hero, width: post.heroWidth, height: post.heroHeight, alt: post.heroAlt }
    : OG_IMAGE;

  // The visible card blurb on /blog stays the Medium excerpt; only the search
  // and share description prefers the hand-written override.
  const description = postDescriptions[post.mediumId] ?? post.excerpt;

  return {
    title: post.title,
    description,
    // These posts were published on Medium first and Medium canonicalises to
    // itself, so this copy defers to it rather than competing as a duplicate.
    // `types` is repeated because setting `alternates` replaces the layout's
    // copy wholesale rather than merging into it.
    alternates: {
      canonical: post.mediumUrl,
      types: { "application/rss+xml": "/blog/rss.xml" },
    },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      locale: "en_US",
      url: `/blog/${post.slug}`,
      title: post.title,
      description,
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [image.url],
    },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings = getPostHeadings(post.content);
  // Only worth a sidebar when there's something to navigate between.
  const showSidebar = headings.length >= 3;
  const author = getAuthor(post.author);

  return (
    <>
      <JsonLd data={blogPostingSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <section className="relative overflow-hidden border-b border-line bg-page-header">
        <AmbientShadow opacity={0.07} />
        <Container className="relative pb-10 pt-14 sm:pt-20">
          <Reveal>
            <div className="max-w-3xl">
              {/* SectionHeading renders an h2; a post's own title is the h1. */}
              <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {post.title}
              </h1>
              <p className="mt-4 text-sm text-ink-muted">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                {post.author && (
                  <>
                    <span aria-hidden="true"> · </span>
                    {post.author}
                    {author?.role && <span className="text-ink-muted">, {author.role}</span>}
                  </>
                )}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section>
        <Container
          className={
            showSidebar
              ? "grid gap-16 py-20 lg:grid-cols-[220px_1fr] lg:gap-20"
              : "py-20"
          }
        >
          {showSidebar && <SectionSidebar sections={headings} />}

          <div className="flex max-w-3xl flex-col gap-10">
            <Reveal>
              <PostBody post={post} />
            </Reveal>

            <div className="border-t border-line pt-8 text-sm text-ink-muted">
              <p>
                Originally published on{" "}
                <a
                  href={post.mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Medium
                </a>
                .
              </p>
              <p className="mt-2">
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-1.5 text-accent hover:underline"
                >
                  <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1 group-focus-visible:-translate-x-1" />
                  All posts
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
