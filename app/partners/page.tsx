import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { LogoWall } from "@/components/LogoWall";
import { AmbientShadow } from "@/components/AmbientShadow";
import { Reveal } from "@/components/Reveal";
import { engagements, partnerOrgs } from "@/data/partners";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Enterprise Neurosystem's global engagement: UNFCCC and UN University programs, the AI Innovation Grand Challenge, the JPL/Caltech and Nature Conservancy partnership at Dangermond Preserve, and the partner organizations behind the work.",
};

export default function PartnersPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-page-header">
        <AmbientShadow opacity={0.07} />
        <Container className="relative pb-10 pt-14 sm:pt-20">
          <Reveal>
            <SectionHeading
              eyebrow="Community"
              title="Partners & Engagement"
              description="From UNFCCC panels at COP to JPL/Caltech laboratories, the Enterprise Neurosystem works alongside the UN system, national governments, research institutions, and industry to bring the Internet of Nature to life."
            />
          </Reveal>
        </Container>
      </section>

      {/* Engagement timeline */}
      <section>
        <Container className="py-20">
          <div className="flex flex-col gap-6">
            {engagements.map((item, i) => (
              <Reveal key={item.title} delay={0.05 * i}>
                <div
                  className={`card-surface card-surface-hover card-textured grid gap-6 rounded-2xl p-6 sm:p-8 ${
                    item.image ? "md:grid-cols-[1fr_280px] md:items-center" : ""
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">
                      {item.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-ink-muted sm:text-base">
                      {item.description}
                    </p>
                  </div>
                  {item.image && (
                    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="280px"
                      />
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* JPL / Nature Conservancy teaser */}
      <section className="relative overflow-hidden border-t border-nav-line bg-nav">
        <AmbientShadow />
        <Container className="relative py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-widest text-accent">
                United States deployment
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                CalTech / JPL and The Nature Conservancy
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
                The Jack and Laura Dangermond Preserve will be the first
                deployment of the EN architecture in the US, built with
                JPL/Caltech and The Nature Conservancy — a global data fabric
                integrating satellite data, atmospherics, ground sensors and
                multi-species analysis.
              </p>
              <Link
                href="/projects/dangermond"
                className="mt-6 inline-block rounded-full border border-ink/60 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/5"
              >
                Read the full case study →
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card-surface card-surface-hover card-textured relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/jpl/dangermond-coastline.jpg"
                  alt="Dangermond Preserve coastline"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Partner org wall */}
      <section>
        <Container className="py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Working together"
              title="Organizations we work with"
              align="center"
            />
          </Reveal>
          <div className="mt-14">
            <Reveal delay={0.1}>
              <LogoWall
                label="Governments, research institutions, and industry"
                organizations={partnerOrgs}
              />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
