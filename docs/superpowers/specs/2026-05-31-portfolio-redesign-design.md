# Portfolio Redesign — Design Spec

- **Date:** 2026-05-31
- **Owner:** Lingkan (Wendy) Wang — Product Designer
- **Status:** Approved (pending written-spec review)
- **Replaces:** https://wanglingkan.wixstudio.com/portfolio (Wix Studio)

## 1. Overview

Rebuild Lingkan Wang's product-design portfolio as a coded site, moving off Wix
Studio. The aesthetic and motion follow Emil Kowalski's conventions: restraint,
strong typography, generous whitespace, and subtle, purposeful animation. The
home page is a typographic project index; each project gets a full case-study
page. English, with light and dark modes.

## 2. Goals & Non-Goals

**Goals**
- Showcase 5 case studies with real depth (not just overview cards).
- An Emil-grade feel: monochrome restraint, refined type, calm motion, fast.
- Content that the owner can maintain herself (MDX files, no code changes to add a project).
- Accessible (keyboard, reduced-motion, AA contrast) and performant (SSG, optimized images).
- Drop-in asset replacement: build with tasteful placeholders now, swap real assets later.

**Non-Goals (this phase)**
- CMS or backend.
- Blog / writing section.
- Bilingual / i18n (English only).
- Heavy automated test infrastructure.

## 3. Decisions (locked during brainstorming)

| Area | Decision |
|---|---|
| Home layout | **Index list** (most Emil-authentic): minimal hero + typographic project list |
| Project reveal | **Cursor-following thumbnail** on hover; click → case study. Mobile/touch: thumbnail shown inline (no-hover fallback) |
| Case study layout | **Narrative scroll** (single narrow column, breakout images) |
| Scope | Full case-study pages for all 5 projects |
| Pages | Work (home), case studies, About, Playground, Resume (PDF link), Contact (site-wide footer) |
| Color modes | Light primary + dark mode toggle (persisted) |
| Language | English |
| Type | **Geist Sans** (display + body) + **Geist Mono** (meta labels) |
| Color | Grayscale + one restrained accent (blue, swappable) |
| Stack | Next.js (App Router) + TypeScript + Tailwind + Framer Motion |
| Deploy | Vercel + GitHub auto-deploy |

## 4. Information Architecture

| Route | Page | Notes |
|---|---|---|
| `/` | Work (home) | Hero (name + one-line intro) + project index list with cursor-follow preview |
| `/work/[slug]` | Case study | One per project, narrative scroll |
| `/about` | About | Bio, experience, photo, design philosophy |
| `/playground` | Playground | Experiments / side work grid |
| (external) | Resume | Links to existing PDF, opens new tab |
| (footer, all pages) | Contact | "Let's Chat" CTA + email / LinkedIn / Instagram |

Global nav: `Work · About · Playground · Resume` + theme toggle.

## 5. Content Model

### 5.1 Projects as MDX

Each case study is `content/work/<slug>.mdx` with frontmatter:

```yaml
---
title: "Bumble Interest Cards"
slug: "bumble-interest-cards"
year: 2025
role: "Product Designer"
company: "Bumble"
tags: ["Social", "Location-Based", "B2C"]
summary: "A 0-to-1 location-based discovery feature for Bumble BFF & Bizz to drive engagement and Premium conversion."
cover: "/work/bumble-interest-cards/cover.png"      # hero image
thumbnail: "/work/bumble-interest-cards/thumb.png"  # index hover preview
order: 3
featured: false
confidential: false
---
```

The home index reads frontmatter from all MDX files and renders the list (sorted
by `order`, or year). Adding a project = adding one MDX file + its images.

### 5.2 The 5 projects (seed content)

| order | slug | title | year | tags | summary |
|---|---|---|---|---|---|
| 1 | `ecovacs-ai-cleaning` | AI-Powered Autonomous Home Cleaning System | 2024 | AI Smart Home, Consumer Mobile, B2C | An AI auto-cleaning experience that replaces complex manual setup with one-tap intelligent control. |
| 2 | `varsity-tutors-parent-dashboard` | Varsity Tutors Parent Dashboard | 2025 | EdTech, AI, B2C | A parent dashboard that translates session data into clear visualizations of student progress and personalized action steps. |
| 3 | `bumble-interest-cards` | Bumble Interest Cards | 2025 | Social, Location-Based, B2C | A 0-to-1 location-based discovery feature for Bumble BFF & Bizz to drive engagement and Premium conversion. |
| 4 | `kwai-guild-dashboard` | Kwai Guild Dashboard | 2024 | B2B SaaS, Live Streaming, Data Analytics | A performance monitoring dashboard for live-streaming guild managers to spot at-risk streamers early and replicate top-performer patterns. |
| 5 | `taimer-ai` | Taimer.ai | 2023 | AIGC, B2B2C, Interior Design | AI image-to-image platform combining generative models with designer input to deliver personalized renovation plans for Chinese consumers. |

### 5.3 Case-study section template (MDX body)

1. **Hero** — title, one-line summary, role/year/platform meta, cover image
2. **Overview** — context & problem, my role, team, timeline
3. **Problem & Insight** — user research, key insights
4. **Process** — explorations, design decisions, iterations
5. **Solution** — final designs (image-heavy, breakout/full-width allowed)
6. **Impact** — results/metrics and/or qualitative outcomes, learnings
7. **Footer** — next project ▸ + back to Work

