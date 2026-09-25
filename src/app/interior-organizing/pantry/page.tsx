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

/* Owns "pantry organization dubai". Supporting: pantry organizer, pantry
   cabinets, spice rack organization, airtight food storage canisters,
   kitchen food storage containers. */
const path = roomHref("pantry");
const description =
  "Pantry organization in Dubai: staples decanted into airtight canisters, stepped shelves and clear labels, planned to your shelf depths. Book a visit.";

export const metadata: Metadata = pageMetadata({
  title: "Pantry Organization Dubai | Canisters, Shelves & Labels",
  description,
  path,
  image: img.orgPantry,
});

const waMessage =
  "Hello Havenly, I'd like to book a consultation to organize my pantry.";

/* The four moves, in this room's words. */
const moveLines = [
  "We measure shelf depths and heights, and ask what your household buys weekly and in bulk.",
  "Dates first: expired and duplicated items come out before anything is decided.",
  "Canisters and bins sized to the shelf, zoned baking, breakfast, snacks, grains, backstock.",
  "Labels printed, shelves styled, and a restocking routine anyone can follow.",
];

const packages: RoomPackage[] = [
  {
    name: "Pantry cabinet",
    scope:
      "A pantry cupboard or a single run of shelves, edited, decanted and labelled.",
  },
  {
    name: "Walk-in pantry",
    scope:
      "A full walk-in, zoned floor to ceiling, with canisters and bins sized to each shelf.",
  },
  {
    name: "Pantry & fridge",
    scope:
      "Everything that is eaten, stored as one joined-up system with a restocking list.",
  },
];

const faqs = [
  {
    question: "Do you decant everything into jars?",
    answer:
      "No — only what earns it. Staples you use often and buy in bulk are decanted. Items you buy and finish in their packaging stay in it, grouped in bins.",
  },
  {
    question: "What happens to expiry dates once food is decanted?",
    answer:
      "The label carries the item's name and, where it matters, its best-before date. We also show you how to refill from the back so older stock is used first.",
  },
  {
    question: "Our pantry is just a kitchen cupboard. Is it worth it?",
    answer:
      "Small pantries benefit most. Risers, turntables and door racks add usable space to a single cabinet, and the edit alone usually frees a shelf.",
  },
  {
    question: "Do glass canisters work in Dubai's humidity?",
    answer:
      "Airtight seals are exactly why we choose them — they keep staples dry and pests out. We select proper gasket lids for dry goods rather than decorative jars.",
  },
  {
    question: "Can the pantry be done with the kitchen?",
    answer:
      "Yes, and it is often better. The kitchen & pantry package plans both at once, so everyday items and backstock are split sensibly.",
  },
];

export default function PantryOrganizingPage() {
  return (
    <main id="main">
      <RoomJsonLd
        name="Pantry organization"
        description={description}
        path={path}
        image={img.orgPantry}
        faqs={faqs}
      />

      <OrgHero
        eyebrow="INTERIOR ORGANIZING"
        title="See everything. Buy only what you need."
        lead="Staples decanted, shelves stepped so nothing hides at the back, and labels the whole household can read."
        image={img.orgPantry}
        imageAlt="Pantry shelves with airtight glass canisters, woven baskets and labels"
        crumbs={[
          { href: "/", label: "Home" },
          { href: ORGANIZING_HREF, label: "Interior organizing" },
          { label: "Pantry" },
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
        line="A pantry you can read at a glance."
        body="Staples decanted into a few considered sizes, shelves stepped so the back row can still be read, and labels the whole household can follow."
        wide={img.orgPantry}
        wideAlt="Pantry shelves with airtight glass canisters, woven baskets and handwritten labels"
        detail={img.orgPantryDetail}
        detailAlt="Close detail of airtight glass canisters holding grains, filled to different levels"
      />
      <StyleRail
        room="pantry"
        title="A pantry can work five ways."
        styles={[
          {
            slug: "butlers",
            name: "Butler's pantry",
            note: "A small room off the kitchen, where the work and the mess both go.",
            alt: "Butler's pantry off a kitchen: a run of counter, decanted staples on open shelves and a doorway back to the kitchen",
          },
          {
            slug: "walk-in",
            name: "Walk-in pantry",
            note: "Three walls of shelf, zoned so the back row can still be read.",
            alt: "Walk-in pantry with shelving on three walls, canisters at eye level and baskets above",
          },
          {
            slug: "cabinet",
            name: "Cabinet pantry",
            note: "One tall cupboard on pull-outs — the whole pantry in a metre.",
            alt: "Tall cabinet pantry with pull-out shelves drawn part-way open, jars and packets grouped by shelf",
          },
          {
            slug: "open-shelf",
            name: "Open shelving",
            note: "On display, so the system has to be kept — and is easy to.",
            alt: "Open pantry shelving on a plaster wall, glass canisters and stacked crockery with nothing hidden",
          },
          {
            slug: "under-stair",
            name: "Under the stairs",
            note: "The awkward wedge, shelved to its own height rather than a standard one.",
            alt: "Under-stair pantry with shelves cut to the rake of the stairs, tall items at the high end",
          },
        ]}
      />

      <Moves lines={moveLines} tone="linen" />
      <Zoning
        title="A pantry, zoned."
        image={img.orgPantry}
        imageAlt="Pantry shelving with baskets above, glass canisters at eye level and a tray below"
        zones={[
          {
            label: "Up high, seldom",
            note: "Bulk and back-up in lidded baskets, where reaching is worth the trouble.",
            x: 47,
            y: 15,
          },
          {
            label: "Eye level, daily",
            note: "Decanted staples at the front edge, so the shelf can be read at a glance.",
            x: 53,
            y: 47,
          },
          {
            label: "Low and heavy",
            note: "Oils, tins and anything you would rather not lift down from a height.",
            x: 55,
            y: 79,
          },
        ]}
      />

      <RoomSourcing groups={[
        { title: "Decanting", items: "A few considered sizes, filled to real levels." },
        { title: "Shelves", items: "Everyday food visible from the front edge." },
        { title: "Spices", items: "One clear place for every jar and packet." },
      ]} />
      <RoomPackages title="Choose your pantry reset." packages={packages} />

      <Questions
        faqs={faqs}
        image={img.orgHero}
        imageAlt="An organizing consultation in progress: a measured plan, container samples and a tape measure"
      />

      <RoomClose slug="pantry" space="pantry" message={waMessage} />
    </main>
  );
}
