import type { Metadata } from "next";
import { CtaBand } from "@/components/blocks";
import { WhatsappButton } from "@/components/creative";
import { Arrow } from "@/components/interactive";
import {
  Moves,
  OrgHero,
  Questions,
  RoomTile,
  SignatureFinish,
} from "@/components/organizing";
import { img } from "@/lib/images";
import { ORGANIZING_HREF, roomHref, rooms } from "@/lib/organizing";
import { site } from "@/lib/site";
import { JsonLd, businessId, faqJsonLd, ogImage, pageMetadata } from "@/lib/seo";

/* Owns "home organizer dubai" and the professional-organizer / decluttering
   service phrases; each room page owns its room. See
   keywords_planner/page_keyword_map.csv. */
const description =
  "Professional home organizer in Dubai. Room-by-room interior organizing — kitchen, pantry, wardrobe, kids room, bathrooms, laundry and garage — from consultation to finish.";

export const metadata: Metadata = pageMetadata({
  title: "Home Organizer Dubai: Room-by-Room Interior Organizing",
  description,
  path: ORGANIZING_HREF,
  image: img.orgHero,
});

const waMessage =
  "Hello Havenly, I'd like to book an organizing consultation for my home.";

const faqs = [
  {
    question: "What does a professional home organizer do?",
    answer:
      "We edit what is in a room with you, plan storage around the way your household actually lives, source products measured to fit, and set the system up so it is easy to keep. Havenly works room by room, from the first visit to a styled finish.",
  },
  {
    question: "How much does home organizing cost in Dubai?",
    answer:
      "It depends on the room, how much is in it and which products the system needs. After the in-home visit you receive a written scope and fee, so the price is agreed before any work begins.",
  },
  {
    question: "Do I need to be at home during the session?",
    answer:
      "For the edit, ideally yes — every keep, donate, discard or relocate decision is yours to make. Once those decisions are made, the fitting and styling can happen with you there or not.",
  },
  {
    question: "What happens to the things I don't keep?",
    answer:
      "Donations and discards are separated and bagged during the session. How they leave your home, and where donations go, is agreed with you as part of the scope.",
  },
  {
    question: "Can you organize the whole house, or just one room?",
    answer:
      "Either. Many clients start with the room that causes the most friction — usually the kitchen or the wardrobe — and continue from there. A whole-home project uses the same four moves in each room.",
  },
  {
    question: "Which areas of Dubai do you cover?",
    answer:
      "We work across Dubai, including Dubai Marina, Downtown, Palm Jumeirah, Jumeirah, Dubai Hills Estate, Arabian Ranches and Emirates Hills. Share your community when you get in touch and we will confirm the visit.",
  },
];

