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
};

export const codedWork: CodedWork[] = [
  {
    slug: "toast-sonner",
    title: "Toast — a Sonner recreation",
    blurb:
      "A coded component study focused on interaction fidelity: stacking logic, hover-to-expand behavior, swipe-to-dismiss, promise states, and action feedback with zero dependencies.",
    tags: ["AI Coding", "Interaction Spec", "Component Logic"],
    year: 2026,
    live: "https://lingkan-wang.github.io/toast_component/",
    offset: 150,
  },
  {
    slug: "feedback-popover",
    title: "Feedback — morphing popover + confetti",
    blurb:
      "A live prototype for a compact feedback workflow, using motion and state transitions to make submit, success, and recovery moments feel clear.",
    tags: ["Prototype", "Workflow UX", "Motion"],
    year: 2026,
    live: "https://lingkan-wang.github.io/feedback-popover/",
    offset: 0,
  },
];
