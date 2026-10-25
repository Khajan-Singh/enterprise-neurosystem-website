"use client";

import { useEffect, useRef } from "react";
import { AmbientShadow } from "./AmbientShadow";

// Nav's `h-24`. Same coupling as `app/not-found.tsx` and the `-6rem` in
// globals.css; update all three if the nav height changes.
const BAR_HEIGHT = 96;
// Scroll distance over which the bar turns solid.
const FADE = 80;

/**
 * The nav bar's background, in two layers:
 *
 * 1. A mirror of the page's first section (its colour, borders and cloned
 *    `AmbientShadow`, never its content) at document coordinates, shifted by
 *    the scroll offset. At the top of the page the bar is therefore part of
 *    the hero / header band, shading and all, with no edge. The section's own
 *    shading reaches up under the bar (see `main > section:first-of-type >
 *    [data-ambient-shadow]` in globals.css) so both are the same crop.
 *
 * 2. The bar's own solid surface: Chrome Blue plus its own shading. It fades
 *    in over the last FADE px of scroll before the first section's bottom edge
 *    would reach the bar, so a section boundary never passes through the bar.
 *    That split (half blue, half white) read as the bar being cut off, so from
 *    there on it stays one solid blue bar.
 *
 * Both are driven by the root scroll timeline where supported (`.nav-mirror`
 * and `.nav-solid` in globals.css), so neither can lag the page. Elsewhere
 * there is deliberately no scroll listener: the mirror stays put (it is only
 * the section's flat colour and shading, so a fixed copy is close enough
 * over the short distance it shows), and an IntersectionObserver fades the
 * solid layer in, on a short transition rather than scroll-linked, once the
 * first section has passed under the bar. Rebuilt on navigation and on
 * resize. Without JS the solid layer simply stays on: a plain blue bar.
 */
export function NavBackdrop({ pathname }: { pathname: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const solidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = rootRef.current;
    const mirror = mirrorRef.current;
    const solid = solidRef.current;
    if (!wrapper || !mirror || !solid) return;
    const doc = document.documentElement;
    const timeline = CSS.supports("animation-timeline: scroll()");
    let frame = 0;
    let solidStart = 0;
    let solidEnd = 0;
    let io: IntersectionObserver | undefined;

    // Fallback only. The first section counts as "under the bar" while any
    // of it is below the line FADE px beneath the bar, which is where the
    // scroll-linked version starts its fade.
    const watch = (section: HTMLElement | null) => {
      io?.disconnect();
      if (timeline) return;
      solid.style.transition = "opacity 0.25s ease-out";
      if (!section) {
        solid.style.opacity = "1";
        return;
      }
      io = new IntersectionObserver(
        ([entry]) => {
          solid.style.opacity = entry.isIntersecting ? "0" : "1";
        },
        { rootMargin: `-${BAR_HEIGHT + FADE}px 0px 0px 0px` },
      );
      io.observe(section);
    };

    const build = () => {
      frame = 0;
      const section = document.querySelector<HTMLElement>(
        "main > section:first-of-type",
      );
      if (!section) {
        mirror.replaceChildren();
        solidStart = solidEnd = 0;
      } else {
        const cs = getComputedStyle(section);
        const r = section.getBoundingClientRect();
        const bottom = r.bottom + window.scrollY;
        // Extended up to the top of the document: nothing else is behind
        // the bar there.
        const layer = document.createElement("div");
        Object.assign(layer.style, {
          position: "absolute",
          top: "0",
          left: `${r.left + window.scrollX}px`,
          width: `${r.width}px`,
          height: `${bottom}px`,
          boxSizing: "border-box",
          overflow: "hidden",
          backgroundColor: cs.backgroundColor,
          borderBottom: `${cs.borderBottomWidth} ${cs.borderBottomStyle} ${cs.borderBottomColor}`,
        });
        const ambient = section.querySelector<HTMLElement>(
          ":scope > [data-ambient-shadow]",
        );
        if (ambient) {
          const a = ambient.getBoundingClientRect();
          const clone = ambient.cloneNode(true) as HTMLElement;
          Object.assign(clone.style, {
            inset: "auto",
            top: `${a.top + window.scrollY}px`,
            left: `${a.left - r.left}px`,
            width: `${a.width}px`,
            height: `${a.height}px`,
          });
          layer.appendChild(clone);
        }
        mirror.replaceChildren(layer);
        mirror.style.height = `${bottom}px`;
        // Solid by the time the section's bottom edge reaches the bar.
        solidEnd = Math.max(0, bottom - BAR_HEIGHT);
        solidStart = Math.max(0, solidEnd - FADE);
      }
      wrapper.style.setProperty("--nav-mirror-travel", String(doc.scrollHeight - doc.clientHeight));
      wrapper.style.setProperty("--nav-solid-start", `${solidStart}px`);
      wrapper.style.setProperty("--nav-solid-end", `${solidEnd}px`);
      wrapper.classList.add("is-live");
      watch(section);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(build);
    };

    build();
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      io?.disconnect();
    };
  }, [pathname]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="nav-backdrop pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div ref={mirrorRef} className="nav-mirror" />
      <div ref={solidRef} className="nav-solid absolute inset-0 bg-nav">
        <AmbientShadow />
      </div>
    </div>
  );
}
