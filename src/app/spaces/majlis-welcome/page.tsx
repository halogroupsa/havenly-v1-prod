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

/* Owns "majlis design dubai" (supporting: modern majlis, arabic majlis
   design, majlis design for home). Mostly inspiration searches, so the page
   closes on the design consultation. See keywords_planner/page_keyword_map.csv. */
const slug = "majlis-welcome";

export const metadata: Metadata = pageMetadata({
  title: "Modern Majlis Design in Dubai — Seating & Styling",
  description:
    "Modern majlis design for a Dubai villa: low perimeter seating, layered rugs and serving tables within reach of every seat, arranged for conversation.",
  path: `/spaces/${slug}/`,
  image: img.spaceMajlis,
});

const waMessage =
  "Hello Havenly, I'd like to discuss a majlis similar to \"The majlis\".";

export default function MajlisPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="MODERN MAJLIS DESIGN · DUBAI"
        title="The majlis"
        image={img.spaceMajlis}
        imageAlt="Modern majlis in a Dubai villa: low perimeter seating on three walls, layered woven rugs and low bronze tables"
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/spaces/", label: "Our spaces" },
          { label: "The majlis" },
        ]}
        actions={
          <>
            <WhatsappButton className="button button-light" message={waMessage}>
              Style your majlis
            </WhatsappButton>
            <a className="text-link" href={serviceHref("design-consultation")}>
              Design consultation <Arrow />
            </a>
          </>
        }
      />

      <SpaceDecisions
        title="Seating for twenty, calm for two."
        aside={
          <p>
            Arranged for conversation across the room.
            <br /> Choose a number to see why.
          </p>
        }
        image={img.spaceMajlis}
        imageAlt="Majlis seating running around three walls, two rugs overlapped on the floor and low round tables within reach"
        zones={[
          {
            label: "Seating on three walls",
            note: "Low perimeter seating faces inward, towards each other, not towards a screen.",
            x: 52,
            y: 56,
          },
          {
            label: "Layered underfoot",
            note: "Two woven rugs, overlapped, soften the sound of a full room.",
            x: 46,
            y: 82,
          },
          {
            label: "A table within reach",
            note: "Low tables spaced so every seat can set down a cup of qahwa.",
            x: 18,
            y: 74,
          },
        ]}
      />

      <SpaceDetails
        page={slug}
        title="Textiles do the talking."
        aside={
          <p>
            A formal room kept hospitable
            <br /> by what it is made of.
          </p>
        }
        closeUps={[
          {
            slug: "cushions",
            title: "Cushions, not a showroom row",
            text: "Mixed weaves, one or two out of line, so the seating looks sat in.",
            alt: "Back cushions along majlis seating in mixed woven textures, one leaning off line",
          },
          {
            slug: "serving",
            title: "Serving, within reach",
            text: "A tray with a dallah and finjan, where the host can reach it without standing.",
            alt: "Brass dallah and small finjan cups on a tray set on a low timber table beside the seating",
          },
          {
            slug: "pouf",
            title: "One loose seat",
            text: "A pouf for the extra guest, moved to wherever the conversation is.",
            alt: "Bouclé pouf with a knitted throw on a woven rug in front of the majlis seating",
          },
        ]}
        palette={[
          { slug: "linen", name: "Linen", alt: "Heavy natural linen upholstery in close detail" },
          { slug: "boucle", name: "Bouclé", alt: "Looped bouclé in close detail" },
          { slug: "jute", name: "Jute", alt: "Hand-woven jute rug in close detail" },
          { slug: "plaster", name: "Lime plaster", alt: "Hand-trowelled lime plaster wall in close detail" },
        ]}
      />

      <SpaceWide
        page={slug}
        fallback="/images/intro-detail.webp"
        alt="Majlis seating running around the walls under a mashrabiya window, low timber tables on a patterned rug"
        eyebrow="A ROOM FOR GUESTS"
        line="A majlis seats more people than a living room, and should still feel calm."
      />

      <SpaceNext page={slug} />

      <CtaBand
        title={
          <>
            Style your majlis
            <br /> around its guests.
          </>
        }
        text="Tell us how many people the room usually seats and send a photograph. We will suggest a seating plan before anything is bought."
        message={waMessage}
      />
    </main>
  );
}
