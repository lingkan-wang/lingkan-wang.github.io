# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Lingkan Wang's product-design portfolio — an Emil-Kowalski-inspired site with a typographic project index (cursor-following preview), full case-study pages, About, Playground, light/dark, and refined subtle motion.

**Architecture:** Next.js (App Router, SSG) + TypeScript + Tailwind CSS v4 + Framer Motion. Case studies are MDX files in `content/work/` parsed with `gray-matter` and rendered server-side with `next-mdx-remote/rsc`. Design tokens are CSS custom properties that swap on a `.dark` class (via `next-themes`), so one set of Tailwind utilities serves both themes. Motion is centralized in reusable primitives that honor `prefers-reduced-motion`.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind v4, Framer Motion, next-themes, next-mdx-remote, gray-matter, Geist fonts, Vitest (one logic test).

**Reference skills during implementation:** consult `animate` and `emil-design-eng` for motion/polish decisions. Verify UI changes in the browser with the gstack `/browse` skill (per global CLAUDE.md — never use claude-in-chrome).

**Spec:** `docs/superpowers/specs/2026-05-31-portfolio-redesign-design.md`

---

## File Structure

```
lingkan-portfolio/
├─ app/
│  ├─ layout.tsx                 # html shell, fonts, ThemeProvider, Nav, Footer
│  ├─ template.tsx               # route-change fade-up transition
│  ├─ globals.css                # Tailwind v4 import + design tokens + dark overrides
│  ├─ page.tsx                   # Work (home): hero + ProjectIndex
│  ├─ work/[slug]/page.tsx       # case study: MDX render + meta + prev/next
│  ├─ about/page.tsx
│  └─ playground/page.tsx
├─ components/
│  ├─ theme-provider.tsx         # next-themes wrapper (client)
│  ├─ theme-toggle.tsx           # light/dark button (client)
│  ├─ nav.tsx                    # header + mobile menu (client)
│  ├─ footer.tsx                 # Contact section (server)
│  ├─ reveal.tsx                 # scroll-reveal motion primitive (client)
│  ├─ project-index.tsx          # cursor-following preview list (client)
│  ├─ placeholder.tsx            # neutral image placeholder (server)
│  └─ mdx/
│     ├─ index.tsx               # mdxComponents map + Prose wrapper
│     ├─ figure.tsx
│     ├─ gallery.tsx
│     ├─ metric-callout.tsx
│     └─ quote.tsx
├─ lib/
│  ├─ site.ts                    # name, bio, contact, nav, resume URL
│  ├─ motion.ts                  # shared transition/variant tokens
│  ├─ projects.ts                # fs + gray-matter loader, types, sorting
│  └─ projects.test.ts           # Vitest: loader logic
├─ content/work/*.mdx            # 5 seed case studies (frontmatter + placeholder body)
├─ public/work/<slug>/           # real images later (Placeholder used until then)
└─ config: package.json, next.config.ts, tsconfig.json, postcss.config.mjs, vitest.config.ts
```

Each component owns one responsibility. `lib/` is pure data/config; `components/` is presentation; `app/` wires them into routes.

---

## Task 1: Scaffold the Next.js app into the existing repo

**Files:**
- Create: whole Next.js scaffold under `~/lingkan-portfolio/`
- Preserve: existing `.git`, `.gitignore`, `docs/`, `.superpowers/`

- [ ] **Step 1: Generate the scaffold in a temp dir**

The repo dir already has `docs/` and `.git`, which makes `create-next-app` refuse to run in place. Scaffold into a sibling dir, then merge in.

```bash
cd ~
npx create-next-app@latest lingkan-portfolio-scaffold \
  --typescript --tailwind --app --eslint \
  --no-src-dir --import-alias "@/*" --use-npm --turbopack --skip-install
```

- [ ] **Step 2: Merge scaffold into the repo (keep our .git/.gitignore)**

```bash
rsync -a --exclude '.git' --exclude '.gitignore' --exclude 'node_modules' \
  ~/lingkan-portfolio-scaffold/ ~/lingkan-portfolio/
rm -rf ~/lingkan-portfolio-scaffold
cd ~/lingkan-portfolio
```

- [ ] **Step 3: Install runtime + dev dependencies**

```bash
cd ~/lingkan-portfolio
npm install framer-motion next-themes next-mdx-remote gray-matter geist
npm install -D vitest
```

- [ ] **Step 4: Verify the dev server boots**

