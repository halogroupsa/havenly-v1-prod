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

/* Entrance and hallway styling, for homes going to viewing. */
const slug = "first-impression-entrance";

export const metadata: Metadata = pageMetadata({
  title: "Entrance & Hallway Styling in Dubai",
  description:
    "Entrance styling for Dubai homes going to viewing: a shallow console, one mirror and considered light that set the tone from the front door.",
  path: `/spaces/${slug}/`,
  image: img.spaceEntrance,
});

const waMessage =
  "Hello Havenly, I'd like to discuss a space similar to \"The entrance\".";

export default function EntrancePage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="ENTRANCE STYLING CONCEPT · DUBAI"
        title="The entrance"
        image={img.spaceEntrance}
        imageAlt="Villa entrance hall with a round mirror over an oak console, a jute runner and a bench, the garden visible at the end"
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/spaces/", label: "Our spaces" },
          { label: "The entrance" },
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
        title="The first three metres."
        aside={
          <p>
            A viewing begins at the door.
            <br /> Choose a number to see why.
          </p>
        }
        image={img.spaceEntrance}
        imageAlt="Entrance hall: a round mirror, a shallow oak console with keys on a folded cloth, and an upholstered bench opposite"
        zones={[
          {
            label: "One mirror",
            note: "Hung facing the light, it carries daylight further into the plan.",
            x: 20,
            y: 22,
          },
          {
            label: "A shallow console",
            note: "Shallow enough that the hall keeps its width, deep enough for the keys.",
            x: 28,
            y: 68,
          },
          {
            label: "Somewhere to pause",
            note: "A bench to sit on and take shoes off — the first thing a family does at the door.",
            x: 80,
            y: 68,
          },
        ]}
      />

      <SpaceDetails
        page={slug}
        title="Oak, stone and one runner."
        aside={
          <p>
            Hard-wearing where feet land,
            <br /> soft where hands do.
          </p>
        }
        closeUps={[
          {
            slug: "keys",
            title: "A place for the keys",
            text: "A folded cloth on the console, so the keys never scratch the oak.",
            alt: "Car keys set on a folded linen cloth on the end of an oak console",
          },
          {
            slug: "vessel",
            title: "One object",
            text: "A single stoneware vessel instead of a styled arrangement.",
            alt: "Textured stoneware vessel and a shallow stone bowl on a dark timber console",
          },
          {
            slug: "runner",
            title: "A runner that points the way",
            text: "Laid down the middle of the hall, it leads the eye to the garden.",
            alt: "Jute runner on a pale stone floor leading down a hallway towards glass doors",
          },
        ]}
        palette={[
          { slug: "oak", name: "Oak", alt: "Oiled oak grain in close detail" },
          { slug: "travertine", name: "Travertine", alt: "Honed travertine floor in close detail" },
          { slug: "linen", name: "Linen", alt: "Washed natural linen in close detail" },
          { slug: "plaster", name: "Lime plaster", alt: "Hand-trowelled lime plaster wall in close detail" },
        ]}
      />

      <SpaceWide
        page={slug}
        fallback="/images/contact-entrance.webp"
        alt="Entrance hall looking towards the open front door, a bench on one side and a mirror over a console on the other"
        eyebrow="VIEWING DAY"
        line="Light, scent and sound, settled before the door opens."
      />

      <SpaceNext page={slug} />

      <CtaBand
        title={
          <>
            Start the viewing
            <br /> at the front door.
          </>
        }
        text="A photograph taken from the doorway is usually enough for us to say what the entrance needs."
        message={waMessage}
      />
    </main>
  );
}
