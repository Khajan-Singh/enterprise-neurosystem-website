# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

A redesign of the Enterprise Neurosystem (enterpriseneurosystem.org) marketing/informational
site — an open-source AI research consortium. Original site content was scraped and preserved
in `content/enterprise-neurosystem-content.md`, which is the copy source of truth; structured
content (board members, projects, workstreams) lives in `data/*.ts` instead of being hardcoded
in page components.

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
  `/board`, `/projects`, `/workstreams`, `/press`, `/get-involved`, `/contact`, plus `/` in
  `app/page.tsx`. Each route is a plain server component; the only client components are ones
  that need interactivity/browser APIs (`Nav`, `Reveal`, `NeuralGlobe` — all marked
  `"use client"`).
- **Content vs. presentation split.** `data/board.ts` and `data/projects.ts` export typed arrays
  consumed by `BoardCard`/`ProjectCard`/the workstreams page — edit data there, not in JSX.
  Longer prose (mission, charter) is inline in the page files since it's not repeated/looped.
- **Design tokens live in `app/globals.css`**, using Tailwind v4's CSS-first config (no
  `tailwind.config.ts`): raw values are declared once in `:root`, then mirrored into
  `@theme inline` under the same custom-property names so Tailwind utility classes
  (`bg-nav`, `text-ink-muted`, etc.) pick them up. When adding a new token, declare it in both
  places following that existing pattern. The current palette is an explicitly-labeled
  **placeholder** system pending final visual direction from the user — check that comment
  before assuming colors are final.
- **`.card-surface` / `.card-surface-hover`** in `globals.css` are the shared elevation/shadow
  utilities used by every card-like surface across the site (project cards, board cards,
  workstream entries, forms) — reuse these instead of ad hoc `shadow-*` classes so elevation
  stays consistent.
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