```bash
npm run dev
```
Expected: starts on http://localhost:3000 with the default Next welcome page, no errors. Then stop it (Ctrl-C).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app (TS, Tailwind v4, App Router) + deps"
```

---

## Task 2: Design tokens, global styles, and fonts

**Files:**
- Modify: `app/globals.css` (replace contents)
- Modify: `app/layout.tsx` (fonts + body classes — full rewrite happens in Task 8; here only fonts/tokens groundwork)

- [ ] **Step 1: Replace `app/globals.css` with tokens**

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-bg: #ffffff;
  --color-fg: #0a0a0a;
  --color-muted: #737373;
  --color-border: #e5e5e5;
  --color-accent: #2563eb;

  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

:root { color-scheme: light; }

.dark {
  --color-bg: #0a0a0a;
  --color-fg: #ededed;
  --color-muted: #a1a1a1;
  --color-border: #262626;
  --color-accent: #3b82f6;
  color-scheme: dark;
}

* { border-color: var(--color-border); }

html { scroll-behavior: smooth; }

body {
  background-color: var(--color-bg);
  color: var(--color-fg);
  font-family: var(--font-sans), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

This makes utilities `bg-bg`, `text-fg`, `text-muted`, `border-border`, `text-accent` resolve to the CSS vars; the `.dark` block swaps the vars so the same utilities theme automatically.

- [ ] **Step 2: Verify Tailwind compiles**

```bash
npm run build
```
Expected: build succeeds (default page still present). If it fails on `@custom-variant`, confirm Tailwind v4 is installed (`npm ls tailwindcss` → 4.x).

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: design tokens + light/dark CSS variables"
```

---

## Task 3: Site config

**Files:**
- Create: `lib/site.ts`

- [ ] **Step 1: Write `lib/site.ts`**

```ts
export const site = {
  name: "Lingkan Wang",
  shortName: "Wang",
  role: "Product Designer",
  intro:
    "Product designer with 3 years of experience building AI-powered B2C products. I believe great products come from understanding users and turning insights into action.",
  previously: ["CMU HCII", "Ecovacs Robotics", "KuaiShou (Kwai)", "Varsity Tutors"],
  email: "wanglingkan614@gmail.com",
  phone: "412-996-0978",
  links: {
    linkedin: "https://www.linkedin.com/in/lingkanwang/",
    instagram: "https://www.instagram.com/wanglingkan183/",
    resume:
      "https://f25e664d-0de6-4453-b79e-acf199c878cf.filesusr.com/ugd/d19660_905b470ad44147a3abd29a3f35925ce6.pdf",
  },
  nav: [
    { label: "Work", href: "/" },
    { label: "About", href: "/about" },
    { label: "Playground", href: "/playground" },
  ],
} as const;
```

- [ ] **Step 2: Commit**

```bash
git add lib/site.ts
git commit -m "feat: site config (bio, contact, nav)"
```

---

## Task 4: Motion tokens

**Files:**
- Create: `lib/motion.ts`

- [ ] **Step 1: Write `lib/motion.ts`**

```ts
import type { Transition, Variants } from "framer-motion";

// Emil conventions: short, ease-out enters; springs for interactive.
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const durations = { fast: 0.15, base: 0.2, enter: 0.4 } as const;

export const enterTransition: Transition = {
  duration: durations.enter,
  ease: easeOut,
};

export const previewSpring: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 30,
  mass: 0.5,
};

// fade + slight blur + small rise
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  shown: { opacity: 1, y: 0, filter: "blur(0px)" },
};
```

- [ ] **Step 2: Commit**

```bash
git add lib/motion.ts
git commit -m "feat: shared motion tokens"
```

---

## Task 5: Reveal primitive (scroll-reveal, reduced-motion aware)

**Files:**
- Create: `components/reveal.tsx`

- [ ] **Step 1: Write `components/reveal.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { enterTransition, revealVariants } from "@/lib/motion";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ ...enterTransition, delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/reveal.tsx
git commit -m "feat: Reveal scroll-reveal primitive"
```

---

## Task 6: Theme provider + toggle

**Files:**
- Create: `components/theme-provider.tsx`
- Create: `components/theme-toggle.tsx`

- [ ] **Step 1: Write `components/theme-provider.tsx`**

```tsx
"use client";

import { ThemeProvider as NextThemes } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemes attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </NextThemes>
  );
}
```

- [ ] **Step 2: Write `components/theme-toggle.tsx`**

