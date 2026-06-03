export const site = {
  name: "Lingkan Wang",
  shortName: "Wang",
  role: "AI Design Engineer",
  intro:
    "AI product designer and design engineer building agent-assisted workflows, design systems, and human-centered AI products from research to working prototype.",
  previously: ["CMU HCII", "Ecovacs Robotics", "KuaiShou (Kwai)", "Varsity Tutors"],
  email: "wanglingkan614@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/lingkanwang/",
    x: "https://x.com/WangLingkan",
    // kept so the (untouched) command palette still compiles; not shown in the header
    instagram: "https://www.instagram.com/wanglingkan183/",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "AI + Code", href: "/coded" },
    { label: "Research", href: "/research" },
    { label: "About", href: "/about" },
  ],
} as const;
