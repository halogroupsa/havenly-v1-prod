/**
 * Settles whether the exported site may be indexed, and makes all three
 * controls say the same thing.
 *
 * A static export has no runtime, so "is this the live site?" has to be
 * answered when the bundle is built. The answer is NEXT_PUBLIC_SITE_URL: a
 * build that was told it is serving https://havenly.ae is production, and
 * anything else — staging, a preview, a local build with no .env — is not.
 *
 * Four things have to agree, or the site is either invisible in production or
 * visible in staging:
 *
 *   1. X-Robots-Tag in out/_headers   — the only control that covers images,
 *                                       fonts and other non-HTML responses
 *   2. <meta name="robots">           — baked into every page by Next, from
 *                                       `indexable` in src/lib/site.ts
 *   3. out/robots.txt                 — crawl permission, not indexing
 *   4. out/sitemap.xml                — the URLs offered for crawling, from
 *                                       src/app/sitemap.ts
 *
 * Next handles (2) and (4) on its own. This script handles (1) and (3) after
 * the export, and then checks its own conclusion against what Next actually
 * put in the HTML. If those two disagree the build fails here rather than
 * shipping a bundle whose header and markup contradict each other. It also
 * checks (4) against the exported pages, so a page that never reached the
 * sitemap fails the build instead of going uncrawled.
 *
 * Run automatically by `npm run build`.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, rmSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";
const PRODUCTION_HOSTS = ["havenly.ae", "www.havenly.ae"];

/* Next reads .env.local and .env itself; a bare node process does not, so this
   script would otherwise judge the build by a different environment than the
   one the bundle was compiled with. Same precedence Next uses: a variable
   already set in the shell wins over any file. */
function loadEnvFiles() {
  for (const file of [".env.local", ".env.production", ".env"]) {
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, "utf8").split("\n")) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/i);
      if (!match) continue;
      const [, key, rawValue] = match;
      if (key in process.env) continue;
      process.env[key] = rawValue.replace(/^(['"])(.*)\1$/, "$2");
    }
  }
}

/* Must match isProductionOrigin() in src/lib/site.ts. The agreement check
   below is what catches it if these two ever drift apart. */
function isProductionOrigin(value) {
  if (!value) return false;
  try {
    const parsed = new URL(value);
    return (
      parsed.protocol === "https:" &&
      PRODUCTION_HOSTS.includes(parsed.hostname.toLowerCase())
    );
  } catch {
    return false;
  }
}

function fail(message) {
  console.error(`\nrobots: ${message}\n`);
  process.exit(1);
}

function read(name) {
  const path = join(OUT, name);
  if (!existsSync(path)) fail(`${path} is missing. Run \`next build\` first.`);
  return { path, text: readFileSync(path, "utf8") };
}

loadEnvFiles();

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
const indexable = isProductionOrigin(siteUrl);

/* What Next baked into the markup, read back rather than assumed. */
const home = read("index.html");
const robotsMeta = home.text.match(
  /<meta\s+name="robots"\s+content="([^"]*)"/i,
);
const htmlSaysHidden = /noindex/i.test(robotsMeta?.[1] ?? "");

if (indexable === htmlSaysHidden) {
  fail(
    `the pages and this script disagree.\n` +
      `  NEXT_PUBLIC_SITE_URL = ${siteUrl || "(unset)"} -> ${indexable ? "indexable" : "hidden"}\n` +
      `  <meta name="robots">  = ${robotsMeta?.[1] ?? "(absent)"} -> ${htmlSaysHidden ? "hidden" : "indexable"}\n` +
      `Both read NEXT_PUBLIC_SITE_URL, so this usually means a stale out/ from\n` +
      `an earlier build, or that isProductionOrigin() in src/lib/site.ts and the\n` +
      `copy in this script have drifted apart. Nothing was changed.`,
  );
}

/* (1) The response header. The staging form in public/_headers carries the
   X-Robots-Tag between markers; a production build deletes that block. */
const headers = read("_headers");
const HIDDEN_BLOCK = /^[ \t]*#[ \t]*>>> hidden-only\n[\s\S]*?^[ \t]*#[ \t]*<<< hidden-only\n/m;

