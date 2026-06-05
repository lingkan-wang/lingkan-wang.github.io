// Structured content for the Varsity Tutors parent-dashboard case study.
// Narrative follows the project deck (retention through learning visibility);
// presentation follows the repo's rich case-study format. Images live in
// /public/work/varsity/. Some process visuals are placeholders (see `placeholder`).

const IMG = "/work/varsity";

export type Stat = { value: number; suffix?: string; label: string };
export type Numbered = { n: string; title: string; body: string };
export type Job = { title: string; want: string; body: string };
export type Persona = {
  name: string;
  meta: string;
  avatar: string;
  motivation: string[];
  needs: string[];
};
export type Option = { label: string; note: string; chosen?: boolean };
export type TradeOff = {
  n: string;
  title: string;
  tension: string;
  considered: Option[];
  chose: string;
  why: string;
  shot?: Shot;
};
export type Feature = { title: string; body: string };
export type Shot = { src?: string; alt: string; w: number; h: number; placeholder?: boolean };
export type Pillar = {
  kicker: string;
  title: string;
  whatIsIt: string;
  features: Feature[];
  shots: Shot[];
  tint: string;
};

export const varsity = {
  hero: {
    image: `/work/covers/varsity.png`,
    imageAlt: "The Varsity Tutors parent dashboard — Skill Breakdown view on desktop",
    meta: [
      { label: "Role", items: ["Product Builder"] },
      { label: "Team", items: ["CMU METALS Capstone", "× Varsity Tutors"] },
      { label: "Tools", items: ["Figma", "FigJam"] },
      { label: "Timeline", items: ["8 weeks", "2025"] },
    ] as const,
  },

  brief:
    "Varsity Tutors is a subscription tutoring marketplace for grades 10–12, where *renewal is the core business metric*. But parents never really see the product. All they get is a raw session transcript — long, unstructured, mapped to no learning framework — which gives them almost nothing to judge whether it's working. The result is *silent churn*: parents who quietly stop renewing because they can't tell if learning is happening. Over an 8-week CMU METALS Capstone, I worked with Varsity Tutors to turn each session transcript into signals parents can act on — so the renewal decision shifts from a guess to a confident yes.",

  context:
    "This built on a takeaway from my previous project at Ecovacs: as systems get more intelligent, the thing that needs designing isn't just functionality — it's trust and visibility. When people can't see what an intelligent system is doing, or why, they won't hand it their trust. That lens shaped everything here.",

  research: {
    intro:
      "To find where trust breaks down, we triangulated across theory, business, and real users — a literature review of learning-science frameworks, internal expert interviews at Varsity Tutors, a survey of 104 parents, and 1:1 in-depth interviews — to understand what parents care about, what confuses them, and where they feel uncertain.",
    stats: [
      { value: 104, suffix: "", label: "parents surveyed on how they judge tutoring effectiveness" },
      { value: 4, suffix: "", label: "in-depth 1:1 parent interviews" },
      { value: 8, suffix: " wks", label: "from research to a tested MVP" },
    ] as Stat[],
    ownership: [
      "Synthesized survey + interview data into the framework below, with the team, via affinity diagramming",
      "Owned the data strategy — how a raw session transcript maps to skills, mastery, and learning-science principles",
      "Designed the MVP: homepage, session reports, and an AI-driven skill-mastery breakdown",
      "Ran 1:1 think-aloud testing and made the hard calls that turned a confusing v1 into an actionable v2",
    ],
  },

  // What parents actually hire the product to do
  jobs: [
    {
      title: "The Learning Job",
      want: "Tell me whether learning actually happened — not just how many sessions.",
      body: "Today parents get a transcript and grades that lag by weeks. They want mastery; the system reports attendance.",
    },
    {
      title: "The Engagement Job",
      want: "Let me see whether my kid is actually engaged — not just present.",
      body: "Engagement is the leading indicator parents most want, yet it's completely invisible. That blind spot is the source of silent churn.",
    },
    {
      title: "The Trust Job",
      want: "Give me a stable, honest read. I don't want surprises.",
      body: "Trust comes from consistent, transparent feedback. Inconsistent signals quietly erode it between billing cycles.",
    },
  ] as Job[],

  personas: [
    {
      name: "Proactive Daisy",
      meta: "Parent of a 10th-grader",
      avatar: `${IMG}/persona-daisy.png`,
      motivation: [
        "Wants her daughter to excel — a top SAT and 5s across AP courses",
        "Planning years ahead toward a competitive university",
      ],
      needs: ["Highly qualified tutors", "An at-a-glance read on whether things are on track"],
    },
    {
      name: "Reactive David",
      meta: "Parent of an 11th-grader",
      avatar: `${IMG}/persona-david.png`,
      motivation: [
        "His son is already struggling; he needs fast results before an upcoming exam",
        "Looking 6–8 weeks out, not years — and will cancel if he doesn't see progress",
      ],
      needs: ["Visible improvement within a short window", "A way to monitor progress without daily involvement"],
    },
  ] as Persona[],

  problem: {
    statement:
      "We mapped the full journey from search to renewal and found four pain points — and the biggest gap lands exactly where it hurts most: during and after sessions, when parents most want to understand learning but the system gives the least clarity.",
    blueprint: { src: `${IMG}/service-blueprint.png`, alt: "Service blueprint across the parent journey", w: 1600, h: 503 },
    items: [
      { n: "01", title: "Limited emotional touchpoints", body: "Parents can't feel how engaged or motivated their child is between sessions." },
      { n: "02", title: "Non-standardized process", body: "Tutoring quality and structure vary tutor to tutor, so 'good' is hard to define." },
      { n: "03", title: "Communication gaps", body: "Updates are sparse, late, or hard to interpret — confidence erodes instead of building." },
      { n: "04", title: "No visibility beyond grades", body: "Grades don't show what was actually practiced, mastered, or still shaky." },
    ] as Numbered[],
  },

  // The decisions that shaped the product — research through final design.
  tradeoffs: [
    {
      n: "01",
      title: "Where to focus",
      tension:
        "A co-creation workshop with the Varsity team surfaced three candidate bets. Which one moves renewal fastest at this product stage?",
      considered: [
        { label: "Standardize the tutoring process", note: "The business's first instinct — better quality at scale. But it needs deep changes to tutor workflows and internal systems; too slow to ship now." },
        { label: "Add communication touchpoints", note: "More notifications and summaries add information, not understanding — they don't touch the core problem." },
        { label: "Emotional touchpoints + visibility into learning", note: "Lives in the parent-experience layer — no system rebuild, but the most direct impact on perceived value and trust.", chosen: true },
      ],
      chose: "Emotional touchpoints + visibility into learning.",
      why: "It was the fastest path to the thing that actually drives renewal — how parents perceive value and trust — without re-architecting the platform.",
    },
    {
      n: "02",
      title: "How to structure the dashboard",
      tension:
        "My first lo-fi mapped each How-Might-We question to its own section. Tidy on paper — but parents don't come to read content, they come with a question.",
      considered: [
        { label: "A section per HMW question", note: "Clean taxonomy, but it forced parents to assemble the answer to 'how is my child doing?' themselves." },
        { label: "Question-first: Progress + Engagement", note: "Two entry points mirroring the two questions parents already ask. Mastery + next-steps under Progress; emotional signals + updates under Engagement.", chosen: true },
      ],
      chose: "Two question-first entry points — Progress and Engagement.",
      why: "Parents start from the question already in their head, then drill down — instead of doing the system's synthesis work for it.",
    },
    {
      n: "03",
      title: "The emotion self-report feature",
      tension:
        "Early research said parents wanted to know how their child felt after each session, so we built a student emotion self-report. In testing, the feedback split — some parents doubted kids would report honestly.",
      considered: [
        { label: "Keep it — parents asked for emotional signal", note: "Satisfies a stated desire, but rests on data of questionable reliability." },
        { label: "Remove it", note: "Unreliable self-reports could mislead parents and damage the exact trust we were building.", chosen: true },
      ],
      chose: "Cut the feature.",
      why: "Trust and data quality over more information. Parents could still read engagement from other, more reliable signals — so the feature's cost outweighed its benefit.",
      shot: { src: `${IMG}/tradeoff-emotion.png`, alt: "Engagement view with the Self-Reported Emotions card marked for removal", w: 1600, h: 1119 },
    },
    {
      n: "04",
      title: "How to express mastery",
      tension:
        "How do we answer 'how much has my child mastered?' in a way parents actually trust?",
      considered: [
        { label: "Continuous scores / a more complex model", note: "Precise, but internal testing showed it wasn't transparent — parents couldn't tell what a number meant." },
        { label: "Clear, interpretable levels", note: "Mastered / Familiar / Need Support, with plain hover explanations and the accuracy + practice-count logic behind each.", chosen: true },
      ],
      chose: "Interpretable mastery levels over raw scores.",
      why: "An interpretable signal parents trust beats a precise one they can't read.",
    },
  ] as TradeOff[],

  // Reframe from testing
  reframe: {
    body:
      "We tested the first MVP with four parents of students in grades 5–8, think-aloud. Three issues came up every time: parents didn't know where to start; the information felt scattered, abstract, or too technical; and the biggest one — “I understand it, but I still don't know what to do next.” The problem wasn't the data. It was how the data was structured and how action was guided. That reframed the MVP around three jobs:",
    goals: [
      { n: "01", title: "Find", body: "Help parents quickly locate the key information." },
      { n: "02", title: "Understand", body: "Make the data easy to grasp — plain language over jargon." },
      { n: "03", title: "Act", body: "Always make the next step to support their child obvious." },
    ] as Numbered[],
  },

  pillars: [
    {
      kicker: "Final MVP · 01",
      title: "A homepage that guides, not dumps",
      whatIsIt:
        "The homepage's job is to guide, not to show everything at once. A personalized opening message, clear entry points to the session view and overall progress, and quick access to history and schedule. Earlier versions packed in more data — and just raised cognitive load.",
      tint: "bg-[#eef0fb]",
      features: [
        { title: "Personalized opening", body: "A one-line message orients the parent in seconds." },
        { title: "Clear entry points", body: "Direct routes into Session view and overall Progress, not a flat wall of data." },
        { title: "Guide over overwhelm", body: "We cut anything that didn't drive a decision, so the page points instead of floods." },
      ],
      shots: [{ src: `${IMG}/homepage-final.png`, alt: "Final parent-dashboard homepage", w: 1600, h: 1137 }],
    },
    {
      kicker: "Final MVP · 02",
      title: "Understand a session in 30 seconds",
      whatIsIt:
        "The goal: let a parent understand how a session went in about 30 seconds. Three high-level metrics summarize performance, with hover explanations that clarify the data logic without interrupting the read. Below, skill highlights — and a cross-session view and at-home cards that came straight from testing.",
      tint: "bg-[#eef0fb]",
      features: [
        { title: "Three metrics at a glance", body: "Accuracy Rate, Effective Learning Time, and Skills Covered — all grounded in the session transcript." },
        { title: "Hover, don't interrupt", body: "Data logic is explained on hover, so curious parents can dig in without breaking the scan." },
        { title: "Trends, and what to do at home", body: "A cross-session view answers 'is my child improving over time?'; positive, actionable cards answer 'what can I do at home?'" },
      ],
      shots: [
        { src: `${IMG}/session-report.png`, alt: "Session overview — accuracy, effective time, skills covered", w: 1600, h: 1135 },
        { src: `${IMG}/progress-over-sessions.png`, alt: "Cross-session progress view", w: 1600, h: 1136 },
      ],
    },
    {
      kicker: "Final MVP · 03",
      title: "Where they stand across the subject",
      whatIsIt:
        "If Session Overview answers 'what happened this session,' Skill Breakdown answers 'where does my child stand across the subject?' An AI agent breaks down each practice, scores it on accuracy and repetition, and sorts skills into levels parents can read.",
      tint: "bg-[#eef0fb]",
      features: [
        { title: "Interpretable levels", body: "Mastered / Familiar / Need Support, with plain hover explanations — chosen over opaque continuous scores." },
        { title: "A filter that earned its keep", body: "A simple mastery filter looked minor but was used constantly in testing — it jumps parents straight to what needs support." },
        { title: "Evidence per skill", body: "Each row shows the skill, correctness rate, and practice count — the proof behind the label." },
      ],
      shots: [
        { src: `${IMG}/skill-overview.png`, alt: "Skill breakdown overview with mastery badges", w: 1600, h: 907 },
        { src: `${IMG}/skill-detail.png`, alt: "Detailed skill list with mastery filter", w: 1600, h: 1229 },
      ],
    },
  ] as Pillar[],

  explorations: {
    body:
      "Before landing here, we explored five to six information structures — session-centered, skill-centered, and emotion-signal-first — and compared them on clarity, focus, and how well each guided action. The winner mirrored how parents actually make decisions.",
    shots: [
      { alt: "Lo-fi IA exploration — a section per question vs. question-first (Progress / Engagement)", w: 1600, h: 900, placeholder: true },
      { src: `${IMG}/explore-before.png`, alt: "An earlier, heavier exploration", w: 1600, h: 735 },
      { src: `${IMG}/explore-after.png`, alt: "The refined, clearer direction", w: 1600, h: 1137 },
    ] as Shot[],
  },

  outcome:
    "Testing validated the shift from more data to the right data — structured around the questions parents ask, and guided toward action. The MVP (homepage, session reports, and skill breakdown) is now in Varsity Tutors' development pipeline. Given more time, the next steps are: a human-in-the-loop to validate and improve AI accuracy; expanding beyond Algebra to more subjects; and larger-scale testing with real Varsity users to measure long-term value.",

  takeaways: [
    {
      title: "Design trust and visibility, not just features",
      body: "As systems get smarter, the job shifts: people won't hand control to something they can't see or understand. Most of this project was making an AI's reasoning legible enough to trust.",
    },
    {
      title: "Structure beats more data",
      body: "Parents didn't need more numbers — they needed the right ones, organized around the questions they already ask. The same data, restructured, went from confusing to actionable.",
    },
    {
      title: "Sometimes the best feature is the one you cut",
      body: "Removing the unreliable emotion self-report protected the trust the whole product depended on. Useful isn't the same as feel-good.",
    },
  ] as Numbered[],
} as const;
