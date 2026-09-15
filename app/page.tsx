import { Container } from "@/components/Container";
import { SectionLink } from "@/components/SectionLink";
import { SectionHeading } from "@/components/SectionHeading";
import { StatRow } from "@/components/StatRow";
import { LogoWall } from "@/components/LogoWall";
import { DeploymentCard } from "@/components/DeploymentCard";
import { FlowDiagram, type FlowStep } from "@/components/FlowDiagram";
import { Reveal } from "@/components/Reveal";
import { NeuralGlobe } from "@/components/NeuralGlobe";
import { AmbientShadow } from "@/components/AmbientShadow";
import { VideoEmbed } from "@/components/VideoEmbed";
import { deployments } from "@/data/projects";
import { partnerOrgs } from "@/data/partners";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  // Absolute: the layout's "%s · Enterprise Neurosystem" template would
  // otherwise render the org name twice.
  title:
    "Enterprise Neurosystem · A Global AI Architecture for Environmental Intelligence",
  absoluteTitle: true,
  description:
    "A non-profit, open source AI research community building the Internet of Nature — a planetary sensor and AI network for early warning and food security in every nation.",
  path: "/",
});

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
      "Satellites, atmospheric and oceanic observation, and sensors among species, forests, crops and waterways together monitor soil, pollution, and human impact.",
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
      "Deeper patterns emerge (deforestation, drought, wildfire risk, agricultural stress), driving accurate early warnings and course-correction recommendations.",
  },
];

