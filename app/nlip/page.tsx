import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { LogoWall } from "@/components/LogoWall";
import { AmbientShadow } from "@/components/AmbientShadow";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "NLIP",
  description:
    "The Natural Language Interaction Protocol — an Enterprise Neurosystem community project for GenAI-to-GenAI communication, now adopted by the ECMA as a global standard.",
};

const nlipBackers = [
  "Cisco",
  "Hewlett Packard",
  "Hitachi",
  "IBM",
  "Microsoft",
  "Red Hat",
];

export default function NlipPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-page-header">
        <AmbientShadow opacity={0.07} />
        <Container className="relative pb-10 pt-14 sm:pt-20">
          <Reveal>
            <SectionHeading
              title="NLIP"
              description="The Natural Language Interaction Protocol — a GenAI-to-GenAI communications standard, born from the Enterprise Neurosystem community, now adopted by the ECMA as a global standard."
            />
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <div className="flex flex-col gap-12">
            <Reveal>
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                  A universal chatbot, and the protocol it required
                </h2>
                <div className="mt-4 flex flex-col gap-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                  <p>
                    Dr. Dinesh Verma (IBM Research and Enterprise Neurosystem
                    CTO) proposed a universal chatbot for all consumer mobile
                    applications. Realizing that approach, and the
                    Enterprise Neurosystem architecture in turn, would
                    require a GenAI-to-GenAI communications protocol as a
                    global standard, he initiated an Enterprise Neurosystem
                    community project: NLIP.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="card-surface card-surface-hover card-textured rounded-2xl p-8">
                <p className="font-display text-xl font-medium text-ink">
                  NLIP was recently adopted by the ECMA as a global standard and
                  working group.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                  Why it matters for the Internet of Nature
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                  The Enterprise Neurosystem architecture depends on AI
                  instances in every country cross-correlating data in real
                  time: sensor networks, satellites, and national AI models
                  all speaking to one another. NLIP is the standard that lets
                  GenAI systems built by different vendors, in different
                  countries, understand each other, so the network effect
                  described in the Vision holds at global scale.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
                  Backed by industry
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                  Backers now include Cisco, Hewlett Packard, Hitachi, IBM,
                  Microsoft and Red Hat, alongside multiple academic
                  institutions.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-t border-nav-line bg-nav">
        <AmbientShadow />
        <Container className="relative py-16">
          <Reveal>
            <LogoWall label="NLIP backers" organizations={nlipBackers} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
