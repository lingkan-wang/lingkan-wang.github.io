"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { durations, easeOut } from "@/lib/motion";

/* ── Masii Liquid Glass tokens (grounded in the design file) ── */
const TOKENS = [
  { name: "bg", hex: "#090909" },
  { name: "surface", hex: "#121212" },
  { name: "violet", hex: "#5f45ff" },
  { name: "purple", hex: "#9b7cff" },
  { name: "cyan", hex: "#94f4ed" },
  { name: "gold", hex: "#ffd449" },
  { name: "green", hex: "#92e6ae" },
  { name: "text", hex: "#f4f4f5" },
];

const SCALE = [4, 8, 12, 16, 20, 24, 32];
const SPACING = [
  { k: "Screen margin", v: "8px" },
  { k: "Card padding", v: "20px" },
  { k: "Section gap", v: "32px" },
];

const TYPE = [
  { role: "Display", size: 30 },
  { role: "Title", size: 22 },
  { role: "Body", size: 15 },
  { role: "Caption", size: 12 },
];

const NAV: { group: string; items: { key: string; label: string; real?: boolean }[] }[] = [
  {
    group: "Foundation",
    items: [
      { key: "colors", label: "Colors", real: true },
      { key: "type", label: "Typography", real: true },
      { key: "tokens", label: "Spacing & Tokens", real: true },
    ],
  },
  {
    group: "Components",
    items: [
      { key: "buttons", label: "Buttons", real: true },
      { key: "badges", label: "Badges & Chips" },
      { key: "cards", label: "Cards" },
    ],
  },
  {
    group: "Patterns",
    items: [
      { key: "prize", label: "Prize card" },
      { key: "move", label: "Move card" },
      { key: "nav", label: "Tab bar" },
    ],
  },
];

const DESC: Record<string, string> = {
  colors: "Eight core tokens, dark-first.",
  type: "Space Grotesk. One display face, one scale.",
  tokens: "One spacing scale on a 4px base.",
  buttons: "Three tiers. Pill-shaped, never square.",
  badges: "Spec in progress.",
  cards: "Spec in progress.",
  prize: "Spec in progress.",
  move: "Spec in progress.",
  nav: "Spec in progress.",
};

const LABELS: Record<string, string> = Object.fromEntries(
  NAV.flatMap((g) => g.items.map((it) => [it.key, it.label]))
);

function Placeholder({ label }: { label: string }) {
  return (
    <div className="grid min-h-[220px] place-items-center rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-6 text-center">
      <div>
        <p className="text-[13px] font-medium text-[#f4f4f5]">{label}</p>
        <p className="mt-1 text-[12px] text-white/40">Spec in progress, adding soon</p>
      </div>
    </div>
  );
}

function Panel({ k }: { k: string }) {
  if (k === "colors") {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {TOKENS.map((t) => (
          <div key={t.name} className="overflow-hidden rounded-xl border border-white/10">
            <div className="h-14" style={{ background: t.hex }} />
            <div className="px-3 py-2">
              <p className="text-[13px] text-[#f4f4f5]">{t.name}</p>
              <p className="font-mono text-[11px] text-white/40">{t.hex}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (k === "type") {
    return (
      <div className="space-y-4">
        {TYPE.map((t) => (
          <div key={t.role} className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-4 last:border-0">
            <span className="truncate text-[#f4f4f5]" style={{ fontSize: t.size, lineHeight: 1.1 }}>
              Make a Move
            </span>
            <span className="shrink-0 font-mono text-[11px] text-white/40">
              {t.role} · {t.size}
            </span>
          </div>
        ))}
      </div>
    );
  }
  if (k === "tokens") {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          {SCALE.map((n) => (
            <div key={n} className="flex items-center gap-3">
              <span className="w-8 shrink-0 font-mono text-[11px] tabular-nums text-white/40">{n}</span>
              <span className="h-3 rounded bg-[#5f45ff]/70" style={{ width: n * 4 }} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {SPACING.map((s) => (
            <div key={s.k} className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
              <p className="text-[12px] text-white/55">{s.k}</p>
              <p className="mt-0.5 font-mono text-[14px] text-[#f4f4f5]">{s.v}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (k === "buttons") {
    return (
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#5f45ff] px-4 py-2 text-[13px] font-medium text-white">Make a Move</span>
          <span className="rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-[13px] font-medium text-[#f4f4f5]">Claim reward</span>
          <span className="rounded-full px-4 py-2 text-[13px] font-medium text-[#b3a4ff]">Maybe later</span>
        </div>
        <p className="text-[12px] text-white/40">Primary · Secondary · Ghost. Full-radius pills, one primary per screen.</p>
      </div>
    );
  }
  return <Placeholder label={LABELS[k] ?? "Component"} />;
}

/**
 * "Engineer handoff" block: Masii's dark Liquid Glass design system rendered as
 * a small documentation surface. A grouped left nav switches the main panel;
 * grounded panels (colors, type, spacing, buttons) render real specs, the rest
 * are honest placeholders. Pure state, no timers or observers.
 */
export function EngineerHandoff() {
  const [active, setActive] = useState("colors");
  const reduce = useReducedMotion();

  const itemBtn = (it: { key: string; label: string }) => {
    const on = it.key === active;
    return (
      <button
        key={it.key}
        type="button"
        onClick={() => setActive(it.key)}
        aria-pressed={on}
        className={`shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-left text-[13px] transition-colors ${
          on ? "bg-[#5f45ff]/20 font-medium text-[#c3b8ff]" : "text-white/55 hover:text-white"
        }`}
      >
        {it.label}
      </button>
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0c] text-[#f4f4f5] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-[#5f45ff] to-[#9b7cff] text-[13px] font-semibold text-white">M</span>
          <div className="leading-tight">
            <p className="text-[13px] font-medium">Masii</p>
            <p className="text-[10px] uppercase tracking-[0.08em] text-white/40">Design System</p>
          </div>
        </div>
        <nav className="hidden items-center gap-4 text-[12px] md:flex" aria-hidden>
          {["Colors", "Typography", "Tokens", "Components", "Patterns"].map((t, i) => (
            <span key={t} className={i === 0 ? "text-[#f4f4f5]" : "text-white/40"}>{t}</span>
          ))}
        </nav>
        <span className="rounded-full border border-[#5f45ff]/40 bg-[#5f45ff]/10 px-2.5 py-1 font-mono text-[10px] text-[#b3a4ff]">V1 · Liquid Glass</span>
      </div>

      <div className="grid sm:grid-cols-[160px_minmax(0,1fr)]">
        {/* Sidebar (desktop) */}
        <aside className="hidden border-r border-white/10 p-4 sm:block">
          <div className="space-y-5">
            {NAV.map((g) => (
              <div key={g.group}>
                <p className="mb-1.5 px-3 font-mono text-[10px] uppercase tracking-[0.08em] text-white/35">{g.group}</p>
                <div className="flex flex-col gap-0.5">{g.items.map((it) => itemBtn(it))}</div>
              </div>
            ))}
          </div>
        </aside>

        {/* Item rail (mobile) */}
        <div className="flex gap-1.5 overflow-x-auto border-b border-white/10 p-3 sm:hidden">
          {NAV.flatMap((g) => g.items).map((it) => itemBtn(it))}
        </div>

        {/* Main panel */}
        <div className="min-h-[300px] p-5 sm:p-7">
          <div className="mb-5 flex items-baseline gap-3">
            <h4 className="text-[17px] font-medium">{LABELS[active]}</h4>
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
    </div>
  );
}
