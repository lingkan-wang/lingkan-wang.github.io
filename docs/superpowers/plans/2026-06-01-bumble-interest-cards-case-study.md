# Bumble Interest Cards Case Study — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the placeholder `bumble-interest-cards.mdx` into a real, polished editorial case study using the assets scraped from Wix, and upgrade the shared case-study template with reusable MDX components.

**Architecture:** Real Wix imagery lands in `public/work/bumble-interest-cards/` (6 microinteraction GIFs converted to muted-loop MP4 + poster). Four reusable client components (`Compare`, `Showcase`, `Metrics`, enhanced `Figure`) self-animate with the existing `lib/motion.ts` Emil tokens and respect `prefers-reduced-motion`. The case-study template (`app/work/[slug]/page.tsx` + `components/mdx`) gains an "At a glance" strip and numbered section rhythm — benefiting all 5 projects.

**Tech Stack:** Next.js 16 (App Router, RSC), React 19, Tailwind v4, Framer Motion 12, MDX (next-mdx-remote), vitest. Asset conversion via `ffmpeg-static` (npx, no system install) + macOS `sips` for posters.

---

## Asset inventory (already downloaded to `public/work/bumble-interest-cards/_raw/`)

Visually inspected. Final selection and renames:

| Raw | Final name | Role in case study |
|-----|-----------|--------------------|
| `14_70ade03c.png` (3023×1952) | `cover.png` | Hero/cover — laptop + phone, "running buddy" card, yellow bg |
| `19_8e45adc7.png` (2242×1700) | `flow-states.png` | The 4-state loop (Initiators 1–3 + Receiver premium-locked) |
| `12_6172484f.png` (2356×1076) | `sketches.png` | Hand-drawn ideation wireframes |
| `15_727a5755.jpg` (438×854) | `card-receiver.jpg` | Receiver — card w/ trust cues ("both from CMU") |
| `24_e9937ba2.jpg` (438×854) | `card-premium.jpg` | Receiver Premium — host photo revealed |
| `06_4439bb52.jpg` (438×854) | `chats.jpg` | Manage — interested users + recent chats |
| `01_00118d9a.png` (1250×1653) | `platforms.png` | iOS vs Android adjustments (annotated) |
| `02_257b5bff.png` (434×940) | `ref-standouts.png` | Competitive scan — Bumble Standouts |
| `21_ce47dba7.png` (434×940) | `ref-events.png` | Competitive scan — events app |
| `23_e94bdf54.png` (434×940) | `ref-hinge.png` | Competitive scan — dating profile |
| `20_b849db84.gif` | `mi-nav-arrow.{mp4,jpg}` | Microinteraction — Browse / nav arrow |
| `25_f7094dba.gif` | `mi-join.{mp4,jpg}` | Microinteraction — Join (rings) |
| `16_7a532b77.gif` (3.4 MB!) | `mi-add.{mp4,jpg}` | Microinteraction — Quick-post add button |
| `10_4efcbdd4.gif` | `mi-hover.{mp4,jpg}` | Microinteraction — Hover button fill |
| `08_4c4c7588.gif` | `mi-chat.{mp4,jpg}` | Microinteraction — Chat row hover |
| `04_37ed7c1d.gif` | `mi-publish.{mp4,jpg}` | Microinteraction — Publish confirmation |

**Not used** (dropped for the editorial cut): `07` (66×66 icon), `22` (decorative banner), `18` (dup of `15`), `13`/`17` (extra competitive refs), `03`/`05`/`09`/`11` (14k–18k px research/flow boards — too large, omitted for restraint). The `_raw/` dir is deleted at the end of Task 1.

---

## File structure

- **Create:**
  - `components/mdx/compare.tsx` — `<Compare>` + `<CompareRow>`
  - `components/mdx/showcase.tsx` — `<Showcase>` + `<ShowcaseItem>` (video, in-view play)
  - `components/mdx/metrics.tsx` — `<Metrics>` + `<Metric>`
  - `components/project-meta.tsx` — "At a glance" strip
  - `public/work/bumble-interest-cards/*` — final assets
- **Modify:**
  - `lib/projects.ts` — add `timeline?`, `platform?`, `tools?` to `Project`
  - `lib/projects.test.ts` — assert new fields parse
  - `components/mdx/figure.tsx` — add `video` source + click-to-zoom lightbox
  - `components/mdx/index.tsx` — register `Compare`, `CompareRow`, `Showcase`, `ShowcaseItem`, `Metrics`, `Metric`; add `case-prose` class + numbered h2
  - `app/work/[slug]/page.tsx` — render `<ProjectMeta>` in hero
  - `app/globals.css` — numbered-section counter styles
  - `content/work/bumble-interest-cards.mdx` — real content + frontmatter

