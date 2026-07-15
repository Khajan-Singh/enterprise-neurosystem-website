import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { BoardCard } from "@/components/BoardCard";
import { Reveal } from "@/components/Reveal";
import { boardMembers } from "@/data/board";

export const metadata: Metadata = {
  title: "Board",
  description:
    "The Enterprise Neurosystem Governing Board — leaders from Red Hat, Kove, IBM, Stanford SLAC, Intel, and Yahoo guiding the community's strategic direction.",
};

export default function BoardPage() {
  return (
    <>
      <section className="border-b border-line bg-page-header">
        <Container className="pb-10 pt-14 sm:pt-20">
          <Reveal>
            <SectionHeading
              eyebrow="About"
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
