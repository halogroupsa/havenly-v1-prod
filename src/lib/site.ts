import { img } from "./images";

/* The studio's real contact routes, baked in so the site works from a clean
   checkout with no .env at all. The environment variables stay as overrides
   for staging builds that need to point somewhere else. */
export const CONTACT_EMAIL = "Mansi@Havenly.ae";
/* International format, no spaces and no leading +. */
export const WHATSAPP_NUMBER = "971503986006";
/* The line the studio answers. Same handset as the WhatsApp number, kept as
   its own constant so either can move without dragging the other with it. */
export const PHONE_NUMBER = "971503986006";

/* The studio address. Havenly works out of the same Dubai premises as
   Halo Interiors, so this is that address verbatim — one string, because the
   only places it appears are the footer and the contact page. */
export const STUDIO_ADDRESS = "Marabea Street, Al Quoz 1, P.O. Box 26800, Dubai, UAE";

/**
 * The studio's social accounts.
 *
 * HIDDEN. There are no confirmed handles — `havenlyhalo` was guessed from the
 * old name, and the brand is now Havenly at havenly.ae, so even that guess is
 * stale. No account has been verified as live, so the footer shows no social
 * row at all rather than link to a page that may not exist. The URLs are left
 * empty deliberately. Setting NEXT_PUBLIC_INSTAGRAM or
 * NEXT_PUBLIC_FACEBOOK brings that icon back; once the real accounts are
 * confirmed, restore the URLs as the defaults here.
 */
export const socials = [
  {
    name: "Instagram",
    href: process.env.NEXT_PUBLIC_INSTAGRAM ?? "",
  },
  {
    name: "Facebook",
    href: process.env.NEXT_PUBLIC_FACEBOOK ?? "",
  },
].filter((s) => s.href);

/**
 * The live site's origin. This is the one switch that turns indexing on.
 *
 * The site is a static export, so there is no runtime that can decide whether
 * a response should be indexable — it has to be settled when the bundle is
 * built. Rather than let a human remember to strip the noindex on the right
 * deploy, the build derives it: a bundle is only indexable if it was built
 * knowing it would be served from the production origin, which is what
 * NEXT_PUBLIC_SITE_URL states. Staging leaves that unset and stays hidden,
 * with no separate flag to get out of step with it.
 *
 * `www.` is accepted because a host may serve or redirect either form, and a
 * bundle built for one is the same bundle. http:// is not: an origin that is
 * not fully HTTPS is not the live site.
 */
export const PRODUCTION_ORIGIN = "https://havenly.ae";

const PRODUCTION_HOSTS = ["havenly.ae", "www.havenly.ae"];

/**
 * Parse NEXT_PUBLIC_SITE_URL once, and reject anything that is not a full
 * origin.
 *
 * `havenly.ae` with no scheme is the obvious thing to type here and is not a
 * URL. Left to itself, it reaches `new URL()` in the metadata block of
 * layout.tsx and fails the build with a bare ERR_INVALID_URL pointing at a
 * line that does not explain itself. Failing here instead says what was wrong
 * and what to write. Quietly ignoring it would be worse than either: the
 * production build would go out hidden from search with nothing to show why.
 */
