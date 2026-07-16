/**
 * Efficiency data-viz for the Outcome section: replaces the text table with a
 * light, self-contained chart. A hero total bar (AI-assisted hours vs the
 * manual-Figma estimate, with the saved slice called out) plus a per-phase
 * paired-bar breakdown. Light-only by design (a framed panel that stays light
 * in both site themes), no timers or observers.
 */

const BLUE = "#2563eb";

const PHASES = [
  { name: "Requirements & PRD", ai: 11.5, manual: 16 },
  { name: "IA & user flows", ai: 13, manual: 20 },
  { name: "Low-fidelity", ai: 40, manual: 110 },
  { name: "Style exploration", ai: 14, manual: 36 },
  { name: "High-fidelity", ai: 31, manual: 250 },
  { name: "Review & wrap-up", ai: 2.4, manual: 10 },
];
const MAX = 250; // longest manual bar (High-fidelity), the shared x-scale

const TOTAL_AI = 111.5;
const TOTAL_MANUAL = 442;
const AI_PCT = (TOTAL_AI / TOTAL_MANUAL) * 100; // ~25%

function Bar({ value, color, track }: { value: number; color: string; track: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative h-2.5 flex-1 overflow-hidden rounded-full" style={{ background: track }}>
        <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${(value / MAX) * 100}%`, background: color }} />
      </div>
      <span className="w-11 shrink-0 text-right text-[12px] tabular-nums text-[#3a3a42]">{value}h</span>
    </div>
  );
}

export function EfficiencyChart() {
  return (
    <div className="overflow-hidden rounded-[20px] border border-[#ececf0] bg-white p-6 text-[#191921] shadow-[0_24px_60px_-34px_rgba(20,20,45,0.22)] sm:p-8">
      {/* ── Hero: total build time ── */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.09em] text-[#9a9aa2]">Active build time</p>
          <p className="mt-2.5 leading-none">
            <span className="text-[2.5rem] font-medium tabular-nums text-[#191921] sm:text-[2.9rem]">111.5</span>
            <span className="text-2xl font-medium text-[#191921]">h</span>
            <span className="ml-2.5 text-[15px] text-[#8b8b93]">with the AI-assisted workflow</span>
          </p>
        </div>
        <div className="flex gap-7">
          <div>
            <div className="text-[1.7rem] font-medium tabular-nums" style={{ color: BLUE }}>≈4×</div>
            <div className="mt-0.5 text-[12px] text-[#9a9aa2]">faster</div>
          </div>
          <div>
            <div className="text-[1.7rem] font-medium tabular-nums text-[#191921]">17.5d</div>
            <div className="mt-0.5 text-[12px] text-[#9a9aa2]">delivered</div>
          </div>
        </div>
      </div>

      {/* ── Hero bar: 111.5h of ≈442h, saved slice called out ── */}
      <div className="relative mt-6 h-14 rounded-2xl bg-[#eef0f4]">
        <div className="flex h-full items-center rounded-2xl pl-5" style={{ width: `${AI_PCT}%`, background: BLUE }}>
          <span className="whitespace-nowrap text-[13px] font-semibold text-white">111.5h</span>
        </div>
        <div
          className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-[#e6e6ec] bg-white px-3 py-1 shadow-[0_8px_18px_-8px_rgba(0,0,0,0.28)]"
          style={{ left: `${AI_PCT + (100 - AI_PCT) / 2}%` }}
        >
          <span className="size-1.5 rounded-full" style={{ background: BLUE }} />
          <span className="text-[12.5px] font-semibold" style={{ color: BLUE }}>≈330h saved</span>
        </div>
        <span className="absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[13px] font-medium text-[#70707a]">≈442h by hand</span>
      </div>

      {/* ── Per-phase breakdown ── */}
      <div className="mt-8 border-t border-[#efeff3] pt-6">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.09em] text-[#9a9aa2]">Hours per phase</p>
          <div className="flex items-center gap-4 text-[12px] text-[#8b8b93]">
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: BLUE }} />AI-assisted</span>
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[#d7d8df]" />Manual (est.)</span>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {PHASES.map((p) => (
            <div key={p.name} className="grid grid-cols-[104px_1fr] items-center gap-4 sm:grid-cols-[150px_1fr]">
              <div className="truncate text-[13px] text-[#54545c]">{p.name}</div>
              <div className="space-y-1.5">
                <Bar value={p.ai} color={BLUE} track="#f3f3f7" />
                <Bar value={p.manual} color="#d7d8df" track="#f3f3f7" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
