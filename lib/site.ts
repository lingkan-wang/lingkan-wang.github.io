export const site = {
  name: "Lingkan Wang",
  shortName: "Wang",
  role: "Product Designer",
  intro:
    "Product designer with 3 years of experience building AI-powered B2C products. I believe great products come from understanding users and turning insights into action.",
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
    { label: "Coded Work", href: "/coded" },
    { label: "About", href: "/about" },
  ],
} as const;
