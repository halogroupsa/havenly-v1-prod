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

/* Terrace and balcony styling, written for a Dubai summer. */
const slug = "shaded-terrace";

export const metadata: Metadata = pageMetadata({
  title: "Terrace & Balcony Styling in Dubai",
  description:
    "Terrace styling built for a Dubai summer: shade first, seating for two and weather-honest materials, so outdoor space reads as a room at a viewing.",
  path: `/spaces/${slug}/`,
  image: img.spaceTerrace,
});

const waMessage =
  "Hello Havenly, I'd like to discuss a space similar to \"The shaded terrace\".";

export default function ShadedTerracePage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="TERRACE STYLING CONCEPT · DUBAI"
        title="The shaded terrace"
        image={img.spaceTerrace}
        imageAlt="Shaded villa terrace with two teak and rope lounge chairs, a stone table and an olive tree, the skyline beyond"
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/spaces/", label: "Our spaces" },
          { label: "The shaded terrace" },
        ]}
        actions={
          <>
            <WhatsappButton className="button button-light" message={waMessage}>
              Discuss a space like this
            </WhatsappButton>
            <a className="text-link" href={serviceHref("furnishing-styling")}>
              Furnishing &amp; styling <Arrow />
            </a>
          </>
        }
      />

      <SpaceDecisions
        title="Shade first, then a seat."
        aside={
          <p>
            A terrace you would actually sit on.
            <br /> Choose a number to see why.
          </p>
        }
        image={img.spaceTerrace}
        imageAlt="Terrace under a pergola: two lounge chairs and a low stone table on a jute rug, a large olive in a stone planter"
        zones={[
          {
            label: "Shade before furniture",
            note: "The pergola came first. Nothing sits where the afternoon sun lands.",
            x: 62,
            y: 8,
          },
          {
            label: "Seating for two",
            note: "Two chairs and a low table, rather than a full outdoor suite.",
            x: 28,
            y: 64,
          },
          {
            label: "One planted moment",
            note: "A single olive in a heavy planter, instead of a row of pots.",
            x: 8,
            y: 72,
          },
        ]}
      />

      <SpaceDetails
        page={slug}
        title="Weather-honest."
        aside={
          <p>
            Materials that survive the heat,
            <br /> the sand and the shamal.
          </p>
        }
        closeUps={[
          {
            slug: "rope",
            title: "Rope that dries",
            text: "Woven outdoor rope on a teak frame. Fine in sun, sand and humidity.",
            alt: "Woven outdoor rope seat back on a weathered teak frame, a light film of sand on the arm",
          },
          {
            slug: "table",
            title: "A table that stays put",
            text: "Cast stone, heavy enough to hold its ground in a shamal.",
            alt: "Low cast-stone side table with two ceramic cups on a shaded terrace",
          },
          {
            slug: "planter",
            title: "One planter, not ten",
            text: "A large stone planter with one olive: less watering, more shade.",
            alt: "Rough stone planter holding a young olive tree against a sunlit rendered wall",
          },
        ]}
        palette={[
          { slug: "teak", name: "Teak", alt: "Weathered teak grain in close detail" },
          { slug: "rope", name: "Rope", alt: "Woven outdoor rope in close detail" },
          { slug: "cast-stone", name: "Cast stone", alt: "Cast stone surface in close detail" },
          { slug: "travertine", name: "Travertine", alt: "Honed travertine paving in close detail" },
        ]}
      />

      <SpaceWide
        page={slug}
        fallback="/images/principle-climate.webp"
        alt="Villa terrace seen from the lawn, two lounge chairs and a stone table in the deep shade of a pergola"
        eyebrow="BUILT FOR THE CLIMATE"
        line="In Dubai, a terrace is a shade problem before it is a furniture one."
      />

      <SpaceNext page={slug} />

      <CtaBand
        title={
          <>
            A terrace nobody
            <br /> sits on?
          </>
        }
        text="Send a photograph taken around four in the afternoon. It shows us where the shade has to go."
        message={waMessage}
      />
    </main>
  );
}
