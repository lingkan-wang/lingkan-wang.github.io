import type { Project } from "@/lib/projects";
import { ecovacs, type Media } from "@/lib/work/ecovacs";
import { Reveal } from "@/components/reveal";
import { Plate } from "./shots";
import { ShotVideo } from "./shot-video";
import { SectionLabel, MetaGrid, QuoteCard, NumberedCard, Takeaway, MediaPlaceholder } from "./elements";

const NARROW = "mx-auto max-w-[680px] px-6";
const WIDE = "mx-auto w-[min(1080px,92vw)]";
const GAP = "mt-24 sm:mt-36";

/** One labelled before/after tile: a chip + caption over a portrait media. */
function MediaTile({ media, chip, accent = false }: { media: Media; chip: string; accent?: boolean }) {
  return (
    <figure className="mx-auto w-full max-w-[300px]">
      <figcaption className="mb-3 flex items-center gap-2.5">
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${
            accent ? "border-accent/40 bg-accent/[0.06] text-accent" : "border-border text-muted"
          }`}
        >
          {chip}
        </span>
        <span className="text-xs leading-tight text-muted">{media.caption}</span>
      </figcaption>
      {media.kind === "video" ? (
        <ShotVideo src={media.src} poster={media.poster} alt={media.alt} />
      ) : (
        <MediaPlaceholder portrait label={media.label} caption="footage to come" />
      )}
    </figure>
  );
}

export function EcovacsCaseStudy(_props: { meta: Project }) {
  const { hero, problem, priorities, chapters, rollout, impact, takeaways } = ecovacs;

  return (
    <div className="pt-20 sm:pt-28">
      {/* ───────────── HERO ───────────── */}
      <header className={WIDE}>
        <Reveal>
          <SectionLabel>{hero.kicker}</SectionLabel>
          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{hero.sub}</p>
        </Reveal>
        <Reveal delay={0.05} className="mt-12 border-t border-border pt-8">
          <MetaGrid meta={hero.meta} />
        </Reveal>
      </header>

      <Reveal className={`${WIDE} mt-12`}>
        <Plate src={hero.media} alt={hero.mediaAlt} />
      </Reveal>

      {/* ───────────── PROBLEM ───────────── */}
      <Reveal className={`${NARROW} ${GAP}`}>
        <SectionLabel>The problem</SectionLabel>
        <p className="mt-5 text-[15px] leading-7 text-fg/90">{problem.intro}</p>
      </Reveal>
      <Reveal className={`${WIDE} mt-8`}>
        <div className="grid gap-4 sm:grid-cols-3">
          {problem.cards.map((c, i) => (
            <NumberedCard key={c.title} n={`0${i + 1}`} title={c.title} body={c.body} />
          ))}
        </div>
      </Reveal>
      <Reveal className={`${WIDE} mt-10`}>
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted">In their words</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {problem.voices.map((q) => (
            <QuoteCard key={q.name} {...q} />
          ))}
        </div>
      </Reveal>

      {/* ───────────── PRIORITIES ───────────── */}
      <Reveal className={`${NARROW} ${GAP}`}>
        <SectionLabel>How we chose what to build</SectionLabel>
        <p className="mt-5 text-[15px] leading-7 text-fg/90">{priorities.intro}</p>
        <ul className="mt-5 space-y-3">
          {priorities.criteria.map((c) => (
            <li key={c} className="flex gap-3 text-[15px] leading-7 text-fg/90">
              <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-accent" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[15px] leading-7 text-fg/90">Three bets rose to the top:</p>
      </Reveal>
      <Reveal className={`${WIDE} mt-8`}>
        <div className="grid gap-4 sm:grid-cols-3">
          {priorities.bets.map((b, i) => (
            <NumberedCard key={b.title} n={`0${i + 1}`} title={b.title} body={b.body} />
          ))}
        </div>
      </Reveal>

      {/* ───────────── FEATURE CHAPTERS ───────────── */}
      {chapters.map((ch) => (
        <section key={ch.kicker} className={`${WIDE} ${GAP}`}>
          <Reveal>
            <SectionLabel>{ch.kicker}</SectionLabel>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {ch.title}
            </h2>
            <div className="mt-7 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">The problem</p>
                <p className="mt-2 text-[15px] leading-7 text-fg/90">{ch.problem}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">The solution</p>
                <p className="mt-2 text-[15px] leading-7 text-fg/90">{ch.solution}</p>
              </div>
            </div>
          </Reveal>

          {/* before / after comparison */}
          <Reveal className="mt-9">
            <div className="grid items-start gap-8 sm:grid-cols-2">
              <MediaTile media={ch.before} chip="Before" />
              <MediaTile media={ch.after} chip="After" accent />
            </div>
            {ch.extras && ch.extras.length > 0 && (
              <div className="mt-8 flex flex-wrap justify-center gap-8">
                {ch.extras.map((m, i) => (
                  <MediaTile key={i} media={m} chip="Then" />
                ))}
              </div>
            )}
          </Reveal>

          {/* optional trade-off callout */}
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

      {/* ───────────── ROLLOUT ───────────── */}
      <Reveal className={`${NARROW} ${GAP}`}>
        <SectionLabel>Rollout</SectionLabel>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">{rollout.title}</h2>
        <p className="mt-5 text-[15px] leading-7 text-fg/90">{rollout.intro}</p>
      </Reveal>
      <Reveal className={`${WIDE} mt-8`}>
        <div className="grid gap-4 sm:grid-cols-3">
          {rollout.reasons.map((r, i) => (
            <NumberedCard key={r.title} n={`0${i + 1}`} title={r.title} body={r.body} />
          ))}
        </div>
      </Reveal>
      <Reveal className={`${NARROW} mt-8`}>
        <p className="text-[15px] leading-7 text-muted">{rollout.outro}</p>
      </Reveal>

      {/* ───────────── IMPACT (qualitative) ───────────── */}
      <Reveal className={`mx-auto max-w-[860px] px-6 ${GAP}`}>
        <p className="text-center font-mono text-xs uppercase tracking-widest text-muted">Impact</p>
        <p className="mt-5 text-balance text-center text-2xl font-medium leading-snug tracking-tight sm:text-[2rem]">
          {impact.headline}
        </p>
        <ul className="mx-auto mt-10 max-w-2xl space-y-4">
          {impact.results.map((r) => (
            <li key={r} className="flex gap-3 text-[15px] leading-7 text-fg/90">
              <span className="mt-[10px] size-1.5 shrink-0 rounded-full bg-accent" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* ───────────── TAKEAWAYS ───────────── */}
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
