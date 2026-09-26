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

/* "penthouse interior design dubai" — low volume, so the page argues with
   project detail rather than repeating the phrase. */
const slug = "skyline-penthouse";

export const metadata: Metadata = pageMetadata({
  title: "Penthouse Interior Styling in Dubai",
  description:
    "Penthouse interior styling in Dubai: low furniture, matte materials and an evening lighting plan that keep the skyline the subject of every photograph.",
  path: `/spaces/${slug}/`,
  image: img.spacePenthouse,
});

const waMessage =
  "Hello Havenly, I'd like to discuss a space similar to \"The skyline penthouse\".";

export default function SkylinePenthousePage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="PENTHOUSE STYLING CONCEPT · DUBAI"
        title="The skyline penthouse"
        image={img.spacePenthouse}
        imageAlt="Penthouse living room with a low linen sofa and a round oak table in front of floor-to-ceiling glass and the Downtown skyline"
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/spaces/", label: "Our spaces" },
          { label: "The skyline penthouse" },
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
        title="The view is the subject."
        aside={
          <p>
            Low furniture, a narrow palette.
            <br /> Choose a number to see why.
          </p>
        }
        image={img.spacePenthouse}
        imageAlt="Low corner sofa, round oak table and one armchair set below the line of a floor-to-ceiling window"
        zones={[
          {
            label: "Below the window line",
            note: "Nothing in the room rises past the sill, so the glass reads floor to ceiling.",
            x: 30,
            y: 58,
          },
          {
            label: "Matte, not polished",
            note: "Oak, wool and bouclé don't throw reflections back into the glass.",
            x: 53,
            y: 72,
          },
          {
            label: "Curtains at the edge",
            note: "Stacked back to the wall by day, drawn for the twilight photographs.",
            x: 37,
            y: 30,
          },
        ]}
      />

      <SpaceDetails
        page={slug}
        title="Nothing that shines."
        aside={
          <p>
            Surfaces chosen for how they photograph
            <br /> against a wall of glass.
          </p>
        }
        closeUps={[
          {
            slug: "table",
            title: "Turned oak",
            text: "A low, round table: no corners to catch on, no gloss to catch the sun.",
            alt: "Top of a low round oak table with a stoneware bowl and two books, the grain in raking light",
          },
          {
            slug: "chair",
            title: "One chair to the glass",
            text: "Angled towards the view, so the photograph has somewhere to sit.",
            alt: "Bouclé armchair angled towards a floor-to-ceiling window, a dark cushion on the seat",
          },
          {
            slug: "curtain",
            title: "Stacked back",
            text: "Heavy linen that folds narrow, leaving the glass clear by day.",
            alt: "Heavy linen curtain stacked against the edge of a tall window frame",
          },
        ]}
        palette={[
          { slug: "oak", name: "Oak", alt: "Oiled oak grain in close detail" },
          { slug: "boucle", name: "Bouclé", alt: "Looped bouclé upholstery in close detail" },
          { slug: "linen", name: "Linen", alt: "Heavy natural linen in close detail" },
          { slug: "wool", name: "Wool", alt: "Dense wool rug pile in close detail" },
        ]}
      />

      <SpaceWide
        page={slug}
        fallback="/images/process-reveal.webp"
        alt="Penthouse living room at sunset, a low sofa set well below floor-to-ceiling glass and the skyline beyond"
        eyebrow="AT TWILIGHT"
        line="Plan the lamps for the photograph taken at dusk."
      />

      <SpaceNext page={slug} />

      <CtaBand
        title={
          <>
            A view worth
            <br /> getting out of the way of.
          </>
        }
        text="Send a photograph taken from the entrance towards the glass. We will tell you what is standing in front of it."
        message={waMessage}
      />
    </main>
  );
}
