// Coded pieces shown as live, fully-playable demos inside the Playground
// (all interaction happens inside the frame). The Playground assigns them to tabs.
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
    slug: "sticker-peel",
    title: "Sticker — peel it off, carry it, stick it back",
    blurb:
      "A die-cut sticker you actually peel. Drag from any edge and a vertex shader curls the sheet around a cylinder, showing the paper backing underneath; pull past three quarters and it comes away in your cursor, swinging with the weight of it. Click to lay it back down anywhere. Grab it by the middle instead and you just slide it around.",
    tags: ["Three.js", "GLSL", "Spring Physics"],
    year: 2026,
    live: "https://lingkan-wang.github.io/sticker-peel/?embed=1",
    offset: 0,
  },
  {
    slug: "photo-transfer",
    title: "Transfer — photos that fly from A to B",
    blurb:
      "A file-transfer motion study recreated 1:1 from a reference video: photos pop out of one avatar, arc across a spring-following bezier, and shrink into the other. Drag either avatar and the stream lags elastically. Hover a photo mid-flight to freeze it and hit ✕ to unsend it before it lands.",
    tags: ["Vanilla JS", "Spring Physics", "Bezier"],
    year: 2026,
    live: "/photo-transfer/index.html",
    offset: 0,
  },
  {
    slug: "masii-sign",
    title: "Sign to claim — a signature that replays to verify",
    blurb:
      "A prize-claim agreement you sign by drawing on the pad or typing your name in a script font, then watch re-traced stroke-by-stroke to verify the claim. Canvas capture + replay, collapsible legal terms, and Pending → Processing → Completed states. Built for masii.",
    tags: ["Vanilla JS", "Canvas", "Signature"],
    year: 2026,
    live: "/masii-sign/index.html",
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
    live: "https://lingkan-wang.github.io/feedback-popover/?v=success-shadow",
    offset: 0,
  },
];
