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
 * `underline` marks a run of consecutive words to underline. The words rise
 * bare; once the last of them has landed, one hairline draws left-to-right
 * under the whole phrase. The line is not `text-decoration`: each word is an
 * inline-block, so a per-word decoration rose in pieces, at different moments
 * and heights, with the space between them filled in afterwards. Instead the
 * effect measures the phrase (one rect per line it occupies) and lays an
 * absolutely positioned `.word-stroke` under each, animated with `scaleX`. A
 * wrapped phrase draws line after line. Trailing punctuation on the last word
 * stays inside that word's inline-block, so it rises with the word and can't
 * wrap onto a line of its own, but outside the measured span, so the line
 * stops before it. Positions are layout offsets, not client rects: the
 * measurement runs while the words still sit in their translated start
 * frame. The `.word-underline` spans still carry a plain
 * `text-decoration` as the fallback for no JS and for reduced motion;
 * `.is-ready` hides it once the strokes take over.
 */

// Must match the fallback animation's delay in `globals.css`.
const FALLBACK_MS = 1500;
// Must match `.word-rise`'s duration in `globals.css`.
const RISE_MS = 700;
// Must match `.word-stroke`'s duration in `globals.css`.
const DRAW_MS = 500;

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

type Line = { left: number; right: number; top: number; baseline: number };

/** An element's layout position inside `root`, ignoring transforms. */
function offsetWithin(el: HTMLElement, root: HTMLElement) {
  // Walk the offsetParent chain rather than reading the element's own
  // offsets: while a word's rise animation runs, its transform makes the
  // word the offsetParent in Chromium, and the offsets come back relative
  // to the word.
  let left = 0;
  let top = 0;
  for (let e: Element | null = el; e && e !== root; e = (e as HTMLElement).offsetParent) {
    left += (e as HTMLElement).offsetLeft;
    top += (e as HTMLElement).offsetTop;
  }
  return { left, top };
}

/**
 * One rect per line the phrase occupies, relative to the heading, from the
 * leftmost word on that line to the rightmost (so the space between two words
 * is covered). Measured with `offset*` layout values, not client rects: the
 * measurement runs while the words are still in their hidden start frame,
 * translated 0.4em down, and client rects would include that transform.
 */
function lineRects(spans: Iterable<HTMLElement>, root: HTMLElement): Line[] {
  const lines: Line[] = [];
  // A zero-size inline-block sits on the baseline, so its position is the
  // baseline's: the stroke hangs from there, like a text-decoration would,
  // rather than from the bottom of the inline box (which is the font's
  // descent further down).
  const probe = document.createElement("span");
  probe.style.cssText = "display:inline-block;width:0;height:0";
  for (const s of spans) {
    const { left, top } = offsetWithin(s, root);
    s.appendChild(probe);
    const baseline = offsetWithin(probe, root).top;
    probe.remove();
    const line = lines.find((l) => Math.abs(l.top - top) < 1);
    const right = left + s.offsetWidth;
    if (line) {
      line.left = Math.min(line.left, left);
      line.right = Math.max(line.right, right);
    } else {
      lines.push({ left, right, top, baseline });
    }
  }
  return lines;
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
  /** Extra classes on the underlined phrase's words, e.g. a colour. The drawn line takes the same colour. */
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
    const words = [...heading.querySelectorAll<HTMLElement>(".word-rise")];
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
    const stillWaiting = words.every((word) =>
      word
        .getAnimations?.()
        .some(
          (a) =>
            (a as CSSAnimation).animationName === "word-rise" &&
            Number(a.currentTime ?? 0) < FALLBACK_MS,
        ),
    );
    if (stillWaiting) {
      words.forEach((word) => {
        const delay = minDelay + Math.random() * (maxDelay - minDelay);
        word.style.setProperty("--delay", `${Math.round(delay)}ms`);
      });
      heading.classList.add("is-ready");
    } else if (!heading.classList.contains("is-ready")) {
      return;
    }
    // Past here the effect may be running again on the same heading (React
    // re-runs effects in development, and this one's cleanup removes the
    // strokes), so the strokes are built from the delays already on the
    // words rather than from this run's state.

    // The drawn underline. Under reduced motion the fallback decoration
    // stays (see `.word-underline` in globals.css) and nothing is measured.
    const spans = heading.querySelectorAll<HTMLElement>(".word-underline");
    if (
      spans.length === 0 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const first = spans[0];
    // The line starts once the last phrase word has finished rising.
    const landing =
      Math.max(
        ...words
          .filter((w) => w.querySelector(".word-underline"))
          .map((w) => parseFloat(w.style.getPropertyValue("--delay")) || 0),
      ) + RISE_MS;
    const strokes: HTMLSpanElement[] = [];
    const draw = () => {
      const color = getComputedStyle(first).color;
      const lines = lineRects(spans, heading);
      lines.forEach((line, i) => {
        let stroke = strokes[i];
        if (!stroke) {
          stroke = document.createElement("span");
          stroke.className = "word-stroke";
          stroke.setAttribute("aria-hidden", "true");
          stroke.style.setProperty(
            "--draw-delay",
            `${Math.round(landing + DRAW_MS * i)}ms`,
          );
          if (i === 0) {
            // Later measurements (font swap, resize) must land in the
            // finished state, not replay.
            stroke.addEventListener(
              "animationend",
              () => heading.classList.add("is-drawn"),
              { once: true },
            );
          }
          heading.appendChild(stroke);
          strokes[i] = stroke;
        }
        stroke.style.left = `${line.left}px`;
        stroke.style.top = `${line.baseline}px`;
        stroke.style.width = `${line.right - line.left}px`;
        stroke.style.color = color;
      });
      while (strokes.length > lines.length) strokes.pop()?.remove();
    };
    draw();
    document.fonts?.ready.then(draw);
    const observer = new ResizeObserver(draw);
    observer.observe(heading);
    window.addEventListener("resize", draw);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", draw);
      strokes.forEach((s) => s.remove());
      heading.classList.remove("is-drawn");
    };
  }, [minDelay, maxDelay]);

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
      {i > 0 && " "}
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
    <Tag
      ref={ref}
      className={["animated-heading", className].filter(Boolean).join(" ")}
    >
      <span className="sr-only">{spoken}</span>
      <span aria-hidden="true">{visible}</span>
    </Tag>
  );
}
