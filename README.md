# Havenly

A responsive, static Next.js home staging and styling website for the UAE. Includes a home page, three statically generated concept detail pages, privacy page and custom 404.

## Development

```sh
npm install
npm run dev
```

A `Makefile` wraps these tasks: `make help` lists them, `make dev` starts the development server,
`make check` runs the typecheck and build below, `make deploy` publishes to Cloudflare, and
`make env` seeds `.env.local`. The npm scripts remain the fallback where `make` is unavailable.

## Build and preview

```sh
npm run build
npm start
```

`out/` contains the complete static site. Upload its contents to any static host. The included preview server listens on localhost:3000 (`PORT=3001 npm start` selects another port). No Node.js runtime is needed in production.

## Indexing

Whether the site may appear in search results is decided **at build time**, by
`NEXT_PUBLIC_SITE_URL`:

| `NEXT_PUBLIC_SITE_URL` | Result |
| --- | --- |
| `https://havenly.ae` or `https://www.havenly.ae` | Indexable |
| anything else, or unset | Hidden from search |

A static export has no runtime, so nothing can decide this per request — the
bundle is either indexable or it is not. Tying it to the canonical origin means
a build is only indexable if it was built knowing it would be served from the
live domain. Staging and local builds leave the variable unset and stay hidden,
with no second flag that can fall out of step.

Three controls carry the decision, and all three read it from the same place:

1. `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet, noimageindex` on
   every response, from `public/_headers`. This is the primary control and the
   only one that also covers non-HTML files such as images and fonts. It sits
   between `# >>> hidden-only` markers, which a production build deletes.
2. `<meta name="robots" content="noindex, nofollow, nocache">` on every page,
   from the `robots` block in `src/app/layout.tsx`, which reads `indexable`
   from `src/lib/site.ts`. This is the backup, and still applies if the site is
   served somewhere that drops response headers. An indexable build emits no
   robots meta at all: absent means indexable to every crawler, and an explicit
   `index, follow` would contradict the `noindex` Next puts on `404.html` and
   `_not-found/` itself.
3. `public/robots.txt`, which grants crawl permission — a separate thing from
   indexing, and the reason it must not say `Disallow: /`. A crawler only
   honours `noindex` on a page it is allowed to fetch, so blocking it there
   would hide the `noindex` and let the URLs be listed as bare links instead.
   Crawlers are let in precisely so they read the `noindex` and drop the pages.
   A production build gets a `Sitemap:` line; a hidden one does not, there
   being no point handing a crawler a list of URLs it is being told to drop.
4. `out/sitemap.xml`, from `src/app/sitemap.ts`. A hidden build produces an
   empty one, which is deleted from `out/` rather than published.

`scripts/robots.mjs` runs after `next build` and reconciles (1), (3) and (4),
which are static files Next copies verbatim and cannot template. It then
re-reads the exported HTML and fails the build if the header it just wrote
contradicts the `<meta>` Next rendered, so a bundle whose layers disagree never
ships. Edit `public/_headers` and `public/robots.txt`, never the copies in
`out/` — the
export overwrites them every build.

### Going live on havenly.ae

Set `NEXT_PUBLIC_SITE_URL=https://havenly.ae` in the production build
environment — for Cloudflare Workers Builds, as a build environment variable in
the dashboard; for a deploy from your machine, in `.env.local` — and rebuild.
Nothing in the source needs editing. The build prints which way it went:

```
robots: sitemap lists 18 of 21 exported pages.
robots: indexable — built for https://havenly.ae. noindex header removed, robots.txt points at sitemap.xml.

robots: hidden — NEXT_PUBLIC_SITE_URL is unset, not havenly.ae. noindex header and meta are in place.
```

One thing to know: the variable is read at build time, not run time, so
changing it in the dashboard does nothing until the next build.

Submitting `https://havenly.ae/sitemap.xml` in Google Search Console after the
first production deploy is worth doing, but it only speeds discovery up — the
`Sitemap:` line in `robots.txt` is what crawlers find on their own.

Verify after a deploy. On an indexable site the first two print nothing — no
`X-Robots-Tag`, no robots meta — the third ends in `Allow: /` and a `Sitemap:`
line, and the fourth counts the URLs offered:

```sh
curl -sI https://havenly.ae/ | grep -i x-robots-tag
curl -s  https://havenly.ae/ | grep -o '<meta name="robots"[^>]*>'
curl -s  https://havenly.ae/robots.txt
curl -s  https://havenly.ae/sitemap.xml | grep -c '<loc>'
```

Cloudflare adds `X-Robots-Tag: noindex` to Pages *preview* deployments on its
own, but not to the production branch, so on production these controls are the
only ones in play.

## Deploy to Cloudflare

The site deploys to Cloudflare Workers as static assets. Because it is a static export there is no
Worker script: Cloudflare serves `out/` directly, so no Worker invocation is billed and the free
plan's request limit does not apply.

```sh
npx wrangler login   # once per machine
npm run deploy       # builds, then uploads out/
```

`npm run deploy` runs `next build` first, so `out/` always matches the source. `make deploy` also
type-checks beforehand. To check the upload without publishing, run `npx wrangler deploy --dry-run`.

