// About-page content. Bio + experience pulled from the owner's Wix About page;
// photos curated from her library into public/about/. Swap freely.

export const intro =
  "Hi, I'm Lingkan \u{1F44B} — or call me Wendy. A product designer who loves turning complex ideas into clean, thoughtful experiences.";

export const bio: { heading: string; body: string }[] = [
  {
    heading: "Who I am",
    body: "I come from a background in digital media and design, so I live somewhere between creative thinking and logical problem-solving. I enjoy making sense of messy stuff — data, user flows, product goals — and turning it into something that just feels right and works well.",
  },
  {
    heading: "What I've done",
    body: "I recently finished my M.S. at Carnegie Mellon (HCII · METALS). Before that I was a product designer at Ecovacs, Kwai, and a generative-AI startup, leading 0→1 design across B2B and B2C — from smart cleaning systems to AI data dashboards. Most recently I led UX for Varsity Tutors' parent dashboard.",
  },
  {
    heading: "Why design",
    body: "I've always loved breaking things down to understand how they work. Design is where I get to connect systems thinking with empathy — solving real problems and making ideas feel intuitive and accessible.",
  },
  {
    heading: "Off the clock",
    body: "Design competitions, mentoring designers just getting started, traveling everywhere, chasing whales with my Scottie, and serious food hunting.",
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
    blurb: "Interaction design, learning sciences, and human-AI interaction, applied through CMU research labs. Published at ACM CHI 2026 and ICLS 2026.",
    tags: ["HCI", "Research", "AI + Learning"],
  },
  {
    org: "KuaiShou (Kwai)",
    role: "Product Designer",
    period: "May – Aug 2024",
    blurb: "Designed a B2B growth-intelligence platform for 300+ global guilds, improving data visibility and decision efficiency.",
    tags: ["B2B", "Data Platform", "Growth"],
  },
  {
    org: "Ecovacs Robotics",
    role: "Product Designer",
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
export const spotify = {
  embed: "",
  url: "https://open.spotify.com/collection/tracks",
};

export const wechat = {
  id: "Lynkan",
  note: "Scan to add me on WeChat",
  qr: "/about/wechat-qr.png", // drop your QR here
};

export const xCard = {
  handle: "@lingkan", // TODO: your real X handle
  blurb: "designing AI-powered products ✦",
  prev: "prev @Ecovacs · @Kwai · @Varsity Tutors · CMU",
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
