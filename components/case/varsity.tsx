import Image from "next/image";
import type { Project } from "@/lib/projects";
import { varsity, type Shot as ShotT, type ShotNote as ShotNoteT, type Highlight as HighlightT, type TradeOff, type Matrix as MatrixT } from "@/lib/work/varsity";
import { Reveal } from "@/components/reveal";
import { Placeholder } from "@/components/placeholder";
import { Carousel } from "./carousel";
import { StatCounter } from "./stat-counter";
import { SectionLabel, Emph, MetaGrid, NumberedCard, Takeaway } from "./elements";

// Prose shares the content width so it left-aligns with the visual blocks below
// and runs to the same right edge before wrapping.
const NARROW = "mx-auto w-[min(1080px,92vw)]";
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

/** Annotation under a split-layout component image: goal, data logic, learning-science principle. */
function ShotNote({ note }: { note: ShotNoteT }) {
  return (
    <div className="px-0.5">
      <h4 className="text-sm font-semibold tracking-tight text-fg">{note.title}</h4>
      {note.logic.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {note.logic.map((l) => (
            <li key={l} className="flex gap-2 text-[13px] leading-6 text-muted">
              <span className="mt-[9px] size-1 shrink-0 rounded-full bg-fg/30" aria-hidden />
              <span>{l}</span>
            </li>
          ))}
        </ul>
      )}
      {note.principle && (
        <p className="mt-2.5 text-[12.5px] leading-6 text-fg/70">
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
            Learning science · {note.principle.name}
          </span>
          <br />
          {note.principle.body}
        </p>
      )}
    </div>
  );
}

/** A single flanking callout: a connector bar that spans the region [top, bottom],
 *  with the text top-aligned beside it. */
function CalloutItem({ h }: { h: HighlightT }) {
  const text = (
    <div className={`min-w-0 flex-1 ${h.side === "left" ? "text-right" : "text-left"}`}>
      <h4 className="text-[13px] font-semibold leading-snug tracking-tight text-fg">{h.title}</h4>
      <p className="mt-1 text-[12px] leading-5 text-muted">{h.body}</p>
    </div>
  );
  const bar = <span className="w-[3px] shrink-0 rounded-full bg-accent/60" aria-hidden />;
  return (
    <div
      className={`absolute flex w-full items-stretch gap-3 ${h.side === "left" ? "right-0 justify-end pr-1" : "left-0 pl-1"}`}
      style={{ top: `${h.top * 100}%`, height: `${(h.bottom - h.top) * 100}%` }}
    >
      {h.side === "left" ? (
        <>
          {text}
          {bar}
        </>
      ) : (
        <>
          {bar}
          {text}
        </>
      )}
    </div>
  );
}

