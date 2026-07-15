import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { AmbientShadow } from "@/components/AmbientShadow";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Dangermond Preserve",
  description:
    "The first US deployment of the Enterprise Neurosystem architecture — built with JPL/Caltech and The Nature Conservancy at the Jack and Laura Dangermond Preserve.",
};

export default function DangermondPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-page-header">
        <AmbientShadow opacity={0.07} />
        <Container className="relative pb-10 pt-14 sm:pt-20">
          <Reveal>
            <SectionHeading
              eyebrow="Flagship deployment"
              title="Dangermond Preserve"
              description="The first US deployment of the Enterprise Neurosystem architecture — a global data fabric integrating satellite data, atmospherics, ground sensors and multi-species analysis, built with JPL/Caltech and The Nature Conservancy."
            />
          </Reveal>
        </Container>
      </section>

      {/* Origins */}
      <section>
        <Container className="py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-widest text-accent">
                Origins
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                From a UN University event to a JPL partnership
              </h2>
              <div className="mt-5 flex flex-col gap-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                <p>
                  The JPL and Enterprise Neurosystem engagement began at a
                  United Nations University event in Bonn, Germany. Meetings
                  were then held at JPL/Caltech and NCEAS to discuss the
                  Enterprise Neurosystem concept and architecture.
                </p>
                <p>
                  The Jack and Laura Dangermond Preserve, on the California
                  coast in Santa Barbara County, will be the first deployment
                  of the EN architecture in the US — incorporating integrated
                  satellite data, atmospherics, ground sensors and
                  multi-species analysis into a global data fabric and API
                  integration framework, imbued with AI cross-correlation.
                  Applications extend to Earth analysis and planetary
                  exploration.
                </p>
              </div>
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

      {/* Data fabric / historical imagery tool */}
      <section className="relative overflow-hidden border-t border-nav-line bg-nav">
        <AmbientShadow />
        <Container className="relative py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal className="lg:order-2">
              <p className="text-xs font-medium uppercase tracking-widest text-accent">
                A global data fabric
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Decades of imagery, cross-correlated in real time
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
                The Nature Conservancy&rsquo;s historical imagery tool for
                Dangermond already lets researchers step through the
                preserve&rsquo;s land cover from 1850 to today. The
                Enterprise Neurosystem architecture builds on top of
                infrastructure like this — layering in live satellite,
                atmospheric and ground-sensor data so historical context and
                real-time conditions can be cross-correlated by the same AI
                instance, the same way the Uganda deployment ties Bwindi and
                Lake Victoria into one frame of analysis.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="lg:order-1">
              <div className="card-surface card-surface-hover card-textured relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/jpl/dangermond-historical-imagery-tool.jpg"
                  alt="Dangermond Preserve historical imagery mapping tool"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Sponsor */}
      <section>
        <Container className="py-20">
          <Reveal>
            <div className="mx-auto flex max-w-2xl items-center gap-4 rounded-2xl border border-line p-4 sm:p-6">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full sm:h-20 sm:w-20">
                <Image
                  src="/jpl/schimel-and-sinha.jpg"
                  alt="David Schimel and Ravi Sinha"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-ink-muted sm:text-base">
                <span className="font-semibold text-ink">David Schimel</span>{" "}
                (Nobel Peace Prize) is the JPL executive sponsor for this
                project, pictured with{" "}
                <span className="font-semibold text-ink">Ravi Sinha</span>.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex justify-center">
              <Link
                href="/projects"
                className="inline-block rounded-full border border-ink/60 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink/5"
              >
                ← Back to all projects
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