---

## Task 1: Asset pipeline (select, rename, convert GIFs, clean up)

**Files:** `public/work/bumble-interest-cards/` (downloaded raws present in `_raw/`)

- [ ] **Step 1: Copy + rename the stills**

```bash
cd public/work/bumble-interest-cards
cp _raw/14_70ade03c.png cover.png
cp _raw/19_8e45adc7.png flow-states.png
cp _raw/12_6172484f.png sketches.png
cp _raw/15_727a5755.jpg card-receiver.jpg
cp _raw/24_e9937ba2.jpg card-premium.jpg
cp _raw/06_4439bb52.jpg chats.jpg
cp _raw/01_00118d9a.png platforms.png
cp _raw/02_257b5bff.png ref-standouts.png
cp _raw/21_ce47dba7.png ref-events.png
cp _raw/23_e94bdf54.png ref-hinge.png
```

- [ ] **Step 2: Generate first-frame posters for the 6 GIFs (sips)**

```bash
sips -s format jpeg _raw/20_b849db84.gif --out mi-nav-arrow.jpg
sips -s format jpeg _raw/25_f7094dba.gif --out mi-join.jpg
sips -s format jpeg _raw/16_7a532b77.gif --out mi-add.jpg
sips -s format jpeg _raw/10_4efcbdd4.gif --out mi-hover.jpg
sips -s format jpeg _raw/08_4c4c7588.gif --out mi-chat.jpg
sips -s format jpeg _raw/04_37ed7c1d.gif --out mi-publish.jpg
```

Expected: 6 `.jpg` posters created. (sips reads the first GIF frame.)

- [ ] **Step 3: Convert the 6 GIFs to muted-loop MP4 via ffmpeg-static (no system install)**

```bash
cd /Users/lingkanwang/lingkan-portfolio/.claude/worktrees/competent-beaver-ac28be
npm i -D ffmpeg-static
FF=$(node -e "process.stdout.write(require('ffmpeg-static'))")
cd public/work/bumble-interest-cards
for pair in "20_b849db84:mi-nav-arrow" "25_f7094dba:mi-join" "16_7a532b77:mi-add" "10_4efcbdd4:mi-hover" "08_4c4c7588:mi-chat" "04_37ed7c1d:mi-publish"; do
  src="_raw/${pair%%:*}.gif"; out="${pair##*:}.mp4"
  "$FF" -y -i "$src" -movflags +faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -an "$out"
done
ls -la *.mp4
```

Expected: 6 `.mp4` files, each much smaller than its GIF (esp. `mi-add.mp4` ≪ 3.4 MB).
**Fallback if `npm i` has no network / ffmpeg-static fails:** skip MP4; copy the GIFs (`cp _raw/20_b849db84.gif mi-nav-arrow.gif`, etc.) and the `Showcase` component will use the GIF + poster path (Task 6 handles both).

- [ ] **Step 4: Remove ffmpeg-static devDep + raw dir**

```bash
cd /Users/lingkanwang/lingkan-portfolio/.claude/worktrees/competent-beaver-ac28be
npm uninstall ffmpeg-static
rm -rf public/work/bumble-interest-cards/_raw
git checkout package.json package-lock.json   # only if uninstall left churn; keep clean
ls public/work/bumble-interest-cards
```

- [ ] **Step 5: Commit**

```bash
git add public/work/bumble-interest-cards
git commit -m "assets(bumble): scraped Wix imagery + GIF→mp4 microinteractions"
```

---

## Task 2: Extend the Project type with At-a-glance fields

**Files:** Modify `lib/projects.ts`; Test `lib/projects.test.ts`

- [ ] **Step 1: Add fields to the `Project` type** (`lib/projects.ts`, in the `export type Project = {` block, after `company?: string;`)

```ts
  timeline?: string;
  platform?: string;
  tools?: string;
```

- [ ] **Step 2: Write a failing test** — append to `lib/projects.test.ts`:

```ts
it("parses optional at-a-glance fields when present", () => {
  const bumble = getAllProjects().find((p) => p.slug === "bumble-interest-cards");
  expect(bumble?.timeline).toBe("5 weeks");
  expect(bumble?.platform).toBeTruthy();
  expect(bumble?.tools).toBe("Figma");
});
```

