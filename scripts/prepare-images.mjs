/**
 * Turn a freshly generated PNG into a delivery-ready WebP in public/images/.
 *
 * The existing optimise-generated-images.mjs is pinned to one generation run's
 * directory and file ids. This one takes files on the command line, so it works
 * for images downloaded by hand from any generator:
 *
 *   node scripts/prepare-images.mjs ~/Downloads/a.png:intro-room.webp \
 *                                   ~/Downloads/b.png:intro-detail.webp
 *
 * `kind` decides the byte budget and delivery width, and defaults to `card`.
 * Append it as a third segment when the image runs full-bleed:
 *
 *   node scripts/prepare-images.mjs ~/Downloads/c.png:spaces-hero.webp:full
 *
 * sharp does not carry input metadata into the output unless asked to, so the
 * EXIF, XMP and any C2PA provenance block attached by the generator are dropped
 * here rather than in a separate cleaning step.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const budgets = {
  full: { maxBytes: 240_000, width: 1920 },
  card: { maxBytes: 140_000, width: 1440 },
};

const jobs = process.argv.slice(2).map((arg) => {
  const [source, outputName, kind = "card"] = arg.split(":");
  if (!source || !outputName) {
    throw new Error(`Expected <source>:<output.webp>[:full|card], got "${arg}"`);
  }
  if (!budgets[kind]) throw new Error(`Unknown kind "${kind}" in "${arg}"`);
  return { source, outputName, kind };
});

if (jobs.length === 0) {
  console.error("Usage: node scripts/prepare-images.mjs <src>:<name.webp>[:full|card] ...");
  process.exit(1);
}

const outputRoot = path.resolve("public/images");
await fs.mkdir(outputRoot, { recursive: true });

for (const { source, outputName, kind } of jobs) {
  const { maxBytes, width } = budgets[kind];
  let quality = 76;
  let buffer;

  do {
    buffer = await sharp(source, { limitInputPixels: false })
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6, smartSubsample: true })
      .toBuffer();
    quality -= 4;
  } while (buffer.length > maxBytes && quality >= 48);

  const output = path.join(outputRoot, outputName);
  await fs.writeFile(output, buffer);

  const meta = await sharp(buffer).metadata();
  const clean = !meta.exif && !meta.xmp && !meta.icc;
  console.log(
    `${outputName}\t${meta.width}x${meta.height}\t${(buffer.length / 1024).toFixed(0)} KB\t${clean ? "metadata clean" : "METADATA PRESENT"}`,
  );
}
