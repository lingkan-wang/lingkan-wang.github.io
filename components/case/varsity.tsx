import Image from "next/image";
import type { Project } from "@/lib/projects";
import { varsity, type Shot as ShotT } from "@/lib/work/varsity";
import { Reveal } from "@/components/reveal";
import { StatCounter } from "./stat-counter";
import { SectionLabel, Emph, MetaGrid, NumberedCard, Takeaway } from "./elements";

const NARROW = "mx-auto max-w-[680px] px-6";
const WIDE = "mx-auto w-[min(1080px,92vw)]";
const GAP = "mt-20 sm:mt-28";

/** A bordered, rounded screenshot on the page surface. */
function Shot({ shot, className = "" }: { shot: ShotT; className?: string }) {
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

export function VarsityCaseStudy({ meta }: { meta: Project }) {
  const {
    hero,
    brief,
    context,
    research,
    personas,
    voices,
    problem,
    mission,
    opportunities,
    springMvp,
    pillars,
    explorations,
    outcome,
    takeaways,
  } = varsity;

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

      {/* RESEARCH + STATS + OWNERSHIP */}
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

      {/* PERSONAS */}
      <Reveal className={`${WIDE} ${GAP}`}>
        <SectionLabel>Who we designed for</SectionLabel>
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

      {/* VOICES */}
      <Reveal className={`${WIDE} ${GAP}`}>
        <SectionLabel>What we heard</SectionLabel>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {voices.map((v) => (
            <figure
              key={v.quote}
              className="rounded-2xl border border-border bg-fg/[0.02] p-5 transition-colors hover:border-fg/20"
            >
              <blockquote className="text-[15px] leading-7 text-fg/90">“{v.quote}”</blockquote>
              <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted">
                {v.source}
              </figcaption>
            </figure>
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
          <Shot shot={problem.blueprint} className="border-border" />
        </div>
      </Reveal>
      <Reveal className={`${WIDE} mt-6`}>
        <div className="grid gap-4 sm:grid-cols-2">
          {problem.items.map((p) => (
            <NumberedCard key={p.n} {...p} />
          ))}
        </div>
      </Reveal>

      {/* MISSION */}
      <Reveal className={`mx-auto max-w-[860px] px-6 ${GAP}`}>
        <p className="text-center font-mono text-xs uppercase tracking-widest text-muted">The mission</p>
        <p className="mt-5 text-balance text-center text-2xl font-medium leading-snug tracking-tight sm:text-[2rem]">
          {mission}
        </p>
      </Reveal>

      {/* OPPORTUNITIES */}
      <Reveal className={`${WIDE} ${GAP}`}>
        <SectionLabel>Design opportunities</SectionLabel>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {opportunities.map((o, i) => (
            <NumberedCard key={o.title} n={`0${i + 1}`} title={o.title} body={o.body} />
          ))}
        </div>
      </Reveal>

      {/* FROM LO-FI TO A TESTED MVP */}
      <Reveal className={`${NARROW} ${GAP}`}>
        <SectionLabel>From lo-fi to a tested MVP</SectionLabel>
        <p className="mt-5 text-[15px] leading-7 text-fg/90">{springMvp.body}</p>
      </Reveal>
      <Reveal className={`${WIDE} mt-8`}>
        <div className="grid gap-4 sm:grid-cols-2">
          {springMvp.shots.map((s) => (
            <div key={s.src} className="rounded-2xl bg-fg/[0.025] p-5 sm:p-6">
              <Shot shot={s} />
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal className={`${NARROW} mt-10`}>
        <div className="rounded-2xl border-l-2 border-accent bg-fg/[0.02] py-4 pl-5 pr-4">
          <p className="text-[15px] leading-7 text-fg/90">{springMvp.learned}</p>
        </div>
      </Reveal>

      {/* SOLUTION PILLARS */}
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
                <Shot key={s.src} shot={s} />
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
        <div className="grid gap-4 sm:grid-cols-2">
          <figure className="rounded-2xl bg-fg/[0.025] p-5">
            <Shot shot={explorations.before} />
            <figcaption className="mt-3 text-center text-xs text-muted">Earlier direction</figcaption>
          </figure>
          <figure className="rounded-2xl bg-fg/[0.025] p-5">
            <Shot shot={explorations.after} />
            <figcaption className="mt-3 text-center text-xs text-muted">Refined direction</figcaption>
          </figure>
        </div>
      </Reveal>

      {/* OUTCOME */}
      <Reveal className={`${NARROW} ${GAP}`}>
        <SectionLabel>Outcome</SectionLabel>
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
