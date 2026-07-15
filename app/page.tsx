import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { StatRow } from "@/components/StatRow";
import { LogoWall } from "@/components/LogoWall";
import { ProjectCard } from "@/components/ProjectCard";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { NeuralGlobe } from "@/components/NeuralGlobe";
import { projects } from "@/data/projects";

const featuredProjects = projects.slice(0, 3);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-nav-line bg-nav">
        <Container className="grid gap-10 pt-12 pb-20 sm:pt-16 sm:pb-24 lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="flex flex-col gap-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-widest text-accent">
                An open source AI research community
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
                One planet. One system. One AI network built to understand it.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="max-w-2xl text-lg leading-relaxed text-ink-muted">
                The Enterprise Neurosystem is founded on the principle that all the species and ecosystems on this planet are part of a single system. And humanity has had an unprecedented impact on this system with the advent of climate change. A global-scale AI network is now required – to understand the multitude of contributing factors, and to generate new solutions to this crisis.


              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85"
                >
                  Explore Projects
                </Link>
                <Link
                  href="/mission"
                  className="rounded-full border border-ink/60 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/5"
                >
                  Read the mission
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="hidden lg:block">
            <NeuralGlobe className="aspect-square w-full" />
          </Reveal>
          <Reveal delay={0.2} className="lg:hidden">
            <NeuralGlobe className="h-64 w-full sm:h-80" />
          </Reveal>
        </Container>
      </section>

      {/* Stats */}
      <section>
        <Container>
          <Reveal>
            <StatRow />
          </Reveal>
        </Container>
      </section>

      {/* The AI Neurosystem */}
      <section className="border-t border-nav-line bg-nav">
        <Container className="grid gap-12 py-24 md:grid-cols-2 md:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Introduction"
              title="The AI Neurosystem"
              description="Like human physiology, many functions across a global network can be fully autonomic — while others demand conscious, coordinated analysis. The Enterprise Neurosystem is the final stage of that evolution: a framework that ties together AI models and data sources across the enterprise, enabling a deeper and more complete level of AI awareness and perception."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-surface flex flex-col gap-6 rounded-2xl bg-bg p-8">
              <p className="text-base leading-relaxed text-ink-muted">
                &ldquo;Humanity must directly engage with AI, as the combined
                effect of human and machine deterministic capabilities is
                beyond the power of either one alone.&rdquo;
              </p>
              <p className="text-base leading-relaxed text-ink-muted">
                Climate is where large-scale AI architecture can make the
                most impact for the global good — and where the Enterprise
                Neurosystem focuses first.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Global network / stat context */}
      <section>
        <Container className="py-24">
          <Reveal>
            <SectionHeading
              eyebrow="The Global AI Network"
              title="A consortium, not a company"
              description="Participants from companies and academic institutions collaborate in the open — sharing sensor networks, AI models, and infrastructure in a single global architecture."
              align="center"
            />
          </Reveal>
          <div className="mt-14">
            <Reveal delay={0.1}>
              <LogoWall />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Featured projects */}
      <section className="border-t border-nav-line bg-nav">
        <Container className="py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Projects"
              title="Sensors, AI, and infrastructure working as one architecture"
              description="From beehives to satellites, the community builds the sensor networks and AI models needed to monitor and manage climate change events."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.name} delay={0.05 * i}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10">
              <Link
                href="/projects"
                className="text-sm font-medium text-accent hover:underline"
              >
                See all projects →
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        title="Join a workstream"
        description="Contribute to the self-describing digital asset catalog or the AI signal processing framework — our consortium is a community, welcome to all."
        primary={{ href: "/contact", label: "Get involved" }}
        secondary={{ href: "/workstreams", label: "See workstreams" }}
      />
    </>
  );
}
