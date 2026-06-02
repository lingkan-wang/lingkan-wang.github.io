# Varsity Tutors Parent Dashboard — Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the placeholder `content/work/varsity-tutors-parent-dashboard.mdx` into a complete, real case study with real Wix screenshots, and refine the case-study template + MDX components + motion in Emil Kowalski's restrained style.

**Architecture:** Keep the content-driven architecture (one MDX file → `app/work/[slug]/page.tsx` → components in `components/mdx/index.tsx`). Extend the `Project` type with optional meta fields, refine `Figure` for blur-up loading, add four small reusable content components, enrich the hero meta block, and self-reveal heavy visual blocks on scroll.

**Tech Stack:** Next.js 16 (App Router, RSC), React 19, Tailwind v4, framer-motion 12, next-mdx-remote, vitest, `next/image`, macOS `sips` + `curl` for asset prep.

**Testing note:** This repo tests the data layer only (`lib/projects.test.ts`); visual components are verified via `npm run build`, `npm run lint`, and the preview tools. The plan follows that established pattern: a real vitest test for the data-layer change (Task 2), build/lint/preview verification for the visual work (Task 7).

---

## File structure

- `public/work/varsity/*.png` — optimized real screenshots (Task 1)
- `lib/projects.ts` — extend `Project` type (Task 2)
- `lib/projects.test.ts` — test new fields (Task 2)
- `components/mdx/figure.tsx` — blur-up + width variants + self-reveal (Task 3)
- `components/mdx/stats.tsx`, `pillars.tsx`, `personas.tsx`, `data-note.tsx` — new (Task 4)
- `components/mdx/gallery.tsx` — optional `cols`; self-reveal (Task 4)
- `components/mdx/index.tsx` — register new components (Task 4)
- `app/work/[slug]/page.tsx` — hero meta block + tag pills (Task 5)
- `content/work/varsity-tutors-parent-dashboard.mdx` — real content + frontmatter (Task 6)

---

### Task 1: Asset pipeline — download, optimize, manifest

**Files:**
- Create: `public/work/varsity/*.png`

- [ ] **Step 1: Download every content image at original resolution**

The Wix media base URL form is `https://static.wixstatic.com/media/<hash>~mv2.png` (drop any `/v1/...` transform suffix to get the original). Download the content images (skip the site logo `wang_edited`, `broken-link.png`) into a temp dir. Use the hashes already inventoried:

```bash
mkdir -p /tmp/wixraw
dl() { curl -sL "https://static.wixstatic.com/media/$1~mv2.png" -o "/tmp/wixraw/$2.png"; }
dl d19660_24d49c0fcc824f80a5d8565b75d1c04e final-homepage
dl d19660_bad7afd27bd0474c9c36164a045e8daf workshop-1
dl d19660_3a0575d58b154133bacd8e2d47df1b22 workshop-2
dl d19660_2f5c2421d82348a9839f3fae8a834b6e workshop-3
dl d19660_b6ccddd1a0d646c7bc9e39be702c63c5 misc-1
dl d19660_74c1074491b844d3af0835833c1865eb misc-2
dl d19660_d3a5d107d01e46408962ad54b959eba9 misc-3
dl d19660_9fa8bd6f09dc4269adc6300016d8f969 persona-daisy
dl d19660_39fb304598ed492caf27070d66cfad55 persona-david
dl d19660_ab8d03720d8d46068fd5ad6fdf22c30c frame-a
dl d19660_4abe1d465c2045e88136ca69eb09ffbe frame-b
dl d19660_358fcb091b51447c94fcf807c0e7d305 frame-c
dl d19660_dee9e671c97c49348a4050d1e706f6f3 blueprint
dl d19660_601a1b6844b249ef9bffad4c9ea0f89b competitive
dl d19660_74ef2922d75945c794751f387d9ffe05 progress-runa-1
dl d19660_81977dfbbebe4c17ab1cd2738af153e8 engagement-linkan
dl d19660_ad323c9d75834e1186bd8cbe0536311a progress-runa-2
dl d19660_6de5be6290a14bcab2c442fb7e37fcaf session-1
dl d19660_4c3d7ca0b2154c4a94b04ccf2c3f5233 session-2
dl d19660_81b1f9444f0a418ea466907c9e150e45 final-homepage-2
dl d19660_1d269c6f12454ecbb946429dc0eb11bc frame-d
dl d19660_ba78a4f7b4074fe9804dbe00160eab8e frame-e
dl d19660_9668d7ff08014801b914c0cacd7d4115 frame-f
dl d19660_6a1d8331b8c4400fbbc1bb2ca879ef97 frame-g
dl d19660_35e7830ea4474e27b852df830941cce8 frame-h
dl d19660_4e3bb92e4b9b46d6b422f9a0c37c9848 frame-i
dl d19660_ff469a76b42f4ba791a8dee914fbb29c explore-a
dl d19660_de03fb4c07b440cf8c2e6a62d2acb11a explore-b
dl d19660_b969441058554b8ea47387f1bfa536b7 version-a
ls -la /tmp/wixraw
```

