// Structured content for the Bumble Interest Cards case study.
// Product-led narrative: hero → problem → insight (data-backed) → concept →
// how it works (real flow demos) → conversion → microinteractions → validation
// → takeaways. Assets in /public/work/bumble/.
const IMG = "/work/bumble";

export type Meta = { label: string; items: string[] };
export type Card = { title: string; body: string };
export type Img = { src: string; w: number; h: number; alt: string; caption?: string };
export type Clip = { src: string; poster: string; w: number; h: number; label: string; caption: string };

export const bumble = {
  hero: {
    kicker: "Bumble BFF & Bizz · 0→1 concept",
    headline: "Interest Cards — turning everyday plans into low-pressure ways to meet.",
    sub: "Most of Bumble isn’t on Premium, and its location features are easy to miss. Over five weeks I designed a location-based discovery layer that lets people broadcast what they’re up to — and a Premium moment that feels earned, not nagged.",
    meta: [
      { label: "Role", items: ["Product designer", "End-to-end"] },
      { label: "Timeline", items: ["5 weeks", "2025"] },
      { label: "Platform", items: ["iOS · Android", "Web"] },
      { label: "Tools", items: ["Figma"] },
    ] as Meta[],
    media: { src: `${IMG}/hero.png`, w: 2000, h: 1291, alt: "Interest Cards shown on desktop and mobile — a card reading ‘Looking for a running buddy at Tepper Gym this week’" } as Img,
  },

  problem: {
    intro:
      "Bumble has a huge, active community — but in BFF and Bizz, the people most worth meeting are often the ones who are literally nearby: the runner at the same gym, the founder at the same coworking space. Three things got in the way.",
    cards: [
      { title: "Premium is invisible", body: "Most users never see why Premium is worth it — the value shows up too late, as a wall rather than a benefit." },
      { title: "No reason to reach out", body: "A cold profile gives you nothing to say. People hesitate to make the first move without a shared, in-the-moment context." },
      { title: "Location feels risky", body: "Sharing location is a hard yes to ask for — especially for women — unless the personal upside is obvious and stays in their control." },
    ] as Card[],
  },

  insight: {
    intro:
      "I interviewed three people who’d recently relocated and scanned how dating, social, and events apps handle discovery. Three findings shaped the direction.",
    cards: [
      { title: "Context beats profiles", body: "People respond easily when a shared activity gives them something concrete to talk about — far more than to a profile alone." },
      { title: "Safety is the gate", body: "Several said they’d happily share location, but only when the benefit was clear and they controlled exactly what they revealed." },
      { title: "Intent is seasonal", body: "Friends and professional connections convert most in spring and summer, when people are most open to meeting in person." },
    ] as Card[],
    chart: { src: `${IMG}/data-chart.png`, w: 2200, h: 1623, alt: "Conversion rate over time by user group and feature — friends and professional networks rise in spring, dating stays flat", caption: "Behavioral data: BFF and Bizz conversion climbs seasonally, while dating holds steady — so the feature should ride that wave with timely nudges." } as Img,
    refs: [
      { src: `${IMG}/ref-standouts.png`, w: 434, h: 940, alt: "Bumble Standouts — reviewed in the competitive scan" },
      { src: `${IMG}/ref-events.png`, w: 434, h: 940, alt: "A location-based events app — reviewed in the competitive scan" },
      { src: `${IMG}/ref-hinge.png`, w: 434, h: 940, alt: "A dating profile — reviewed in the competitive scan" },
    ] as Img[],
  },

  concept: {
    intro:
      "Interest Cards are short, location-anchored posts — “Looking for a running buddy at Tepper Gym this week.” You publish what you’re up to; people nearby discover it and join. The whole thing slots into Bumble’s existing structure, so there’s almost nothing new to learn.",
    states: { src: `${IMG}/states.png`, w: 2400, h: 1820, alt: "Four key states: an initiator publishes a card (1–3) and a receiver discovers it (4), with Premium gating photos and reach", caption: "The core loop in four states — publish, then discover, with Premium unlocking photos and reach." } as Img,
    sitemap: { src: `${IMG}/sitemap.png`, w: 2600, h: 1914, alt: "Site map showing Interest Cards features (tagged ‘new’) layered into Bumble’s existing Profile, People, Add, Chats, and Premium areas", caption: "A new layer, not a new app — the ‘new’ surfaces clip into Bumble’s existing information architecture." } as Img,
  },

  // How it works — real flow recordings (already device-framed).
  flows: {
    intro:
      "Here’s the feature working end to end, across the four roles it has to serve.",
    items: [
      { src: `${IMG}/flow-create.mp4`, poster: `${IMG}/flow-create.jpg`, w: 438, h: 854, label: "Create", caption: "Write a card, pick a style and place, choose whether to show your photo, publish." },
      { src: `${IMG}/flow-discover.mp4`, poster: `${IMG}/flow-discover.jpg`, w: 438, h: 854, label: "Discover · free", caption: "Browse nearby cards with trust cues — shared schools, mutual interests — up front." },
      { src: `${IMG}/flow-premium.mp4`, poster: `${IMG}/flow-premium.jpg`, w: 438, h: 854, label: "Unlock · Premium", caption: "Reveal a host’s photo and reach beyond your immediate block." },
      { src: `${IMG}/flow-manage.mp4`, poster: `${IMG}/flow-manage.jpg`, w: 438, h: 854, label: "Manage", caption: "See who’s interested and jump into a one-to-one or group chat." },
    ] as Clip[],
    desktop: { src: `${IMG}/flow-desktop.mp4`, poster: `${IMG}/flow-desktop.jpg`, w: 1414, h: 862, label: "Desktop", caption: "On the web, card editing collapses onto one canvas — text, style, and location without page jumps." } as Clip,
    crossPlatform: {
      note: "iOS and Android share one flow, tuned per platform — corner radii, keyboard height, and safe areas. The Android build keeps the same model end to end.",
      android: { src: `${IMG}/flow-android.mp4`, poster: `${IMG}/flow-android.jpg`, w: 400, h: 828, label: "Android", caption: "The publish flow on Android." } as Clip,
      platforms: { src: `${IMG}/platforms.png`, w: 1250, h: 1653, alt: "Annotated iOS vs Android differences — corner radius, keyboard behavior, screen ratios", caption: "Per-OS adjustments: corner radius, keyboard height, and screen ratios." } as Img,
    },
  },

  conversion: {
    intro:
      "Rather than gate the whole feature, I put Premium where it removes real friction — seeing who you’re about to meet, and reaching past your immediate block. Each upgrade trades on a clear, felt benefit, so the moment converts without feeling coercive.",
    rows: [
      { feature: "Discovery range", free: "1 km radius", premium: "Unlimited" },
      { feature: "Host photos", free: "Hidden", premium: "Revealed" },
      { feature: "Card styles", free: "Basic", premium: "Expressive templates" },
      { feature: "Photo views", free: "—", premium: "Earn Bumble Coins per view" },
    ],
    gate: [
      { src: `${IMG}/premium-ios.png`, w: 622, h: 1200, alt: "iOS — ‘Go premium to reveal pictures’ on a blurred host photo", caption: "The gate on iOS." },
      { src: `${IMG}/premium-android.png`, w: 626, h: 1200, alt: "Android — the same premium reveal moment", caption: "…and on Android." },
    ] as Img[],
    diagram: { src: `${IMG}/flow-receiver-diagram.png`, w: 2400, h: 808, alt: "Receiver flow: open Bumble → people page → tap join → Premium? → reveal photo or go premium → chat", caption: "Where the upgrade sits in the receiver’s journey — at the exact moment curiosity peaks." } as Img,
  },

  microinteractions: {
    intro:
      "The details are where the feature earns trust. Five interactions, each with one job.",
    items: [
      { src: `${IMG}/mi-browse.mp4`, poster: `${IMG}/mi-browse.jpg`, w: 400, h: 390, label: "Browse cards", caption: "The arrow slides as its background brightens — a quiet hint you can move between cards." },
      { src: `${IMG}/mi-join.mp4`, poster: `${IMG}/mi-join.jpg`, w: 400, h: 544, label: "Join", caption: "Two rings drift together — a small, playful symbol of connection." },
      { src: `${IMG}/mi-confirm.mp4`, poster: `${IMG}/mi-confirm.jpg`, w: 400, h: 520, label: "Confirm", caption: "A button fills with yellow on hover, so the tap feels heard before it lands." },
      { src: `${IMG}/mi-select.mp4`, poster: `${IMG}/mi-select.jpg`, w: 368, h: 722, label: "Pick a chat", caption: "Hovering a row lifts it onto a clean surface." },
      { src: `${IMG}/mi-publish.mp4`, poster: `${IMG}/mi-publish.jpg`, w: 400, h: 258, label: "Published", caption: "A checkmark bursts to confirm the card went live." },
    ] as Clip[],
  },

  validation: {
    intro: "I ran click-through prototype tests with 30 BFF and Bizz users — free and Premium — over two weeks.",
    stats: [
      { value: "87%", label: "task success" },
      { value: "<20s", label: "to create a card" },
      { value: "73%", label: "found it intuitive" },
    ],
    note: "Most of the friction that remained clustered around first-run onboarding — people wanted a clearer first step before the map filled with cards.",
  },

  takeaways: [
    { title: "Safety and monetization are the same design", body: "The controls that earn a location opt-in — choosing what you reveal, to whom — are the very things that make Premium worth paying for. Designing one well designs the other." },
    { title: "Context is the cheapest growth lever", body: "An activity-anchored prompt did more to lower the barrier to a first message than any profile change could. Give people something to react to, not just someone." },
    { title: "Earn the upgrade, don’t wall it", body: "Placing Premium at the peak of curiosity — the blurred photo of someone you already want to meet — converts without feeling coercive." },
  ] as Card[],
};