- [ ] **Step 3: Run — expect FAIL** (frontmatter not yet written): `npm test`
Expected: the new test fails (`timeline` undefined). It passes after Task 8 writes the frontmatter. (Type change alone compiles.)

> Note: this test goes green only once Task 8 lands the frontmatter. That's intentional — leave it failing until then; do not commit a skip.

- [ ] **Step 4: Commit the type change**

```bash
git add lib/projects.ts lib/projects.test.ts
git commit -m "feat(projects): optional timeline/platform/tools fields"
```

---

## Task 3: "At a glance" strip + numbered-section rhythm

**Files:** Create `components/project-meta.tsx`; Modify `app/work/[slug]/page.tsx`, `components/mdx/index.tsx`, `app/globals.css`

- [ ] **Step 1: Create `components/project-meta.tsx`**

```tsx
import type { Project } from "@/lib/projects";

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</dt>
      <dd className="text-sm text-fg">{value}</dd>
    </div>
  );
}

export function ProjectMeta({ meta }: { meta: Project }) {
  const items: Array<[string, string | undefined]> = [
    ["Role", meta.role],
    ["Timeline", meta.timeline],
    ["Platform", meta.platform],
    ["Tools", meta.tools],
  ];
  const present = items.filter(([, v]) => Boolean(v)) as Array<[string, string]>;
  if (present.length === 0) return null;
  return (
    <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-border py-6 sm:grid-cols-4">
      {present.map(([label, value]) => (
        <Item key={label} label={label} value={value} />
      ))}
    </dl>
  );
}
```

- [ ] **Step 2: Render it in the hero** (`app/work/[slug]/page.tsx`) — import and place inside the `<Reveal>` header, after the summary `<p>`:

```tsx
import { ProjectMeta } from "@/components/project-meta";
// ...
          <p className="mt-4 text-lg text-muted">{meta.summary}</p>
          <ProjectMeta meta={meta} />
```

- [ ] **Step 3: Add `case-prose` class to the prose container + numbered h2** (`components/mdx/index.tsx`)

In `Prose`, add the class:

```tsx
export function Prose({ children }: { children: ReactNode }) {
  return <div className="case-prose mx-auto max-w-[680px] px-6">{children}</div>;
}
```

Change the `h2` component to carry the rule (the number comes from CSS counters in Step 4):

```tsx
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mt-16 mb-4 border-t border-border pt-8 text-2xl font-semibold tracking-tight" {...props} />
  ),
```

- [ ] **Step 4: Add counter styles** (`app/globals.css`, after the `body` block)

```css
.case-prose { counter-reset: section; }
.case-prose h2 { counter-increment: section; position: relative; }
.case-prose h2::before {
  content: counter(section, decimal-leading-zero);
  display: block;
  margin-bottom: 0.5rem;
  font-family: var(--font-mono), monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--color-muted);
}
```

- [ ] **Step 5: Commit**

```bash
git add components/project-meta.tsx app/work/'[slug]'/page.tsx components/mdx/index.tsx app/globals.css
git commit -m "feat(case-study): at-a-glance strip + numbered section rhythm"
```

---

## Task 4: `<Metrics>` component

**Files:** Create `components/mdx/metrics.tsx`

- [ ] **Step 1: Create `components/mdx/metrics.tsx`** (client; stagger reveal; reduced-motion safe)

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { durations, easeOut } from "@/lib/motion";

export function Metrics({ children }: { children: ReactNode }) {
  return (
    <div className="my-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
      {children}
    </div>
  );
}