- [ ] **Step 2: View the downloads and map them to sections**

Read the PNGs (Read tool on each) to confirm what each is (alt names are opaque Chinese screenshot filenames). Build a manifest comment mapping `final name → section`. Rename the temp files to their final semantic names based on what they actually show (hero/overview, workshop, blueprint, personas, competitive, lo-fi, spring-progress, spring-engagement, session-overview, skill-breakdown, explorations before/after). This mapping is consumed by Task 6.

- [ ] **Step 3: Optimize and move into public**

Cap longest edge at 1600px with macOS `sips` (downscale only) and copy into the repo. Avatars (`persona-*`) stay small:

```bash
mkdir -p public/work/varsity
for f in /tmp/wixraw/*.png; do
  sips -Z 1600 "$f" --out "public/work/varsity/$(basename "$f")" >/dev/null
done
# avatars: small square
sips -Z 200 /tmp/wixraw/persona-daisy.png --out public/work/varsity/persona-daisy.png >/dev/null
sips -Z 200 /tmp/wixraw/persona-david.png --out public/work/varsity/persona-david.png >/dev/null
ls -la public/work/varsity | head -40
du -sh public/work/varsity
```

- [ ] **Step 4: Commit**

```bash
git add public/work/varsity
git commit -m "feat(work): add real Varsity dashboard screenshots (optimized)"
```

---

### Task 2: Extend Project type with case-study meta fields

**Files:**
- Modify: `lib/projects.ts:7-20`
- Test: `lib/projects.test.ts`

- [ ] **Step 1: Write the failing test**

Add to `lib/projects.test.ts`:

```ts
it("loads optional case-study meta on varsity project", () => {
  const p = getAllProjects().find((x) => x.slug === "varsity-tutors-parent-dashboard");
  expect(p).toBeTruthy();
  expect(p!.duration).toBe("8 weeks");
  expect(p!.skills).toContain("User Research");
  expect(p!.tools).toContain("Figma");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `p!.duration` is `undefined` (field not on type / not in frontmatter yet).

- [ ] **Step 3: Add optional fields to the `Project` type**

In `lib/projects.ts`, extend the `Project` type (after `confidential: boolean;`, before the closing brace at line 20):

```ts
  duration?: string;
  skills?: string[];
  tools?: string[];
  context?: string;
```

(No loader logic change needed — `readProjectFile` already spreads all frontmatter `data` onto `meta`.)

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: the new test PASSES once Task 6 adds the frontmatter. NOTE: this test depends on Task 6's frontmatter. Run it after Task 6; for now confirm the type compiles via `npx tsc --noEmit`. Expected: no type errors.

- [ ] **Step 5: Commit**

```bash
git add lib/projects.ts lib/projects.test.ts
git commit -m "feat(projects): optional duration/skills/tools/context meta fields"
```

---

### Task 3: Refine `Figure` — blur-up load, width variants, self-reveal

**Files:**
- Modify: `components/mdx/figure.tsx` (full rewrite)

- [ ] **Step 1: Rewrite `components/mdx/figure.tsx`**

```tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Placeholder } from "../placeholder";
import { Reveal } from "../reveal";

