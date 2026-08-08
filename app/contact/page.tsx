import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { AmbientShadow } from "@/components/AmbientShadow";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Join us. Change the planet. Reach the Enterprise Neurosystem community directly, and see what organizations and individuals can expect from getting involved.",
};

const paths = [
  {
    title: "Contribute code",
    description:
      "Submit code, documentation, models, or artifacts. Sensor integrations, AI cross-correlation models, data pipelines, and additions to the digital asset catalog are all in scope.",
  },
  {
    title: "Join a workstream",
    description:
      "Work directly on the self-describing digital asset catalog or the AI signal processing framework, both open on GitHub and welcoming outside contribution.",
  },
  {
    title: "Bring your organization",
    description:
      "Companies and academic institutions can join as member organizations, with a path to Governing Board or sector representation as the community grows.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-page-header">
        <AmbientShadow opacity={0.07} />
        <Container className="relative pb-10 pt-14 sm:pt-20">
          <Reveal>
            <SectionHeading
              title="Contact"
              description="We're looking for philanthropic partners, volunteer scientists, AI engineers, and network architects. Here's what organizations and individuals can expect when they reach out to join the community."
            />
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <div className="grid gap-6 sm:grid-cols-3">
            {paths.map((path, i) => (
              <Reveal key={path.title} delay={0.06 * i}>
                <div className="card-surface card-surface-hover card-textured flex h-full flex-col gap-3 rounded-2xl p-6">
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

          <div className="mx-auto mt-20 max-w-3xl">
            <Reveal>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                  <h2 className="font-display text-xl font-semibold text-ink">
                    For organizations
                  </h2>
                  <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
                    As this is a volunteer organization, the development
                    commitments can be considered variables based on each
                    member&apos;s availability. However, resourcing should
                    include an executive sponsor and a dedicated technical
                    resource or resources (architect, developer, or both).
                    Again, these are part-time activities, given the volunteer
                    aspect of community engagement. As well, organizations with
                    resource constraints can assign technical observers to
                    contribute their guidance and best practices as part of
                    the regular meetings.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <h2 className="font-display text-xl font-semibold text-ink">
                    For individuals
                  </h2>
                  <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
                    Community involvement can span a variety of activities.
                    This includes any of the following: community management,
                    marketing support, general participation via sharing
                    current challenges and historical knowledge of
                    architectures, operational and technical project
                    management, outbound communications, and of course, code
                    development and documentation. A wide variety of talents
                    and interest areas are welcome.
                  </p>
                  <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
                    In return, participants can expect a number of benefits –
                    an open exchange of ideas on the latest AI research, new
                    areas of enterprise development, leveraging and
                    incorporating solutions built on an open-source framework,
                    and discovering commonality with fellow community members
                    and their areas of endeavor.
                  </p>
                </div>

                <p className="font-display text-lg font-medium text-ink">
                  Please contact Bill Wright, Chair, Enterprise Neurosystem (
                  <a
                    href="mailto:bwright@redhat.com"
                    className="text-accent hover:underline"
                  >
                    bwright@redhat.com
                  </a>{" "}
                  ·{" "}
                  <a
                    href="tel:+14157105207"
                    className="text-accent hover:underline"
                  >
                    +1-415-710-5207
                  </a>
                  ) for any questions regarding community membership.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
