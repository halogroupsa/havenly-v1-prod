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

/* Owns "kids room organization dubai". Supporting: toy storage, toy storage
   organization, toy organizer, playroom organization, nursery organization,
   kids toy storage. */
const path = roomHref("kids-room");
const description =
  "Kids room and playroom organization in Dubai: toy storage, low labelled shelves and wardrobes children can use themselves, planned to grow with them.";

export const metadata: Metadata = pageMetadata({
  title: "Kids Room Organization Dubai | Toy Storage & Playrooms",
  description,
  path,
  image: img.orgKids,
});

const waMessage =
  "Hello Havenly, I'd like to book a consultation to organize my child's room.";

/* The four moves, in this room's words. */
const moveLines = [
  "We measure at child height and ask how they play, and what the room becomes in two years.",
  "Broken toys, missing pieces and outgrown clothes first — with your child, if you like.",
  "Light baskets they can lift, grouped by type of play, with a share rotated into storage.",
  "Picture labels, a shelf they can reach, and a tidy-up that takes one minute.",
];

const packages: RoomPackage[] = [
  {
    name: "Toy reset",
    scope:
      "Toys edited and grouped by type of play, in baskets and bins a child can lift.",
  },
  {
    name: "Kids room",
    scope:
      "The whole bedroom: wardrobe at their height, toys, books and the desk.",
  },
  {
    name: "Playroom or nursery",
    scope:
      "A playroom zoned for play, or a nursery set up by size before the baby arrives.",
  },
];

const faqs = [
  {
    question: "Should my child be involved in the edit?",
    answer:
      "Often, yes — children keep up systems they helped make. We suggest what suits their age: younger children choose favourites from a small group, older children make their own calls with you.",
  },
  {
    question: "How do you stop toys spreading back out?",
    answer:
      "Fewer toys out at once, and a home for each type of play. We set up a rotation, with some toys stored out of reach and swapped in every few weeks.",
  },
  {
    question: "Is the storage safe for small children?",
    answer:
      "We choose lightweight baskets without heavy lids, keep the heaviest items low, and flag any furniture that should be anchored to the wall.",
  },
  {
    question: "Will it still work in a year or two?",
    answer:
      "It is planned to grow: adjustable shelves, bins that suit toys now and books later, and a wardrobe that moves up a size with the child.",
  },
  {
    question: "Can you set up a nursery before the baby arrives?",
    answer:
      "Yes. Clothing is arranged by size, the changing station has everything within arm's reach, and there is room for what arrives in the first months.",
  },
];

export default function KidsRoomOrganizingPage() {
  return (
    <main id="main">
      <RoomJsonLd
        name="Kids room and playroom organization"
        description={description}
        path={path}
        image={img.orgKids}
        faqs={faqs}
      />

      <OrgHero
        eyebrow="INTERIOR ORGANIZING"
        title="A room they can tidy on their own."
        image={img.orgKids}
        imageAlt="Child's room with low open shelving, lidded toy baskets and picture labels"
        crumbs={[
          { href: "/", label: "Home" },
          { href: ORGANIZING_HREF, label: "Interior organizing" },
          { label: "Kids room" },
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
        line="At their height, for their age."
        body="Low, labelled and light enough to lift — storage a child can use without help, and put back without being asked twice."
        wide={img.orgKids}
        wideAlt="Child's room with low open shelving, lidded toy baskets and picture labels"
        detail={img.orgKidsDetail}
        detailAlt="Close detail of a lidded seagrass basket with a small picture label"
      />
      <StorageFeatures
        id="kids-storage-title"
        eyebrow="ROOM TO GROW"
        title="Beds that make space back."
        items={[
          {
            image: img.orgFeatureKidsBunkStorage,
            alt: "Shared children's room with oak bunk beds and organized under-bed drawers",
            title: "Storage below the play zone",
            text: "Integrated drawers keep bedding and larger toys out of sight but close enough for a child to take responsibility for.",
            /* The drawers sit low in a tall frame, so the landscape crop is
               biased down rather than taking the middle. */
            focus: "center 62%",
          },
        ]}
      />
      <StyleRail
        room="kids-room"
        title="A kids room can work many ways."
        styles={[
          {
            slug: "nursery",
            name: "Nursery",
            note: "Planned for the adult doing the reaching, not the child.",
            alt: "Nursery with a changing top, labelled baskets of clothes below and a low bookshelf",
          },
          {
            slug: "toddler",
            name: "Toddler",
            note: "Low cubes, picture labels, and only as many toys as fit them.",
            alt: "Toddler's room with low cube shelving, lidded baskets and picture labels on each",
          },
          {
            slug: "shared",
            name: "Shared room",
            note: "Two of everything, and a line down the middle that both can see.",
            alt: "Shared children's bedroom with two beds and a matched pair of storage units, each labelled",
          },
          {
            slug: "playroom",
            name: "Playroom corner",
            note: "A corner of a living room that packs away by bedtime.",
            alt: "Play corner in a living room with a low unit of baskets and a rug, toys put away",
          },
          {
            slug: "teen",
            name: "Teen",
            note: "Study and wardrobe in one room, kept apart so neither takes the other over.",
            alt: "Teenager's room with a desk under a shelf on one wall and an open wardrobe on the other",
          },
        ]}
      />

      <BeforeIllustration room="kids room" slug="kids-room" />
      <Moves lines={moveLines} tone="linen" />
      <Zoning
        title="A kids room, zoned."
        image={img.orgKids}
        imageAlt="Child's room with an art ledge above low cube shelving holding labelled baskets"
        zones={[
          {
            label: "Seen, not stored",
            note: "Books and artwork face out on a ledge, so choosing is part of the room.",
            x: 55,
            y: 13,
          },
          {
            label: "At their height",
            note: "Open cubes a child can reach without asking, with a picture label on each.",
            x: 55,
            y: 62,
          },
          {
            label: "Room to play",
            note: "The floor stays the floor. Anything on it at bedtime has a basket to go back to.",
            x: 40,
            y: 89,
          },
        ]}
      />

      <RoomSourcing image="/images/org-kids-room-sourcing.webp" imageAlt="Child-height toy baskets, books, art supplies and clothing" groups={[
        { title: "Toys", items: "Clear, low homes for the things they reach for." },
        { title: "Clothes", items: "Simple daily categories that can grow with them." },
        { title: "Books & art", items: "A place to choose, use and put back." },
      ]} />
      <RoomPackages title="Choose your kids room reset." packages={packages} />

      <Questions
        faqs={faqs}
        image={img.orgHero}
        imageAlt="An organizing consultation in progress: a measured plan, container samples and a tape measure"
      />

      <RoomClose slug="kids-room" space="kids room" message={waMessage} />
    </main>
  );
}
