# Bumble Interest Cards — Case Study Upgrade

**Date:** 2026-06-01
**Status:** Approved design, ready for implementation plan
**Topic:** Bring the Bumble Interest Cards project from the Wix portfolio into the Next.js site as a real, polished case study, and upgrade the shared case-study template with reusable components — following Emil Kowalski's design-engineering philosophy.

## Context

The site (`lingkan-portfolio`) is Next.js 16 / React 19 / Tailwind v4 / Framer Motion / MDX. Motion conventions already follow Emil (`lib/motion.ts`: custom ease-out curve, blur+rise reveal, springs for interactive).

The Wix page `https://wanglingkan.wixstudio.com/portfolio/blank-6` is the **Bumble Interest Cards** project (a 5-week, self-directed concept project: a location-based "Interest Cards" discovery feature for Bumble BFF & Bizz, designed to drive engagement and Premium conversion). The repo already has a placeholder stub at `content/work/bumble-interest-cards.mdx` (order 3) — all `[Replace with real copy]` brackets, no real content or imagery.

**Goal:** fill in real content (tightened editorial cut) + rebuild the case-study presentation and interactions to an Emil-grade bar, using the real assets scraped from Wix.

## Decisions (locked with user)

- **Images:** auto-scrape from Wix. 25 unique `static.wixstatic.com/media/...` URLs confirmed present in the page HTML (~14 PNG, ~4 JPG, **6 GIF**). The 6 GIFs map to the 6 documented microinteractions.
- **Scope:** upgrade the shared case-study template AND build reusable MDX components (benefits all 5 projects). Do not rewrite other projects' content.
- **Length:** tightened editorial cut — strongest narrative, trim repetition (Emil restraint).
- **Presentation style:** editorial narrative — single 680px text column, full-bleed breakout images, a few specialized blocks. Rejected: sectioned deep-dive w/ sticky TOC, visual-first interactive hero.

## Content structure (editorial cut)

Collapse Wix's 13 scattered sections into a 7-beat narrative:

| # | Section | Merged from (Wix) |
|---|---------|-------------------|
| — | **Hero + At a glance** | Title, one-line summary + Role / Timeline (5 weeks) / Platform / Tools strip |
| 1 | **Overview** | Brief + problem statement (≤2 paragraphs) |
| 2 | **The insight** | User research + competitive analysis + data analysis → 3 distilled insights (activity-context lowers the social barrier; female-user safety/control; seasonal BFF/Bizz conversion data) |
| 3 | **The solution** | Interest Cards concept + 4 core states (Initiator-Publish, Receiver-Regular, Receiver-Premium, Initiator-Manage) |
| 4 | **Designing for conversion** | Monetization mechanics → `<Compare>` (Free vs Premium): photo display control, premium rewards (Bumble Coins), card templates, discovery range (1 km vs unlimited), photo viewing |
| 5 | **Microinteractions** | 6 microinteractions → `<Showcase>` grid with looping video |
| 6 | **Validation** | User testing → `<Metrics>` row (87% success, <20s avg completion, 73% found card creation intuitive, 68% found location recs effective) |
| 7 | **Reflection** | Reflection + next steps compressed to one short beat |

Cut: standalone Site Map / User Flow prose, per-platform enumeration, contact info (site already has it). Fold any essential bits into one sentence in the relevant section.

## New reusable MDX components

All registered in `components/mdx/index.tsx` and usable by any project.

1. **`<Compare>` + `<CompareRow>`** — two-column feature matrix (e.g. Free / Premium). `<Compare a="Free" b="Premium">` wraps `<CompareRow feature="Discovery range" a="1 km radius" b="Unlimited" />` children. Premium/right column gets a faint accent tint. Rows stagger-reveal on scroll.
2. **`<Showcase>` + `<ShowcaseItem>`** — responsive grid (1-col mobile, 2-col desktop). Each item: looping muted video (or GIF fallback) + short label + one-line description. Video plays on in-view, pauses off-screen; `prefers-reduced-motion` shows poster only.
3. **`<Metrics>` + `<Metric>`** — one row of big stats; extends the existing `MetricCallout` visual language. Stagger-reveal. No count-up by default.
4. **`<Figure>` enhancement** — add optional `video` source and optional click-to-zoom lightbox. Lightbox is a centered modal: `scale(0.95)→1` + opacity, backdrop blur, spring, Esc / click-outside to close. (Modals stay center-origin, per Emil.)

## Shared template upgrade (`app/work/[slug]/page.tsx`)

- **At a glance strip** below the hero summary: mono uppercase labels + values, 4 columns → stacks on mobile, hairline top/bottom border. Driven by new optional frontmatter fields.
- **Real cover** image (strongest hero screen from the scraped set).
- **`h2` rhythm:** hairline rule + small mono section index above each section heading, for editorial cadence. (Update `mdxComponents.h2` or wrap.)
- Keep prose 680px / breakout 1080px / prev-next nav unchanged.

### Frontmatter / type changes (`lib/projects.ts`)

Add optional, backward-compatible fields to `Project`:

```ts
timeline?: string;   // e.g. "5 weeks"
platform?: string;   // e.g. "iOS · Android · Web"
tools?: string;      // e.g. "Figma"
```

Other projects omit them → strip renders nothing. No migration needed.

## Image pipeline (implementation)

1. URLs already extracted from saved HTML (`/tmp/wix_blank6.html`). Download all 25 to `public/work/bumble-interest-cards/`.
2. **Read (visually inspect) each image** → rename by content (`card-publish.png`, `mi-add-button.*`, …), map to sections, write real `alt` + captions.
3. **6 GIFs:** prefer conversion to muted-loop `mp4` + `webm` + first-frame poster. System `ffmpeg` is NOT installed — use `ffmpeg-static` via `npx` (no system install) for a one-time conversion. Fallback if conversion is impractical: deferred-load GIF (set `src` only when in view) + `sips`-extracted first-frame poster for the reduced-motion path.

## Emil interaction details

| Element | Treatment | Why |
| --- | --- | --- |
| Microinteraction video | Play on in-view, pause off-screen; reduced-motion → poster only | Performance + respects reduced-motion |
| Lightbox (Figure) | Centered modal, `scale(0.95)→1` + opacity, backdrop blur, spring, Esc/click-out | See screen detail; modals are center-origin |
| Compare rows / Metrics / grids | Stagger ~50ms reveal | More natural than appearing at once |
| Pressable elements | `:active scale(0.97)`, ease-out ~160ms | Instant press feedback |
| Easing / duration | Reuse `lib/motion.ts` custom ease-out; UI animations <300ms | Already the project's Emil convention; stay cohesive |
| Existing `Reveal` | Keep (fade + blur + rise, ease-out, once) | Already correct |

## Out of scope (YAGNI)

- No sticky side TOC, no large interactive card-state hero (rejected approaches).
- No content rewrite of the other 4 projects (they only inherit template/component improvements).
- No metric count-up animation by default.
- No new system dependencies (use `npx`/`sips`, not a global ffmpeg install).

## Success criteria

- `/work/bumble-interest-cards` renders the full editorial case study with real Wix imagery and the 6 microinteractions, no placeholders.
- New components (`Compare`, `Showcase`, `Metrics`, enhanced `Figure`) are generic and render correctly.
- Home project card shows a real cover.
- Reduced-motion path verified (no autoplaying video/motion).
- `npm run build`, `npm run lint`, `npm test` pass.
- Verified in the live dev-server preview (light + dark, mobile + desktop).
