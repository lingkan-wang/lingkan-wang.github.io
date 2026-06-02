// The black squares on the home cube are interactive. Clicking one crossfades it
// into an illustration and pops a little bubble beside it with a short, fun line
// (Georgia-Lyu style). Each line matches what's in its illustration.
export type CubeItem = { label: string; src?: string };

export const cubeItems: CubeItem[] = [
  { src: "/cube/01.png", label: "Weekend tennis habit" },
  { src: "/cube/02.png", label: "Headphones rarely come off" },
  { src: "/cube/03.png", label: "Designs it, then codes it" },
  { src: "/cube/04.png", label: "Teaches kids to paint" },
  { src: "/cube/05.png", label: "Sketches on everything" },
  { src: "/cube/06.png", label: "Here for the noodles" },
  { src: "/cube/07.png", label: "Cooks when she's happy" },
  { src: "/cube/08.png", label: "Happiest on a trail" },
  { src: "/cube/09.png", label: "On permanent island time" },
  { src: "/cube/10.png", label: "Happiest in the water" },
  { src: "/cube/11.png", label: "Always mid-book" },
  { src: "/cube/12.png", label: "Never skips sunscreen" },
  { src: "/cube/13.png", label: "Runs on boba" },
  { src: "/cube/14.png", label: "Dog person, no debate" },
  { src: "/cube/15.png", label: "Out walking the pup" },
  { src: "/cube/16.png", label: "Prototype-first, always" },
];
