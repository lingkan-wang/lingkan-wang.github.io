import type { Project } from "@/lib/projects";
import { Reveal } from "@/components/reveal";
import { Figure } from "@/components/mdx/figure";
import { CaseToc, type TocItem } from "./case-toc";
import { CaseShell, SectionHead, SubHead, MiniLabel, Chip, GAP } from "./scaffold";
import { NumberedCard } from "./elements";
import { ProcessFlow } from "./process-flow";
import { SolutionCarousel } from "./solution-carousel";
import { DesignerHandoff, type HandoffItem } from "./designer-handoff";
import { EfficiencyChart } from "./efficiency-chart";
import { ReportCaveat } from "./report-dialog";

const IMG = "/work/masii";
const BODY = "text-base leading-[1.5] text-fg/90";

/** Render **bold** and *emphasis* asterisk spans as medium-weight (no italic). */
function MD({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**"))
          return <strong key={i} className="font-medium text-fg">{p.slice(2, -2)}</strong>;
        if (p.startsWith("*") && p.endsWith("*"))
          return <em key={i} className="font-medium not-italic text-fg">{p.slice(1, -1)}</em>;
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

function P({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={`${BODY} text-pretty ${className}`}>
      <MD text={text} />
    </p>
  );
}

function StatGrid({ items, cols = "sm:grid-cols-3" }: { items: { value: string; label: string }[]; cols?: string }) {
  return (
    <dl className={`grid grid-cols-2 gap-x-8 gap-y-10 border-y border-border py-10 ${cols}`}>
      {items.map((s) => (
        <div key={s.label}>
          <div className="text-3xl font-normal tracking-tight tabular-nums text-accent sm:text-4xl">{s.value}</div>
          <p className="mt-3 text-sm leading-6 text-muted">{s.label}</p>
        </div>
      ))}
    </dl>
  );
}

/** An attributed pull-quote from the brief. */
function BriefQuote({ quote, cite }: { quote: string; cite: string }) {
  return (
    <Reveal className="mt-8">
      <figure className="border-l-2 border-accent/50 pl-6">
        <blockquote className="text-pretty text-xl font-normal leading-[1.35] tracking-tight text-fg sm:text-2xl">
          “{quote}”
        </blockquote>
        <figcaption className="mt-3 font-mono text-[0.8rem] uppercase tracking-[0.06em] text-muted">{cite}</figcaption>
      </figure>
    </Reveal>
  );
}

/** A decision card: the call, and what it cost. */
function DecisionCard({ n, title, body, tradeoff }: { n: string; title: string; body: string; tradeoff: string }) {
  return (
    <div className="rounded-2xl border border-border p-5 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-fg/20">
      <span className="font-mono text-xs text-accent">{n}</span>
      <h3 className="mt-2 text-base font-normal tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
      <p className="mt-3 border-t border-border pt-3 text-sm leading-6 text-muted">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.06em] text-fg/50">Tradeoff</span> {tradeoff}
      </p>
    </div>
  );
}

/** A labelled metric list: mono label + one-line definition. */
function MetricList({ items }: { items: { label: string; body: string }[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      {items.map((m) => (
        <div
          key={m.label}
          className="grid gap-1 border-b border-border p-4 text-sm leading-6 last:border-0 sm:grid-cols-[9rem_1fr] sm:gap-6"
        >
          <div className="font-mono text-[0.72rem] uppercase tracking-[0.06em] text-accent sm:pt-0.5">{m.label}</div>
          <div className="text-fg/80">{m.body}</div>
        </div>
      ))}
    </div>
  );
}

/** Closing reflections as a simple bulleted list. */
function Reflections({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-5">
      {items.map((text) => (
        <li key={text} className="flex gap-4">
          <span className="mt-[0.5rem] size-1.5 shrink-0 rounded-full bg-fg/40" aria-hidden />
          <span className="text-pretty text-base leading-[1.5] text-fg/90">{text}</span>
        </li>
      ))}
    </ul>
  );
}

/** Big editorial pull-line in the author's voice. */
function Thesis({ children }: { children: string }) {
  return (
    <Reveal className="mt-16">
      <p className="text-pretty text-[1.6rem] font-normal leading-[1.3] tracking-tight text-accent sm:text-[1.95rem]">
        {children}
      </p>
    </Reveal>
  );
}

export function MasiiCaseStudy({ meta }: { meta: Project }) {
  const metaRows: { label: string; value: string | string[] }[] = [
    { label: "Role", value: meta.role },
    { label: "Skills", value: ["Design System", "Prototyping", "Product Thinking", "AI Workflow"] },
    { label: "Timeline", value: `${meta.timeline} · ${meta.year}` },
    { label: "Tools", value: ["Claude Code", "Figma", "Midjourney"] },
  ];

  const toc: TocItem[] = [
    { id: "overview", label: "Overview" },
    { id: "background", label: "Problem" },
    { id: "solution", label: "Solution" },
    { id: "principles", label: "Principles" },
    { id: "process", label: "Process" },
    { id: "decisions", label: "Decisions" },
    { id: "shipped", label: "Shipped" },
    { id: "metrics", label: "Metrics" },
    { id: "outcome", label: "Outcome" },
  ];

  const traps = [
    { key: "guilt", n: "Charity apps", title: "Guilt", body: "They lead with need and dollar amounts. Giving starts to feel like a bill you forgot to pay." },
    { key: "gambling", n: "Prize apps", title: "Gambling", body: "They show odds, entries, and near-misses. Giving starts to feel like a bet." },
    { key: "flexing", n: "Social apps", title: "Flexing", body: "They rank donors by dollars. Giving turns into a status game about money." },
  ];

  const solutionSlides = [
    { key: "home", n: "01", label: "Home is a command center", desc: "Status, Today's Move, today's prize, yesterday's winner, and GoodPrint, all readable in three seconds.", src: `${IMG}/home-hifi-top.png`, alt: "The Masii Home dashboard" },
    { key: "move", n: "02", label: "Today's Move earns MAS", desc: "Daily Moves like check-in, Daily Goodness, and Assist each pay out MAS. No donation prompt.", src: `${IMG}/moves.png`, alt: "The Moves screen with daily moves that each earn MAS" },
    { key: "goodprint", n: "03", label: "GoodPrint grows", desc: "A growing GoodPrint with a cause breakdown, shown as collective and alive, never reduced to a ledger.", src: `${IMG}/goodprint.png`, alt: "The GoodPrint tab with a growth chart and cause breakdown" },
    { key: "badges", n: "04", label: "Badges you collect", desc: "Every Move and milestone earns a collectible badge. Status you can see, without a money leaderboard.", src: `${IMG}/badges-tab.png`, alt: "The Badges tab with earned and locked collectible badges" },
    { key: "rewards", n: "05", label: "Rewards come with proof", desc: "Real prizes, real winners, Receipts and Replay. No odds, no losses.", src: `${IMG}/todays-prize.png`, alt: "A closed prize with a verified winner and claim record" },
    { key: "drops", n: "06", label: "Drops feel like a release", desc: "One cause, one story, one prize, one winner. Closer to a sneaker drop than a raffle.", src: `${IMG}/feed-video.png`, alt: "A Feed drop" },
  ];

  const decisions = [
    {
      n: "01",
      title: "Two currencies, on purpose",
      body: "MAS is the fuel you earn; GoodPrint is the impact you grow. Splitting them stops money from becoming the score.",
      tradeoff: "Two currencies to teach instead of one.",
    },
    {
      n: "02",
      title: "Collective impact, never dollars",
      body: 'Impact reads "you helped feed 100,000 people," never "your $5 bought X." One line kills guilt and the money-flex at once.',
      tradeoff: "You lose the concreteness of a personal, dollar-for-dollar receipt.",
    },
    {
      n: "03",
      title: "Rewards without the casino",
      body: "Show today's prize, the winner, and the proof. Never odds, entries, or a loss. Membership auto-enters, so nothing feels like a bet.",
      tradeoff: "Less urgency than countdowns and near-misses would manufacture.",
    },
    {
      n: "04",
      title: "Momentum without pressure",
      body: "The Run, our streak, survives on any Move, never on spending. It pulls people back tomorrow without guilt or pay-to-win.",
      tradeoff: "No paid streak-saves, a monetization lever left on the table.",
    },
    {
      n: "05",
      title: "Private by default",
      body: "No public profiles, comments, or donor rankings. The energy is social; the mechanics are not.",
      tradeoff: "Gives up the cheapest growth loop, but kept V1 small enough to ship.",
    },
  ];

  const metrics = [
    { label: "North star", body: "Weekly active givers who complete a Move: habit, not a one-time donation." },
    { label: "Activation", body: "Share of new members who make their first Move on day one." },
    { label: "Retention", body: "D7 / D30 Run continuation, the real test of whether giving became a habit." },
    { label: "Trust", body: "Winner-proof view rate, and conversion lift after someone sees a Receipt." },
    { label: "Guardrail", body: "Membership conversion without the guilt or casino signals we designed out." },
  ];

  const reflections = [
    "Test the three-second home screen with real users before building the full system, not after.",
    "Validate GoodPrint's real data source early: collective impact only lands if the number is true, not decorative.",
    "Design one non-social growth loop sooner: private-by-default kept V1 clean but left acquisition thin.",
  ];

  const sourceTree = {
    name: "masii-product",
    children: [
      { name: "design", children: [{ name: "tokens.md" }, { name: "components.md" }, { name: "interaction-patterns.md" }, { name: "accessibility.md" }] },
      { name: "docs", children: [{ name: "prd.md" }, { name: "ux-principles.md" }] },
      {
        name: "skills",
        children: [
          { name: "prd-to-ui", children: [{ name: "SKILL.md" }] },
          { name: "design-system-audit", children: [{ name: "SKILL.md" }] },
          { name: "ux-review", children: [{ name: "SKILL.md" }] },
        ],
      },
    ],
  };

  const processSteps = [
    { key: "prd", label: "PRD", title: "Requirements & PRD", detail: "The source of truth: a bilingual PRD, a UX Bible, design tokens, and a set of working skills. Every rule here maps to a screen and a state, before a single pixel. Click a folder to open it.", tree: sourceTree },
    { key: "ia", label: "IA", title: "Information architecture", detail: "A full sitemap plus a per-tab breakdown: five tabs and every screen under them, so the shape of the product was settled first. Click an image to open it full size.", srcs: [`${IMG}/ia.png`, `${IMG}/ia-tabs.png`], alt: "FigJam sitemap and per-tab breakdown of the five tabs" },
    { key: "workflow", label: "Workflow", title: "User flows", detail: "The V1 user flow: the daily-return loop, the first-run onboarding branch, and where Moves earn MAS. Click to open it full size.", src: `${IMG}/workflow.png`, alt: "The V1 user flow with the onboarding branch" },
    { key: "lofi", label: "Lo-fi", title: "Low-fidelity", detail: "Six modules of wireframes, plus every empty and edge state, so structure and copy could be argued before style could distract.", src: `${IMG}/lofi-board.png`, alt: "A board of all the low-fidelity wireframes across six modules" },
    { key: "review", label: "Review", title: "Review the lo-fi", detail: "Claude Code played reviewer and audited the low-fidelity screens against the brief; I checked the information architecture by hand to make sure every flow still held.", src: `${IMG}/review.png`, alt: "Two review passes: Claude audits the lo-fi screens, then I verify the information architecture by hand" },
    { key: "style", label: "Style", title: "Define the visual style", detail: "I hand-designed a few hi-fi screens to lock the dark Liquid Glass language, the reference every other screen would follow.", src: `${IMG}/style-ref.png`, alt: "Hand-designed reference hi-fi screens that set the style" },
    { key: "hifi", label: "Hi-fi", title: "High-fidelity", detail: "With the style set, roughly 150 hi-fi screens across six modules, generated to match and wired into a clickable prototype.", src: `${IMG}/hifi-board.png`, alt: "A board of all the high-fidelity screens across six modules" },
    { key: "polish", label: "Visual polish", title: "Manual polish", detail: "The final pass: hand-tuning hi-fi details across the whole product, the human touch on top of the generated screens.", src: `${IMG}/canvas-overview.png`, alt: "The full Figma canvas with every module's screens laid out" },
  ];

  const mappings = [
    { a: "Charity apps lead with guilt, need, and dollar amounts.", b: "GoodPrint counts collective outcomes like meals funded, never your $5." },
    { a: "Prize apps feel like gambling: odds, entries, and near-misses.", b: "No odds and no losses; membership auto-enters; every win shows a Receipt." },
    { a: "Social giving ranks donors by money.", b: "Private by default; collectible badges show status instead of dollars." },
    { a: "People forget to give, or it starts to feel like a chore.", b: "One small daily Move and the Run bring people back, without pressure." },
  ];

  const principles = [
    { title: "Make the next action obvious", body: "One dominant, consistently placed primary action per screen. No hunting for what to do." },
    { title: "One job per screen", body: "Each screen carries a single main task; multi-step flows use progressive disclosure." },
    { title: "Reduce anxiety", body: "Clear status, confirmation, and reversible actions, especially anywhere near money or prizes." },
    { title: "Plain language over jargon", body: "Understandable words beat internal product terminology, every time." },
    { title: "Design every state", body: "Empty, loading, error, and success are designed up front, not bolted on later." },
    { title: "Glow with restraint", body: "Localized reflected light behind prizes, CTAs, and chart moments, never a full-page gradient." },
  ];

  const handoffItems: HandoffItem[] = [
    { key: "pages", label: "Page groups", title: "Split by module and fidelity", desc: "Lo-fi and hi-fi sections mirror each other across Home, Draws, Feed, Shop, Profile, and onboarding, with separate pages for components and tokens.", src: `${IMG}/page-groups.png`, alt: "The Figma file organized by module: five sections mirrored across lo-fi and hi-fi" },
    { key: "library", label: "Component library", title: "~11 components on one token system", desc: "Foundations (color, type, glass effects) and about eleven core components with variants and properties, on a single consistent icon set, all bound to shared tokens so every screen is built from the same parts.", src: `${IMG}/component-library.png`, alt: "The Masii component library: foundations, icon set, and components on one board" },
    { key: "prototype", label: "Prototype flows", title: "Wired into a clickable prototype", desc: "Hundreds of connections link the screens and their edge states, so the file opens as a working prototype, not a static board.", src: `${IMG}/prototype-flows.png`, alt: "The prototype view: flow starting points and hundreds of connections between screens" },  ];

  return (
    <CaseShell toc={<CaseToc items={toc} eyebrow="Case Study" title="Masii" />}>
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
          <h1 className="mt-6 text-pretty text-[1.95rem] font-normal leading-[1.1] tracking-tight sm:text-[2.5rem]">{meta.title}</h1>
          <p className="mt-6 text-lg leading-8 text-muted">{meta.summary}</p>
        </Reveal>
        <Figure
          src={`${IMG}/hero.png`}
          alt="A grid of Masii hi-fi screens in the shipped dark Liquid Glass style"
          zoom
        />
        <Reveal className="mt-10 border-t border-border pt-8">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4">
            {metaRows.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[0.8rem] uppercase tracking-[0.06em] text-muted">{m.label}</dt>
                <dd className="mt-1.5 space-y-0.5 text-sm leading-6 text-fg/90">
                  {Array.isArray(m.value) ? m.value.map((v) => <div key={v}>{v}</div>) : m.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </header>

      {/* ───────────── SECTIONS ───────────── */}
      <div className="mt-24 space-y-28 sm:mt-32 sm:space-y-40">
        {/* ─── OVERVIEW ─── */}
        <section id="overview" className={GAP}>
          <SectionHead label="Overview" title="A giving app that feels like none of them." />
          <Reveal className="mt-12 space-y-5">
            <P text="MASii is a mobile giving app for people who find charity apps boring and prize apps sketchy. The loop is simple: make a small daily Move, earn points called MAS, and grow your GoodPrint, a live picture of the good you are part of." />
            <P text="The giving model was already set. Members give through a monthly membership, so the money question was solved before the app even opened. The open question was tone. How do you make giving feel exciting enough to do every single day?" />
            <P text="It came down to one observation. People do not skip giving because they do not care. They skip it because every app makes it feel like a chore, a bet, or a brag. Charity apps sell guilt. Prize apps feel like gambling. Social apps turn giving into a flex. My job was to build the one version that feels like *none of them*." />
          </Reveal>
          <Reveal className="mt-12">
            <StatGrid
              cols="sm:grid-cols-4"
              items={[
                { value: "150+", label: "Screens designed and prototyped" },
                { value: "5", label: "Product tabs, plus onboarding" },
                { value: "3", label: "Traps to avoid: guilt, gambling, flexing" },
                { value: "0", label: "Odds or losses ever shown to a user" },
              ]}
            />
          </Reveal>
        </section>

        {/* ─── BACKGROUND ─── */}
        <section id="background" className={GAP}>
          <SectionHead label="The problem" title="Where today's giving apps lose people." />
          <Reveal className="mt-12">
            <P text="Before designing anything, I looked at what already exists. Across the market, every category of giving app pushes people away the same way: it makes giving feel like something you would rather skip." />
          </Reveal>
          <Reveal className="mt-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {traps.map((t) => (
                <NumberedCard key={t.key} n={t.n} title={t.title} body={t.body} />
              ))}
            </div>
          </Reveal>
          <BriefQuote
            quote="The app must feel exciting and alive, but never drift into guilt-based charity or casino-like gambling."
            cite="MASii product brief"
          />
        </section>

        {/* ─── SOLUTION (problem → answer + preview) ─── */}
        <section id="solution" className={GAP}>
          <SectionHead label="Solution" title="Every trap got a specific answer." />
          <Reveal className="mt-12">
            <P text="I turned each trap into a design rule, then built and checked every screen against it." />
          </Reveal>
          <Reveal className="mt-8">
            <div className="overflow-hidden rounded-2xl border border-border">
              <div className="grid grid-cols-2 border-b border-border bg-fg/[0.02] font-mono text-[0.72rem] uppercase tracking-[0.06em] text-muted">
                <div className="p-4">What&rsquo;s broken out there</div>
                <div className="p-4 text-accent">Masii&rsquo;s answer</div>
              </div>
              {mappings.map((m) => (
                <div key={m.a} className="grid grid-cols-2 border-b border-border text-sm leading-6 last:border-0">
                  <div className="p-4 text-fg/60">{m.a}</div>
                  <div className="p-4 text-fg">{m.b}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-16">
            <SubHead label="In the product" title="One small action, three payoffs, no donation ask." />
            <P text="MASii turns one small daily action into a reward, a growing impact score, and a shot at real prizes, with no donation ask on the home screen." className="mt-5" />
          </Reveal>
          <SolutionCarousel slides={solutionSlides} />
        </section>

        {/* ─── UX PRINCIPLES ─── */}
        <section id="principles" className={GAP}>
          <SectionHead label="Product → UX" title="The rules every screen had to pass." />
          <Reveal className="mt-12">
            <P text="A short set of principles kept 150 screens coherent: a rubric for the AI to generate against, and a rubric for me to reject against." />
          </Reveal>
          <Reveal className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {principles.map((p, i) => (
                <NumberedCard key={p.title} n={String(i + 1).padStart(2, "0")} title={p.title} body={p.body} />
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-8">
            <div className="rounded-2xl border border-border bg-fg/[0.02] p-5 sm:p-6">
              <MiniLabel accent>The 3-second test</MiniLabel>
              <P text="Before any screen shipped: is the next step obvious within three seconds? Is there one dominant action? Does it hold up in empty, loading, error, and success states?" className="mt-3" />
            </div>
          </Reveal>
        </section>

        {/* ─── PROCESS ─── */}
        <section id="process" className={GAP}>
          <SectionHead label="Process" title="No users yet, so the product was the research." />
          <Reveal className="mt-12 space-y-5">
            <P text="There was no user base yet, so the research was the product itself. I read the PRD and the UX Bible, mapped every rule to a screen, and pressure-tested each design against the three traps before adding any polish." />
            <P text="Here is the whole pipeline, end to end. Hover or tap any step to see what happened there." />
          </Reveal>
          <ProcessFlow steps={processSteps} source={{ href: "https://x.com/WangLingkan/status/2076001006836732255", label: "See the full process on X" }} />
        </section>

        {/* ─── DECISIONS & TRADEOFFS ─── */}
        <section id="decisions" className={GAP}>
          <SectionHead label="Decisions & tradeoffs" title="Five calls, and what each one cost." />
          <Reveal className="mt-12">
            <div className="grid gap-4 sm:grid-cols-2">
              {decisions.map((d) => (
                <DecisionCard key={d.n} n={d.n} title={d.title} body={d.body} tradeoff={d.tradeoff} />
              ))}
            </div>
          </Reveal>
        </section>

        {/* ─── WHAT SHIPPED ─── */}
        <section id="shipped" className={GAP}>
          <SectionHead label="What shipped" title="A complete V1, ready to hand off." />
          <Reveal className="mt-12">
            <P text="A five-tab information architecture, six end-to-end flows, and roughly 150 hi-fi screens with every empty, loading, and error state, built on an ~11-component design system and wired into a clickable prototype another designer can pick up cold." />
          </Reveal>
          <Reveal className="mt-6">
            <DesignerHandoff items={handoffItems} />
          </Reveal>
        </section>

        {/* ─── SUCCESS METRICS ─── */}
        <section id="metrics" className={GAP}>
          <SectionHead label="Success metrics" title="What I'd hold it to." />
          <Reveal className="mt-12">
            <P text="There were no users at launch, so the job was to define what winning means, not to report it. These are the metrics I'd measure the loop against." />
          </Reveal>
          <Reveal className="mt-8">
            <MetricList items={metrics} />
          </Reveal>
        </section>

        {/* ─── OUTCOME ─── */}
        <section id="outcome" className={GAP}>
          <SectionHead label="Outcome" title="Roughly four times faster than a manual build." />
          <Reveal className="mt-12">
            <P text="The workflow itself is the outcome. Reconstructed from the session logs, the AI-assisted pipeline took 111.5 active hours. My estimate for the same deliverables built by hand in Figma, as a senior designer, is around 440 hours: about four times the work, or an eleven-week build delivered in 17.5 days." />
          </Reveal>
          <Reveal className="mt-8">
            <EfficiencyChart />
          </Reveal>
          <Reveal className="mt-4">
            <ReportCaveat />
          </Reveal>

          <Reveal className="mt-16">
            <MiniLabel>What I&rsquo;d do differently</MiniLabel>
            <Reflections items={reflections} />
          </Reveal>
          <Thesis>The test was never how much someone gave. It was whether they came back the next day.</Thesis>
        </section>
      </div>
    </CaseShell>
  );
}
