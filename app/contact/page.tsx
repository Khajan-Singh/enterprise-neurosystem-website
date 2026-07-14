import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Enterprise Neurosystem community about contributing, partnering, or member organizations.",
};

export default function ContactPage() {
  return (
    <section>
      <Container className="grid gap-16 py-20 sm:py-28 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <div>
            <SectionHeading
              eyebrow="Reach out"
              title="Contact"
              description="Whether you're a researcher, an engineer, or an organization exploring membership, tell us a bit about what you're looking to do."
            />
            <div className="mt-10 flex flex-col gap-4 text-sm text-ink-muted">
              <a
                href="https://github.com/Enterprise-Neurosystem"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:underline"
              >
                github.com/Enterprise-Neurosystem →
              </a>
              <p>
                Prefer to start with the community directly? Read{" "}
                <a href="/get-involved" className="text-accent hover:underline">
                  Get Involved
                </a>{" "}
                for contributor and workstream paths.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="card-surface flex flex-col gap-5 rounded-2xl bg-bg-subtle p-6 sm:p-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-ink">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="rounded-lg border border-line bg-bg px-4 py-2.5 text-sm text-ink outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-ink">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="rounded-lg border border-line bg-bg px-4 py-2.5 text-sm text-ink outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="organization"
                className="text-sm font-medium text-ink"
              >
                Organization
                <span className="ml-1 font-normal text-ink-muted">
                  (optional)
                </span>
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                className="rounded-lg border border-line bg-bg px-4 py-2.5 text-sm text-ink outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-ink"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="resize-none rounded-lg border border-line bg-bg px-4 py-2.5 text-sm text-ink outline-none"
              />
            </div>
            <button
              type="submit"
              className="mt-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85"
            >
              Send message
            </button>
            <p className="text-xs text-ink-muted">
              This form is a placeholder — wire it to your preferred inbox or
              form service before launch.
            </p>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
