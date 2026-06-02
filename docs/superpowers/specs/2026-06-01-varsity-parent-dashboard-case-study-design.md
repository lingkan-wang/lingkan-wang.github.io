# Varsity Tutors Parent Dashboard — Case Study Migration & Emil Polish

Date: 2026-06-01
Status: Approved (design), pending spec review

## Goal

Turn the existing placeholder `content/work/varsity-tutors-parent-dashboard.mdx` into a complete, real
case study sourced from the live Wix page
(https://wanglingkan.wixstudio.com/portfolio/blank-5), with real screenshots, and refine the
case-study rendering layer (template + MDX components + motion) following Emil Kowalski's design-engineering
philosophy: restrained, fast, purposeful motion; calm typographic rhythm; images that fade in rather than pop.

Scope was confirmed with the user:
- **Images:** pull real screenshots from Wix at full resolution, optimize, host in `/public`.
- **Work depth:** content + targeted Emil polish (refine template + a focused, reusable component set + motion). NOT a bespoke one-off page, NOT a full redesign.

## Source content (from Wix)

The case study is the CMU METALS Capstone × Varsity Tutors parent dashboard. Section order:

1. Hero — title "A Trackable Parent Dashboard"; subtitle "Transforming raw tutoring data into clear, actionable progress insights that help parents understand, support, and stay engaged in their child's learning journey."; meta: Role = Product Designer, Duration = 8 weeks, Skills = UX/UI Design · Data Analysis · User Research, Tools = Figma, Context = CMU METALS Capstone × Varsity Tutors.
2. Brief / Overview
3. Background
4. Discovery Workshop (Parent Blueprint, Crazy 8 ideation)
5. Research Questions (RQ1: assessing skill mastery; RQ2: AI mapping skills to standards)
6. Methods Overview (Literature Review; Expert Interview; Parent Survey N=104; Parent Interviews × 4)
7. Synthesizing Insights (affinity diagramming → 4 core insights)
8. Key Findings (4 parent quotes + interpretation)
9. User Personas (Proactive Daisy 45/F; Reactive David 48/M — motivation + needs)
10. Service Blueprint (Search → Matching → Tutoring Sessions → Renew; 4 pain points)
11. Co-creation Workshop (2 focus areas: emotional transparency; make learning visible beyond grades)
12. Competitive Analysis (Khan Academy, Wyzant, Google Classroom; 3 takeaways)
13. HMW / Design Opportunities (4 HMW questions)
14. MVP Lo-fi Concept
15. Spring MVP Overview (Progress & Engagement tab; Progress detail)
16. User Testing (4 parents, 1:1 think-aloud; 3 quotes; "What we learned" 3 points)
17. Summer MVP Goals (Find / Understand / Act)
18. Updated Design Opportunities (clarity over complexity; translate AI into insight; make insights actionable)
19. Final MVP — Homepage; Session Overview (each screen: Data Logic + Learning-science principle: Formative Assessment, Dual Channels, Goal Setting, Growth Mindset); Skill Breakdown (mastery criteria: Mastered ≥90%/3+, Familiar 70–89%, Need Support <70%; filtering)
20. Explorations & Iterations (3 directions that didn't work: session skills highlight; homepage; defining skill levels — before/after)
21. What I Learned (Lesson 1 Useful ≠ Feel-good; Lesson 2 Designing with limited data; Lesson 3 AI as design partner)

## Architecture

Keep the existing content-driven architecture: a single MDX file rendered through `app/work/[slug]/page.tsx`
with components registered in `components/mdx/index.tsx`. Extend it; do not fork it.

### Components

Refine existing:
- **`Figure`** (`components/mdx/figure.tsx`) — becomes a client component supporting real images with a blur-up fade-in on load (no pop), optional `caption`, and width variants (`default` 680px / `wide` / `full` breakout to ~1080px). Falls back to `Placeholder` when `src` is absent.
- **`Gallery`** — supports a 2-up before/after pairing used by Explorations; keeps responsive 1→2 columns.
- **Case-study template** (`app/work/[slug]/page.tsx`) — richer hero meta block (Role / Duration / Skills / Tools as labelled key-values), section-level scroll-reveal rhythm. Text measure stays ~680px; visuals breakout wider.

New (small, reusable across future case studies):
- **`Personas`** — 2-up persona cards (avatar, name, age/gender, Motivation, Needs).
- **`Pillars`** — numbered card grid (used by the 4 HMW questions and the Find/Understand/Act goals).
- **`DataNote`** — two-column "Data Logic / Learning-science principle" callout for the Session Overview deep-dives.
- **`Stats`** — compact stat row (e.g. 8 weeks · N=104 · 4 interviews).

`Quote` (existing) is reused for the parent quotes in Key Findings and User Testing.

### Motion (Emil conventions, reusing `lib/motion.ts`)

- Section-granularity scroll reveals via existing `Reveal` (fade + ~12px rise + blur clearing), ~300–400ms ease-out; grids use a small per-item stagger (~50ms). One reveal per section, not per element.
- Images fade in from a blurred placeholder on load.
- Hover states stay minimal (subtle border/shadow; no large scale jumps).
- `prefers-reduced-motion` already short-circuits `Reveal`, `Template`, and global CSS — new components must honor it too (no motion that bypasses the existing guards).

### Images & assets

- Download every content screenshot from `static.wixstatic.com` at original resolution (URL form `…/media/<hash>~mv2.png`, no transform suffix). Skip decorative chrome (the Wix logo, broken-link icon).
- Optimize: cap longest edge at ~1600px, keep PNG (UI screenshots), store under `public/work/varsity/` with descriptive kebab-case names.
- Wire in via `next/image`. Set frontmatter `cover` + `thumbnail` to the final homepage screenshot so the home grid card and case-study hero show real imagery.
- `confidential: false` — these screenshots are already public on the Wix site.

### Frontmatter changes (`varsity-tutors-parent-dashboard.mdx`)

- `summary` → the real subtitle.
- `cover` / `thumbnail` → real homepage screenshot path.
- Keep `title` user-facing, `order: 2`, `tags: ["EdTech", "AI", "B2C"]`. `featured` left as-is unless the user wants it surfaced.

## Out of scope

- Touching the other 4 placeholder case studies.
- A bespoke non-MDX page or full case-study redesign.
- New global design tokens / color changes.
- Reading-progress bars or other chrome beyond the agreed component set.

## Testing / verification

- `npm run build` and `npm run lint` clean.
- Dev server + preview tools: case study renders, real images load with blur-up, scroll reveals fire once, reduced-motion path is static, home card shows the real cover. Screenshots (light + dark, desktop + mobile) shared as proof.
