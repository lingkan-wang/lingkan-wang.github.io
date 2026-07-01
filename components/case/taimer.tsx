import type { Project } from "@/lib/projects";
import { Reveal } from "@/components/reveal";
import { Figure } from "@/components/mdx/figure";
import { CaseToc, type TocItem } from "./case-toc";
import { CaseShell, SectionHead, SubHead, MiniLabel, Chip, GAP, STAGE } from "./scaffold";

const IMG = "/work/taimer-ai";
const BODY = "text-base leading-[1.4] text-fg/90"; // reference body: 16px

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
    <p className={`${BODY} ${className}`}>
      <MD text={text} />
    </p>
  );
}

/** A big value + label metric grid (market opportunity, impact). */
function StatGrid({ items, cols = "sm:grid-cols-3" }: { items: { value: string; label: string }[]; cols?: string }) {
  return (
    <dl className={`grid gap-x-8 gap-y-10 border-y border-border py-10 ${cols}`}>
      {items.map((s) => (
        <div key={s.label}>
          <div className="text-3xl font-normal tracking-tight text-accent sm:text-4xl">{s.value}</div>
          <p className="mt-3 text-sm leading-6 text-muted">{s.label}</p>
        </div>
      ))}
    </dl>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border p-5">
      <h4 className="text-base font-normal tracking-tight">{title}</h4>
      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
    </div>
  );
}

/** A screenshot on the shared gray stage, with the zoom-lightbox Figure. */
function StageFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <Reveal className="mt-10">
      <div className={STAGE}>
        <Figure src={src} alt={alt} caption={caption} zoom />
      </div>
    </Reveal>
  );
}

