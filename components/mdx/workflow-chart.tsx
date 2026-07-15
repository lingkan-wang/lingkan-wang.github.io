"use client";

import { motion, useReducedMotion } from "framer-motion";
import { durations, easeOut } from "@/lib/motion";

// Numbers reconstructed from the project's Claude Code session logs
// (millisecond timestamps across 50 sessions / 351 prompts). Active time,
// AI-plus-tooling vs human, per phase.
const PHASES = [
  { name: "Requirements & PRD", ai: 3.1, human: 8.43 },
  { name: "IA & user flows", ai: 3.62, human: 9.33 },
  { name: "Low-fidelity", ai: 20.65, human: 19.24 },
  { name: "Visual style system", ai: 9.06, human: 4.83 },
  { name: "High-fidelity", ai: 16.72, human: 14.09 },
  { name: "Review & wrap-up", ai: 1.18, human: 1.22 },
];
const MAX_PHASE = Math.max(...PHASES.map((p) => p.ai + p.human));
const TOTAL = { ai: 54.3, human: 57.1, all: 111.5 };

const MODULES = [
  { name: "Profile", n: 84 },
  { name: "Home", n: 74 },
  { name: "Rewards", n: 40 },
  { name: "Feed", n: 35 },
  { name: "Shop", n: 30 },
  { name: "Onboarding", n: 8 },
];
const MAX_MOD = Math.max(...MODULES.map((m) => m.n));

function Swatch({ className }: { className: string }) {
  return <span className={`inline-block h-2.5 w-2.5 rounded-[3px] ${className}`} />;
}

function SplitBar({ ai, human, widthPct, delay, reduce }: { ai: number; human: number; widthPct: number; delay: number; reduce: boolean | null }) {
  const aiPct = (ai / (ai + human)) * 100;
  return (
    <div className="h-2.5 w-full">
      <motion.div
        style={{ width: `${widthPct}%` }}
        className="flex h-full origin-left overflow-hidden rounded-full"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={reduce ? undefined : { scaleX: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: durations.enter, ease: easeOut, delay }}
      >
        <span style={{ width: `${aiPct}%` }} className="h-full shrink-0 bg-accent" />
        <span className="h-full flex-1 bg-fg/20" />
      </motion.div>
    </div>
  );
}

/** Human vs machine time split — headline bar plus the six-phase breakdown. */
export function WorkflowChart() {
  const reduce = useReducedMotion();
  const aiShare = Math.round((TOTAL.ai / TOTAL.all) * 100);

  return (
    <div className="my-10 rounded-xl border border-border bg-bg p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-5 font-mono text-[10px] uppercase tracking-wider text-muted">
        <span className="flex items-center gap-2"><Swatch className="bg-accent" />AI + tooling</span>
        <span className="flex items-center gap-2"><Swatch className="bg-fg/20" />Human</span>
      </div>

      {/* headline 49 : 51 */}
      <div className="mb-7">
        <div className="mb-2 flex items-baseline justify-between gap-4 text-sm">
          <span className="font-medium">Where the 111.5 active hours went</span>
          <span className="shrink-0 font-mono text-xs text-muted">{aiShare} : {100 - aiShare}</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-fg/10">
          <motion.div
            className="flex h-full origin-left"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={reduce ? undefined : { scaleX: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: durations.enter, ease: easeOut }}
          >
            <span style={{ width: `${aiShare}%` }} className="h-full shrink-0 bg-accent" />
            <span className="h-full flex-1 bg-fg/20" />
          </motion.div>
        </div>
        <div className="mt-1.5 flex justify-between font-mono text-[10px] text-muted">
          <span>AI + tooling · {TOTAL.ai}h</span>
          <span>Human · {TOTAL.human}h</span>
        </div>
      </div>

      {/* per-phase */}
      <div className="space-y-3">
        {PHASES.map((p, i) => (
          <div key={p.name} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-right text-[11px] leading-tight text-muted sm:w-36 sm:text-[12px]">{p.name}</span>
            <div className="flex-1">
              <SplitBar ai={p.ai} human={p.human} widthPct={((p.ai + p.human) / MAX_PHASE) * 100} delay={0.1 + i * 0.07} reduce={reduce} />
            </div>
            <span className="w-9 shrink-0 text-right font-mono text-[11px] tabular-nums text-muted">{Math.round(p.ai + p.human)}h</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Prompt-iteration count per product area — where the design churn concentrated. */
export function ModuleIterations() {
  const reduce = useReducedMotion();
  return (
    <div className="my-10 rounded-xl border border-border bg-bg p-5 sm:p-6">
      <div className="mb-5 flex items-baseline justify-between gap-4 text-sm">
        <span className="font-medium">Prompt iterations by module</span>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted">where the churn was</span>
      </div>
      <div className="space-y-3">
        {MODULES.map((m, i) => (
          <div key={m.name} className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-right text-[12px] text-muted">{m.name}</span>
            <div className="h-2.5 flex-1">
              <motion.div
                style={{ width: `${(m.n / MAX_MOD) * 100}%` }}
                className="h-full origin-left rounded-full bg-accent"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={reduce ? undefined : { scaleX: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: durations.enter, ease: easeOut, delay: 0.1 + i * 0.07 }}
              />
            </div>
            <span className="w-6 shrink-0 text-right font-mono text-[11px] tabular-nums text-muted">{m.n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
