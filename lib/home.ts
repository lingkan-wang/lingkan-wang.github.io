// The black squares on the home cube are interactive. Clicking one crossfades it
// into an illustration with a small label. Placeholders for now — add your own
// illustrations to public/cube/ and set `src` (e.g. "/cube/paint.png"); edit labels freely.
export type CubeItem = { label: string; src?: string };

export const cubeItems: CubeItem[] = [
  { label: "Teaching kids to paint" },
  { label: "AI × B2C products" },
  { label: "Dumpling enthusiast" },
  { label: "Prototype-first designer" },
  { label: "Sketching on napkins" },
  { label: "Future cat parent" },
  { label: "Design + code" },
  { label: "Always exploring" },
  { label: "Say hi 👋" },
];
