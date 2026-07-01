import Image from "next/image";
import type { Project } from "@/lib/projects";
import { ecovacs, type Media } from "@/lib/work/ecovacs";
import { Reveal } from "@/components/reveal";
import { Plate } from "./shots";
import { ShotVideo } from "./shot-video";
import { SectionLabel, MetaGrid, QuoteCard, NumberedCard, Takeaway } from "./elements";
import { StatCounter } from "./stat-counter";
import { CaseToc, type TocItem } from "./case-toc";

const SHELL = "mx-auto w-[min(1180px,92vw)]";
const PROSE = "max-w-[680px]"; // readable text width
const GAP = "scroll-mt-24"; // clears the sticky top nav on anchor jumps

function Chip({ children, accent }: { children: string; accent?: boolean }) {
  return (
    <span
      className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${
        accent ? "border-accent/40 bg-accent/[0.06] text-accent" : "border-border text-muted"
      }`}
    >
      {children}
    </span>
  );
}

/** A section's eyebrow label + large headline, revealed together. */
function SectionHead({ label, title }: { label: string; title: string }) {
  return (
    <Reveal>
      <SectionLabel>{label}</SectionLabel>
      <h2 className="mt-4 max-w-[660px] text-balance text-3xl font-semibold leading-[1.12] tracking-tight sm:text-[2.4rem]">
        {title}
      </h2>
    </Reveal>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-[15px] leading-7 text-fg/90">
      <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-accent" />
      <span>{children}</span>
    </li>
  );
}

/** One labelled before/after tile: a chip + caption over the media. Phone screens
 *  and clips sit in a uniform phone frame; real photos render as stacked cards. */
function MediaTile({ media, chip, accent = false }: { media: Media; chip: string; accent?: boolean }) {
  if (media.kind === "photos") {
    return (
      <figure className="w-full max-w-[420px]">
        <figcaption className="mb-3">
          <Chip accent={accent}>{chip}</Chip>
          <span className="mt-2 block text-xs leading-snug text-muted">{media.caption}</span>
        </figcaption>
        <div className="flex gap-3">
          {media.items.map((it) => (
            <div
              key={it.src}
              className="relative aspect-[3/4] flex-1 overflow-hidden rounded-2xl border border-border bg-fg/[0.02]"
            >
              <Image src={it.src} alt={it.alt} fill sizes="210px" className="object-cover" />
            </div>
          ))}
        </div>
      </figure>
    );
  }
  return (
    <figure className="w-full max-w-[250px]">
      <figcaption className="mb-3 flex items-center gap-2.5">
        <Chip accent={accent}>{chip}</Chip>
        <span className="text-xs leading-tight text-muted">{media.caption}</span>
      </figcaption>
      <div className="relative aspect-[400/838] w-full overflow-hidden rounded-[2.5rem] border border-border bg-white">
        {media.kind === "video" ? (
          <ShotVideo src={media.src} poster={media.poster} alt={media.alt} />
        ) : media.kind === "image" ? (
          <Image src={media.src} alt={media.alt} fill sizes="300px" className="rounded-[2.5rem] object-cover object-top" />
        ) : (
          <div className="absolute inset-0 grid place-items-center px-6 text-center">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted">{media.label}</span>
          </div>
        )}
      </div>
    </figure>
  );
}

export function EcovacsCaseStudy(_props: { meta: Project }) {
  const { hero, overview, goals, problems, impact, challenges, improvements, nextSteps, takeaways } = ecovacs;

  const toc: TocItem[] = [
    { id: "overview", label: "Overview" },
    { id: "goals", label: "Goals" },
    { id: "problems", label: "Problems" },
    { id: "impact", label: "Impact" },
    ...challenges.map((c) => ({ id: c.id, label: c.feature })),
    { id: "more", label: "More" },
    { id: "next", label: "Next Steps" },
    { id: "takeaways", label: "Takeaways" },
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
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
                <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                  {hero.title}
                </h1>
                <ul className="flex shrink-0 flex-wrap gap-2 sm:pt-2">
                  {hero.tags.map((t) => (
                    <li key={t}>
                      <Chip>{t}</Chip>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{hero.sub}</p>
            </Reveal>
            <Reveal delay={0.05} className="mt-10">
              <Plate src={hero.media} alt={hero.mediaAlt} />
            </Reveal>
          </header>

          {/* ───────────── SECTIONS ───────────── */}
          <div className="mt-24 space-y-24 sm:mt-32 sm:space-y-32">
            {/* ─── OVERVIEW ─── */}
            <section id="overview" className={GAP}>
              <SectionHead label="Overview" title={overview.statement} />
              <Reveal className={`mt-7 ${PROSE}`}>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Note</p>
                <p className="mt-3 text-[15px] leading-7 text-fg/90">{overview.note}</p>
              </Reveal>
              <Reveal className="mt-10 border-t border-border pt-8">
                <MetaGrid meta={overview.meta} />
              </Reveal>
              <Reveal className={`mt-10 ${PROSE}`}>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">What I owned</p>
                <ul className="mt-4 space-y-3">
                  {overview.scope.map((s) => (
                    <Bullet key={s}>{s}</Bullet>
                  ))}
                </ul>
              </Reveal>
            </section>

            {/* ─── GOALS ─── */}
            <section id="goals" className={GAP}>
              <SectionHead label="Goals" title={goals.statement} />
              <Reveal className={`mt-5 ${PROSE}`}>
                <p className="text-[15px] leading-7 text-fg/90">{goals.intro}</p>
              </Reveal>
              <Reveal className="mt-8">
                <div className="grid gap-4 sm:grid-cols-3">
                  {goals.items.map((g, i) => (
                    <NumberedCard key={g.title} n={`0${i + 1}`} title={g.title} body={g.body} />
                  ))}
                </div>
              </Reveal>
            </section>

            {/* ─── CORE PROBLEMS ─── */}
            <section id="problems" className={GAP}>
              <SectionHead label="Core problems" title={problems.statement} />
              <Reveal className={`mt-5 ${PROSE}`}>
                <p className="text-[15px] leading-7 text-fg/90">{problems.intro}</p>
              </Reveal>
              <Reveal className="mt-8">
                <div className="grid gap-4 sm:grid-cols-3">
                  {problems.cards.map((c) => (
                    <div key={c.title} className="flex h-full flex-col rounded-2xl border border-border p-5">
                      <div className="text-3xl font-semibold tracking-tight tabular-nums sm:text-[2rem]">
                        <StatCounter value={c.stat.value} suffix={c.stat.suffix} />
                      </div>
                      <h3 className="mt-4 text-base font-semibold tracking-tight">{c.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-6 text-muted">{c.body}</p>
                      <p className="mt-4 border-t border-border pt-3 text-xs leading-5 text-muted/80">{c.stat.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal className="mt-10">
                <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted">In their words</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {problems.voices.map((q) => (
                    <QuoteCard key={q.name} {...q} />
                  ))}
                </div>
              </Reveal>
            </section>

            {/* ─── IMPACT (up front) ─── */}
            <section id="impact" className={GAP}>
              <SectionHead label="Impact" title={impact.statement} />
              <Reveal className={`mt-5 ${PROSE}`}>
                <p className="text-[15px] leading-7 text-fg/90">{impact.intro}</p>
              </Reveal>
              <Reveal className="mt-10 border-t border-border pt-10">
                <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
                  {impact.stats.map((s) => (
                    <div key={s.label}>
                      <dt className="text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                        <StatCounter value={s.value} suffix={s.suffix} />
                      </dt>
                      <dd className="mt-3 text-sm leading-6 text-muted">{s.label}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </section>

            {/* ─── DESIGN CHALLENGES (HMW) ─── */}
            {challenges.map((ch) => (
              <section key={ch.id} id={ch.id} className={GAP}>
                <SectionHead label={`Challenge ${ch.num} · ${ch.feature}`} title={ch.hmw} />
                <Reveal className={`mt-5 ${PROSE}`}>
                  <p className="text-[15px] leading-7 text-fg/90">{ch.approach}</p>
                  {ch.detail && (
                    <ul className="mt-5 space-y-3">
                      {ch.detail.map((d) => (
                        <Bullet key={d}>{d}</Bullet>
                      ))}
                    </ul>
                  )}
                </Reveal>

                {/* before (col 1) / after [+ then] (col 2) */}
                <Reveal className="mt-9">
                  <div className="grid items-start gap-x-8 gap-y-10 sm:grid-cols-2">
                    <MediaTile media={ch.before} chip="Before" />
                    {ch.extras && ch.extras.length > 0 ? (
                      <div className="flex gap-4">
                        <div className="min-w-0 flex-1">
                          <MediaTile media={ch.after} chip="After" accent />
                        </div>
                        {ch.extras.map((m, i) => (
                          <div key={i} className="min-w-0 flex-1">
                            <MediaTile media={m} chip="Then" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <MediaTile media={ch.after} chip="After" accent />
                    )}
                  </div>
                </Reveal>

                {ch.note && (
                  <Reveal className="mt-6">
                    <div className="rounded-2xl border border-border bg-fg/[0.02] p-6 sm:p-7">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-accent">{ch.note.title}</p>
                      <p className="mt-3 text-[15px] leading-7 text-fg/90">{ch.note.body}</p>
                    </div>
                  </Reveal>
                )}
              </section>
            ))}

            {/* ─── MORE IMPROVEMENTS ─── */}
            <section id="more" className={GAP}>
              <SectionHead label="More improvements" title="More that rounded out the X2." />
              <Reveal className={`mt-5 ${PROSE}`}>
                <p className="text-[15px] leading-7 text-fg/90">{improvements.intro}</p>
              </Reveal>
              <div className="mt-12 space-y-16 sm:mt-14 sm:space-y-24">
                {improvements.items.map((it, i) => (
                  <Reveal key={it.title}>
                    <div className="grid items-center gap-8 sm:grid-cols-2 sm:gap-12">
                      <div className={i % 2 === 1 ? "sm:order-2" : ""}>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-accent">{it.kicker}</p>
                        <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[1.7rem]">{it.title}</h3>
                        <p className="mt-4 max-w-prose text-[15px] leading-7 text-fg/90">{it.body}</p>
                      </div>
                      <div className={i % 2 === 1 ? "sm:order-1" : ""}>
                        <div className={`flex justify-center ${it.media.length > 1 ? "gap-3 sm:gap-4" : ""}`}>
                          {it.media.map((m, j) => {
                            const two = it.media.length > 1;
                            return (
                              <div key={j} className={`w-full max-w-[250px] ${two ? "min-w-0 flex-1" : "mx-auto"}`}>
                                <div className="relative aspect-[400/838] w-full overflow-hidden rounded-[2.5rem] border border-border bg-white">
                                  {m.video ? (
                                    <ShotVideo src={m.video} poster={m.poster} alt={it.title} />
                                  ) : (
                                    <Image src={m.img!} alt={it.title} fill sizes="250px" className="rounded-[2.5rem] object-cover object-top" />
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ─── NEXT STEPS ─── */}
            <section id="next" className={GAP}>
              <SectionHead label="Next steps" title={nextSteps.statement} />
              <Reveal className={`mt-5 ${PROSE}`}>
                <p className="text-[15px] leading-7 text-fg/90">{nextSteps.body}</p>
              </Reveal>
            </section>

            {/* ─── TAKEAWAYS ─── */}
            <section id="takeaways" className={GAP}>
              <SectionHead label="Takeaways" title="What this taught me." />
              <Reveal className={`mt-6 ${PROSE}`}>
                <div className="space-y-8">
                  {takeaways.map((t, i) => (
                    <Takeaway key={t.title} n={`0${i + 1}`} title={t.title} body={t.body} />
                  ))}
                </div>
              </Reveal>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
