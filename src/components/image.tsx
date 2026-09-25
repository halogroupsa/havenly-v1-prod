import type { ImgHTMLAttributes } from "react";
import manifest from "@/lib/image-manifest.json";

/**
 * One `<img>` that asks for a width the visitor's screen can use.
 *
 * `scripts/optimize-images.mjs` writes a ladder of smaller WebPs beside every
 * file in `public/images/` and records it here, so this only has to read the
 * manifest — it never guesses at a filename that might not be on disk. An
 * image with no entry (or one too small to have derivatives, like the partner
 * marks) renders as a plain `<img>`, which is what it already was.
 *
 * `sizes` is the one thing the markup has to supply, because only the page
 * knows how wide the slot is. Give the slot's widest CSS width — get it wrong
 * on the low side and the browser picks a candidate too small to look sharp.
 */

type Entry = { width: number; height: number; widths: number[] };

const images = manifest as Record<string, Entry>;

/** `/images/villa.webp` → `/images/villa-768.webp` */
function at(src: string, width: number) {
  return `${src.slice(0, -".webp".length)}-${width}.webp`;
}

/** The ladder, with the original as the largest candidate. */
export function srcSetFor(src: string): string | undefined {
  const entry = images[src];
  if (!entry?.widths.length) return undefined;
  return [
    ...entry.widths.map((w) => `${at(src, w)} ${w}w`),
    `${src} ${entry.width}w`,
  ].join(", ");
}

/**
 * The narrowest candidate that still covers `target` CSS pixels, for the
 * slots that cannot take a `srcset` — a CSS background, which is how the
 * parallax band pins its picture to the viewport.
 */
export function srcAtWidth(src: string, target: number): string {
  const entry = images[src];
  if (!entry) return src;
  const match = entry.widths.find((w) => w >= target);
  return match ? at(src, match) : src;
}

export type ImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  /** Slot width per breakpoint, e.g. `"(max-width: 800px) 100vw, 33vw"`. */
  sizes?: string;
};

export function Img({ src, sizes, width, height, ...rest }: ImgProps) {
  const entry = images[src];
  const srcSet = srcSetFor(src);
  return (
    <img
      src={src}
      {...(srcSet ? { srcSet, sizes } : {})}
      /* The intrinsic size is the fallback, not an override: a few slots pass
         the shape the layout reserves rather than the file's own. */
      width={width ?? entry?.width}
      height={height ?? entry?.height}
      {...rest}
    />
  );
}
