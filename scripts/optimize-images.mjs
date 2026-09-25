#!/usr/bin/env node
/**
 * Responsive derivatives for everything in `public/images/`.
 *
 * `prepare-images.mjs` gets one delivery-ready WebP out of a source render:
 * correct width, byte budget, no EXIF. That file is still a single width,
 * though, so a phone at 390 CSS pixels downloads the same 1440-wide frame a
 * desktop does. This script closes that gap — for every image it writes the
 * smaller widths beside it as `<base>-<width>.webp`, and records what exists
 * in `src/lib/image-manifest.json` so the markup can build a `srcset` without
 * guessing which files are on disk.
 *
 *   node scripts/optimize-images.mjs
 *
 * The original stays the largest candidate rather than being re-encoded: it
 * is already inside a byte budget, and a bucket within 10% of its width would
 * only add a near-duplicate download for the browser to choose between.
 *
 * Re-running is cheap — a derivative is rebuilt only when its source is newer,
 * and derivatives whose source is gone (or which no longer fall in the ladder)
 * are pruned, so the folder never drifts from the manifest.
 */
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES = path.join(ROOT, "public/images");
const MANIFEST = path.join(ROOT, "src/lib/image-manifest.json");
const PUBLIC_PREFIX = "/images";

/** The widths a visitor's viewport actually lands on, phone through 2x desktop.
    320 is not a viewport — it is the small slots (a material swatch, a partner
    mark) whose largest rendered size is a couple of hundred pixels. */
const WIDTHS = [320, 480, 768, 1200, 1920];
const QUALITY = 82;
/** How close to the source width a bucket may get before it is not worth writing. */
const MIN_STEP = 0.9;

/* A derivative is anything ending `-<digits>.webp`, which also means a source
   image may not be named that way — it would be read as one and pruned. */
const DERIVATIVE = /^(.*)-(\d+)\.webp$/;

async function sources() {
  const names = await fs.readdir(IMAGES);
  return names
    .filter((n) => n.endsWith(".webp") && !DERIVATIVE.test(n))
    .sort();
}

async function isStale(source, derivative) {
  try {
    const [s, d] = await Promise.all([fs.stat(source), fs.stat(derivative)]);
    return s.mtimeMs > d.mtimeMs;
  } catch {
    return true;
  }
}

let written = 0;
let reused = 0;
let pruned = 0;

async function derive(name) {
  const source = path.join(IMAGES, name);
  const base = name.slice(0, -".webp".length);
  const { width, height } = await sharp(source).metadata();

  const widths = WIDTHS.filter((w) => w < width * MIN_STEP);
  for (const w of widths) {
    const out = path.join(IMAGES, `${base}-${w}.webp`);
    if (!(await isStale(source, out))) {
      reused += 1;
      continue;
    }
    await sharp(source, { limitInputPixels: false })
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6, smartSubsample: true })
      .toFile(out);
    written += 1;
  }

  return [`${PUBLIC_PREFIX}/${name}`, { width, height, widths }];
}

/** Remove derivatives no source claims — a renamed image, or a dropped bucket. */
async function prune(expected) {
  for (const name of await fs.readdir(IMAGES)) {
    const match = DERIVATIVE.exec(name);
    if (!match || expected.has(name)) continue;
    await fs.unlink(path.join(IMAGES, name));
    pruned += 1;
    console.log(`  - ${name}`);
  }
}

const entries = [];
for (const name of await sources()) entries.push(await derive(name));

const expected = new Set(
  entries.flatMap(([src, { widths }]) => {
    const base = path.basename(src, ".webp");
    return widths.map((w) => `${base}-${w}.webp`);
  }),
);
await prune(expected);

await fs.writeFile(MANIFEST, `${JSON.stringify(Object.fromEntries(entries), null, 2)}\n`);

const bytes = async (name) => (await fs.stat(path.join(IMAGES, name))).size;
for (const [src, { width, height, widths }] of entries) {
  const name = path.basename(src);
  const ladder = widths.length ? `${widths.join(", ")}, ${width}` : `${width} only`;
  console.log(`${name.padEnd(38)} ${width}x${height}  ${(await bytes(name) / 1024).toFixed(0)} KB  → ${ladder}`);
}
console.log(`\n${entries.length} images · ${written} written · ${reused} up to date · ${pruned} pruned`);
console.log(`manifest: ${path.relative(ROOT, MANIFEST)}`);
