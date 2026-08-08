# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

A redesign of the Enterprise Neurosystem (enterpriseneurosystem.org) marketing/informational
site — an open-source AI research consortium. Original site content was scraped and preserved
in `content/enterprise-neurosystem-content.md`, which is the copy source of truth; structured
content (board members, projects, workstreams) lives in `data/*.ts` instead of being hardcoded
in page components.

`PRODUCT.md` and `DESIGN.md` at the repo root capture the strategic/visual design system
(register, brand personality, anti-references, color/typography/elevation rules, named "Do"/
"Don't" rules) — read them before making any visual or copy decision that isn't already covered
by an existing pattern in this file.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build — treat TypeScript errors here as build-breaking
npm run lint     # eslint (flat config via eslint.config.mjs)
npm run start    # serve the production build
```

There is no test suite configured.

### Dev server gotcha

The Turbopack dev server has repeatedly served stale CSS/JS after edits in this session even
after the source files were correctly updated. If a visual change doesn't show up after a
browser hard-refresh, don't assume the edit is wrong — verify what's actually being served
first (fetch the page, extract the compiled chunk URL, `curl` it and grep for the expected
value) before debugging the component. If stale, kill all `node` processes, `rm -rf .next`, and
restart `npm run dev`.

## Next.js version warning

This project pins **Next.js 16 (Turbopack)**, which has breaking API/convention changes vs.
older Next.js knowledge. Before relying on memory for App Router APIs, check
`node_modules/next/dist/docs/01-app/` (mirrors the real Next.js docs, e.g. `getting-started`,
`guides`, `api-reference`) rather than assuming pre-16 behavior.

## Architecture

- **App Router, no `src/` dir.** Routes are folders under `app/`: `/mission`, `/charter`,
  `/board`, `/projects`, `/workstreams`, `/press`, `/contact`, plus `/` in `app/page.tsx`. There
  is no `/get-involved` route — that page was merged into `/contact` (its three contributor-path
  cards now sit at the top of the Contact page). Each route is a plain server component; the
  only client components are ones that need interactivity/browser APIs (`Nav`, `Reveal`,
  `NeuralGlobe`, `SectionSidebar` — all marked `"use client"`).
- **`components/Nav.tsx`** is permanently translucent/blurred (`bg-nav/70`, `backdrop-blur-sm`) —
  there is no scroll-triggered solid-to-transparent toggle (removed on purpose; it caused a
  visible lag/jump). "Mission", "Charter", and "Board" are grouped under an "About" dropdown
  rather than flat top-level links: it opens on hover, and a click "pins" it open (stays open
  after the mouse leaves until clicked again, a link is picked, Escape is pressed, or a click
  lands outside it). Its panel is horizontally centered under the trigger
  (`left-1/2 -translate-x-1/2`); the gap between trigger and panel is `padding` (`pt-3` on the
  wrapper), not `margin` — a margin-based gap creates a dead zone the mouse can "fall through,"
  closing the menu before the pointer reaches the panel.
- **Content vs. presentation split.** `data/board.ts` and `data/projects.ts` export typed arrays
  consumed by `BoardCard`/`ProjectCard`/the workstreams page — edit data there, not in JSX.
  Longer prose (mission, charter) lives inline in each page file as a `sections` array (`id`,
  `title`, `body`, optional `list`/`subsections`/`quote`/`after`/`cta`), rendered in a loop —
  add a new section object rather than hand-writing new JSX for prose pages.
- **`components/SectionSidebar.tsx`** is the shared scrollspy sidebar used by both the Mission
  and Charter pages: it takes a flat `{ id, title }[]` derived from that page's `sections` array,
  sticks below the nav bar, and uses an `IntersectionObserver` to bold whichever section is
  currently in view. Reuse it for any future long-form prose page instead of hand-rolling another
  sidebar; if you add a new section to Mission/Charter, the sidebar updates automatically since
  it's generated from the same array.
- **Board member photos** live in `public/people/*` and are referenced by an `image` field on
  each entry in `data/board.ts`, rendered by `BoardCard` as a square (not circular) thumbnail.
- **Images: size the source to how it's rendered before committing it.** Every image goes through
  `next/image`, but Next resizes *on demand* from whatever you commit — an 850KB source doesn't
  cost the visitor 850KB, it costs the origin a sharp resize of 850KB on every cache miss. The
  established caps: photos at **1600px** on the long edge (≈1440px is the widest any of them
  renders at 2× DPR), the `/vision` sensor tiles at **600px** (they render in a 200px box), and
  `public/people/*` at **256×256**, centre-cropped to match `BoardCard`'s `object-cover` so the
  crop isn't decided twice. `public/uganda/bwindi-gorilla.jpg` is deliberately **landscape**
  (1200×750) even though the original was 1200×1600 portrait: it is only ever rendered into a
  16/10 box (homepage `DeploymentCard`) and a 16/9 one (`/projects/uganda` gallery), both
  `object-cover`, both of which keep the full width and crop height symmetrically — so a centred
  16:10 crop reproduces both framings exactly while halving the bytes and the decode. Don't
  restore the portrait original. `next.config.ts` sets `formats: ["image/avif", "image/webp"]`, a
  1-year `minimumCacheTTL` (the 60s default re-derives every variant constantly on a low-traffic
  site), and an `imageSizes` list including 64 and 200 for the two fixed-size cases above. Always
  pass `sizes` for fixed-size images or Next generates variants for every device width.
- **Design tokens live in `app/globals.css`**, using Tailwind v4's CSS-first config (no
  `tailwind.config.ts`): raw values are declared once in `:root`, then mirrored into
  `@theme inline` under the same custom-property names so Tailwind utility classes
  (`bg-nav`, `text-ink-muted`, etc.) pick them up. When adding a new token, declare it in both
  places following that existing pattern. The current palette is an explicitly-labeled
  **placeholder** system pending final visual direction from the user — check that comment
  before assuming colors are final. Two blue tokens are intentionally distinct and not
  interchangeable: `--color-nav` (the nav bar / homepage's blue sections) and
  `--color-page-header` (the header band at the top of every non-homepage page) — see
  `DESIGN.md`'s "Two-Blues Rule".
- **`.card-surface` / `.card-surface-hover` / `.card-textured`** in `globals.css` are the shared
  elevation utilities used by every card-like surface across the site — reuse these instead of ad
  hoc `shadow-*`/`border-*` classes so elevation stays consistent. `.card-surface` is the base
  shadow (resting + hover-intensified); `.card-textured` layers a gradient sheen and a darker
  two-tone border (`color-mix` 30% ink at rest → 45% on hover) on
  top of it, and is now the *default* — every card and pill on the site uses all three classes
  together (`card-surface card-surface-hover card-textured`), including `BoardCard`, `ProjectCard`,
  the Workstreams/Press/Contact page cards, the homepage's intro quote card, and the organization
  pills in `LogoWall`. There are no remaining plain (non-textured) cards; don't add a new one
  without a specific reason (e.g. a card nested inside another card). `.card-textured` used to
  carry a third background layer — an feTurbulence SVG data URI blended `overlay` — for grain. It
  never rendered: background layers paint bottom-up with the first-listed on top, and the opaque
  `linear-gradient` above it occluded the grain entirely (proved by amplifying that layer's alpha
  20×, which changed the output by ≤2/255). It was removed. If you want grain here, it has to go
  *above* the opaque gradient.
- **`components/AmbientShadow.tsx`** wraps `components/ui/etheral-shadow.tsx` (a soft navy
  background blob) with this site's navy color and shape settings baked in — it's applied
  behind the homepage's blue (`bg-nav`) sections and every page's blue header band. Use
  `<AmbientShadow opacity={n} />` rather than importing `EtherealShadow` directly, so the
  effect's config stays in one place. The parent section needs `relative overflow-hidden` and its
  `Container` needs `relative` so content stacks above it (see any page-header section for the
  pattern) — but put `overflow-hidden` on the shadow's own wrapper div, not on an element that
  also contains an absolutely positioned popover/dropdown, or the popover gets clipped too.
  **There is no SVG filter here any more, and you must not reintroduce one.** The shape used to
  be built at runtime: `feTurbulence` → two `feColorMatrix` → two chained `feDisplacementMap`
  (scale ≈68) → a 4px blur, over a box inset −68px on every side of a full-width section. It was
  already frozen (it once rewrote its `feColorMatrix` `values` every frame via Framer Motion,
  which invalidated the whole graph at 60fps), but even static it had to rasterize once per
  instance — and with 3 on the homepage, 2 of them below the fold, two full-section
  turbulence+displacement rasterizations landed in the same frames as the visitor's *first*
  scroll. Measured on a production build, that first scroll ran p90 33ms / p99 150ms / worst
  350ms with 10 frames over 50ms; with the filter gone it is a flat 16.7ms with zero dropped
  frames. Notably there were **no long tasks in either case** — this was never JS, it was raster.
  The filter's output is now baked into `public/ambient-shadow-shape.webp` (512×288; the shape's
  shortest turbulence wavelength is ~350px, so that is lossless in practice) and used exactly as
  the old hand-drawn mask was: as the alpha mask on a flat colour plate, so `color`/`sizing` still
  behave the same. It's preloaded from `app/layout.tsx`, since it's referenced from an inline
  style and so isn't discoverable until the CSSOM exists. To regenerate it, render the old filter
  DOM at a fixed size, composite it over black and over white, and solve for alpha per pixel
  (`a = 1 − (C_white − C_black)`) — capturing at the real 10% alpha instead quantizes to ~20
  levels and bands. The component is also no longer `"use client"` (the filter's `useId` was its
  only hook), which drops 18 client-component instances site-wide. It is likewise **not mounted in
  `Nav.tsx`**: the nav is `sticky`, so that instance could never scroll out of view, and its
  `backdrop-blur-sm` had to re-blur it constantly. The grain overlay is a self-contained SVG data
  URI — prefer that pattern for anything new that must never silently fail to load.
- **`components/Footer.tsx`** is now the site's single closing dark element (`bg-ink`, light text
  at 70%/60% opacity, `border-bg/10` hairlines). There is no more per-page dark CTA banner — the
  old `components/CTASection.tsx` was deleted once every page's CTA was removed; don't reintroduce
  one without discussing it first.
- **`components/Reveal.tsx`** is the standard scroll-triggered fade/slide-in — reuse it rather
  than adding bespoke motion. It is CSS-only: the animation lives in `.reveal`/`.reveal-in` in
  `globals.css` (with the `prefers-reduced-motion` opt-out there too), and the component just
  toggles the class using a **single module-level `IntersectionObserver` shared by every
  instance** — the homepage mounts ~23 of them, so one observer per instance mattered.
- **There is no animation library in this project, on purpose.** framer-motion was removed once
  every effect was moved to CSS; if you're about to add `motion.*`, write keyframes in
  `globals.css` instead. Animate `transform`/`opacity` only — never `left`/`top` (relayouts every
  frame), `box-shadow` (repaints), or SVG geometry attributes like `cx`/`cy` (can't be
  composited). `.flow-pulse-x`/`.flow-pulse-y`, `.node-pulse-ring`, and `.arch-pulse` in
  `globals.css` are the existing examples. A bonus of CSS keyframes: a `display: none` element
  runs no animations, so the breakpoint-hidden half of a responsive diagram costs nothing, where
  the JS version kept ticking. One gotcha, already hit: `.flow-pulse-x` sizes its runner to the
  pulse's travel distance and moves it `translateX(100%)`, so the box sticks out past the
  diagram — its wrapper needs `overflow-x-clip` (x only, so node shadows survive) or the page
  gets a horizontal scrollbar.
- **`components/NeuralGlobe.tsx`** is a dependency-free `<canvas>` animation (rotating
  node-sphere on the homepage hero) with no library involvement — everything (projection,
  edges, pulses) is hand-rolled in that one file. Notable landmine already hit once: canvas
  `fillStyle`/`strokeStyle` silently fails (falling back to opaque black) if given a string it
  can't parse — e.g. the CSS minifier rewrites `#ffa500` to the keyword `orange` in production
  CSS, which a hand-rolled hex-only parser won't understand. Colors read from CSS custom
  properties are resolved via `cssColorToRgb()`, which normalizes through the canvas itself
  rather than hand-parsing — extend that helper for new color tokens rather than re-adding a
  hex-only parser. The component also respects `prefers-reduced-motion` and pauses via
  `IntersectionObserver`/`visibilitychange` when off-screen or the tab is hidden — preserve both
  when touching it. Its draw loop is deliberately allocation-free: the sphere geometry is built
  once at module scope (not per mount), the rotated/projected point arrays and the depth-sort
  order are reused across frames, node colors come from a precomputed bucketed `rgba()` ramp, and
  the node glow is one radial gradient baked into an offscreen sprite and blitted with
  `globalAlpha`. It previously allocated ~127 gradients and ~700 strings *per frame*. Keep new
  work out of the per-frame path. Render **one** instance and size it responsively — mounting a
  second copy per breakpoint doubles the cost for a canvas only one of which is ever visible.
- **`components/Container.tsx`** is the single max-width/padding wrapper (`max-w-6xl`) used on
  every section — use it instead of ad hoc width/padding classes.