const themes = [
  {
    title: "Equal access for all nations",
    description:
      "Developing nations gain access to the same shared AI resources, historical data, and models as every other country.",
  },
  {
    title: "A Rosetta Stone for nature",
    description:
      "Over time, species communications (acoustic, behavioral) are analyzed across thousands of species, in search of patterns.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-nav-line bg-nav">
        <AmbientShadow />
        <Container className="hero-in relative grid gap-10 pt-10 pb-14 sm:pt-12 sm:pb-16 lg:grid-cols-2 lg:items-center lg:gap-8">
          {/*
            Spacing here is deliberately tight: the kicker hugs the headline it
            labels (20px), then the standfirst and the buttons each sit 24px
            from what precedes them — a matched pair of gaps below the headline,
            so the whole block reads as one compact unit. A single `gap-8` on
            the column gave all three the same 32px and opened it up too much.
          */}
          {/*
            The hero animates in via the `hero-in` class on the Container
            above, NOT via `Reveal`. Two reasons, both deliberate: it is above
            the fold on every viewport, so a scroll-triggered fade would only
            ever play for a visitor who has not scrolled (and would wait on
            hydration to do it); and it arrives as one unit — copy and globe
            together, no per-element stagger. Everything below this section
            still uses `Reveal`.
          */}
          <div className="flex flex-col">
            {/*
              No `max-w-*` here: on lg the grid column is already narrower than
              max-w-3xl, and below lg the container is narrower still, so the
              cap never once applied. `text-balance` does the real work,
              evening out the four-line wrap at the 6xl size.
            */}
            <h1 className="font-display text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl">
              A global AI architecture for environmental intelligence.
            </h1>
            <div className="mt-6">
              <p className="max-w-2xl text-lg leading-relaxed text-pretty text-ink-muted">
                The Enterprise Neurosystem is a non-profit, open source AI
                research community, founded on the principle that all species
                and ecosystems on this planet are part of a single system. Given
                our reliance on it, and the challenges it now faces, humanity
                requires a real-time architecture that analyzes our environment
                at planetary scale — integrating satellites and atmospheric,
                oceanic, seismic and agricultural sensors into one AI network
                for a highly accurate early warning and course-correction
                engine.
              </p>
            </div>
            <div className="mt-6">
              <div className="flex flex-wrap gap-3">
                <SectionLink href="/vision" variant="solid">
                  Explore the Vision
                </SectionLink>
                <SectionLink href="/projects">See our projects</SectionLink>
              </div>
            </div>
          </div>

          {/*
            One instance, sized responsively — this used to be two mounted
            canvases (one hidden per breakpoint), each building the sphere's
            edge graph and allocating its own backing store.
          */}
          <NeuralGlobe className="h-64 w-full sm:h-80 lg:aspect-square lg:h-auto" />
        </Container>
      </section>

      {/*
        Stats. All of this strip's vertical space is set here rather than inside
        StatRow, so it stays on the same scale as every other section.
      */}
      <section>
        <Container className="py-12 sm:py-14">
          <Reveal>
            <StatRow />
          </Reveal>
        </Container>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden border-t border-nav-line bg-nav">
        <AmbientShadow />
        <Container className="relative py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="From sensor to early warning"
              description="One architecture, from the ground to orbit: sensors and satellites feed national AI instances, which cross-correlate in real time to surface patterns no single dataset could reveal alone."
            />
          </Reveal>
          {/*
            `columnGap={24}` matches the `gap-6` of the card grid below, so each
            numbered node sits on its card's centre. Without it the diagram's
            columns were sized from the full width while the cards' were sized
            from the width minus two gutters, putting the outer nodes ~8px off
            the cards they label.
          */}
          <Reveal delay={0.1}>
            <div className="mt-10 hidden lg:block">
              <FlowDiagram
                steps={howItWorksFlow}
                showTitles={false}
                columnGap={24}
              />
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3 lg:mt-6">
            {howItWorks.map((item, i) => (
              <Reveal key={item.step} delay={0.06 * i}>
                <div className="card-surface card-surface-hover card-textured flex h-full flex-col rounded-2xl p-6">
                  {/*
                    The step number was only ever on the diagram, leaving the
                    cards to be matched to their node by column position alone —
                    and on mobile, where the diagram is hidden, not at all. The
                    sequence is the point of this section, so each card carries
                    its own number.
                  */}
                  <p className="font-display text-xs font-semibold tracking-widest text-accent">
                    {item.step}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-balance text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-pretty text-ink-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          {/*
            The whitepaper sits here rather than in the hero on purpose: this is
            the one point on the page where the visitor has just been walked
            through the architecture, so the full technical account reads as the
            next step down rather than as a heavy ask of someone who has read
            one headline.
          */}
          <Reveal delay={0.2}>
            <div className="mt-10">
              <SectionLink
                href="/The-Enterprise-Neurosystem-Whitepaper.pdf"
                newTab
              >
                Read the whitepaper (PDF)
              </SectionLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Themes: parity, bias, Rosetta Stone */}
      <section>
        <Container className="py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="flex flex-col gap-8">
              {/*
                This heading block was a character-for-character copy of
                SectionHeading's markup. Using the component means the four
                homepage headings can never drift apart again.
              */}
              <Reveal>
                <SectionHeading
                  eyebrow="Why it matters"
                  title="Parity at planetary scale"
                  description="A single unified global AI architecture, enabled by satellites, sensors and mobile networks, provides the most accurate early warning capability possible — for every nation."
                />
              </Reveal>
              <Reveal delay={0.06}>
                <div className="card-surface card-surface-hover card-textured rounded-2xl p-6">
                  {themes.map((theme, i) => (
                    <div
                      key={theme.title}
                      className={
                        i > 0 ? "mt-6 border-t border-line pt-6" : undefined
                      }
                    >
                      <h3 className="font-display text-lg font-semibold text-balance text-ink">
                        {theme.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-pretty text-ink-muted">
                        {theme.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            {/*
              `lg:self-stretch` makes the video's black frame exactly as tall
              as the left column at every width, with the 16/9 video centred
              inside it — so the two columns end level and the surplus reads
              as letterboxing. Below `lg` the columns stack and it's inert.
            */}
            <Reveal delay={0.12} className="lg:self-stretch">
              <VideoEmbed
                id="qO8-n6vuYBA"
                title="The Enterprise Neurosystem — AIM4C Grand Challenge Announcement, COP 27"
                poster="/video/aim4c-cop27.jpg"
                caption="Bill Wright introduces the Enterprise Neurosystem at COP 27, November 2022."
                sizes="(min-width: 1024px) 576px, 100vw"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Deployments */}
      <section className="relative overflow-hidden border-t border-nav-line bg-nav">
        <AmbientShadow />
        <Container className="relative py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              title="Global deployments with partners"
              description="From the mountain gorillas of Bwindi to the coastline of the Dangermond Preserve, the Enterprise Neurosystem architecture is emerging around the world."
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
              <SectionLink href="/projects">See all projects</SectionLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Partners logo wall */}
      <section>
        <Container className="py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              title="Built as an open consortium"
              description="Governments, research institutions, and industry collaborate in the open — sharing sensor networks, AI models, and infrastructure in a single global architecture."
              align="center"
            />
          </Reveal>
          {/*
            mt-6, not the mt-12 the other sections use: the description above
            sits mt-4 under its title, so it should sit close to the label
            below it too — otherwise it hangs off the heading with 48px of air
            beneath it and reads as part of the title rather than the lead-in
            to the wall. Equal-ish gaps either side keep it centred between.
          */}
          <div className="mt-6">
            <Reveal delay={0.1}>
              <LogoWall
                label="Working with organizations including"
                organizations={partnerOrgs}
              />
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <div className="mt-10 flex justify-center">
              <SectionLink href="/partners">
                See our partners &amp; engagement
              </SectionLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