```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Avoid hydration mismatch: render a same-size placeholder until mounted.
  if (!mounted) {
    return <span className="inline-block size-8" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex size-8 items-center justify-center rounded-md text-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/theme-provider.tsx components/theme-toggle.tsx
git commit -m "feat: theme provider + light/dark toggle"
```

---

## Task 7: Nav (with mobile menu; nav-item clicks are animation-free)

**Files:**
- Create: `components/nav.tsx`

Per spec §7: the mobile menu open/close animates, but clicking a nav item navigates instantly with no per-item click animation. Nav items are plain `Link`s (no `whileTap`).

- [ ] **Step 1: Write `components/nav.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";
import { durations, easeOut } from "@/lib/motion";

export function Nav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-[1080px] items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          {site.shortName}
        </Link>

        {/* desktop */}
        <div className="hidden items-center gap-6 sm:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted transition-colors hover:text-fg">
              {item.label}
            </Link>
          ))}
          <a href={site.links.resume} target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-fg">
            Resume
          </a>
          <ThemeToggle />
        </div>

        {/* mobile controls */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="inline-flex size-8 items-center justify-center rounded-md text-muted hover:text-fg"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* mobile menu: open/close animates; items do not animate on click */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden border-t border-border sm:hidden"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={reduce ? {} : { height: "auto", opacity: 1 }}
            exit={reduce ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: durations.base, ease: easeOut }}
          >
            <div className="flex flex-col gap-1 px-6 py-3">
              {site.nav.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="py-2 text-sm text-muted hover:text-fg">
                  {item.label}
                </Link>
              ))}
              <a href={site.links.resume} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="py-2 text-sm text-muted hover:text-fg">
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/nav.tsx
git commit -m "feat: nav with animated mobile menu, instant nav-item clicks"
```

---

## Task 8: Footer (Contact) + root layout wiring

**Files:**
- Create: `components/footer.tsx`
- Modify: `app/layout.tsx` (full rewrite)

- [ ] **Step 1: Write `components/footer.tsx`**

```tsx
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border">
      <div className="mx-auto max-w-[680px] px-6 py-24 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Got an idea? Let&apos;s chat.
        </h2>
        <a href={`mailto:${site.email}`} className="mt-4 inline-block text-accent underline-offset-4 hover:underline">
          {site.email}
        </a>
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted">
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">LinkedIn</a>
          <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-fg">Instagram</a>
          <a href={site.links.resume} target="_blank" rel="noopener noreferrer" className="hover:text-fg">Resume</a>
        </div>
        <p className="mt-10 font-mono text-xs uppercase tracking-widest text-muted">
          Designed &amp; built by {site.name}
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.intro,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-bg text-fg antialiased">
        <ThemeProvider>
          <Nav />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify chrome renders in both themes**

```bash
npm run dev
```
Then with the gstack `/browse` skill: `goto http://localhost:3000`, `screenshot`, `console --errors`. Expected: nav + footer render, no console errors, theme toggle flips light/dark with no flash. Stop the server after.

- [ ] **Step 4: Commit**

```bash
git add components/footer.tsx app/layout.tsx
git commit -m "feat: contact footer + root layout (fonts, theme, nav, footer)"
```

---

## Task 8B: Route-change page transition

**Files:**
- Create: `app/template.tsx`

`template.tsx` re-mounts on every navigation (unlike `layout.tsx`), so a motion wrapper here gives a subtle content fade-up on each route change (spec §7). Reduced-motion renders children directly.

- [ ] **Step 1: Write `app/template.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { easeOut } from "@/lib/motion";

export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/template.tsx
git commit -m "feat: subtle route-change fade-up transition"
```

---

## Task 9: Projects loader + test

**Files:**
- Create: `lib/projects.ts`
- Create: `lib/projects.test.ts`
- Create: `vitest.config.ts`
- Modify: `package.json` (add `test` script)

- [ ] **Step 1: Write `lib/projects.ts`**

```ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const WORK_DIR = path.join(process.cwd(), "content/work");

export type Project = {
  slug: string;
  title: string;
  year: number;
  role: string;
  company?: string;
  tags: string[];
  summary: string;
  cover?: string;
  thumbnail?: string;
  order: number;
  featured: boolean;
  confidential: boolean;
};

export type LoadedProject = { meta: Project; content: string };

function readProjectFile(slug: string): LoadedProject {
  const full = path.join(WORK_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  return { meta: { slug, ...(data as Omit<Project, "slug">) }, content };
}

export function getProjectSlugs(): string[] {
  return fs
    .readdirSync(WORK_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllProjects(): Project[] {
  return getProjectSlugs()
    .map((slug) => readProjectFile(slug).meta)
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): LoadedProject {
  return readProjectFile(slug);
}

export function getAdjacent(slug: string): { prev: Project | null; next: Project | null } {
  const all = getAllProjects();
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? all[i - 1] : null,
    next: i < all.length - 1 ? all[i + 1] : null,
  };
}
```

