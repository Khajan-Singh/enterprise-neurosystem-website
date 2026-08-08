import React, { CSSProperties } from "react";

interface NoiseConfig {
  opacity: number;
  scale: number;
}

interface ShadowOverlayProps {
  sizing?: "fill" | "stretch";
  color?: string;
  noise?: NoiseConfig;
  style?: CSSProperties;
  className?: string;
}

// This used to build the shape at runtime: an SVG filter chain of feTurbulence
// -> feColorMatrix x2 -> two chained feDisplacementMap (scale ~68) -> a 4px
// blur, applied to a box inset -68px on every side of a full-width section.
//
// That filter was already static — it was frozen deliberately once per-frame
// animation proved to be the site's dominant CPU cost. A static filter graph
// produces a fixed image, so there is no reason for every visitor's browser to
// re-derive it: the homepage alone mounted three, two of them below the fold,
// which meant two full-section turbulence+displacement rasterizations landed in
// the same few frames as the user's first scroll. That was the first-scroll
// jank.
//
// `public/ambient-shadow-shape.webp` is that filter's output, baked once
// (rendered at 1600x900, alpha recovered by compositing the same shape over
// black and over white, then downsampled — the shape's lowest turbulence
// wavelength is ~350px, so 512x288 is lossless in practice). It is used exactly
// the way the old hand-drawn mask was: as the alpha mask on a flat colour
// plate, so `color` and `sizing` behave as before and the section-sized filter
// disappears entirely.
const SHAPE = "/ambient-shadow-shape.webp";

// Fine grain overlay. Previously a 75KB `/ambient-shadow-noise.webp` fetched via
// CSS `url()` on every page — self-contained SVG instead, following the same
// pattern as `.card-textured` in globals.css, so it can never fail to load.
const NOISE_TILE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function EtherealShadow({
  sizing = "fill",
  color = "rgba(128, 128, 128, 1)",
  noise,
  style,
  className,
}: ShadowOverlayProps) {
  return (
    <div
      className={className}
      style={{
        overflow: "hidden",
        position: "relative",
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: color,
          maskImage: `url('${SHAPE}')`,
          maskSize: sizing === "stretch" ? "100% 100%" : "cover",
          maskRepeat: "no-repeat",
          maskPosition: "center",
        }}
      />

      {noise && noise.opacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("${NOISE_TILE}")`,
            backgroundSize: noise.scale * 200,
            backgroundRepeat: "repeat",
            opacity: noise.opacity / 2,
          }}
        />
      )}
    </div>
  );
}
