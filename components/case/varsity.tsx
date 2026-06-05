import Image from "next/image";
import type { Project } from "@/lib/projects";
import { varsity, type Shot as ShotT, type TradeOff } from "@/lib/work/varsity";
import { Reveal } from "@/components/reveal";
import { Placeholder } from "@/components/placeholder";
import { StatCounter } from "./stat-counter";
import { SectionLabel, Emph, MetaGrid, NumberedCard, Takeaway } from "./elements";

const NARROW = "mx-auto max-w-[680px] px-6";
const MID = "mx-auto max-w-[820px] px-6";
const WIDE = "mx-auto w-[min(1080px,92vw)]";
const GAP = "mt-20 sm:mt-28";

/** A bordered, rounded screenshot — or a labelled placeholder when no asset yet. */
function Shot({ shot, className = "" }: { shot: ShotT; className?: string }) {
  if (shot.placeholder || !shot.src) {
    return <Placeholder label={shot.alt} aspect="aspect-[16/9]" className={className} />;
  }
  return (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.w}
      height={shot.h}
      sizes="(max-width: 1080px) 92vw, 1080px"
      className={`h-auto w-full rounded-2xl border border-border bg-white shadow-sm ring-1 ring-black/[0.03] ${className}`}
    />
  );
}

function TradeOffCard({ t }: { t: TradeOff }) {
  return (
    <div className="rounded-2xl border border-border p-6 sm:p-7">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-accent">{t.n}</span>
        <h3 className="text-lg font-semibold tracking-tight">{t.title}</h3>
      </div>
      <p className="mt-3 text-[15px] leading-7 text-fg/90">{t.tension}</p>

      <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-muted">Considered</p>
      <ul className="mt-3 space-y-2">
        {t.considered.map((o) => (
          <li
            key={o.label}
            className={`rounded-xl border p-3.5 ${o.chosen ? "border-accent/40 bg-accent/[0.04]" : "border-border"}`}
          >
            <div className="flex items-center gap-2">
              <span className={`size-1.5 shrink-0 rounded-full ${o.chosen ? "bg-accent" : "bg-fg/25"}`} />
              <span className={`text-[13px] font-medium ${o.chosen ? "text-accent" : "text-fg/90"}`}>
                {o.label}
                {o.chosen && " · chosen"}
              </span>
            </div>
            <p className="mt-1.5 pl-3.5 text-[13px] leading-6 text-muted">{o.note}</p>
          </li>
        ))}
      </ul>

      <div className="mt-5 border-t border-border pt-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-accent">Decision</p>
        <p className="mt-2 text-[15px] leading-7 text-fg/90">
          <span className="font-medium">{t.chose}</span> {t.why}
        </p>
      </div>
    </div>
  );
}

