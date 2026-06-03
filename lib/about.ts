// About-page content. Bio + experience pulled from the owner's Wix About page;
// photos curated from her library into public/about/. Swap freely.

export const intro =
  "Hi, I'm Lingkan — or call me Wendy. I design AI products and build the workflows, prototypes, and system logic that help teams ship them.";

export type Keyword = { word: string; href: string; external?: boolean; emoji?: string; logo?: string; logoEm?: number };
export const bio: { heading: string; body: string; keywords?: Keyword[] }[] = [
  {
    heading: "Who I am",
    body: "I'm an AI product designer and design engineer who likes working where ambiguity turns into systems. I use research to understand the user problem, Figma to shape the experience, and AI coding tools to turn ideas into working prototypes, agent flows, and reusable components. The throughline is simple: make complex AI feel useful, controllable, and ready for real product teams.",
    keywords: [{ word: "research", emoji: "\u{1F4C4}", href: "/research" }],
  },
  {
    heading: "Where I came from",
    body: "I just finished my master's at Carnegie Mellon, in the HCII METALS program. Before that I designed products at Ecovacs, Kwai, and a generative-AI startup, usually as the person taking zero-to-one ideas into testable systems across B2B and B2C. The work spans smart-home automation, AI data dashboards, Varsity Tutors' progress intelligence, and AIGC creation tools.",
    keywords: [
      { word: "HCII", logo: "/about/logos/hcii.png", href: "https://hcii.cmu.edu/", external: true, logoEm: 2.5 },
      { word: "Ecovacs", logo: "/about/logos/ecovacs.png", href: "https://www.ecovacs.com/us", external: true },
      { word: "Kwai", logo: "/about/logos/kwai.png", href: "https://www.kwai.com/", external: true },
      { word: "awards", emoji: "\u{1F3C6}", href: "https://docs.google.com/document/d/16h6wR99qktZfZvx2X5az3UGnWGP1qoOB2Yx3bzt8_xU/edit", external: true },
      { word: "Varsity Tutors", logo: "/about/logos/varsity.png", href: "https://www.varsitytutors.com/", external: true, logoEm: 2.5 },
    ],
  },
  {
    heading: "Where I'm headed",
    body: "Right now I'm looking for a design engineering role focused on AI workflows: defining how agents, skills, tools, and design systems fit into a team's daily work. I want to keep designing from user insight, but also prototype the workflow logic, document the system clearly, and help other designers adopt AI tools with good judgment.",
  },
];

export type Job = {
  org: string;
  role: string;
  period: string;
  blurb: string;
  tags: string[];
};

export const experience: Job[] = [
  {
    org: "Varsity Tutors",
    role: "AI Product Designer",
    period: "Jan – Aug 2025",
    blurb: "Led MVP design for an AI-assisted parent dashboard that turns tutoring-session data into progress evidence and next-step recommendations.",
    tags: ["AI Workflow", "EdTech", "MVP"],
  },
  {
    org: "Carnegie Mellon University",
    role: "M.S. · HCII METALS",
    period: "Aug 2024 – Dec 2025",
    blurb: "Interaction design, learning sciences, and human-AI interaction, applied through CMU research labs, with work under review at CHI and EC-TEL 2026.",
    tags: ["HCI", "Research", "AI + Learning"],
  },
  {
    org: "KuaiShou (Kwai)",
    role: "Product Designer",
    period: "May – Aug 2024",
    blurb: "Designed a decision workflow for 300+ global guilds, turning scattered live-streaming metrics into risk alerts and action-ready dashboards.",
    tags: ["Data System", "Workflow", "Growth"],
  },
  {
    org: "Ecovacs Robotics",
    role: "AI Product Designer",
    period: "Mar – May 2024",
    blurb: "Designed AI Smart Hosting and real-time robot feedback, aligning mobile UX with model confidence, hardware constraints, and trust cues.",
    tags: ["B2C AI", "Robotics", "System Logic"],
  },
  {
    org: "Taimer.ai",
    role: "Founding Product Designer",
    period: "Feb – Sep 2023",
    blurb: "Built a human-in-the-loop AIGC interior-design platform with model fine-tuning flows, generation controls, and designer review loops.",
    tags: ["AIGC", "Human-in-loop", "0→1"],
  },
];

export const languages = [
  { flag: "\u{1F1E8}\u{1F1F3}", name: "Chinese", level: "Native" },
  { flag: "\u{1F1FA}\u{1F1F8}", name: "English", level: "Fluent" },
];

export const now = "Recently graduated from CMU — focused on AI design engineering and agent-assisted product workflows.";
export const location = "United States";

// Spotify: "Liked Songs" (/collection/tracks) is private and can't be embedded for
// visitors. Leave `embed` empty to show a link card; set it to a PUBLIC playlist embed
// (open.spotify.com/embed/playlist/<id>) to render an inline player.
// Featured track for the custom (Emil-style) music player — cover + 30s preview
// are hosted locally in public/about/. Swap these to feature a different song.
export const track = {
  title: "若生命等候",
  artist: "黄凯芹",
  cover: "/about/track-cover.jpg",
  src: "/about/track.mp3",
  href: "https://open.spotify.com/playlist/3qoECMXj5TWW5k3pZigU2U",
};

export const wechat = {
  id: "Lynkan",
  note: "Scan to add me on WeChat",
  qr: "/about/wechat-qr.png", // drop your QR here
};

export const xCard = {
  handle: "@WangLingkan",
  // matches the real X profile
  bio: "AI Design Engineer ✦ designing and coding product workflows",
  meta: "📍 San Jose · joined Nov 2022",
  cta: "Follow on X",
};

export type Category = "people" | "landscape" | "food" | "pets";
export const galleryCategories: { key: Category; label: string }[] = [
  { key: "people", label: "People" },
  { key: "landscape", label: "Places" },
  { key: "food", label: "Food" },
  { key: "pets", label: "Pups" },
];

export const gallery: { src: string; category: Category; alt: string }[] = [
  { src: "/about/portrait.jpg", category: "people", alt: "Hi 👋" },
  { src: "/about/people/1.jpg", category: "people", alt: "Graduation day" },
  { src: "/about/people/2.jpg", category: "people", alt: "A candid moment" },
  { src: "/about/people/3.jpg", category: "people", alt: "Portrait" },
  { src: "/about/people/4.jpg", category: "people", alt: "Out and about" },
  { src: "/about/landscape/1.jpg", category: "landscape", alt: "Northern lights" },
  { src: "/about/landscape/2.jpg", category: "landscape", alt: "Yosemite falls" },
  { src: "/about/landscape/3.jpg", category: "landscape", alt: "Bryce Canyon" },
  { src: "/about/landscape/4.jpg", category: "landscape", alt: "Yosemite valley" },
  { src: "/about/food/1.jpg", category: "food", alt: "Breakfast spread" },
  { src: "/about/food/2.jpg", category: "food", alt: "A plated dish" },
  { src: "/about/food/3.jpg", category: "food", alt: "Food hunting" },
  { src: "/about/food/4.jpg", category: "food", alt: "Brunch" },
  { src: "/about/pets/1.jpg", category: "pets", alt: "My Scottie" },
  { src: "/about/pets/2.jpg", category: "pets", alt: "Good pup" },
  { src: "/about/pets/3.jpg", category: "pets", alt: "Pups" },
];
