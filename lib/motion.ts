import type { Transition, Variants } from "framer-motion";

// Emil conventions: short, ease-out enters; springs for interactive.
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const durations = { fast: 0.15, base: 0.2, enter: 0.4 } as const;

export const enterTransition: Transition = {
  duration: durations.enter,
  ease: easeOut,
};

export const previewSpring: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 30,
  mass: 0.5,
};

// fade + slight blur + small rise
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  shown: { opacity: 1, y: 0, filter: "blur(0px)" },
};
