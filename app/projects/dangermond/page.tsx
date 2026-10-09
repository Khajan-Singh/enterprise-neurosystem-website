import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionLink } from "@/components/SectionLink";
import { AmbientShadow } from "@/components/AmbientShadow";
import { Reveal } from "@/components/Reveal";

export const metadata = pageMetadata({
  title: "Dangermond Preserve",
  description:
    "The first US deployment of the Enterprise Neurosystem architecture, built with JPL/Caltech and The Nature Conservancy at the Dangermond Preserve.",
  path: "/projects/dangermond",
});

const breadcrumbs = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Dangermond Preserve", path: "/projects/dangermond" },
]);

export default function DangermondPage() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <section className="relative overflow-hidden border-b border-line bg-page-header">
        <AmbientShadow opacity={0.07} />
        <Container className="relative pt-4 pb-10">
          <SectionHeading
            as="h1"
            title="Dangermond Preserve"
            description="The first US deployment of the Enterprise Neurosystem architecture — a global data fabric integrating satellite data, atmospherics, ground sensors and multi-species analysis, in partnership with JPL/Caltech."
          />
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
                  of the EN architecture in the US, incorporating integrated
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
                  alt="Layered sandstone sea cliffs and coastal scrub along the Dangermond Preserve shoreline, with surf breaking on rocks below and the Pacific stretching to the horizon."
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
                infrastructure like this, layering in live satellite,
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
                  alt="A wall display showing The Nature Conservancy's historical imagery map of the Jack and Laura Dangermond Preserve, its boundary outlined over satellite imagery beside a scrollable list of 29 layers dating from 1850 onward."
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
          <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16">
            <Reveal className="flex flex-col">
              <p className="text-xs font-medium uppercase tracking-widest text-accent">
                Executive sponsor
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                David Schimel, JPL
              </h2>
              <div className="mt-5 flex flex-col gap-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                <p>
                  David Schimel (Nobel Peace Prize) is the JPL executive
                  sponsor for this project, pictured here with Ravi Sinha.
                </p>
              </div>
              <div className="mt-10 lg:mt-auto lg:pt-10">
                <SectionLink href="/projects" direction="back">
                  Back to all projects
                </SectionLink>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card-surface card-surface-hover card-textured relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl">
                <Image
                  src="/jpl/schimel-and-sinha.jpg"
                  alt="David Schimel and Ravi Sinha standing side by side in front of a weathered barn door at the Dangermond Preserve."
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 24rem, 100vw"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
