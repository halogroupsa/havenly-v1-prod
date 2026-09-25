/**
 * Image slots.
 *
 * Every value below resolves to a file that exists in `public/images/`. Each
 * generated image is a stripped-metadata WebP derivative of its source.
 */
import manifest from "./image-manifest.json";

/**
 * `/images/<name>.webp` once `npm run assets:images` has recorded it in the
 * manifest, `fallback` until then. The manifest, not the filesystem, is the
 * test: it is what the build can import, and an image only lands in it after
 * the full prepare → ladder pipeline has run, so a half-applied image never
 * ships without its mobile sizes.
 */
function ready(name: string, fallback: string) {
  const src = `/images/${name}.webp`;
  return src in manifest ? src : fallback;
}

/**
 * A photograph with no stand-in — `undefined` until the file is in the
 * manifest.
 *
 * `ready` is right where one picture is missing from a band that still makes
 * sense without it. It is wrong for a set that only means anything complete:
 * a rail of five pantry styles standing in with five copies of the same
 * photograph says nothing about five styles. Those sets ask `shot` instead and
 * leave themselves out until enough of the set exists. See StyleRail in
 * components/organizing.tsx and docs/organizing-image-prompts.md.
 */
export function shot(name: string): string | undefined {
  const src = `/images/${name}.webp`;
  return src in manifest ? src : undefined;
}

const villa = "/images/villa-dubai-luxury.webp";
const dining = "/images/dining-dubai-luxury-landscape.webp";
const bedroom = "/images/bedroom-dubai-luxury.webp";

export const img = {
  /* Homepage hero cross-dissolve. Frame one is the page's largest paint, so
     it is the only one the server renders; the other three are fetched after
     load. They are four different kinds of room on purpose — a rotation of
     four villas would just look like a stuck slideshow. */
  heroFrame1: "/images/villa.webp",
  heroFrame2: "/images/space-penthouse.webp",
  heroFrame3: "/images/space-majlis.webp",
  heroFrame4: "/images/space-terrace.webp",

  // Live
  heroVilla: villa,
  dining,
  bedroom,

  // Pages
  aboutHero: "/images/about-hero.webp",
  servicesHero: "/images/services-hero.webp",
  contactHero: "/images/contact-entrance.webp",
  spacesHero: "/images/spaces-hero.webp",

  // Staging comparison — same source room and camera position
  stagingBefore: "/images/staging-before.webp",
  stagingAfter: "/images/staging-after.webp",

  // Texture and process
  materialDetail: "/images/material-detail.webp",
  installDay: "/images/install-day.webp",
  consultationTable: "/images/consultation-table.webp",

  /* Homepage intro mosaic. Four images at deliberately different distances —
     whole room, close detail, threshold and bedroom corner — so the band does
     not read as four versions of the same photograph. */
  introRoom: "/images/intro-room.webp",
  introDetail: "/images/intro-detail.webp",
  introThreshold: "/images/intro-threshold.webp",
  introBedroom: "/images/intro-bedroom.webp",

  /* Philosophy material swatches. Square macros, one material each, shown
     under the philosophy copy in place of the four flat colour dots. */
  swatchLinen: "/images/swatch-linen.webp",
  swatchOak: "/images/swatch-oak.webp",
  swatchTravertine: "/images/swatch-travertine.webp",
  swatchBoucle: "/images/swatch-boucle.webp",

  /* Process stage. One 16:10 frame per step, cross-faded as the step beside
     it scrolls into view. */
  processConsultation: "/images/consultation-table.webp",
  processMoodboard: "/images/process-moodboard.webp",
  processInstall: "/images/install-day.webp",
  processReveal: "/images/process-reveal.webp",

  /* UAE band background, behind a dark scrim. */
  uaeBand: "/images/uae-band.webp",

  /* Tall frame filling the empty left column of the homepage FAQ. */
  faqRoom: "/images/faq-room.webp",

  /* Homepage service tiles. Portrait, and composed for type: the title sits
     over the lower third at rest and the summary joins it on hover, so the
     bottom of each frame stays quiet. */
  tileStaging: "/images/service-tile-staging.webp",
  tileFurnishing: "/images/service-tile-furnishing.webp",
  tileConsultation: "/images/service-tile-consultation.webp",

  /* The founder's portrait, beside the signed note on the about page.
     GENERATED, not photographed. Every other slot here holds a generated
     room, which is a styling concept and is labelled as one. This one holds a
     generated person, which is a different kind of claim — so it stays behind
     the founderIsPlaceholder flag in lib/site.ts until a photograph of the
     real founder replaces it. See docs/image-prompts.md. */
  founderPortrait: "/images/founder-portrait.webp",

  /* Interior organizing. Each slot names its own photograph and a stand-in:
     until the photograph has been prepared and laddered (it is then in the
     image manifest), the nearest existing image is used instead. So applying
     a new image needs no edit here — see docs/organizing-image-prompts.md. */
  orgHero: ready("org-hero", "/images/consultation-table.webp"),
  orgKitchen: ready("org-kitchen", dining),
  orgPantry: ready("org-pantry", "/images/material-detail.webp"),
  orgBedroom: ready("org-bedroom", bedroom),
  orgKids: ready("org-kids-room", "/images/intro-bedroom.webp"),
  orgBathroom: ready("org-bathroom", "/images/principle-materials.webp"),
  orgLaundry: ready("org-laundry", "/images/swatch-linen.webp"),
  orgGarage: ready("org-garage", "/images/space-entrance.webp"),
  orgProducts: ready("org-products", "/images/principle-restraint.webp"),

  /* The four moves — visit, edit, fit, finish — shown as photographs on
     every organizing page. One set, shared: the framework is the same in
     every room, so four pictures carry it everywhere rather than seven
     sets of four. Until they exist they stand in with the organizing
     images that are closest in subject, rather than with a staging room:
     a stand-in that shows the wrong trade is worse than one that is only
     the wrong moment. */
  orgVisit: ready("org-visit", "/images/org-hero.webp"),
  orgEdit: ready("org-edit", "/images/org-pantry.webp"),
  orgFit: ready("org-fit", "/images/org-kitchen.webp"),
  orgFinish: ready("org-finish", "/images/org-products.webp"),

  /* One close detail per room, beside that page's statement. A drawer, a
     rail, a shelf — the thing the room page is actually about. Each falls
     back to its own room's wide photograph, which is at least the right
     room shown from further away. */
  orgKitchenDetail: ready("org-kitchen-detail", "/images/org-kitchen.webp"),
  orgPantryDetail: ready("org-pantry-detail", "/images/org-pantry.webp"),
  orgBedroomDetail: ready("org-bedroom-detail", "/images/org-bedroom.webp"),
  orgKidsDetail: ready("org-kids-room-detail", "/images/org-kids-room.webp"),
  orgBathroomDetail: ready("org-bathroom-detail", "/images/org-bathroom.webp"),
  orgLaundryDetail: ready("org-laundry-detail", "/images/org-laundry.webp"),
  orgGarageDetail: ready("org-garage-detail", "/images/org-garage.webp"),

  // Gallery concepts
  spaceTownhouse: "/images/space-townhouse.webp",
  spacePenthouse: "/images/space-penthouse.webp",
  spaceMajlis: "/images/space-majlis.webp",
  spaceEntrance: "/images/space-entrance.webp",
  spaceTerrace: "/images/space-terrace.webp",
} as const;

export type ImageSlot = keyof typeof img;