export function Metric({ value, label, index = 0 }: { value: string; label: string; index?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="flex flex-col gap-1.5 bg-bg p-5"
      initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: durations.enter, ease: easeOut, delay: index * 0.06 }}
    >
      <span className="text-3xl font-semibold tracking-tight">{value}</span>
      <span className="text-[13px] leading-snug text-muted">{label}</span>
    </motion.div>
  );
}
```

> The `index` prop drives the stagger. `mdxComponents` injection (Task 8) passes it; when authored directly without `index`, items animate together (still fine).

- [ ] **Step 2: Commit** (register + verify happen in Task 8/9)

```bash
git add components/mdx/metrics.tsx
git commit -m "feat(mdx): Metrics + Metric components"
```

---

## Task 5: `<Compare>` component (Free vs Premium matrix)

**Files:** Create `components/mdx/compare.tsx`

- [ ] **Step 1: Create `components/mdx/compare.tsx`** (client; per-row stagger; Premium column accent-tinted)

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Children, isValidElement, cloneElement, type ReactNode, type ReactElement } from "react";
import { durations, easeOut } from "@/lib/motion";

export function Compare({ a, b, children }: { a: string; b: string; children: ReactNode }) {
  const rows = Children.toArray(children).filter(isValidElement) as ReactElement<CompareRowProps>[];
  return (
    <div className="my-10 overflow-hidden rounded-xl border border-border">
      <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-border bg-[color-mix(in_srgb,var(--color-fg)_3%,transparent)]">
        <span className="p-3.5 font-mono text-[10px] uppercase tracking-widest text-muted">Feature</span>
        <span className="p-3.5 font-mono text-[10px] uppercase tracking-widest text-muted">{a}</span>
        <span className="bg-accent/5 p-3.5 font-mono text-[10px] uppercase tracking-widest text-accent">{b}</span>
      </div>
      {rows.map((row, i) => cloneElement(row, { index: i }))}
    </div>
  );
}

type CompareRowProps = { feature: string; a: string; b: string; index?: number };

export function CompareRow({ feature, a, b, index = 0 }: CompareRowProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="grid grid-cols-[1.4fr_1fr_1fr] border-t border-border first:border-t-0 text-[14px]"
      initial={reduce ? false : { opacity: 0, y: 8 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: durations.base, ease: easeOut, delay: index * 0.05 }}
    >
      <span className="p-3.5 font-medium">{feature}</span>
      <span className="p-3.5 text-muted">{a}</span>
      <span className="bg-accent/5 p-3.5 text-fg">{b}</span>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/mdx/compare.tsx
git commit -m "feat(mdx): Compare + CompareRow feature matrix"
```

---

## Task 6: `<Showcase>` component (microinteraction grid, in-view video)

**Files:** Create `components/mdx/showcase.tsx`

- [ ] **Step 1: Create `components/mdx/showcase.tsx`** (client; plays on in-view, pauses off-screen; reduced-motion → poster only)

```tsx
"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { durations, easeOut } from "@/lib/motion";

export function Showcase({ children }: { children: ReactNode }) {
  return <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>;
}

export function ShowcaseItem({
  src,
  poster,
  label,
  index = 0,
  children,
}: {
  src: string;
  poster: string;
  label: string;
  index?: number;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduce || !isVideo) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView, reduce, isVideo]);

  return (
    <motion.figure
      ref={ref}
      className="m-0 overflow-hidden rounded-xl border border-border"
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: durations.enter, ease: easeOut, delay: index * 0.05 }}
    >
      {isVideo && !reduce ? (
        <video
          ref={videoRef}
          poster={poster}
          src={src}
          muted
          loop
          playsInline
          preload="none"
          className="block w-full bg-[color-mix(in_srgb,var(--color-fg)_4%,transparent)]"
        />
      ) : (
        // reduced-motion, or GIF fallback: show poster (still) — never autoplay motion under reduce
        // eslint-disable-next-line @next/next/no-img-element
        <img src={reduce ? poster : src} alt={label} className="block w-full" loading="lazy" />
      )}
      <figcaption className="border-t border-border p-3.5">
        <span className="block text-sm font-medium">{label}</span>
        <span className="mt-0.5 block text-[13px] leading-snug text-muted">{children}</span>
      </figcaption>
    </motion.figure>
  );
}
```

> Reduced-motion path: always renders the static poster (`<img>` with `poster` src), never the MP4 and never an animated GIF. The GIF-fallback path (no MP4) shows the GIF only when motion is allowed.

- [ ] **Step 2: Commit**

```bash
git add components/mdx/showcase.tsx
git commit -m "feat(mdx): Showcase grid with in-view video playback"
```

---

## Task 7: Enhance `<Figure>` with video + click-to-zoom lightbox

**Files:** Modify `components/mdx/figure.tsx`

- [ ] **Step 1: Rewrite `components/mdx/figure.tsx`** (client; optional `video`; optional `zoom` lightbox — centered modal, scale 0.95→1 + opacity, backdrop blur, spring, Esc/click-out)

