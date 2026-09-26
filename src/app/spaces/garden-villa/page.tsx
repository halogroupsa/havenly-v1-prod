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

/* Supports "villa interior design dubai" without competing with /spaces/ for
   it: this page carries the villa furnishing and styling wording. See
   keywords_planner/page_keyword_map.csv. */
const slug = "garden-villa";

export const metadata: Metadata = pageMetadata({
  title: "Villa Interior Styling in Dubai",
  description:
    "Villa interior styling in Dubai: a garden villa living room furnished in linen, travertine and timber, arranged so the garden does the work.",
  path: `/spaces/${slug}/`,
  image: img.heroFrame1,
});

const waMessage =
  "Hello Havenly, I'd like to discuss a space similar to \"The garden villa\".";

export default function GardenVillaPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="VILLA STYLING CONCEPT · DUBAI"
        title="The garden villa"
        image={img.heroFrame1}
        imageAlt="Villa living room in linen and travertine, facing a wall of glass onto the garden"
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/spaces/", label: "Our spaces" },
          { label: "The garden villa" },
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
        title="The garden does the work."
        aside={
          <p>
            Soft linen, warm timber, open sightlines.
            <br /> Choose a number to see why.
          </p>
        }
        image={img.heroFrame1}
        imageAlt="Villa living room: a low linen sofa, two timber lounge chairs, a travertine table and a jute rug beside the garden glass"
        zones={[
          {
            label: "Nothing at the glass",
            note: "The doors to the garden are left clear, so the view becomes the room's fourth wall.",
            x: 86,
            y: 34,
          },
          {
            label: "Low, all the way round",
            note: "Sofa, chairs and table sit below the sill, so the ceiling height stays visible.",
            x: 47,
            y: 47,
          },
          {
            label: "One rug, the whole room",
            note: "A single large jute rug holds the sofa and both chairs together at this scale.",
            x: 62,
            y: 88,
          },
        ]}
      />

      <SpaceDetails
        page={slug}
        title="Linen, travertine and timber."
        aside={
          <p>
            Four materials. Nothing competes
            <br /> with the light coming in.
          </p>
        }
        closeUps={[
          {
            slug: "linen",
            title: "Linen, left creased",
            text: "Washed covers that look better in the second week than the first.",
            alt: "Washed linen sofa cushion with natural creases, lit from the side by garden light",
          },
          {
            slug: "travertine",
            title: "A table you can lean on",
            text: "Honed travertine, unfilled, with its pores left to show.",
            alt: "Edge of a honed travertine coffee table with open pores and a stoneware bowl",
          },
          {
            slug: "threshold",
            title: "One floor, inside and out",
            text: "The stone runs to the terrace at one level, so the garden reads as part of the room.",
            alt: "Stone floor running level through open glass doors onto a garden terrace",
          },
        ]}
        palette={[
          { slug: "linen", name: "Linen", alt: "Washed natural linen in close detail" },
          { slug: "travertine", name: "Travertine", alt: "Honed travertine with open pores" },
          { slug: "jute", name: "Jute", alt: "Hand-woven jute rug in close detail" },
          { slug: "walnut", name: "Walnut", alt: "Oiled walnut grain in close detail" },
        ]}
      />

      <SpaceWide
        page={slug}
        fallback={img.spacesHero}
        alt="Villa living room seen from the garden side, the sofa back to the camera and an oak kitchen deep in the plan"
        eyebrow="FROM THE GARDEN"
        line="Arrange the room for the view, not the television."
      />

      <SpaceNext page={slug} />

      <CtaBand
        title={
          <>
            A villa of your own
            <br /> in mind?
          </>
        }
        text="Send a photograph of the living room and the floor plan. We will tell you what we would move first."
        message={waMessage}
      />
    </main>
  );
}
