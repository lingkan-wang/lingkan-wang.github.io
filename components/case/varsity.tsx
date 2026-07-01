import Image from "next/image";
import type { Project } from "@/lib/projects";
import { varsity, type Shot as ShotT, type ShotNote as ShotNoteT, type Highlight as HighlightT, type TradeOff, type Matrix as MatrixT } from "@/lib/work/varsity";
import { Reveal } from "@/components/reveal";
import { Placeholder } from "@/components/placeholder";
import { Carousel } from "./carousel";
import { StatCounter } from "./stat-counter";
import { Emph, MetaGrid, NumberedCard, Takeaway } from "./elements";
import { CaseToc, type TocItem } from "./case-toc";
import { CaseShell, SectionHead, SubHead, MiniLabel, Bullet, Chip, GAP, STAGE } from "./scaffold";

const BODY = "text-base leading-[1.4] text-fg/90"; // reference body: 16px

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
      sizes="(max-width: 1080px) 92vw, 900px"
      className={`h-auto w-full rounded-2xl border border-border bg-white shadow-sm ring-1 ring-black/[0.03] ${className}`}
    />
  );
}

/** Annotation under a split-layout component image: goal, data logic, learning-science principle. */
function ShotNote({ note }: { note: ShotNoteT }) {
  return (
    <div className="px-0.5">
      <h4 className="text-[15px] font-normal tracking-tight text-fg">{note.title}</h4>
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
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent">
            Learning science · {note.principle.name}
          </span>
          <br />
          {note.principle.body}
        </p>
      )}
    </div>
  );
}