export function TaimerCaseStudy({ meta }: { meta: Project }) {
  const metaRows = [
    { label: "Role", value: meta.role },
    { label: "Team", value: `${meta.company} · team of 5` },
    { label: "Timeline", value: `${meta.timeline} · ${meta.year}` },
    { label: "Tools", value: meta.tools ?? "Figma" },
  ];

  const toc: TocItem[] = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "opportunity", label: "Opportunity" },
    { id: "product", label: "Product" },
    { id: "how", label: "How it works" },
    { id: "audience", label: "Audience" },
    { id: "business", label: "Business" },
    { id: "impact", label: "Impact" },
  ];

  const friction = [
    { title: "High communication cost", body: "Endless back-and-forth with homeowners drains time and energy." },
    { title: "Slow manual production", body: "Producing renders by hand is painstaking and hard to scale." },
    { title: "Low conversion", body: "Leads rarely turn into signed projects." },
    { title: "Blurry references", body: "Stock imagery is unclear and low quality." },
    { title: "No acquisition channels", body: "Designers lack reliable ways to reach new clients." },
    { title: "Lack of inspiration", body: "Fresh creative starting points are hard to find." },
  ];

  const productPillars = [
    { title: "Interior generation", body: "Upload a room, choose a type, then generate material styles, sketches, and floor plans — and expand, redraw, or annotate any region." },
    { title: "Creator tools", body: "Custom style models, a style plaza, a personal image library, and asset management." },
    { title: "Fine-tuning controls", body: "Image count, clarity, steps, learning rate, text intensity, sampler, seed, and copyright protection." },
  ];

  const tiers = [
    { name: "Basic", price: "¥59/mo", detail: "10 orders / month" },
    { name: "Standard", price: "¥399/mo", detail: "100 orders / month" },
    { name: "Pro", price: "¥1999/mo", detail: "400 orders / month" },
    { name: "Inventory listing", price: "¥699", detail: "Upload 10 SKUs · pay-per-usage" },
  ];

  const persona = {
    name: "Alex",
    meta: "33 · Changsha · Interior Designer",
    motivation: [
      "Serve more clients and finish projects faster",
      "Generate large volumes of low-cost drafts with AI",
      "Offer varied styles for different clients and markets",
    ],
    needs: [
      "Models that match the firm's house style",
      "Convenient fine-tuning tools",
      "Less manual back-and-forth with homeowners",
    ],
  };

  const stages = [
    "**Preprocess & label** the designer's reference images.",
    "**Prepare** the datasets and configure the run.",
    "**Train** on the fine-tuning stack.",
    "**Compare & select** from candidate results.",
    "**Tune weights** until the output matches the target style.",
  ];

  return (
    <CaseShell toc={<CaseToc items={toc} eyebrow="Case Study" title="Taimer.ai" />}>
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
            {metaRows.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[0.8rem] uppercase tracking-[0.06em] text-muted">{m.label}</dt>
                <dd className="mt-1.5 text-sm leading-6 text-fg/90">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </header>

      {/* ───────────── SECTIONS ───────────── */}
      <div className="mt-24 space-y-28 sm:mt-32 sm:space-y-40">
        {/* ─── OVERVIEW ─── */}
        <section id="overview" className={GAP}>
          <SectionHead label="Overview" title="A brief to client-ready renders, in minutes not weeks." />
          <Reveal className="mt-12">
            <P text="China's home-interior industry runs on slow, manual work: long back-and-forth with homeowners, renders drawn by hand, and lead-to-deal conversion that rarely pays back the cost of acquiring the lead. Taimer.ai set out to collapse that loop." />
            <P
              text="Over seven months, working with a team of five (a PM, me, a marketer, and two engineers), I designed a multi-modal AIGC platform — text-to-image, image-to-image, recognition, and 3D — that lets a designer fine-tune a model to their own house style, then generate client-ready interior renders in minutes. The work won the Outstanding Project award at the Tsinghua University AIGC Application Innovation Challenge and drew investment from Beijing institutions and angel backers."
              className="mt-5"
            />
          </Reveal>
          <StageFigure
            src={`${IMG}/cover-app.png`}
            alt="The Taimer.ai workspace — a sidebar of creation and training tools, a grid of generated interior renders, and a right-hand panel of style and generation controls"
            caption="The workspace — custom style models, an image library, and generation controls in one place."
          />
        </section>

        {/* ─── PROBLEM ─── */}
        <section id="problem" className={GAP}>
          <SectionHead label="The problem" title="A stack of small frictions, plus four structural barriers." />
          <Reveal className="mt-12">
            <P text="I started by mapping where designers and homeowners actually lose time. The friction wasn't one big thing; it was a stack of small ones." />
          </Reveal>
          <Reveal className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {friction.map((f) => (
                <Card key={f.title} title={f.title} body={f.body} />
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-8">
            <P text="On top of the day-to-day friction sit four structural barriers: the expertise the work demands, the difficulty of guaranteeing detail quality, cross-disciplinary tech that's gated abroad, and a delivery experience that keeps cost and timelines high." />
          </Reveal>
        </section>

        {/* ─── MARKET OPPORTUNITY ─── */}
        <section id="opportunity" className={GAP}>
          <SectionHead label="Market opportunity" title="The upside of removing that friction is large." />
          <Reveal className="mt-12">
            <P text="Removing the friction pays off for the people doing the work and for the market around it." />
          </Reveal>
          <Reveal className="mt-8">
            <StatGrid
              items={[
                { value: "1wk → 1h", label: "Revision turnaround" },
                { value: "+45%", label: "Design-to-deal conversion" },
                { value: "1 min", label: "Brief → first proposal" },
                { value: "$500B", label: "N. American market" },
                { value: "9.5M+", label: "Designers in China" },
                { value: "20,000+", label: "Beta renovation users" },
              ]}
            />
          </Reveal>
        </section>

        {/* ─── THE PRODUCT ─── */}
        <section id="product" className={GAP}>
          <SectionHead label="The product" title="A generation surface designers actually control." />
          <Reveal className="mt-12">
            <P text="Taimer is a community-plus-creation platform. The core is a generation surface designers actually control, wrapped in tools that make a personal model worth building." />
          </Reveal>
          <Reveal className="mt-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {productPillars.map((p) => (
                <Card key={p.title} title={p.title} body={p.body} />
              ))}
            </div>
          </Reveal>
          <StageFigure
            src={`${IMG}/renders.png`}
            alt="A horizontal strip of six AI-generated interiors — bedrooms in varied styles and a set of bar stools"
            caption="Sample interiors generated through the platform."
          />
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section id="how" className={GAP}>
          <SectionHead label="How it works" title="Fine-tuning is the feature — a designer’s style, not a generic one." />
          <Reveal className="mt-12">
            <P text="Under the surface, Taimer runs a proprietary deep-learning fine-tuning solution built on ControlNet and diffusion models, with multi-modal support and compute backed by AWS and NVIDIA. The point of the fine-tuning layer is control: a designer's model should reproduce *their* style, not a generic one." />
          </Reveal>
          <StageFigure
            src={`${IMG}/architecture.png`}
            alt="Diagram of the Stable Diffusion and ControlNet-LITE pipeline, from input conditioning through the model to a generated interior render"
            caption="The Stable Diffusion + ControlNet-LITE pipeline, from input conditioning to output."
          />
          <Reveal className="mt-16">
            <SubHead label="Model training" title="Five stages to a style model" />
            <ol className="mt-5 space-y-3">
              {stages.map((s, i) => (
                <li key={i} className="flex gap-3 text-base leading-[1.4] text-fg/90">
                  <span className="font-mono text-sm text-accent">{`0${i + 1}`}</span>
                  <span>
                    <MD text={s} />
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
          <StageFigure
            src={`${IMG}/training.png`}
            alt="Screenshots of the model-training process — data preprocessing and labeling, a training run in progress, and a grid for comparing and selecting results"
            caption="Data preprocessing, training, and result selection."
          />
        </section>

        {/* ─── WHO IT'S FOR ─── */}
        <section id="audience" className={GAP}>
          <SectionHead label="Who it’s for" title="Built for independent designers and small studios." />
          <Reveal className="mt-12">
            <P text="The design centered on independent designers and small studios — people who need volume and consistency without a render farm." />
          </Reveal>
          <Reveal className="mt-8">
            <div className="rounded-2xl border border-border p-6 sm:p-7">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-normal tracking-tight">{persona.name}</h3>
                <span className="text-sm text-muted">{persona.meta}</span>
              </div>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <div>
                  <MiniLabel accent>Motivation</MiniLabel>
                  <ul className="mt-3 space-y-2">
                    {persona.motivation.map((m) => (
                      <li key={m} className="flex gap-2.5 text-sm leading-6 text-fg/90">
                        <span className="mt-[9px] size-1 shrink-0 rounded-full bg-accent" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <MiniLabel accent>Needs</MiniLabel>
                  <ul className="mt-3 space-y-2">
                    {persona.needs.map((n) => (
                      <li key={n} className="flex gap-2.5 text-sm leading-6 text-fg/90">
                        <span className="mt-[9px] size-1 shrink-0 rounded-full bg-accent" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ─── BUSINESS MODEL ─── */}
        <section id="business" className={GAP}>
          <SectionHead label="Business model" title="Designers subscribe; product brands pay per usage." />
          <Reveal className="mt-12">
            <P text="The tiers map to how many drafts a studio actually ships in a month." />
          </Reveal>
          <Reveal className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {tiers.map((t) => (
                <div key={t.name} className="rounded-2xl border border-border p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="text-base font-normal tracking-tight">{t.name}</h4>
                    <span className="font-mono text-sm text-accent">{t.price}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted">{t.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-8">
            <P text="Behind the subscription, a designer requests a customized model, a training expert builds and tracks it, candidate outputs are reviewed together, and the result is delivered — with evaluation and after-sales support if it isn't right the first time." />
          </Reveal>
        </section>

        {/* ─── IMPACT ─── */}
        <section id="impact" className={GAP}>
          <SectionHead label="Impact" title="From a week to an hour, and +45% conversion." />
          <Reveal className="mt-12">
            <StatGrid
              items={[
                { value: "1wk → 1h", label: "Revision turnaround, down from a week to an hour" },
                { value: "+45%", label: "Lift in design-to-deal conversion" },
                { value: "20,000+", label: "Renovation users reached in beta" },
              ]}
            />
          </Reveal>
          <Reveal className="mt-10">
            <P text="Beyond the numbers, Taimer opened a new income stream for independent designers and gave consumers a one-minute path from brief to first proposal. The lesson that stuck with me: in an AIGC tool, *control* is the feature — the fine-tuning that makes a model feel like the designer's own is exactly what makes the output worth paying for." />
          </Reveal>
        </section>
      </div>
    </CaseShell>
  );
}
