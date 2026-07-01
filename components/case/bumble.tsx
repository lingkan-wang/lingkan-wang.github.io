import Image from "next/image";
import type { Project } from "@/lib/projects";
import { bumble, type Img, type Clip as ClipT } from "@/lib/work/bumble";
import { Reveal } from "@/components/reveal";
import { Clip } from "./clip";
import { CaseToc, type TocItem } from "./case-toc";
import { CaseShell, SectionHead, SubHead, MiniLabel, Bullet, Chip, GAP, STAGE } from "./scaffold";

const BODY = "text-base leading-[1.4] text-fg/90"; // reference body: 16px

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

function Body({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={`${BODY} ${className}`}>
      <Rich text={text} />
    </p>
  );
}

/** A still — rounded, light border, optional caption. */
function Shot({ img, className = "" }: { img: Img; className?: string }) {
  return (
    <figure className={`m-0 ${className}`}>
      <Image
        src={img.src}
        alt={img.alt}
        width={img.w}
        height={img.h}
        sizes="(max-width: 1080px) 92vw, 900px"
        className="h-auto w-full rounded-2xl border border-border bg-white"
      />
      {img.caption && <figcaption className="mt-3 text-xs text-muted">{img.caption}</figcaption>}
    </figure>
  );
}

/** A demo clip in a rounded frame, sized to its own aspect, optional label below. */
function ClipTile({ clip, radius = "1.25rem" }: { clip: ClipT; radius?: string }) {
  return (
    <figure className="m-0">
      <div
        className="relative w-full overflow-hidden rounded-[1.25rem] border border-border bg-white"
        style={{ aspectRatio: `${clip.w} / ${clip.h}` }}
      >
        <Clip src={clip.src} poster={clip.poster} alt={clip.label ?? ""} radius={radius} fit="cover" />
      </div>
      {clip.label && <figcaption className="mt-2.5 text-center text-[12px] font-medium text-muted">{clip.label}</figcaption>}
    </figure>
  );
}