- [ ] **Step 2: Write the failing test `lib/projects.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { getAllProjects, getAdjacent, getProjectSlugs } from "./projects";

describe("projects loader", () => {
  it("loads all 5 seed projects", () => {
    expect(getProjectSlugs().length).toBe(5);
  });

  it("sorts projects by order ascending", () => {
    const orders = getAllProjects().map((p) => p.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it("computes adjacent projects", () => {
    const all = getAllProjects();
    const { prev, next } = getAdjacent(all[1].slug);
    expect(prev?.slug).toBe(all[0].slug);
    expect(next?.slug).toBe(all[2].slug);
  });
});
```

- [ ] **Step 3: Write `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: { environment: "node" },
});
```

- [ ] **Step 4: Add the test script to `package.json`**

In the `"scripts"` block, add:

```json
"test": "vitest run"
```

- [ ] **Step 5: Run the test — expect FAIL (no MDX files yet)**

```bash
npm test
```
Expected: FAILS — `getProjectSlugs().length` is 0 (or ENOENT on `content/work`), because the seed files don't exist. This confirms the test is wired correctly. Task 10 creates the files and turns it green.

- [ ] **Step 6: Commit**

```bash
git add lib/projects.ts lib/projects.test.ts vitest.config.ts package.json
git commit -m "feat: projects loader + failing loader test"
```

---

## Task 10: Seed the 5 case-study MDX files

**Files:**
- Create: `content/work/ecovacs-ai-cleaning.mdx`
- Create: `content/work/varsity-tutors-parent-dashboard.mdx`
- Create: `content/work/bumble-interest-cards.mdx`
- Create: `content/work/kwai-guild-dashboard.mdx`
- Create: `content/work/taimer-ai.mdx`

Each file uses the **same placeholder body template** below, with its own frontmatter. The body uses custom components (built in Task 12) and intentionally has empty `src` values so `<Figure>` renders a `<Placeholder>` until real assets land. Bracketed prose is placeholder copy the owner will replace.

**Shared body template (paste under the frontmatter in every file):**

```mdx
## Overview

[One paragraph: the context, the product, and the problem this project set out to solve. Replace with real copy.]

<Figure alt="Project overview" breakout caption="Overview — replace with a real image" />

## Problem & Insight

[What you learned from research and the key insight that shaped the direction.]

## Process

[Explorations, the decisions you made, and how the work evolved.]

<Gallery>
  <Figure alt="Exploration 1" />
  <Figure alt="Exploration 2" />
</Gallery>

## Solution

[The final design. Walk through the core flows and screens.]

<Figure alt="Final solution" breakout />

## Impact

<MetricCallout value="—" label="Replace with a real result or remove" />

[Outcomes and what you learned. For confidential projects, keep this qualitative.]
```

- [ ] **Step 1: Create `content/work/ecovacs-ai-cleaning.mdx`**

Frontmatter, then the shared body template:

```mdx
---
title: "AI-Powered Autonomous Home Cleaning System"
slug: "ecovacs-ai-cleaning"
year: 2024
role: "Product Designer"
company: "Ecovacs Robotics"
tags: ["AI Smart Home", "Consumer Mobile", "B2C"]
summary: "An AI auto-cleaning experience that replaces complex manual setup with one-tap intelligent control."
cover: ""
thumbnail: ""
order: 1
featured: true
confidential: false
---
```

- [ ] **Step 2: Create `content/work/varsity-tutors-parent-dashboard.mdx`**

```mdx
---
title: "Varsity Tutors Parent Dashboard"
slug: "varsity-tutors-parent-dashboard"
year: 2025
role: "Product Designer"
company: "Varsity Tutors"
tags: ["EdTech", "AI", "B2C"]
summary: "A parent dashboard that translates session data into clear visualizations of student progress and personalized action steps."
cover: ""
thumbnail: ""
order: 2
featured: false
confidential: false
---
```

- [ ] **Step 3: Create `content/work/bumble-interest-cards.mdx`**