```tsx
"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Placeholder } from "../placeholder";

export function Figure({
  src,
  video,
  alt,
  caption,
  breakout = false,
  zoom = false,
}: {
  src?: string;
  video?: string;
  alt: string;
  caption?: string;
  breakout?: boolean;
  zoom?: boolean;
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const width = breakout
    ? "relative left-1/2 w-[min(1080px,92vw)] -translate-x-1/2"
    : "w-full";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const media = video ? (
    <video src={video} muted loop autoPlay={!reduce} playsInline preload="metadata"
      className="w-full rounded-xl border border-border" />
  ) : src ? (
    <Image src={src} alt={alt} width={1080} height={675}
      className={`w-full rounded-xl border border-border ${zoom ? "cursor-zoom-in" : ""}`}
      sizes={breakout ? "(max-width: 1080px) 92vw, 1080px" : "(max-width: 680px) 100vw, 680px"}
      onClick={zoom ? () => setOpen(true) : undefined} />
  ) : (
    <Placeholder label={alt} />
  );

  return (
    <figure className={`my-10 ${width}`}>
      {media}
      {caption && <figcaption className="mt-3 text-center text-xs text-muted">{caption}</figcaption>}
      <AnimatePresence>
        {open && src && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <motion.img
              src={src} alt={alt}
              className="max-h-[90vh] max-w-[92vw] rounded-xl"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </figure>
  );
}
```

> `next/image` with `onClick` is fine in a client component. Lightbox is a centered modal (center-origin per Emil), scales from 0.95 with backdrop blur, closes on Esc / backdrop click.

- [ ] **Step 2: Commit**

```bash
git add components/mdx/figure.tsx
git commit -m "feat(mdx): Figure supports video + click-to-zoom lightbox"
```

---

## Task 8: Register components, set cover, write the case-study content

**Files:** Modify `components/mdx/index.tsx`, `content/work/bumble-interest-cards.mdx`

- [ ] **Step 1: Register new components + auto-index children** (`components/mdx/index.tsx`)

Add imports and entries. To make `index`-based stagger work without authoring `index=` in MDX, inject it for `Metrics`/`Showcase`/`Compare` children:

```tsx
import { Compare, CompareRow } from "./compare";
import { Showcase, ShowcaseItem } from "./showcase";
import { Metrics, Metric } from "./metrics";
// ... in mdxComponents object:
  Figure,
  Gallery,
  MetricCallout,
  Metrics,
  Metric,
  Compare,
  CompareRow,
  Showcase,
  ShowcaseItem,
  Quote,
```

(The components already default `index=0`; `Compare`/`Showcase`/`Metrics` clone or map children to pass `index` — `Compare` clones via `cloneElement`; for `Showcase`/`Metrics`, update their wrappers to clone children with `index` the same way `Compare` does. Apply the identical `Children.map((c,i)=>cloneElement(c,{index:i}))` pattern in `Showcase` and `Metrics` so authored MDX needs no `index` prop.)

> Implementation note for the wrappers: in `metrics.tsx` and `showcase.tsx`, replace `{children}` in the wrapper with:
> `{Children.toArray(children).filter(isValidElement).map((c, i) => cloneElement(c as ReactElement<{index?: number}>, { index: i }))}`
> (add the `Children, isValidElement, cloneElement, ReactElement` imports from `react`, matching `compare.tsx`).

- [ ] **Step 2: Replace `content/work/bumble-interest-cards.mdx`** with the full editorial case study:

```mdx
---
title: "Bumble Interest Cards"
slug: "bumble-interest-cards"
year: 2025
role: "Product Designer"
company: "Bumble"
timeline: "5 weeks"
platform: "iOS · Android · Web"
tools: "Figma"
tags: ["Social", "Location-Based", "0→1"]
summary: "A location-based ‘Interest Cards’ feature for Bumble BFF & Bizz — turning everyday activities into low-pressure ways to meet, with a Premium moment that feels earned, not nagged."
cover: "/work/bumble-interest-cards/cover.png"
thumbnail: "/work/bumble-interest-cards/cover.png"
order: 3
featured: true
confidential: false
---

## Overview

Bumble has a huge, active community — but most people aren’t on Premium, and its location features are easy to miss. In BFF and Bizz especially, that means missed chances to meet the people who are *right there*: the runner at the same gym, the founder at the same coworking space.

Over five weeks I designed **Interest Cards** — short, location-anchored posts that let people broadcast what they’re up to (“Looking for a running buddy at Tepper Gym this week”) and discover others nearby doing the same. The aim: lower the barrier to the first move, and build a Premium upgrade moment that feels earned rather than nagged.

<Figure src="/work/bumble-interest-cards/flow-states.png" alt="Four key states of the Interest Cards flow: an initiator publishes a card, receivers discover it nearby, and Premium unlocks photos and reach" breakout zoom caption="The core loop — an initiator publishes a card; people nearby discover it; Premium unlocks reach and photos." />

## The insight

I interviewed three people who’d recently relocated, and scanned how dating, social, and events apps handle discovery. Three things stood out:

- **Context beats profiles.** People hesitate to message a stranger’s profile cold, but respond easily when a shared activity gives them something to talk about.
- **Safety is the gate — especially for women.** Several said they’d happily share location, but only when the personal benefit was clear and they stayed in control of what they revealed.
- **Intent is seasonal.** BFF and Bizz conversions climb in spring and summer, when people are most open to meeting. The feature should ride that wave with timely, contextual nudges.

<Gallery>
  <Figure src="/work/bumble-interest-cards/ref-standouts.png" alt="Bumble Standouts screen reviewed during the competitive scan" />
  <Figure src="/work/bumble-interest-cards/ref-events.png" alt="A location-based events app reviewed during the competitive scan" />
  <Figure src="/work/bumble-interest-cards/ref-hinge.png" alt="A dating profile reviewed during the competitive scan" />
</Gallery>

## The solution

Interest Cards sit as a new layer inside Bumble’s existing structure, so there’s almost nothing new to learn. The flow has four key states:

- **Publish** — pick an activity, time, and place; choose a card style; decide whether to show your photo.
- **Discover (free)** — browse cards nearby, with trust cues like shared schools and mutual interests surfaced up front.
- **Discover (Premium)** — reveal host photos and search beyond the 1 km radius.
- **Manage** — see who’s interested, and jump straight into a one-to-one or group chat.

<Gallery>
  <Figure src="/work/bumble-interest-cards/card-receiver.jpg" alt="Receiver view of a card with trust cues — shared school and outdoor interests" caption="Discover (free): trust cues up front." />
  <Figure src="/work/bumble-interest-cards/card-premium.jpg" alt="Premium receiver view with the host’s photo revealed" caption="Discover (Premium): photo revealed." />
  <Figure src="/work/bumble-interest-cards/chats.jpg" alt="Manage view listing interested users and recent chats" caption="Manage: who’s interested, and chats." />
</Gallery>

I worked low-fidelity first, sketching the publish flow and the upsell moments before committing to pixels.

<Figure src="/work/bumble-interest-cards/sketches.png" alt="Hand-drawn wireframes of the publish flow and upsell moments" breakout zoom caption="Early wireframes — entry point, Bumble Coins, fast location select, the upsell moment." />

<Figure src="/work/bumble-interest-cards/platforms.png" alt="Annotated comparison of iOS and Android adjustments — corner radius, keyboard height, screen ratios" breakout zoom caption="Designed for both platforms — corner radii, keyboard height, and safe areas tuned per OS." />

## Designing for conversion

Rather than gate the whole feature, I placed Premium where it removes real friction — seeing who you’re about to meet, and reaching past your immediate block.

<Compare a="Free" b="Premium">
  <CompareRow feature="Discovery range" a="1 km radius" b="Unlimited" />
  <CompareRow feature="Host photos" a="Hidden" b="Revealed" />
  <CompareRow feature="Card styles" a="Basic" b="Expressive templates" />
  <CompareRow feature="Photo views" a="—" b="Earn Bumble Coins per view" />
</Compare>

Each upgrade trades on a clear, felt benefit — which is what makes the moment convert without feeling coercive.

## Microinteractions

The details are where the feature earns trust. Six interactions, each with one job:

<Showcase>
  <ShowcaseItem src="/work/bumble-interest-cards/mi-nav-arrow.mp4" poster="/work/bumble-interest-cards/mi-nav-arrow.jpg" label="Browse cards">The arrow slides as its background brightens — a quiet hint you can move between cards.</ShowcaseItem>
  <ShowcaseItem src="/work/bumble-interest-cards/mi-join.mp4" poster="/work/bumble-interest-cards/mi-join.jpg" label="Join">Two rings drift together — a small, playful symbol of connection.</ShowcaseItem>
  <ShowcaseItem src="/work/bumble-interest-cards/mi-add.mp4" poster="/work/bumble-interest-cards/mi-add.jpg" label="Quick post">The add button rotates 45° and lifts two actions into view.</ShowcaseItem>
  <ShowcaseItem src="/work/bumble-interest-cards/mi-hover.mp4" poster="/work/bumble-interest-cards/mi-hover.jpg" label="Confirm">A button fills with yellow on hover, so the tap feels heard before it lands.</ShowcaseItem>
  <ShowcaseItem src="/work/bumble-interest-cards/mi-chat.mp4" poster="/work/bumble-interest-cards/mi-chat.jpg" label="Pick a chat">Hovering a row lifts it onto a clean surface.</ShowcaseItem>
  <ShowcaseItem src="/work/bumble-interest-cards/mi-publish.mp4" poster="/work/bumble-interest-cards/mi-publish.jpg" label="Published">A checkmark bursts to confirm the card went live.</ShowcaseItem>
</Showcase>

## Validation

I ran click-through prototype tests with 30 BFF and Bizz users — free and Premium — over two weeks.

<Metrics>
  <Metric value="87%" label="task success rate" />
  <Metric value="<20s" label="avg. time to create a card" />
  <Metric value="73%" label="found card creation intuitive" />
  <Metric value="68%" label="said location recs made acting easier" />
</Metrics>

The friction that remained clustered around first-run onboarding — people wanted a clearer first step before the map filled with cards.

## Reflection

Interest Cards was a study in designing interactions that serve the person and the business at once: the safety controls that earn a location opt-in are the same ones that make Premium worth paying for. Given more time I’d invest in first-run onboarding and keep collecting behavioral data to tune when — and to whom — a card is worth surfacing.
```

