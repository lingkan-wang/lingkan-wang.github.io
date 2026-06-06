import Image from "next/image";
import { bumble, type Img, type Clip as ClipT } from "@/lib/work/bumble";
import { Reveal } from "@/components/reveal";
import { Clip } from "./clip";

const COL = "mx-auto w-[min(880px,92vw)]";
const WIDE = "mx-auto w-[min(1080px,92vw)]";
const GAP = "mt-20 sm:mt-28";

/** Render *text* between single asterisks in the accent color. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("*") && p.endsWith("*") ? (
          <span key={i} className="text-accent">{p.slice(1, -1)}</span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">{children}</h2>;
}

function Body({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={`max-w-[680px] text-[15px] leading-7 text-fg/90 ${className}`}>
      <Rich text={text} />
    </p>
  );
}

/** A still — centered, rounded, light border, optional caption. */
function Shot({ img, maxW = "max-w-none" }: { img: Img; maxW?: string }) {
  return (
    <figure className={`mx-auto m-0 ${maxW}`}>
      <Image
        src={img.src}
        alt={img.alt}
        width={img.w}
        height={img.h}
        sizes="(max-width: 1080px) 92vw, 1080px"
        className="h-auto w-full rounded-2xl border border-border bg-fg/[0.02]"
      />
      {img.caption && <figcaption className="mt-3 text-xs text-muted">{img.caption}</figcaption>}
    </figure>
  );
}

/** A demo clip in a rounded frame, sized to its own aspect, optional label below. */
function ClipTile({ clip, radius = "1.25rem", white = true }: { clip: ClipT; radius?: string; white?: boolean }) {
  return (
    <figure className="m-0">
      <div
        className={`relative w-full overflow-hidden rounded-[1.25rem] border border-border ${white ? "bg-white" : "bg-fg/[0.02]"}`}
        style={{ aspectRatio: `${clip.w} / ${clip.h}` }}
      >
        <Clip src={clip.src} poster={clip.poster} alt={clip.label ?? ""} radius={radius} fit="cover" />
      </div>
      {clip.label && <figcaption className="mt-2.5 text-[12px] font-medium text-muted">{clip.label}</figcaption>}
    </figure>
  );
}

