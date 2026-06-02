// UI sound effects for the photo card — the same sounds marco.fyi/about uses
// (photo flip + category select). Files live in public/about/. Click-triggered only,
// never autoplay. Swap the mp3s in public/about/ to change them.

function clip(src: string, vol = 0.55) {
  if (typeof window === "undefined") return () => {};
  const base = new Audio(src);
  base.preload = "auto";
  base.volume = vol;
  return () => {
    try {
      // clone per play so rapid clicks can overlap cleanly
      const node = base.cloneNode(true) as HTMLAudioElement;
      node.volume = vol;
      void node.play();
    } catch {
      /* ignore — autoplay/user-gesture guards */
    }
  };
}

export const sfx = {
  /** photo flip */
  flip: clip("/about/sfx-photo.mp3"),
  /** category select */
  tab: clip("/about/sfx-category.mp3"),
};
