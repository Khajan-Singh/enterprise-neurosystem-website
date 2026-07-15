import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { DeploymentCard } from "@/components/DeploymentCard";
import { AmbientShadow } from "@/components/AmbientShadow";
import { Reveal } from "@/components/Reveal";
import { projects, deployments } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Flagship deployments in Uganda and at the Dangermond Preserve, plus nine research workstreams — from beehives to satellites — built by the Enterprise Neurosystem community.",
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
              description="From national sensor networks in Uganda to research on beehives and mussel beds, the community builds the sensors, AI models, and infrastructure needed to monitor and manage climate change events."
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

      {/* Flagship deployments */}
      <section>
        <Container className="py-20">
          <Reveal>
            <SectionHeading
              eyebrow="In the field"
              title="Flagship deployments"
              description="Real, government-backed deployments of the Enterprise Neurosystem architecture, built with national ministries, research institutions, and local communities."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {deployments.map((deployment, i) => (
              <Reveal key={deployment.slug} delay={0.06 * i}>
                <DeploymentCard deployment={deployment} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Research workstreams */}
      <section
        id="research-workstreams"
        className="relative scroll-mt-28 overflow-hidden border-t border-nav-line bg-nav"
      >
        <AmbientShadow />
        <Container className="relative py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Earlier & ongoing"
              title="Research workstreams"
              description="We anticipate deploying hundreds of non-intrusive sensor networks across a multitude of species in nature — forests and fungi, ant colonies, beehives, mussels, birds, kelp, coral reefs, and more."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.name} delay={0.04 * (i % 3)}>
                <ProjectCard project={project} textured />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
