// Structured content for the Bumble Interest Cards case study.
// Mirrors the storytelling + linear layout of the original portfolio:
// Brief → Problem → Goals → Goal Statement → Research → Competitive
// Analysis → Data Analysis → Ideation → Site Map → User Flow → Core
// Interactions → Cross-Platform → Microinteractions → User Testing →
// Next Steps → Reflection. Assets in /public/work/bumble/.
// In copy, *text* between single asterisks renders in the accent color.
const IMG = "/work/bumble";

export type Img = { src: string; w: number; h: number; alt: string; caption?: string };
export type Clip = { src: string; poster: string; w: number; h: number; label?: string; caption?: string };

export const bumble = {
  hero: {
    media: { src: `${IMG}/hero.png`, w: 1773, h: 1208, alt: "Interest Cards across desktop, mobile, web, and Apple Watch" } as Img,
    meta: [
      { label: "Role", value: "Product Designer" },
      { label: "Skills", value: "UX/UI Design · Data Analysis · User Research" },
      { label: "Duration", value: "5 weeks" },
      { label: "Tools", value: "Figma" },
    ],
  },

  brief: "I was tasked with designing an enhanced precision location service for Bumble. The goal was to use precise location data and timely notifications to help users *discover nearby matches faster, create stronger real-world connection opportunities, and increase Premium conversions* — supporting Bumble’s mission to build a safe, meaningful platform for dating, friendship, and networking.",

  problem: "Despite Bumble’s large active user base, most aren’t Premium subscribers. Users struggle with low visibility of location features, insufficient notifications, and an unclear value proposition around location services. The result is missed opportunities for nearby connections — particularly in BFF and Bizz — which reduces engagement and conversion potential.",

  goals: [
    { title: "Increase Premium conversion", body: "Turn location value into a reason to upgrade." },
    { title: "Encourage location opt-ins", body: "Make sharing location feel worth it." },
    { title: "Strengthen trust & safety", body: "Give users — especially women — control." },
  ],

  goalStatement:
    "This Interest Cards feature lets users post and discover location-based activities in real time. It serves BFF and Bizz users who want to meet new people or build local networks — by lowering the barrier to self-expression, surfacing nearby events, and creating more contextual touchpoints for Premium conversion.",

  // "A direct look at the design" — the four core states, shown working.
  preview: {
    label: "A direct look at the design",
    sub: "Before the process, here are the four states the feature has to serve.",
    clips: [
      { src: `${IMG}/flow-create.mp4`, poster: `${IMG}/flow-create.jpg`, w: 438, h: 854, label: "Initiator · Publish" },
      { src: `${IMG}/flow-discover.mp4`, poster: `${IMG}/flow-discover.jpg`, w: 438, h: 854, label: "Receiver · Regular" },
      { src: `${IMG}/flow-premium.mp4`, poster: `${IMG}/flow-premium.jpg`, w: 438, h: 854, label: "Receiver · Premium" },
      { src: `${IMG}/flow-manage.mp4`, poster: `${IMG}/flow-manage.jpg`, w: 438, h: 854, label: "Initiator · Manage" },
    ] as Clip[],
  },

  research:
    "I ran interviews and secondary research with people who had recently relocated, looking at how they start conversations and attend offline meetups. Users felt uncertain approaching strangers through generic profiles, but responded positively when *activity-based context* was provided. Female users emphasized *safety and control* — and many were willing to enable location once they could see a personal benefit.",

  competitive: {
    intro: "I reviewed social, dating, and events apps for patterns in how they use location and activity cues to drive engagement. Four stood out:",
    patterns: [
      "Contextual anchors help people decide faster on joining an event.",
      "Location-based suggestions reliably increase offline interaction.",
      "Trust-building cues — mutual interests, photo previews — make interactions feel safer.",
      "Short, visually striking text posts lower the self-expression barrier.",
    ],
    refs: [
      { src: `${IMG}/ref-events.png`, w: 434, h: 940, alt: "A location-based events app — browsing nearby classes and meetups" },
      { src: `${IMG}/ref-hinge.png`, w: 434, h: 940, alt: "A dating profile with photos and prompts" },
      { src: `${IMG}/ref-sammy.png`, w: 434, h: 940, alt: "A dating profile with detailed about-me attributes" },
      { src: `${IMG}/ref-standouts.png`, w: 434, h: 940, alt: "Bumble Standouts — a curated daily discovery surface" },
      { src: `${IMG}/ref-red.png`, w: 434, h: 940, alt: "A social discovery feed of short, visual posts" },
    ] as Img[],
  },

  data: {
    intro:
      "Behavioral data showed that conversion for BFF and Bizz rises through spring and summer, when people are most open to forming friendships or professional relationships — while dating stays steady year-round. That seasonality informed a context-driven, location-based design.",
    chart: { src: `${IMG}/data-chart.png`, w: 2200, h: 1623, alt: "Conversion rate over time by user group and feature — friends and professional networks rise in spring; dating stays flat" } as Img,
  },

  ideation: {
    intro:
      "The core gaps were a lack of contextual entry points and unclear value around location. I explored *Interest Cards* — short, context-rich posts like “Looking for a running buddy at Tepper Gym this week” — and sketched multiple creation flows, each focused on adding activity, time, and location with minimal friction.",
    img: { src: `${IMG}/wireframes.png`, w: 1600, h: 730, alt: "Hand-drawn wireframes of the publish flow and upsell moments" } as Img,
  },

  siteMap: {
    intro:
      "This site map shows how Interest Cards integrate into Bumble’s existing product structure. Building on the current IA keeps the learning curve low, strengthens engagement, and creates clear entry points for monetization.",
    img: { src: `${IMG}/sitemap.png`, w: 2600, h: 1914, alt: "Site map showing Interest Cards features (tagged ‘new’) layered into Bumble’s existing Profile, People, Add, Chats, and Premium areas" } as Img,
  },

  userFlow: {
    intro: "Two primary flows document the experience: initiators posting cards, and receivers discovering and responding to them.",
    initiator: { src: `${IMG}/flow-create-diagram.png`, w: 2400, h: 602, alt: "Initiator flow: open Bumble → people page → tap + → write text → compose card → edit card → add style & location → preview → publish", caption: "Initiators — posting cards" } as Img,
    receiver: { src: `${IMG}/flow-receiver-diagram.png`, w: 2400, h: 808, alt: "Receiver flow: open Bumble → people page → tap join → Premium? → reveal photo or go premium → chat", caption: "Receivers — discovering cards" } as Img,
  },

  coreInteractions: {
    title: "Core interactions designed to increase conversion",
    intro: "To increase conversion, I embedded a few key interaction points across the initiator and receiver sides — each placed where it removes real friction.",
    img: { src: `${IMG}/states.png`, w: 2400, h: 1820, alt: "Initiator states (1–3) and a receiver state (4), with Premium gating photos and reach" } as Img,
    points: [
      { title: "Photo display control", body: "Users choose whether others can see their photo while creating a card." },
      { title: "Premium rewards", body: "Each photo view by a Premium user earns the host Bumble Coins." },
      { title: "Card templates", body: "Premium unlocks more expressive card styles; free users get the basics." },
      { title: "Discovery range", body: "Free is limited to a 1 km radius; Premium searches without a distance limit." },
      { title: "Photo viewing", body: "Free users can join and chat, but viewing host photos takes Premium — reducing social uncertainty." },
    ],
  },

  crossPlatform: {
    intro: "The prototype was built for a consistent cross-platform experience across mobile and desktop.",
    androidIphone: {
      title: "Android & iPhone",
      body: "The flow is identical across Android and iPhone; only the visual and spacing details are tuned to each platform’s native patterns — corner radius, keyboard height, and screen ratios — for a familiar, seamless feel.",
      clip: { src: `${IMG}/flow-android.mp4`, poster: `${IMG}/flow-android.jpg`, w: 400, h: 828, label: "Android — publish flow" } as Clip,
      img: { src: `${IMG}/platforms.png`, w: 1250, h: 1653, alt: "Annotated iOS vs Android differences — corner radius, keyboard behavior, screen ratios" } as Img,
    },
    desktop: {
      title: "Desktop",
      body: "Desktop offers a larger canvas and more simultaneous control. I consolidated card editing onto a single screen, so users can adjust text, style, and location without page transitions.",
      clip: { src: `${IMG}/flow-desktop.mp4`, poster: `${IMG}/flow-desktop.jpg`, w: 1414, h: 862, label: "Desktop — publish flow" } as Clip,
    },
  },

  userTesting:
    "I tested a click-through Figma prototype over two weeks with *30 BFF and Bizz users* — free and Premium. Average task completion was *under 20 seconds*, with an *87% success rate*. *73%* found card creation intuitive, and *68%* said location recommendations made it easier to act. I folded the feedback into the final design.",

  nextSteps: [
    "Refine cross-platform responsiveness for mobile, desktop, and Apple Watch.",
    "Enhance empty states to proactively guide users toward creating or joining activities.",
    "Optimize notification logic for more relevant, timely recommendations.",
  ],

  reflection:
    "This project let me design a feature that bridges user needs and business goals through intentional interactions. Adapting one experience across platforms took care, and the work reinforced how data-informed decisions and small interaction details shape behavior. With more time, I’d keep collecting behavioral data to refine when — and to whom — a card is worth surfacing.",
};
