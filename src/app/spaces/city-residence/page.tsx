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

/* Supports "apartment interior design dubai" through the dining room. */
const slug = "city-residence";

export const metadata: Metadata = pageMetadata({
  title: "Apartment Dining Room Styling in Dubai",
  description:
    "An apartment dining room styled in Dubai: an oval walnut table, upholstered chairs and evening light that carry from listing photographs to the first viewing.",
  path: `/spaces/${slug}/`,
  image: img.dining,
});

const waMessage =
  "Hello Havenly, I'd like to discuss a space similar to \"The city residence\".";

export default function CityResidencePage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="APARTMENT STYLING CONCEPT · DUBAI"
        title="The city residence"
        image={img.dining}
        imageAlt="Apartment dining room at dusk, an oval walnut table set against the Downtown skyline"
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/spaces/", label: "Our spaces" },
          { label: "The city residence" },
        ]}
        actions={
          <>
            <WhatsappButton className="button button-light" message={waMessage}>
              Discuss a space like this
            </WhatsappButton>
            <a className="text-link" href={serviceHref("home-staging")}>
              Home staging <Arrow />
            </a>
          </>
        }
      />

      <SpaceDecisions
        title="A table that keeps the room open."
        aside={
          <p>
            A dining room styled for the evening.
            <br /> Choose a number to see why.
          </p>
        }
        image={img.dining}
        imageAlt="Oval walnut dining table with upholstered chairs, a single branch in a glass vase and a wall light over the sideboard"
        zones={[
          {
            label: "An oval, not a rectangle",
            note: "Rounded ends keep a clear route round the table in a narrow plan.",
            x: 45,
            y: 68,
          },
          {
            label: "One branch",
            note: "A single stem instead of an arrangement. Quieter in photographs, and it lasts the week.",
            x: 63,
            y: 40,
          },
          {
            label: "Light at eye level",
            note: "A wall light over the sideboard warms the room after dark, when most viewings happen.",
            x: 25,
            y: 22,
          },
        ]}
      />

      <SpaceDetails
        page={slug}
        title="Walnut, wool and low light."
        aside={
          <p>
            Dark, matte and warm, so the skyline
            <br /> stays the brightest thing in the room.
          </p>
        }
        closeUps={[
          {
            slug: "table-edge",
            title: "An edge that takes a hand",
            text: "A softened walnut edge, not a sharp line that reads as showroom.",
            alt: "Rounded edge of an oiled walnut dining table with the grain running around the curve",
          },
          {
            slug: "chair",
            title: "Chairs you stay in",
            text: "Upholstered, in a woven cloth that hides a year of dinners.",
            alt: "Back of an upholstered dining chair in a textured woven fabric, pulled slightly out",
          },
          {
            slug: "sideboard",
            title: "The sideboard, nearly bare",
            text: "One bowl and one box on top. Everything else goes inside it.",
            alt: "Fluted dark sideboard top holding one stoneware bowl and a small lidded box",
          },
        ]}
        palette={[
          { slug: "walnut", name: "Walnut", alt: "Oiled walnut grain in close detail" },
          { slug: "wool", name: "Wool", alt: "Dense grey wool rug pile in close detail" },
          { slug: "boucle", name: "Bouclé", alt: "Looped bouclé upholstery in close detail" },
          { slug: "bronze", name: "Bronze", alt: "Brushed bronze with a soft patina in close detail" },
        ]}
      />

      <SpaceWide
        page={slug}
        fallback="/images/dining.webp"
        alt="Apartment dining room at blue hour, a walnut table under a pale pendant, the living room and city lights beyond"
        eyebrow="AFTER DARK"
        line="Most viewings happen after work. Light the room for them."
      />

      <SpaceNext page={slug} />

      <CtaBand
        title={
          <>
            Going to market
            <br /> this season?
          </>
        }
        text="Send the listing photographs you have now. We will say what would change in the next set."
        message={waMessage}
      />
    </main>
  );
}