if (indexable) {
  if (!HIDDEN_BLOCK.test(headers.text)) {
    fail(
      `out/_headers has no "# >>> hidden-only" block, so the noindex header\n` +
        `cannot be removed. Restore the markers in public/_headers.`,
    );
  }
  writeFileSync(headers.path, headers.text.replace(HIDDEN_BLOCK, ""));
} else if (!/^\s*X-Robots-Tag:.*noindex/im.test(headers.text)) {
  fail(
    `this is not a production build, but out/_headers carries no noindex\n` +
      `X-Robots-Tag. Restore it in public/_headers before deploying.`,
  );
}

/* (4) The sitemap, from src/app/sitemap.ts. A hidden build exports an empty
   one; delete it rather than publish a bare <urlset>, and never point
   robots.txt at it. */
const sitemapPath = join(OUT, "sitemap.xml");

/** Every exported page, as the path a crawler would request. */
function exportedPages(dir = OUT) {
  const pages = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      /* Build plumbing, not pages. */
      if (entry.name === "_next") continue;
      pages.push(...exportedPages(full));
    } else if (entry.name.endsWith(".html")) {
      const rel = relative(OUT, full).split(sep).join("/");
      const meta = readFileSync(full, "utf8").match(
        /<meta\s+name="robots"\s+content="([^"]*)"/i,
      );
      pages.push({
        /* out/index.html -> "/", out/about/index.html -> "/about/". Matches
           trailingSlash: true, which is the form sitemap.ts emits. */
        path: "/" + rel.replace(/(^|\/)index\.html$/, "$1"),
        hidden: /noindex/i.test(meta?.[1] ?? ""),
      });
    }
  }
  return pages;
}

if (indexable) {
  if (!existsSync(sitemapPath)) {
    fail(
      `out/sitemap.xml was not exported. src/app/sitemap.ts should have\n` +
        `produced it — check that it still declares \`export const dynamic =\n` +
        `"force-static"\`, which \`output: "export"\` requires.`,
    );
  }

  /* A page missing from the sitemap is the failure this catches: the service
     and concept URLs come from shared arrays and cannot drift, but a new
     hand-written route has to be added to sitemap.ts by hand, and nothing
     else would notice if it were not. Checked against the export rather than
     the source, so it sees what actually shipped. */
  const listed = new Set(
    [...readFileSync(sitemapPath, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (m) => new URL(m[1]).pathname,
    ),
  );
  const pages = exportedPages();
  const missing = pages.filter((p) => !p.hidden && !listed.has(p.path));
  const stale = [...listed].filter(
    (path) => !pages.some((p) => p.path === path && !p.hidden),
  );

  if (missing.length || stale.length) {
    fail(
      [
        "the sitemap and the exported pages disagree.",
        missing.length &&
          `  Exported but not in the sitemap (add to src/app/sitemap.ts):\n` +
            missing.map((p) => `    ${p.path}`).join("\n"),
        stale.length &&
          `  In the sitemap but not exported, or exported noindex:\n` +
            stale.map((path) => `    ${path}`).join("\n"),
        "Nothing was changed.",
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }

  console.log(`robots: sitemap lists ${listed.size} of ${pages.length} exported pages.`);
} else if (existsSync(sitemapPath)) {
  rmSync(sitemapPath);
}

/* (3) robots.txt. Note what it is NOT doing in each case: staging allows
   crawling so that crawlers can read the noindex (a Disallow would hide it and
   leave bare URLs listed), and advertises no sitemap, because there is no
   point handing a crawler a list of URLs it is being told to drop. */
const robotsTxt = join(OUT, "robots.txt");
if (indexable) {
  const origin = new URL(siteUrl).origin;
  writeFileSync(
    robotsTxt,
    `# ${origin} — production.\n` +
      `#\n` +
      `# Written by scripts/robots.mjs at build time; edit that script, not this\n` +
      `# file. The staging form lives in public/robots.txt and explains why a\n` +
      `# hidden site must not use "Disallow: /" either.\n` +
      `\n` +
      `User-agent: *\n` +
      `Allow: /\n` +
      `\n` +
      `Sitemap: ${origin}/sitemap.xml\n`,
  );
}

console.log(
  indexable
    ? `robots: indexable — built for ${siteUrl}. noindex header removed, robots.txt points at sitemap.xml.`
    : `robots: hidden — NEXT_PUBLIC_SITE_URL is ${siteUrl || "unset"}, not ${PRODUCTION_HOSTS[0]}. noindex header and meta are in place.`,
);
