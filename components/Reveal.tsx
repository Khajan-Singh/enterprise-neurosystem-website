"use client";

import { CSSProperties, ReactNode, useEffect, useRef } from "react";

/**
 * Scroll-triggered fade/slide-in. The animation itself lives in
 * `.reveal` / `.reveal-in` in globals.css — this component only decides
 * *when* to add the class, using a single module-level IntersectionObserver
 * shared by every instance on the page (the homepage mounts ~23 of them).
 * `prefers-reduced-motion` is handled in CSS, not here.
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = getObserver();
    if (!observer) {
      // no IntersectionObserver — show the content rather than hiding it
      el.classList.add("reveal-in");
      return;
    }

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
