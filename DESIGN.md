---
name: Enterprise Neurosystem
description: Marketing and informational site for an open-source AI research consortium focused on climate change.
colors:
  bg: "#ffffff"
  bg-subtle: "#f7f7f5"
  page-header: "#ddeeff"
  ink: "#16171a"
  ink-muted: "#55585f"
  line: "#e4e4e0"
  accent: "#2b3a67"
  accent-soft: "#eef1f8"
  nav: "#ddeeff"
  nav-line: "#bcd9f2"
  net-line: "#737373"
  net-core: "#ffa500"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.1em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "16px"
  full: "9999px"
spacing:
  sm: "12px"
  md: "24px"
  lg: "56px"
  xl: "112px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Enterprise Neurosystem

## 1. Overview

**Creative North Star: "The Governing Record"**

This system reads like the visual language of a standing institutional body, closer to a charter, a board minutes book, or an annual report than a product marketing site. Surfaces stay near-white and quiet; a single deep navy (accent, #2b3a67) is spent deliberately on links, focus states, and the eyebrow labels that name each page's section, never as decoration. A second, distinct blue (#ddeeff, the nav bar) marks the site's own wayfinding chrome as separate from body content, so navigation always reads as "the frame," not "the page."

The system explicitly rejects SaaS-landing-page scaffolding: no gradient text, no hero-metric blocks, no glassmorphism, no uniform icon+heading+text card walls repeated as filler. Where cards are used (board members, projects), each one is dense with specific, named content (a real title, a real affiliation, a real bio), never a placeholder pattern stretched to fill a grid.

The one signature flourish is the neural-globe hero animation: a hand-rolled canvas node-sphere using the muted net-line gray (#737373) and a single warm orange core (#ffa500) as its only saturated color, reserved for that one component.

**Key Characteristics:**
- Near-white, low-chroma surfaces; color is spent on function (links, focus, eyebrows), not atmosphere.
- Two deliberately distinct blues: pale nav-chrome blue vs. deep content-accent navy.
- Cards carry soft ambient shadow at rest and lift further on hover, always specific in content, never generic filler.
- One warm accent (orange) reserved exclusively for the neural-globe animation's core nodes.

## 2. Colors

A restrained, near-monochrome base (white / off-white / near-black ink) carries the page; navy and pale blue are the two deliberate brand colors layered on top for distinct roles.

### Primary
- **Governing Navy** (#2b3a67): the content accent — link color, section eyebrows, focus-visible outlines. Reserved for function, not fill; never used as a large background.

### Secondary
- **Chrome Blue** (#ddeeff) / **Chrome Blue Line** (#bcd9f2): the nav bar's own background and border, deliberately distinct from Governing Navy so the site's navigation frame reads as separate from its content.
- **Accent Soft** (#eef1f8): a pale navy-tinted background, used for soft accent-adjacent surfaces.

### Tertiary
- **Signal Orange** (#ffa500) with **Signal Gray** (#737373): reserved exclusively for the homepage neural-globe canvas animation (pulse cores and connecting edges). Not used anywhere else in the UI.

### Neutral
- **Paper White** (#ffffff): default page background.
- **Subtle Paper** (#f7f7f5): shared subtle surface (no longer used by the footer, which is now Ink — see below).
- **Ink** (#16171a): primary text; also now the Footer's background color (see Named Rules).
- **Ink Muted** (#55585f): secondary/body-muted text.
- **Line** (#e4e4e0): borders and dividers.

The **page-header band** (used at the top of every non-homepage page: Mission, Charter, Board, Projects, Workstreams, Press, Contact) is currently set to the exact same value as Chrome Blue (#ddeeff) — the two tokens (`--color-page-header` and `--color-nav`) remain separate CSS variables so they can diverge again later, but today there is no visible distinction between "site chrome" and "page header" by design choice.

### Named Rules
**The Function-Only Navy Rule.** Governing Navy never fills a background larger than a focus ring or a small badge. If navy is being used to color a surface rather than a link, label, or outline, that's a violation.

**The Two-Blues Rule.** Chrome Blue (nav/page-header) and Governing Navy (accent) are never interchangeable. Chrome Blue always means "you are in site chrome or a page's own header band"; Governing Navy always means "this is an interactive/functional content element." (Chrome Blue itself currently spans two tokens, `--color-nav` and `--color-page-header`, set to the same value by choice — see Colors > Neutral.)

## 3. Typography

**Display Font:** Geist (with ui-sans-serif, system-ui, sans-serif fallback)
**Body Font:** Geist (with ui-sans-serif, system-ui, sans-serif fallback)

**Character:** A single geometric-leaning sans carries the whole system in varying weights, rather than pairing two families. This keeps the "institutional record" feel: consistent, unshowy, legible at length.

### Hierarchy
- **Display** (600 weight, clamp(1.875rem, 3vw, 2.25rem)/sm:2.25rem, 1.15 line-height, -0.02em tracking): page section headings (`SectionHeading`'s `h2`), also used at larger sizes (text-2xl–4xl) for hero and CTA headlines.
- **Title** (600 weight, 1.125rem–1.25rem): card titles (board member names, project titles).
- **Body** (400 weight, 1rem–1.125rem, 1.6 line-height): running prose (mission/charter copy), capped implicitly by `max-w-3xl` containers (~65-75ch).
- **Label** (500 weight, 0.75rem, 0.1em tracking, uppercase): the section "eyebrow" above each page title (e.g. "About", "Community") and form field labels.

### Named Rules
**The One-Family Rule.** Every weight and size on the site comes from Geist. A second family is never introduced for "variety"; hierarchy comes from size and weight steps only.

## 4. Elevation

The system uses ambient, ever-present depth rather than a flat-by-default posture: `.card-surface` carries a visible two-layer shadow at rest (a tight contact shadow plus a longer, softer ambient falloff), so every card reads as a raised surface immediately, not just on interaction. Hover intensifies that same shadow and adds a small upward lift, reinforcing (not introducing) the depth.

### Shadow Vocabulary
- **Resting card shadow** (`0 1px 2px rgba(22,23,26,0.05), 0 14px 28px -14px rgba(22,23,26,0.18)`): default state for every `.card-surface` element (board cards, project cards, the homepage introduction card, LogoWall's organization pills).
- **Hover card shadow** (`0 2px 4px rgba(22,23,26,0.06), 0 20px 36px -16px rgba(22,23,26,0.22)`, plus `translateY(-2px)`): applied via `.card-surface-hover:hover`, disabled entirely under `prefers-reduced-motion`.

### Named Rules
**The Always-Lifted Rule.** A `.card-surface` element is never shadowless. If a new elevated surface is added without a resting shadow, it isn't following this system.

### Textured Surface (`.card-textured`)
The standard elevation treatment for every card on the site (Board, Projects, Workstreams, Press, Contact's contributor-path cards, the homepage's introduction quote card, the homepage's featured-project cards, and the organization-name pills in `LogoWall`) — there are no remaining plain `.card-surface`-only surfaces anywhere. Layered on top of `.card-surface`'s shadow, it's what makes a card grid read as a set of tactile, separate objects rather than flat white rectangles. It applies equally to `rounded-2xl` cards and `rounded-full` pills, since the class only sets background/border, not corner radius. Built from three stacked layers, entirely self-contained (no external image request):
- A `radial-gradient` sheen at the top (`rgba(255,255,255,0.9)` fading out by 55%) reading as a soft top-lit highlight, like light catching a glossy surface.
- A base `linear-gradient` from Paper White (#ffffff) to a near-white warm gray (#f1f1ee), so the card is never a flat single color.
- A fine grain overlay: an inline SVG `feTurbulence` filter as a `data:` URI, blended with `background-blend-mode: overlay`, giving the surface a tactile, slightly textured feel rather than a flat vector gradient.
- A deliberately two-tone border: `1.25px`, `color-mix(in srgb, Ink 30%, Line)` at rest, darkening to `45%` on hover (via `.card-textured.card-surface-hover:hover`) — noticeably more present than the plain `.card-surface` border (`Line` alone, darkening only to an 18% mix), since a card sitting on a plain white or near-white section needs a stronger edge to read as separate from its background.

### Named Rules
**The Grain-Is-Local Rule.** `.card-textured`'s noise layer is a self-contained SVG data URI, not a network-fetched image (unlike the homepage's `AmbientShadow`, which does fetch Framer-hosted textures). Prefer this pattern for any future texture that must never silently fail to load.

**The Default Card Rule.** `.card-textured` is the default card surface, not a special case reserved for one page. Any new card grid should reach for `.card-surface .card-surface-hover .card-textured` together unless there's a specific reason to keep a card flatter (e.g. a nested secondary card inside another card, where the outer card already carries the texture).

## 5. Components

### Buttons
- **Shape:** fully rounded (`rounded-full`, 9999px) for all call-to-action buttons; not used for smaller inline controls.
- **Primary:** Ink background (#16171a), Paper White text, `px-6 py-3` (or `px-5 py-2.5` for compact nav contexts). Opacity-fade on hover (`hover:opacity-85`), no color change.
- **Secondary / Ghost:** transparent background, `border border-bg/30` (on dark sections) or plain text link with underline-on-hover; border brightens (`hover:border-bg/60`) rather than filling.

### Cards
- **Corner Style:** 16px radius (`rounded-2xl`).
- **Background:** the `.card-textured` surface (see Elevation) is the default everywhere a card or pill appears (Board, Projects, Workstreams, Press, Contact, the homepage). Plain Paper White (no texture) is reserved only for a card nested inside another card, so nesting never stacks two textured surfaces.
- **Shadow Strategy:** see Elevation — always-on ambient shadow, intensified on hover via `.card-surface-hover`.
- **Border:** `.card-textured`'s two-tone Ink/Line mix (30% → 45% on hover) is the default; plain `.card-surface` (`Line` alone, → 18% mix) is only for the rare non-textured nested card.
- **Internal Padding:** 24px (`p-6`), up to 40px (`p-10`) for larger CTA-style cards.

### Inputs / Fields
- **Style:** 1px `Line` border, Subtle Paper or Paper White background, 8px radius (`rounded-lg`), `px-4 py-2.5`.
- **Focus:** the site-wide `:focus-visible` ring (2px solid Governing Navy, 3px offset, 2px corner radius) — the same focus treatment used on every interactive element, not a component-specific one.
- **Labels:** 500-weight, small (`text-sm`), Ink-colored, sit directly above the field.

### Navigation
- **Style:** sticky header, permanently translucent (Chrome Blue at 70% opacity, `backdrop-blur-sm`) with its own `AmbientShadow` layer behind the bar — there is no solid/scrolled toggle state; it renders the same at every scroll position so there's no jump. Links are Ink at 70% opacity, full-strength Ink and semibold when active. A single filled pill button ("Contact") anchors the right edge.
- **About dropdown:** "Mission", "Charter", and "Board" are grouped under an "About" trigger rather than three flat top-level links. It opens on hover; a click "pins" it open (stays open after the mouse leaves, until clicked again, a link is chosen, Escape is pressed, or a click lands outside it) — so it supports both quick hover browsing and a deliberate click-to-keep-open interaction. The panel is horizontally centered under the trigger (`left-1/2 -translate-x-1/2`), not left-aligned.
- **Mobile:** collapses to a hamburger; the "About" links keep their own labeled, underlined group at the top of the dropdown panel, followed by a divider and the remaining flat links, so the grouping survives on mobile even without the dropdown interaction.

### Neural Globe (signature component)
A dependency-free `<canvas>` node-sphere animation on the homepage hero: rotating nodes connected by Signal Gray edges, with Signal Orange pulse cores traveling along them. Colors are resolved from CSS custom properties through the canvas itself (`cssColorToRgb()`) rather than hand-parsed, specifically to avoid silent fallback-to-black when a browser or minifier rewrites a hex color to a named keyword. Respects `prefers-reduced-motion` and pauses via `IntersectionObserver` / `visibilitychange` when off-screen or the tab is hidden.

### Footer
The site's single closing element (there is no longer a separate per-page dark CTA banner — see Named Rules below). Ink background, Paper White text at full/70%/60% opacity for primary/secondary/tertiary content, `border-bg/10` hairlines instead of `Line` (which would be invisible on a dark background). Three link columns (About, Community, Connect) with underlined, `bg/70`-opacity uppercase headings; a bottom bar carries copyright and license text.

### Ambient Shadow (background texture)
`AmbientShadow` (wrapping `components/ui/etheral-shadow.tsx`) is layered behind the homepage's blue sections, every page's page-header band, and the nav bar itself — a Framer Motion–animated SVG-turbulence field tinted Governing Navy at low opacity (0.07–0.14 depending on context), giving those flat blue/white bands a subtle, ever-shifting texture instead of a static fill. Unlike `.card-textured`'s grain (a static, self-contained SVG), this one fetches its mask/noise textures from Framer's CDN and is animated — a real (if minor) external dependency, not something to reach for when a static, offline-safe texture would do.

## 6. Do's and Don'ts

### Do:
- **Do** spend Governing Navy (#2b3a67) only on links, focus rings, and eyebrow labels — function, never fill.
- **Do** keep every `.card-surface` element shadowed at rest (the Always-Lifted Rule); it is never a flat, borderless block.
- **Do** lead every card or list item with specific, named content (a real person, a real project, a real institution) rather than a generic icon+heading+text template repeated as filler.
- **Do** respect `prefers-reduced-motion` on every new animation, matching the existing pattern in `Reveal` and `NeuralGlobe`.
- **Do** keep body copy within a `max-w-3xl` (~65-75ch) container for long-form prose pages (Mission, Charter).

### Don't:
- **Don't** introduce a second typeface. Geist carries the entire system; hierarchy comes from weight/size, not font-pairing.
- **Don't** use gradient text (`background-clip: text` + gradient) anywhere; this system uses solid Ink or Governing Navy for emphasis.
- **Don't** add a *new* hero-metric block (big number + small label + gradient accent) without asking — this is an institutional consortium site, not a SaaS product pitch (per PRODUCT.md's anti-references, uor.foundation and askshepherd.ai). Note: the homepage's `StatRow` (190+ Participants / 30+ Companies & institutions / 9+ Active climate/AI projects / Open Source · AI Research Community) is exactly this pattern — it was flagged in a design critique, removed, and then explicitly restored by the user, so treat it as a deliberate, standing exception rather than a precedent for adding more.
- **Don't** add a tiny uppercase tracked eyebrow to every single section reflexively. The current `SectionHeading` eyebrow is a deliberate, load-bearing label (About / Community) used once per page header; it should not multiply into a per-section kicker pattern site-wide.
- **Don't** use `border-left`/`border-right` as a colored accent stripe on cards or callouts.
- **Don't** let Chrome Blue (nav) and Governing Navy (accent) bleed into each other's role; see the Two-Blues Rule.
- **Don't** reintroduce a per-page dark CTA banner (the old `CTASection` component, deleted). The Footer is now the site's one closing dark element; a new page shouldn't get its own bottom CTA block.
