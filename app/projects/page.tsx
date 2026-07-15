import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { CTASection } from "@/components/CTASection";
import { AmbientShadow } from "@/components/AmbientShadow";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Nine sensor and AI projects — from beehives to satellites — built by the Enterprise Neurosystem community to monitor and manage climate change.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-page-header">
        <AmbientShadow opacity={0.07} />
        <Container className="relative grid gap-8 pb-10 pt-14 sm:pt-20 md:grid-cols-2 md:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Community"
              title="Projects"
              description="We anticipate deploying hundreds of non-intrusive sensor networks across a multitude of species in nature. This includes forests and fungi, ant colonies, beehives, mussels, birds, kelp, coral reefs, and various mammal and plant species that can be monitored for real-time climate impact and predictive analysis."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-ink-muted sm:text-lg md:mt-11">
              When integrated with sensors like satellites, atmospheric and
              water quality indicators, underground monitoring and other
              systems, a comprehensive multi-layered neurology for the
              planet is formed. One that allows deeper analysis of climate
              change patterns, leads to new discoveries and corrective
              actions, and fosters a deeper understanding of
              humanity&rsquo;s role in the preservation of our environment.
            </p>
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.name} delay={0.04 * (i % 3)}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Platform work happens in the workstreams"
        description="The digital asset catalog and AI signal processing framework are where these projects plug in."
        primary={{ href: "/workstreams", label: "See workstreams" }}
        secondary={{ href: "/contact", label: "Get involved" }}
      />
    </>
  );
}
