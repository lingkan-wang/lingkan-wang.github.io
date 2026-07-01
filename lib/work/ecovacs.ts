// Structured content for the Ecovacs DEEBOT X2 case study.
// Storytelling structure modeled on georgialyu.com/brix.html: a sticky left
// table-of-contents, then Overview -> Goals -> Problems (quantified) -> Impact
// (up front) -> three HMW design challenges -> More -> Next steps -> Takeaways.
// Numbers are the real captioned metrics from the original research/impact data.
// Media lives in /public/work/ecovacs/.
const IMG = "/work/ecovacs";

export type Meta = { label: string; items: string[] };
export type Quote = { name: string; quote: string; avatar: string };
export type Card = { title: string; body: string };
export type Stat = { value: number; suffix?: string; label: string };
export type ProblemCard = { stat: Stat; title: string; body: string };

// A before/after media unit. `placeholder` = footage not yet supplied (shows a
// labelled box); `video` = a real demo clip with a poster frame.
export type Media =
  | { kind: "placeholder"; label: string; caption: string }
  | { kind: "image"; src: string; w: number; h: number; alt: string; caption: string }
  | { kind: "video"; src: string; poster: string; alt: string; caption: string }
  | { kind: "photos"; items: { src: string; w: number; h: number; alt: string }[]; caption: string };

export type Challenge = {
  id: string; // anchor + TOC id
  num: string; // "01"
  feature: string; // short label for the TOC, e.g. "Mapping"
  hmw: string; // the How-Might-We question (section headline)
  approach: string; // how we solved it
  detail?: string[]; // optional supporting points
  before: Media;
  after: Media;
  extras?: Media[]; // additional "after" clips (e.g. the result screen)
  note?: { title: string; body: string };
};

// A "more improvements" row: a feature with one or more media (demo video or screenshots).
export type ImprovementMedia = { video?: string; poster?: string; img?: string; w?: number; h?: number };
export type ImprovementItem = {
  kicker: string;
  title: string;
  body: string;
  media: ImprovementMedia[];
};