### 5.4 MDX components

`<Figure>` (image + optional caption, optional breakout to 1080px),
`<Gallery>` (image grid), `<MetricCallout>` (large number + label for results),
`<Quote>`, `<Prose>` (typographic body wrapper). All styled to the system.

### 5.5 Assets & placeholders

- Real assets live in `public/work/<slug>/`, served via `next/image`.
- Until provided, a `<Placeholder>` component renders tasteful neutral blocks
  (with optional blur for `confidential: true` projects). Swapping in real
  images requires no layout change.

### 5.6 About / Contact content (seed)

- **Bio:** "Hi there! I'm a product designer with 3 years of experience building
  AI-powered B2C products. I believe great products come from understanding users
  and turning insights into action. Previously @ CMU HCII, Ecovacs Robotics,
  KuaiShou (Kwai), Varsity Tutors."
- **Contact:** wanglingkan614@gmail.com · 412-996-0978 ·
  linkedin.com/in/lingkanwang · instagram.com/wanglingkan183 · Resume (PDF).

## 6. Visual Design System

- **Typography:** Geist Sans (self-hosted via `next/font`) for display + body;
  Geist Mono for meta labels (year / category / role) in uppercase, tracked,
  ~11px, reduced opacity. Display uses large sizes + tight tracking; body ~16px.
- **Color tokens:**
  - Light: bg `#FFFFFF`, text `#0A0A0A`, muted `#737373`, border `#E5E5E5`, accent `#2563EB`.
  - Dark: bg `#0A0A0A`, text `#EDEDED`, muted `#A1A1A1`, border `#262626`, accent `#3B82F6`.
  - Accent used sparingly (link hover, focus ring). Swappable to warm-gray / deep-green if desired.
- **Layout:** 8px base grid; content column ~680px; image breakout ~1080px;
  large section spacing (~120px); restrained radii (cards/images 12px).

## 7. Motion System (Emil conventions)

**Principles:** purposeful, subtle, fast. Transform/opacity only (GPU-friendly).
Strictly respect `prefers-reduced-motion` — degrade to instant / no-transform.

- **Enter / scroll-reveal:** fade + slight blur (4px→0) + translateY (~10px→0),
  ease-out, ~400ms; list items staggered; triggers once (`whileInView`, `once`).
- **Cursor-following thumbnail:** image follows the cursor with a spring; appears
  with scale + fade + blur, hides on leave. Touch/no-hover: thumbnail shown inline.
- **Interactive (links / buttons / toggle):** hover color transition ~150ms,
  active scale 0.98, spring feel.
- **Project row hover:** title color shift + subtle x-translate; mono meta cross-fades.
- **Page transitions:** subtle content fade-up between routes (App Router + Framer Motion).
- **Theme toggle:** smooth color transitions, no harsh flash.
- **Nav / menu items (exception — explicit owner request):** when the nav/menu
  trigger is expanded, clicking a nav item navigates immediately with **no click
  animation on the item** (no scale, no transition) — it should feel instant. The
  menu open/close itself may still animate; only the item-click is animation-free.
- **Tokens:** enter = ease-out cubic-bezier; interactive = spring; durations 150 / 200 / 400ms.

## 8. Accessibility

Semantic HTML; full keyboard navigation (hover preview also works on focus, with
a non-hover fallback); `:focus-visible` rings; `prefers-reduced-motion` honored;
AA contrast; meaningful `alt` text on all images.

## 9. Performance

Static generation (SSG) for all routes; `next/image` optimization; self-hosted
fonts (no layout shift); minimal client JS. Target Lighthouse ≥ 95.

## 10. Testing & Verification

Intentionally light: TypeScript + ESLint + production build check. Primary
verification is in-browser manual QA (responsive, light/dark, reduced-motion)
via the browse skill, plus Lighthouse. Component unit tests only where they earn
their keep. Heavy test infra is out of scope for a portfolio site.

## 11. Project Structure (proposed)

```
lingkan-portfolio/
├─ app/
│  ├─ layout.tsx            # nav, theme provider, footer/contact
│  ├─ page.tsx              # Work (home) — hero + project index
│  ├─ work/[slug]/page.tsx  # case study (renders MDX)
│  ├─ about/page.tsx
│  └─ playground/page.tsx
├─ components/              # ProjectIndex, CursorPreview, ThemeToggle, mdx/*, Placeholder, motion primitives
├─ content/work/*.mdx       # 5 case studies + frontmatter
├─ lib/                     # MDX loading, project metadata
├─ public/work/<slug>/      # images (placeholders until real assets land)
└─ ...config (tailwind, next, tsconfig)
```

## 12. Deployment

Vercel connected to a GitHub repo; push to main → auto-deploy. Custom domain
optional/later. Repo root: `~/lingkan-portfolio`.

## 13. Assumptions & Open Items

- Accent color defaults to blue; owner may change after seeing it live.
- Impact section supports both metric callouts and qualitative outcomes; NDA
  projects use blurred/abstracted visuals. To be confirmed per project during design QA.
- Real images and case-study copy will be supplied by the owner; placeholders
  used until then.
- Resume PDF link reuses the existing hosted file (or a new upload later).

## 14. Out of Scope / Future

Blog, bilingual toggle, CMS, analytics dashboard, contact form backend (mailto
for now). Can be added in later phases.
