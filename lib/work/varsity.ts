// Structured content for the Varsity Tutors parent-dashboard case study.
// Narrative carried over from the original portfolio; presentation follows the
// repo's rich case-study format. Images live in /public/work/varsity/.

const IMG = "/work/varsity";

export type Stat = { value: number; suffix?: string; label: string };
export type Voice = { quote: string; source: string };
export type Numbered = { n: string; title: string; body: string };
export type Persona = {
  name: string;
  meta: string;
  avatar: string;
  motivation: string[];
  needs: string[];
};
export type Feature = { title: string; body: string };
export type Shot = { src: string; alt: string; w: number; h: number };
export type Pillar = {
  kicker: string;
  title: string;
  whatIsIt: string;
  features: Feature[];
  shots: Shot[];
  tint: string; // soft container background
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
    "As part of CMU's METALS Capstone, I worked with Varsity Tutors to rethink how parents stay informed about their child's progress. Today's reports are thin, so families disengage. Our goal was a transparent, engaging parent experience that turns raw tutoring-session data into *meaningful, actionable* updates. I contributed to research synthesis, data strategy, and the MVP design of a parent-facing dashboard — now in Varsity's development pipeline.",

  context:
    "Varsity Tutors is expanding personalized tutoring for high-schoolers prepping for the SAT/ACT/AP. But after the shift to remote and hybrid learning, parents needed more than grades: clearer evidence of progress, personalized next steps, and real visibility into what their child is actually learning.",

  research: {
    intro:
      "To learn where trust breaks down, we ran a mixed-methods study — a literature review of learning-science frameworks, an expert interview with a Varsity Tutors UX researcher, a parent survey, and in-depth interviews with parents who are also educators.",
    stats: [
      { value: 104, suffix: "", label: "parents surveyed on how they judge tutoring effectiveness" },
      { value: 4, suffix: "", label: "in-depth interviews with parent–educators" },
      { value: 8, suffix: " wks", label: "from research synthesis to a tested MVP" },
    ] as Stat[],
    ownership: [
      "Synthesized survey + interview data into four core insights with the team via affinity diagramming",
      "Shaped the data strategy — how raw session transcripts map to skills, mastery, and learning-science principles",
      "Designed the MVP parent dashboard: homepage, session reports, and a skill-mastery breakdown",
      "Ran 1:1 think-aloud testing and turned the findings into a clearer, more actionable second version",
    ],
  },

  personas: [
    {
      name: "Proactive Daisy",
      meta: "45 · Parent of a 10th-grader",
      avatar: `${IMG}/persona-daisy.png`,
      motivation: [
        "Wants her daughter to excel — a perfect SAT and 5s across AP courses",
        "Get ahead of peers and into a top university",
      ],
      needs: ["Highly qualified, hand-selected tutors", "An easy way to check progress at a glance"],
    },
    {
      name: "Reactive David",
      meta: "48 · Parent of an 11th-grader",
      avatar: `${IMG}/persona-david.png`,
      motivation: [
        "His son is struggling in math and needs help fast",
        "Wants to rebuild his son's confidence at school",
      ],
      needs: ["Noticeable improvement before the next exam", "A way to monitor progress without daily involvement"],
    },
  ] as Persona[],

  voices: [
    { quote: "The content my child produces is more important than letter grades.", source: "Parent interview" },
    { quote: "I want to know whether they're independently taking responsibility for their tasks.", source: "Parent interview" },
    { quote: "Being able to see past work, like a portfolio of progress, would be helpful.", source: "Parent interview" },
    { quote: "After understanding progress, I want clear next steps and how I can help at home.", source: "Parent interview" },
  ] as Voice[],

  problem: {
    statement:
      "We mapped the full parent journey — Search → Matching → Tutoring → Renew — and found that the experience functions, but it rarely feels transparent or trustworthy. Four pain points stood out.",
    blueprint: { src: `${IMG}/service-blueprint.png`, alt: "Service blueprint across the four parent-journey stages", w: 1600, h: 503 },
    items: [
      { n: "01", title: "Disconnected from the child", body: "Parents can't see their child's mindset or motivation, so engagement stays invisible." },
      { n: "02", title: "A non-standardized process", body: "Tutoring quality and structure vary, making it hard to know what 'good' looks like." },
      { n: "03", title: "Updates are hard to read", body: "Reports are inconsistent or too technical, so confidence erodes instead of building." },
      { n: "04", title: "No visibility into learning", body: "Grades don't show what was actually practiced, mastered, or still shaky." },
    ] as Numbered[],
  },

  mission:
    "How might we turn raw session data into progress parents can actually see, trust, and act on — without drowning them in numbers?",

  opportunities: [
    { title: "Show mastery with evidence", body: "Pair the data with real student examples, so progress is something parents can see, not just a score." },
    { title: "Make engagement visible", body: "Surface behavioral signals — persistence, retries, focus — that turn 'are they trying?' into something tangible." },
    { title: "Consistent, personalized updates", body: "Replace generic reports with transparent, tailored communication that's easy to access and act on." },
    { title: "Guide the next step", body: "Whether catching up or getting ahead, every parent wants to know what's next and how to help at home." },
  ] as Numbered[],

  // From lo-fi to a tested MVP
  springMvp: {
    body: "We started low-fidelity to validate structure, then built a Spring MVP with two key views — a Progress & Engagement tab and a progress detail page — and tested it with parents.",
    shots: [
      { src: `${IMG}/spring-progress.png`, alt: "Spring MVP — Progress & Engagement tab", w: 1600, h: 1119 },
      { src: `${IMG}/spring-detail.png`, alt: "Spring MVP — progress detail page", w: 1600, h: 1119 },
    ] as Shot[],
    learned:
      "1:1 think-aloud sessions were blunt: “I don't know where to look,” “the charts are too technical,” “I don't know what to do with this.” Parents didn't need more data — they needed the right data, with better structure and plainer language. That reframed the second version around three jobs: Find, Understand, Act.",
  },

  pillars: [
    {
      kicker: "Final MVP · 01",
      title: "A homepage you can scan",
      whatIsIt:
        "The homepage gives parents a quick, calm snapshot of their child's progress and makes it easy to act or follow up — an opening message, per-session and overall subject progress, learning history, support, and schedule reminders.",
      tint: "bg-[#eef0fb]",
      features: [
        { title: "Lead with a clear summary", body: "Progress shows up in plain terms first, so parents know how things are going before any chart." },
        { title: "Point to what matters", body: "Personalized entry points guide parents to the most relevant session or subject, not an undifferentiated wall of options." },
        { title: "Always offer a next step", body: "Every view ends with something to do — review a session, message a tutor, or support a skill at home." },
      ],
      shots: [{ src: `${IMG}/homepage-final.png`, alt: "Final parent-dashboard homepage", w: 1600, h: 1137 }],
    },
    {
      kicker: "Final MVP · 02",
      title: "Session reports parents understand",
      whatIsIt:
        "Each session report explains what a child actually accomplished. Every number is grounded in a learning-science principle and traced back to the session transcript — so the data feels earned, not arbitrary.",
      tint: "bg-[#eef0fb]",
      features: [
        { title: "Accuracy & effective time", body: "Detected from transcript keywords and focused exchanges — formative feedback after every session." },
        { title: "Skills, shown two ways", body: "Practiced skills map to Knowledge Components and pair text with visual examples for dual-channel comprehension." },
        { title: "Progress over time", body: "Mastery is aggregated across sessions and compared to platform averages to support realistic goal-setting." },
      ],
      shots: [
        { src: `${IMG}/session-report.png`, alt: "Session overview report — accuracy, effective time, skills covered", w: 1600, h: 1135 },
        { src: `${IMG}/progress-over-sessions.png`, alt: "Skill mastery progression across sessions", w: 1600, h: 1136 },
      ],
    },
    {
      kicker: "Final MVP · 03",
      title: "Mastery, made legible",
      whatIsIt:
        "An AI agent breaks each practice segment down — extracting the question, analyzing the student's thinking, and classifying the attempt. Skills land as Mastered, Familiar, or Need Support, with thresholds parents can actually see.",
      tint: "bg-[#eef0fb]",
      features: [
        { title: "Transparent thresholds", body: "Mastered (3+ practices, ≥90%), Familiar (70–89%), Need Support (<70%) — surfaced via microcopy so labels aren't a black box." },
        { title: "Filter to what matters", body: "Parents filter by mastery level to zoom in on where their child excels or needs help." },
        { title: "Per-skill detail", body: "Each row shows the skill, correctness rate, and practice count — evidence behind every label." },
      ],
      shots: [
        { src: `${IMG}/skill-overview.png`, alt: "Skill breakdown overview with mastery badges", w: 1600, h: 907 },
        { src: `${IMG}/skill-detail.png`, alt: "Detailed skill list with filtering", w: 1600, h: 1229 },
      ],
    },
  ] as Pillar[],

  explorations: {
    body: "Not everything worked. Early directions overloaded the page or left parents guessing what a label meant — useful failures that pushed the design toward clarity and quick scanning.",
    before: { src: `${IMG}/explore-before.png`, alt: "An earlier, heavier exploration", w: 1600, h: 735 },
    after: { src: `${IMG}/explore-after.png`, alt: "The refined, clearer direction", w: 1600, h: 1137 },
  },

  // Capstone outcome is qualitative. Add quantitative results here if/when available.
  outcome:
    "Usability testing validated the shift from 'more data' to the right data — surfaced with structure and plain language. The final MVP — homepage, session reports, and a skill-mastery breakdown — is now in Varsity Tutors' development pipeline.",

  takeaways: [
    {
      title: "Useful ≠ feel-good",
      body: "Some parents liked the idea of kids self-reporting emotions after a session — but a happy emoji doesn't mean they understood the material. We cut it and prioritized clearer indicators of real learning.",
    },
    {
      title: "Designing with (limited) data",
      body: "A small dataset forced us to clean, organize, and make the most of what we had — and to help parents understand what the numbers mean, not just display them.",
    },
    {
      title: "AI as a design partner",
      body: "We used AI for data cleaning, interview synthesis, and parts of the UI process — a collaborator that sped up the work so we could focus on the decisions that mattered.",
    },
  ] as Numbered[],
} as const;