export function BumbleCaseStudy({ meta }: { meta: Project }) {
  const b = bumble;

  const toc: TocItem[] = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "goals", label: "Goals" },
    { id: "research", label: "Research" },
    { id: "design", label: "Design" },
    { id: "interactions", label: "Interactions" },
    { id: "cross-platform", label: "Cross-platform" },
    { id: "testing", label: "Testing" },
    { id: "takeaways", label: "Takeaways" },
  ];

  return (
    <CaseShell toc={<CaseToc items={toc} eyebrow="Case Study" title="Interest Cards" />}>
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
          <dl className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4">
            {b.hero.meta.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[0.8rem] uppercase tracking-[0.06em] text-muted">{m.label}</dt>
                <dd className="mt-1.5 text-sm leading-6 text-fg/90">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal className="mt-10">
          <Image
            src={b.hero.media.src}
            alt={b.hero.media.alt}
            width={b.hero.media.w}
            height={b.hero.media.h}
            priority
            sizes="(max-width: 1080px) 92vw, 900px"
            className="h-auto w-full rounded-2xl border border-border"
          />
        </Reveal>
      </header>

      {/* ───────────── SECTIONS ───────────── */}
      <div className="mt-24 space-y-28 sm:mt-32 sm:space-y-40">
        {/* ─── OVERVIEW ─── */}
        <section id="overview" className={GAP}>
          <SectionHead label="Overview" title="Interest Cards that turn nearby discovery into a Premium moment." />
          <Reveal className="mt-12">
            <Body text={b.brief} />
          </Reveal>
          <Reveal className="mt-16">
            <SubHead label="A direct look at the design" title="The four states the feature has to serve" />
            <p className={`mt-4 ${BODY}`}>{b.preview.sub}</p>
          </Reveal>
          <Reveal className="mt-8">
            <div className={STAGE}>
              <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4">
                {b.preview.clips.map((c) => (
                  <ClipTile key={c.src} clip={c} />
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ─── PROBLEM ─── */}
        <section id="problem" className={GAP}>
          <SectionHead label="Problem" title="Location value users can’t see — so they don’t upgrade." />
          <Reveal className="mt-12">
            <Body text={b.problem} />
          </Reveal>
        </section>

        {/* ─── GOALS ─── */}
        <section id="goals" className={GAP}>
          <SectionHead label="Goals" title="Make location worth sharing, and worth paying for." />
          <Reveal className="mt-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {b.goals.map((g, i) => (
                <div key={g.title} className="rounded-2xl border border-border p-5">
                  <span className="font-mono text-xs text-accent">{`0${i + 1}`}</span>
                  <h3 className="mt-2 text-base font-normal tracking-tight">{g.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{g.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-8">
            <Body text={b.goalStatement} />
          </Reveal>
        </section>

        {/* ─── RESEARCH (research + competitive + data) ─── */}
        <section id="research" className={GAP}>
          <SectionHead label="Research" title="What makes people act on a nearby stranger." />
          <Reveal className="mt-12">
            <Body text={b.research} />
          </Reveal>

          {/* Competitive analysis */}
          <Reveal className="mt-16">
            <SubHead label="Competitive analysis" title="Patterns worth borrowing" />
            <Body text={b.competitive.intro} className="mt-4" />
            <ol className="mt-5 space-y-3">
              {b.competitive.patterns.map((p, i) => (
                <li key={i} className="flex gap-3 text-base leading-[1.4] text-fg/90">
                  <span className="font-mono text-sm text-accent">{`0${i + 1}`}</span>
                  <span>{p}</span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal className="mt-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
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

          {/* Data analysis */}
          <Reveal className="mt-16">
            <SubHead label="Data analysis" title="Friendship and networking peak in the warm months" />
            <Body text={b.data.intro} className="mt-4" />
          </Reveal>
          <Reveal className="mt-8">
            <div className={STAGE}>
              <Shot img={b.data.chart} />
            </div>
          </Reveal>
        </section>

        {/* ─── DESIGN (ideation + site map + user flow) ─── */}
        <section id="design" className={GAP}>
          <SectionHead label="Design" title="From Interest Cards to a publish-and-discover flow." />

          {/* Ideation */}
          <Reveal className="mt-12">
            <SubHead label="Ideation" title="Context-rich, low-friction posts" />
            <Body text={b.ideation.intro} className="mt-4" />
          </Reveal>
          <Reveal className="mt-8">
            <div className={STAGE}>
              <Shot img={b.ideation.img} />
            </div>
          </Reveal>

          {/* Site map */}
          <Reveal className="mt-16">
            <SubHead label="Site map" title="Layered into Bumble’s existing IA" />
            <Body text={b.siteMap.intro} className="mt-4" />
          </Reveal>
          <Reveal className="mt-8">
            <div className={STAGE}>
              <Shot img={b.siteMap.img} />
            </div>
          </Reveal>

          {/* User flow */}
          <Reveal className="mt-16">
            <SubHead label="User flow" title="Initiator and receiver paths" />
            <Body text={b.userFlow.intro} className="mt-4" />
          </Reveal>
          <Reveal className="mt-8">
            <div className={`${STAGE} space-y-10`}>
              <div>
                <MiniLabel accent>{b.userFlow.initiator.caption}</MiniLabel>
                <div className="mt-3">
                  <Shot img={{ ...b.userFlow.initiator, caption: undefined }} />
                </div>
              </div>
              <div>
                <MiniLabel accent>{b.userFlow.receiver.caption}</MiniLabel>
                <div className="mt-3">
                  <Shot img={{ ...b.userFlow.receiver, caption: undefined }} />
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ─── CORE INTERACTIONS ─── */}
        <section id="interactions" className={GAP}>
          <SectionHead label="Interactions" title={b.coreInteractions.title} />
          <Reveal className="mt-12">
            <Body text={b.coreInteractions.intro} />
          </Reveal>
          <Reveal className="mt-8">
            <div className={STAGE}>
              <Shot img={b.coreInteractions.img} />
            </div>
          </Reveal>
          <Reveal className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {b.coreInteractions.points.map((p) => (
                <div key={p.title} className="rounded-2xl border border-border p-5">
                  <h4 className="text-[15px] font-normal tracking-tight">{p.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ─── CROSS-PLATFORM ─── */}
        <section id="cross-platform" className={GAP}>
          <SectionHead label="Cross-platform" title="One experience, tuned to each platform." />
          <Reveal className="mt-12">
            <Body text={b.crossPlatform.intro} />
          </Reveal>

          {/* Android & iPhone */}
          <Reveal className="mt-16">
            <SubHead label={b.crossPlatform.androidIphone.title} title="Same flow, native details" />
            <Body text={b.crossPlatform.androidIphone.body} className="mt-4" />
          </Reveal>
          <Reveal className="mt-8">
            <div className={STAGE}>
              {/* wide annotated still + tall phone clip, sized to align top/bottom */}
              <div className="mx-auto grid max-w-[760px] items-start gap-8 sm:grid-cols-[1.565fr_1fr]">
                <Shot img={b.crossPlatform.androidIphone.img} />
                <div className="mx-auto w-full max-w-[280px] sm:max-w-none">
                  <ClipTile clip={b.crossPlatform.androidIphone.clip} />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Desktop */}
          <Reveal className="mt-16">
            <SubHead label={b.crossPlatform.desktop.title} title="One screen, more control" />
            <Body text={b.crossPlatform.desktop.body} className="mt-4" />
          </Reveal>
          <Reveal className="mt-8">
            <div className={STAGE}>
              <ClipTile clip={b.crossPlatform.desktop.clip} radius="1rem" />
            </div>
          </Reveal>
        </section>

        {/* ─── USER TESTING ─── */}
        <section id="testing" className={GAP}>
          <SectionHead label="Testing" title="30 users, under 20 seconds, 87% success." />
          <Reveal className="mt-12">
            <Body text={b.userTesting} />
          </Reveal>
        </section>

        {/* ─── TAKEAWAYS (reflection + next steps) ─── */}
        <section id="takeaways" className={GAP}>
          <SectionHead label="Takeaways" title="What this taught me." />
          <Reveal className="mt-12">
            <Body text={b.reflection} />
          </Reveal>
          <Reveal className="mt-16">
            <SubHead label="Next steps" title="Where this goes next" />
            <ol className="mt-5 space-y-3">
              {b.nextSteps.map((s, i) => (
                <li key={i} className="flex gap-3 text-base leading-[1.4] text-fg/90">
                  <span className="font-mono text-sm text-accent">{`0${i + 1}`}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>
      </div>
    </CaseShell>
  );
}