export const ecovacs = {
  shortTitle: "DEEBOT X2",

  hero: {
    title: "Robot vacuums promised autonomy. They shipped a manual.",
    tags: ["B2C", "AI Smart Home", "Consumer Mobile"],
    sub: "Reworking the DEEBOT X2 from a robot you operate into one you trust: one-tap AI cleaning, a map that draws itself, and pet-safe navigation.",
    media: `${IMG}/hero.webp`,
    mediaAlt: "DEEBOT X2 app — auto mapping, AI cleaning, and Lab features",
  },

  overview: {
    statement: "An AI auto-cleaning experience that replaces complex manual setup with one-tap intelligent control.",
    note: "ECOVACS positioned the DEEBOT X2 as fully autonomous, but rising customer complaints told another story. The hardware was capable; the experience still asked people to edit maps, choose between a dozen settings, and hope it avoided the worst messes. I led the design that closed the gap between what the robot could do and how intelligent it actually felt.",
    meta: [
      { label: "Role", items: ["Product Designer"] },
      { label: "Team", items: ["Product Design", "Software Eng", "Machine Learning", "Hardware R&D", "Product Mgmt"] },
      { label: "Skills", items: ["Product Strategy", "Research Synthesis", "Interaction Design", "System Logic", "Prototyping"] },
      { label: "Timeline", items: ["May to Aug 2024", "12 weeks"] },
    ] as Meta[],
    scope: [
      "Defined success metrics and guardrails, and aligned five teams on one product contract.",
      "Turned usability findings into a prioritized roadmap, MVP scope, and acceptance criteria.",
      "Partnered with Robotics, ML, and Eng so the UI matched real robot constraints, model confidence, and failure modes.",
      "Shipped an AI hosting system that cut configuration without sacrificing safety or cleaning quality.",
    ],
  },

  goals: {
    statement: "Make autonomy feel effortless, and earn trust at the riskiest moments.",
    intro:
      "The X2 did not need more features. It needed fewer decisions and more confidence. Three goals framed the work:",
    items: [
      {
        title: "Make mapping feel truly automatic",
        body: "Auto-mapping existed, but users still split rooms, renamed spaces, and fixed boundaries. Cut those corrections so mapping feels confident on its own, especially for first-timers who expect plug-and-play.",
      },
      {
        title: "Take decisions off the user",
        body: "Instead of asking people to configure the robot, shift the call to the system: let AI read floor types and usage patterns, then recommend or apply the right settings.",
      },
      {
        title: "Design for trust in high-risk moments",
        body: "Pet-waste failures destroyed trust. Prioritize high-risk detection and clear system feedback so the robot feels dependable, not unpredictable.",
      },
    ] as Card[],
  },

  problems: {
    statement: "Autonomy that still felt manual.",
    intro:
      "The X2 was packed with capability, but TikTok and e-commerce reviews told another story: people found it complicated and, at worst, untrustworthy. We combined complaint analysis, App Store review mining, and interviews with pet owners and first-timers. Three pain points came up again and again.",
    cards: [
      {
        stat: { value: 38, suffix: "%", label: "of negative feedback tied to mapping confusion and manual editing" },
        title: "Setup was a chore",
        body: "Before the first clean, users divided rooms by hand, drew virtual walls, and walked a long setup. A rough first impression that hit almost everyone.",
      },
      {
        stat: { value: 72, suffix: "%", label: "of testers hesitated or changed cleaning settings before starting" },
        title: "Too many knobs",
        body: "Suction, water flow, cleaning passes: more than ten parameters, with no clear way to choose. The product felt complicated instead of smart.",
      },
      {
        stat: { value: 33, suffix: "%", label: "of runs failed to avoid high-risk obstacles in pet-home tests" },
        title: "Pet-waste accidents",
        body: "Sometimes the robot failed to recognize pet waste and smeared it across the house. Rare, but catastrophic. It broke trust instantly.",
      },
    ] as ProblemCard[],
    voices: [
      { name: "Robert Rose", quote: "I thought it was automatic, but I still had to redraw the map myself. It feels more manual than smart.", avatar: `${IMG}/avatar-1.jpg` },
      { name: "Alex Smith", quote: "There are too many cleaning settings. I don't know which one to choose.", avatar: `${IMG}/avatar-2.jpg` },
      { name: "Jessica Davis", quote: "If it runs over pet waste, that's a disaster. I'd completely lose trust.", avatar: `${IMG}/avatar-3.jpg` },
    ] as Quote[],
  },

  impact: {
    statement: "The autonomy finally felt like autonomy.",
    intro:
      "After launch, the experience told a different story than the complaints that started it. Setup got out of the way, the AI mode became the default behavior, and trust returned.",
    stats: [
      { value: 93, suffix: "%", label: "less setup time with one-tap AI cleaning" },
      { value: 65, suffix: "%", label: "fewer manual interactions per clean" },
      { value: 92, suffix: "%", label: "preferred AI cleaning over manual mode" },
      { value: 50, suffix: "%", label: "lift in purchase intent" },
    ] as Stat[],
  },

  challenges: [
    {
      id: "mapping",
      num: "01",
      feature: "Mapping",
      hmw: "How might we make setup something that just happens, not a chore?",
      approach:
        "Now the robot generates the map, divides rooms, and labels each room type on its own. People only review and make small tweaks. Setup goes from a task to a glance.",
      detail: [
        "A contextual first-run prompt gives simple prep tips, then guides users in when no map exists yet.",
        "Mapping runs long, so interruptions are explicit: early-exit warnings prevent accidental data loss.",
        "After the scan, people name the floor and adjust labels only for the rare correction.",
      ],
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
      id: "cleaning",
      num: "02",
      feature: "AI Cleaning",
      hmw: "How might we replace a dozen settings with a single, trustworthy tap?",
      approach:
        "Tap Start, and the system reads each room's type and floor material to pick the strategy itself: suction, water, passes. The experience shifts from manual control to something that behaves like an agent working on your behalf.",
      detail: [
        "AI hosting sits at the whole-home cleaning entry, visible and one tap away, not buried in settings.",
        "Advanced parameters move to a separate custom tab, so power users keep full control.",
        "A first-time explainer sets expectations, a live status shows AI is driving, and a post-clean report makes every decision traceable.",
      ],
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
        caption: "One tap, AI picks the strategy",
      },
      extras: [
        {
          kind: "video",
          src: `${IMG}/demo-ai-cleaning-result.mp4`,
          poster: `${IMG}/demo-ai-cleaning-result-poster.jpg`,
          alt: "Cleaning complete — the robot hands back a clear report",
          caption: "Then hands back a report",
        },
      ],
    },
    {
      id: "pet",
      num: "03",
      feature: "Pet-Safe",
      hmw: "How might we make the scariest failure a non-event?",
      approach:
        "We retrained the recognition system to reliably detect pet waste and steer around it mid-clean, turning the worst failure mode into a non-event.",
      before: {
        kind: "photos",
        caption: "Ran over pet waste, smeared across the house",
        items: [
          { src: `${IMG}/before-pet-rug.png`, w: 899, h: 1352, alt: "Pet waste smeared in long streaks across the living-room rug" },
          { src: `${IMG}/before-pet-robot.png`, w: 983, h: 1356, alt: "The robot's underside and roller brush caked with pet waste" },
        ],
      },
      after: {
        kind: "video",
        src: `${IMG}/demo-pet.mp4`,
        poster: `${IMG}/demo-pet-poster.jpg`,
        alt: "Pet-waste avoidance — the robot detects waste and steers around it",
        caption: "Detects waste and avoids it",
      },
      note: {
        title: "An honest trade-off",
        body: "In build, a real constraint surfaced: pet-waste detection and fine-particle cleaning could not run at the same time. Rather than silently pick one, we shipped a clear toggle with an explanation, so people make an informed choice for their own home.",
      },
    },
  ] as Challenge[],

  improvements: {
    intro:
      "Beyond the three headline features, a few more refinements rounded out the X2 experience.",
    items: [
      {
        kicker: "Yiko · Voice",
        title: "Just say it out loud.",
        body: "We refined Yiko, the on-device voice assistant, so people can start a clean, send the robot to a specific room, or pause it, all hands-free without ever opening the app.",
        media: [{ video: `${IMG}/demo-yiko.mp4`, poster: `${IMG}/demo-yiko-poster.jpg` }],
      },
      {
        kicker: "Onboarding",
        title: "Guided custom cleaning.",
        body: "Guided onboarding helps users learn how to add custom cleaning areas, select zones on the map, and turn on AI-assisted cleaning. Contextual instructions sit right in the interface, so advanced features feel approachable for new users.",
        media: [
          { img: `${IMG}/improvement-guided.png`, w: 1332, h: 2896 },
          { img: `${IMG}/improvement-guided-2.png`, w: 1332, h: 2896 },
        ],
      },
      {
        kicker: "Scheduling",
        title: "Smarter scheduling across modes.",
        body: "The scheduling flow now supports full-home, custom, and zone-based cleaning with repeat options and reusable presets. People can plan routines in advance and tailor tasks to different rooms, floors, and household scenarios.",
        media: [
          { img: `${IMG}/improvement-scheduling.png`, w: 1332, h: 2896 },
          { img: `${IMG}/improvement-scheduling-2.png`, w: 1332, h: 2896 },
        ],
      },
    ] as ImprovementItem[],
  },

  nextSteps: {
    statement: "Where this goes next.",
    body: "After launch, we extended the Yiko settings architecture to support growing AI capabilities: voice control with a reviewable interaction history, intelligent error detection that replaces error codes with visual fixes, and smart consumables reminders.",
  },

  takeaways: [
    {
      title: "Start with real household behavior",
      body: "People do not think in cleaning modes. They think in outcomes: make my home clean, and do not bother me. The value came from removing decisions, not adding options.",
    },
    {
      title: "Design for trust, not just automation",
      body: "Autonomy only counts when people believe in it. One catastrophic failure outweighs a hundred smooth runs, so high-risk moments deserve the most care.",
    },
    {
      title: "AI should feel invisible but dependable",
      body: "The win was not more controls, it was fewer. The system makes the call, stays transparent about it, and earns the right to be trusted by default.",
    },
  ] as Card[],
};
