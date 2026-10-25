import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionLink } from "@/components/SectionLink";
import { LogoWall } from "@/components/LogoWall";
import { AmbientShadow } from "@/components/AmbientShadow";
import { Reveal } from "@/components/Reveal";
import { engagements, partnerOrgs } from "@/data/partners";

export const metadata = pageMetadata({
  title: "Partners",
  description:
    "Enterprise Neurosystem's partners and global engagement: UNFCCC and UN University programs, the AI Innovation Grand Challenge, and the JPL/Caltech collaboration.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-page-header">
        <AmbientShadow opacity={0.07} />
        <Container className="relative pt-4 pb-10">
          <SectionHeading
            as="h1"
            title="Partners & Engagement"
            description="From UNFCCC panels at COP to JPL/Caltech laboratories, the Enterprise Neurosystem works alongside the UN system, national governments, research institutions, and industry to bring the Internet of Nature to life."
          />
        </Container>
      </section>

      {/* Engagements */}
      <section>
        <Container className="py-20">
          {/* A real <ul>: this is a list of six peer items, and a screen reader
              should be told how many are coming. `Reveal` renders a <div>, so
              it sits *inside* each <li> rather than wrapping it — /press and
              /404 solve the same constraint by putting one Reveal around the
              whole list, but the per-card stagger is wanted here. */}
          <ul className="flex flex-col gap-6">
            {engagements.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={0.05 * i}>
                  <div
                    className={`card-surface card-surface-hover card-textured grid gap-6 rounded-2xl p-6 sm:p-8 ${
                      item.image
                        ? "md:grid-cols-[1fr_280px] md:items-center"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col gap-2">
                      <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">
                        {item.title}
                      </h2>
                      {/* Capped like every other card's text on the site (see
                          BlogCard): the text column is ~780px at md, which runs
                          these paragraphs past 95 characters a line. */}
                      <p className="max-w-2xl text-[15px] leading-relaxed text-ink-muted">
                        {item.description}
                        {item.link && (
                          <>
                            {" "}
                            <a
                              href={item.link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-link hover:underline"
                            >
                              {item.link.label}
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                    {item.image && (
                      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl border border-line">
                        <Image
                          src={item.image}
                          alt={item.imageAlt ?? ""}
                          fill
                          className="object-cover"
                          // The 280px column only exists from md up; below it
                          // the card is one column and the image spans the
                          // container, so a bare "280px" served a 320px source
                          // into a ~700px slot on a phone.
                          sizes="(min-width: 768px) 280px, 100vw"
                          priority={i === 0}
                        />
                      </div>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* JPL / Nature Conservancy teaser */}
      <section className="relative overflow-hidden bg-nav">
        <AmbientShadow />
        <Container className="relative py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-balance text-ink sm:text-3xl">
                CalTech / JPL and The Nature Conservancy
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
                The Jack and Laura Dangermond Preserve will be the first
                deployment of the EN architecture in the US, built with
                JPL/Caltech and The Nature Conservancy: a global data fabric
                integrating satellite data, atmospherics, ground sensors and
                multi-species analysis.
              </p>
              <SectionLink href="/projects/dangermond" className="mt-6">
                Read the full case study
              </SectionLink>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card-surface card-surface-hover card-textured relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/jpl/dangermond-coastline.jpg"
                  alt="Sea cliffs and coastal scrub along the shoreline of the Jack and Laura Dangermond Preserve, with the Pacific stretching to the horizon."
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
              title="Organizations we work with"
              description="Governments, research institutions, and industry."
            />
          </Reveal>
          <div className="mt-14">
            <Reveal delay={0.1}>
              <LogoWall organizations={partnerOrgs} />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
