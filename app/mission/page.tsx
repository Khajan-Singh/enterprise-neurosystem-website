import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionSidebar } from "@/components/SectionSidebar";
import { AmbientShadow } from "@/components/AmbientShadow";
import { Reveal } from "@/components/Reveal";

export const metadata = pageMetadata({
  title: "Mission",
  description:
    "The Enterprise Neurosystem mission: a unified, global-scale AI framework built to understand and respond to climate change.",
  path: "/mission",
});

const sections = [
  {
    id: "global-network",
    title: "The Global AI Network",
    body: [
      "Hundreds of climate projects exist in the world today. Government initiatives abound, and advanced technology providers offer powerful technology platforms. These platforms cover a wide variety of areas – mapping methane with satellite imagery, tracking animal and plant populations, crop yield analysis, water levels in reservoirs and waterways, large-scale cloud infrastructure for nation-scale deployments, and so on.",
      "To place this collective ecosphere back into balance, a global AI neurology is required to understand the health status of our planet. It would link all the relevant climate networks and data sources in one overarching framework, and conduct a higher order analysis across all points of reference in real time.",
    ],
    cta: {
      label: "Read the Whitepaper",
      href: "/The-Enterprise-Neurosystem-Whitepaper.pdf",
    },
  },
  {
    id: "early-warning",
    title: "Early Warning and Food Security",
    quote:
      "It would act as an early warning system – and monitor crops, drought conditions, air pollution, ocean temperatures and other impacts of climate change.",
    body: [
      "And in terms of food security, it could detect patterns across the planet, and recommend optimal planting and harvest cycles, water conservation methodologies tailored to each region, and heat-resilient seed varieties.",
    ],
  },
  {
    id: "partner-in-nature",
    title: "A Partner in Nature",
    body: [
      "It would also enable a missing link to the most critical data of all – allow the species that share this planet to communicate these impacts back to us, through sensors unobtrusively deployed in their habitats. Because humanity needs to draw closer to nature, not create more distance. It is necessary to intertwine a sensor network in nature itself, and observe thousands of species to better understand our effect on the planet. Not only do they share this environment with us, they support our agriculture, and can provide early warnings for climate events – for example, the ability of various species to predict earthquakes is well-documented. To better manage our impact, they must become our partners in this endeavor.",
    ],
  },
  {
    id: "natural-causes",
    title: "Natural Causes and Ground Truth",
    body: [
      "In addition, there are natural causes of climate change that have occurred over millions of years – for example, large scale volcanic eruptions can be a significant factor. The data from natural causes will be incorporated with the human-generated climate data, to create the most accurate ground truth for climate events across the planet. Accuracy of prediction and course correction requires this approach.",
    ],
  },
  {
    id: "unified-framework",
    title: "A Unified Open Framework",
    body: [
      "To be able to cross-correlate all this real-time and historical data, in turn, enables the deepest possible analytics and pattern recognition capability for the collective good of humanity. And to date, there has been no project to unify all these information sources and projects in a single global system. Individual initiatives range from sensors embedded in the oceans and forests, to government-funded research satellites. Yet they are all still locked in separate silos of operation and analysis. There is often valuable actionable data that is simply out of reach, or unknown to groups that could both utilize and add to those data sets.",
      "Creating a single open AI framework will allow all academics, companies and governments to plug into this system and drive deeper insights. This approach leads to the preservation of all the many excellent projects already in the field, while enabling a larger AI network effect across thousands of data sources. And this will be accomplished as a non-profit open source architecture, to best accommodate multinational participation.",
    ],
  },
  {
    id: "responsibility",
    title: "Environmental Responsibility",
    body: [
      "And an overarching set of directives need to be enacted, to ensure that all these systems operate in a responsible manner – drawing from carbon neutral energy sources, and built with green technologies and renewable components. In summary, we need to unify all these data sources and sensor networks. Use the capabilities of AI to look deeply across all climate data in real time, and contrast it to historical data, to better understand climate change dynamics. And to implement a system of this size and scope in an environmentally responsible manner.",
    ],
  },
  {
    id: "ai-neurosystem",
    title: "The AI Neurosystem",
    emphasis: true,
    body: [
      "What is required is an AI neurosystem – a single network that spans the planet, integrating all existing climate data sources and projects, and then cross-correlating this vast trove of information to search for deeper causes and conditions. And in turn, uncover and present new solutions, for restoring balance to our environment.",
    ],
  },
];

export default function MissionPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-page-header">
        <AmbientShadow opacity={0.07} />
        <Container className="relative pt-4 pb-10">
          <SectionHeading as="h1" title="Mission" />
        </Container>
      </section>

      <section>
        <Container className="grid gap-16 py-20 lg:grid-cols-[220px_1fr] lg:gap-20">
          <SectionSidebar
            sections={sections.map((s) => ({ id: s.id, title: s.title }))}
          />

          <div className="flex max-w-3xl flex-col gap-16">
            {sections.map((section) => (
              <Reveal key={section.id}>
                <div id={section.id} className="scroll-mt-28">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                    {section.title}
                  </h2>
                  <div className="mt-4 flex flex-col gap-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                    {section.quote && (
                      <p className="border-l-2 border-accent pl-6 font-display text-xl text-ink">
                        {section.quote}
                      </p>
                    )}
                    {section.body.map((p, i) =>
                      section.emphasis ? (
                        <p
                          key={i}
                          className="font-display text-xl font-medium text-ink"
                        >
                          {p}
                        </p>
                      ) : (
                        <p key={i}>{p}</p>
                      ),
                    )}
                  </div>
                  {section.cta && (
                    <a
                      href={section.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-block rounded-full bg-[#006cd8] px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85"
                    >
                      {section.cta.label}
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
