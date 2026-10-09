"use client";

import { CSSProperties, ReactNode, useLayoutEffect, useRef } from "react";

/**
 * Scroll-triggered fade/slide-in. The animation itself lives in
 * `.reveal-pending` / `.reveal-in` in globals.css — this component only
 * decides *when* to add the classes, using a single module-level
 * IntersectionObserver shared by every instance on the page (the homepage
 * mounts ~23 of them). `prefers-reduced-motion` is handled in CSS, not here.
 *
 * Only content below the fold at mount animates. Anything already on screen
 * (or scrolled past) gets `.reveal-in` straight away with no hidden state, so
 * a page never arrives with its visible content drifting up. It still gets
 * `.reveal-in` because LayerStack and TypographicSteps key their own timed
 * animations on it. A layout effect, so on client navigation the check runs
 * before the first paint.
 */
let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("reveal-in");
          sharedObserver?.unobserve(entry.target);
        }
      },
      { rootMargin: "-80px" },
    );
  }
  return sharedObserver;
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = getObserver();
    // no IntersectionObserver, or already in view — show it as it is
    if (!observer || el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("reveal-in");
      return;
    }

    el.classList.add("reveal-pending");
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={
        delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined
      }
    >
      {children}
    </div>
  );
}
