import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { AmbientShadow } from "@/components/AmbientShadow";
import { Reveal } from "@/components/Reveal";
import { workstreams } from "@/data/projects";

export const metadata: Metadata = {
  title: "Workstreams",
  description:
    "The platform-level workstreams behind Enterprise Neurosystem: a self-describing digital asset catalog and an AI signal processing framework.",
};

export default function WorkstreamsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-page-header">
        <AmbientShadow opacity={0.1} />
        <Container className="relative pb-10 pt-14 sm:pt-20">
          <Reveal>
            <SectionHeading
              eyebrow="Community"
              title="Workstreams"
              description="We're targeting several platform development areas, with initial focus on a self-describing digital asset catalog and an AI signal processing framework and tools."
            />
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="flex flex-col gap-8 py-20">
          {workstreams.map((ws, i) => (
            <Reveal key={ws.name} delay={0.06 * i}>
              <article className="card-surface flex flex-col gap-4 rounded-2xl bg-bg p-8 sm:p-10">
                <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                  {ws.name}
                </h2>
                <p className="max-w-2xl text-base leading-relaxed text-ink-muted">
                  {ws.description}
                </p>
                <a
                  href={ws.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-sm font-medium text-accent hover:underline"
                >
                  View repository →
                </a>
              </article>
            </Reveal>
          ))}
        </Container>
      </section>

      <CTASection
        title="Join the effort"
        description="Interested contributors can join a workstream through community onboarding."
        primary={{ href: "/contact", label: "Get involved" }}
      />
    </>
  );
}
