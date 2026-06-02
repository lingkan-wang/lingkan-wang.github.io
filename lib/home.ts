// The black squares on the home cube are interactive. Clicking one crossfades it
// into an illustration and pops a little bubble beside it with a short, fun line
// (Georgia-Lyu style). Illustrations live in public/cube/.
export type CubeItem = { label: string; src?: string };

export const cubeItems: CubeItem[] = [
  { src: "/cube/01.png", label: "Forever asking why" },
  { src: "/cube/02.png", label: "Overthinks the details (on purpose)" },
  { src: "/cube/03.png", label: "Designs it, then codes it" },
  { src: "/cube/04.png", label: "Teaches kids to paint" },
  { src: "/cube/05.png", label: "Sketches on everything" },
  { src: "/cube/06.png", label: "Powered by coffee" },
  { src: "/cube/07.png", label: "Takes food very seriously" },
  { src: "/cube/08.png", label: "Will travel anywhere" },
  { src: "/cube/09.png", label: "A sucker for fresh flowers" },
  { src: "/cube/10.png", label: "Gym before standups" },
  { src: "/cube/11.png", label: "Always mid-book" },
  { src: "/cube/12.png", label: "Chasing summer" },
  { src: "/cube/13.png", label: "Say hi 👋" },
  { src: "/cube/14.png", label: "Dog person, no debate" },
  { src: "/cube/15.png", label: "Future dog parent" },
  { src: "/cube/16.png", label: "Prototype-first, always" },
];
