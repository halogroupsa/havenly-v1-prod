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
import { serviceHref } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

/* Bedroom styling. The grid card keeps the portrait bedroom photograph; the
   page opens on the landscape one, which holds a full-bleed header and the
   zone map's 16:9 frame without a hard crop. */
const slug = "quiet-retreat";
const room = "/images/bedroom.webp";

export const metadata: Metadata = pageMetadata({
  title: "Bedroom Styling in Dubai — A Restful Retreat",
  description:
    "Bedroom styling for a Dubai home: layered textiles, warm bedside lighting and a balanced layout that photographs well and feels restful in person.",
  path: `/spaces/${slug}/`,
  image: room,
});

const waMessage =
  "Hello Havenly, I'd like to discuss a space similar to \"The quiet retreat\".";

export default function QuietRetreatPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="BEDROOM STYLING CONCEPT · DUBAI"
        title="The quiet retreat"
        image={room}
        imageAlt="Bedroom in soft morning light: unpressed linen bedding, two low brass lamps and sheer curtains at the window"
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/spaces/", label: "Our spaces" },
          { label: "The quiet retreat" },
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
        title="A bedroom that asks for nothing."
        aside={
          <p>
            Layered textures, gentle tones.
            <br /> Choose a number to see why.
          </p>
        }
        image={room}
        imageAlt="Upholstered bed with layered linen, a bench at its foot, bedside lamps and one wide artwork above the headboard"
        zones={[
          {
            label: "Softly imperfect",
            note: "Bedding left unpressed and a throw pulled crooked, so the room reads as slept in, not staged.",
            x: 57,
            y: 58,
          },
          {
            label: "Warm at the bedside",
            note: "Two low lamps, for viewings that run into the evening.",
            x: 43,
            y: 30,
          },
          {
            label: "One wide frame",
            note: "A single horizontal piece above the headboard widens the wall instead of filling it.",
            x: 70,
            y: 13,
          },
        ]}
      />

      <SpaceDetails
        page={slug}
        title="Soft to touch, quiet to look at."
        aside={
          <p>
            Linen, wool and stone underfoot.
            <br /> Nothing that shines.
          </p>
        }
        closeUps={[
          {
            slug: "bedding",
            title: "Linen, slept in",
            text: "Stonewashed, never ironed. The creases are the point.",
            alt: "Corner of a bed with stonewashed linen sheets and a knitted throw folded back",
          },
          {
            slug: "lamp",
            title: "A lamp at pillow height",
            text: "Low enough to read by without lighting the whole room.",
            alt: "Brass bedside lamp lit on a timber nightstand beside a short stack of books",
          },
          {
            slug: "bench",
            title: "The end of the bed",
            text: "An upholstered bench for everything that would otherwise land on the floor.",
            alt: "Upholstered bench at the foot of a bed, one folded blanket on it, sunlight across the rug",
          },
        ]}
        palette={[
          { slug: "linen", name: "Linen", alt: "Washed natural linen in close detail" },
          { slug: "boucle", name: "Bouclé", alt: "Looped bouclé upholstery in close detail" },
          { slug: "wool", name: "Wool", alt: "Dense wool rug pile in close detail" },
          { slug: "travertine", name: "Stone", alt: "Honed pale stone floor in close detail" },
        ]}
      />

      <SpaceWide
        page={slug}
        fallback="/images/faq-room.webp"
        alt="Bedroom looking towards a tall window with sheer curtains, a bouclé armchair in the corner and linen on the bed"
        eyebrow="THE LIGHT"
        line="Curtains that soften the sun without shutting out the view."
      />

      <SpaceNext page={slug} />

      <CtaBand
        title={
          <>
            A bedroom that
            <br /> never quite settled?
          </>
        }
        text="One photograph from the door and the room's dimensions are usually enough for a first suggestion."
        message={waMessage}
      />
    </main>
  );
}
