import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "How to contribute to Enterprise Neurosystem — as a technical contributor, a workstream collaborator, or a member organization.",
};

const paths = [
  {
    title: "Contribute code",
    description:
      "Submit code, documentation, models, or artifacts as a Contributor. Sustained, accepted contributions can lead to becoming a Committer with approval authority, by majority vote of existing Committers.",
  },
  {
    title: "Join a workstream",
    description:
      "Work directly on the self-describing digital asset catalog or the AI signal processing framework — both open on GitHub and welcoming outside contribution.",
  },
  {
    title: "Bring your organization",
    description:
      "Companies and academic institutions can join as member organizations, with a path to Governing Board or sector representation as the community grows.",
  },
];

export default function GetInvolvedPage() {
  return (
    <section>
      <Container className="py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Community"
            title="Get Involved"
            description="Our consortium is a community, welcome to all. There are a few natural ways in."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {paths.map((path, i) => (
            <Reveal key={path.title} delay={0.06 * i}>
              <div className="card-surface card-surface-hover flex h-full flex-col gap-3 rounded-2xl bg-bg p-6">
                <h2 className="font-display text-lg font-semibold text-ink">
                  {path.title}
                </h2>
                <p className="text-sm leading-relaxed text-ink-muted">
                  {path.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="card-surface mt-14 rounded-2xl bg-bg-subtle p-8 sm:p-10">
            <h2 className="font-display text-lg font-semibold text-ink">
              Ready to start?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
              Reach out and we&apos;ll point you to the right workstream,
              repository, or Technical Committee contact.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85"
            >
              Contact us
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
