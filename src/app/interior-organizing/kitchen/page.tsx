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

/* Owns "kitchen organization dubai". Supporting: kitchen organizer,
   drawer organizer, kitchen cabinet storage, fridge organization, kitchen
   storage containers. The pantry has its own page. */
const path = roomHref("kitchen");
const description =
  "Kitchen organization in Dubai: cabinets, drawers and the fridge zoned around how you cook, with organizers measured to fit. Book a visit.";

export const metadata: Metadata = pageMetadata({
  title: "Kitchen Organization Dubai | Drawers, Cabinets & Fridge",
  description,
  path,
  image: img.orgKitchen,
});

const waMessage =
  "Hello Havenly, I'd like to book a consultation to organize my kitchen.";

/* The four moves, in this room's words. */
const moveLines = [
  "We measure every drawer, cabinet and shelf, and watch how the kitchen is used.",
  "Everything out. Duplicate utensils, expired spices and lids without pots go first.",
  "Dividers cut to your drawers; knives by the board, plates by the dishwasher.",
  "Open shelves styled, the counter cleared, and a system your helper can hold.",
];

const packages: RoomPackage[] = [
  {
    name: "Drawer & cabinet reset",
    scope:
      "Up to six drawers or cabinets, edited, regrouped and fitted with organizers measured to them.",
  },
  {
    name: "Full kitchen",
    scope:
      "Every cabinet, drawer and the fridge, zoned as one system and styled at the end.",
  },
  {
    name: "Kitchen & pantry",
    scope:
      "Both planned together, so everyday items and backstock are split sensibly between them.",
  },
];

const faqs = [
  {
    question: "How long does it take to organize a kitchen?",
    answer:
      "Most kitchens take one day on site after the consultation; a large kitchen with a pantry can take two. Your timeline is confirmed in the scope, once we have seen how much is in the cupboards.",
  },
  {
    question: "Do we have to empty the kitchen before you arrive?",
    answer:
      "No — taking everything out is the first step of the session, and we do it with you. It is how items get grouped by category rather than by the cupboard they happened to be in.",
  },
  {
    question: "Can you work with the storage we already have?",
    answer:
      "Yes. Existing containers that fit the plan are kept and reused. We only recommend new products where they genuinely improve how the space works or how easy it is to maintain.",
  },
  {
    question: "Will our helper be able to keep it organized?",
    answer:
      "That is what zoning and labels are for. At the final walkthrough we show whoever uses the kitchen day to day where everything lives and why.",
  },
  {
    question: "How much does it cost?",
    answer:
      "It follows the size of the kitchen, how much is in it and which products the system needs. You receive a written scope and fee after the visit, before any work begins.",
  },
];

export default function KitchenOrganizingPage() {
  return (
    <main id="main">
      <RoomJsonLd
        name="Kitchen organization"
        description={description}
        path={path}
        image={img.orgKitchen}
        faqs={faqs}
      />

      <OrgHero
        eyebrow="INTERIOR ORGANIZING"
        title="A kitchen that works as hard as you do."
        lead="Cabinets, drawers and the fridge, zoned around the way you actually cook — so the counter stays clear."
        image={img.orgKitchen}
        imageAlt="Kitchen drawer fitted with oak dividers, utensils grouped by use"
        crumbs={[
          { href: "/", label: "Home" },
          { href: ORGANIZING_HREF, label: "Interior organizing" },
          { label: "Kitchen" },
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
        line="A kitchen that moves with you."
        body="Everything you reach for while cooking within a step of where you cook it. Dividers cut to your drawers, deep cabinets made visible again, and a counter that stays clear."
        wide={img.orgKitchen}
        wideAlt="Kitchen drawer fitted with oak dividers, utensils grouped by use and nothing stacked"
        detail={img.orgKitchenDetail}
        detailAlt="Close detail of an oak drawer divider holding wooden utensils"
      />

      <StyleRail
        room="kitchen"
        title="A kitchen can work five ways."
        styles={[
          {
            slug: "drawers",
            name: "Drawer-led",
            note: "Deep drawers instead of low cupboards. Nothing is on its knees to be found.",
            alt: "Kitchen with deep pot drawers pulled open, pans and lids standing on edge in dividers",
          },
          {
            slug: "galley",
            name: "Galley",
            note: "A narrow run, worked in order — so two people never cross.",
            alt: "Narrow galley kitchen with a run of counter each side, everything stored on the side it is used",
          },
          {
            slug: "island",
            name: "Island",
            note: "Prep in the middle, storage at the edges, and the island kept clear.",
            alt: "Kitchen island with a clear stone top, drawers beneath it and cabinetry along the far wall",
          },
          {
            slug: "handleless",
            name: "Closed and handleless",
            note: "Everything behind a flat front, which only works if the inside is planned.",
            alt: "Handleless kitchen cabinetry, one door open to divided interior storage",
          },
          {
            slug: "open-shelf",
            name: "Open shelf",
            note: "Daily crockery out, everything else away. An edit that has to hold.",
            alt: "Kitchen with open timber shelves holding daily crockery above a stone counter",
          },
        ]}
      />

      <Moves lines={moveLines} tone="linen" />

      <Zoning
        title="A kitchen, zoned."
        image={img.orgKitchen}
        imageAlt="Kitchen counter with a hob, an open drawer of dividers and a crock of utensils"
        zones={[
          {
            label: "Within arm's reach",
            note: "The few things used at every meal, kept out and by the hob.",
            x: 22,
            y: 26,
          },
          {
            label: "Cut to the drawer",
            note: "Dividers measured to the drawer, one group per channel — nothing stacked.",
            x: 44,
            y: 68,
          },
          {
            label: "Behind the doors",
            note: "Bulk, back-ups and what gets used once a week, out of the working run.",
            x: 80,
            y: 62,
          },
        ]}
      />

      <RoomSourcing
        groups={[
          { title: "Drawers", items: "Dividers and inserts planned around daily prep." },
          { title: "Cabinets", items: "Containers that make deep storage visible." },
          { title: "Fridge & freezer", items: "Clear zones for what gets used most." },
        ]}
      />

      <RoomPackages title="Choose your kitchen reset." packages={packages} />

      <Questions
        faqs={faqs}
        image={img.orgHero}
        imageAlt="An organizing consultation in progress: a measured plan, container samples and a tape measure"
      />

      <RoomClose slug="kitchen" space="kitchen" message={waMessage} />
    </main>
  );
}