- [ ] **Step 3: If Task 1 used the GIF fallback** (no `.mp4`), replace each `mi-*.mp4` in the `src=` above with `mi-*.gif`. (Posters stay.)

- [ ] **Step 4: Run the lib test — expect PASS now**

Run: `npm test`
Expected: all pass, including "parses optional at-a-glance fields".

- [ ] **Step 5: Commit**

```bash
git add content/work/bumble-interest-cards.mdx components/mdx/index.tsx
git commit -m "feat(work): real Bumble Interest Cards case study"
```

---

## Task 9: Build, lint, and live-preview verification

**Files:** none (verification)

- [ ] **Step 1: Typecheck + lint + build + test**

```bash
npm run lint && npm run build && npm test
```
Expected: all succeed, `/work/bumble-interest-cards` in the static output.

- [ ] **Step 2: Live preview (preview_start), then verify:**
  - Home card shows the real Bumble cover.
  - `/work/bumble-interest-cards`: At-a-glance strip (Role · Timeline · Platform · Tools); numbered sections (01–07); cover; Gallery; Compare matrix; Showcase videos autoplay in view and pause off-screen; Metrics stagger in; lightbox opens on the breakout figures (Esc/backdrop closes).
  - `preview_console_logs` / `preview_network`: no errors, MP4s load (or GIF fallback).
  - `preview_resize` mobile: strip stacks to 2-col, galleries to 1-col, Compare stays legible.
  - Toggle dark mode: tints/borders read correctly.
  - Emulate `prefers-reduced-motion`: Showcase shows posters (no autoplay), no transform-based motion. (`preview_eval` to set the media query or verify via DevTools.)
  - `preview_screenshot` for the record.
- [ ] **Step 3:** Fix any issues found, then re-verify from Step 1.

---

## Self-review notes

- **Spec coverage:** content cut (7 beats) → Task 8; Compare/Showcase/Metrics/Figure → Tasks 5/6/7; at-a-glance + h2 rhythm + cover → Tasks 3/8; frontmatter fields → Task 2; image pipeline incl. GIF→mp4 + ffmpeg-static + sips fallback → Task 1; Emil interaction details (in-view video, lightbox center-origin, stagger, reduced-motion) → Tasks 4/6/7; build+lint+test+preview → Task 9. All spec sections map to a task.
- **Reduced-motion:** handled in Metrics, Compare, Showcase, Figure (poster-only path) and inherited globally via `globals.css`.
- **No new runtime deps:** `ffmpeg-static` is install-then-uninstall, dev-only, and produces committed MP4s; the fallback needs no install at all.
- **Type consistency:** `index?: number` is the stagger prop across Metric/CompareRow/ShowcaseItem; `Compare`/`Showcase`/`Metrics` all inject it via the same `Children.map(cloneElement)` pattern.
