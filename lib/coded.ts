// Coded Work = things you design AND build. Each shows a live, playable demo (embedded
// from its GitHub Pages URL) plus links to the live site and the source.
export type CodedWork = {
  slug: string;
  title: string;
  blurb: string;
  tags: string[];
  year: number;
  live: string;
  code: string;
};

export const codedWork: CodedWork[] = [
  {
    slug: "toast-sonner",
    title: "Toast — a Sonner recreation",
    blurb:
      "A faithful vanilla HTML/CSS/JS recreation of Sonner — stacking toasts, hover-to-expand, swipe-to-dismiss, plus promise & action toasts. Zero dependencies.",
    tags: ["Vanilla JS", "Animation", "Toast"],
    year: 2025,
    live: "https://lingkan-wang.github.io/toast_component/",
    code: "https://github.com/lingkan-wang/toast_component",
  },
  {
    slug: "feedback-popover",
    title: "Feedback — morphing popover + confetti",
    blurb:
      "A feedback button that morphs into a popover and celebrates with a confetti burst on submit. Spring-based layout animation.",
    tags: ["Popover", "Morph", "Confetti"],
    year: 2025,
    live: "https://lingkan-wang.github.io/feedback-popover/",
    code: "https://github.com/lingkan-wang/feedback-popover",
  },
];