type Width = "default" | "wide" | "full";

export function Figure({
  src,
  alt,
  caption,
  width = "default",
  breakout = false,
}: {
  src?: string;
  alt: string;
  caption?: string;
  width?: Width;
  breakout?: boolean; // back-compat alias for width="full"
}) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Cached images may already be complete before onLoad can fire.
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  const w: Width = breakout ? "full" : width;
  const wrap =
    w === "full"
      ? "relative left-1/2 w-[min(1080px,92vw)] -translate-x-1/2"
      : w === "wide"
        ? "relative left-1/2 w-[min(860px,92vw)] -translate-x-1/2"
        : "w-full";

  return (
    <Reveal>
      <figure className={`my-10 ${wrap}`}>
        {src ? (
          <Image
            ref={ref}
            src={src}
            alt={alt}
            width={1600}
            height={1000}
            onLoad={() => setLoaded(true)}
            sizes={w === "default" ? "(max-width: 680px) 100vw, 680px" : "(max-width: 1080px) 92vw, 1080px"}
            className={`w-full rounded-xl border border-border transition-[opacity,filter] duration-700 ease-out ${
              loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"
            }`}
          />
        ) : (
          <Placeholder label={alt} />
        )}
        {caption && (
          <figcaption className="mt-3 text-center text-xs text-muted">{caption}</figcaption>
        )}
      </figure>
    </Reveal>
  );
}
```

Notes: `Reveal` already short-circuits under `prefers-reduced-motion`. The `transition-[opacity,filter]` is neutralized by the global reduced-motion CSS, and the `useEffect`/`onLoad` guard guarantees the image becomes visible regardless.

- [ ] **Step 2: Verify build + lint**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors. (`next/image` forwards `ref` in React 19.)

- [ ] **Step 3: Commit**

```bash
git add components/mdx/figure.tsx
git commit -m "feat(mdx): Figure blur-up load + width variants + scroll reveal"
```

---

### Task 4: New content components + Gallery + register

**Files:**
- Create: `components/mdx/stats.tsx`, `components/mdx/pillars.tsx`, `components/mdx/personas.tsx`, `components/mdx/data-note.tsx`
- Modify: `components/mdx/gallery.tsx`, `components/mdx/index.tsx`

- [ ] **Step 1: Create `components/mdx/stats.tsx`**

```tsx
import { Reveal } from "../reveal";

export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <Reveal>
      <dl className="my-10 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
        {items.map((it) => (
          <div key={it.label} className="bg-bg p-5 text-center">
            <dt className="sr-only">{it.label}</dt>
            <dd>
              <span className="block text-2xl font-semibold tracking-tight sm:text-3xl">{it.value}</span>
              <span className="mt-1 block text-[11px] uppercase tracking-wider text-muted">{it.label}</span>
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
```

- [ ] **Step 2: Create `components/mdx/pillars.tsx`**

```tsx
import type { ReactNode } from "react";
import { Reveal } from "../reveal";

export function Pillars({ items }: { items: { title: string; body?: ReactNode }[] }) {
  return (
    <Reveal>
      <div className="my-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((it, i) => (
          <div key={i} className="rounded-xl border border-border p-5">
            <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
            <h4 className="mt-2 text-[15px] font-semibold tracking-tight">{it.title}</h4>
            {it.body && <p className="mt-1.5 text-[13px] leading-6 text-muted">{it.body}</p>}
          </div>
        ))}
      </div>
    </Reveal>
  );
}
```

- [ ] **Step 3: Create `components/mdx/personas.tsx`**

```tsx
import Image from "next/image";
import { Reveal } from "../reveal";

type Persona = {
  name: string;
  meta: string;
  avatar?: string;
  motivation: string[];
  needs: string[];
};

