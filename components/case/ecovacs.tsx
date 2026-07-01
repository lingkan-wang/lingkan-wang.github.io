import { Fragment } from "react";
import Image from "next/image";
import type { Project } from "@/lib/projects";
import { ecovacs } from "@/lib/work/ecovacs";
import { Reveal } from "@/components/reveal";
import { Plate } from "./shots";
import { ShotVideo } from "./shot-video";
import { MetaGrid, QuoteCard, NumberedCard, Takeaway } from "./elements";
import { CaseToc, type TocItem } from "./case-toc";
import { Stage, StageScreen, StageArrow, PhoneFrame } from "./stage";
import { SHELL, PROSE, GAP, Chip, SectionHead, Bullet } from "./scaffold";

export function EcovacsCaseStudy(_props: { meta: Project }) {
  const { hero, overview, goals, problems, impact, challenges, improvements, nextSteps, takeaways } = ecovacs;

  const toc: TocItem[] = [
    { id: "overview", label: "Overview" },
    { id: "problems", label: "Problems" },
    { id: "goals", label: "Goals" },
    { id: "impact", label: "Impact" },
    ...challenges.map((c, i) => ({ id: c.id, label: `Challenge ${i + 1}` })),
    { id: "takeaways", label: "Takeaways" },
    { id: "more", label: "More & next" },
  ];

  return (
    <div className="pt-20 sm:pt-24">
      {/* ── LAYOUT: sticky TOC rail (left, from the top) + content column (right) ── */}
      <div className={`${SHELL} md:grid md:grid-cols-[168px_minmax(0,1fr)] md:gap-10 lg:gap-14 xl:gap-20`}>
        <aside className="hidden md:block">
          <div className="sticky top-24">
            <CaseToc items={toc} eyebrow="Case Study" title={ecovacs.shortTitle} />
          </div>
        </aside>

        <div className="min-w-0">
          {/* ───────────── HERO ───────────── */}
          <header>
            <Reveal>
              <ul className="flex flex-wrap gap-2">
                {hero.tags.map((t) => (
                  <li key={t}>
                    <Chip>{t}</Chip>
                  </li>
                ))}
              </ul>
              <h1 className="mt-6 text-[1.95rem] font-normal leading-[1.1] tracking-tight sm:text-[2.5rem]">
                {hero.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted">{hero.sub}</p>
            </Reveal>
            <Reveal delay={0.05} className="mt-10">
              <Plate src={hero.media} alt={hero.mediaAlt} />
            </Reveal>
          </header>

          {/* ───────────── SECTIONS ───────────── */}
          <div className="mt-24 space-y-28 sm:mt-32 sm:space-y-48">
            {/* ─── OVERVIEW ─── */}
            <section id="overview" className={GAP}>
              <SectionHead label="Overview" title={overview.statement} />
              <Reveal className={`mt-12 ${PROSE}`}>
                <div className="border-l-2 border-border pl-5">
                  <p className="font-mono text-[0.8rem] uppercase tracking-[0.06em] text-muted">Note</p>
                  <p className="mt-3 text-base leading-[1.4] text-fg/90">{overview.note}</p>
                </div>
              </Reveal>
              <Reveal className="mt-10 border-t border-border pt-8">
                <MetaGrid meta={overview.meta} />
              </Reveal>
              <Reveal className={`mt-10 ${PROSE}`}>
                <p className="font-mono text-[0.8rem] uppercase tracking-[0.06em] text-muted">What I owned</p>
                <ul className="mt-4 space-y-3">
                  {overview.scope.map((s) => (
                    <Bullet key={s}>{s}</Bullet>
                  ))}
                </ul>
              </Reveal>
            </section>

            {/* ─── CORE PROBLEMS (before goals) ─── */}
            <section id="problems" className={GAP}>
              <SectionHead label="Core problems" title={problems.statement} />
              <Reveal className={`mt-12 ${PROSE}`}>
                <p className="text-base leading-[1.4] text-fg/90">{problems.intro}</p>
              </Reveal>
              <Reveal className="mt-8">
                <div className="grid gap-4 sm:grid-cols-3">
                  {problems.cards.map((c) => (
                    <div key={c.title} className="flex h-full flex-col rounded-2xl border border-border p-5">
                      <span className="font-mono text-[0.8rem] uppercase tracking-[0.06em] text-accent">{c.tag}</span>
                      <h3 className="mt-3 text-base font-normal tracking-tight">{c.title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-6 text-muted">{c.body}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal className="mt-10">
                <p className="mb-6 font-mono text-[0.8rem] uppercase tracking-[0.06em] text-muted">In their words</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {problems.voices.map((q) => (
                    <QuoteCard key={q.name} {...q} />
                  ))}
                </div>
              </Reveal>
            </section>

            {/* ─── GOALS ─── */}
            <section id="goals" className={GAP}>
              <SectionHead label="Goals" title={goals.statement} />
              <Reveal className={`mt-12 ${PROSE}`}>
                <p className="text-base leading-[1.4] text-fg/90">{goals.intro}</p>
              </Reveal>
              <Reveal className="mt-8">
                <div className="grid gap-4 sm:grid-cols-3">
                  {goals.items.map((g, i) => (
                    <NumberedCard key={g.title} n={`0${i + 1}`} title={g.title} body={g.body} />
                  ))}
                </div>
              </Reveal>
            </section>

            {/* ─── IMPACT (up front) ─── */}
            <section id="impact" className={GAP}>
              <SectionHead label="Impact" title={impact.statement} />
              <Reveal className={`mt-12 ${PROSE}`}>
                <p className="text-base leading-[1.4] text-fg/90">{impact.intro}</p>
              </Reveal>
              <Reveal className="mt-12 border-t border-border pt-12">
                <dl className="grid gap-x-8 gap-y-12 sm:grid-cols-3">
                  {impact.outcomes.map((o) => (
                    <div key={o.statement}>
                      <dt className="font-mono text-[0.8rem] uppercase tracking-[0.06em] text-muted">{o.kicker}</dt>
                      <dd className="mt-3 text-lg font-normal leading-snug text-fg sm:text-xl">
                        {o.statement}
                      </dd>
                      <dd className="mt-3 text-base leading-[1.4] text-muted">{o.support}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </section>

            {/* ─── DESIGN CHALLENGES (HMW) ─── */}
            {challenges.map((ch, i) => (
              <section key={ch.id} id={ch.id} className={GAP}>
                <SectionHead label={`Design Challenge ${i + 1}`} title={ch.hmw} />
                <Reveal className={`mt-12 ${PROSE}`}>
                  <p className="text-base leading-[1.4] text-fg/90">{ch.approach}</p>
                  {ch.detail && (
                    <ul className="mt-5 space-y-3">
                      {ch.detail.map((d) => (
                        <Bullet key={d}>{d}</Bullet>
                      ))}
                    </ul>
                  )}
                </Reveal>

                {/* before → after (→ then), staged as a captioned strip on a dark panel */}
                <Reveal className="mt-9">
                  <Stage title={`${ch.feature} · before → after`}>
                    <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-stretch sm:justify-center sm:gap-4">
                      {[
                        { media: ch.before, label: "Before", tone: "before" as const },
                        { media: ch.after, label: "After", tone: "after" as const },
                        ...(ch.extras?.map((m) => ({ media: m, label: "Then", tone: "then" as const })) ?? []),
                      ].map((s, i) => (
                        <Fragment key={i}>
                          {i > 0 && <StageArrow />}
                          <StageScreen media={s.media} label={s.label} tone={s.tone} />
                        </Fragment>
                      ))}
                    </div>
                  </Stage>
                </Reveal>

                {ch.note && (
                  <Reveal className="mt-6">
                    <div className="rounded-2xl border border-border bg-fg/[0.02] p-6 sm:p-7">
                      <p className="font-mono text-[0.8rem] uppercase tracking-[0.06em] text-accent">{ch.note.title}</p>
                      <p className="mt-3 text-base leading-[1.4] text-fg/90">{ch.note.body}</p>
                    </div>
                  </Reveal>
                )}
              </section>
            ))}

            {/* ─── TAKEAWAYS (before the closing More & next area) ─── */}
            <section id="takeaways" className={GAP}>
              <SectionHead label="Takeaways" title="What this taught me." />
              <Reveal className={`mt-12 ${PROSE}`}>
                <div className="space-y-8">
                  {takeaways.map((t, i) => (
                    <Takeaway key={t.title} n={`0${i + 1}`} title={t.title} body={t.body} />
                  ))}
                </div>
              </Reveal>
            </section>

            {/* ─── MORE IMPROVEMENTS + NEXT STEPS (merged closing area) ─── */}
            <section id="more" className={GAP}>
              <SectionHead label="More & next" title="More that rounded out the X2." />
              <Reveal className={`mt-12 ${PROSE}`}>
                <p className="text-base leading-[1.4] text-fg/90">{improvements.intro}</p>
              </Reveal>
              <div className="mt-12 space-y-16 sm:mt-14 sm:space-y-24">
                {improvements.items.map((it, i) => (
                  <Reveal key={it.title}>
                    <div className="grid items-center gap-8 sm:grid-cols-2 sm:gap-12">
                      <div className={i % 2 === 1 ? "sm:order-2" : ""}>
                        <p className="font-mono text-[0.8rem] uppercase tracking-[0.06em] text-accent">{it.kicker}</p>
                        <h3 className="mt-3 text-2xl font-normal tracking-tight sm:text-[1.7rem]">{it.title}</h3>
                        <p className="mt-4 max-w-prose text-base leading-[1.4] text-fg/90">{it.body}</p>
                      </div>
                      <div className={i % 2 === 1 ? "sm:order-1" : ""}>
                        <div className="rounded-2xl border border-border bg-[#fafafa] px-6 py-8 sm:px-10 sm:py-12 dark:bg-white/[0.03]">
                          <div className={`flex justify-center ${it.media.length > 1 ? "gap-4 sm:gap-5" : ""}`}>
                            {it.media.map((m, j) => {
                              const two = it.media.length > 1;
                              return (
                                <div key={j} className={two ? "min-w-0 flex-1 max-w-[230px]" : "mx-auto w-full max-w-[230px]"}>
                                  {m.video ? (
                                    <div className="relative mx-auto aspect-[400/838] w-full max-w-[230px]">
                                      <ShotVideo src={m.video} poster={m.poster} alt={it.title} />
                                    </div>
                                  ) : (
                                    <PhoneFrame>
                                      <Image src={m.img!} alt={it.title} fill sizes="230px" className="object-cover object-top" />
                                    </PhoneFrame>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* next steps, folded into the same closing region */}
              <Reveal className="mt-16 border-t border-border pt-12 sm:mt-24">
                <p className="font-mono text-[0.8rem] uppercase tracking-[0.06em] text-muted">Next steps</p>
                <h3 className="mt-3 text-[1.6rem] font-normal leading-[1.2] tracking-tight sm:text-[1.9rem]">
                  {nextSteps.statement}
                </h3>
                <p className="mt-5 max-w-[680px] text-base leading-[1.4] text-fg/90">{nextSteps.body}</p>
              </Reveal>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