```mdx
---
title: "Bumble Interest Cards"
slug: "bumble-interest-cards"
year: 2025
role: "Product Designer"
company: "Bumble"
tags: ["Social", "Location-Based", "B2C"]
summary: "A 0-to-1 location-based discovery feature for Bumble BFF & Bizz to drive engagement and Premium conversion."
cover: ""
thumbnail: ""
order: 3
featured: false
confidential: false
---
```

- [ ] **Step 4: Create `content/work/kwai-guild-dashboard.mdx`**

```mdx
---
title: "Kwai Guild Dashboard"
slug: "kwai-guild-dashboard"
year: 2024
role: "Product Designer"
company: "KuaiShou (Kwai)"
tags: ["B2B SaaS", "Live Streaming", "Data Analytics"]
summary: "A performance monitoring dashboard for live-streaming guild managers to spot at-risk streamers early and replicate top-performer patterns."
cover: ""
thumbnail: ""
order: 4
featured: false
confidential: false
---
```

- [ ] **Step 5: Create `content/work/taimer-ai.mdx`**

```mdx
---
title: "Taimer.ai"
slug: "taimer-ai"
year: 2023
role: "Product Designer"
company: "Taimer.ai"
tags: ["AIGC", "B2B2C", "Interior Design"]
summary: "AI image-to-image platform combining generative models with designer input to deliver personalized renovation plans for Chinese consumers."
cover: ""
thumbnail: ""
order: 5
featured: false
confidential: false
---
```

- [ ] **Step 6: Run the loader test — expect PASS**

```bash
npm test
```
Expected: all 3 tests PASS (5 slugs, sorted orders 1–5, adjacency correct).

- [ ] **Step 7: Commit**

```bash
git add content/work
git commit -m "feat: seed 5 case-study MDX files (placeholder bodies)"
```

---

## Task 11: Placeholder component

**Files:**
- Create: `components/placeholder.tsx`

- [ ] **Step 1: Write `components/placeholder.tsx`**

```tsx
export function Placeholder({
  label = "Image",
  blur = false,
  className = "",
  aspect = "aspect-[16/10]",
}: {
  label?: string;
  blur?: boolean;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`flex ${aspect} w-full items-center justify-center rounded-xl border border-border bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-fg)_4%,transparent),transparent)] ${blur ? "blur-[3px]" : ""} ${className}`}
    >
      <span className="px-4 text-center font-mono text-[10px] uppercase tracking-widest text-muted">
        {label}
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/placeholder.tsx
git commit -m "feat: neutral image Placeholder component"
```

---

## Task 12: MDX components (Figure, Gallery, MetricCallout, Quote, Prose, map)

**Files:**
- Create: `components/mdx/figure.tsx`
- Create: `components/mdx/gallery.tsx`
- Create: `components/mdx/metric-callout.tsx`
- Create: `components/mdx/quote.tsx`
- Create: `components/mdx/index.tsx`

- [ ] **Step 1: Write `components/mdx/figure.tsx`**

```tsx
import Image from "next/image";
import { Placeholder } from "../placeholder";

export function Figure({
  src,
  alt,
  caption,
  breakout = false,
}: {
  src?: string;
  alt: string;
  caption?: string;
  breakout?: boolean;
}) {
  const width = breakout
    ? "relative left-1/2 w-[min(1080px,92vw)] -translate-x-1/2"
    : "w-full";

  return (
    <figure className={`my-10 ${width}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={1080}
          height={675}
          className="w-full rounded-xl border border-border"
        />
      ) : (
        <Placeholder label={alt} />
      )}
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
```

- [ ] **Step 2: Write `components/mdx/gallery.tsx`**

```tsx
import type { ReactNode } from "react";

