import type { Metadata } from "next";
import { WhatsappButton } from "@/components/creative";
import { Arrow } from "@/components/interactive";
import {
  BeforeIllustration,
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

/* Owns "garage organization dubai". Supporting: garage storage, garage
   storage dubai, garage shelving dubai, professional garage organizers,
   store room organization. */
const path = roomHref("garage");
const description =
  "Garage and store room organization in Dubai: sport, tools, seasonal and overflow zoned onto shelving and into labelled boxes, off the floor and easy to find.";

export const metadata: Metadata = pageMetadata({
  title: "Garage Organization Dubai | Garage & Store Room Storage",
  description,
  path,
  image: img.orgGarage,
});

const waMessage =
  "Hello Havenly, I'd like to book a consultation to organize my garage.";

/* The four moves, in this room's words. */
const moveLines = [
  "We measure wall lengths and ceiling height, and ask whether you want to park here again.",
  "Everything out onto the driveway, grouped before a single decision is made.",
  "Heavy-duty shelving and wall rails: sport, tools, seasonal, travel, overflow.",
  "Large labels, an inventory of what is where, and a floor you can walk across.",
];

const packages: RoomPackage[] = [
  {
    name: "Store room",
    scope:
      "A villa store room, edited box by box and zoned by category, with an inventory list.",
  },
  {
    name: "Garage",
    scope:
      "A single or double garage cleared, zoned and shelved, with the floor freed up.",
  },
  {
    name: "Garage & store room",
    scope:
      "Every storage space in the villa organized as one system, with shared zones.",
  },
];

const faqs = [
  {
    question: "How long does a garage take?",
    answer:
      "Garages vary more than any other room. A single garage is often one day; a full double garage and store room can take two or three. The consultation gives you a realistic timeline.",
  },
  {
    question: "Does the heat in a Dubai garage matter?",
    answer:
      "Very much. Summer heat damages candles, paint, electronics, photographs and some plastics. We flag anything that should move indoors, and choose containers that tolerate high temperatures.",
  },
  {
    question: "What happens to everything we don't keep?",
    answer:
      "It is separated during the session into donate, discard and relocate. How it leaves the villa, and where donations go, is agreed with you as part of the scope.",
  },
  {
    question: "Do you install shelving?",
    answer:
      "We plan and fit freestanding shelving and wall-mounted systems suited to garages. Anything that needs drilling into structural walls is confirmed at the consultation.",
  },
  {
    question: "Can you make room to park the car again?",
    answer:
      "Often, yes. Moving storage onto shelving and walls usually frees the floor. We plan the layout around the car's footprint and door clearances if parking is the goal.",
  },
];

export default function GarageOrganizingPage() {
  return (
    <main id="main">
      <RoomJsonLd
        name="Garage and store room organization"
        description={description}
        path={path}
        image={img.orgGarage}
        faqs={faqs}
      />

      <OrgHero
        eyebrow="INTERIOR ORGANIZING"
        title="Off the floor, and easy to find."
        image={img.orgGarage}
        imageAlt="Villa garage with shelving and labelled lidded boxes grouped by category"
        crumbs={[
          { href: "/", label: "Home" },
          { href: ORGANIZING_HREF, label: "Interior organizing" },
          { label: "Garage" },
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
        line="Where everything else ends up, finally placed."
        body="Sport, tools, seasonal and overflow, each given a wall rather than a corner. Shelving takes the weight, labelled boxes take the rest, and the floor comes back."
        wide={img.orgGarage}
        wideAlt="Villa garage with shelving along one wall and labelled lidded boxes grouped by category"
        detail={img.orgGarageDetail}
        detailAlt="Close detail of a labelled lidded storage box on steel garage shelving"
      />
      <StyleRail
        room="garage"
        title="A garage can work many ways."
        styles={[
          {
            slug: "single",
            name: "Single garage",
            note: "One car and everything else, which is a question of walls.",
            alt: "Single villa garage with shelving along one wall, labelled boxes and a clear parking bay",
          },
          {
            slug: "double",
            name: "Double garage",
            note: "Two bays and a working aisle between them that stays clear.",
            alt: "Double garage with shelving on both side walls and a clear aisle down the middle",
          },
          {
            slug: "store-room",
            name: "Garage and store room",
            note: "The store takes the seasonal, so the garage can take the car.",
            alt: "Garage with a doorway to a shelved store room holding lidded seasonal boxes",
          },
          {
            slug: "sports",
            name: "Sports wall",
            note: "Bikes, boards and rackets hung, because none of it stacks.",
            alt: "Garage wall with bicycles on hooks, boards racked and a bin of balls beneath",
          },
          {
            slug: "workshop",
            name: "Workshop corner",
            note: "A bench, a board of tools, and a rule about what comes back to it.",
            alt: "Garage workshop corner with a bench, a pegboard of hand tools and labelled drawers beneath",
          },
        ]}
      />

      <BeforeIllustration room="garage" slug="garage" />
      <Moves lines={moveLines} tone="linen" />
      <Zoning
        title="A garage, zoned."
        image={img.orgGarage}
        imageAlt="Villa garage with lidded boxes on steel shelving, bicycles on the wall and a clear floor"
        zones={[
          {
            label: "Off the floor",
            note: "Categories boxed, labelled and shelved — sport, tools, seasonal, spare.",
            x: 44,
            y: 40,
          },
          {
            label: "On the wall",
            note: "Bikes and anything long hung up, where it takes no floor at all.",
            x: 80,
            y: 29,
          },
          {
            label: "Floor, clear",
            note: "The point of the other two. A garage you can park in and walk through.",
            x: 46,
            y: 89,
          },
        ]}
      />

      <RoomSourcing image="/images/org-garage-sourcing.webp" imageAlt="Garage shelving with lidded boxes and sports equipment" groups={[
        { title: "Shelving", items: "Strong, clear structure for every category." },
        { title: "Containers", items: "Lidded storage that makes the floor feel open." },
        { title: "Seasonal", items: "Travel, sport and overflow ready when needed." },
      ]} />
      <RoomPackages title="Choose your garage reset." packages={packages} />

      <Questions
        faqs={faqs}
        image={img.orgHero}
        imageAlt="An organizing consultation in progress: a measured plan, container samples and a tape measure"
      />

      <RoomClose slug="garage" space="garage" message={waMessage} />
    </main>
  );
}
