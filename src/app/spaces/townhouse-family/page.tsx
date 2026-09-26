import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/blocks";
import { WhatsappButton } from "@/components/creative";
import { Arrow } from "@/components/interactive";
import {
  SpaceDecisions,
  SpaceDetails,
  SpaceNext,
  SpaceWide,
} from "@/components/spaces";
import { img } from "@/lib/images";
import { serviceHref } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

/* Open-plan zoning is a planning question before it is a furnishing one, so
   this page points at the design consultation. */
const slug = "townhouse-family";

export const metadata: Metadata = pageMetadata({
  title: "Open-Plan Townhouse Styling in Dubai",
  description:
    "Townhouse styling in Dubai: an open-plan ground floor zoned with rugs, orientation and lighting, so a family can read the whole layout at a glance.",
  path: `/spaces/${slug}/`,
  image: img.spaceTownhouse,
});

const waMessage =
  "Hello Havenly, I'd like to discuss a space similar to \"The family townhouse\".";

export default function TownhouseFamilyPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="TOWNHOUSE STYLING CONCEPT · DUBAI"
        title="The family townhouse"
        image={img.spaceTownhouse}
        imageAlt="Open-plan townhouse ground floor: a lounge on a jute rug, a dining table by the garden doors and a kitchen island with stools"
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/spaces/", label: "Our spaces" },
          { label: "The family townhouse" },
        ]}
        actions={
          <>
            <WhatsappButton className="button button-light" message={waMessage}>
              Discuss a space like this
            </WhatsappButton>
            <a className="text-link" href={serviceHref("design-consultation")}>
              Design consultation <Arrow />
            </a>
          </>
        }
      />

      <SpaceDecisions
        title="Three zones, one floor."
        aside={
          <p>
            No walls built out of furniture.
            <br /> Choose a number to see why.
          </p>
        }
        image={img.spaceTownhouse}
        imageAlt="Townhouse ground floor with lounge, dining and kitchen in one volume, each marked by a rug, a pendant or a counter"
        zones={[
          {
            label: "Living, on a rug",
            note: "A hard-wearing jute rug and a corner sofa mark the lounge without a wall.",
            x: 40,
            y: 80,
          },
          {
            label: "Dining, under one light",
            note: "One pendant over the table says where dining starts.",
            x: 45,
            y: 20,
          },
          {
            label: "Kitchen, at the counter",
            note: "Stools at the island make the kitchen somewhere to sit, not only to cook.",
            x: 76,
            y: 56,
          },
        ]}
      />

      <SpaceDetails
        page={slug}
        title="Made to be lived on."
        aside={
          <p>
            Materials that take children, sand
            <br /> and a Friday lunch for twelve.
          </p>
        }
        closeUps={[
          {
            slug: "rug",
            title: "A rug that forgives",
            text: "Flat-woven jute that hides crumbs and shrugs off a spill.",
            alt: "Flat-woven jute rug under the leg of an oak coffee table, a few crumbs and a toy car on it",
          },
          {
            slug: "stools",
            title: "Rush seats at the counter",
            text: "Woven seats that are warm to sit on and easy to wipe.",
            alt: "Two timber counter stools with woven rush seats pulled up to a white kitchen island",
          },
          {
            slug: "pendant",
            title: "A pendant, not a chandelier",
            text: "Woven rattan, hung low enough to hold the table.",
            alt: "Woven rattan pendant hanging low over a timber dining table",
          },
        ]}
        palette={[
          { slug: "linen", name: "Linen", alt: "Washed natural linen in close detail" },
          { slug: "oak", name: "Oak", alt: "Oiled oak grain in close detail" },
          { slug: "jute", name: "Jute", alt: "Hand-woven jute rug in close detail" },
          { slug: "rattan", name: "Rattan", alt: "Woven rattan cane in close detail" },
        ]}
      />

      <SpaceWide
        page={slug}
        fallback="/images/intro-threshold.webp"
        alt="Townhouse ground floor from the lounge towards the front door, past the stair, the kitchen island and the dining table"
        eyebrow="ACROSS THE PLAN"
        line="Nothing above shoulder height in the middle of the floor."
      />

      <SpaceNext page={slug} />

      <CtaBand
        title={
          <>
            An open plan
            <br /> that never settled?
          </>
        }
        text="Send the ground-floor plan and a photograph from the front door. We will suggest where each zone begins."
        message={waMessage}
      />
    </main>
  );
}
