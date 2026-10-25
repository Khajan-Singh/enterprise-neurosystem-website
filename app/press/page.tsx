import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { AmbientShadow } from "@/components/AmbientShadow";
import { Reveal } from "@/components/Reveal";
import { PressList } from "@/components/PressList";

export const metadata = pageMetadata({
  title: "Press",
  description:
    "Enterprise Neurosystem in the press: coverage of the consortium and its projects from outlets around the world.",
  path: "/press",
});

export default function PressPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-page-header">
        <AmbientShadow opacity={0.07} />
        <Container className="relative pt-4 pb-10">
          <SectionHeading
            as="h1"
            title="Press"
            description="Coverage of the consortium and its projects, published elsewhere."
          />
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