function parseSiteUrl(value: string) {
  const raw = value.trim();
  if (!raw) return null;
  try {
    return new URL(raw);
  } catch {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL must be a full origin including the scheme — ` +
        `"${raw}" is not. Use ${PRODUCTION_ORIGIN} for the live site, or ` +
        `leave it unset for staging.`,
    );
  }
}

const siteUrl = parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || "");

/**
 * Whether this build may appear in search results. Read by the `robots` block
 * in src/app/layout.tsx and, for the response header and robots.txt, by
 * scripts/robots.mjs after the export is written. All three have to agree,
 * so all three read this same condition.
 */
export const indexable =
  siteUrl !== null &&
  siteUrl.protocol === "https:" &&
  PRODUCTION_HOSTS.includes(siteUrl.hostname.toLowerCase());

export const site = {
  name: "Havenly",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || CONTACT_EMAIL,
  /* The origin only — a trailing slash or a stray path would otherwise reach
     metadataBase and be prefixed onto every absolute URL the pages emit. */
  url: siteUrl ? siteUrl.origin : "",
  /**
   * WhatsApp is the studio's primary contact method. Override with
   * NEXT_PUBLIC_WHATSAPP in international format without spaces or a leading
   * +, e.g. 9715XXXXXXXX; left blank or unset, WHATSAPP_NUMBER above is used.
   * Only blanking that constant makes the WhatsApp controls fall back to
   * /contact/, which is what they do rather than link to a number the studio
   * does not own.
   */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || WHATSAPP_NUMBER,
  /**
   * The studio's phone line, same format as `whatsapp`. Override with
   * NEXT_PUBLIC_PHONE; blanked entirely, the call controls fall back to
   * /contact/ rather than dial a number the studio does not own.
   */
  phone: process.env.NEXT_PUBLIC_PHONE || PHONE_NUMBER,
};

/** wa.me deep link with a pre-filled first message, or the contact page. */
export function whatsappLink(message?: string) {
  if (!site.whatsapp) return "/contact/";
  const text = message
    ? `?text=${encodeURIComponent(message)}`
    : "";
  return `https://wa.me/${site.whatsapp}${text}`;
}

/** tel: link for the studio line, or the contact page. */
export function telLink() {
  return site.phone ? `tel:+${site.phone}` : "/contact/";
}

/** The same number spaced the way a UAE mobile is read aloud. */
export function phoneDisplay() {
  const n = site.phone;
  if (!n) return "";
  return n.startsWith("971")
    ? `+971 ${n.slice(3, 5)} ${n.slice(5, 8)} ${n.slice(8)}`
    : `+${n}`;
}

/* mailto for the studio inbox. Mirrors whatsappLink: one place that knows
   how a message becomes a link, so the form only composes the text. */
export function mailtoLink(message?: string) {
  if (!site.email) return "/contact/";
  const body = message ? `&body=${encodeURIComponent(message)}` : "";
  return `mailto:${site.email}?subject=Property%20styling%20enquiry${body}`;
}

export const waDefaultMessage =
  "Hello Havenly, I'd like to talk about styling my property.";

export const nav = [
  { href: "/services/", label: "Services" },
  { href: "/interior-organizing/", label: "Organizing" },
  { href: "/spaces/", label: "Our spaces" },
  { href: "/about/", label: "About us" },
  { href: "/contact/", label: "Contact" },
];

/**
 * The Dubai communities the studio names as its working area. The studio
 * works only in Dubai, so these replace the old list of emirates — on the
 * about page, the contact form's location field and `areaServed` in the
 * structured data. Community names are how buyers, tenants and agents here
 * search and talk about a property, so they are the useful level of detail.
 */
export const dubaiAreas = [
  "Dubai Marina",
  "Downtown Dubai",
  "Business Bay",
  "Palm Jumeirah",
  "Jumeirah",
  "Dubai Hills Estate",
  "Arabian Ranches",
  "Emirates Hills",
  "Jumeirah Village Circle",
  "Al Barsha",
];

/** Who the studio works with — used on the services and about pages. */
export const audiences = [
  {
    title: "Homeowners",
    text: "Preparing a property for sale or rent, or making a new home feel finished and lived-in.",
  },
  {
    title: "Property agents",
    text: "Listings that need to photograph well, show well and hold attention through a viewing.",
  },
  {
    title: "Landlords & investors",
    text: "Furnishing that stands up to turnover, with a clear inventory and a consistent presentation.",
  },
  {
    title: "Developers",
    text: "Show homes and handover units styled to communicate the intent of the architecture.",
  },
  {
    title: "Holiday-home operators",
    text: "Durable, welcoming interiors that photograph consistently and suit short stays.",
  },
  {
    title: "People starting again",
    text: "A first home, a move across the city, or a room that has never quite worked.",
  },
];

export const principles = [
  {
    title: "Restraint before decoration",
    text: "We remove before we add. A room reads more generously when every piece in it has a reason to be there.",
    image: "/images/principle-restraint.webp",
    imageAlt: "A quiet apartment corner with a single linen chair and clear floor space",
  },
  {
    title: "Proportion over trend",
    text: "Scale, circulation and sightlines decide whether a room feels calm. We resolve those first, then choose the pieces.",
    image: "/images/principle-proportion.webp",
    imageAlt: "A properly scaled living room with a clear route to the balcony",
  },
  {
    title: "Materials you want to touch",
    text: "Linen, oak, travertine, wool, ceramic. Natural surfaces age well and photograph honestly in Dubai daylight.",
    image: "/images/principle-materials.webp",
    imageAlt: "Linen, travertine, oak, ceramic and wool in close detail",
  },
  {
    title: "Built for the climate",
    text: "Strong light, glare and long summers shape what we specify — from textile weights to how a room meets its windows.",
    image: "/images/principle-climate.webp",
    imageAlt: "A deeply shaded Dubai window with lightweight linen and a walnut bench",
  },
];

/* The concept grid on /spaces/ and the pager on each concept page. Everything
   else a concept page says — its SEO title, its decisions, its palette — is
   written in that page's own file, app/spaces/<slug>/page.tsx. */
export type Concept = {
  slug: string;
  title: string;
  type: string;
  location: string;
  image: string;
  description: string;
};

export const concepts: Concept[] = [
  {
    slug: "garden-villa",
    title: "The garden villa",
    type: "Villa",
    location: "Dubai",
    image: img.heroVilla,
    description:
      "Soft linen, warm timber and open sightlines. A calm, welcoming approach to styling and staging a family villa in Dubai.",
  },
  {
    slug: "city-residence",
    title: "The city residence",
    type: "Apartment",
    location: "Dubai",
    image: img.dining,
    description:
      "A considered dining space that brings warmth and everyday ease to city living.",
  },
  {
    slug: "quiet-retreat",
    title: "The quiet retreat",
    type: "Bedroom",
    location: "Dubai",
    image: img.bedroom,
    description:
      "Layered textures and gentle tones create a bedroom that feels instantly restful.",
  },
  {
    slug: "townhouse-family",
    title: "The family townhouse",
    type: "Townhouse",
    location: "Dubai",
    image: img.spaceTownhouse,
    description:
      "An open-plan ground floor arranged so a family can read the whole layout at a glance.",
  },
  {
    slug: "skyline-penthouse",
    title: "The skyline penthouse",
    type: "Apartment",
    location: "Dubai",
    image: img.spacePenthouse,
    description:
      "A restrained penthouse interior for a Dubai apartment, with the attention kept on the view and the light.",
  },
  {
    slug: "majlis-welcome",
    title: "The majlis",
    type: "Villa",
    location: "Dubai",
    image: img.spaceMajlis,
    description:
      "A modern majlis design for a Dubai villa: a formal receiving room styled for generous seating and easy conversation.",
  },
  {
    slug: "first-impression-entrance",
    title: "The entrance",
    type: "Detail",
    location: "Dubai",
    image: img.spaceEntrance,
    description:
      "The first three metres of a home, treated as carefully as the rooms beyond.",
  },
  {
    slug: "shaded-terrace",
    title: "The shaded terrace",
    type: "Detail",
    location: "Dubai",
    image: img.spaceTerrace,
    description:
      "Outdoor space styled as a usable room, not an afterthought at the end of the tour.",
  },
];

export const conceptFilters = [
  "All spaces",
  "Villa",
  "Apartment",
  "Townhouse",
  "Bedroom",
  "Detail",
];

/** Neighbouring concepts, for the previous / next pager on a detail page. */
export function conceptNeighbours(slug: string) {
  const i = concepts.findIndex((c) => c.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: concepts[(i - 1 + concepts.length) % concepts.length],
    next: concepts[(i + 1) % concepts.length],
  };
}

/* ------------------------------------------------------------------ *
 * Homepage content that is also read elsewhere.
 * ------------------------------------------------------------------ */

/**
 * The four photographs the hero cross-dissolves between.
 *
 * Deliberately four different kinds of room — a villa living room, a
 * penthouse at the glass, a majlis and a shaded terrace — so the rotation
 * shows the range of the work rather than four angles on one house. Each is
 * a room that already has a concept page, so nothing here is invented.
 *
 * Frame one carries the real alt text: it is what the server renders and the
 * only one a visitor without JavaScript ever sees, so it has to stand on its
 * own as the hero.
 */
export const heroFrames = [
  {
    image: img.heroFrame1,
    width: 1672,
    height: 941,
    alt: "Sunlit villa living room with linen furniture, travertine and garden views",
    label: "the garden villa",
  },
  {
    image: img.heroFrame2,
    width: 1440,
    height: 810,
    alt: "A low-furnished penthouse living room facing floor-to-ceiling glass",
    label: "the skyline penthouse",
  },
  {
    image: img.heroFrame3,
    width: 1440,
    height: 810,
    alt: "A majlis with perimeter seating and layered floor textiles",
    label: "the majlis",
  },
  {
    image: img.heroFrame4,
    width: 1440,
    height: 810,
    alt: "A shaded terrace styled with seating for two and a single planter",
    label: "the shaded terrace",
  },
];

/**
 * The studio's credibility row — a single thin strip of facts under the Dubai
 * band, where the reference site puts its "5+ years".
 *
 * PLACEHOLDER FIGURES. None of these numbers has been confirmed by the
 * studio. Replace them with real ones and set the flag below to false; a
 * staging site may show invented figures, a live one may not.
 */
export const studioFacts = [
  "120+ homes styled",
  "Across Dubai",
  "7-day turnaround",
];
export const studioFactsArePlaceholder = true;

/**
 * The logos in the trust row.
 *
 * These are Halo Interiors' client brands, carried across from halo.ae at the
 * studio's request. They are not Havenly's own staging clients, so the
 * heading and the line under the row say "our wider team" rather than "our
 * clients" — the logos are true of the group, and the copy has to be true of
 * the studio. Do not retitle this to "Our clients" without new evidence.
 */
export const partners = [
  { name: "Dubai Properties", image: "/images/partner-dubai-properties.webp" },
  { name: "Jumeirah", image: "/images/partner-jumeirah.webp" },
  { name: "Majid Al Futtaim", image: "/images/partner-majid-al-futtaim.webp" },
  { name: "One&Only", image: "/images/partner-one-and-only.webp" },
  { name: "Rotana", image: "/images/partner-rotana.webp" },
  { name: "Sheraton", image: "/images/partner-sheraton.webp" },
  { name: "Siemens", image: "/images/partner-siemens.webp" },
  { name: "Iskon", image: "/images/partner-iskon.webp" },
];

/**
 * UNVERIFIED ATTRIBUTION. Nobody has confirmed that Havenly may show
 * these marks under its own name, or that each brand's usage terms allow it.
 * Set this to false once the studio confirms; until then the row carries the
 * note below, the same way studioFacts carries its placeholder flag.
 */
export const partnersAreUnverified = true;

/**
 * The founder, for the signed note on the about page.
 *
 * `name` is deliberately empty. Until the studio supplies a real one the note
 * signs as "The founder, Havenly" — an unnamed real person, rather than
 * an invented named one. Fill `name` and `role` in and the signature switches
 * to them with no other change.
 */
export const founder = {
  name: "",
  role: "Founder & lead stylist",
  image: img.founderPortrait,
  imageAlt:
    "The founder of Havenly in a styled Dubai living room, daylight from frame left",
  /* Four short paragraphs. The note is signed, so it is written in the first
     person and says something the rest of the site cannot: why the studio
     works the way it does, from the person who decided it would. */
  note: [
    "I started Havenly after years of walking into beautiful properties that were not showing what they were. The architecture was there. The light was there. The room just had no idea what it was for.",
    "Staging, done honestly, is not decoration. It is editing. Most of what we do on a project is decide what comes out — and the rooms get bigger, quieter and easier to read for it.",
    "We work out of Al Quoz and across Dubai, on villas, apartments and handovers. Every project starts the same way: we walk the property with you and listen before we propose anything.",
    "If your property is not doing itself justice, send two photographs from the doorway. We will tell you honestly whether you need us.",
  ],
};

/** The signature line — a real name once there is one, the role until then. */
export function founderSignature() {
  return founder.name || "The founder, Havenly";
}

/**
 * PLACEHOLDER. The portrait does not exist yet and the note, while written to
 * the studio's voice, has not been approved by the person who will sign it.
 * Nothing here may go to production unmodified: a signed first-person note is
 * the one piece of placeholder copy a visitor would read as a lie rather than
 * as unfinished work. The portrait prompt is in docs/image-prompts.md.
 */
export const founderIsPlaceholder = true;

/** The four materials the studio keeps returning to. */
export const materials = [
  {
    name: "Linen",
    image: img.swatchLinen,
    alt: "Close detail of oatmeal linen, creased and lit from one side",
  },
  {
    name: "Oak",
    image: img.swatchOak,
    alt: "Close detail of pale oak, the grain running across the frame",
  },
  {
    name: "Travertine",
    image: img.swatchTravertine,
    alt: "Close detail of honed travertine, its open pores catching the light",
  },
  {
    name: "Bouclé",
    image: img.swatchBoucle,
    alt: "Close detail of chalk bouclé, looped and shadowed",
  },
];

/**
 * The four steps of a project. The text is deliberately one line each: the
 * photograph beside them carries the rest, so a paragraph per step would
 * only repeat what the picture already says.
 */
export const processSteps = [
  {
    title: "Let’s get to know your space",
    text: "We walk the property, listen to your plans and agree a timeline.",
    image: img.processConsultation,
  },
  {
    title: "A plan, made for you",
    text: "One direction — layouts, furniture, textures and finishing touches.",
    image: img.processMoodboard,
  },
  {
    title: "Watch it come together",
    text: "We coordinate delivery, placement and styling in a single install.",
    image: img.processInstall,
  },
  {
    title: "Ready for its next chapter",
    text: "A finished space, ready for photography, viewings or settling in.",
    image: img.processReveal,
  },
];

/** General questions, shared by the homepage and the questions page. */
export const generalFaqs = [
  {
    question: "What is home staging?",
    answer:
      "Home staging prepares a property for viewings and photography through furniture placement, styling and a clear sense of how each room can be used. The aim is to help potential buyers or tenants imagine living there.",
  },
  {
    question: "Can you work with the furniture I already own?",
    answer:
      "Yes. We can start with your existing pieces and recommend what to keep, rearrange or complement. Your consultation helps establish whether a styling refresh or a fuller furnishing plan is the right fit.",
  },
  {
    question: "Which areas of Dubai do you cover?",
    answer:
      "We work across Dubai, from Dubai Marina, Downtown and Business Bay to Palm Jumeirah, Dubai Hills Estate and Arabian Ranches. Share your community and building so we can confirm site visits, delivery arrangements and availability.",
  },
  {
    question: "How much does home staging cost?",
    answer:
      "Home staging cost depends on the property size, the rooms involved, the furniture required and the staging period. Tell us about your space and timeline and we will send a clear scope and fee.",
  },
  {
    question: "How long does the process take?",
    answer:
      "Timing depends on the scope, furniture availability and access to the property. We agree a realistic schedule with you before starting, including installation and any collection arrangements.",
  },
];
