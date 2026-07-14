import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Mission",
  description:
    "The Enterprise Neurosystem mission: a unified, global-scale AI framework built to understand and respond to climate change.",
};

export default function MissionPage() {
  return (
    <>
      <section className="border-b border-line bg-bg-subtle">
        <Container className="py-20 sm:py-28">
          <Reveal>
            <SectionHeading eyebrow="About" title="Mission" />
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="max-w-3xl py-20">
          <Reveal>
            <div className="flex flex-col gap-6 text-base leading-relaxed text-ink-muted sm:text-lg">
              <p>
                The world of AI model development is evolving at a rapid
                pace. Thousands of AI models can be deployed in a global
                network today by a multinational corporation — yet realizing
                the full benefits and confronting the challenges of AI and
                Machine Learning requires a unified framework integrating
                multiple AI instances across networks.
              </p>
              <p>
                Much like human physiology, many functions in a global
                network are fully autonomic, running without conscious
                oversight — while others demand deliberate, coordinated
                analysis. The same is true of IT data centers operating at
                scale.
              </p>
              <p className="border-l-2 border-accent pl-6 font-display text-xl text-ink">
                The Enterprise Neurosystem is the final stage of this
                evolution. It will enable a deeper and more complete level of
                AI awareness and perception.
              </p>
              <p>
                Humanity must directly engage with AI, as the combined effect
                of human and machine deterministic capabilities is beyond the
                power of either one alone.
              </p>
              <p>
                Climate is the priority application area — the place where
                large-scale AI architecture can make the most impact for the
                global good.
              </p>
              <p className="font-display text-xl font-medium text-ink">
                Our consortium is a community, welcome to all.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection
        title="See how the mission takes shape"
        description="The Charter defines how the community is governed; the Board leads it; the Projects and Workstreams are where the mission becomes practice."
        primary={{ href: "/charter", label: "Read the charter" }}
        secondary={{ href: "/projects", label: "See the projects" }}
      />
    </>
  );
}