export function VarsityCaseStudy({ meta }: { meta: Project }) {
  const { hero, brief, context, research, jobs, personas, problem, tradeoffs, reframe, pillars, explorations, outcome, takeaways } =
    varsity;

  return (
    <div className="pt-20 sm:pt-28">
      {/* HERO */}
      <header className={WIDE}>
        <Reveal>
          <SectionLabel>
            {meta.role} · {meta.year} · {meta.company}
          </SectionLabel>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">{meta.summary}</p>
        </Reveal>
        <Reveal delay={0.05} className="mt-10 border-t border-border pt-8">
          <MetaGrid meta={hero.meta} />
        </Reveal>
      </header>

      <Reveal className={`${WIDE} mt-12`}>
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          width={1400}
          height={952}
          priority
          sizes="(max-width: 1080px) 92vw, 1080px"
          className="h-auto w-full rounded-2xl border border-border"
        />
      </Reveal>

      {/* BRIEF + CONTEXT */}
      <Reveal className={`${NARROW} ${GAP}`}>
        <SectionLabel>Brief</SectionLabel>
        <p className="mt-5 text-[15px] leading-7 text-fg/90">
          <Emph text={brief} />
        </p>
        <p className="mt-5 text-[15px] leading-7 text-muted">{context}</p>
      </Reveal>

      {/* RESEARCH */}
      <Reveal className={`${NARROW} ${GAP}`}>
        <SectionLabel>Research</SectionLabel>
        <p className="mt-5 text-[15px] leading-7 text-fg/90">{research.intro}</p>
      </Reveal>
      <Reveal className={`${WIDE} mt-12`}>
        <div className="grid gap-x-8 gap-y-10 border-y border-border py-10 sm:grid-cols-3">
          {research.stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-semibold tracking-tight text-accent sm:text-5xl">
                <StatCounter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal className={`${NARROW} mt-12`}>
        <h3 className="text-lg font-semibold tracking-tight">My ownership &amp; scope</h3>
        <ul className="mt-4 space-y-3">
          {research.ownership.map((o) => (
            <li key={o} className="flex gap-3 text-[15px] leading-7 text-fg/90">
              <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-accent" />
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* THE 3 JOBS */}
      <Reveal className={`${WIDE} ${GAP}`}>
        <SectionLabel>What parents hire the product to do</SectionLabel>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-fg/90">
          Synthesis pointed to three jobs behind the renewal decision — and the product was failing all three.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {jobs.map((j) => (
            <div key={j.title} className="rounded-2xl border border-border p-5">
              <h3 className="text-[15px] font-semibold tracking-tight">{j.title}</h3>
              <p className="mt-3 border-l-2 border-accent pl-3 text-sm leading-6 text-fg/90">“{j.want}”</p>
              <p className="mt-3 text-[13px] leading-6 text-muted">{j.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* PERSONAS */}
      <Reveal className={`${WIDE} ${GAP}`}>
        <SectionLabel>Two parents, two horizons</SectionLabel>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {personas.map((p) => (
            <div key={p.name} className="rounded-2xl border border-border p-5">
              <div className="flex items-center gap-3">
                <Image
                  src={p.avatar}
                  alt={p.name}
                  width={48}
                  height={48}
                  className="size-12 rounded-full border border-border object-cover"
                />
                <div>
                  <h3 className="text-[15px] font-semibold tracking-tight">{p.name}</h3>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">{p.meta}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 text-[13px] leading-6 sm:grid-cols-2">
                <div>
                  <p className="font-medium">Motivation</p>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-muted">
                    {p.motivation.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium">Needs</p>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-muted">
                    {p.needs.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* PROBLEM */}
      <Reveal className={`${NARROW} ${GAP}`}>
        <SectionLabel>Problem</SectionLabel>
        <p className="mt-5 text-[15px] leading-7 text-fg/90">{problem.statement}</p>
      </Reveal>
      <Reveal className={`${WIDE} mt-8`}>
        <div className="rounded-2xl bg-fg/[0.025] p-5 sm:p-6">
          <Shot shot={problem.blueprint} />
        </div>
      </Reveal>
      <Reveal className={`${WIDE} mt-6`}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problem.items.map((p) => (
            <NumberedCard key={p.n} {...p} />
          ))}
        </div>
      </Reveal>

      {/* KEY TRADE-OFFS */}
      <Reveal className={`${MID} ${GAP}`}>
        <SectionLabel>Key trade-offs</SectionLabel>
        <p className="mt-4 text-[15px] leading-7 text-fg/90">
          Getting from problem to product meant four decisions where the obvious answer wasn’t the right one — spanning the
          co-creation workshop through the final design.
        </p>
      </Reveal>
      <div className={`${MID} mt-8 space-y-5`}>
        {tradeoffs.map((t) => (
          <Reveal key={t.n}>
            <TradeOffCard t={t} />
          </Reveal>
        ))}
      </div>

      {/* REFRAME → FIND / UNDERSTAND / ACT */}
      <Reveal className={`${NARROW} ${GAP}`}>
        <SectionLabel>What testing changed</SectionLabel>
        <p className="mt-5 text-[15px] leading-7 text-fg/90">{reframe.body}</p>
      </Reveal>
      <Reveal className={`${WIDE} mt-6`}>
        <div className="grid gap-4 sm:grid-cols-3">
          {reframe.goals.map((g) => (
            <NumberedCard key={g.n} {...g} />
          ))}
        </div>
      </Reveal>

      {/* FINAL MVP PILLARS */}
      {pillars.map((p) => (
        <section key={p.title} className={`${WIDE} ${GAP}`}>
          <Reveal>
            <SectionLabel>{p.kicker}</SectionLabel>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">{p.title}</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-fg/90">{p.whatIsIt}</p>
          </Reveal>

          <Reveal className="mt-8">
            <div className={`grid gap-4 rounded-3xl ${p.tint} p-5 sm:p-8 ${p.shots.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {p.shots.map((s) => (
                <Shot key={s.src ?? s.alt} shot={s} />
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-3">
              {p.features.map((f) => (
                <div key={f.title} className="border-t border-border pt-4">
                  <h3 className="text-sm font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{f.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      ))}

      {/* EXPLORATIONS */}
      <Reveal className={`${NARROW} ${GAP}`}>
        <SectionLabel>Explorations &amp; iterations</SectionLabel>
        <p className="mt-5 text-[15px] leading-7 text-fg/90">{explorations.body}</p>
      </Reveal>
      <Reveal className={`${WIDE} mt-8`}>
        <div className="grid gap-4 sm:grid-cols-3">
          {explorations.shots.map((s) => (
            <div key={s.src ?? s.alt} className="rounded-2xl bg-fg/[0.025] p-5">
              <Shot shot={s} />
            </div>
          ))}
        </div>
      </Reveal>

      {/* OUTCOME */}
      <Reveal className={`${NARROW} ${GAP}`}>
        <SectionLabel>Outcome &amp; next steps</SectionLabel>
        <p className="mt-5 text-[15px] leading-7 text-fg/90">{outcome}</p>
      </Reveal>

      {/* TAKEAWAYS */}
      <Reveal className={`${NARROW} ${GAP}`}>
        <SectionLabel>Takeaways</SectionLabel>
        <div className="mt-6 space-y-8">
          {takeaways.map((t, i) => (
            <Takeaway key={t.title} n={`0${i + 1}`} title={t.title} body={t.body} />
          ))}
        </div>
      </Reveal>
    </div>
  );
}
