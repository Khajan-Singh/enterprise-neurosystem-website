/**
 * Generates the static social share card (public/og.png) and the iOS home
 * screen icon (app/apple-icon.png).
 *
 *   node scripts/make-og-image.mjs
 *
 * Both outputs are committed, so this only runs when the card's design or the
 * logo changes — it is a generator for a checked-in artifact, not a build step.
 *
 * Font note: the headline is SVG text, which sharp renders through the *system*
 * font stack — it cannot use the Geist woff2 that next/font downloads (neither
 * librsvg nor satori read woff2). The stack below picks the closest available
 * grotesque, so regenerating on a different OS may shift the type slightly.
 * Check the committed PNG rather than assuming a rerun reproduces it byte for
 * byte.
 *
 * Colors are the design tokens from app/globals.css, kept in sync by hand:
 * --color-page-header, --color-ink, --color-ink-muted, --color-accent.
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const WIDTH = 1200;
const HEIGHT = 630;

const GROUND = "#ddeeff"; // --color-page-header
const INK = "#16171a"; // --color-ink
const INK_MUTED = "#55585f"; // --color-ink-muted
const ACCENT = "#2b3a67"; // --color-accent

const FONTS =
  "Geist, 'Segoe UI Variable Display', 'Segoe UI', Inter, Helvetica, Arial, sans-serif";

/**
 * The wordmark is only 400x84 and has a real alpha channel, so it is
 * composited at native size rather than upscaled — a 1.75x blow-up of a raster
 * logo is visibly soft at this card size.
 */
const LOGO_W = 400;
const LOGO_H = 84;

const PAD = 80;

/**
 * Content only, on a transparent ground.
 *
 * Deliberately does NOT paint the background rect: it is composited *over* the
 * ambient shadow, and an opaque ground here would occlude that layer entirely
 * — the exact failure mode documented for `.card-textured` in CLAUDE.md.
 */
const card = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <!-- Accent rule, echoing the eyebrow treatment used across the site. -->
  <rect x="${PAD}" y="${PAD + LOGO_H + 56}" width="64" height="4" fill="${ACCENT}"/>

  <text x="${PAD}" y="${PAD + LOGO_H + 150}"
        font-family="${FONTS}" font-size="62" font-weight="600"
        fill="${INK}" letter-spacing="-1.5">A global AI architecture for</text>
  <text x="${PAD}" y="${PAD + LOGO_H + 226}"
        font-family="${FONTS}" font-size="62" font-weight="600"
        fill="${INK}" letter-spacing="-1.5">environmental intelligence.</text>

  <text x="${PAD}" y="${HEIGHT - PAD - 8}"
        font-family="${FONTS}" font-size="27" font-weight="400"
        fill="${INK_MUTED}">Open source AI research for climate action</text>
</svg>`;

async function buildOgImage() {
  // The site's own ambient shadow, reused as a soft navy plate. It is a mask,
  // so it tints a flat accent colour exactly as AmbientShadow does in the app.
  // The shape's luminance has to become a real alpha channel: `dest-in` keys
  // off the input's *alpha*, so a greyscale PNG (fully opaque) masks nothing
  // and paints a hard navy blob. Kept at full precision — see below.
  const shadowAlpha = await sharp(path.join(ROOT, "public", "ambient-shadow-shape.webp"))
    .resize(WIDTH, HEIGHT, { fit: "cover" })
    .greyscale()
    // The 512x288 source is lossy WebP, and upscaling it to 1200x630 makes its
    // compression contours read as stair-steps. The shape's shortest
    // turbulence wavelength is ~350px, so an 8px blur erases the artefacts
    // while leaving the form itself untouched.
    .blur(8)
    .raw()
    .toBuffer();

  /**
   * The 10% opacity is folded into the plate's *colour* rather than its alpha.
   * Scaling the mask to 10% instead would leave only ~25 distinct alpha levels
   * and visibly band along the blob's soft edges — the same quantisation trap
   * CLAUDE.md records for regenerating this shape. Pre-mixing accent 10% of
   * the way over the ground is algebraically identical at full alpha, and
   * keeps all 256 levels of falloff.
   */
  const SHADOW_ALPHA = 0.1; // matches AmbientShadow's 0.07–0.1 range in the app
  const mix = (from, to) => Math.round(from + SHADOW_ALPHA * (to - from));

  const shadowPlate = await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 3,
      // GROUND (221,238,255) mixed 10% toward ACCENT (43,58,103).
      background: { r: mix(221, 43), g: mix(238, 58), b: mix(255, 103) },
    },
  })
    .joinChannel(shadowAlpha, { raw: { width: WIDTH, height: HEIGHT, channels: 1 } })
    .png()
    .toBuffer();

  const logo = await sharp(path.join(ROOT, "public", "logo-with-name.png"))
    .resize(LOGO_W, LOGO_H, { fit: "inside" })
    .toBuffer();

  await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4,
      background: GROUND,
    },
  })
    .composite([
      { input: shadowPlate, blend: "over" },
      { input: Buffer.from(card), blend: "over" },
      { input: logo, top: PAD, left: PAD },
    ])
    .png({ compressionLevel: 9 })
    .toFile(path.join(ROOT, "public", "og.png"));

  console.log(`public/og.png  ${WIDTH}x${HEIGHT}`);
}

/**
 * Every icon is written at exactly the size it is requested at, per the repo's
 * "size the source to how it's rendered" rule:
 *   - 180x180 is what iOS asks for as the home-screen icon.
 *   - 192 and 512 are the two sizes the web app manifest spec expects.
 * All are flattened onto white: logo.png has no alpha, and a PWA icon that
 * assumes a transparent ground renders black on some Android launchers.
 */
async function buildIcons() {
  const targets = [
    { size: 180, file: path.join(ROOT, "app", "apple-icon.png"), label: "app/apple-icon.png" },
    { size: 192, file: path.join(ROOT, "public", "icon-192.png"), label: "public/icon-192.png" },
    { size: 512, file: path.join(ROOT, "public", "icon-512.png"), label: "public/icon-512.png" },
  ];

  for (const { size, file, label } of targets) {
    await sharp(path.join(ROOT, "public", "logo.png"))
      .resize(size, size, { fit: "contain", background: "#ffffff" })
      .flatten({ background: "#ffffff" })
      .png({ compressionLevel: 9 })
      .toFile(file);
    console.log(`${label}  ${size}x${size}`);
  }
}

await buildOgImage();
await buildIcons();