export function Gallery({ children }: { children: ReactNode }) {
  return (
    <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-2 [&_figure]:my-0">
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Write `components/mdx/metric-callout.tsx`**

```tsx
export function MetricCallout({ value, label }: { value: string; label: string }) {
  return (
    <div className="my-10 flex items-baseline gap-4 rounded-xl border border-border p-6">
      <span className="text-4xl font-semibold tracking-tight">{value}</span>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}
```

- [ ] **Step 4: Write `components/mdx/quote.tsx`**

```tsx
import type { ReactNode } from "react";

export function Quote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <blockquote className="my-10 border-l-2 border-accent pl-5 text-lg italic text-fg/80">
      {children}
      {cite && <cite className="mt-2 block text-sm not-italic text-muted">— {cite}</cite>}
    </blockquote>
  );
}
```

- [ ] **Step 5: Write `components/mdx/index.tsx` (element styles + custom components + Prose)**

```tsx
import type { ReactNode } from "react";
import { Figure } from "./figure";
import { Gallery } from "./gallery";
import { MetricCallout } from "./metric-callout";
import { Quote } from "./quote";

export function Prose({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-[680px] px-6">{children}</div>;
}

export const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mt-16 mb-4 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-10 mb-3 text-lg font-semibold" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="my-5 text-[15px] leading-7 text-fg/90" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="my-5 list-disc space-y-2 pl-5 text-[15px] leading-7 text-fg/90" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="my-5 list-decimal space-y-2 pl-5 text-[15px] leading-7 text-fg/90" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a className="text-accent underline-offset-4 hover:underline" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => <strong className="font-semibold" {...props} />,
  Figure,
  Gallery,
  MetricCallout,
  Quote,
};
```

- [ ] **Step 6: Commit**

```bash
git add components/mdx
git commit -m "feat: MDX components (Figure, Gallery, MetricCallout, Quote, Prose)"
```

---

## Task 13: ProjectIndex — the cursor-following preview list

**Files:**
- Create: `components/project-index.tsx`

Behavior (spec §3): typographic rows; on hover (pointers with hover) a thumbnail follows the cursor with a spring + fade/scale/blur; on keyboard focus the preview also shows; on touch / no-hover pointers, a thumbnail is shown inline instead. Reduced-motion: no follow animation.

- [ ] **Step 1: Write `components/project-index.tsx`**

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { previewSpring } from "@/lib/motion";
import { Placeholder } from "./placeholder";

export type IndexItem = {
  slug: string;
  title: string;
  company?: string;
  year: number;
  tags: string[];
  thumbnail?: string;
};

function Thumb({ item, className = "" }: { item: IndexItem; className?: string }) {
  return item.thumbnail ? (
    <Image
      src={item.thumbnail}
      alt={item.title}
      width={320}
      height={200}
      className={`rounded-lg border border-border object-cover ${className}`}
    />
  ) : (
    <Placeholder label={item.company ?? item.title} aspect="aspect-[16/10]" className={`w-40 ${className}`} />
  );
}

export function ProjectIndex({ projects }: { projects: IndexItem[] }) {
  const [active, setActive] = useState<IndexItem | null>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, previewSpring);
  const sy = useSpring(y, previewSpring);

  function handleMove(e: React.MouseEvent) {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  }

  return (
    <div onMouseMove={handleMove}>
      <ul className="border-t border-border">
        {projects.map((p) => (
          <li key={p.slug} className="border-b border-border">
            <Link
              href={`/work/${p.slug}`}
              onMouseEnter={() => setActive(p)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(p)}
              onBlur={() => setActive(null)}
              className="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span className="text-lg font-medium tracking-tight transition-transform duration-200 group-hover:translate-x-1">
                {p.title}
              </span>
              <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted">
                {p.year}
              </span>
            </Link>

            {/* touch / no-hover fallback: inline thumbnail */}
            <div className="mb-4 hidden [@media(hover:none)]:block">
              <Thumb item={p} className="w-full" />
            </div>
          </li>
        ))}
      </ul>

      {/* hover-capable pointers only: floating cursor preview */}
      <AnimatePresence>
        {active && !reduce && (
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-50 hidden [@media(hover:hover)]:block"
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="w-48 overflow-hidden rounded-lg shadow-2xl">
              <Thumb item={active} className="w-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/project-index.tsx
git commit -m "feat: ProjectIndex with cursor-following preview + focus/touch fallbacks"
```

---

## Task 14: Home (Work) page

**Files:**
- Modify: `app/page.tsx` (replace contents)

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import { getAllProjects } from "@/lib/projects";
import { ProjectIndex, type IndexItem } from "@/components/project-index";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export default function Home() {
  const projects = getAllProjects();
  const items: IndexItem[] = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    company: p.company,
    year: p.year,
    tags: p.tags,
    thumbnail: p.thumbnail || undefined,
  }));

  return (
    <div className="mx-auto max-w-[680px] px-6 pb-32 pt-24 sm:pt-32">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{site.name}</h1>
        <p className="mt-4 text-[15px] leading-7 text-muted">{site.intro}</p>
        <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted">
          Previously @ {site.previously.join(" · ")}
        </p>
      </Reveal>

      <Reveal delay={0.05} className="mt-16">
        <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">Selected work</h2>
        <ProjectIndex projects={items} />
      </Reveal>
    </div>
  );
}
```

- [ ] **Step 2: Verify the home page**

```bash
npm run dev
```
With `/browse`: `goto http://localhost:3000`, `console --errors`, `screenshot`. Expected: hero + 5 project rows; hovering a row (desktop) shows a placeholder thumbnail near the cursor; rows shift slightly on hover; no console errors. Also test `responsive` to confirm the inline thumbnail appears at mobile widths. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: home page (hero + project index)"
```

---

## Task 15: Case-study page

**Files:**
- Create: `app/work/[slug]/page.tsx`

- [ ] **Step 1: Write `app/work/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectSlugs, getProject, getAdjacent } from "@/lib/projects";
import { mdxComponents, Prose } from "@/components/mdx";
import { Placeholder } from "@/components/placeholder";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getProject(slug);
    return { title: `${meta.title} — Lingkan Wang`, description: meta.summary };
  } catch {
    return {};
  }
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let loaded;
  try {
    loaded = getProject(slug);
  } catch {
    notFound();
  }
  const { meta, content } = loaded!;
  const { prev, next } = getAdjacent(slug);

  return (
    <article className="pb-32 pt-20 sm:pt-28">
      {/* hero */}
      <header className="mx-auto max-w-[680px] px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            {meta.role} · {meta.year} · {meta.tags.join(", ")}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{meta.title}</h1>
          <p className="mt-4 text-lg text-muted">{meta.summary}</p>
        </Reveal>
      </header>

      <Reveal className="mx-auto mt-12 w-[min(1080px,92vw)]">
        {meta.cover ? (
          <Image
            src={meta.cover}
            alt={meta.title}
            width={1080}
            height={675}
            className="w-full rounded-xl border border-border"
            priority
          />
        ) : (
          <Placeholder label={`${meta.company ?? meta.title} — cover`} blur={meta.confidential} />
        )}
      </Reveal>

      {/* body */}
      <div className="mt-16">
        <Prose>
          <MDXRemote source={content} components={mdxComponents} />
        </Prose>
      </div>

      {/* prev / next */}
      <nav className="mx-auto mt-24 flex max-w-[680px] items-center justify-between gap-4 border-t border-border px-6 pt-8 text-sm">
        <Link href="/" className="text-muted hover:text-fg">← All work</Link>
        {next ? (
          <Link href={`/work/${next.slug}`} className="text-right font-medium hover:text-accent">
            Next: {next.title} →
          </Link>
        ) : prev ? (
          <Link href={`/work/${prev.slug}`} className="text-right font-medium hover:text-accent">
            ← Previous: {prev.title}
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
```

- [ ] **Step 2: Verify a case-study route**

```bash
npm run dev
```
With `/browse`: `goto http://localhost:3000/work/bumble-interest-cards`, `console --errors`, `screenshot`. Expected: hero meta + title + summary, placeholder cover, MDX sections render with styled headings/paragraphs, Figure placeholders, MetricCallout, and a working Next/All-work nav. Click a row from home to confirm navigation. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add app/work
git commit -m "feat: case-study page (MDX render, hero, prev/next)"
```

---

## Task 16: About page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Write `app/about/page.tsx`**

```tsx
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { Placeholder } from "@/components/placeholder";

export const metadata: Metadata = { title: `About — ${site.name}` };

export default function About() {
  return (
    <div className="mx-auto max-w-[680px] px-6 pb-32 pt-24 sm:pt-32">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">About</h1>
      </Reveal>

      <Reveal delay={0.05} className="mt-10">
        <Placeholder label="Portrait — replace with a photo" aspect="aspect-[4/5]" className="mx-auto max-w-xs" />
      </Reveal>

      <Reveal delay={0.1} className="mt-10 space-y-5 text-[15px] leading-7 text-fg/90">
        <p>{site.intro}</p>
        <p>
          Previously, I worked at{" "}
          {site.previously.map((p, i) => (
            <span key={p}>
              <span className="font-medium">{p}</span>
              {i < site.previously.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
        <p className="text-muted">[Replace this with your design philosophy and what you care about.]</p>
      </Reveal>

      <Reveal delay={0.15} className="mt-10 font-mono text-xs uppercase tracking-widest text-muted">
        <a href={`mailto:${site.email}`} className="hover:text-fg">{site.email}</a>
        {"  ·  "}
        <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">LinkedIn</a>
        {"  ·  "}
        <a href={site.links.resume} target="_blank" rel="noopener noreferrer" className="hover:text-fg">Resume</a>
      </Reveal>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/about
git commit -m "feat: about page"
```

---

## Task 17: Playground page

**Files:**
- Create: `app/playground/page.tsx`

- [ ] **Step 1: Write `app/playground/page.tsx`**

```tsx
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { Placeholder } from "@/components/placeholder";

export const metadata: Metadata = { title: `Playground — ${site.name}` };

const experiments = [
  "Experiment 01",
  "Experiment 02",
  "Experiment 03",
  "Experiment 04",
];

export default function Playground() {
  return (
    <div className="mx-auto max-w-[1080px] px-6 pb-32 pt-24 sm:pt-32">
      <Reveal>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Playground</h1>
        <p className="mt-4 max-w-[680px] text-[15px] leading-7 text-muted">
          Side explorations, motion studies, and things I make for fun. [Replace with real content.]
        </p>
      </Reveal>

      <Reveal delay={0.05} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {experiments.map((label) => (
          <div key={label}>
            <Placeholder label={label} />
            <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted">{label}</p>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/playground
git commit -m "feat: playground page"
```

---

## Task 18: Full verification pass (build, types, lint, browser QA)

**Files:** none (verification + small fixes only)

- [ ] **Step 1: Types, lint, tests, production build**

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```
Expected: all pass. Fix any type/lint errors inline (common: unused imports, missing `alt`). Re-run until clean.

- [ ] **Step 2: Browser QA across themes and breakpoints**

```bash
npm run dev
```
With the `/browse` skill, verify and capture evidence:
- `goto http://localhost:3000` → `console --errors` (none), `screenshot`.
- Theme toggle: click it, confirm light↔dark with no flash on reload.
- `responsive` on home and one case study → confirm mobile inline thumbnails + readable layout.
- Case study breakout images extend wider than the text column.
- Tab through the home list with the keyboard → focus rings visible, preview shows on focus.

- [ ] **Step 3: Reduced-motion check**

In `/browse`, emulate reduced motion and reload the home page:
```bash
~/.claude/skills/gstack/browse/dist/browse js "matchMedia('(prefers-reduced-motion: reduce)').matches"
```
If your browse build supports CDP emulation, set `Emulation.setEmulatedMedia` for `prefers-reduced-motion: reduce`; otherwise verify logic by reading `components/reveal.tsx` / `project-index.tsx` guards. Expected: reveals appear instantly, no cursor-follow animation. Stop the server.

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: verification pass (types, lint, a11y, responsive)"
```

---

## Task 19: Deploy prep

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write `README.md`**

```markdown
# Lingkan Wang — Portfolio

Next.js (App Router) + Tailwind v4 + Framer Motion. Emil-inspired, light/dark.

## Develop
```bash
npm install
npm run dev
```

## Add a project
1. Add `content/work/<slug>.mdx` with frontmatter (see existing files).
2. Drop images in `public/work/<slug>/` and set `cover` / `thumbnail` / `<Figure src>`.

## Test / build
```bash
npm test
npm run build
```

## Deploy
Push to GitHub and import the repo in Vercel (zero config).
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: README (develop, add project, deploy)"
```

- [ ] **Step 3: Deploy (owner-driven, optional now)**

Create a GitHub repo and push `main`, then import in Vercel. No env vars needed. Verify the production URL loads and toggles theme. (Real images and copy can be swapped in incrementally afterward — no layout changes required.)

---

## Notes for the implementer

- **MDX rendering:** `next-mdx-remote/rsc`'s `MDXRemote` runs in a Server Component at build time (SSG). No client JS is shipped for the prose. If `npm install` warns about React 19 peer deps, the `rsc` import path still works; do not downgrade React.
- **Tailwind v4:** there is no `tailwind.config.js` — tokens live in `app/globals.css` under `@theme`. Semantic utilities (`bg-bg`, `text-fg`, `text-muted`, `border-border`, `text-accent`) theme automatically via the `.dark` var overrides.
- **Accent color:** to change from blue, edit `--color-accent` in both `:root`/`@theme` and `.dark` in `globals.css` — nothing else.
- **Confidential projects:** set `confidential: true` in frontmatter to blur the cover Placeholder; keep the Impact section qualitative.
- **Motion:** all animation lives in `components/reveal.tsx`, `components/project-index.tsx`, `components/nav.tsx`, and `lib/motion.ts`. Each guards `prefers-reduced-motion`.
