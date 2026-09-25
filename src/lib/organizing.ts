import { img } from "@/lib/images";

/**
 * Interior organizing — the room-by-room pillar.
 *
 * Every room has its own hand-written page under src/app/interior-organizing/
 * rather than one [slug] template fed from data: each page carries copy,
 * products and questions specific to that room, which is what lets it rank
 * for that room instead of reading as one page seven times. What lives here
 * is only what other pages need to *list* the rooms — the hub, the menu, the
 * footer and the sitemap — plus the four moves, which are genuinely the same
 * everywhere.
 *
 * Keyword ownership is in keywords_planner/page_keyword_map.csv.
 */

export const ORGANIZING_HREF = "/interior-organizing/";

export type Room = {
  slug: string;
  title: string;
  /** One line, shown on the tile under the room's name. */
  summary: string;
  image: string;
  imageAlt: string;
};

export const rooms: Room[] = [
  {
    slug: "kitchen",
    title: "Kitchen",
    summary: "Cabinets, drawers and the fridge, zoned around how you cook.",
    image: img.orgKitchen,
    imageAlt:
      "Kitchen drawer fitted with oak dividers, utensils grouped by use and nothing stacked",
  },
  {
    slug: "pantry",
    title: "Pantry",
    summary: "Decanted staples, stepped shelves, labels the household can read.",
    image: img.orgPantry,
    imageAlt:
      "Pantry shelves with airtight glass canisters, woven baskets and handwritten labels",
  },
  {
    slug: "bedroom",
    title: "Bedroom & wardrobe",
    summary: "Wardrobes and walk-ins measured, edited and fitted out.",
    image: img.orgBedroom,
    imageAlt:
      "Walk-in wardrobe with matching velvet hangers, folded knitwear and shoes on angled shelves",
  },
  {
    slug: "kids-room",
    title: "Kids room",
    summary: "Low, labelled storage a child can use on their own.",
    image: img.orgKids,
    imageAlt:
      "Child's room with low open shelving, lidded toy baskets and picture labels",
  },
  {
    slug: "bathrooms",
    title: "Bathrooms",
    summary: "Vanities and under-sink cupboards reset to a calm counter.",
    image: img.orgBathroom,
    imageAlt:
      "Bathroom vanity with a stone tray of daily essentials and folded towels in a linen basket",
  },
  {
    slug: "laundry",
    title: "Laundry",
    summary: "Sorting, supplies and linen, each given a place.",
    image: img.orgLaundry,
    imageAlt:
      "Laundry room with labelled supply jars, a rolling sorting cart and stacked linen",
  },
  {
    slug: "garage",
    title: "Garage",
    summary: "Sport, tools, seasonal and overflow — on shelves, off the floor.",
    image: img.orgGarage,
    imageAlt:
      "Villa garage with shelving along one wall and labelled lidded boxes grouped by category",
  },
];

export function roomHref(slug: string) {
  return `${ORGANIZING_HREF}${slug}/`;
}

/** The rooms after this one, for the pager at the foot of a page. */
export function otherRooms(slug: string, count = 2) {
  const i = rooms.findIndex((room) => room.slug === slug);
  return Array.from(
    { length: count },
    (_, n) => rooms[(i + n + 1) % rooms.length],
  );
}

/* ------------------------------------------------------------------ *
 * The four moves
 * ------------------------------------------------------------------ */

export type Move = {
  title: string;
  /** The generic line, used where a page gives no wording of its own. */
  text: string;
  image: string;
  alt: string;
};

/**
 * The whole framework, in four.
 *
 * The client's brief sets it out as five stages with their own sub-lists —
 * the consultation's five points, the four steps of the edit, four rules for
 * the system, four for the finish. All of it is true and none of it is worth
 * twenty-two lines of type on a page someone is scanning: the detail belongs
 * in the proposal the consultation produces. Here it is four photographs with
 * a sentence each, and every room page writes those four sentences in its own
 * words.
 */
export const moves: Move[] = [
  {
    title: "Visit",
    text: "We see how you live in the room, and measure every shelf and drawer.",
    image: img.orgVisit,
    alt: "A tape measure, a sketched shelf plan and container samples on a table",
  },
  {
    title: "Edit",
    text: "Everything comes out and is grouped. Keep, donate, discard — your call, every time.",
    image: img.orgEdit,
    alt: "Items grouped by category on a table, part-way through an edit",
  },
  {
    title: "Fit",
    text: "Containers measured to your space, zoned by how often you reach for things.",
    image: img.orgFit,
    alt: "Storage containers being placed into a fitted shelf",
  },
  {
    title: "Finish",
    text: "Styled, aligned, labelled — then a walkthrough, and the habits that keep it.",
    image: img.orgFinish,
    alt: "A finished shelf, styled and evenly spaced",
  },
];

/* ------------------------------------------------------------------ *
 * Packages
 * ------------------------------------------------------------------ */

/**
 * Starting prices are the studio's to set. Until they are confirmed, a
 * package prints "After your visit" in place of a figure — set `from`
 * (e.g. "AED 1,800") to show one. No price has been invented anywhere.
 */
export type RoomPackage = {
  name: string;
  /** One sentence. What the package covers, not a list of inclusions. */
  scope: string;
  from?: string;
};
