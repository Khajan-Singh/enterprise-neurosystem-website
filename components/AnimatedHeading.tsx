"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * A heading whose words rise into place on load, each at a random moment, so
 * the line assembles itself rather than typing out left-to-right. The order
 * is different on every page load.
 *
 * The random delays are assigned in an effect, never during render, so the
 * server and client markup match. Until then the words sit in their hidden
 * start frame under a CSS fallback animation that reveals them after 1.5s on
 * its own, so a slow or failed hydration can't leave the headline invisible.
 * See `.word-rise` in `globals.css`.
 *
 * Two copies of the text are rendered: an `sr-only` one that assistive tech
 * reads as a single sentence, and an `aria-hidden` one split into words for
 * the animation. The words are separated by ordinary spaces, so wrapping and
 * `text-balance` behave exactly as they would on plain text.
 *
 * `underline` marks a run of consecutive words to underline. Each word is an
 * inline-block, and a parent's text-decoration is never drawn under
 * inline-block children, so the underline lives on each word (and on the
 * spaces between them) rather than on a wrapper. Trailing punctuation on the
 * last word stays inside that word's inline-block but outside the underline,
 * so it rises with the word and can't wrap onto a line of its own.
 */

// Must match the fallback animation's delay in `globals.css`.
const FALLBACK_MS = 1500;

/** Locate `phrase` as a run of whole words; the last may carry punctuation. */
function findPhrase(words: string[], phrase?: string) {
  if (!phrase) return null;
  const target = phrase.split(" ");
  for (let start = 0; start + target.length <= words.length; start++) {
    const matches = target.every((t, j) => {
      const w = words[start + j];
      return j === target.length - 1
        ? w.startsWith(t) && /^[^\p{L}\p{N}]*$/u.test(w.slice(t.length))
        : w === t;
    });
    if (matches) return { start, end: start + target.length - 1, target };
  }
  return null;
}

export function AnimatedHeading({
  text,
  as: Tag = "h1",
  className,
  minDelay = 100,
  maxDelay = 500,
  underline,
  phraseClassName,
  href,
}: {
  text: string;
  as?: "h1" | "h2";
  className?: string;
  /** Earliest and latest per-word start, in ms. */
  minDelay?: number;
  maxDelay?: number;
  /** A run of whole words in `text` to underline, e.g. "environmental intelligence". */
  underline?: string;
  /** Extra classes on the underlined phrase (its words and the spaces between), e.g. a colour. */
  phraseClassName?: string;
  /** Makes the underlined phrase a link. Ignored without `underline`. */
  href?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");
  const phrase = findPhrase(words, underline);
  const phraseClass = ["word-underline", phraseClassName]
    .filter(Boolean)
    .join(" ");
  const inPhrase = (i: number) =>
    phrase !== null && i >= phrase.start && i <= phrase.end;

  useEffect(() => {
    const heading = ref.current;
    if (!heading) return;
    const words = heading.querySelectorAll<HTMLElement>(".word-rise");
    // Only take over while the fallback is provably still in its delay.
    // Otherwise (hydration outlasted the delay) switching animations would
    // restart the words and blink them out, so the fallback is left to play.
    // Two traps, both hit:
    // - Ask the animation how long it has run, not `performance.now()`. That
    //   counts from the document's first load, so after any client-side
    //   navigation back here it is always past the delay and the random
    //   order never ran.
    // - Require the animation to be found. A finished `backwards`-fill
    //   animation drops out of `getAnimations()` entirely, so "not found"
    //   means "already played", not "safe to start".
    const stillWaiting = [...words].every((word) =>
      word
        .getAnimations?.()
        .some(
          (a) =>
            (a as CSSAnimation).animationName === "word-rise" &&
            Number(a.currentTime ?? 0) < FALLBACK_MS,
        ),
    );
    if (!stillWaiting) return;
    const delays = [...words].map(
      () => minDelay + Math.random() * (maxDelay - minDelay),
    );
    words.forEach((word, i) => {
      word.style.setProperty("--delay", `${Math.round(delays[i])}ms`);
    });
    // An underlined space starts with the later of its two neighbours, so
    // no stray segment of underline shows before both words have begun.
    heading.querySelectorAll<HTMLElement>(".word-gap").forEach((gap) => {
      const i = Number(gap.dataset.after);
      const delay = Math.max(delays[i], delays[i + 1]);
      gap.style.setProperty("--delay", `${Math.round(delay)}ms`);
    });
    heading.classList.add("is-ready");
  }, [minDelay, maxDelay]);

  const gapBefore = (i: number): ReactNode =>
    i === 0 ? null : inPhrase(i - 1) && inPhrase(i) ? (
      <span className={`word-gap ${phraseClass}`} data-after={i - 1}>
        {" "}
      </span>
    ) : (
      " "
    );

  const word = (i: number) => {
    let content: ReactNode = words[i];
    if (phrase && inPhrase(i)) {
      const core = phrase.target[i - phrase.start];
      content = (
        <>
          <span className={phraseClass}>{core}</span>
          {words[i].slice(core.length)}
        </>
      );
    }
    return <span className="word-rise">{content}</span>;
  };

  const wordWithGap = (i: number) => (
    <span key={i}>
      {gapBefore(i)}
      {word(i)}
    </span>
  );

  const indices = (from: number, to: number) =>
    Array.from({ length: Math.max(0, to - from) }, (_, k) => from + k);

  // With a link, the phrase's words are grouped inside it; the ordinary
  // space in front of the phrase stays outside so it isn't part of the link.
  const visible =
    phrase && href ? (
      <>
        {indices(0, phrase.start).map(wordWithGap)}
        {phrase.start > 0 && " "}
        <Link href={href} tabIndex={-1} className="word-link">
          {word(phrase.start)}
          {indices(phrase.start + 1, phrase.end + 1).map(wordWithGap)}
        </Link>
        {indices(phrase.end + 1, words.length).map(wordWithGap)}
      </>
    ) : (
      words.map((_, i) => wordWithGap(i))
    );

  // Screen readers get the plain sentence; if the phrase is a link, the link
  // is real only here, and the visible copy is a mouse-only duplicate.
  let spoken: ReactNode = text;
  if (phrase && href) {
    const before = words.slice(0, phrase.start).join(" ");
    const linked = phrase.target.join(" ");
    const after = text.slice(
      (before ? before.length + 1 : 0) + linked.length,
    );
    spoken = (
      <>
        {before && `${before} `}
        <Link href={href} className="animated-heading-link">
          {linked}
        </Link>
        {after}
      </>
    );
  }

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{spoken}</span>
      <span aria-hidden="true">{visible}</span>
    </Tag>
  );
}
