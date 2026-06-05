import Image from "next/image";
import { bumble, type Img, type Clip as ClipT } from "@/lib/work/bumble";
import { Reveal } from "@/components/reveal";
import { Compare, CompareRow } from "@/components/mdx/compare";
import { Stats } from "@/components/mdx/stats";
import { Clip } from "./clip";
import { SectionLabel, MetaGrid, NumberedCard, Takeaway } from "./elements";

const WIDE = "mx-auto w-[min(1080px,92vw)]";
const PROSE = "max-w-[680px]";
const GAP = "mt-24 sm:mt-36";

/** A still — bordered, rounded, with an optional caption. */
function Shot({ img, className = "" }: { img: Img; className?: string }) {
  return (
    <figure className={className}>
      <Image
        src={img.src}
        alt={img.alt}
        width={img.w}
        height={img.h}
        sizes="(max-width: 1080px) 92vw, 1080px"
        className="h-auto w-full rounded-2xl border border-border bg-fg/[0.02]"
      />
      {img.caption && <figcaption className="mx-auto mt-3 max-w-[680px] text-center text-xs leading-5 text-muted">{img.caption}</figcaption>}
    </figure>
  );
}

/** A pre-framed flow recording (device baked in) on a white device tile. */
function FlowTile({ clip, accent = false }: { clip: ClipT; accent?: boolean }) {
  return (
    <figure className="m-0">
      <figcaption className="mb-3">
        <span
          className={`inline-block rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${
            accent ? "border-accent/40 bg-accent/[0.06] text-accent" : "border-border text-muted"
          }`}
        >
          {clip.label}
        </span>
        <span className="mt-2 block text-[13px] leading-6 text-muted">{clip.caption}</span>
      </figcaption>
      <div
        className="relative w-full overflow-hidden rounded-[2rem] border border-border bg-white"
        style={{ aspectRatio: `${clip.w} / ${clip.h}` }}
      >
        <Clip src={clip.src} poster={clip.poster} alt={clip.label} radius="2rem" fit="cover" />
      </div>
    </figure>
  );
}

/** A screen-only microinteraction clip with a label + caption beneath. */
function MiTile({ clip }: { clip: ClipT }) {
  return (
    <figure className="m-0">
      <div
        className="relative w-full overflow-hidden rounded-xl border border-border bg-fg/[0.02]"
        style={{ aspectRatio: `${clip.w} / ${clip.h}` }}
      >
        <Clip src={clip.src} poster={clip.poster} alt={clip.label} radius="0.75rem" fit="cover" />
      </div>
      <figcaption className="mt-3">
        <span className="block text-sm font-medium">{clip.label}</span>
        <span className="mt-0.5 block text-[13px] leading-6 text-muted">{clip.caption}</span>
      </figcaption>
    </figure>
  );
}

