// Coded Work = things you design AND build. Each is shown as a live, fully-playable
// demo embedded from its GitHub Pages URL (all interaction happens inside the frame).
// `offset` crops that many px off the TOP of the embed (to hide a demo's own redundant
// heading); every card uses the same visible frame height.
export type CodedWork = {
  slug: string;
  title: string;
  blurb: string;
  tags: string[];
  year: number;
  live: string;
  offset: number;
  /** Optional download link (e.g. a desktop build) shown in the description. */
  download?: string;
};

export const codedWork: CodedWork[] = [
  {
    slug: "masii-sign",
    title: "Sign to claim — a signature that replays to verify",
    blurb:
      "A prize-claim agreement you sign by drawing on the pad or typing your name in a script font, then watch re-traced stroke-by-stroke to verify the claim. Canvas capture + replay, collapsible legal terms, and Pending → Processing → Completed states. Built for masii.",
    tags: ["Vanilla JS", "Canvas", "Signature"],
    year: 2026,
    live: "/masii-sign/",
    offset: 0,
  },
  {
    slug: "journey-globe",
    title: "Journey — a 2D map that morphs into a 3D globe",
    blurb:
      "A dotted world map that morphs into an interactive 3D globe (Three.js / WebGL, with a custom vertex-shader morph). Hover a glowing pin to reveal a photo and a short story from each place I've lived and worked — plus a Map/Globe toggle and chronological journey arcs.",
    tags: ["Three.js", "WebGL", "Shaders"],
    year: 2026,
    live: "https://lingkan-wang.github.io/journey-globe/?v=19",
    offset: 0,
  },
  {
    slug: "bubble-todo",
    title: "Bubble To-do — a blow-a-bubble sticky note",
    blurb:
      "An illustrated girl blows watercolor bubbles you fill with to-dos. Type a task, double-click her to puff it off to the corner, then click a bubble to pop it done — with synthesized Web Audio sounds. Originally an Electron desktop widget.",
    tags: ["Vanilla JS", "Web Audio", "Animation"],
    year: 2026,
    live: "https://lingkan-wang.github.io/bubble-todo/",
    offset: 0,
    download: "https://github.com/lingkan-wang/bubble-todo/releases/download/v1.0/Bubble-To-do-macOS-AppleSilicon.zip",
  },
  {
    slug: "toast-sonner",
    title: "Toast — a Sonner recreation",
    blurb:
      "A faithful vanilla HTML/CSS/JS recreation of Sonner — stacking toasts, hover-to-expand, swipe-to-dismiss, plus promise & action toasts. Zero dependencies.",
    tags: ["Vanilla JS", "Animation", "Toast"],
    year: 2026,
    live: "https://lingkan-wang.github.io/toast_component/",
    offset: 150,
  },
  {
    slug: "feedback-popover",
    title: "Feedback — morphing popover + confetti",
    blurb:
      "A feedback button that morphs into a popover and celebrates with a confetti burst on submit. Spring-based layout animation.",
    tags: ["Popover", "Morph", "Confetti"],
    year: 2026,
    live: "https://lingkan-wang.github.io/feedback-popover/",
    offset: 0,
  },
];
