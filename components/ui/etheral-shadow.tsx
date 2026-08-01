"use client";

import React, { useId, CSSProperties } from "react";

interface ShapeConfig {
  scale: number;
}

interface NoiseConfig {
  opacity: number;
  scale: number;
}

interface ShadowOverlayProps {
  sizing?: "fill" | "stretch";
  color?: string;
  shape?: ShapeConfig;
  noise?: NoiseConfig;
  style?: CSSProperties;
  className?: string;
}

function mapRange(
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number,
): number {
  if (fromLow === fromHigh) {
    return toLow;
  }
  const percentage = (value - fromLow) / (fromHigh - fromLow);
  return toLow + percentage * (toHigh - toLow);
}

const useInstanceId = (): string => {
  const id = useId();
  const cleanId = id.replace(/:/g, "");
  const instanceId = `shadowoverlay-${cleanId}`;
  return instanceId;
};

// The turbulence/displacement filter below used to have its feColorMatrix
// `values` attribute rewritten every animation frame. Mutating an input to a
// filter graph invalidates the whole chain, so the browser re-rasterized
// turbulence + two displacement maps + a 4px blur at 60fps — across up to four
// instances per page, one of them inside the sticky nav where it could never
// scroll out of view. The filter is now evaluated once and cached by the
// browser; the shape it produces is identical to a single frame of the old
// animation.
const HUE_ROTATE = 180;

// Fine grain overlay. Previously a 75KB `/ambient-shadow-noise.webp` fetched via
// CSS `url()` on every page — self-contained SVG instead, following the same
// pattern as `.card-textured` in globals.css, so it can never fail to load.
const NOISE_TILE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function EtherealShadow({
  sizing = "fill",
  color = "rgba(128, 128, 128, 1)",
  shape,
  noise,
  style,
  className,
}: ShadowOverlayProps) {
  const id = useInstanceId();
  const filterEnabled = !!shape && shape.scale > 0;

  const displacementScale = shape ? mapRange(shape.scale, 1, 100, 20, 100) : 0;

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
          inset: -displacementScale,
          filter: filterEnabled ? `url(#${id}) blur(4px)` : "none",
        }}
      >
        {filterEnabled && (
          <svg style={{ position: "absolute" }}>
            <defs>
              <filter id={id}>
                <feTurbulence
                  result="undulation"
                  numOctaves={2}
                  baseFrequency={`${mapRange(shape.scale, 0, 100, 0.001, 0.0005)},${mapRange(shape.scale, 0, 100, 0.004, 0.002)}`}
                  seed="0"
                  type="turbulence"
                />
                <feColorMatrix
                  in="undulation"
                  type="hueRotate"
                  values={String(HUE_ROTATE)}
                />
                <feColorMatrix
                  in="dist"
                  result="circulation"
                  type="matrix"
                  values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="circulation"
                  scale={displacementScale}
                  result="dist"
                />
                <feDisplacementMap
                  in="dist"
                  in2="undulation"
                  scale={displacementScale}
                  result="output"
                />
              </filter>
            </defs>
          </svg>
        )}
        <div
          style={{
            backgroundColor: color,
            maskImage: `url('/ambient-shadow-mask.webp')`,
            maskSize: sizing === "stretch" ? "100% 100%" : "cover",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            width: "100%",
            height: "100%",
          }}
        />
      </div>

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
