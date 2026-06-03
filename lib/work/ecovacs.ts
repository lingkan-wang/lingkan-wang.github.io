// Structured content for the Ecovacs case study. Tightened & curated from the
// source Wix case study; images live in /public/work/ecovacs/.

const IMG = "/work/ecovacs";

export type Stat = { value: number; suffix?: string; label: string };
export type Quote = { name: string; quote: string; avatar: string };
export type Numbered = { n: string; title: string; body: string };
export type Opportunity = { title: string; body: string };
export type Feature = { title: string; body: string };
export type Shot = { src: string; alt: string; kind: "phone" | "plate" };
export type Pillar = {
  icon: string;
  kicker: string;
  title: string;
  whatIsIt: string;
  features: Feature[];
  shots: Shot[];
};

export const ecovacs = {
  hero: {
    image: `${IMG}/hero.webp`,
    imageAlt: "Four DEEBOT X2 app screens — mapping, AI Smart Hosting, logs, and Lab features",
    meta: [
      { label: "Role", items: ["AI Product Designer"] },
      {
        label: "Team",
        items: ["Product Design", "Software Eng", "Machine Learning", "Hardware R&D", "Product Mgmt"],
      },
      {
        label: "Skills",
        items: [
          "AI Workflow Design",
          "Research Synthesis",
          "Interaction Design",
          "System Logic",
          "Design-to-Engineering Handoff",
          "Cross-functional",
        ],
      },
      { label: "Timeline", items: ["May–Aug 2024", "12 weeks"] },
    ],
  },

  brief:
    "Under rising customer complaints and growing expectations for smart-home automation, I was tasked with optimizing the DEEBOT X2 autonomy experience at ECOVACS Robotics. The X2 already had advanced mapping and obstacle recognition, but users hit persistent friction: complex manual map editing, confusing parameters, and failures avoiding high-risk obstacles like pet waste. I focused on bridging the gap between technical capability and *perceived* intelligence — an AI hosting mode built on floor-material recognition, simpler mapping, and better high-risk detection — to cut cognitive load and build trust in autonomy.",

  research: {
    intro:
      "To find where autonomy breaks down in real use, we combined customer-complaint analysis, App Store review mining, and interviews with pet owners and first-time users.",
    stats: [
      { value: 38, suffix: "%", label: "of negative feedback tied to mapping confusion & manual editing" },
      { value: 72, suffix: "%", label: "of testers hesitated or changed cleaning settings before starting" },
      { value: 33, suffix: "%", label: "of runs failed to avoid high-risk obstacles in pet-home tests" },
    ] as Stat[],
    ownership: [
      "Defined success metrics, AI behavior guardrails, and one shared product contract",
      "Turned usability findings into a prioritized roadmap, MVP scope, and acceptance criteria",
      "Partnered with Robotics/ML/Eng to align UI with real robot constraints, model confidence, and failure modes",
      "Shipped an Autopilot system that cut configuration without sacrificing safety or cleaning quality",
    ],
  },

  voices: [
    {
      name: "Robert Rose",
      quote: "I thought it was automatic, but I still had to redraw the map myself. It feels more manual than smart.",
      avatar: `${IMG}/avatar-1.jpg`,
    },
    {
      name: "Alex Smith",
      quote: "There are too many cleaning settings. I don’t know which one to choose.",
      avatar: `${IMG}/avatar-2.jpg`,
    },
    {
      name: "Jessica Davis",
      quote: "If it runs over pet waste, that’s a disaster. I’d completely lose trust.",
      avatar: `${IMG}/avatar-3.jpg`,
    },
  ] as Quote[],

  problems: [
    {
      n: "01",
      title: "Autonomy still feels manual",
      body: "Users frequently edit maps after generation. Setup introduces hesitation and erodes confidence in the system’s intelligence from the very start.",
    },
    {
      n: "02",
      title: "Too many decisions for the user",
      body: "Cleaning modes and suction levels require manual selection, but users lack clarity on how to choose — adding cognitive load and weakening the “one-click” promise.",
    },
    {
      n: "03",
      title: "High-risk failures break trust",
      body: "In pet households, failing to avoid pet waste is catastrophic. Even occasional errors sharply damage trust in autonomous cleaning.",
    },
  ] as Numbered[],

  mission:
    "How might we make autonomy feel effortless and reliable — by reducing manual intervention, simplifying decisions, and strengthening trust in high-risk moments?",

  opportunities: [
    {
      title: "Make mapping feel truly automatic",
      body: "Auto-mapping existed, but users still split rooms, renamed spaces, and fixed boundaries. Reduce those corrections so mapping feels confident on its own — especially for first-timers who expect plug-and-play, not supervision.",
    },
    {
      title: "Reduce decision fatigue in setup",
      body: "Instead of asking users to configure the robot, shift the decision to the system — letting AI read floor types and usage patterns to recommend or auto-apply the right settings.",
    },
    {
      title: "Design for trust in high-risk moments",
      body: "Pet-waste failures damaged trust. Prioritize high-risk object recognition and clear system feedback so the robot feels safe and dependable, not unpredictable.",
    },
  ] as Opportunity[],

  pillars: [
    {
      icon: `${IMG}/icon-settings.png`,
      kicker: "Solution 01",
      title: "AI Smart Hosting",
      whatIsIt:
        "A one-tap intelligent cleaning mode. Instead of configuring suction, water flow, or room selection, the system reads spatial data, floor types, obstacles, and past patterns in real time to decide the optimal strategy itself.",
      features: [
        {
          title: "AI hosting as the default",
          body: "The AI toggle sits at the whole-home cleaning entry — visible and accessible, not buried in settings. One tap applies intelligent defaults across every room.",
        },
        {
          title: "Flexible control for advanced users",
          body: "Advanced parameters move to a separate custom tab to keep the primary flow clean; users can still draw targeted zones on the map when they want to intervene.",
        },
        {
          title: "Making AI visible and trustworthy",
          body: "A first-time explainer sets expectations, a live status shows AI is driving the clean, and post-clean summaries — route, dirt map, metrics — make decisions traceable.",
        },
      ],
      shots: [
        { src: `${IMG}/hosting-intro.jpg`, alt: "AI Smart Hosting first-time explainer", kind: "phone" },
        { src: `${IMG}/hosting-cleaning.png`, alt: "Whole-home cleaning with draw-zone controls", kind: "phone" },
        { src: `${IMG}/hosting-progress.webp`, alt: "DEEBOT X2 detecting debris on a rug during an AI-hosted clean", kind: "plate" },
      ],
    },
    {
      icon: `${IMG}/icon-map.png`,
      kicker: "Solution 02",
      title: "AI Auto Mapping",
      whatIsIt:
        "An intelligent spatial-recognition system that scans, understands, and generates a structured floor plan on the first run — detecting walls, room boundaries, and layout in real time, with no manual setup.",
      features: [
        {
          title: "Guided first-time mapping",
          body: "A contextual pop-up gives simple prep tips (clear clutter, keep doors open); a clear entry point guides users into the flow when no map exists yet.",
        },
        {
          title: "Transparent pause & stop",
          body: "Mapping runs long, so interruptions are handled explicitly: early-exit warnings prevent accidental data loss, and pause states say whether progress will continue.",
        },
        {
          title: "Post-mapping refinement",
          body: "Users name the floor for clarity in multi-floor homes, and can adjust room labels and layout for minor corrections.",
        },
      ],
      shots: [
        { src: `${IMG}/mapping-rooms.png`, alt: "Automatic room recognition and labels", kind: "phone" },
        { src: `${IMG}/mapping-split.png`, alt: "Room split and boundary editing", kind: "phone" },
        { src: `${IMG}/mapping-screens.webp`, alt: "DEEBOT X2 scanning a room with laser navigation", kind: "plate" },
      ],
    },
    {
      icon: `${IMG}/icon-paw.png`,
      kicker: "Solution 03",
      title: "Pet Mode",
      whatIsIt:
        "An experimental Lab feature for homes with pets. It prioritizes risk avoidance — enhancing high-risk object detection and adjusting cleaning behavior to prevent contamination.",
      features: [
        {
          title: "Clear conflict feedback",
          body: "Pet Mode and Granular Dirt Mode optimize for opposite goals — safety vs. particle pickup — so a mutual-exclusion toggle and a clear dialog explain the trade-off instead of silently overriding the user.",
        },
      ],
      shots: [{ src: `${IMG}/petmode.jpg`, alt: "Pet Mode onboarding for homes with pets", kind: "phone" }],
    },
  ] as Pillar[],

  productOverview: {
    body: "Designing the app meant designing to the hardware. I worked from the X2’s real form factor — its brushes, mopping pads, and sensor array — so on-screen behavior matched what the robot could actually sense and do.",
    shots: [
      { src: `${IMG}/hardware-diagram.webp`, alt: "DEEBOT X2 components and sensor layout", kind: "plate" },
      { src: `${IMG}/product.webp`, alt: "DEEBOT X2 Omni", kind: "plate" },
    ] as Shot[],
  },

  impact: [
    { value: 93, suffix: "%", label: "reduction in setup time with one-tap AI cleaning" },
    { value: 65, suffix: "%", label: "decrease in manual interactions" },
    { value: 92, suffix: "%", label: "preferred AI Smart Hosting over manual mode" },
    { value: 50, suffix: "%", label: "improvement in purchase intent" },
  ] as Stat[],

  nextSteps:
    "After launch, we extended the YIKO settings architecture to support growing AI capabilities — voice control with a reviewable interaction history, intelligent error detection that replaces codes with visual fixes, and smart consumables reminders.",

  takeaways: [
    {
      title: "Start with real household behavior",
      body: "People don’t think in cleaning modes — they think in outcomes: “make my home clean, and don’t bother me.” The value came from removing decisions, not adding options.",
    },
    {
      title: "Design for trust, not just automation",
      body: "Even capable AI won’t be trusted unless it feels safe. Pet-waste avoidance was an emotional safety requirement; clear feedback turned “is it safe?” into “I can walk away.”",
    },
    {
      title: "AI should feel invisible but dependable",
      body: "The best moments were when users didn’t notice the system thinking — only that the tasks disappeared. Great home automation is quiet confidence: “it just happens.”",
    },
  ] as Numbered[],
} as const;
