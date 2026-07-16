"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { durations, easeOut } from "@/lib/motion";

/* ──────────────────────────────────────────────────────────────
   Masii "Liquid Glass" design system — real tokens, pulled from the
   Figma variable collection (dark, single mode). Rendered as a small
   documentation surface for the engineer handoff.
   ────────────────────────────────────────────────────────────── */

const INTER = "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif";

const COLORS: { name: string; hex: string; note?: string }[] = [
  { name: "bg-base", hex: "#000000" },
  { name: "surface-1", hex: "#101315" },
  { name: "surface-2", hex: "#1c2023" },
  { name: "surface-3", hex: "#252a2e" },
  { name: "text-primary", hex: "#ffffff" },
  { name: "text-secondary", hex: "#a7b0b8" },
  { name: "text-tertiary", hex: "#6f7a82" },
  { name: "brand", hex: "#4041e5", note: "primary" },
  { name: "success", hex: "#30d158" },
  { name: "warning", hex: "#ffd60a" },
  { name: "danger", hex: "#ff453a" },
  { name: "accent-yellow", hex: "#ffbe22" },
];

const TYPE: { role: string; size: number; weight: number }[] = [
  { role: "Display", size: 30, weight: 700 },
  { role: "Heading", size: 22, weight: 600 },
  { role: "Title", size: 17, weight: 600 },
  { role: "Body", size: 15, weight: 400 },
  { role: "Label", size: 14, weight: 500 },
  { role: "Caption", size: 12, weight: 400 },
];

const SCALE = [4, 8, 12, 16, 20, 24, 32];
const RADII: { k: string; v: number; label: string }[] = [
  { k: "sm", v: 6, label: "6" },
  { k: "md", v: 8, label: "8" },
  { k: "lg", v: 12, label: "12" },
  { k: "xl", v: 18, label: "18" },
  { k: "pill", v: 24, label: "∞" },
];

const NAV = ["Colors", "Typography", "Tokens", "Components", "Patterns"] as const;
type NavKey = (typeof NAV)[number];

const DESC: Record<NavKey, string> = {
  Colors: "Sixteen tokens, dark-first. Every fill bound to a variable.",
  Typography: "Inter. One family, a tuned scale from Caption to Display.",
  Tokens: "Spacing on a 4px base, five corner radii.",
  Components: "Eleven core components, variants + props, pill-shaped actions.",
  Patterns: "Composed views built from the same parts.",
};

const METRICS = [
  { n: "16", k: "color tokens" },
  { n: "12", k: "type styles" },
  { n: "5", k: "effect styles" },
  { n: "11", k: "components" },
];

/* ── Panels ── */