export function BumbleCaseStudy() {
  const { hero, problem, insight, concept, flows, conversion, microinteractions, validation, takeaways } = bumble;

  return (
    <div className="pt-20 sm:pt-28">
      {/* ───────── HERO ───────── */}
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
        <Shot img={hero.media} />
      </Reveal>

      {/* ───────── PROBLEM ───────── */}
      <Reveal className={`${WIDE} ${GAP}`}>
        <div className={PROSE}>
          <SectionLabel>The problem</SectionLabel>
          <p className="mt-5 text-[15px] leading-7 text-fg/90">{problem.intro}</p>
        </div>
      </Reveal>
      <Reveal className={`${WIDE} mt-8`}>
        <div className="grid gap-4 sm:grid-cols-3">
          {problem.cards.map((c, i) => (
            <NumberedCard key={c.title} n={`0${i + 1}`} title={c.title} body={c.body} />
          ))}
        </div>
      </Reveal>

      {/* ───────── INSIGHT ───────── */}
      <Reveal className={`${WIDE} ${GAP}`}>
        <div className={PROSE}>
          <SectionLabel>The insight</SectionLabel>
          <p className="mt-5 text-[15px] leading-7 text-fg/90">{insight.intro}</p>
        </div>
      </Reveal>
      <Reveal className={`${WIDE} mt-8`}>
        <div className="grid gap-4 sm:grid-cols-3">
          {insight.cards.map((c, i) => (
            <NumberedCard key={c.title} n={`0${i + 1}`} title={c.title} body={c.body} />
          ))}
        </div>
      </Reveal>
      <Reveal className={`${WIDE} mt-10`}>
        <Shot img={insight.chart} />
      </Reveal>
      <Reveal className={`${WIDE} mt-10`}>
        <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted">Competitive scan</p>
        <div className="grid grid-cols-3 gap-4 sm:max-w-[520px]">
          {insight.refs.map((r) => (
            <Image
              key={r.src}
              src={r.src}
              alt={r.alt}
              width={r.w}
              height={r.h}
              sizes="(max-width: 640px) 30vw, 170px"
              className="h-auto w-full rounded-xl border border-border"
            />
          ))}
        </div>
      </Reveal>

      {/* ───────── CONCEPT ───────── */}
      <Reveal className={`${WIDE} ${GAP}`}>
        <div className={PROSE}>
          <SectionLabel>The concept</SectionLabel>
          <p className="mt-5 text-[15px] leading-7 text-fg/90">{concept.intro}</p>
        </div>
      </Reveal>
      <Reveal className={`${WIDE} mt-10`}>
        <Shot img={concept.states} />
      </Reveal>
      <Reveal className={`${WIDE} mt-12`}>
        <Shot img={concept.sitemap} />
      </Reveal>

      {/* ───────── HOW IT WORKS ───────── */}
      <Reveal className={`${WIDE} ${GAP}`}>
        <div className={PROSE}>
          <SectionLabel>How it works</SectionLabel>
          <p className="mt-5 text-[15px] leading-7 text-fg/90">{flows.intro}</p>
        </div>
      </Reveal>
      <Reveal className={`${WIDE} mt-9`}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {flows.items.map((c, i) => (
            <FlowTile key={c.src} clip={c} accent={i === 2} />
          ))}
        </div>
      </Reveal>
      <Reveal className={`${WIDE} mt-14`}>
        <figure className="m-0">
          <figcaption className="mb-3">
            <span className="inline-block rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted">
              {flows.desktop.label}
            </span>
            <span className="mt-2 block max-w-[680px] text-[13px] leading-6 text-muted">{flows.desktop.caption}</span>
          </figcaption>
          <div
            className="relative w-full overflow-hidden rounded-2xl border border-border bg-white"
            style={{ aspectRatio: `${flows.desktop.w} / ${flows.desktop.h}` }}
          >
            <Clip src={flows.desktop.src} poster={flows.desktop.poster} alt={flows.desktop.label} radius="1rem" fit="cover" />
          </div>
        </figure>
      </Reveal>
      <Reveal className={`${WIDE} mt-14`}>
        <p className={`${PROSE} text-[15px] leading-7 text-muted`}>{flows.crossPlatform.note}</p>
        <div className="mt-6 grid items-start gap-8 sm:grid-cols-2">
          <FlowTile clip={flows.crossPlatform.android} />
          <Shot img={flows.crossPlatform.platforms} />
        </div>
      </Reveal>

      {/* ───────── CONVERSION ───────── */}
      <Reveal className={`${WIDE} ${GAP}`}>
        <div className={PROSE}>
          <SectionLabel>Designing for conversion</SectionLabel>
          <p className="mt-5 text-[15px] leading-7 text-fg/90">{conversion.intro}</p>
        </div>
      </Reveal>
      <div className={`${WIDE} mt-2`}>
        <Compare a="Free" b="Premium">
          {conversion.rows.map((r) => (
            <CompareRow key={r.feature} feature={r.feature} a={r.free} b={r.premium} />
          ))}
        </Compare>
      </div>
      <Reveal className={`${WIDE} mt-6`}>
        <div className="grid items-start gap-8 sm:grid-cols-[280px_1fr]">
          <div className="grid grid-cols-2 gap-4">
            {conversion.gate.map((g) => (
              <figure key={g.src} className="m-0">
                <Image src={g.src} alt={g.alt} width={g.w} height={g.h} sizes="140px" className="h-auto w-full rounded-2xl border border-border" />
                {g.caption && <figcaption className="mt-2 text-center text-[11px] text-muted">{g.caption}</figcaption>}
              </figure>
            ))}
          </div>
          <div className="self-center">
            <Shot img={conversion.diagram} />
          </div>
        </div>
      </Reveal>

      {/* ───────── MICROINTERACTIONS ───────── */}
      <Reveal className={`${WIDE} ${GAP}`}>
        <div className={PROSE}>
          <SectionLabel>Microinteractions</SectionLabel>
          <p className="mt-5 text-[15px] leading-7 text-fg/90">{microinteractions.intro}</p>
        </div>
      </Reveal>
      <Reveal className={`${WIDE} mt-8`}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
          {microinteractions.items.map((c) => (
            <MiTile key={c.src} clip={c} />
          ))}
        </div>
      </Reveal>

      {/* ───────── VALIDATION ───────── */}
      <Reveal className={`${WIDE} ${GAP}`}>
        <div className={PROSE}>
          <SectionLabel>Validation</SectionLabel>
          <p className="mt-5 text-[15px] leading-7 text-fg/90">{validation.intro}</p>
        </div>
      </Reveal>
      <div className={`${WIDE} mt-2`}>
        <Stats items={validation.stats} />
      </div>
      <Reveal className={`${WIDE} mt-6`}>
        <p className={`${PROSE} text-[15px] leading-7 text-muted`}>{validation.note}</p>
      </Reveal>

      {/* ───────── TAKEAWAYS ───────── */}
      <Reveal className={`${WIDE} ${GAP}`}>
        <div className={PROSE}>
          <SectionLabel>Takeaways</SectionLabel>
          <div className="mt-6 space-y-8">
            {takeaways.map((t, i) => (
              <Takeaway key={t.title} n={`0${i + 1}`} title={t.title} body={t.body} />
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
