import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionSidebar } from "@/components/SectionSidebar";
import { AmbientShadow } from "@/components/AmbientShadow";
import { Reveal } from "@/components/Reveal";
import { FlowDiagram, type FlowStep } from "@/components/FlowDiagram";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { SensorGrid } from "@/components/SensorGrid";
import { VideoEmbed } from "@/components/VideoEmbed";

const flowSteps: FlowStep[] = [
  {
    number: "01",
    title: "Sense",
    description:
      "Satellites and sensors placed among species, forests, crops and waterways monitor soil, atmosphere, and human impact.",
  },
  {
    number: "02",
    title: "Transmit",
    description:
      "Sensor data passes onto the primary network, reaching AI instances in each country.",
  },
  {
    number: "03",
    title: "Cross-correlate",
    description:
      "Real-time data is cross-correlated with historical data by area, for deeper pattern analysis.",
  },
  {
    number: "04",
    title: "Detect patterns",
    description:
      "Deforestation, drought, wildfire risk, agricultural stress and more emerge from the data.",
  },
  {
    number: "05",
    title: "Warn & advise",
    description:
      "Accurate early warnings and course-correction recommendations become possible.",
  },
];

export const metadata: Metadata = {
  title: "Vision",
  description:
    "The Internet of Nature: how a single global AI architecture — sensors, satellites, and cross-correlated AI instances — delivers equal access, early warning, and course correction for every nation.",
};

const sections = [
  {
    id: "the-vision",
    title: "The Vision",
    lead: "One AI neurology for the planet.",
    list: [
      "Analyzes natural systems on a global scale to understand environmental impacts on the plant and animal species of the world: the Internet of Nature.",
      "Integrates existing projects such as satellite networks and atmospheric, oceanic, seismic and agricultural sensors, for deeper AI cross-correlation.",
      "Enables access for developing nations to current AI models, historical data, and the sharing of indigenous knowledge of local habitats and species.",
      "Acts as an early warning architecture, and an AI recommendation engine for course-correction.",
    ],
  },
  {
    id: "how-it-works",
    title: "How It Works",
    list: [
      "Satellites and other atmospheric and oceanic observation methods are already in place, alongside mobile and satellite communications networks.",
      "Sensors are placed among key species, forests, crops and natural resources, monitoring waterways, soil, atmospheric pollution, and other areas of human impact.",
      "Sensor data passes onto the primary network, then to AI instances in each country for real-time pattern analysis, cross-correlated with historical data by area.",
      "Deeper early warning patterns emerge: population density levels for multiple species, deforestation, soil moisture, agricultural monitoring, flood and drought conditions, atmospheric pollution, wildfire risk, irrigation levels, and more.",
      "With all this data, highly accurate AI early warning predictions and new course-correction recommendations become possible.",
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    body: [
      "Every yellow circle is a sensor network of its own. They sit wherever there's something to watch: rivers, jungles, fish farms, ant colonies, plant species, and the networks described above. A first tier of AI, wired directly to each network, reads the real-time data and picks out the patterns.",
      "Those patterns and anomalies climb to a second tier, regional AI, which folds them into a larger analysis. From there it's countrywide: every sensor, one architecture, one holistic view of how climate change is moving through species, resources, and farmland. And it doesn't stop at any border: the same architecture scales up again to measure pollution and climate impact across the whole planet.",
    ],
  },
  {
    id: "one-picture",
    title: "One Complete Picture",
    body: [
      "A single AI network, with global-scale data and pattern identification, provides the first complete picture of our planetary environment, based on a single unified global AI architecture, enabled by satellites, sensors and mobile networks.",
      "Given all the available data sources and cross-correlation, this AI network provides the most accurate early warning capability possible, and course-correction recommendations for species preservation, agriculture resilience, and water resource optimization.",
    ],
  },
  {
    id: "parity-and-bias",
    title: "Parity for Developing Nations",
    body: [
      "This provides parity for developing nations, as they gain access to the same shared AI resources as all other countries. This also eliminates bias, as currently only a small group of wealthy nations has access to large data sets and deep environmental analysis.",
    ],
  },
  {
    id: "rosetta-stone",
    title: "A Rosetta Stone for Nature",
    body: [
      "An ancillary benefit: over time, species communications will be analyzed for patterns (acoustics, behavioral, and more), and a Rosetta Stone for animal and insect communications will emerge across thousands of species.",
    ],
  },
  {
    id: "single-platform",
    title: "A Single Platform",
    emphasis: true,
    body: [
      "Leading to a single AI observation, analysis and early warning platform.",
    ],
  },
];

export default function VisionPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-page-header">
        <AmbientShadow opacity={0.07} />
        <Container className="relative pb-10 pt-14 sm:pt-20">
          <Reveal>
            <SectionHeading
              title="Vision"
              description="Internet of Nature · Planetary AI · Equal Access for All."
            />
          </Reveal>
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

                  {section.id === "the-vision" && (
                    <>
                      <div className="mt-8">
                        <VideoEmbed
                          id="qO8-n6vuYBA"
                          title="The Enterprise Neurosystem — AIM4C Grand Challenge Announcement, COP 27"
                          poster="/video/aim4c-cop27.jpg"
                          caption="Bill Wright introduces the Enterprise Neurosystem at COP 27, November 2022."
                        />
                      </div>
                      <div className="card-surface card-surface-hover card-textured my-8 rounded-2xl p-6 sm:p-8">
                        <FlowDiagram steps={flowSteps} />
                      </div>
                      <p className="font-display text-xl font-medium text-ink">
                        {section.lead}
                      </p>
                      <ul className="mt-5 flex flex-col gap-3">
                        {section.list?.map((item, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-base leading-relaxed text-ink-muted sm:text-lg"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ background: "var(--color-net-core)" }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {section.id === "how-it-works" && (
                    <div className="mt-6">
                      <div className="float-none sm:float-right sm:ml-8 mb-6 w-full sm:w-64 lg:w-72">
                        <SensorGrid />
                      </div>
                      <ul className="space-y-3">
                        {section.list?.map((item, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-base leading-relaxed text-ink-muted sm:text-lg"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ background: "var(--color-net-core)" }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div aria-hidden="true" className="clear-both" />
                    </div>
                  )}

                  {section.id === "architecture" && (
                    <div className="mt-6 flex flex-col gap-8">
                      <div className="card-surface card-surface-hover card-textured flex min-h-[420px] items-center justify-center rounded-2xl p-4 sm:p-6">
                        <ArchitectureDiagram />
                      </div>
                      <div className="flex flex-col gap-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                        {section.body?.map((p, i) => <p key={i}>{p}</p>)}
                      </div>
                    </div>
                  )}

                  {section.id !== "the-vision" &&
                    section.id !== "how-it-works" &&
                    section.id !== "architecture" && (
                      <div className="mt-4 flex flex-col gap-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                        {section.body?.map((p, i) =>
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