export function BumbleCaseStudy() {
  const b = bumble;
  return (
    <div className="pt-16 sm:pt-20">
      <h1 className="sr-only">Bumble Interest Cards</h1>

      {/* HERO */}
      <Reveal className={WIDE}>
        <Image
          src={b.hero.media.src}
          alt={b.hero.media.alt}
          width={b.hero.media.w}
          height={b.hero.media.h}
          priority
          sizes="(max-width: 1080px) 92vw, 1080px"
          className="h-auto w-full rounded-2xl"
        />
      </Reveal>

      {/* META */}
      <Reveal className={`${COL} mt-10`}>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-y border-border py-7 sm:grid-cols-4">
          {b.hero.meta.map((m) => (
            <div key={m.label}>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-accent">{m.label}</dt>
              <dd className="mt-2 text-sm leading-6 text-fg/90">{m.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* BRIEF */}
      <Reveal className={`${COL} ${GAP}`}>
        <H2>Brief</H2>
        <Body text={b.brief} className="mt-5" />
      </Reveal>

      {/* PROBLEM */}
      <Reveal className={`${COL} ${GAP}`}>
        <H2>Problem</H2>
        <Body text={b.problem} className="mt-5" />
      </Reveal>

      {/* GOALS */}
      <Reveal className={`${COL} ${GAP}`}>
        <H2>Goals</H2>
        <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-3">
          {b.goals.map((g, i) => (
            <div key={g.title}>
              <span className="font-mono text-xs text-accent">{`0${i + 1}`}</span>
              <h3 className="mt-2 text-[15px] font-semibold tracking-tight">{g.title}</h3>
              <p className="mt-1.5 text-[13px] leading-6 text-muted">{g.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* GOAL STATEMENT + preview */}
      <Reveal className={`${COL} ${GAP}`}>
        <H2>Goal statement</H2>
        <Body text={b.goalStatement} className="mt-5" />
      </Reveal>
      <Reveal className={`${WIDE} mt-12`}>
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">{b.preview.label}</p>
        <p className="mt-2 max-w-[520px] text-sm text-muted">{b.preview.sub}</p>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4">
          {b.preview.clips.map((c) => (
            <ClipTile key={c.src} clip={c} radius="1.25rem" />
          ))}
        </div>
      </Reveal>

      {/* RESEARCH */}
      <Reveal className={`${COL} ${GAP}`}>
        <H2>Research</H2>
        <Body text={b.research} className="mt-5" />
      </Reveal>

      {/* COMPETITIVE ANALYSIS */}
      <Reveal className={`${COL} ${GAP}`}>
        <H2>Competitive analysis</H2>
        <Body text={b.competitive.intro} className="mt-5" />
        <ol className="mt-5 max-w-[680px] space-y-3">
          {b.competitive.patterns.map((p, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-7 text-fg/90">
              <span className="font-mono text-sm text-accent">{`0${i + 1}`}</span>
              <span>{p}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {b.competitive.refs.map((r) => (
            <Image
              key={r.src}
              src={r.src}
              alt={r.alt}
              width={r.w}
              height={r.h}
              sizes="(max-width: 640px) 45vw, 160px"
              className="h-auto w-full rounded-xl border border-border"
            />
          ))}
        </div>
      </Reveal>

      {/* DATA ANALYSIS */}
      <Reveal className={`${COL} ${GAP}`}>
        <H2>Data analysis</H2>
        <Body text={b.data.intro} className="mt-5" />
      </Reveal>
      <Reveal className={`${WIDE} mt-8`}>
        <Shot img={b.data.chart} />
      </Reveal>

      {/* IDEATION */}
      <Reveal className={`${COL} ${GAP}`}>
        <H2>Ideation</H2>
        <Body text={b.ideation.intro} className="mt-5" />
      </Reveal>
      <Reveal className={`${WIDE} mt-8`}>
        <Shot img={b.ideation.img} maxW="max-w-[860px]" />
      </Reveal>

      {/* SITE MAP */}
      <Reveal className={`${COL} ${GAP}`}>
        <H2>Site map</H2>
        <Body text={b.siteMap.intro} className="mt-5" />
      </Reveal>
      <Reveal className={`${WIDE} mt-8`}>
        <Shot img={b.siteMap.img} />
      </Reveal>

      {/* USER FLOW */}
      <Reveal className={`${COL} ${GAP}`}>
        <H2>User flow</H2>
        <Body text={b.userFlow.intro} className="mt-5" />
      </Reveal>
      <Reveal className={`${WIDE} mt-8 space-y-10`}>
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-accent">{b.userFlow.initiator.caption}</p>
          <Shot img={{ ...b.userFlow.initiator, caption: undefined }} />
        </div>
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-accent">{b.userFlow.receiver.caption}</p>
          <Shot img={{ ...b.userFlow.receiver, caption: undefined }} />
        </div>
      </Reveal>

      {/* CORE INTERACTIONS */}
      <Reveal className={`${COL} ${GAP}`}>
        <H2>{b.coreInteractions.title}</H2>
        <Body text={b.coreInteractions.intro} className="mt-5" />
      </Reveal>
      <Reveal className={`${WIDE} mt-8`}>
        <Shot img={b.coreInteractions.img} />
      </Reveal>

      {/* CROSS-PLATFORM */}
      <Reveal className={`${COL} ${GAP}`}>
        <H2>Cross-platform prototype</H2>
        <Body text={b.crossPlatform.intro} className="mt-5" />
      </Reveal>
      {/* Android & iPhone */}
      <Reveal className={`${COL} mt-12`}>
        <h3 className="text-lg font-semibold tracking-tight">{b.crossPlatform.androidIphone.title}</h3>
        <Body text={b.crossPlatform.androidIphone.body} className="mt-3" />
      </Reveal>
      <Reveal className={`${WIDE} mt-8`}>
        {/* Columns sized 1.565:1 so the wide annotated still (0.756) and the tall
            phone clip (0.483) render at the same height — tops and bottoms align. */}
        <div className="mx-auto grid max-w-[760px] items-start gap-8 sm:grid-cols-[1.565fr_1fr]">
          <Shot img={b.crossPlatform.androidIphone.img} />
          <div className="mx-auto w-full max-w-[280px] sm:max-w-none">
            <ClipTile clip={b.crossPlatform.androidIphone.clip} />
          </div>
        </div>
      </Reveal>
      {/* Desktop */}
      <Reveal className={`${COL} mt-14`}>
        <h3 className="text-lg font-semibold tracking-tight">{b.crossPlatform.desktop.title}</h3>
        <Body text={b.crossPlatform.desktop.body} className="mt-3" />
      </Reveal>
      <Reveal className={`${WIDE} mt-8`}>
        <ClipTile clip={b.crossPlatform.desktop.clip} radius="1rem" />
      </Reveal>

      {/* USER TESTING */}
      <Reveal className={`${COL} ${GAP}`}>
        <H2>User testing</H2>
        <Body text={b.userTesting} className="mt-5" />
      </Reveal>

      {/* NEXT STEPS */}
      <Reveal className={`${COL} ${GAP}`}>
        <H2>Next steps</H2>
        <ol className="mt-5 max-w-[680px] space-y-3">
          {b.nextSteps.map((s, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-7 text-fg/90">
              <span className="font-mono text-sm text-accent">{`0${i + 1}`}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* REFLECTION */}
      <Reveal className={`${COL} ${GAP}`}>
        <H2>Reflection</H2>
        <Body text={b.reflection} className="mt-5" />
      </Reveal>
    </div>
  );
}
