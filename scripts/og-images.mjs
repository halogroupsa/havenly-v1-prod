/**
 * Share-card JPGs for link previews, cut after the export.
 *
 * Pages name their share image as `/og/<name>.jpg` (ogImage() in
 * src/lib/seo.tsx). WhatsApp — where most links to this site are shared —
 * does not reliably render WebP previews, and every platform expects roughly
 * 1.91:1, so each card is a 1200×630 centre crop of `/images/<name>.webp`,
 * encoded as JPEG.
 *
 * The list comes from the exported HTML rather than a list kept here, so a
 * new page's image is cut with no second edit, and nothing is generated that
 * no page uses. A card whose source is missing fails the build rather than
 * ship a preview that 404s. The cards are written to out/og/ only: they are
 * build output, derived from files already in the repository.
 *
 * Staging builds carry no og:image (there is no absolute origin to give it),
 * so this finds nothing and does nothing there.
 *
 * Run automatically by `npm run build`, before scripts/robots.mjs.
 */
import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const WIDTH = 1200;
const HEIGHT = 630;

function htmlFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "_next") files.push(...htmlFiles(full));
    } else if (entry.name.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

const names = new Set();
for (const file of htmlFiles(OUT)) {
  for (const match of readFileSync(file, "utf8").matchAll(/\/og\/([\w-]+)\.jpg/g)) {
    names.add(match[1]);
  }
}

const missing = [...names].filter(
  (name) => !existsSync(join("public/images", `${name}.webp`)),
);
if (missing.length) {
  console.error(
    `\nog-images: no source for ${missing.map((n) => `/og/${n}.jpg`).join(", ")}.\n` +
      `Each card is cut from public/images/<name>.webp.\n`,
  );
  process.exit(1);
}

if (names.size) mkdirSync(join(OUT, "og"), { recursive: true });
await Promise.all(
  [...names].map((name) =>
    sharp(join("public/images", `${name}.webp`))
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(join(OUT, "og", `${name}.jpg`)),
  ),
);

console.log(`og-images: ${names.size} share card${names.size === 1 ? "" : "s"} written to out/og/.`);
