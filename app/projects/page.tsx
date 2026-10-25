import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowRight } from "@/components/ArrowRight";
import { ProjectCard } from "@/components/ProjectCard";
import { DeploymentCard } from "@/components/DeploymentCard";
import { AmbientShadow } from "@/components/AmbientShadow";
import { Reveal } from "@/components/Reveal";
import { projects, deployments } from "@/data/projects";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Flagship AI sensor deployments in Uganda and at the Dangermond Preserve, plus six research workstreams built by the Enterprise Neurosystem community.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-page-header">
        <AmbientShadow opacity={0.07} />
        <Container className="relative pt-4 pb-10">
          <SectionHeading
            as="h1"
            title="Projects"
            description="From Uganda’s national sensor network to beehives and mussel beds, each project adds a layer to a multi-layered neurology for the planet, joined with satellites and atmospheric, water-quality and underground sensors. Together they reveal climate patterns, lead to new discoveries and corrective action, and deepen our understanding of humanity’s role in preserving our environment."
          />
        </Container>
      </section>

      {/* Flagship deployments */}
      <section>
        <Container className="py-20">
          <Reveal>
            <SectionHeading
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
      <section className="">
        <Container className="pt-16 pb-20">
          <Reveal>
            <SectionHeading
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
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
                  Proposed by Dr. Dinesh Verma (IBM Research and Enterprise
                  Neurosystem CTO) to let GenAI systems from different
                  vendors and countries understand one another. It is now an
                  ECMA global standard, backed by Cisco, Hewlett Packard,
                  Hitachi, IBM, Microsoft, and Red Hat.
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-2 text-sm font-medium text-accent transition-transform group-hover:translate-x-1">
                Explore NLIP
                <ArrowRight />
              </span>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Research workstreams */}
      <section
        id="research-workstreams"
        className="relative scroll-mt-28 overflow-hidden bg-nav"
      >
        <AmbientShadow />
        <Container className="relative py-20">
          <Reveal>
            <SectionHeading
              title="Research workstreams"
              description="We anticipate deploying hundreds of non-intrusive sensor networks across a multitude of species in nature: forests and fungi, ant colonies, beehives, mussels, birds, kelp, coral reefs, and more."
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
