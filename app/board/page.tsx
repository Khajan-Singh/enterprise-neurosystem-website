import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { BoardCard } from "@/components/BoardCard";
import { AmbientShadow } from "@/components/AmbientShadow";
import { Reveal } from "@/components/Reveal";
import { boardMembers } from "@/data/board";

export const metadata = pageMetadata({
  title: "Board",
  description:
    "The Enterprise Neurosystem Governing Board — leaders from Red Hat, Kove, IBM, Stanford SLAC, Intel, and Yahoo guiding the community's strategic direction.",
  path: "/board",
});

export default function BoardPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-page-header">
        <AmbientShadow opacity={0.07} />
        <Container className="relative py-10">
          <Reveal>
            <SectionHeading
              as="h1"
              title="Board"
              description="The Governing Board sets strategic direction for the Enterprise Neurosystem and oversees budget, policy, and community growth."
            />
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {boardMembers.map((member, i) => (
              <Reveal key={member.name} delay={0.04 * (i % 3)}>
                <BoardCard member={member} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
