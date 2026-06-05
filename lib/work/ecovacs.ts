// Structured content for the Ecovacs DEEBOT X2 case study.
// Feature-led narrative (marco.fyi-style): cinematic intro → 3 feature chapters
// → careful rollout → qualitative impact → takeaways. Images in /public/work/ecovacs/.
// VIDEO slots are placeholders until the Vimeo demos are exported in.
const IMG = "/work/ecovacs";

export type Meta = { label: string; items: string[] };
export type Quote = { name: string; quote: string; avatar: string };
export type Card = { title: string; body: string };
// A before/after media unit. `placeholder` = footage not yet supplied (shows a
// labelled box); `video` = a real demo clip with a poster frame.
export type Media =
  | { kind: "placeholder"; label: string; caption: string }
  | { kind: "image"; src: string; w: number; h: number; alt: string; caption: string }
  | { kind: "video"; src: string; poster: string; alt: string; caption: string };

export type Chapter = {
  kicker: string;
  title: string;
  problem: string;
  solution: string;
  before: Media;
  after: Media;
  extras?: Media[]; // additional "after" clips (e.g. the result screen)
  note?: { title: string; body: string };
};

export const ecovacs = {
  hero: {
    kicker: "Product Builder · 2024 · Ecovacs Robotics",
    headline: "Robot vacuums promised autonomy. They shipped a manual.",
    sub: "Reworking the DEEBOT X2 from a robot you operate into one you trust — one-tap AI cleaning, a map that draws itself, and pet-safe navigation.",
    meta: [
      { label: "Role", items: ["Product Builder"] },
      { label: "Team", items: ["Product Design", "Software Eng", "Machine Learning", "Hardware R&D", "Product Mgmt"] },
      { label: "Skills", items: ["Product Strategy", "Research Synthesis", "Interaction Design", "System Logic", "Prototyping"] },
      { label: "Timeline", items: ["May–Aug 2024", "12 weeks"] },
    ] as Meta[],
    media: `${IMG}/hero.webp`,
    mediaAlt: "DEEBOT X2 app — auto mapping, AI cleaning, and Lab features",
  },

  problem: {
    intro:
      "The X2 was packed with capability — but TikTok and e-commerce reviews told another story. People found it complicated and, at worst, untrustworthy. Three pain points came up again and again.",
    cards: [
      {
        title: "Setup was a chore",
        body: "Before the first clean, users had to divide rooms by hand, draw virtual walls, and walk through a long setup. A rough first impression — and it hit almost everyone.",
      },
      {
        title: "Too many knobs",
        body: "Suction, water flow, cleaning passes… more than ten parameters, with no clear way to choose. The product felt complicated instead of smart.",
      },
      {
        title: "Pet-waste accidents",
        body: "Sometimes the robot failed to recognize pet waste and smeared it across the house. Rare — but catastrophic. It broke trust instantly.",
      },
    ] as Card[],
    voices: [
      { name: "Robert Rose", quote: "I thought it was automatic, but I still had to redraw the map myself. It feels more manual than smart.", avatar: `${IMG}/avatar-1.jpg` },
      { name: "Alex Smith", quote: "There are too many cleaning settings. I don't know which one to choose.", avatar: `${IMG}/avatar-2.jpg` },
      { name: "Jessica Davis", quote: "If it runs over pet waste, that's a disaster. I'd completely lose trust.", avatar: `${IMG}/avatar-3.jpg` },
    ] as Quote[],
  },

  priorities: {
    intro:
      "We had more requests than we could build — voice control, scheduling, and more. So instead of guessing, we ranked every issue by two things:",
    criteria: [
      "How much it hurts the core experience",
      "How broadly it hits users — or how severe it is when it does",
    ],
    bets: [
      { title: "Mapping", body: "Shapes the very first experience and touches almost every user." },
      { title: "AI auto-cleaning", body: "Simplifies the core daily job by removing manual configuration." },
      { title: "Pet-waste detection", body: "Low-frequency, high-severity — when it fails, trust is gone." },
    ] as Card[],
  },

  chapters: [
    {
      kicker: "Solution 01 · Mapping",
      title: "A map that draws itself.",
      problem: "Manual room-splitting and virtual walls turned setup into a chore.",
      solution:
        "Now the robot generates the map, divides rooms, and labels each room type on its own. Users only review and make small tweaks — setup goes from a task to a glance.",
      before: {
        kind: "image",
        src: `${IMG}/before-mapping.png`,
        w: 390,
        h: 844,
        alt: "Map editor — splitting rooms and drawing virtual walls by hand",
        caption: "Editing the map by hand",
      },
      after: {
        kind: "video",
        src: `${IMG}/demo-mapping.mp4`,
        poster: `${IMG}/demo-mapping-poster.jpg`,
        alt: "Auto mapping — the robot draws and labels the map on its own",
        caption: "The map draws and labels itself",
      },
    },
    {
      kicker: "Solution 02 · AI Auto-Cleaning",
      title: "One tap. The robot decides the rest.",
      problem: "A dozen cleaning settings users didn't know how to choose.",
      solution:
        "Tap Start, and the system reads each room's type and floor material to pick the strategy itself — suction, water, passes. The experience shifts from manual control to something that behaves like an agent working on your behalf.",
      before: {
        kind: "image",
        src: `${IMG}/before-cleaning.png`,
        w: 393,
        h: 1323,
        alt: "A dozen manual cleaning settings — mode, water level, passes, efficiency",
        caption: "A dozen settings, set by hand",
      },
      after: {
        kind: "video",
        src: `${IMG}/demo-ai-cleaning.mp4`,
        poster: `${IMG}/demo-ai-cleaning-poster.jpg`,
        alt: "AI auto-cleaning — one tap and the robot picks the strategy",
        caption: "One tap — AI picks the strategy",
      },
      extras: [
        {
          kind: "video",
          src: `${IMG}/demo-ai-cleaning-result.mp4`,
          poster: `${IMG}/demo-ai-cleaning-result-poster.jpg`,
          alt: "Cleaning complete — the robot hands back a clear report",
          caption: "…and hands back a clear cleaning report",
        },
      ],
    },
    {
      kicker: "Solution 03 · Pet-Safe Navigation",
      title: "Never smear it again.",
      problem: "A single pet-waste accident was enough to lose a user for good.",
      solution:
        "We retrained the recognition system to reliably detect pet waste and steer around it mid-clean — turning the scariest failure mode into a non-event.",
      before: {
        kind: "image",
        src: `${IMG}/before-zones.png`,
        w: 393,
        h: 852,
        alt: "Manually drawing no-go zones to fence off the mess",
        caption: "Fencing off the mess by hand",
      },
      after: {
        kind: "video",
        src: `${IMG}/demo-pet.mp4`,
        poster: `${IMG}/demo-pet-poster.jpg`,
        alt: "Pet-waste avoidance — the robot detects waste and steers around it",
        caption: "Detects waste and steers around it",
      },
      note: {
        title: "An honest trade-off",
        body: "In build, a real constraint surfaced: pet-waste detection and fine-particle cleaning couldn't run at the same time. Rather than silently pick one, we designed a clear toggle with an explanation — so users make an informed choice for their own home.",
      },
    },
  ] as Chapter[],

  rollout: {
    title: "Shipping it carefully.",
    intro:
      "The feature wasn't fully stable yet, so we didn't push it to everyone at once. We launched it as an experimental “Lab” feature first — which paid off in three ways:",
    reasons: [
      { title: "The right early users", body: "People who opt into experimental features tolerate rough edges and are eager to try new things." },
      { title: "Real-world data", body: "We learned actual accuracy and usage patterns from real homes, not just internal tests." },
      { title: "A safe exit", body: "If something broke, we could roll it back fast — without hurting the overall product." },
    ] as Card[],
    outro: "Once the data stabilized and we trusted the quality, we rolled it out more broadly.",
  },

  impact: {
    headline: "The autonomy finally felt like autonomy.",
    results: [
      "Users got started much faster, with far less setup friction.",
      "Adoption of the AI cleaning mode climbed.",
      "Complaints about complexity fell — replaced by feedback that the product felt smarter and easier to use.",
    ],
  },

  takeaways: [
    {
      title: "Start with real household behavior",
      body: "The sharpest insights came from messy real homes — pets, clutter, first-time setups — not the lab. Design for the room, not the spec sheet.",
    },
    {
      title: "Design for trust, not just automation",
      body: "Autonomy only counts when people believe in it. One catastrophic failure outweighs a hundred smooth runs, so high-risk moments deserve the most care.",
    },
    {
      title: "AI should feel invisible but dependable",
      body: "The win wasn't more controls — it was fewer. The system makes the call, stays transparent about it, and earns the right to be trusted by default.",
    },
  ] as Card[],
};
