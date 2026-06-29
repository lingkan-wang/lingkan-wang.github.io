// About-page content. Bio + experience pulled from the owner's Wix About page;
// photos curated from her library into public/about/. Swap freely.

export const intro =
  "Hi, I'm Lingkan \u{1F44B} — or call me Wendy. A product builder who loves turning complex ideas into clean, thoughtful experiences.";

export type Keyword = { word: string; href: string; external?: boolean; emoji?: string; logo?: string; logoEm?: number };
export const bio: { heading: string; body: string; keywords?: Keyword[] }[] = [
  {
    heading: "Who I am",
    body: "I'm a product builder who came up through digital media and design, so I sit between the creative side and the figure-it-out side. What I like most is taking something messy (a pile of data, a tangled flow, a fuzzy product goal) and shaping it into something that feels right and actually works. Alongside that, I've always done HCI research, digging into how people learn, collaborate, and interact with the things we build. That habit of taking things apart to see how they tick is pretty much why I landed in design, where systems thinking and empathy get to work on the same problem.",
    keywords: [{ word: "HCI research", emoji: "\u{1F4C4}", href: "/research" }],
  },
  {
    heading: "Where I came from",
    body: "I just finished my master's at Carnegie Mellon, in the HCII METALS program. Before that I designed products at Ecovacs, Kwai, and a generative-AI startup, usually as the person taking things from zero to one across both B2B and B2C, and I picked up a fair few design awards along the way. The work spanned smart-home cleaning systems and AI data dashboards. Most recently I led the UX for Varsity Tutors' parent dashboard.",
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

// Retro media-player playlist for the About bento. Prev / next cycle through these
// tracks; the device screen shows the current track's `cover`, and Play streams the
// 30s `src` preview. Cover art (image-cdn-*.spotifycdn.com) and audio (p.scdn.co) are
// hot-linked straight from Spotify's own CDN — served by Spotify, not re-hosted here.
// `href` opens the full track on Spotify. To change the set, swap these from a track's
// Spotify embed page (open.spotify.com/embed/track/<id> → audioPreview.url) + oEmbed.
export type Track = { title: string; artist: string; cover: string; src: string; href: string };

const sp = (id: string) => `https://open.spotify.com/track/${id}`;

export const playlist: Track[] = [
  { title: "Alone Again (Naturally)", artist: "Gilbert O'Sullivan", cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e028abe680fa0e457ec3e75d46d", src: "https://p.scdn.co/mp3-preview/e46728130abf301569ad71819ced73253d78ca12", href: sp("54pvEYFocTlvIAQOfXSjqV") },
  { title: "Reality", artist: "Vladimir Cosma, Richard Sanderson", cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e020e27181dac939d599730bed0", src: "https://p.scdn.co/mp3-preview/a3fd1eb329704500f231961b4731d5c2bdd32995", href: sp("1gci2QBGH5nzPWePv6ATom") },
  { title: "十年", artist: "Eason Chan", cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02822b40ed87abd5054b48f0aa", src: "https://p.scdn.co/mp3-preview/dad366d4bfb6b1ec4f2a2853d4939e7918433bc5", href: sp("25pWemriUQVrZ3yIiS2IBf") },
  { title: "命に嫌われている。", artist: "majiko", cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02ba6d07e00a59d8a88a9cab35", src: "https://p.scdn.co/mp3-preview/8fb18c1d540872b1c87c66d1f12d5b44c312abb7", href: sp("2lXu7SNGIKHJ8EV2EetYFa") },
  { title: "一格格", artist: "Janice Vidal", cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0285210004c1befc58facac950", src: "https://p.scdn.co/mp3-preview/d52228a9caa28748f699676896554e15f381f71a", href: sp("5Hmldq1s1Ap8cSZBXpZquV") },
  { title: "Lugu Lugu Kan-Ibi", artist: "David Darling & The Wulu Bunun", cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02e9e718c57ceefe9569a0bb17", src: "https://p.scdn.co/mp3-preview/b73e853d07500c321209bdd96b48c21c37c92111", href: sp("089GXdPoG2srzax51gQptD") },
  { title: "Stand By Me", artist: "Ben E. King", cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02c155b31ab9e86a3d96359811", src: "https://p.scdn.co/mp3-preview/6fb6a44b929cf182198629dc2443c20206cfcd9c", href: sp("7jmHyHMEqm9MJWiMAneF05") },
  { title: "Vienna", artist: "Billy Joel", cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e026ce61113662ecf693b605ee5", src: "https://p.scdn.co/mp3-preview/20063b69f912e042929de74af0b77271ec3376c5", href: sp("4U45aEWtQhrm8A5mxPaFZ7") },
  { title: "Can't Help Falling in Love", artist: "Elvis Presley", cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02b184226408f981e3dd17c606", src: "https://p.scdn.co/mp3-preview/ddb3e782f04a42c4380d839e23a7e675a5b1f9ec", href: sp("44AyOl4qVkzS48vBsbNXaC") },
  { title: "Cordeiro De Nanã", artist: "Os Tincoãs", cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02099dde456cd1d70b5c47a66e", src: "https://p.scdn.co/mp3-preview/abd562ab64fdf6a039f3a35627e8e7efb18854ea", href: sp("59HAcR0hVejI7Od0kgibFg") },
];

// "Liked Songs" (open.spotify.com/collection/tracks) is private — it can't be read or
// embedded for visitors without each one logging into the owner's account — so the
// player uses the explicit list above instead.
export const playlistHref = "https://open.spotify.com/collection/tracks";

// Back-compat: earlier code referenced a single featured `track`.
export const track = playlist[0];

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