/** Homepage shot with its labelled callouts stacked in a grid beneath. */
function HomeCallouts({ shot, highlights }: { shot: ShotT; highlights: HighlightT[] }) {
  return (
    <div className={STAGE}>
      <Shot shot={shot} />
      <div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {highlights.map((h) => (
          <div key={h.title} className="border-t border-border pt-4">
            <h4 className="text-[15px] font-normal tracking-tight">{h.title}</h4>
            <p className="mt-1.5 text-sm leading-6 text-muted">{h.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** One carousel slide — a full screen contained in a fixed-height frame. */
function ExplorationSlide({ shot }: { shot: ShotT }) {
  const FRAME = "h-[clamp(300px,54vh,560px)] rounded-2xl bg-[#fafafa] dark:bg-white/[0.03]";
  return (
    <div className="px-1">
      {shot.placeholder || !shot.src ? (
        <div className={`flex items-center justify-center border border-dashed border-border ${FRAME}`}>
          <span className="px-8 text-center font-mono text-[10px] uppercase tracking-widest text-muted">{shot.alt}</span>
        </div>
      ) : (
        <div className={`relative border border-border ${FRAME}`}>
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(max-width: 1080px) 92vw, 900px"
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
            <span className={`mt-1 whitespace-nowrap text-[10px] font-medium ${p.chosen ? "text-accent" : "text-muted"}`}>
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
        <h3 className="text-lg font-normal tracking-tight">{t.title}</h3>
      </div>
      <p className={`mt-3 ${BODY}`}>{t.tension}</p>

      {t.photo && (
        <div className="mt-4">
          <Shot shot={t.photo} />
        </div>
      )}

      <div className="mt-5">
        <MiniLabel>Considered</MiniLabel>
      </div>
      <ul className="mt-3 space-y-2">
        {t.considered.map((o) => (
          <li key={o.label} className={`rounded-xl border p-3.5 ${o.chosen ? "border-accent/40 bg-accent/[0.04]" : "border-border"}`}>
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
        <MiniLabel accent>Decision</MiniLabel>
        <p className={`mt-2 ${BODY}`}>
          <span className="font-medium">{t.chose}</span> {t.why}
        </p>
      </div>

      {t.matrix && <DecisionMatrix m={t.matrix} />}

      {t.shot && (
        <div className={`mt-5 ${STAGE}`}>
          <Shot shot={t.shot} />
        </div>
      )}
    </div>
  );
}

export function VarsityCaseStudy({ meta }: { meta: Project }) {
  const { hero, setup, briefShot, transcript, research, jobs, problem, tradeoffs, reframe, pillars, explorations, outcome, takeaways } =
    varsity;

  const toc: TocItem[] = [
    { id: "brief", label: "Brief" },
    { id: "problem", label: "Problem" },
    { id: "research", label: "Research" },
    { id: "tradeoffs", label: "Trade-offs" },
    { id: "iteration", label: "Iteration" },
    ...pillars.map((_, i) => ({ id: `mvp-${i + 1}`, label: `MVP ${i + 1}` })),
    { id: "outcome", label: "Outcome" },
    { id: "takeaways", label: "Takeaways" },
  ];

  return (
    <CaseShell toc={<CaseToc items={toc} eyebrow="Case Study" title="Parent Dashboard" />}>
      {/* ───────────── HERO ───────────── */}
      <header>
        <Reveal>
          <ul className="flex flex-wrap gap-2">
            {meta.tags.map((t) => (
              <li key={t}>
                <Chip>{t}</Chip>
              </li>
            ))}
          </ul>
          <h1 className="mt-6 text-[1.95rem] font-normal leading-[1.1] tracking-tight sm:text-[2.5rem]">{meta.title}</h1>
          <p className="mt-6 text-lg leading-8 text-muted">{meta.summary}</p>
        </Reveal>
        <Reveal className="mt-10 border-t border-border pt-8">
          <MetaGrid meta={hero.meta} />
        </Reveal>
        <Reveal className="mt-10">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            width={1400}
            height={952}
            priority
            sizes="(max-width: 1080px) 92vw, 900px"
            className="h-auto w-full rounded-2xl border border-border"
          />
        </Reveal>
      </header>

      {/* ───────────── SECTIONS ───────────── */}
      <div className="mt-24 space-y-28 sm:mt-32 sm:space-y-40">
        {/* ─── THE BRIEF ─── */}
        <section id="brief" className={GAP}>
          <SectionHead label="The brief" title="Turn each session transcript into signals parents can act on." />
          <Reveal className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-10">
            {[
              { k: "Motivation", v: setup.motivation },
              { k: "Challenge", v: setup.challenge },
              { k: "Solution", v: setup.solution },
            ].map((c) => (
              <div key={c.k}>
                <MiniLabel accent>{c.k}</MiniLabel>
                <p className={`mt-2 ${BODY}`}>
                  <Emph text={c.v} />
                </p>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-10">
            <figure className={STAGE}>
              <Shot shot={briefShot} />
              <figcaption className="mt-4 text-center font-mono text-[0.8rem] uppercase tracking-[0.06em] text-muted">
                Co-creation workshop with the Varsity Tutors team
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* ─── PROBLEM (the current parent transcript) ─── */}
        <section id="problem" className={GAP}>
          <SectionHead label="Problem" title="Parents only got a raw transcript, so they just guessed." />
          <Reveal className="mt-12">
            <p className={BODY}>{transcript.body}</p>
          </Reveal>
          <Reveal className="mt-10">
            <figure className={STAGE}>
              <Shot shot={transcript.shot} />
              <figcaption className="mt-4 text-center font-mono text-[0.8rem] uppercase tracking-[0.06em] text-muted">
                Before the dashboard — the raw session recaps parents had to judge progress from
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* ─── RESEARCH (findings + jobs + journey) ─── */}
        <section id="research" className={GAP}>
          <SectionHead label="Research" title="Finding where trust breaks down." />
          <Reveal className="mt-12">
            <p className={BODY}>{research.intro}</p>
          </Reveal>
          <Reveal className="mt-12">
            <div className="grid gap-x-8 gap-y-10 border-y border-border py-10 sm:grid-cols-3">
              {research.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-4xl font-normal tracking-tight text-accent sm:text-5xl">
                    <StatCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-10">
            <MiniLabel>What I owned</MiniLabel>
            <ul className="mt-4 space-y-3">
              {research.ownership.map((o) => (
                <Bullet key={o}>{o}</Bullet>
              ))}
            </ul>
          </Reveal>

          {/* Jobs — what parents actually hire the product to do */}
          <Reveal className="mt-16">
            <SubHead label="Jobs to be done" title="What parents hire the product to do" />
            <p className={`mt-4 ${BODY}`}>
              Synthesis pointed to three jobs behind the renewal decision — and the product was failing all three.
            </p>
          </Reveal>
          <Reveal className="mt-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {jobs.map((j) => (
                <div key={j.title} className="flex h-full flex-col rounded-2xl border border-border p-5">
                  <h3 className="text-base font-normal tracking-tight">{j.title}</h3>
                  <p className="mt-3 border-l-2 border-accent pl-3 text-sm leading-6 text-fg/90">“{j.want}”</p>
                  <p className="mt-3 text-[13px] leading-6 text-muted">{j.body}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Journey map — where it breaks down */}
          <Reveal className="mt-16">
            <SubHead label="Journey map" title="Where the journey breaks down" />
            <p className={`mt-4 ${BODY}`}>{problem.statement}</p>
          </Reveal>
          <Reveal className="mt-10">
            <div className={STAGE}>
              <Shot shot={problem.blueprint} />
            </div>
          </Reveal>
          <Reveal className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {problem.items.map((p) => (
                <NumberedCard key={p.n} {...p} />
              ))}
            </div>
          </Reveal>
        </section>

        {/* ─── KEY TRADE-OFFS ─── */}
        <section id="tradeoffs" className={GAP}>
          <SectionHead label="Key trade-offs" title="Four decisions where the obvious answer wasn’t the right one." />
          <Reveal className="mt-12">
            <p className={BODY}>
              Getting from problem to product meant four decisions where the obvious answer wasn’t the right one — spanning the
              co-creation workshop through the final design.
            </p>
          </Reveal>
          <div className="mt-8 space-y-5">
            {tradeoffs.map((t) => (
              <Reveal key={t.n}>
                <TradeOffCard t={t} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ─── ITERATION (reframe from testing + explorations) ─── */}
        <section id="iteration" className={GAP}>
          <SectionHead label="Iteration" title="The problem wasn’t the data. It was the structure." />
          <Reveal className="mt-12">
            <p className={BODY}>{reframe.body}</p>
          </Reveal>
          <Reveal className="mt-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {reframe.goals.map((g) => (
                <NumberedCard key={g.n} {...g} />
              ))}
            </div>
          </Reveal>

          {/* Explorations — the structures we tried on the way here */}
          <Reveal className="mt-16">
            <SubHead label="Explorations" title="Five to six structures, compared" />
            <p className={`mt-4 ${BODY}`}>{explorations.body}</p>
          </Reveal>
          <Reveal className="mt-8">
            <Carousel
              slides={explorations.shots.map((s) => ({
                key: s.src ?? s.alt,
                node: <ExplorationSlide shot={s} />,
              }))}
            />
            <p className="mt-4 text-center font-mono text-[0.8rem] uppercase tracking-[0.06em] text-muted">
              ← Swipe to browse →
            </p>
          </Reveal>
        </section>

        {/* ─── FINAL MVP PILLARS ─── */}
        {pillars.map((p, i) => (
          <section key={p.title} id={`mvp-${i + 1}`} className={GAP}>
            <SectionHead label={p.kicker} title={p.title} />
            <Reveal className="mt-12">
              <p className={BODY}>{p.whatIsIt}</p>
            </Reveal>
            <Reveal className="mt-8">
              {p.highlights ? (
                <HomeCallouts shot={p.shots[0]} highlights={p.highlights} />
              ) : p.splitLayout ? (
                <div className={`${STAGE} grid items-start gap-4 sm:grid-cols-2 sm:gap-6`}>
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
                <div className={`${STAGE} grid gap-4 ${p.shots.length > 1 ? "sm:grid-cols-2" : ""}`}>
                  {p.shots.map((s) => (
                    <Shot key={s.src ?? s.alt} shot={s} />
                  ))}
                </div>
              )}
            </Reveal>
          </section>
        ))}

        {/* ─── OUTCOME ─── */}
        <section id="outcome" className={GAP}>
          <SectionHead label="Outcome & next steps" title="From more data to the right data." />
          <Reveal className="mt-12">
            <p className={BODY}>{outcome}</p>
          </Reveal>
        </section>

        {/* ─── TAKEAWAYS ─── */}
        <section id="takeaways" className={GAP}>
          <SectionHead label="Takeaways" title="What this taught me." />
          <Reveal className="mt-12">
            <div className="space-y-8">
              {takeaways.map((t, i) => (
                <Takeaway key={t.title} n={`0${i + 1}`} title={t.title} body={t.body} />
              ))}
            </div>
          </Reveal>
        </section>
      </div>
    </CaseShell>
  );
}
