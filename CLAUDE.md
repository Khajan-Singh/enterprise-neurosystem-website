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
  `NeuralGlobe`, `SectionSidebar`, `etheral-shadow` — all marked `"use client"`).
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
  shadow (resting + hover-intensified); `.card-textured` layers a gradient sheen, a self-contained
  SVG grain overlay, and a darker two-tone border (`color-mix` 30% ink at rest → 45% on hover) on
  top of it, and is now the *default* — every card and pill on the site uses all three classes
  together (`card-surface card-surface-hover card-textured`), including `BoardCard`, `ProjectCard`,
  the Workstreams/Press/Contact page cards, the homepage's intro quote card, and the organization
  pills in `LogoWall`. There are no remaining plain (non-textured) cards; don't add a new one
  without a specific reason (e.g. a card nested inside another card).
- **`components/AmbientShadow.tsx`** wraps `components/ui/etheral-shadow.tsx` (a Framer
  Motion–animated SVG-filter background effect) with this site's navy color and motion settings
  baked in — it's applied behind the homepage's blue (`bg-nav`) sections, every page's blue
  header band, and the nav bar itself. Use `<AmbientShadow opacity={n} />` rather than importing
  `EtherealShadow` directly, so the effect's color/animation config stays in one place. The parent
  section needs `relative overflow-hidden` and its `Container` needs `relative` so content stacks
  above it (see any page-header section for the pattern) — but put `overflow-hidden` on the
  shadow's own wrapper div (as done in `Nav.tsx`), not on an element that also contains an
  absolutely positioned popover/dropdown, or the popover gets clipped too. Note this fetches its
  noise/mask textures from Framer's CDN (a real external dependency); `.card-textured`'s grain is
  a self-contained SVG data URI instead — prefer that pattern for anything that must never
  silently fail to load.
- **`components/Footer.tsx`** is now the site's single closing dark element (`bg-ink`, light text
  at 70%/60% opacity, `border-bg/10` hairlines). There is no more per-page dark CTA banner — the
  old `components/CTASection.tsx` was deleted once every page's CTA was removed; don't reintroduce
  one without discussing it first.
- **`components/Reveal.tsx`** wraps Framer Motion's scroll-triggered fade/slide-in and
  auto-disables via `useReducedMotion()`; it's the standard way content enters on scroll
  throughout the site — reuse it rather than adding bespoke motion.
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
  when touching it.
- **`components/Container.tsx`** is the single max-width/padding wrapper (`max-w-6xl`) used on
  every section — use it instead of ad hoc width/padding classes.