`npm run preview:cf` serves `out/` through the same asset worker Cloudflare runs in production,
which — unlike `npm start` — applies `_headers` and the trailing-slash redirects. Use it to verify
routing before deploying.

### Configuration

`wrangler.jsonc` holds the deployment settings:

- `assets.directory` — `./out`, the static export.
- `html_handling: "force-trailing-slash"` — matches `trailingSlash: true` in `next.config.mjs`, so
  `/privacy` redirects to `/privacy/` instead of serving one page at two URLs.
- `not_found_handling: "404-page"` — unknown paths return the exported `404.html` with a 404 status.

`public/_headers` sets response headers: a content security policy (same-origin plus Google's tag domains — see [Analytics and ads](#analytics-and-ads)), the usual hardening
headers, a one-year immutable cache for content-hashed `/_next/static/*`, and a one-week cache for
fonts and images. Next copies it into `out/` at build time; Cloudflare parses it and does not serve
it. The CSP needs `'unsafe-inline'` for scripts and styles because a static export cannot emit
per-request nonces for Next's hydration and inline critical CSS.

### Before the first deploy

The studio's WhatsApp number and contact email are defaults in `src/lib/site.ts`, so a clean
checkout deep-links correctly with no `.env` at all. `NEXT_PUBLIC_WHATSAPP`,
`NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_SITE_URL` remain build-time overrides, read at build
time and not at runtime. Deploying from your machine picks them up from `.env.local`. If you connect
the repository to Cloudflare Workers Builds instead, set them as build environment variables in the
Cloudflare dashboard and use `npm run build` as the build command with `out` as the output
directory. `NEXT_PUBLIC_SITE_URL` has no default: unset, the canonical URL is unset and the build
is hidden from search — it is the indexing switch described under [Indexing](#indexing), so set it
only where the site is genuinely served from `havenly.ae`.

Each checkout deploys its own Worker, named in its own `wrangler.jsonc`: the staging checkout
deploys `havenly-halo`, and the production checkout (`havenly-v1-prod`, the repository
`halogroupsa/havenly-v1-prod`) deploys `havenly-v1-prod`, which is the Worker `havenly.ae` is
attached to under Settings → Domains & Routes. Either is served at
`<worker-name>.<your-subdomain>.workers.dev` until a custom domain is attached.

### Staging and production checkouts

The two trees hold the same code and are kept in step with `make sync-to-prod`, which mirrors
staging onto the production checkout after a dry run you confirm. Three things never cross:
`wrangler.jsonc` (the Worker name), `.env`/`.env.local` (`NEXT_PUBLIC_SITE_URL` is the indexing
switch, so only production claims `https://havenly.ae`) and `.git`. `make sync-prod-status` shows
whether production's own two files are in place and what currently differs; `make sync-from-prod`
brings a hotfix back the other way. The mechanics are in `scripts/sync-tree.sh`.

## Configure before launch

Contact details need no configuration — `src/lib/site.ts` carries the studio's WhatsApp number and
inbox as defaults. Copy `.env.example` to `.env.local` only to override them or to set the canonical
URL, then rebuild. Two things are required before launch:

1. **`src/lib/testimonials.ts`** — replace the placeholder quotes with approved client words and set
   `testimonialsArePlaceholder` to `false`. Until then, every testimonial section carries a visible
   note saying the copy is placeholder.
2. **`src/lib/images.ts`** — slots marked PENDING temporarily reuse one of the three existing
   photographs. Generate each from `docs/image-prompts.md` and repoint the slot.

Content lives in `src/lib/`: `site.ts` (brand, navigation, Dubai service areas, audiences, principles, gallery
concepts), `services.ts` (the three services and how they compare), `testimonials.ts`, `images.ts`.
Palette, typography and breakpoints are in `src/app/globals.css`.

The enquiry form validates required fields and composes a complete first message locally. The visitor
chooses how to send it — WhatsApp, email if one is configured, or by copying it. It does not post to a
backend or pretend to save leads. A form provider can be added when its destination and privacy
requirements are known.

The brand is Havenly — one word, reached at havenly.ae. The workspace, the repository and the
Cloudflare Worker are still named havenly-halo; that is infrastructure, not the brand name, and
renaming it would change the deployment target. No business phone number,
real client testimonials, pricing or performance claims have been invented. All interior photography
is generated concept imagery, labelled as such on the site. Replace concepts with verified project
photography as available.

## Analytics and ads

Google Tag Manager loads in **production builds only**. The studio's container `GTM-5GVBDLTP` is
baked into `src/lib/analytics.ts` as `GTM_CONTAINER_ID` and switched by the same condition as
[Indexing](#indexing): it loads only when `NEXT_PUBLIC_SITE_URL` is `https://havenly.ae`. The
production deploy can't forget it, and staging and local builds never reach the reports. The Google
Ads tag is **off** until its ID is set.

| Variable | Example | Loads |
| --- | --- | --- |
| `NEXT_PUBLIC_GTM_ID` | `GTM-XXXXXXX` | Forces a GTM container onto any build, e.g. staging for GTM Preview. Unset = the baked container on production, nothing elsewhere |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | `AW-123456789` | The Google Ads tag via gtag.js. Unset = no Ads tag |

To load no GTM anywhere, blank `GTM_CONTAINER_ID`. A malformed ID fails the build instead of shipping a
tag that tracks nothing. The code is in `src/lib/analytics.ts` and `src/components/analytics.tsx`.

- **One home for the Ads tag.** If Google Ads is also configured as a Google tag inside the GTM
  container, leave `NEXT_PUBLIC_GOOGLE_ADS_ID` unset, or every conversion is counted twice.
- **Consent.** Consent Mode v2 defaults are set before any tag loads: ad and analytics storage are
  denied for the EEA, UK and Switzerland (where Google requires consent) and granted elsewhere. There
  is no consent banner; if one is added, it should call `gtag("consent", "update", …)`.
- **Events for conversions.** The site pushes these to the `dataLayer`. Build GTM Custom Event
  triggers, and Google Ads conversions, on them:

  | Event | When | Parameters |
  | --- | --- | --- |
  | `generate_lead` | The enquiry form is submitted to WhatsApp or email | `contact_method`, `service` |
  | `contact_click` | Any WhatsApp, phone or email link is clicked | `contact_method` (`whatsapp`/`phone`/`email`), `link_location` |

  No form contents (name, email, details) are sent. `generate_lead` is the best primary conversion.
- **CSP.** `public/_headers` allows Google Tag Manager, Google Ads, GA4 and GTM Preview. Any other
  vendor added in the container (Meta, LinkedIn, Hotjar…) is blocked until its domains are added there.
- **Privacy page.** `/privacy/` describes the tags when either ID is set, and says there are none when
  neither is.

Verify with GTM **Preview** against the deployed site (or `npm run preview:cf`, which applies the CSP)
and Google Tag Assistant, and check the browser console for CSP violations.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Overview: hero, services, six concepts, process, quotes, FAQs, enquiry |
| `/services/` | The three services compared side by side, plus who we work with |
| `/services/home-staging/` | Includes the before / after comparison wipe |
| `/services/furnishing-styling/` | |
| `/services/design-consultation/` | |
| `/interior-organizing/` | Interior organizing hub: seven rooms, the five-stage framework, products, FAQs |
| `/interior-organizing/<room>/` | Kitchen, pantry, bedroom, kids-room, bathrooms, laundry, garage — each a hand-written static page (consultation, process, products, packages, before photos, FAQs, book a visit) |
| `/spaces/` | All eight styling concepts, filterable |
| `/spaces/<slug>/` | One concept, the decisions behind it, previous / next |
| `/about/` | Approach, principles, materials, what we advise against, coverage |
| `/contact/` | WhatsApp-first, with the full brief form |
| `/privacy/` | How enquiry details are handled |

`/sitemap.xml` lists every row above, built from the same arrays the routes use
(`src/app/sitemap.ts`). Adding a concept or service adds its URL with no second
edit; adding a hand-written route means adding its path there too, and the
build fails until you do.

## Design and assets

- `docs/design-direction.md`: reference findings and design decisions.
- `docs/image-prompts.md`: exact prompts, including realistic / non AI looking requirements.
- `docs/organizing-image-prompts.md`: prompts for the interior organizing pages, and the prepare → ladder steps that apply them.
- `public/images/`: optimized, locally hosted generated imagery.
- `public/fonts/`: self-hosted Assistant font and OFL license.

Images are served responsively. `npm run assets:images` (or `make images`) writes a ladder of
smaller WebPs beside every file in `public/images/` — `villa-320.webp`, `villa-480.webp` and so on,
never larger than the original — and records what it wrote in `src/lib/image-manifest.json`. The
`Img` component in `src/components/image.tsx` reads that manifest to build each `srcset`, so a phone
downloads a phone-sized file. Re-running is idempotent: only images newer than their derivatives are
rebuilt, and derivatives whose source is gone are pruned.

Every `Img` needs a `sizes` attribute, because only the page knows how wide the slot is — give the
widest CSS width the image is drawn at (`"(max-width: 560px) 92vw, 31vw"` for a three-up grid). Too
small a value and the browser picks a candidate too soft to look right. The one exception is the
parallax band: a CSS background takes no `srcset`, so `Parallax` hands the ladder to `globals.css`
as `--band-sm` / `--band-md` / `--band-lg` and media queries choose between them.

Animations use CSS and small client components, respect `prefers-reduced-motion`, and never block
content without JavaScript. Interactive components are limited to navigation, gallery filtering,
enquiry preparation, the scroll-snapped rails, the parallax bands, the before/after wipe, the section
index and the floating WhatsApp button; all page content is prerendered.

Reusable blocks live in `src/components/`: `creative.tsx` (Rail, Parallax, BeforeAfter, OnThisPage,
WhatsappButton, WhatsappFab), `blocks.tsx` (PageHead, CtaBand, Marquee, Voices) and `interactive.tsx`
(Header, Motion, Spaces, Contact).

## Checks

```sh
npm run typecheck
npm run build
npx wrangler deploy --dry-run
```
