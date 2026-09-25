import type { Metadata } from "next";
import { WhatsappButton } from "@/components/creative";
import { Arrow } from "@/components/interactive";
import {
  Moves,
  OrgHero,
  Questions,
  RoomClose,
  RoomJsonLd,
  RoomPackages,
  RoomSourcing,
  RoomStory,
  StyleRail,
  Zoning,
} from "@/components/organizing";
import { img } from "@/lib/images";
import { ORGANIZING_HREF, type RoomPackage, roomHref } from "@/lib/organizing";
import { pageMetadata } from "@/lib/seo";

/* Owns "laundry room organization dubai". Supporting: laundry room storage,
   storage for laundry, laundry area storage, utility room organization,
   linen closet. */
const path = roomHref("laundry");
const description =
  "Laundry room organization in Dubai: sorting, supplies, ironing and linen each given a place, with storage measured to fit even a small laundry cupboard.";

export const metadata: Metadata = pageMetadata({
  title: "Laundry Room Organization Dubai | Storage & Linen",
  description,
  path,
  image: img.orgLaundry,
});

const waMessage =
  "Hello Havenly, I'd like to book a consultation to organize my laundry room.";

/* The four moves, in this room's words. */
const moveLines = [
  "We measure the space above and beside the machines — usually the space nobody is using.",
  "Duplicates, empty bottles and the things that simply ended up here come out.",
  "Decanted supplies by the machine, sorting baskets by wash type, hazards up high.",
  "Linen folded to one standard and stored in sets, labelled for whoever does the wash.",
];

const packages: RoomPackage[] = [
  {
    name: "Laundry area",
    scope:
      "A laundry cupboard or the corner around the machines, decanted and sorted.",
  },
  {
    name: "Laundry room",
    scope:
      "A dedicated room zoned for the full cycle, including cleaning supplies and tools.",
  },
  {
    name: "Laundry & linen",
    scope:
      "The laundry room together with the home's linen storage, folded to one standard.",
  },
];

const faqs = [
  {
    question: "Ours is just a cupboard. Can it still be organized?",
    answer:
      "Yes — most Dubai apartments have a laundry cupboard rather than a room, and that is where planning matters most. Shelves above the machines, slim carts beside them and door storage hold a great deal.",
  },
  {
    question: "Why decant detergents?",
    answer:
      "Large bottles take a lot of shelf and are awkward to pour. Decanting into labelled dispensers saves space and shows at a glance what is running low. Where a product is better left in its packaging, we leave it.",
  },
  {
    question: "Can our helper keep the system going?",
    answer:
      "It is designed for whoever does the laundry. Zones follow the order of the work, labels say what goes where, and we walk through it together at the end.",
  },
  {
    question: "Do you organize linen cupboards as well?",
    answer:
      "Yes. Linen is folded to one standard and stored in sets — a sheet set inside its own pillowcase, grouped by room — so making a bed means taking one bundle off a shelf.",
  },
  {
    question: "Where should cleaning supplies go?",
    answer:
      "Often in the laundry, if there is space. We group them by task, keep anything hazardous high and away from children, and store mops and the vacuum upright rather than on the floor.",
  },
];

export default function LaundryOrganizingPage() {
  return (
    <main id="main">
      <RoomJsonLd
        name="Laundry room organization"
        description={description}
        path={path}
        image={img.orgLaundry}
        faqs={faqs}
      />

      <OrgHero
        eyebrow="INTERIOR ORGANIZING"
        title="A small room that works harder."
        lead="Sorting, supplies, ironing and linen, planned in the order the work actually happens."
        image={img.orgLaundry}
        imageAlt="Laundry room with labelled supply jars and stacked linen"
        crumbs={[
          { href: "/", label: "Home" },
          { href: ORGANIZING_HREF, label: "Interior organizing" },
          { label: "Laundry" },
        ]}
        actions={
          <>
            <WhatsappButton className="button button-light" message={waMessage}>
              Book a visit
            </WhatsappButton>
            <a className="text-link" href="#packages">
              See packages <Arrow />
            </a>
          </>
        }
      />

      <RoomStory
        line="Planned in the order the work happens."
        body="Sorting, washing, folding, putting away — the room laid out in the order the work happens, with supplies decanted and linen kept in sets."
        wide={img.orgLaundry}
        wideAlt="Laundry room with labelled supply jars, a rolling sorting cart and stacked linen"
        detail={img.orgLaundryDetail}
        detailAlt="Close detail of labelled glass dispensers holding detergent at different levels"
      />
      <StyleRail
        room="laundry"
        title="A laundry can work five ways."
        styles={[
          {
            slug: "room",
            name: "Laundry room",
            note: "A room laid out in the order the work happens.",
            alt: "Laundry room with machines, a folding counter and shelving of decanted supplies above",
          },
          {
            slug: "closet",
            name: "Laundry cupboard",
            note: "A metre wide, doors closed, and still a system.",
            alt: "Laundry cupboard with stacked machines, a narrow shelf of supplies and doors open",
          },
          {
            slug: "stacked",
            name: "Stacked in a niche",
            note: "Machines one above the other, with the space beside them worked.",
            alt: "Stacked washer and dryer in a niche with a narrow rolling cart in the gap beside them",
          },
          {
            slug: "utility",
            name: "Utility and mudroom",
            note: "Laundry that also has to take shoes, bags and the outside.",
            alt: "Utility room with laundry machines on one side and hooks, a bench and shoe storage opposite",
          },
          {
            slug: "linen",
            name: "Laundry and linen store",
            note: "Washing and storing in one room, kept firmly apart.",
            alt: "Laundry room with a machine run and a separate shelved linen store, sets folded together",
          },
        ]}
      />

      <Moves lines={moveLines} tone="linen" />
      <Zoning
        title="A laundry, zoned."
        image={img.orgLaundry}
        imageAlt="Laundry room with a sorting cart, decanted supplies on a shelf and folded linen above"
        zones={[
          {
            label: "Linen, out",
            note: "Clean sets folded together on the top shelf — one shelf, one household.",
            x: 47,
            y: 20,
          },
          {
            label: "Supplies, decanted",
            note: "Detergent and softener in dispensers you can see the level through.",
            x: 42,
            y: 41,
          },
          {
            label: "Sorting, in",
            note: "A cart at the door takes the load before it reaches the machine.",
            x: 20,
            y: 63,
          },
        ]}
      />

      <RoomSourcing groups={[
        { title: "Sorting", items: "Baskets that guide laundry through the room." },
        { title: "Supplies", items: "Everyday products kept clear and within reach." },
        { title: "Linen", items: "Sets stored together, ready when needed." },
      ]} />
      <RoomPackages title="Choose your laundry reset." packages={packages} />

      <Questions
        faqs={faqs}
        image={img.orgHero}
        imageAlt="An organizing consultation in progress: a measured plan, container samples and a tape measure"
      />

      <RoomClose slug="laundry" space="laundry" message={waMessage} />
    </main>
  );
}