/** Homepage shot with callouts flanking it (xl+); stacks the callouts in a grid below on smaller screens. */
function HomeCallouts({ shot, highlights, tint }: { shot: ShotT; highlights: HighlightT[]; tint: string }) {
  return (
    <div className={`rounded-3xl ${tint} p-5 sm:p-8`}>
      {/* xl+: callouts flank the image, each aligned to its region */}
      <div className="hidden xl:grid xl:grid-cols-[1fr_minmax(0,600px)_1fr] xl:gap-5">
        <div className="relative">
          {highlights.filter((h) => h.side === "left").map((h) => (
            <CalloutItem key={h.title} h={h} />
          ))}
        </div>
        <Shot shot={shot} className="self-start" />
        <div className="relative">
          {highlights.filter((h) => h.side === "right").map((h) => (
            <CalloutItem key={h.title} h={h} />
          ))}
        </div>
      </div>
      {/* < xl: image, then callouts in a 2-up grid */}
      <div className="xl:hidden">
        <Shot shot={shot} />
        <div className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2">
          {highlights.map((h) => (
            <div key={h.title} className="border-t border-border pt-4">
              <h4 className="text-sm font-semibold tracking-tight">{h.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted">{h.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** One carousel slide — a full screen contained in a fixed-height frame, with a caption. */
function ExplorationSlide({ shot }: { shot: ShotT }) {
  const FRAME = "h-[clamp(300px,54vh,560px)] rounded-2xl bg-fg/[0.03]";
  return (
    <div className="px-1">
      {shot.placeholder || !shot.src ? (
        <div className={`flex items-center justify-center border border-dashed border-border ${FRAME}`}>
          <span className="px-8 text-center font-mono text-[10px] uppercase tracking-widest text-muted">{shot.alt}</span>
        </div>
      ) : (
        <div className={`relative ${FRAME}`}>
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(max-width: 1080px) 92vw, 1080px"
            className="object-contain p-5 sm:p-8"
          />
        </div>
      )}
    </div>
  );
}

/** Impact × effort plot showing why one option won. */
function DecisionMatrix({ m }: { m: MatrixT }) {
  return (
    <div className="mt-5 rounded-xl border border-border bg-fg/[0.015] p-4 sm:p-5">
      <p className="font-mono text-[9px] uppercase tracking-widest text-muted">{m.yLabel}</p>
      <div className="relative mt-2 aspect-[16/10] rounded-lg border border-border bg-bg">
        {/* sweet-spot quadrant (top-left: high impact, low effort) */}
        <div className="pointer-events-none absolute left-0 top-0 h-1/2 w-1/2 rounded-tl-lg bg-accent/[0.06]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
        <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-border" />
        {m.points.map((p) => (
          <div
            key={p.label}
            className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${p.x * 100}%`, top: `${(1 - p.y) * 100}%` }}
          >
            <span className={`size-2.5 rounded-full ${p.chosen ? "bg-accent ring-4 ring-accent/15" : "bg-fg/35"}`} />
            <span
              className={`mt-1 whitespace-nowrap text-[10px] font-medium ${p.chosen ? "text-accent" : "text-muted"}`}
            >
              {p.label}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-right font-mono text-[9px] uppercase tracking-widest text-muted">{m.xLabel}</p>
      {m.note && <p className="mt-3 text-[13px] leading-6 text-fg/80">{m.note}</p>}
    </div>
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

      {t.photo && (
        <div className="mt-4">
          <Shot shot={t.photo} />
        </div>
      )}

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

      {t.matrix && <DecisionMatrix m={t.matrix} />}

      {t.shot && (
        <div className="mt-5 rounded-xl bg-fg/[0.025] p-4 sm:p-5">
          <Shot shot={t.shot} />
        </div>
      )}
    </div>
  );
}

export function VarsityCaseStudy({ meta }: { meta: Project }) {
  const { hero, setup, briefShot, transcript, research, jobs, problem, tradeoffs, reframe, pillars, explorations, outcome, takeaways } =
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

      {/* THE BRIEF — motivation / challenge / solution */}
      <Reveal className={`${WIDE} ${GAP}`}>
        <SectionLabel>The brief</SectionLabel>
        <div className="mt-6 grid gap-8 sm:grid-cols-3 sm:gap-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent">Motivation</p>
            <p className="mt-2 text-[15px] leading-7 text-fg/90">
              <Emph text={setup.motivation} />
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent">Challenge</p>
            <p className="mt-2 text-[15px] leading-7 text-fg/90">
              <Emph text={setup.challenge} />
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent">Solution</p>
            <p className="mt-2 text-[15px] leading-7 text-fg/90">
              <Emph text={setup.solution} />
            </p>
          </div>
        </div>
      </Reveal>
      <Reveal className={`${WIDE} mt-8`}>
        <figure>
          <Shot shot={briefShot} />
          <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted">
            Co-creation workshop with the Varsity Tutors team
          </figcaption>
        </figure>
      </Reveal>

      {/* THE CURRENT PARENT TRANSCRIPT */}
      <Reveal className={`${NARROW} ${GAP}`}>
        <SectionLabel>Look at the current parent transcript</SectionLabel>
        <p className="mt-5 text-[15px] leading-7 text-fg/90">{transcript.body}</p>
      </Reveal>
      <Reveal className={`${WIDE} mt-8`}>
        <figure className="rounded-2xl bg-fg/[0.025] p-5 sm:p-6">
          <Shot shot={transcript.shot} />
          <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted">
            Before the dashboard — the raw session recaps parents had to judge progress from
          </figcaption>
        </figure>
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
        <p className="mt-4 text-[15px] leading-7 text-fg/90">
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
            <p className="mt-3 text-[15px] leading-7 text-fg/90">{p.whatIsIt}</p>
          </Reveal>

          <Reveal className="mt-8">
            {p.highlights ? (
              <HomeCallouts shot={p.shots[0]} highlights={p.highlights} tint={p.tint} />
            ) : p.splitLayout ? (
              <div className={`grid items-start gap-4 rounded-3xl ${p.tint} p-5 sm:grid-cols-2 sm:gap-6 sm:p-8`}>
                <Shot shot={p.shots[0]} className="sm:sticky sm:top-24" />
                <div className="grid content-start gap-7">
                  {p.shots.slice(1).map((s) => (
                    <figure key={s.src ?? s.alt} className="grid gap-3">
                      <Shot shot={s} />
                      {s.note && <ShotNote note={s.note} />}
                    </figure>
                  ))}
                </div>
              </div>
            ) : (
              <div className={`grid gap-4 rounded-3xl ${p.tint} p-5 sm:p-8 ${p.shots.length > 1 ? "sm:grid-cols-2" : ""}`}>
                {p.shots.map((s) => (
                  <Shot key={s.src ?? s.alt} shot={s} />
                ))}
              </div>
            )}
          </Reveal>
        </section>
      ))}

      {/* EXPLORATIONS */}
      <Reveal className={`${NARROW} ${GAP}`}>
        <SectionLabel>Explorations &amp; iterations</SectionLabel>
        <p className="mt-5 text-[15px] leading-7 text-fg/90">{explorations.body}</p>
      </Reveal>
      <Reveal className={`${WIDE} mt-8`}>
        <Carousel
          slides={explorations.shots.map((s) => ({
            key: s.src ?? s.alt,
            node: <ExplorationSlide shot={s} />,
          }))}
        />
        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted">
          ← Swipe to browse →
        </p>
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
