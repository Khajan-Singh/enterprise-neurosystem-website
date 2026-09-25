import { Container } from "./Container";
import { Reveal } from "./Reveal";

/**
 * The homepage's numbers, as one sentence. This replaced a four-up
 * big-number/small-label stat row (the generic "hero metric" pattern): the
 * numbers now live inside a claim, so they read as the consortium speaking
 * rather than a dashboard. They carry the same Emphasis Navy as the hero's
 * underlined phrase.
 *
 * Sized between the section headings and the hero: 40px on xl (36px on
 * lg) against the h2s' 36px and the hero's 60px. Both neighbours of that
 * were tried and rejected: 48px outranked every heading and read as out of
 * place, 30px sat under the headings and didn't register as a statement.
 * On desktop it spans the full Container, so it reads as a band between the
 * two blue sections rather than a short paragraph with a quarter of the row
 * empty beside it. It switches from `text-balance`
 * to `text-pretty` there: balance evens the lines by shortening all of them,
 * which left ~240px empty on the right at 1440px; pretty fills each line and
 * only keeps the last from ending on a lone word. Below lg it stays balanced
 * and capped at max-w-4xl.
 *
 * The apostrophe is a literal ’, not `&rsquo;`: with the entity in the
 * same text run, the compiler dropped the space after the `9+` span and it
 * rendered as "9+climate".
 */
export function StatsSentence() {
  const n = (value: string) => (
    <span className="text-emphasis">{value}</span>
  );
  return (
    <section>
      <Container className="py-16 sm:py-20">
        <Reveal>
          <p className="max-w-4xl font-display text-2xl leading-snug font-semibold tracking-tight text-balance text-ink sm:text-3xl lg:max-w-none lg:text-4xl lg:leading-tight lg:text-pretty xl:text-[2.5rem]">
            {n("190+")} researchers and engineers from{" "}
            {n("30+")} companies and institutions, working in the open on{" "}
            {n("9+")} climate AI projects, from Bwindi’s mountain
            gorillas to the coast of California.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
