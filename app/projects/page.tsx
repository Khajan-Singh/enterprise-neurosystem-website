import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Nine sensor and AI projects — from beehives to satellites — built by the Enterprise Neurosystem community to monitor and manage climate change.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="border-b border-line bg-page-header">
        <Container className="pb-10 pt-14 sm:pt-20">
          <Reveal>
            <SectionHeading
              eyebrow="Community"
              title="Projects"
              description="We are technology builders with a singular focus: sensor networks, AI models and software applications, IT and communications infrastructure, and a higher-order AI cross-correlation engine in a single global architecture to help monitor and manage climate change events."
            />
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.name} delay={0.04 * (i % 3)}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Platform work happens in the workstreams"
        description="The digital asset catalog and AI signal processing framework are where these projects plug in."
        primary={{ href: "/workstreams", label: "See workstreams" }}
        secondary={{ href: "/contact", label: "Get involved" }}
      />
    </>
  );
}
