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

/* Owns "bathroom organization dubai". Supporting: bathroom storage, under
   sink organizer, under sink storage, vanity organization, bathroom shelf
   organizer. */
const path = roomHref("bathrooms");
const description =
  "Bathroom organization in Dubai: vanity, under-sink and cabinet storage reset with tiered trays and compartment units, styled for a calm, spa-like finish.";

export const metadata: Metadata = pageMetadata({
  title: "Bathroom Organization Dubai | Vanity & Under-Sink Storage",
  description,
  path,
  image: img.orgBathroom,
});

const waMessage =
  "Hello Havenly, I'd like to book a consultation to organize my bathrooms.";

/* The four moves, in this room's words. */
const moveLines = [
  "We measure the vanity, the drawers and the awkward space around the plumbing.",
  "Dates and duplicates: expired products, empty bottles and hotel samples go first.",
  "Tiered trays, drawer inserts and under-sink units that fit around the trap.",
  "A counter with three things on it, towels folded to one standard, and a spa-like finish.",
];

const packages: RoomPackage[] = [
  {
    name: "Vanity reset",
    scope:
      "One vanity, its drawers and the under-sink cupboard, edited and fitted.",
  },
  {
    name: "Full bathroom",
    scope:
      "Every cupboard, shelf and surface in one bathroom, including the shower and towels.",
  },
  {
    name: "Every bathroom",
    scope:
      "All the bathrooms in the home set up to one standard, with a shared backstock zone.",
  },
];

const faqs = [
  {
    question: "What can be done with a small bathroom?",
    answer:
      "Quite a lot. Most of the space is in the vanity and behind the mirror, and both are usually half-used. Trays, drawer inserts and under-sink units measured to the plumbing can double what they hold.",
  },
  {
    question: "Do you work around the pipes under the sink?",
    answer:
      "Yes — that is why we measure at the consultation. Units are chosen to fit around the trap and the water supply, so the cupboard is usable right to the back.",
  },
  {
    question: "What do you do with medicines and expired products?",
    answer:
      "Expired items are separated for you to review and dispose of properly. Medicines are grouped into a labelled container, kept high or wherever works best if there are children in the home.",
  },
  {
    question: "What makes a bathroom feel spa-like?",
    answer:
      "Clear surfaces, a few matched containers instead of many mismatched bottles, folded towels in a basket, and nothing on the counter that is not used daily.",
  },
  {
    question: "Can you organize guest bathrooms too?",
    answer:
      "Yes. A guest bathroom is set up with the essentials a guest might need, stored neatly and visibly, and styled so it is always ready.",
  },
];

export default function BathroomsOrganizingPage() {
  return (
    <main id="main">
      <RoomJsonLd
        name="Bathroom organization"
        description={description}
        path={path}
        image={img.orgBathroom}
        faqs={faqs}
      />

      <OrgHero
        eyebrow="INTERIOR ORGANIZING"
        title="A clear counter, every morning."
        image={img.orgBathroom}
        imageAlt="Bathroom vanity with a stone tray of daily essentials and folded towels"
        crumbs={[
          { href: "/", label: "Home" },
          { href: ORGANIZING_HREF, label: "Interior organizing" },
          { label: "Bathrooms" },
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
        line="Small room, many small things."
        body="A vanity reset to what you actually reach for each morning, and an under-sink cupboard planned around the plumbing rather than in spite of it."
        wide={img.orgBathroom}
        wideAlt="Bathroom vanity with a stone tray of daily essentials and folded towels in a linen basket"
        detail={img.orgBathroomDetail}
        detailAlt="Close detail of a stone tray holding a dispenser and a folded hand towel"
      />
      <StyleRail
        room="bathrooms"
        title="A bathroom can work many ways."
        styles={[
          {
            slug: "double-vanity",
            name: "Double vanity",
            note: "Two routines, two zones, and nothing shared that does not need to be.",
            image: "/images/org-bathrooms-style-double-vanity.webp",
            alt: "Walnut double vanity in a lived-in Dubai apartment, with one divided drawer open below",
          },
          {
            slug: "single-vanity",
            name: "Single vanity",
            note: "One cupboard doing everything, which is a question of what leaves.",
            image: "/images/org-bathrooms-style-single-vanity.webp",
            alt: "Compact green single vanity with an open drawer of everyday bathroom supplies",
          },
          {
            slug: "powder-room",
            name: "Powder room",
            note: "Nothing on show but what a guest would use.",
            image: "/images/org-bathrooms-style-powder-room.webp",
            alt: "Small vintage-style powder room viewed through a partly open door",
          },
          {
            slug: "ensuite",
            name: "Ensuite and linen tower",
            note: "Daily things low, towels and back-up in a tower beside.",
            image: "/images/org-bathrooms-style-ensuite.webp",
            alt: "Ensuite bathroom with a white vanity and tall oak linen tower open to mixed towels and supplies",
          },
          {
            slug: "family",
            name: "Family bathroom",
            note: "Heights that suit the shortest person using it.",
            image: "/images/org-bathrooms-style-family.webp",
            alt: "Family bathroom with a child-height step stool, bath toys and towels at two heights",
          },
        ]}
      />

      <BeforeIllustration room="bathroom" slug="bathrooms" />
      <Moves lines={moveLines} tone="linen" />
      <Zoning
        title="A bathroom, zoned."
        image={img.orgBathroom}
        imageAlt="Bathroom vanity with a tray by the basin, an open divided drawer and a linen basket"
        zones={[
          {
            label: "The daily few",
            note: "What you actually reach for each morning — on a tray, on the counter.",
            x: 84,
            y: 33,
          },
          {
            label: "Under the sink",
            note: "Dividers planned around the plumbing, so the awkward space still works.",
            x: 57,
            y: 70,
          },
          {
            label: "Linen, apart",
            note: "Towels kept out of the vanity entirely, where damp and back-up do not mix.",
            x: 5,
            y: 70,
          },
        ]}
      />

      <RoomSourcing image="/images/org-bathrooms-sourcing.webp" imageAlt="Bathroom vanity tray, under-sink bins and folded towels" groups={[
        { title: "Vanity", items: "A daily routine held in one calm zone." },
        { title: "Under the sink", items: "Storage designed around the plumbing." },
        { title: "Linen", items: "Towels and backstock with space to breathe." },
      ]} />
      <RoomPackages title="Choose your bathroom reset." packages={packages} />

      <Questions
        faqs={faqs}
        image={img.orgHero}
        imageAlt="An organizing consultation in progress: a measured plan, container samples and a tape measure"
      />

      <RoomClose slug="bathrooms" space="bathrooms" message={waMessage} />
    </main>
  );
}
