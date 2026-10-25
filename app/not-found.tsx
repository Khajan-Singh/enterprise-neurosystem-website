import Link from "next/link";
import { Container } from "@/components/Container";
import { AmbientShadow } from "@/components/AmbientShadow";
import { ArrowRight } from "@/components/ArrowRight";
import { SectionLink } from "@/components/SectionLink";

// The site's top-level destinations, in nav order — a lost visitor was almost
// certainly headed for one of them.
const entryPoints = [
  {
    href: "/vision",
    label: "Vision",
    description:
      "Why an open source AI community treats the planet's species and ecosystems as a single system.",
  },
  {
    href: "/projects",
    label: "Projects",
    description:
      "Field deployments and the research workstreams behind them.",
  },
  {
    href: "/partners",
    label: "Partners",
    description: "The organizations building this network together.",
  },
  {
    href: "/blog",
    label: "Blog",
    description: "Notes from the community on sensors, models, and the work.",
  },
  {
    href: "/press",
    label: "Press",
    description: "Coverage of the consortium in the press.",
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Reach the community, or tell us about the broken link.",
  },
];

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100svh-6rem)] items-center overflow-hidden bg-page-header">
      <AmbientShadow opacity={0.07} />
      <Container className="relative grid gap-14 py-20 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <p className="text-base font-medium text-accent">Error 404</p>
          <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-balance text-ink sm:text-6xl">
            Page not found
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-pretty text-ink-muted sm:text-lg">
            The link may be out of date, or the page may have moved. Head
            back to the homepage, or pick up the thread from one of the
            entry points here.
          </p>
          <SectionLink href="/" variant="solid" className="mt-9">
            Back to the homepage
          </SectionLink>
        </div>

        <div>
          <h3 className="text-base font-semibold text-ink">
            Suggested entry points
          </h3>
          <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
            {entryPoints.map((entry) => (
              <li key={entry.href}>
                <Link
                  href={entry.href}
                  className="group flex items-baseline gap-4 py-4 transition-colors hover:text-accent"
                >
                  {/* Fixed label column so the descriptions start on one
                      axis instead of stepping in and out with word width. */}
                  <span className="font-display text-lg font-semibold text-ink transition-colors group-hover:text-accent sm:w-28 sm:shrink-0">
                    {entry.label}
                  </span>
                  <span className="flex-1 text-[15px] leading-relaxed text-ink-muted">
                    {entry.description}
                  </span>
                  <ArrowRight className="shrink-0 self-center text-ink-muted transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
