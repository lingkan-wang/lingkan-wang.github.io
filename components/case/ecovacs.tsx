import Image from "next/image";
import type { Project } from "@/lib/projects";
import { ecovacs } from "@/lib/work/ecovacs";
import { Reveal } from "@/components/reveal";
import { StatCounter } from "./stat-counter";
import { Phone, Plate } from "./shots";
import { SectionLabel, Emph, MetaGrid, QuoteCard, NumberedCard, Takeaway } from "./elements";

const NARROW = "mx-auto max-w-[680px] px-6";
const WIDE = "mx-auto w-[min(1080px,92vw)]";
const GAP = "mt-20 sm:mt-28";

function featureCols(n: number) {
  return n >= 3 ? "sm:grid-cols-3" : n === 2 ? "sm:grid-cols-2" : "";
}

export function EcovacsCaseStudy({ meta }: { meta: Project }) {
  const { hero, brief, research, voices, problems, mission, opportunities, pillars, productOverview, impact, nextSteps, takeaways } = ecovacs;

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
        <Plate src={hero.image} alt={hero.imageAlt} />
      </Reveal>

      {/* BRIEF */}
      <Reveal className={`${NARROW} ${GAP}`}>
        <SectionLabel>Brief</SectionLabel>
        <p className="mt-5 text-[15px] leading-7 text-fg/90">
          <Emph text={brief} />
        </p>
      </Reveal>

      {/* RESEARCH + STATS */}
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

      {/* VOICES */}
      <Reveal className={`${WIDE} ${GAP}`}>
        <SectionLabel>What we heard</SectionLabel>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {voices.map((q) => (
            <QuoteCard key={q.name} {...q} />
          ))}
        </div>
      </Reveal>

      {/* PROBLEM */}
      <Reveal className={`${NARROW} ${GAP}`}>
        <SectionLabel>Problem statement</SectionLabel>
        <p className="mt-5 text-[15px] leading-7 text-fg/90">
          Although DEEBOT X2 is positioned as fully autonomous, users still hit friction in setup, decision-making, and
          high-risk scenarios. The system functions — but it doesn’t consistently feel effortless or trustworthy.
        </p>
      </Reveal>
      <Reveal className={`${WIDE} mt-6`}>
        <div className="grid gap-4 sm:grid-cols-3">
          {problems.map((p) => (
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
        <SectionLabel>Opportunities</SectionLabel>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {opportunities.map((o, i) => (
            <NumberedCard key={o.title} n={`0${i + 1}`} title={o.title} body={o.body} />
          ))}
        </div>
      </Reveal>

      {/* SOLUTION PILLARS */}
      {pillars.map((p) => {
        const phones = p.shots.filter((s) => s.kind === "phone");
        const plates = p.shots.filter((s) => s.kind === "plate");
        return (
          <section key={p.title} className={`${WIDE} ${GAP}`}>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#edf0fb]">
                  <Image src={p.icon} alt="" width={18} height={18} className="size-[18px]" />
                </span>
                <SectionLabel>{p.kicker}</SectionLabel>
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">{p.title}</h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-fg/90">{p.whatIsIt}</p>
            </Reveal>

            {phones.length > 0 && (
              <Reveal className="mt-8">
                <div className="rounded-3xl bg-[#eaeefb] p-6 sm:p-10">
                  <div className="flex flex-wrap items-start justify-center gap-5 sm:gap-7">
                    {phones.map((s) => (
                      <div key={s.src} className="w-[160px] sm:w-[220px]">
                        <Phone src={s.src} alt={s.alt} />
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
            {plates.map((s) => (
              <Reveal key={s.src} className="mt-5">
                <Plate src={s.src} alt={s.alt} />
              </Reveal>
            ))}

            <Reveal className="mt-10">
              <div className={`grid gap-x-8 gap-y-7 ${featureCols(p.features.length)}`}>
                {p.features.map((f) => (
                  <div key={f.title} className="border-t border-border pt-4">
                    <h3 className="text-sm font-semibold tracking-tight">{f.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{f.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        );
      })}

      {/* PRODUCT OVERVIEW */}
      <Reveal className={`${NARROW} ${GAP}`}>
        <SectionLabel>Product overview</SectionLabel>
        <p className="mt-5 text-[15px] leading-7 text-fg/90">{productOverview.body}</p>
      </Reveal>
      <Reveal className={`${WIDE} mt-8`}>
        <div className="grid gap-4 sm:grid-cols-2">
          {productOverview.shots.map((s) => (
            <div key={s.src} className="rounded-2xl bg-fg/[0.025] p-5 sm:p-6">
              <Plate src={s.src} alt={s.alt} />
            </div>
          ))}
        </div>
      </Reveal>

      {/* IMPACT */}
      <Reveal className={`${WIDE} ${GAP}`}>
        <SectionLabel>Impact</SectionLabel>
        <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {impact.map((s) => (
            <div key={s.label}>
              <div className="text-5xl font-semibold tracking-tight sm:text-6xl">
                <StatCounter value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-[15px] leading-7 text-muted">{nextSteps}</p>
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
