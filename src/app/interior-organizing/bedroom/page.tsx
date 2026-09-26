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
  StorageFeatures,
  StyleRail,
  Zoning,
} from "@/components/organizing";
import { img } from "@/lib/images";
import { ORGANIZING_HREF, type RoomPackage, roomHref } from "@/lib/organizing";
import { pageMetadata } from "@/lib/seo";

/* Owns "closet organizer dubai". Supporting: wardrobe organization dubai,
   walk-in closet, wardrobe organizer, closet organizers, shoe organizer for
   closet, bedroom organization. */
const path = roomHref("bedroom");
const description =
  "Closet organizer in Dubai for wardrobes, walk-in closets and bedrooms: edited, measured and fitted with uniform hangers, dividers and shoe storage.";

export const metadata: Metadata = pageMetadata({
  title: "Closet Organizer Dubai | Wardrobe & Walk-in Closet Organizing",
  description,
  path,
  image: img.orgBedroom,
});

const waMessage =
  "Hello Havenly, I'd like to book a consultation to organize my wardrobe.";

/* The four moves, in this room's words. */
const moveLines = [
  "Rails, shelves and drawers measured, and your shoe count taken — depths depend on it.",
  "Piece by piece, at your pace. Every keep, donate and discard is your decision.",
  "Matched hangers, shelf and drawer dividers, shoes on angled shelves you can see.",
  "Seasonal pieces bagged, the rail spaced evenly, and a folding standard that holds.",
];

const packages: RoomPackage[] = [
  {
    name: "Wardrobe edit",
    scope:
      "One wardrobe, edited and reset with what you already own, folded and grouped.",
  },
  {
    name: "Wardrobe system",
    scope:
      "The edit, plus matched hangers, dividers and shoe storage measured to the space.",
  },
  {
    name: "Walk-in & bedroom",
    scope:
      "A walk-in or dressing room planned as a room, and the bedroom surfaces around it.",
  },
];

const faqs = [
  {
    question: "Do I have to get rid of clothes?",
    answer:
      "No. Each piece is reviewed with you and placed into keep, donate, discard or relocate, and every final decision is yours.",
  },
  {
    question: "Why do hangers matter so much?",
    answer:
      "Uniform slim hangers take less rail than a mix of plastic, wire and wood, and they hold clothes at one height so you see every piece at once. The switch alone frees noticeable space.",
  },
  {
    question: "Can you organize a wardrobe two people share?",
    answer:
      "Yes. We plan a zone for each person first, then group within it, so each side works the way that person dresses.",
  },
  {
    question: "What about seasonal and occasion wear?",
    answer:
      "Pieces worn a few weeks a year move to higher shelves, garment bags or vacuum storage, so the everyday wardrobe holds only what you are wearing now.",
  },
  {
    question: "Do you install closet systems?",
    answer:
      "We plan and fit modular, freestanding and insert-based storage. Built-in joinery is a separate trade; if your closet needs it, we say so at the consultation.",
  },
];

export default function BedroomOrganizingPage() {
  return (
    <main id="main">
      <RoomJsonLd
        name="Wardrobe and closet organization"
        description={description}
        path={path}
        image={img.orgBedroom}
        faqs={faqs}
      />

      <OrgHero
        eyebrow="INTERIOR ORGANIZING"
        title="Open the doors and see everything you own."
        image={img.orgBedroom}
        imageAlt="Walk-in wardrobe with matching velvet hangers and folded knitwear"
        crumbs={[
          { href: "/", label: "Home" },
          { href: ORGANIZING_HREF, label: "Interior organizing" },
          { label: "Bedroom & wardrobe" },
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
        line="A wardrobe for the life you live now."
        body="One rail, one direction, one hanger. Folded pieces and shoes given measured space, so getting dressed takes a look rather than a search."
        wide={img.orgBedroom}
        wideAlt="Walk-in wardrobe with matching velvet hangers, folded knitwear and shoes on angled shelves"
        detail={img.orgBedroomDetail}
        detailAlt="Close detail of a rail of matched velvet hangers, all facing the same way"
      />
      <StorageFeatures
        id="wardrobe-details-title"
        eyebrow="FOLDED WITH A PLACE"
        title="A drawer that keeps its shape."
        items={[
          {
            image: img.orgFeatureWardrobeDrawer,
            alt: "Oak wardrobe drawer divided between folded knitwear, rolled clothes and a small jewellery tray",
            title: "Folded by how you dress",
            text: "Deep sections hold knitwear and daily layers; small compartments keep the things that otherwise migrate across the top.",
          },
        ]}
      />
      <StyleRail
        room="bedroom"
        title="A wardrobe can work many ways."
        styles={[
          {
            slug: "dressing-room",
            name: "Dressing room",
            note: "A room of its own — rails, drawers and an island to fold on.",
            alt: "Dressing room with rails on two walls, a drawer island in the centre and folded knitwear on shelves",
          },
          {
            slug: "sliding",
            name: "Fitted sliding",
            note: "Half the wardrobe hidden at any time, so what is behind each door matters.",
            alt: "Fitted wardrobe with sliding doors, one panel slid back to show a hanging rail and shelves",
          },
          {
            slug: "open-rail",
            name: "Open rail",
            note: "Boutique hanging, on show. Fewer pieces, better spaced.",
            alt: "Open clothing rail against a plaster wall with spaced hangers and a shelf of folded pieces above",
          },
          {
            slug: "freestanding",
            name: "Freestanding",
            note: "A wardrobe and a dresser, working as one system rather than two.",
            alt: "Freestanding wardrobe beside a low dresser in a bedroom, both with doors and a drawer open",
          },
          {
            slug: "walk-in",
            name: "Walk-in",
            note: "A corridor of hanging, zoned by length so the space under the rail is used.",
            alt: "Walk-in wardrobe corridor with short hanging over drawers on one side and long hanging opposite",
          },
        ]}
      />

      <BeforeIllustration room="wardrobe" slug="bedroom" />
      <Moves lines={moveLines} tone="linen" />
      <Zoning
        title="A wardrobe, zoned."
        image={img.orgBedroom}
        imageAlt="Open wardrobe with folded knitwear above, a hanging rail and shoes on a low shelf"
        zones={[
          {
            label: "Folded, above",
            note: "Knitwear and off-season, boxed and labelled so the rail stays clear.",
            x: 47,
            y: 12,
          },
          {
            label: "Hung by length",
            note: "Short pieces together, long together — which is where the space under the rail comes from.",
            x: 45,
            y: 47,
          },
          {
            label: "Shoes, at the floor",
            note: "Angled and spaced, one pair per slot, every pair visible.",
            x: 48,
            y: 83,
          },
        ]}
      />

      <RoomSourcing image="/images/org-bedroom-sourcing.webp" imageAlt="Wardrobe rail, folded knitwear and spaced shoe storage" groups={[
        { title: "Hanging", items: "A single rail, aligned for the morning." },
        { title: "Shelves", items: "Folded pieces and drawers held in calm zones." },
        { title: "Shoes", items: "Measured spacing that lets every pair be seen." },
      ]} />
      <RoomPackages title="Choose your wardrobe reset." packages={packages} />

      <Questions
        faqs={faqs}
        image={img.orgHero}
        imageAlt="An organizing consultation in progress: a measured plan, container samples and a tape measure"
      />

      <RoomClose slug="bedroom" space="wardrobe" message={waMessage} />
    </main>
  );
}
