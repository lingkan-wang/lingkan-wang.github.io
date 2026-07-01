import type { Project } from "@/lib/projects";
import { Reveal } from "@/components/reveal";
import { Figure } from "@/components/mdx/figure";
import { CaseToc, type TocItem } from "./case-toc";
import { CaseShell, SectionHead, SubHead, MiniLabel, Bullet, Chip, GAP, STAGE } from "./scaffold";

const IMG = "/work/kwai-guild-dashboard";
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

/** A big weight-400 statement line between beats. */
function Line({ text, accent = false }: { text: string; accent?: boolean }) {
  return (
    <p className={`text-balance text-[1.5rem] font-normal leading-[1.3] tracking-tight sm:text-[1.9rem] ${accent ? "text-accent" : "text-fg"}`}>
      {text}
    </p>
  );
}

/** Numbered strategy / theme card. */
function PillarCard({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border p-5">
      <span className="font-mono text-xs text-accent">{String(n).padStart(2, "0")}</span>
      <h4 className="mt-2 text-base font-normal tracking-tight">{title}</h4>
      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
    </div>
  );
}

/** A solution view — sub-heading, body, and its screenshot on a gray stage. */
function SolutionView({ label, title, body, src, alt, caption }: { label: string; title: string; body: string[]; src: string; alt: string; caption: string }) {
  return (
    <>
      <Reveal className="mt-16">
        <SubHead label={label} title={title} />
        {body.map((t, i) => (
          <P key={i} text={t} className={i === 0 ? "mt-4" : "mt-3"} />
        ))}
      </Reveal>
      <Reveal className="mt-8">
        <div className={STAGE}>
          <Figure src={src} alt={alt} caption={caption} zoom />
        </div>
      </Reveal>
    </>
  );
}

