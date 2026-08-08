import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { AmbientShadow } from "@/components/AmbientShadow";
import { Reveal } from "@/components/Reveal";
import { BlogCard } from "@/components/BlogCard";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Updates from the Enterprise Neurosystem community — AI for climate action, the NLIP standard, sensor deployments and grand challenge results.",
  alternates: {
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-page-header">
        <AmbientShadow opacity={0.07} />
        <Container className="relative pb-10 pt-14 sm:pt-20">
          <Reveal>
            <SectionHeading
              title="Blog"
              description="Notes from the community on AI for climate action, open standards and the projects we're building."
            />
          </Reveal>
        </Container>
      </section>

      <section>
        {/* full-width card list, matching /workstreams */}
        <Container className="flex flex-col gap-8 py-20">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={0.05 * Math.min(i, 4)}>
              <BlogCard post={post} eager={i === 0} />
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
