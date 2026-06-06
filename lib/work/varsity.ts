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
export type MatrixPoint = { label: string; x: number; y: number; chosen?: boolean }; // x,y in 0..1
export type Matrix = { xLabel: string; yLabel: string; note?: string; points: MatrixPoint[] };
export type TradeOff = {
  n: string;
  title: string;
  tension: string;
  considered: Option[];
  chose: string;
  why: string;
  photo?: Shot; // contextual photo shown after the tension
  shot?: Shot; // outcome image shown after the decision
  matrix?: Matrix; // decision-rationale plot
};
// Annotation shown under a split-layout component image: its goal, how the data is
// derived, and the learning-science principle behind it.
export type ShotNote = {
  title: string;
  logic: string[];
  principle?: { name: string; body: string };
};
export type Shot = { src?: string; alt: string; w: number; h: number; placeholder?: boolean; caption?: string; note?: ShotNote };
export type Pillar = {
  kicker: string;
  title: string;
  whatIsIt: string;
  shots: Shot[];
  splitLayout?: boolean; // shots[0] big on the left, shots[1..] stacked on the right
  highlights?: Highlight[]; // labelled callouts that flank the shot, aligned to regions
  tint: string;
};
// A callout that sits beside the homepage shot. `side` picks the column; `top`/`bottom`
// are y-fractions of the image marking the region its connector bar spans.
export type Highlight = { title: string; body: string; side: "left" | "right"; top: number; bottom: number };

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

  setup: {
    motivation:
      "Varsity Tutors is a subscription tutoring marketplace for grades 10–12, where *renewal is the core business metric* — and the parent is the one who decides whether to renew.",
    challenge:
      "But parents never really see the product. All they get is a raw session transcript — long, unstructured, mapped to no learning framework — so they can't tell whether it's working. The result is *silent churn*: parents who quietly stop renewing because they can't see learning happening.",
    solution:
      "Over an 8-week CMU METALS Capstone, I worked with Varsity Tutors to turn each session transcript into signals parents can act on — so the renewal decision shifts from a guess to a confident yes.",
  },
  briefShot: { src: `${IMG}/brief-workshop.png`, alt: "Co-creation workshop with the Varsity Tutors team", w: 1319, h: 748 },

  transcript: {
    body:
      "Before the dashboard, every session ended in a raw transcript: pages of back-and-forth dialogue with no structure, no learning framework, and no signal of what was mastered or still shaky. To answer “is this working?”, a parent had to read the whole thing — so most just guessed.",
    shot: { src: `${IMG}/old-transcripts.png`, alt: "What parents got before the dashboard — long, unstructured session-recap pages", w: 3680, h: 2759 },
  },

  research: {
    intro:
      "To find where trust breaks down, we triangulated across theory, business, and real users — a literature review of learning-science frameworks, internal expert interviews at Varsity Tutors, a survey of 104 parents, and 1:1 in-depth interviews — to understand what parents care about, what confuses them, and where they feel uncertain.",
    stats: [
      { value: 104, suffix: "", label: "parents surveyed on how they judge tutoring effectiveness" },
      { value: 4, suffix: "", label: "in-depth 1:1 parent interviews" },
      { value: 3, suffix: "", label: "research lenses — theory, business & real users" },
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

  problem: {
    statement:
      "We mapped the full journey from search to renewal and found four pain points — and the biggest gap lands exactly where it hurts most: during and after sessions, when parents most want to understand learning but the system gives the least clarity.",
    blueprint: { src: `${IMG}/journey-blueprint.png`, alt: "Full parent journey map — Before, During, After — with goals, actions, touchpoints, and an emotion curve", w: 2400, h: 1238 },
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
      photo: { src: `${IMG}/cocreation-workshop.png`, alt: "The co-creation workshop with the Varsity Tutors team", w: 1600, h: 772 },
      matrix: {
        xLabel: "System change / effort →",
        yLabel: "↑ Impact on trust & renewal",
        points: [
          { label: "Standardize process", x: 0.82, y: 0.8 },
          { label: "More comms", x: 0.28, y: 0.34 },
          { label: "Emotional + visibility", x: 0.32, y: 0.85, chosen: true },
        ],
      },
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
      shot: { src: `${IMG}/dashboard-annotated.png`, alt: "Annotated homepage — question-first structure with Progress / Engagement / Challenges / Next Steps entry points", w: 2400, h: 1201 },
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
      shots: [{ src: `${IMG}/homepage-final.png`, alt: "Final parent-dashboard homepage", w: 1600, h: 1137 }],
      highlights: [
        { side: "left", top: 0.085, bottom: 0.235, title: "Opening message", body: "A personalized greeting for quick understanding." },
        { side: "left", top: 0.275, bottom: 0.45, title: "Individual session progress", body: "The latest session's recap and suggested plans." },
        { side: "left", top: 0.5, bottom: 0.68, title: "Overall subject progress", body: "Subject-level mastery, and where help is needed." },
        { side: "left", top: 0.74, bottom: 0.95, title: "Service support entry", body: "Easy access to follow-up services." },
        { side: "right", top: 0.15, bottom: 0.33, title: "Schedule reminder", body: "Keeps parents aware of upcoming sessions." },
        { side: "right", top: 0.51, bottom: 0.97, title: "Learning history", body: "Quickly locate past learning sessions." },
      ],
    },
    {
      kicker: "Final MVP · 02",
      title: "Understand a session in 30 seconds",
      whatIsIt:
        "The goal: let a parent understand how a session went in about 30 seconds. Three high-level metrics summarize performance, with hover explanations that clarify the data logic without interrupting the read. Below, skill highlights — and a cross-session view and at-home cards that came straight from testing.",
      tint: "bg-[#eef0fb]",
      splitLayout: true,
      shots: [
        { src: `${IMG}/so-full.png`, alt: "Full session overview — report, skill highlights, growth, and home support", w: 1304, h: 2000 },
        {
          src: `${IMG}/so-metrics.png`,
          alt: "Today's progress — accuracy, effective learning time, and skills covered",
          w: 2000,
          h: 718,
          note: {
            title: "Quickly tell parents what happened this session",
            logic: [
              "Accuracy Rate — inferred from the keywords and problem-solving phrases in the transcript.",
              "Effective Learning Time — the transcript stripped of opening/closing chatter, leaving the focused tutor–student exchanges.",
              "Skills Covered — carried into the skills view below.",
            ],
            principle: { name: "Formative Assessment", body: "Skill-level feedback after each session lets instruction adapt to how it actually went." },
          },
        },
        {
          src: `${IMG}/so-skills.png`,
          alt: "Session Skills Highlight — skills to improve vs. mastered, with a worked example",
          w: 2000,
          h: 858,
          note: {
            title: "A deeper look at what was practiced and mastered",
            logic: [
              "Practiced skills matched to Knowledge Components (KCs) via subject-specific keywords.",
              "Tutor–student dialogue classified as mastered, confused, or skipped.",
              "AI generates a matched worked example for each KC.",
            ],
            principle: { name: "Dual Channels", body: "Text and a visual example shown together aid memory and comprehension." },
          },
        },
        {
          src: `${IMG}/so-growth.png`,
          alt: "Learning growth over time vs. the platform average",
          w: 2000,
          h: 718,
          note: {
            title: "Long-term progression across sessions",
            logic: [
              "Skill-mastery data aggregated across every session.",
              "Compared against platform-wide averages.",
              "Cumulative growth surfaced for trend reading.",
            ],
            principle: { name: "Goal Setting", body: "Seeing progress against a benchmark helps families set realistic learning goals." },
          },
        },
        {
          src: `${IMG}/so-support.png`,
          alt: "Support at Home — positive, actionable cards for parents",
          w: 2000,
          h: 581,
          note: {
            title: "Reinforce learning at home with actionable tips",
            logic: [
              "Cards recommended from recently practiced skills.",
              "Messages tailored to session performance and behavior cues.",
              "Parents can download or open the relevant materials.",
            ],
            principle: { name: "Growth Mindset", body: "Cards like “Celebrate Every Win” nudge positive reinforcement and continuous growth." },
          },
        },
      ],
    },
    {
      kicker: "Final MVP · 03",
      title: "Where they stand across the subject",
      whatIsIt:
        "If Session Overview answers 'what happened this session,' Skill Breakdown answers 'where does my child stand across the subject?' An AI agent breaks down each practice, scores it on accuracy and repetition, and sorts skills into levels parents can read.",
      tint: "bg-[#eef0fb]",
      splitLayout: true,
      shots: [
        { src: `${IMG}/skill-breakdown-final.png`, alt: "Full Skill Breakdown — mastery summary and the per-skill table", w: 2200, h: 1564 },
        {
          src: `${IMG}/sb-summary.png`,
          alt: "Mastery summary — share of skills covered, and Mastered / Familiar / Need Support levels",
          w: 1714,
          h: 314,
          note: {
            title: "Reveal how mastery levels are calculated",
            logic: [
              "An AI agent breaks down each practice segment — extracting the question, reading the student's thinking, weighing the tutor's feedback, and marking the attempt correct or incorrect.",
              "Mastered — practiced 3+ times at ≥90% accuracy.",
              "Familiar — accuracy between 70–89%.",
              "Need Support — accuracy below 70%.",
            ],
            principle: { name: "Interpretable Levels", body: "Plain, named levels beat an opaque continuous score parents can't act on." },
          },
        },
        {
          src: `${IMG}/sb-table.png`,
          alt: "Skill table with filters — each row shows the skill, correctness rate, and practice count",
          w: 1714,
          h: 836,
          note: {
            title: "Help parents focus on the skills that matter",
            logic: [
              "Filter the list by mastery level or domain to zoom straight to the relevant subset.",
              "Each row carries the evidence — skill, correctness rate, and practice count.",
              "A simple mastery filter looked minor but was used constantly in testing.",
            ],
            principle: { name: "Evidence per Skill", body: "Every label is backed by the numbers behind it, so parents can trust the read." },
          },
        },
      ],
    },
  ] as Pillar[],

  explorations: {
    body:
      "Before landing here, we explored five to six information structures — session-centered, skill-centered, and emotion-signal-first — and compared them on clarity, focus, and how well each guided action. The winner mirrored how parents actually make decisions.",
    shots: [
      { src: `${IMG}/explore-before.png`, alt: "An earlier, heavier exploration", w: 1600, h: 735, caption: "An earlier, heavier layout" },
      { src: `${IMG}/explore-after.png`, alt: "The refined, clearer direction", w: 1600, h: 1137, caption: "A cleaner direction" },
      { src: `${IMG}/it-session-recap.png`, alt: "Session Recap — full refined view", w: 1480, h: 1600, caption: "Session Recap — refined view" },
      { src: `${IMG}/it-skill-breakdown.png`, alt: "Skill Breakdown — full refined view", w: 1600, h: 1137, caption: "Skill Breakdown — refined view" },
      { src: `${IMG}/it-skill-table.png`, alt: "Skill table — detail and filtering", w: 1600, h: 1193, caption: "Skill table — detail & filtering" },
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
