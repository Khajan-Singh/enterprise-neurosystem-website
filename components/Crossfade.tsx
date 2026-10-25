"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type CrossfadeImage = { src: string; alt: string };

// Short enough that a visitor scrolling past sees at least one change; the
// cards are on screen for a few seconds at most. (Was 5.5s, which most
// visitors never saw turn over.)
const HOLD_MS = 2500;

/**
 * A crossfade through a few photographs of the same place, used on the
 * homepage deployment cards so each card shows more than one view of the
 * site it names. Only opacity animates (`.xfade-img` in globals.css), and the
 * cycle runs only while the card is on screen and the tab is visible. Under
 * reduced motion it never advances: the first photograph is the card.
 *
 * Every frame is rendered from the start, absolutely stacked, so the box
 * never changes size and the first frame is the one the server sends.
 */
export function Crossfade({
  images,
  sizes,
  className = "",
}: {
  images: CrossfadeImage[];
  sizes: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = false;
    let timer: number | undefined;
    const stop = () => window.clearInterval(timer);
    const start = () => {
      stop();
      if (visible && !document.hidden) {
        timer = window.setInterval(
          () => setActive((i) => (i + 1) % images.length),
          HOLD_MS,
        );
      }
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", start);
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", start);
    };
  }, [images.length]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={i === active ? img.alt : ""}
          aria-hidden={i === active ? undefined : true}
          fill
          sizes={sizes}
          className={`xfade-img object-cover ${i === active ? "is-active" : ""}`}
        />
      ))}
    </div>
  );
}
