// HCI / learning-sciences research. Cards mirror the Coded Work layout:
// a first-page paper preview on top, then title + venue + tags + summary.
export type Paper = {
  title: string;
  venue: string; // e.g. "CHI 2026"
  year: number;
  status: "Under review" | "Published";
  tags: string[];
  summary: string;
  cover: string;
  href?: string; // optional link to the paper / project
};

export const research: Paper[] = [
  {
    title: "EdTech for Last Mile Learners in the Global South",
    venue: "CHI",
    year: 2026,
    status: "Under review",
    tags: ["HCI", "EdTech", "Global South", "Field Study"],
    summary:
      "How do you teach engineering with no internet? A study of 81 learners in rural Uganda taking an offline course over radio and basic phones — surfacing the motivational and technological realities of low-infrastructure EdTech for last-mile communities.",
    cover: "/research/chi.png",
  },
  {
    title: "High- and Low-Performing Groups in Collaborative VR Video-Based Learning",
    venue: "EC-TEL",
    year: 2026,
    status: "Under review",
    tags: ["VR", "Collaborative Learning", "ENA", "Mixed Methods"],
    summary:
      "An exploratory study (N=54) using epistemic network analysis to unpack how high- and low-performing groups talk, take notes, and feel while collaboratively watching 360° video and building a map together in VR.",
    cover: "/research/ectel.png",
  },
  {
    title: "Improving Accessibility and Quality of Learning through Multilingual Instruction in EdTech",
    venue: "Learning Sciences",
    year: 2026,
    status: "Under review",
    tags: ["EdTech", "Multilingual", "Learner Agency", "Uganda"],
    summary:
      "The first empirical look at learner agency in bilingual remote EdTech: how Ugandan learners chose between English and Leb-Lango in a radio-and-phone course, and what that reveals about designing inclusive multilingual learning.",
    cover: "/research/multilingual.png",
  },
  {
    title: "Auto-generating Road Trip Vlogs While Safe-driving",
    venue: "AHFE",
    year: 2024,
    status: "Published",
    tags: ["HCI", "Human-Vehicle", "AI Video", "Safety"],
    summary:
      "A Human-Vehicle-Environment system that auto-captures and edits scenic road-trip footage, so drivers can get the vlog without picking up their phone at the wheel.",
    cover: "/research/ahfe.png",
  },
  {
    title: "Savior: An Interactive Game Device for Environmental Protection",
    venue: "IEEE ICOT",
    year: 2021,
    status: "Published",
    tags: ["Interaction Design", "Serious Games", "Installation"],
    summary:
      "An interactive art installation and serious game — Arduino sensors and 3D-printed models let people feel how their everyday behavior reshapes a fragile planet, from grim to thriving.",
    cover: "/research/icot.png",
  },
];
