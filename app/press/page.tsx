import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { AmbientShadow } from "@/components/AmbientShadow";
import { Reveal } from "@/components/Reveal";
import { PressList } from "@/components/PressList";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Enterprise Neurosystem in the press — coverage of the consortium and its projects from outlets around the world.",
};

export default function PressPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-page-header">
        <AmbientShadow opacity={0.07} />
        <Container className="relative pb-10 pt-14 sm:pt-20">
          <Reveal>
            <SectionHeading
              title="Press"
              description="Coverage of the consortium and its projects, published elsewhere."
            />
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          {/* One Reveal around the whole list, not one per row: Reveal renders a
              <div>, which can't be a direct child of <ul>. /404's entry-point
              list does the same. */}
          <Reveal>
            <PressList />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
