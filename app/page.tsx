import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { StatRow } from "@/components/StatRow";
import { LogoWall } from "@/components/LogoWall";
import { DeploymentCard } from "@/components/DeploymentCard";
import { FlowDiagram, type FlowStep } from "@/components/FlowDiagram";
import { Reveal } from "@/components/Reveal";
import { NeuralGlobe } from "@/components/NeuralGlobe";
import { AmbientShadow } from "@/components/AmbientShadow";
import { deployments } from "@/data/projects";
import { partnerOrgs } from "@/data/partners";

const howItWorksFlow: FlowStep[] = [
  { number: "01", title: "Sense" },
  { number: "02", title: "Cross-correlate" },
  { number: "03", title: "Warn & advise" },
];

const howItWorks = [
  {
    step: "01",
    title: "Sense",
    description:
      "Satellites, atmospheric and oceanic observation, and sensors placed among key species, forests, crops and waterways monitor soil, pollution, and other areas of human impact.",
  },
  {
    step: "02",
    title: "Cross-correlate",
    description:
      "Sensor data flows to AI instances in each country for real-time pattern analysis, cross-correlated against historical data by area.",
  },
  {
    step: "03",
    title: "Warn & advise",
    description:
      "Deeper patterns emerge — deforestation, drought, wildfire risk, agricultural stress — driving accurate early warnings and course-correction recommendations.",
  },
];

const themes = [
  {
    title: "Equal access for all nations",
    description:
      "Developing nations gain access to the same shared AI resources, historical data, and models as every other country.",
  },
  {
    title: "Eliminates bias",
    description:
      "Today only a small group of wealthy nations has access to large data sets and deep environmental analysis. A single global network changes that.",
  },
  {
    title: "A Rosetta Stone for nature",
    description:
      "Over time, species communications — acoustic, behavioral — are analyzed across thousands of species, in search of patterns.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-nav-line bg-nav">
        <AmbientShadow />
        <Container className="relative grid gap-10 pt-12 pb-20 sm:pt-16 sm:pb-24 lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="flex flex-col gap-8">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-widest text-accent">
                Internet of Nature · Planetary AI · Equal Access for All
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
                A global AI architecture for environmental intelligence.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="max-w-2xl text-lg leading-relaxed text-ink-muted">
                The Enterprise Neurosystem is a single global AI neurology,
                with equal access for all nations. It analyzes natural
                systems at planetary scale — integrating satellites, and
                atmospheric, oceanic, seismic and agricultural sensors — to
                act as an early warning architecture and an AI
                recommendation engine for course-correction.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/vision"
                  className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85"
                >
                  Explore the Vision
                </Link>
                <Link
                  href="/projects"
                  className="rounded-full border border-ink/60 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/5"
                >
                  See our projects
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

      {/* How it works */}
      <section className="relative overflow-hidden border-t border-nav-line bg-nav">
        <AmbientShadow />
        <Container className="relative py-20">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="From sensor to early warning"
              description="One architecture, from the ground to orbit: sensors and satellites feed national AI instances, which cross-correlate in real time to surface patterns no single dataset could reveal alone."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 hidden lg:block">
              <FlowDiagram steps={howItWorksFlow} showTitles={false} />
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3 lg:mt-4">
            {howItWorks.map((item, i) => (
              <Reveal key={item.step} delay={0.06 * i}>
                <div className="card-surface card-surface-hover card-textured flex h-full flex-col gap-3 rounded-2xl p-6">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10">
              <Link
                href="/vision"
                className="inline-block rounded-full border border-ink/60 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/5"
              >
                Read the full vision →
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Themes: parity, bias, Rosetta Stone */}
      <section>
        <Container className="py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Why it matters"
              title="Parity, not privilege"
              description="A single unified global AI architecture, enabled by satellites, sensors and mobile networks, provides the most accurate early warning capability possible — for every nation."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {themes.map((theme, i) => (
              <Reveal key={theme.title} delay={0.06 * i}>
                <div className="card-surface card-surface-hover card-textured flex h-full flex-col gap-3 rounded-2xl p-6">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {theme.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {theme.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Flagship deployments */}
      <section className="relative overflow-hidden border-t border-nav-line bg-nav">
        <AmbientShadow />
        <Container className="relative py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Flagship deployments"
              title="Global deployments with partners"
              description="From the mountain gorillas of Bwindi to the coastline of the Dangermond Preserve, the Enterprise Neurosystem architecture is already live in the field."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {deployments.map((deployment, i) => (
              <Reveal key={deployment.slug} delay={0.06 * i}>
                <DeploymentCard deployment={deployment} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10">
              <Link
                href="/projects"
                className="inline-block rounded-full border border-ink/60 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/5"
              >
                See all projects →
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Partners logo wall */}
      <section>
        <Container className="py-12">
          <Reveal>
            <SectionHeading
              eyebrow="The Global AI Network"
              title="A consortium, not a company"
              description="Governments, research institutions, and industry collaborate in the open — sharing sensor networks, AI models, and infrastructure in a single global architecture."
              align="center"
            />
          </Reveal>
          <div className="mt-14">
            <Reveal delay={0.1}>
              <LogoWall
                label="Working with organizations including"
                organizations={partnerOrgs}
              />
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <div className="mt-10 flex justify-center">
              <Link
                href="/partners"
                className="inline-block rounded-full border border-ink/60 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/5"
              >
                See our partners & engagement →
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
