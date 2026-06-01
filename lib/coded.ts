// Coded Work = things you designed AND built (prototypes, coded experiments, design-engineering).
// Placeholders for now — replace with real entries. `href` can be an external link
// (live demo / repo) or an internal route you add later.
export type CodedWork = {
  slug: string;
  title: string;
  tags: string[];
  outcome: string;
  year: number;
  href: string;
};

export const codedWork: CodedWork[] = [
  {
    slug: "coded-one",
    title: "[Coded project one]",
    tags: ["Prototype", "Code", "Animation"],
    outcome: "[One line — what you designed and built, and the result]",
    year: 2025,
    href: "#",
  },
  {
    slug: "coded-two",
    title: "[Coded project two]",
    tags: ["React", "Interaction"],
    outcome: "[One-line placeholder]",
    year: 2025,
    href: "#",
  },
  {
    slug: "coded-three",
    title: "[Coded experiment three]",
    tags: ["UI Lab"],
    outcome: "[One-line placeholder]",
    year: 2024,
    href: "#",
  },
];