function ColorsPanel() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {COLORS.map((c) => (
        <div key={c.name} className="overflow-hidden rounded-xl border border-white/10">
          <div className="h-14 border-b border-white/5" style={{ background: c.hex }} />
          <div className="px-3 py-2">
            <p className="text-[12.5px] text-white">{c.name}</p>
            <p className="font-mono text-[10.5px] uppercase text-white/40">{c.hex}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TypePanel() {
  return (
    <div className="space-y-3.5">
      {TYPE.map((t) => (
        <div
          key={t.role}
          className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-3.5 last:border-0"
        >
          <span
            className="truncate text-white"
            style={{ fontFamily: INTER, fontSize: t.size, fontWeight: t.weight, lineHeight: 1.1, letterSpacing: t.size > 24 ? "-0.02em" : "0" }}
          >
            Move to give
          </span>
          <span className="shrink-0 font-mono text-[10.5px] text-white/40">
            Inter {t.weight} · {t.size}
          </span>
        </div>
      ))}
    </div>
  );
}

function TokensPanel() {
  return (
    <div className="space-y-7">
      <div>
        <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/35">Spacing · 4px base</p>
        <div className="space-y-2">
          {SCALE.map((n) => (
            <div key={n} className="flex items-center gap-3">
              <span className="w-7 shrink-0 font-mono text-[10.5px] tabular-nums text-white/40">{n}</span>
              <span className="h-3 rounded-[3px] bg-[#4041e5]" style={{ width: n * 4 }} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/35">Radius</p>
        <div className="flex flex-wrap items-end gap-4">
          {RADII.map((r) => (
            <div key={r.k} className="flex flex-col items-center gap-1.5">
              <span
                className="size-12 border border-white/15 bg-[#252a2e]"
                style={{ borderRadius: r.k === "pill" ? 999 : r.v }}
              />
              <span className="font-mono text-[10.5px] text-white/40">{r.k}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ComponentsPanel() {
  return (
    <div className="space-y-6">
      <div className="space-y-2.5">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/35">Button</p>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-black">Continue</span>
          <span className="rounded-full border border-white/12 bg-[#1c2023] px-4 py-2 text-[13px] font-semibold text-white">Boost Entry</span>
          <span className="rounded-full px-4 py-2 text-[13px] font-semibold text-white/85">Maybe later</span>
          <span className="rounded-full bg-[#4041e5] px-4 py-2 text-[13px] font-semibold text-white">Claim</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-6">
        <div className="space-y-2.5">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/35">Chip</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#1c2023] px-3 py-1.5 text-[12px] text-white/80 ring-1 ring-white/10">Environment</span>
            <span className="rounded-full bg-[#4041e5] px-3 py-1.5 text-[12px] font-medium text-white">Selected</span>
          </div>
        </div>
        <div className="space-y-2.5">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/35">Toggle</p>
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-[42px] items-center rounded-full bg-[#252a2e] px-0.5"><span className="size-5 rounded-full bg-white/80" /></span>
            <span className="flex h-6 w-[42px] items-center justify-end rounded-full bg-[#30d158] px-0.5"><span className="size-5 rounded-full bg-white shadow" /></span>
          </div>
        </div>
        <div className="space-y-2.5">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-white/35">Avatar</p>
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full bg-[#4041e5] text-[12px] font-semibold text-white">LK</span>
            <span className="grid size-9 place-items-center rounded-full bg-[#252a2e] text-white/40">
              <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 20a8 8 0 0 1 16 0" strokeLinecap="round" /></svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PatternsPanel() {
  return (
    <div className="space-y-4">
      {/* List row */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#101315]">
        {[
          { label: "Account", trail: "chevron" },
          { label: "Notifications", trail: "toggle" },
          { label: "Appearance", trail: "Dark" },
        ].map((r, i) => (
          <div key={r.label} className={`flex items-center gap-3 px-4 py-3 ${i < 2 ? "border-b border-white/[0.06]" : ""}`}>
            <span className="grid size-6 place-items-center text-white/60">
              <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" strokeLinecap="round" /></svg>
            </span>
            <span className="flex-1 text-[14px] text-white">{r.label}</span>
            {r.trail === "toggle" ? (
              <span className="flex h-5 w-9 items-center justify-end rounded-full bg-[#30d158] px-0.5"><span className="size-4 rounded-full bg-white" /></span>
            ) : r.trail === "chevron" ? (
              <svg viewBox="0 0 24 24" className="size-4 text-white/40" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            ) : (
              <span className="flex items-center gap-1 text-[13px] text-white/50">{r.trail}<svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            )}
          </div>
        ))}
      </div>
      {/* Tab bar */}
      <div className="flex items-center justify-around rounded-xl border border-white/10 bg-[#101315] px-2 py-2.5">
        {[
          { i: "M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z", l: "Home", on: true },
          { i: "M4 4h7v7H4zM13 4h7v7h-7zM13 13h7v7h-7zM4 13h7v7H4z", l: "Draws", on: false },
          { i: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", l: "Feed", on: false },
          { i: "M6 2 3 6v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z", l: "Shop", on: false },
          { i: "M12 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20a8 8 0 0 1 16 0", l: "Me", on: false },
        ].map((t) => (
          <span key={t.l} className="flex flex-col items-center gap-1" style={{ opacity: t.on ? 1 : 0.45 }}>
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: "#fff" }}><path d={t.i} strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="text-[10px] text-white">{t.l}</span>
          </span>
        ))}
      </div>
      <p className="text-[12px] text-white/40">Real prize / claim / donation flows are wired in the file, bound to these same tokens.</p>
    </div>
  );
}

function Panel({ k }: { k: NavKey }) {
  if (k === "Colors") return <ColorsPanel />;
  if (k === "Typography") return <TypePanel />;
  if (k === "Tokens") return <TokensPanel />;
  if (k === "Components") return <ComponentsPanel />;
  return <PatternsPanel />;
}

/**
 * Engineer handoff: Masii's dark "Liquid Glass" design system rendered as a
 * documentation surface. Top bar carries the Masii logo and a section switcher;
 * a hero states the system's job, then panels render the real tokens and
 * components (all grounded in the Figma variable collection). Pure state, no
 * timers or observers.
 */
export function EngineerHandoff() {
  const [active, setActive] = useState<NavKey>("Colors");
  const reduce = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0b] text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]">
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/work/masii/masii-logo.png" alt="Masii logo" className="h-[22px] w-auto" />
          <div className="leading-tight">
            <p className="text-[13px] font-semibold">Masii</p>
            <p className="text-[10px] uppercase tracking-[0.09em] text-white/40">Design System</p>
          </div>
        </div>
        <nav className="order-3 -mx-1 flex w-full items-center gap-1 overflow-x-auto sm:order-2 sm:mx-0 sm:ml-2 sm:w-auto">
          {NAV.map((n) => {
            const on = n === active;
            return (
              <button
                key={n}
                type="button"
                onClick={() => setActive(n)}
                aria-pressed={on}
                className={`shrink-0 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[12.5px] transition-colors ${
                  on ? "bg-[#4041e5]/18 font-medium text-[#b9baff]" : "text-white/50 hover:text-white"
                }`}
              >
                {n}
              </button>
            );
          })}
        </nav>
        <span className="order-2 ml-auto shrink-0 rounded-full border border-[#4041e5]/40 bg-[#4041e5]/12 px-2.5 py-1 font-mono text-[10px] text-[#b9baff] sm:order-3">
          V1 · Liquid Glass
        </span>
      </div>

      {/* Hero */}
      <div className="border-b border-white/[0.07] px-5 py-7 sm:px-8 sm:py-9">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#7e7fff]">Masii · Giving app</p>
        <h4 className="mt-3 text-[34px] font-bold leading-[0.98] tracking-[-0.02em] sm:text-[42px]" style={{ fontFamily: INTER }}>
          Design<br />
          <span className="text-[#5c5dff]">System</span>
        </h4>
        <p className="mt-4 max-w-[52ch] text-[14px] leading-[1.55] text-white/55">
          One dark, token-driven source of truth. Every color, type style, and component is defined once,
          bound to a Figma variable, and reused across roughly 150 screens.
        </p>
        <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/[0.07] pt-6 sm:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.k}>
              <dd className="text-[30px] font-semibold tabular-nums text-[#5c5dff]" style={{ fontFamily: INTER }}>{m.n}</dd>
              <dt className="mt-1 text-[12px] text-white/45">{m.k}</dt>
            </div>
          ))}
        </dl>
      </div>

      {/* Panel */}
      <div className="min-h-[280px] px-5 py-6 sm:px-8 sm:py-7">
        <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h5 className="text-[16px] font-semibold">{active}</h5>
          <span className="text-[12px] text-white/40">{DESC[active]}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: durations.enter, ease: easeOut }}
          >
            <Panel k={active} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
