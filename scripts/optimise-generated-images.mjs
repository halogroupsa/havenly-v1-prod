import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceRoot = "/Users/dilanjayamanne/.codex/generated_images/01a0b468-ddee-7c51-bc2d-c30bd93ae58c";
const outputRoot = path.resolve("public/images");

const images = [
  ["principle-restraint.webp", "exec-76ec3072-0aaf-43eb-a40a-98b5a2309693.png", "card"],
  ["principle-proportion.webp", "exec-07f99a15-0638-4c2e-b659-67bb34d8e07b.png", "card"],
  ["principle-materials.webp", "exec-3bc1f9ba-b24c-4b46-934c-014199eae609.png", "card"],
  ["principle-climate.webp", "exec-332e41fa-f4eb-4880-aa06-a61ba978019c.png", "card"],
  ["staging-after.webp", "exec-9c9a99bb-98e4-4d41-b10f-0077efaf0854.png", "full"],
  ["staging-before.webp", "exec-b07b21e9-225b-4773-8da1-f6e7847647a6.png", "full"],
  ["about-hero.webp", "exec-72b4a396-2af4-4bcd-a25c-0aea9df009be.png", "full"],
  ["services-hero.webp", "exec-1555235b-96e3-4ed9-b5f0-496b9dfc6e97.png", "full"],
  ["contact-entrance.webp", "exec-d3916a98-8024-4083-9acf-8b6c81e662fa.png", "full"],
  ["spaces-hero.webp", "exec-2882ea8c-abef-475a-b2f1-4d20c8fe3064.png", "full"],
  ["material-detail.webp", "exec-f02dd128-d28b-431f-af61-4595a495251c.png", "full"],
  ["install-day.webp", "exec-6e863d9d-21f5-4687-90ed-229f1d13b4a2.png", "full"],
  ["consultation-table.webp", "exec-0b34eb52-f0f0-4d06-b06b-a4572c1a8864.png", "card"],
  ["space-townhouse.webp", "exec-1da6a75c-7342-419f-a92e-f804e5a2a939.png", "card"],
  ["space-penthouse.webp", "exec-be2ccfd5-2195-4c37-b065-616749dabfc2.png", "card"],
  ["space-majlis.webp", "exec-31512221-e4e6-4845-b9b3-acb7e77168d5.png", "card"],
  ["space-entrance.webp", "exec-41cf017d-1a77-4b54-bcbe-c226d34ec1ef.png", "card"],
  ["space-terrace.webp", "exec-314b19d5-e533-44a9-82a4-f1c5b3ea27e1.png", "card"],
];

await fs.mkdir(outputRoot, { recursive: true });

for (const [outputName, sourceName, kind] of images) {
  const maxBytes = kind === "full" ? 240_000 : 140_000;
  const width = kind === "full" ? 1920 : 1440;
  const source = path.join(sourceRoot, sourceName);
  const output = path.join(outputRoot, outputName);
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

  await fs.writeFile(output, buffer);
  const metadata = await sharp(buffer).metadata();
  console.log(`${outputName}\t${metadata.width}x${metadata.height}\t${buffer.length}\t${metadata.exif ? "EXIF" : "clean"}\t${metadata.xmp ? "XMP" : "clean"}`);
}

// Legacy site images were already WebP and metadata-clean, but are recompressed
// here too so every delivery asset follows the same practical byte budgets.
for (const [name, kind] of [["villa.webp", "full"], ["dining.webp", "card"], ["bedroom.webp", "card"]]) {
  const maxBytes = kind === "full" ? 240_000 : 140_000;
  const width = kind === "full" ? 1920 : 1440;
  const output = path.join(outputRoot, name);
  let quality = 76;
  let buffer;
  do {
    buffer = await sharp(output, { limitInputPixels: false })
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6, smartSubsample: true })
      .toBuffer();
    quality -= 4;
  } while (buffer.length > maxBytes && quality >= 48);
  await fs.writeFile(output, buffer);
  console.log(`${name}\tlegacy\t${buffer.length}\tclean`);
}

const thumbWidth = 360;
const thumbHeight = 230;
const columns = 3;
const labels = await Promise.all(images.map(([name]) =>
  sharp(path.join(outputRoot, name))
    .resize(thumbWidth, thumbHeight, { fit: "cover", position: "centre" })
    .composite([{ input: Buffer.from(`<svg width="${thumbWidth}" height="30"><rect width="100%" height="100%" fill="#111" fill-opacity="0.82"/><text x="12" y="20" fill="white" font-family="Arial" font-size="15">${name}</text></svg>`), top: thumbHeight - 30, left: 0 }])
    .png()
    .toBuffer(),
));
await sharp({
  create: { width: thumbWidth * columns, height: thumbHeight * Math.ceil(labels.length / columns), channels: 3, background: "#222" },
})
  .composite(labels.map((input, index) => ({ input, left: (index % columns) * thumbWidth, top: Math.floor(index / columns) * thumbHeight })))
  .jpeg({ quality: 85 })
  .toFile("/private/tmp/havenly-image-contact-sheet.jpg");
