import type { Metadata } from "next";
import Link from "next/link";
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

      {/* NLIP */}
      <section className="border-t border-line">
        <Container className="py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Standards"
              title="NLIP"
              description="A GenAI-to-GenAI communications protocol, born from the Enterprise Neurosystem community and now adopted by ECMA as a global standard."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/nlip"
              className="card-surface card-surface-hover card-textured group mt-10 flex flex-col gap-6 rounded-2xl p-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  Natural Language Interaction Protocol
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
                  Proposed by Dr. Dinesh Verma (IBM Research and Enterprise
                  Neurosystem CTO) to let GenAI systems from different
                  vendors and countries understand one another — now an
                  ECMA global standard, backed by Cisco, Hewlett Packard,
                  Hitachi, IBM, Microsoft, and Red Hat.
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-accent transition-transform group-hover:translate-x-1">
                Explore NLIP
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M9.5 2.5 15 8l-5.5 5.5-1.4-1.4L11.7 8.5H1v-1h10.7L8.1 3.9z" />
                </svg>
              </span>
            </Link>
          </Reveal>
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