export function KwaiCaseStudy({ meta }: { meta: Project }) {
  const metaRows = [
    { label: "Role", value: meta.role },
    { label: "Team", value: meta.company },
    { label: "Timeline", value: `${meta.timeline} · ${meta.year}` },
    { label: "Tools", value: meta.tools ?? "Figma" },
  ];

  const toc: TocItem[] = [
    { id: "overview", label: "Overview" },
    { id: "research", label: "Research" },
    { id: "opportunities", label: "Opportunities" },
    { id: "strategies", label: "Strategies" },
    { id: "solution", label: "Solution" },
    { id: "impact", label: "Impact" },
    { id: "reflection", label: "Reflection" },
  ];

  const opportunities = [
    { finding: "Timely insight was missing; tooling was fragmented and reactive.", pain: "Low visibility into performance and a slow response to churn.", opportunity: "Surface key streamer metrics earlier, and make risk alerts something you can act on." },
    { finding: "Managers juggled multiple scattered tools to monitor one guild.", pain: "High cognitive load and constant workflow friction.", opportunity: "Pull fragmented tools into one centralized, structured dashboard." },
    { finding: "Growth was hard to track; tier standards were unclear.", pain: "No clear sense of where a guild stood or who to invest in.", opportunity: "Visualize guild-tier progression and make strategic growth legible." },
    { finding: "The homepage and detail pages lacked structure.", pain: "Information overload and low engagement.", opportunity: "Redesign the information architecture to cut reading load and lead with what matters." },
  ];

  const strategies = [
    { title: "Guild overview metrics", body: "Daily, weekly, and monthly trends, visualized clearly so managers spot growth or decline early and act on it." },
    { title: "Tier classification", body: "Transparency and tier-progression cues, so managers can prioritize higher-value streamers and time promotions." },
    { title: "Churn-risk alerts", body: "A predictive alert built on activity drops and income decline, so at-risk streamers get attention before they leave." },
    { title: "Top-performer highlights", body: "Surface outperformers by income and growth, benchmark them against guild averages, and replicate what works." },
  ];

  const quotes = [
    { cite: "Mr. Li · Guild manager", body: "The new dashboard saves me so much time. I can see instantly who's improving, who's slipping, and where to focus — and the churn alerts let me act early instead of after it's too late." },
    { cite: "Mrs. Xia · Guild manager", body: "Tracking at-risk streamers and surfacing top performers has helped me retain talent and motivate the team. I finally have real data to guide the conversation." },
    { cite: "Mrs. Guo · Guild manager", body: "Before this, we pieced everything together by hand. Now revenue, live hours, tiers, and trends sit in one place — and I feel far more confident planning promotions." },
  ];

  return (
    <CaseShell toc={<CaseToc items={toc} eyebrow="Case Study" title="Guild Dashboard" />}>
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
          <SectionHead label="Overview" title="Guild managers ran rosters worth millions on gut feel." />
          <Reveal className="mt-12">
            <P text="Kuaishou (Kwai) is a leading short-video and livestreaming platform with over 600 million monthly active users. Its livestreaming business runs on **guilds** — agencies that recruit streamers, coach them, and earn a commission on what their streamers make. **Voyager** is Kuaishou's internal platform for those agencies and creators." />
            <P
              text="I designed a **weekly reporting and churn-alert dashboard** inside Voyager for guild managers on PC. It reorganizes the metrics that matter, surfaces at-risk streamers from revenue trends *before* they churn, and turns a reactive, gut-feel routine into a proactive one."
              className="mt-5"
            />
          </Reveal>
          <Reveal className="mt-10">
            <div className="grid grid-cols-1 gap-x-6 gap-y-7 border-y border-border py-8 sm:grid-cols-3">
              {[
                { k: "Problem", v: "Managers lacked timely insight, so tracking performance or catching churn early was hard. Tools were fragmented and reactive, and action came late." },
                { k: "What I did", v: "Designed a weekly report and churn-alert system for PC. Key metrics were reorganized for clarity; at-risk streamers were surfaced from revenue trends." },
                { k: "Impact", v: "Faster data visibility and response. Managers could address churn risk proactively and make tier and promotion calls with confidence." },
              ].map((c) => (
                <div key={c.k}>
                  <MiniLabel>{c.k}</MiniLabel>
                  <p className="mt-2 text-sm leading-6 text-fg/90">{c.v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ─── RESEARCH ─── */}
        <section id="research" className={GAP}>
          <SectionHead label="Research" title="Finding where managers were flying blind." />
          <Reveal className="mt-12">
            <P text="To make the tool scale across guilds — and hold up for overseas operations — I combined qualitative and quantitative methods: interviews and surveys, analysis of behavioral and platform data, and a steady back-channel with the operations team who talk to guild managers every day." />
          </Reveal>

          <Reveal className="mt-16">
            <SubHead label="Context" title="What is a guild?" />
            <P text="A guild is a management group that recruits and supports streamers. Day to day, guilds:" className="mt-4" />
            <ul className="mt-4 space-y-3">
              <Bullet>Provide coaching, technical support, and content guidance</Bullet>
              <Bullet>Help streamers grow their audiences and revenue</Bullet>
              <Bullet>Earn a commission on the performance of the streamers they manage</Bullet>
            </ul>
          </Reveal>

          <Reveal className="mt-16">
            <SubHead label="Interviews" title="What managers told us" />
            <P text="I interviewed **six guild managers** across top, mid, and emerging tiers. Three themes came through clearly." className="mt-4" />
          </Reveal>
          <Reveal className="mt-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { title: "Flying blind", body: "Managers leaned on intuition and self-reported updates, because timely data simply wasn't there." },
                { title: "No way to compare", body: "There was no like-for-like way to compare streamers within a guild." },
                { title: "A pull toward alerts", body: "Strong, repeated demand for structured alerts and one clear, centralized view." },
              ].map((t) => (
                <div key={t.title} className="rounded-2xl border border-border p-5">
                  <h4 className="text-base font-normal tracking-tight">{t.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-muted">{t.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-12">
            <Line accent text="Guild managers need timely, structured, actionable insight — to monitor performance, catch churn early, scale their operations, and lift the quality of every stream." />
          </Reveal>
        </section>

        {/* ─── OPPORTUNITIES ─── */}
        <section id="opportunities" className={GAP}>
          <SectionHead label="From pain points to opportunities" title="Four pains, turned into four bets." />
          <Reveal className="mt-12">
            <P text="Mapping what we heard against platform goals turned four recurring pains into four opportunities to design against." />
          </Reveal>
          <Reveal className="mt-8">
            <div className="space-y-4">
              {opportunities.map((o, i) => (
                <div key={i} className="grid gap-4 rounded-2xl border border-border p-5 sm:grid-cols-3 sm:gap-6">
                  <div>
                    <MiniLabel>Finding</MiniLabel>
                    <p className="mt-1.5 text-sm leading-6 text-muted">{o.finding}</p>
                  </div>
                  <div>
                    <MiniLabel>Pain point</MiniLabel>
                    <p className="mt-1.5 text-sm leading-6 text-fg/90">{o.pain}</p>
                  </div>
                  <div className="rounded-xl bg-accent/[0.05] p-3 sm:p-3">
                    <MiniLabel accent>Opportunity</MiniLabel>
                    <p className="mt-1.5 text-sm leading-6 text-fg">{o.opportunity}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ─── DESIGN STRATEGIES ─── */}
        <section id="strategies" className={GAP}>
          <SectionHead label="Design strategies" title="Four places better design changes a manager’s day." />
          <Reveal className="mt-12">
            <P text="Research pointed to four places where better design could change a manager's day." />
          </Reveal>
          <Reveal className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {strategies.map((s, i) => (
                <PillarCard key={s.title} n={i + 1} title={s.title} body={s.body} />
              ))}
            </div>
          </Reveal>
        </section>

        {/* ─── SOLUTION ─── */}
        <section id="solution" className={GAP}>
          <SectionHead label="Solution" title="Each strategy became a view in the dashboard." />
          <Reveal className="mt-12">
            <P text="Here is what shipped — four views, each answering a question a manager was already asking." />
          </Reveal>

          <SolutionView
            label="View 01"
            title="Guild data overview"
            body={[
              "I synced the four headline metrics — Total Revenue, Total Live Hours, Active Streamers, and Total Streamers — and gave each one Day-over-Day, Week-over-Week, and Month-over-Month deltas, so a manager reads momentum at a glance instead of reconstructing it.",
              "Each card pairs the current value with last month's, then splits momentum into three deltas — color-coded green for up and red for down. A manager reads both *direction* and *speed* at a glance, with no exports or spreadsheets in between.",
            ]}
            src={`${IMG}/solution-01.png`}
            alt="Guild data overview: four synced KPI cards — total revenue, live hours, active streamers, total streamers — each with day-, week-, and month-over-month comparisons"
            caption="The overview — four core metrics, each carrying day-, week-, and month-over-month deltas."
          />

          <SolutionView
            label="View 02"
            title="Tier classification"
            body={[
              "The platform rates each guild on its streamers' performance and sorts streamers into three income tiers — $50+, $600+, and $800+ monthly — so managers always know where a guild stands and who to invest in.",
              "The guild's current level sits up top. Below it, the count of streamers clearing each threshold, each carrying its own trend — so a manager sees not just how many streamers earn well, but whether the distribution is climbing or slipping.",
            ]}
            src={`${IMG}/solution-02.png`}
            alt="Tier classification: the current guild level, with streamers grouped into three monthly-income tiers"
            caption="Tier classification — guild level up top, streamers grouped into $50+, $600+, and $800+ tiers."
          />

          <SolutionView
            label="View 03"
            title="Top this month"
            body={[
              "A ranked Top 10 — the highest week-over-week growth among streamers clearing 10M diamonds — with gift contributions quantified, so wins are easy to spot and reward.",
              "Each row shows total diamonds and live hours next to the growth figure, so a manager can separate a streamer who's genuinely accelerating from one simply putting in more hours — and reverse-engineer what the top of the roster does that the rest could copy.",
            ]}
            src={`${IMG}/solution-03.png`}
            alt="Top streamers this month, ranked by week-over-week growth with gift contributions quantified"
            caption="Top this month — ranked by WoW growth, with each streamer's gift contribution."
          />

          <SolutionView
            label="View 04"
            title="Churn alert"
            body={[
              "The piece that changes the workflow: the Top 10 at-risk streamers by income drop, with Effective Broadcast Days alongside, so managers can step in while it still matters.",
              "It's the mirror image of the top-performer view, and the one managers open first. Surfacing decline *before* a streamer goes dark turns the dashboard from a report into a prompt to act.",
            ]}
            src={`${IMG}/solution-04.png`}
            alt="Churn alert: top at-risk streamers ranked by income drop, paired with their effective broadcast days"
            caption="Churn alert — at-risk streamers by income drop, paired with effective broadcast days."
          />
        </section>

        {/* ─── IMPACT ─── */}
        <section id="impact" className={GAP}>
          <SectionHead label="Impact" title="From 20 minutes to 7, and 20% more retention." />
          <Reveal className="mt-12">
            <dl className="grid gap-x-8 gap-y-10 border-y border-border py-10 sm:grid-cols-3">
              {[
                { value: "65%", label: "Faster at-risk spotting" },
                { value: "+20%", label: "Streamer retention" },
                { value: "40%", label: "More decision confidence" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-4xl font-normal tracking-tight text-accent sm:text-5xl">{s.value}</div>
                  <p className="mt-3 text-sm leading-6 text-muted">{s.label}</p>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="mt-10">
            <P text="The alert system cut the time to identify an at-risk streamer from roughly 20 minutes to 7 — a 65% drop — and retention in top-performing guilds rose about 20% the month after launch. In internal surveys, managers reported a 40% lift in confidence when making tier and promotion calls." />
          </Reveal>
          <Reveal className="mt-10">
            <div className="grid gap-4 sm:grid-cols-3">
              {quotes.map((q) => (
                <figure key={q.cite} className="flex h-full flex-col rounded-2xl border border-border bg-fg/[0.02] p-5">
                  <blockquote className="flex-1 text-sm leading-6 text-fg/90">“{q.body}”</blockquote>
                  <figcaption className="mt-4 text-[13px] font-medium text-muted">{q.cite}</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ─── REFLECTION ─── */}
        <section id="reflection" className={GAP}>
          <SectionHead label="Reflection" title="Designing for decisions, not just data." />
          <Reveal className="mt-12">
            <P text="This project was a turning point in how I think about designing for decisions. Unlike a consumer interface, this dashboard served guild managers who needed both **clarity and control** to act on fast-changing performance data — and it had to earn their trust every time they opened it." />
            <P
              text="The biggest takeaway was learning to balance information density with usability. I had to stop asking “how do I visualize this data?” and start asking **“what decision should this view enable?”** — and that shift reshaped the information architecture and which metrics to lead with."
              className="mt-5"
            />
            <P
              text="Through interviews and iteration I also came to appreciate the role of predictive design. The churn alert was more than a feature — it moved the product from passive reporting to **proactive intervention**, and pushed me past the UI into system thinking: how data flows, what should trigger action, and how to put the right signal in front of the right person at the right time."
              className="mt-5"
            />
          </Reveal>
        </section>
      </div>
    </CaseShell>
  );
}