export function Personas({ people }: { people: Persona[] }) {
  return (
    <Reveal>
      <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {people.map((p) => (
          <div key={p.name} className="rounded-xl border border-border p-5">
            <div className="flex items-center gap-3">
              {p.avatar ? (
                <Image src={p.avatar} alt={p.name} width={48} height={48} className="h-12 w-12 rounded-full border border-border object-cover" />
              ) : (
                <div className="h-12 w-12 rounded-full bg-fg/10" />
              )}
              <div>
                <h4 className="text-[15px] font-semibold tracking-tight">{p.name}</h4>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted">{p.meta}</p>
              </div>
            </div>
            <div className="mt-4 space-y-3 text-[13px] leading-6">
              <div>
                <p className="font-medium">Motivation</p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-muted">
                  {p.motivation.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
              <div>
                <p className="font-medium">Needs</p>
                <ul className="mt-1 list-disc space-y-1 pl-4 text-muted">
                  {p.needs.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
```

- [ ] **Step 4: Create `components/mdx/data-note.tsx`**

```tsx
import type { ReactNode } from "react";
import { Reveal } from "../reveal";

export function DataNote({
  logic,
  principle,
  principleName,
}: {
  logic: ReactNode;
  principle: ReactNode;
  principleName: string;
}) {
  return (
    <Reveal>
      <div className="my-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
        <div className="bg-bg p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Data logic</p>
          <div className="mt-2 text-[13px] leading-6 text-fg/90">{logic}</div>
        </div>
        <div className="bg-bg p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent">Learning science · {principleName}</p>
          <div className="mt-2 text-[13px] leading-6 text-fg/90">{principle}</div>
        </div>
      </div>
    </Reveal>
  );
}
```

- [ ] **Step 5: Update `components/mdx/gallery.tsx`** (optional `cols`, self-reveal)

```tsx
import type { ReactNode } from "react";
import { Reveal } from "../reveal";

export function Gallery({ children, cols = 2 }: { children: ReactNode; cols?: 2 | 3 }) {
  const grid = cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <Reveal>
      <div className={`my-10 grid grid-cols-1 gap-4 ${grid} [&_figure]:my-0`}>{children}</div>
    </Reveal>
  );
}
```

Note: `Figure` already wraps itself in `Reveal`; nested `Reveal` is harmless (inner reveals fire when their parent is in view). If a double-reveal feels heavy in Task 7 preview, drop the inner `Reveal` from `Gallery` (keep Figures'). Verify visually before deciding.

- [ ] **Step 6: Register components in `components/mdx/index.tsx`**

Add imports below the existing ones:

```tsx
import { Stats } from "./stats";
import { Pillars } from "./pillars";
import { Personas } from "./personas";
import { DataNote } from "./data-note";
```

Add to the `mdxComponents` export object (after `Quote,`):

```tsx
  Stats,
  Pillars,
  Personas,
  DataNote,
```

- [ ] **Step 7: Verify build + lint**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add components/mdx
git commit -m "feat(mdx): Stats, Pillars, Personas, DataNote + Gallery cols/reveal"
```

---

### Task 5: Hero meta block + tag pills in case-study template

**Files:**
- Modify: `app/work/[slug]/page.tsx:48-57`

- [ ] **Step 1: Replace the `<header>` block**

Replace the existing header (lines ~49-57) with:

```tsx
      <header className="mx-auto max-w-[680px] px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {meta.company ?? meta.role} · {meta.year}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{meta.title}</h1>
          <p className="mt-4 text-lg text-muted">{meta.summary}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {meta.tags.map((t) => (
              <span key={t} className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                {t}
              </span>
            ))}
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 text-sm sm:grid-cols-4">
            <MetaItem label="Role" value={meta.role} />
            {meta.duration && <MetaItem label="Duration" value={meta.duration} />}
            {meta.skills && <MetaItem label="Skills" value={meta.skills.join(" · ")} />}
            {meta.tools && <MetaItem label="Tools" value={meta.tools.join(" · ")} />}
          </dl>

          {meta.context && <p className="mt-5 text-xs text-muted">{meta.context}</p>}
        </Reveal>
      </header>
```

- [ ] **Step 2: Add the `MetaItem` helper** at the bottom of the file (after the `CaseStudy` component):

```tsx
function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</dt>
      <dd className="mt-1 text-sm text-fg/90">{value}</dd>
    </div>
  );
}
```

- [ ] **Step 3: Verify build + lint**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/work/[slug]/page.tsx
git commit -m "feat(work): richer hero meta (role/duration/skills/tools) + tag pills"
```

---

### Task 6: Write the real case-study content

**Files:**
- Modify: `content/work/varsity-tutors-parent-dashboard.mdx` (full rewrite)

- [ ] **Step 1: Rewrite the file**

Frontmatter (exact) + body. Image `src` paths must match the final names from Task 1's manifest — adjust if the manifest renamed any. Transcribe the narrative prose verbatim from the captured Wix text recorded in the spec's "Source content" section.

```mdx
---
title: "A Trackable Parent Dashboard"
slug: "varsity-tutors-parent-dashboard"
year: 2025
role: "Product Designer"
company: "Varsity Tutors"
duration: "8 weeks"
skills: ["UX/UI Design", "Data Analysis", "User Research"]
tools: ["Figma"]
context: "CMU METALS Capstone × Varsity Tutors"
tags: ["EdTech", "AI", "B2C"]
summary: "Transforming raw tutoring data into clear, actionable progress insights that help parents understand, support, and stay engaged in their child's learning journey."
cover: "/work/varsity/final-homepage.png"
thumbnail: "/work/varsity/final-homepage.png"
order: 2
featured: false
confidential: false
---

## Brief

As part of CMU's METALS Capstone, I worked with Varsity Tutors to improve how parents stay informed about their child's academic progress. Our goal was to design a transparent, engaging parent experience by turning tutoring session data into meaningful, actionable updates. I contributed to research synthesis, data strategy, and the MVP design of a parent-facing progress dashboard, now in the development pipeline.

## Background

Varsity Tutors is expanding its personalized tutoring services for high school students preparing for SAT/ACT/AP. However, current parent reports lack depth, making it hard for families to stay engaged.

After COVID-19, remote and hybrid learning became the norm, increasing the need for data-driven, trust-building tools that support learning beyond grades.

Our research revealed that parents want clearer evidence of progress, personalized next steps, and more visibility into what their child is actually learning.

## Discovery Workshop

Before defining our key research questions, our team ran a collaborative workshop to understand what parents struggle with throughout the tutoring experience. We mapped a full Parent Blueprint — emotional states, actions, and pain points across searching for a platform, matching with a tutor, ongoing sessions, and reviewing progress. We then ran a Crazy 8 ideation session, clustered ideas, and prioritized the most critical opportunities. This grounded our research in real frustrations and shaped the questions below.

### Research questions

<Pillars items={[
  { title: "RQ1", body: "What methodologies can effectively assess skill mastery in tutoring sessions?" },
  { title: "RQ2", body: "How can AI accurately identify and map skills from transcribed tutoring sessions to common standards?" },
]} />

## Methods

<Stats items={[
  { value: "8 wks", label: "Duration" },
  { value: "104", label: "Survey responses" },
  { value: "4", label: "Parent interviews" },
]} />

We used a mixed-methods approach combining academic research with real-world user input:

- **Literature review** — learning-science frameworks to define "progress" across behavioral, cognitive, and emotional dimensions.
- **Expert interview** — a UX researcher at Varsity Tutors, to understand workflows, data trust points, and internal metrics.
- **Parent survey (N = 104)** — how parents assess tutoring effectiveness and which signals they prioritize.
- **Parent interviews (×4)** — semi-structured sessions with parents who are also educators, to uncover deeper needs and mental models.

## Synthesizing insights

To make sense of the qualitative data, we used affinity diagramming — each team member extracted observations from raw data, and together we clustered recurring themes around pain points, expectations, and decision cues. This distilled a large volume of input into four core insights.

### Key findings

<Quote cite="Parent interview">The content my child produces is more important than letter grades.</Quote>

Parents value qualitative and quantitative indicators together, preferring real evidence — learning artifacts or tutor notes — over abstract grades alone.

<Quote cite="Parent interview">I want to know whether they're independently taking responsibility for their tasks.</Quote>

Parents care about engagement but struggle to track it. Behavioral signals — persistence, retries, emotional shifts — make engagement tangible.

<Quote cite="Parent interview">Being able to see past work, like a portfolio of progress, would be helpful.</Quote>

Generic or inconsistent updates reduce confidence. Parents want transparent, tailored communication that is easy to access and act on.

<Quote cite="Parent interview">After understanding progress, I want clear next steps and how I can help at home.</Quote>

Parents' goals vary — from catching up to getting ahead — but all want to know what's next and how to support learning at home.

## User personas

<Personas people={[
  {
    name: "Proactive Daisy",
    meta: "45 · Female · Housewife",
    avatar: "/work/varsity/persona-daisy.png",
    motivation: [
      "Daughter excels academically — perfect 1600 SAT, 5s in all AP courses",
      "Get into a prestigious university and stay ahead of peers",
    ],
    needs: [
      "Highly qualified, selected tutors",
      "Personalized learning plans",
      "An easy-to-understand way to check progress",
    ],
  },
  {
    name: "Reactive David",
    meta: "48 · Male · Busy business man",
    avatar: "/work/varsity/persona-david.png",
    motivation: [
      "Son is struggling in math and needs immediate help",
      "Boost his son's confidence at school",
    ],
    needs: [
      "Noticeable improvement before the upcoming exam",
      "Monitor progress effortlessly without daily involvement",
    ],
  },
]} />

These patterns correlate with the child's age and the family's time availability.

## Service blueprint

We mapped the full parent experience across four stages — Search → Matching → Tutoring Sessions → Renew Subscription — and surfaced four pain points.

<Figure src="/work/varsity/blueprint.png" alt="Service blueprint across four parent journey stages" width="full" caption="Parent journey blueprint — Search, Matching, Sessions, Renew" />

- Parents feel disconnected from their child's mindset and motivation
- Non-standardized tutoring process
- Updates are inconsistent or hard to interpret
- Lack of visibility into student learning

### Co-creation workshop

We hosted a co-creation workshop with Varsity Tutors to align on priorities and agreed on two MVP focus areas: **build more emotional transparency** and **make student learning visible beyond grades** — the areas with the greatest potential to build long-term trust.

### Competitive analysis

<Figure src="/work/varsity/competitive.png" alt="Competitive analysis of Khan Academy, Wyzant, and Google Classroom" width="wide" />

We benchmarked Khan Academy, Wyzant, and Google Classroom. Most platforms offer progress reports but lack personalization or standards alignment; few connect tutoring sessions to actual learning frameworks; most are either student-facing or parent-facing, not both.

## Design opportunities

We reframed the insights into How-Might-We questions to guide the MVP.

<Pillars items={[
  { title: "Show mastery with evidence", body: "HMW show learning mastery using both data and real student examples?" },
  { title: "Make engagement visible", body: "HMW visualize engagement through behavioral and emotional signals?" },
  { title: "Consistent, personalized updates", body: "HMW create a consistent and personalized update system for parents?" },
  { title: "Guide next steps", body: "HMW guide parents with clear, tailored actions and resources?" },
]} />

## From lo-fi to a testable MVP

We started with a low-fidelity dashboard to validate the basic content and structure, then built a more robust Spring MVP with two key views: a Progress & Engagement tab and a progress detail page.

<Gallery>
  <Figure src="/work/varsity/progress-runa-1.png" alt="Progress & Engagement tab" caption="Progress & Engagement" />
  <Figure src="/work/varsity/engagement-linkan.png" alt="Progress detail page" caption="Progress detail" />
</Gallery>

### User testing

We ran 1:1 think-aloud sessions with 4 parents (kids in 5–8th grade) to evaluate whether the dashboard was clear, understandable, and actionable. We mapped quotes in FigJam, grouping by design issues, feature confusion, and next-step suggestions.

<Quote cite="Matthew">I don't know where to look.</Quote>
<Quote cite="Jessica">Charts and terms are too technical.</Quote>
<Quote cite="Ken">I don't know what to do with this.</Quote>

**What we learned:** parents didn't need more data — they needed the right data, surfaced with better structure and language. The design had to show progress in plain terms, guide parents to what matters most, and offer next steps in context.

### Summer MVP goals

<Pillars items={[
  { title: "Find", body: "Help parents quickly locate key information." },
  { title: "Understand", body: "Simplify data to support easy comprehension." },
  { title: "Act", body: "Suggest meaningful, actionable steps for at-home support." },
]} />

## Final MVP

### Homepage

The homepage gives parents a quick snapshot of their child's progress and makes it easy to act or follow up — an opening message, individual session progress, overall subject progress, a service support entry, learning history, and schedule reminders.

<Figure src="/work/varsity/final-homepage.png" alt="Final parent dashboard homepage" width="full" caption="Final homepage — a calm, scannable snapshot" />

### Session overview

The session report helps parents understand what their child accomplished in a specific session.

<Figure src="/work/varsity/session-1.png" alt="Session overview report" width="wide" />

<DataNote
  principleName="Formative Assessment"
  logic={<>Accuracy rate from transcript keywords and problem-solving phrases; effective learning time by removing opening/closing chatter and isolating focused exchanges.</>}
  principle={<>Skill-level feedback after each session enables ongoing instructional adjustment based on performance.</>}
/>

<DataNote
  principleName="Dual Channels"
  logic={<>Identify practiced skills via subject-specific keywords mapped to Knowledge Components; analyze tutor-student dialogue to determine learning status; generate matched visual examples.</>}
  principle={<>Text and visual examples together enhance memory and comprehension through dual-channel processing.</>}
/>

<DataNote
  principleName="Goal Setting"
  logic={<>Aggregate skill mastery across sessions, compare with platform-wide averages, and highlight cumulative growth for trend analysis.</>}
  principle={<>Progress visualization and platform comparison help parents and students set realistic learning goals.</>}
/>

<DataNote
  principleName="Growth Mindset"
  logic={<>Recommend support cards based on recently practiced skills; tailor messages with session-level performance and behavior cues; let parents download relevant materials.</>}
  principle={<>The "Celebrate Every Win" card encourages positive reinforcement and a mindset of continuous growth.</>}
/>

### Skill breakdown

An AI agent breaks each practice segment down — extracting the question, analyzing student thinking, evaluating feedback, and classifying the attempt. Mastery is **Mastered** (3+ practices, ≥90% accuracy), **Familiar** (70–89%), or **Need Support** (<70%). Parents can filter by mastery level to zoom in on where their child excels or struggles.

<Figure src="/work/varsity/session-2.png" alt="Skill breakdown with mastery criteria and filtering" width="wide" />

## Explorations & iterations

Directions we tried that didn't quite work:

**01 · Session skills highlight** — showing example problems on hover plus a next-step suggestion. Informative, but the layout felt heavy and required too much interaction. We chose a cleaner design that prioritized scanning.

**02 · Homepage** — the first version gave too many options equal weight, with no clear path or hierarchy, increasing cognitive load. The update added personalized entry points and clear next steps.

**03 · Defining skill levels** — early "Mastered / Familiar / Need Support" labels weren't self-explanatory. We added quantitative thresholds via microcopy and tooltips so parents could interpret progress confidently.

<Gallery>
  <Figure src="/work/varsity/explore-a.png" alt="Exploration — before" caption="Before" />
  <Figure src="/work/varsity/explore-b.png" alt="Exploration — after" caption="After" />
</Gallery>

## What I learned

**Useful ≠ feel-good.** Some parents liked kids self-reporting emotions after each session, but a happy emoji doesn't mean the child understood the content. Not every feature that feels meaningful is actually useful — we removed it and prioritized clearer indicators of real learning.

**Designing with (limited) data.** A limited dataset pushed us to clean, organize, and make the most of what we had — and to help parents understand what the numbers mean, not just show metrics.

**AI as a design partner.** We used AI for data cleaning, interview synthesis, and parts of the UI process — a collaborator that sped up workflows so we could focus on the decisions that matter.
```

- [ ] **Step 2: Run the data-layer test (now that frontmatter exists)**

Run: `npm test`
Expected: all tests PASS, including `loads optional case-study meta on varsity project` from Task 2.

- [ ] **Step 3: Commit**

```bash
git add content/work/varsity-tutors-parent-dashboard.mdx
git commit -m "feat(work): real Varsity parent dashboard case study content"
```

---

### Task 7: Verify end-to-end + fix

**Files:** none (verification); fixes as needed in the files above.

- [ ] **Step 1: Build + lint + test**

Run: `npm run build && npm run lint && npm test`
Expected: build succeeds, no lint errors, all tests pass. Confirm `/work/varsity-tutors-parent-dashboard` is in the statically generated routes.

- [ ] **Step 2: Preview the case study**

Start the dev server (preview_start), navigate to `/work/varsity-tutors-parent-dashboard`. Check:
- preview_console_logs / preview_network: no errors, all `/work/varsity/*.png` load (200).
- preview_snapshot: hero meta grid (Role/Duration/Skills/Tools), tag pills, all sections present.
- Scroll: visual blocks fade/blur in once; images blur-up rather than pop.
- Personas render 2-up with avatars; DataNote two-column; Pillars numbered; Stats row.

- [ ] **Step 3: Check home card**

Navigate to `/`. Confirm the Varsity card shows the real `final-homepage.png` cover (not a placeholder) and links through.

- [ ] **Step 4: Responsive + dark mode**

preview_resize to mobile (375). Confirm meta grid collapses to 2 cols, galleries/personas/data-notes/pillars stack to 1 col. Toggle dark mode; confirm borders/contrast hold. If the nested Gallery/Figure double-reveal feels heavy, remove the inner `Reveal` from `gallery.tsx` and re-verify.

- [ ] **Step 5: Reduced motion**

In preview, emulate `prefers-reduced-motion: reduce` (preview_eval matchMedia or the resize/emulation path) and confirm content is fully visible and static (no opacity-0 stuck images).

- [ ] **Step 6: Share proof**

preview_screenshot the hero, a personas/data-note section, and the home card — light + dark, desktop + mobile — and share with the user.

- [ ] **Step 7: Final commit (only if fixes were made)**

```bash
git add -A
git commit -m "fix(work): polish from preview verification"
```

---

## Self-review

**Spec coverage:** Brief/Background/Workshop/RQs/Methods/Synthesis/Findings/Personas/Blueprint/Co-creation/Competitive/HMW/Lo-fi→Spring/Testing/Summer goals/Final MVP (homepage, session overview ×4 principles, skill breakdown)/Explorations/Lessons — all present in Task 6. Template polish (hero meta, reveals) in Tasks 3/5. Components (Figure, Gallery, Personas, Pillars, DataNote, Stats) in Tasks 3/4. Images in Task 1. Frontmatter cover/thumbnail/summary in Task 6. Motion + reduced-motion in Tasks 3/4/7. Verification in Task 7. No gaps.

**Type consistency:** `Project` fields `duration: string`, `skills: string[]`, `tools: string[]`, `context: string` (Task 2) match frontmatter (Task 6) and template usage `meta.skills.join(" · ")` (Task 5). Component prop names (`items`, `people`, `logic`/`principle`/`principleName`, `cols`, `width`/`breakout`) are consistent between definition (Tasks 3/4) and MDX usage (Task 6).

**Placeholders:** none — all steps contain real code, commands, and copy. The only execution-time variable is image filenames, resolved by Task 1's manifest and reused verbatim in Task 6.
