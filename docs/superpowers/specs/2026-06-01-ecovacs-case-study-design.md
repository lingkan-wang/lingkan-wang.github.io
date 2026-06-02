# Ecovacs Case Study — Design Spec

**Date:** 2026-06-01
**Status:** Approved (design), ready to build
**Route:** `/work/ecovacs-ai-cleaning` (existing slug; stays in Selected Work + prev/next nav)

## Goal

Bring the Ecovacs "AI-Powered Autonomous Home Cleaning System" case study from
the user's Wix Studio site (`wanglingkan.wixstudio.com/portfolio/blank`) into the
Next.js portfolio. Give it the **elevated, bespoke treatment** (not the plain MDX
prose layout the placeholder studies use), restyled into the portfolio's minimal,
Emil-consistent language. Content is **tightened & curated**, not a 1:1 copy.

Source content + 36 source images already captured. Originals are pullable full-res
from Wix's CDN by stripping the `/v1/.../` transform suffix off
`static.wixstatic.com/media/<id>~mv2.<ext>`.

## Approach

- Keep the project registered for listing/nav (frontmatter in
  `content/work/ecovacs-ai-cleaning.mdx` stays the source of listing metadata:
  title, year, role, company, tags, summary, cover, thumbnail, order=1, featured).
- Render a **bespoke composed page** for this slug instead of the MDX body. The
  `/work/[slug]` route special-cases slugs that have a registered rich layout;
  all other slugs fall back to the existing MDX renderer. No regression to other
  studies.
- Store the structured copy in a typed content module (`lib/work/ecovacs.ts`).
- New section components live under `components/case/` and reuse `Reveal` +
  `lib/motion` tokens. They are reusable for future studies.

## Page structure (curated narrative)

1. **Hero** — meta line (role · year · company), title, one-line subtitle; a
   Role / Team / Skills / Timeline meta grid; then the 4-phone hero shot (`Shot.png`).
2. **Brief** — condensed setup paragraph.
3. **Research** — short intro + 3 animated stat counters (38% / 72% / 33%) with
   captions; "My ownership & scope" as a tight list.
4. **Voices** — 3 real user quotes (Robert Rose, Alex Smith, Jessica Davis) as
   cards. Drew Carlyle placeholder dropped.
5. **Problem** — framing line + 3 problem cards.
6. **The mission** — HMW as a large typographic statement.
7. **Opportunities** — 3 cards.
8. **Solution** — three pillars, alternating layout (heading + condensed copy +
   device-framed screens): **AI Smart Hosting**, **AI Auto Mapping**, **Pet Mode**;
   plus a compact **Product Overview** using the hardware/sensors line diagram.
9. **Impact** — 4 results (93% / 65% / 92% / 50%) as big animated counters.
10. **Takeaways** — 3 deduped lessons.
11. Existing prev/next nav.

## Components (Emil-restrained)

`CaseHero`, `MetaGrid`, `StatCounter` + `StatRow`, `QuoteCard`/`Voices`,
`ProblemCard`, `OpportunityCard`, `FeatureBlock` (text + device-framed screens),
`DeviceFrame`, `ImpactStat`, `Takeaway`. Reuse `Reveal`, `lib/motion`.

## Images

Fetch ~14–18 originals full-res → optimize (resize to ~max 1600w, compress, keep
transparency) → `public/work/ecovacs/`. Served via `next/image` (responsive).
Curated: hero, ~8 app screens across the 3 pillars, hardware line diagram + 1
product render, 3 pillar icons (map/settings/pawprint), 3 quote avatars.
Dropped: duplicate avatars, stock-render dupes, blurred placeholders, logo.
Cover/thumbnail for the listing derived from the hero.

## Motion (Emil)

Scroll reveals (fade+blur+rise via existing `Reveal`), count-up stats on enter,
subtle spring lift on cards, gentle scale-in on device screens. All respect
`prefers-reduced-motion`. Purposeful, restrained.

## Cleanup (do not carry over from Wix)

- "Drew Carlyle / *This is your Testimonial section paragraph*" placeholder.
- "© 2035 by Name of Site" footer line.
- Stray "*it. This is the place to add a short description…*" line.
- Fix "May-Agu" → "May–Aug 2024".

## Color / type

Portfolio tokens (bg / fg / muted / accent / border, Geist sans + mono). Borrow the
app screens' periwinkle-blue as a quiet section accent to tie to the logo/avatar.

## Out of scope

- No changes to other case studies' content.
- No downloadable video/Lottie (none exist on Wix; motion is rebuilt natively).
