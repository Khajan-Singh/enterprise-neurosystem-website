import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { AmbientShadow } from "@/components/AmbientShadow";
import { Reveal } from "@/components/Reveal";
import { BlogCard } from "@/components/BlogCard";
import { getAllPosts } from "@/lib/blog";

// The RSS `alternates.types` link that used to be inlined here is now emitted
// by pageMetadata() on every page, so it survives the canonical being set.
export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Updates from the Enterprise Neurosystem community — AI for climate action, the NLIP standard, sensor deployments and grand challenge results.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-page-header">
        <AmbientShadow opacity={0.07} />
        <Container className="relative pt-4 pb-10">
          <Reveal>
            <SectionHeading
              as="h1"
              title="Blog"
              description="Notes from the community on AI for climate action, open standards and the projects we're building."
            />
          </Reveal>
        </Container>
      </section>

      <section>
        {/* Full-width cards; only the text inside them is line-length-capped.
            See the note in components/BlogCard.tsx. */}
        <Container className="flex flex-col gap-8 py-20">
          {posts.length === 0 ? (
            <Reveal>
              <p className="max-w-2xl text-base leading-relaxed text-ink-muted">
                Nothing published here yet. The community also posts on{" "}
                <a
                  href="https://medium.com/the-enterprise-neurosystem-blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Medium
                </a>
                .
              </p>
            </Reveal>
          ) : (
            posts.map((post, i) => (
              /* The stagger is only for the cards that are already on screen at
                 load. Below the fold each card reveals on its own as it scrolls
                 in, so a delay there isn't a stagger — it's just lag before the
                 card you scrolled to appears. */
              <Reveal key={post.slug} delay={i < 3 ? 0.05 * i : 0}>
                <BlogCard post={post} eager={i === 0} />
              </Reveal>
            ))
          )}
        </Container>
      </section>
    </>
  );
}
