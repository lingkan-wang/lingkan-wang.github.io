// The black squares on the home cube are interactive. Clicking one crossfades it
// into an illustration and pops a little bubble beside it with a short, fun line
// (Georgia-Lyu style). First person / no third person; each line matches its illustration.
export type CubeItem = { label: string; src?: string };

// These lighter, prototype-led projects live in Playground → Little Rubbish.
// Keeping the list here lets Home and Playground stay in sync.
export const littleRubbishWorkSlugs = [
  "bumble-interest-cards",
  "kwai-guild-dashboard",
  "taimer-ai",
] as const;

export const cubeItems: CubeItem[] = [
  { src: "/cube/01.png", label: "Tennis every weekend" },
  { src: "/cube/02.png", label: "Always in headphones" },
  { src: "/cube/03.png", label: "I design it, then code it" },
  { src: "/cube/04.png", label: "I teach kids to paint" },
  { src: "/cube/05.png", label: "Always sketching" },
  { src: "/cube/06.png", label: "Here for the noodles" },
  { src: "/cube/07.png", label: "I cook to relax" },
  { src: "/cube/08.png", label: "Happiest on a trail" },
  { src: "/cube/09.png", label: "On island time" },
  { src: "/cube/10.png", label: "Happiest in the water" },
  { src: "/cube/11.png", label: "Always mid-book" },
  { src: "/cube/12.png", label: "Sunscreen, always" },
  { src: "/cube/13.png", label: "Powered by boba" },
  { src: "/cube/14.png", label: "Dog person, no debate" },
  { src: "/cube/15.png", label: "Out walking the pup" },
  { src: "/cube/16.png", label: "Prototype-first, always" },
];