export default function InteriorOrganizingPage() {
  return (
    <main id="main">
      {site.url && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Interior organizing",
            serviceType: "Professional home organizing",
            description,
            url: new URL(ORGANIZING_HREF, site.url).href,
            image: `${site.url}${ogImage(img.orgHero)}`,
            provider: { "@id": businessId() },
            areaServed: { "@type": "City", name: "Dubai" },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Interior organizing, room by room",
              itemListElement: rooms.map((room) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: `${room.title} organizing`,
                  url: new URL(roomHref(room.slug), site.url).href,
                },
              })),
            },
          }}
        />
      )}
      <JsonLd data={faqJsonLd(faqs)} />

      <OrgHero
        eyebrow="INTERIOR ORGANIZING"
        title="Make your home a haven."
        image={img.orgHero}
        imageAlt="An organizing consultation: a measured plan, container samples and a tape measure on a table"
        crumbs={[
          { href: "/", label: "Home" },
          { label: "Interior organizing" },
        ]}
        actions={
          <>
            <WhatsappButton className="button button-light" message={waMessage}>
              Book a visit
            </WhatsappButton>
            <a className="text-link" href="#rooms">
              Choose a room <Arrow />
            </a>
          </>
        }
      />

      {/* The rooms come first. They are what a visitor is here to choose
          between, and seven photographs say what the service is faster than
          any paragraph about it. */}
      <section id="rooms" className="container org-band" aria-labelledby="rooms-title">
        <div className="section-heading org-head" data-reveal>
          <div>
            <p className="eyebrow muted">ROOM BY ROOM</p>
            <h2 id="rooms-title">Where would you like to start?</h2>
          </div>
          <p>
            Room-by-room organizing in Dubai. One framework, seven rooms
            <br /> — from the first visit to a styled finish.
          </p>
        </div>
        <div className="room-grid">
          {rooms.map((room) => (
            <RoomTile key={room.slug} room={room} />
          ))}
          <a className="room-tile room-tile-cta" href="/contact/" data-reveal>
            <p className="eyebrow">NOT SURE WHERE TO START?</p>
            <h3>The whole home</h3>
            <p>
              Tell us which rooms cause the most friction. We will suggest an
              order that makes sense.
            </p>
            <span className="text-link">
              Book a visit <Arrow />
            </span>
          </a>
        </div>
      </section>

      <section className="container org-band" aria-labelledby="consultation-title">
        <div className="section-heading org-head" data-reveal>
          <div>
            <p className="eyebrow muted">THE FIRST STEP</p>
            <h2 id="consultation-title">A plan shaped around your home.</h2>
          </div>
          <p>Every project begins with an in-home consultation.</p>
        </div>
        <p>
          We learn your routines and what is causing friction, review the layout
          and existing storage, and measure the shelves, drawers and other spaces
          that matter. From there we plan suitable products and agree the scope
          and timeline. You receive a clear, personalized organizing plan and
          written fee before work begins.
        </p>
      </section>

      <Moves tone="linen" />

      <section className="container org-band" aria-labelledby="edit-title">
        <div className="section-heading org-head" data-reveal>
          <div>
            <p className="eyebrow muted">THE EDIT PHASE</p>
            <h2 id="edit-title">Room to keep what matters.</h2>
          </div>
          <p>Calm, judgment-free guidance. Every final decision is yours.</p>
        </div>
        <ol className="org-edit-steps" data-reveal>
          <li><h3>Sort</h3><p>We take everything out and group it by category, regardless of where it was stored.</p></li>
          <li><h3>Decide</h3><p>Together we consider what to keep, donate, discard or relocate.</p></li>
          <li><h3>Edit</h3><p>We choose for your life now, leaving behind habits and “just in case” clutter that no longer serves you.</p></li>
          <li><h3>Reset</h3><p>Only what belongs returns, ready for a practical system and a considered finish.</p></li>
        </ol>
      </section>

      <section className="container org-band" aria-labelledby="products-title">
        <div className="section-heading org-head" data-reveal>
          <div>
            <p className="eyebrow muted">PRODUCTS WITH PURPOSE</p>
            <h2 id="products-title">Measured, tested and chosen to last.</h2>
          </div>
        </div>
        <p>
          We select storage for its fit, durability and visual harmony. Depending
          on the room, that may mean modular shelves, uniform hangers, drawer
          dividers and shoe storage; airtight canisters, stackable bins and spice
          racks; or tiered trays and under-sink compartments. For a home office
          or study, we can plan cable organizers, document trays, stationery
          boxes and labels as part of a room or whole-home project. Baskets,
          lidded boxes, rolling bins, acrylic risers and fridge organizers are
          chosen only where they make the space easier to use.
        </p>
      </section>

      <SignatureFinish
        title="Calm that lasts."
        text="Measured, placed and finished for the way your home lives."
      />

      <Questions
        faqs={faqs}
        image={img.orgBedroom}
        imageAlt="A walk-in wardrobe after organizing: matched hangers, folded knitwear and shoes on angled shelves"
      />

      <CtaBand
        eyebrow="BOOK A VISIT"
        title={
          <>
            Make your home
            <br /> a haven.
          </>
        }
        text="Tell us which rooms you have in mind and your community in Dubai. We will arrange the visit and send a clear scope before any work begins."
        message={waMessage}
        action="Book a visit"
      />
    </main>
  );
}
