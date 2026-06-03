// About-page content. Bio + experience pulled from the owner's Wix About page;
// photos curated from her library into public/about/. Swap freely.

export const intro =
  "Hi, I'm Lingkan \u{1F44B} — or call me Wendy. A product builder who loves turning complex ideas into clean, thoughtful experiences.";

export type Keyword = { word: string; emoji: string; href: string; external?: boolean };
export const bio: { heading: string; body: string; keyword?: Keyword }[] = [
  {
    heading: "Who I am",
    body: "I'm a product builder who came up through digital media and design, so I sit between the creative side and the figure-it-out side. What I like most is taking something messy (a pile of data, a tangled flow, a fuzzy product goal) and shaping it into something that feels right and actually works. Alongside that, I've always done HCI research, digging into how people learn, collaborate, and interact with the things we build. That habit of taking things apart to see how they tick is pretty much why I landed in design, where systems thinking and empathy get to work on the same problem.",
    keyword: { word: "research", emoji: "\u{1F4C4}", href: "/research" },
  },
  {
    heading: "Where I came from",
    body: "I just finished my master's at Carnegie Mellon, in the HCII METALS program. Before that I designed products at Ecovacs, Kwai, and a generative-AI startup, usually as the person taking things from zero to one across both B2B and B2C, and I picked up a fair few design awards along the way. The work spanned smart-home cleaning systems and AI data dashboards. Most recently I led the UX for Varsity Tutors' parent dashboard.",
    keyword: {
      word: "awards",
      emoji: "\u{1F3C6}",
      href: "https://docs.google.com/document/d/16h6wR99qktZfZvx2X5az3UGnWGP1qoOB2Yx3bzt8_xU/edit",
      external: true,
    },
  },
  {
    heading: "Where I'm headed",
    body: "Right now I'm looking for a full-time role where I can keep doing this. The direction I'm most drawn to is design engineering: I want to design something and then build it myself, so the craft survives all the way to the real screen. I still love the early, build-it-from-scratch stage of a product, and further out I'd like to grow into leading design and bringing other designers up with me. This site is part of that. I coded it myself.",
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
    role: "Product Builder",
    period: "Jan – Aug 2025",
    blurb: "Led 0→1 design of a parent-facing learning dashboard from 100+ surveys and interviews; iterated through build–measure–learn cycles.",
    tags: ["EdTech", "0→1", "User Insights"],
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
    role: "Product Builder",
    period: "May – Aug 2024",
    blurb: "Designed a B2B growth-intelligence platform for 300+ global guilds, improving data visibility and decision efficiency.",
    tags: ["B2B", "Data Platform", "Growth"],
  },
  {
    org: "Ecovacs Robotics",
    role: "Product Builder",
    period: "Mar – May 2024",
    blurb: "Designed AI Smart Hosting and real-time feedback systems, simplifying complex automation into intuitive user experiences.",
    tags: ["B2C", "Smart Home", "AI Product"],
  },
  {
    org: "Taimer.ai",
    role: "Product Builder",
    period: "Feb – Sep 2023",
    blurb: "Built a 0→1 AIGC interior-design product across web and mobile, defining strategy, UX, and monetization.",
    tags: ["0→1", "AIGC", "Consumer"],
  },
];

export const languages = [
  { flag: "\u{1F1E8}\u{1F1F3}", name: "Chinese", level: "Native" },
  { flag: "\u{1F1FA}\u{1F1F8}", name: "English", level: "Fluent" },
];

export const now = "Recently graduated from CMU — open to product design & design-engineering roles.";
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
  bio: "Product Builder ✦ build something interesting",
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
