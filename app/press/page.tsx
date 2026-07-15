import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { AmbientShadow } from "@/components/AmbientShadow";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Press Releases",
  description:
    "News from Enterprise Neurosystem, including the UNFCCC-partnered AI Grand Challenge 2024.",
};

const releases = [
  {
    title: "AI Grand Challenge 2024",
    summary:
      "The UNFCCC Technical Executive Committee collaborates with Enterprise Neurosystem — an AI research community of academics and private sector technologists from leading technology companies — to host an innovation challenge aimed at driving innovation in AI climate change solutions.",
  },
];

export default function PressPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-page-header">
        <AmbientShadow opacity={0.07} />
        <Container className="relative pb-10 pt-14 sm:pt-20">
          <Reveal>
            <SectionHeading
              eyebrow="Community"
              title="Press Releases"
              description="News and announcements from the Enterprise Neurosystem community."
            />
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <div className="flex max-w-3xl flex-col divide-y divide-line">
            {releases.map((release, i) => (
              <Reveal key={release.title} delay={0.05 * i}>
                <article className="py-8 first:pt-0">
                  <h2 className="font-display text-xl font-semibold text-ink">
                    {release.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-ink-muted">
                    {release.summary}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
