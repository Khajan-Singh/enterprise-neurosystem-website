"use client";

import { useState } from "react";
import Image from "next/image";

type VideoEmbedProps = {
  /** YouTube video ID (the `v=` parameter). */
  id: string;
  title: string;
  /** Locally committed poster frame — see the images rule in CLAUDE.md. */
  poster: string;
  caption?: string;
  /** Rendered width of the poster, for `next/image`. Defaults to the max-w-3xl prose column. */
  sizes?: string;
};

/**
 * The video is locked to 16/9, so it can only be made taller by being made
 * wider. When the frame is given more height than that — by a parent that
 * stretches it, see the homepage — the surplus shows as black bars above and
 * below, the way a letterboxed film does.
 */

/**
 * Click-to-load YouTube facade. Until the visitor presses play this is a
 * poster image and a button — none of YouTube's ~1MB of player JS, and no
 * third-party cookies, are fetched. The click swaps in the real iframe with
 * `autoplay=1` so it costs one extra click, not one extra interaction.
 *
 * `youtube-nocookie.com` is deliberate: it defers YouTube's tracking cookie
 * until playback actually starts.
 */
export function VideoEmbed({
  id,
  title,
  poster,
  caption,
  sizes = "(min-width: 1024px) 768px, 100vw",
}: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="flex h-full flex-col gap-3">
      {/*
        `flex-1` lets the black frame absorb any height the parent gives it;
        with the default `min-height: auto` on a flex item it can never
        collapse below the 16/9 box inside, so an unstretched parent gets a
        frame exactly as tall as the video and no bars at all.
      */}
      <div className="card-surface card-surface-hover card-textured relative flex flex-1 overflow-hidden rounded-2xl">
        {/*
          The black has to live on a child, not on the frame itself:
          `.card-textured` paints an opaque gradient over the element's own
          background, so `bg-black` there would never be visible.
        */}
        <div className="flex w-full items-center justify-center bg-black">
          <div className="relative aspect-video w-full">
            {playing ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play video: ${title}`}
                className="group absolute inset-0 h-full w-full cursor-pointer"
              >
                <Image
                  src={poster}
                  alt=""
                  fill
                  className="object-cover"
                  sizes={sizes}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-ink/20 transition-colors duration-200 group-hover:bg-ink/10"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bg/90 shadow-[0_8px_24px_-6px_rgba(43,58,103,0.55)] backdrop-blur-sm transition-transform duration-200 group-hover:scale-105"
                >
                  <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-ink">
                    <path d="M8 5.14v13.72L19 12 8 5.14Z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      {caption && (
        <figcaption className="text-sm leading-relaxed text-ink-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
