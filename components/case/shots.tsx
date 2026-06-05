import Image from "next/image";

// Intrinsic pixel sizes of the optimized assets (keyed by basename) so next/image
// can reserve the right aspect ratio without per-image static imports.
const DIMS: Record<string, [number, number]> = {
  "hero.webp": [1500, 1125],
  "hosting-progress.webp": [1186, 794],
  "hosting-cleaning.png": [393, 852],
  "hosting-intro.jpg": [570, 950],
  "mapping-rooms.png": [384, 844],
  "mapping-split.png": [409, 900],
  "mapping-screens.webp": [1186, 794],
  "petmode.jpg": [570, 950],
  "petmode-lab.png": [777, 1000],
  "hardware-diagram.webp": [1051, 651],
  "product.webp": [1100, 1100],
};

function dims(src: string): [number, number] {
  const key = src.split("/").pop() ?? "";
  return DIMS[key] ?? [1080, 810];
}

/** A single app screen — bordered, rounded, on the page surface. */
export function Phone({ src, alt }: { src: string; alt: string }) {
  const [w, h] = dims(src);
  return (
    <Image
      src={src}
      alt={alt}
      width={w}
      height={h}
      sizes="(max-width: 640px) 45vw, 240px"
      className="h-auto w-full rounded-2xl border border-border bg-white shadow-sm ring-1 ring-black/[0.03]"
    />
  );
}

/** A pre-framed mockup (device already composited on its own background) —
 *  rendered as-is with just a rounded border, sized for a portrait shot. */
export function Mockup({ src, alt }: { src: string; alt: string }) {
  const [w, h] = dims(src);
  return (
    <Image
      src={src}
      alt={alt}
      width={w}
      height={h}
      sizes="(max-width: 640px) 70vw, 320px"
      className="h-auto w-full rounded-2xl border border-border"
    />
  );
}

/** A wider composition (multi-phone shot, diagram, product render). */
export function Plate({ src, alt }: { src: string; alt: string }) {
  const [w, h] = dims(src);
  return (
    <Image
      src={src}
      alt={alt}
      width={w}
      height={h}
      sizes="(max-width: 1080px) 92vw, 1080px"
      className="h-auto w-full rounded-2xl border border-border"
    />
  );
}
