"use client";

import { useEffect, useRef } from "react";

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
 */

// Must match the fallback animation's delay in `globals.css`.
const FALLBACK_MS = 1500;

export function AnimatedHeading({
  text,
  as: Tag = "h1",
  className,
  minDelay = 100,
  maxDelay = 500,
}: {
  text: string;
  as?: "h1" | "h2";
  className?: string;
  /** Earliest and latest per-word start, in ms. */
  minDelay?: number;
  maxDelay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");

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
    words.forEach((word) => {
      const delay = minDelay + Math.random() * (maxDelay - minDelay);
      word.style.setProperty("--delay", `${Math.round(delay)}ms`);
    });
    heading.classList.add("is-ready");
  }, [minDelay, maxDelay]);

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i}>
            {i > 0 && " "}
            <span className="word-rise">{word}</span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
