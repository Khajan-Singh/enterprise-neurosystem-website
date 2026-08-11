import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionLink } from "@/components/SectionLink";
import { AmbientShadow } from "@/components/AmbientShadow";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Uganda",
  description:
    "Inside the Enterprise Neurosystem's flagship Uganda deployment: a national AI sensor network spanning Bwindi's mountain gorillas and Lake Victoria, built with the Uganda STI Ministry, JPL/Caltech, and Makerere University.",
};

const photoSections = [
  {
    id: "sti-partnership",
    eyebrow: "Origins",
    title: "A partnership born at COP 29",
    body: [
      "Uganda's Chief Scientist contacted the Enterprise Neurosystem following a UNFCCC panel discussion at COP 29. Uganda's Ministry of Science, Technology and Innovation (STI) was formed by the Presidency to drive a stronger economic foundation through advanced technology. The country now has an electric bus factory and lithium battery production coming online, with materials largely sourced in-country and powered by 100 percent renewable energy.",
      "The STI's mandate spans four economic enablement projects: an AI LLM foundation model, cloud data centers, a climate change early warning system, and advanced IT training. A national network of environmental sensors, developed in partnership with the Enterprise Neurosystem and JPL/Caltech, has been approved for funding by the Minister of STI.",
    ],
    images: [
      { src: "/uganda/sti-ministry-meeting-1.jpg", alt: "Uganda STI Ministry event" },
      { src: "/uganda/manufacturing-factory.jpg", alt: "Ugandan manufacturing facility" },
    ],
  },
  {
    id: "bwindi",
    title: "Bwindi Impenetrable Forest",
    body: [
      "The Enterprise Neurosystem team visited Uganda for government meetings with the STI Ministry, and toured the Bwindi Impenetrable Forest and its mountain gorillas. It quickly became evident this area would be an ideal site for a sensor monitoring project.",
      "Bwindi is now proposed as the first site for a national AI sensor network to monitor environment and resources, through advanced sensor development and deployment. JPL/Caltech and the Enterprise Neurosystem are codeveloping these capabilities with Ugandan universities and scientists.",
    ],
    images: [
      { src: "/uganda/bwindi-gorilla.jpg", alt: "Mountain gorilla in Bwindi Impenetrable Forest" },
      { src: "/uganda/team-and-rangers.jpg", alt: "Enterprise Neurosystem team with Uganda Wildlife Authority rangers" },
      { src: "/uganda/bwindi-forest-mist.jpg", alt: "Misty forest landscape near Bwindi" },
    ],
  },
  {
    id: "lake-victoria",
    title: "Lake Victoria",
    body: [
      "Millions of Africans rely on Lake Victoria for fresh water, agriculture, and power. It is the heart of the Nile River, which in turn supports agriculture across Egypt and Sudan. Sewage, climate change, and agricultural runoff have led to algal blooms that create \"dead zones\" for marine life.",
      "Uganda's Space and Aeronautics Ministry proposed a robotic sensor with AI capabilities to monitor the lake. The Enterprise Neurosystem has been engaged to develop this project: a full-stack architecture has been designed for the AI infrastructure, and sensor design and implementation are now underway. JPL/Caltech formally partners on sensor and network technology design and knowledge transfer, and Makerere University partners on environmental sensor and AI model design.",
      "The economic benefits are immediate: water and agriculture security, and wide-scale species preservation. And because Uganda now has deep manufacturing capabilities, it will manufacture the advanced sensors required for a global environmental analysis network.",
    ],
    images: [
      { src: "/uganda/lake-victoria-aerial-1.jpg", alt: "Aerial view of Lake Victoria with visible algal bloom" },
      { src: "/uganda/lake-victoria-aerial-2.jpg", alt: "Aerial view of Lake Victoria shoreline" },
      { src: "/uganda/sensor-boards.jpg", alt: "Robotic sensor circuit boards in development" },
    ],
  },
];

export default function UgandaPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-page-header">
        <AmbientShadow opacity={0.07} />
        <Container className="relative pb-10 pt-14 sm:pt-20">
          <Reveal>
            <SectionHeading
              title="Uganda"
              description="A national AI sensor network, from the mountain gorillas of Bwindi to the shores of Lake Victoria."
            />
          </Reveal>
        </Container>
      </section>

      {photoSections.map((section, i) => (
        <section key={section.id} className={i % 2 === 1 ? "bg-page-header/40" : ""}>
          <Container className="py-20">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                <p className="text-xs font-medium uppercase tracking-widest text-accent">
                  {section.eyebrow}
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {section.title}
                </h2>
                <div className="mt-5 flex flex-col gap-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                  {section.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.1} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div
                  className={`grid gap-4 ${
                    section.images.length > 1 ? "grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {section.images.map((img, k) => (
                    <div
                      key={img.src}
                      className={`card-surface card-surface-hover card-textured relative overflow-hidden rounded-2xl ${
                        section.images.length === 3 && k === 0
                          ? "col-span-2 aspect-[16/9]"
                          : "aspect-square"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 30vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      ))}

      {/* National Network Effect */}
      <section className="relative overflow-hidden border-t border-nav-line bg-nav">
        <AmbientShadow />
        <Container className="relative py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Objective"
              title="The National Network Effect"
              description="Lake Victoria and Bwindi will be networked together, providing a unified frame of analysis. In time, agricultural regions, forests and wetlands across the country will be added — thousands of ecosystems and impacts charted in real time."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-surface card-surface-hover card-textured mt-10 max-w-3xl rounded-2xl p-8">
              <p className="text-base leading-relaxed text-ink-muted">
                This network effect is managed by Uganda. The data remains in
                Uganda, and can be shared for scientific and business value
                on Uganda&rsquo;s own terms.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Atomic Language Model */}
      <section>
        <Container className="py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Crane National AI Model"
              title="The Atomic Language Model"
              description="Developed with the Uganda Crane AI team and the Enterprise Neurosystem, it's a sustainable alternative to power-hungry, compute-heavy large language models."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                stat: "50KB",
                label: "Model size. Built on Ugandan (Bantu) languages",
              },
              {
                stat: "Non-GPU",
                label:
                  "Runs on standard chipsets and small IoT devices such as sensors, Raspberry Pi, 2G phones",
              },
              {
                stat: "UOR",
                label:
                  "Based on mathematical principles popularized by the UOR Foundation, driving greater AI efficiency",
              },
            ].map((item) => (
              <Reveal key={item.stat}>
                <div className="card-surface card-surface-hover card-textured flex h-full flex-col gap-2 rounded-2xl p-6">
                  <p className="font-display text-2xl font-semibold text-ink">
                    {item.stat}
                  </p>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {item.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-muted">
              Larger LLMs present real issues in power consumption and raw
              compute requirements. Their climate impact and business model
              are unsustainable at global scale. The Atomic Model is a
              working alternative, already deployed in the field.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10">
              <SectionLink href="/projects" direction="back">
                Back to all projects
              </SectionLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
