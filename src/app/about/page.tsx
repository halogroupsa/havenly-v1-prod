import type { Metadata } from "next";
import {
  CtaBand,
  FounderNote,
  PageHead,
  Partners,
  Voices,
} from "@/components/blocks";
import { Parallax, WhatsappButton } from "@/components/creative";
import { Img } from "@/components/image";
import { Arrow } from "@/components/interactive";
import { img } from "@/lib/images";
import { serviceHref, services } from "@/lib/services";
import { dubaiAreas, principles } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Our Dubai Interior Styling Studio",
  description:
    "Havenly is a home staging and interior styling studio in Al Quoz, Dubai, working with restraint, proportion and natural materials across the city.",
  path: "/about/",
  image: img.aboutHero,
});

export default function AboutPage() {
  return (
    <main id="main">
      <PageHead
        eyebrow="ABOUT THE STUDIO"
        title="We take things out before we put things in."
        lead={
          <>
            <p>
              Havenly is a home staging and styling studio in Al Quoz, working
              across Dubai. We prepare properties for viewings and photography, and
              we furnish homes people actually live in.
            </p>
            <p>
              The work is quieter than most interiors work. That is deliberate.
            </p>
          </>
        }
        crumbs={[{ href: "/", label: "Home" }, { label: "About us" }]}
        actions={<WhatsappButton>Talk to the studio</WhatsappButton>}
        image={img.aboutHero}
        imageAlt="Calm apartment dining area in natural daylight"
      />

      <section className="section container">
        <div className="split" data-reveal>
          <div>
            <p className="eyebrow muted">WHY WE WORK THIS WAY</p>
            <h2>
              A room is read
              <br /> in about four seconds.
            </h2>
          </div>
          <div className="split-copy">
            <p>
              Whoever walks in — a buyer, a tenant, a photographer, or you on
              the first evening in a new home — makes a judgement long before
              they look at anything in detail. That judgement is about space,
              light and whether the room seems to know what it is for.
            </p>
            <p>
              Most rooms fail that first read for ordinary reasons. Furniture
              slightly too large. A sofa facing the wrong way. A good view with
              nothing arranged to look at it. Six competing textures where one
              would have been enough.
            </p>
            <p>
              We are not trying to make a property look expensive. We are trying
              to make it legible — so the architecture, the light and the
              proportions get credit for what they already are.
            </p>
            <a className="text-link" href="/services/">
              See how that becomes a service <Arrow />
            </a>
          </div>
        </div>
      </section>

      <FounderNote />

      <section className="band band-linen">
        <div className="container">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow muted">WHAT GUIDES THE WORK</p>
              <h2>Four things we hold to</h2>
            </div>
          </div>
          <ul className="principle-grid" data-reveal>
            {principles.map((principle, i) => (
              <li className="principle-card" key={principle.title}>
                <div className="principle-card-media">
                  <Img
                    src={principle.image}
                    sizes="(max-width: 560px) 92vw, 46vw"
                    alt={principle.imageAlt}
                    loading="lazy"
                  />
                  <span aria-hidden="true">0{i + 1}</span>
                </div>
                <div className="principle-card-copy">
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Parallax
        src={img.materialDetail}
        alt="Linen, oak and ceramic surfaces in close detail"
      >
        <div data-reveal>
          <p className="eyebrow">MATERIALS FIRST</p>
          <h2>Linen, oak, travertine, wool, ceramic.</h2>
          <p>
            Natural surfaces hold up under strong Dubai daylight, photograph
            honestly, and improve rather than date. A restrained palette is not
            a style choice — it is what lets a room keep working after the
            furniture stops being new.
          </p>
        </div>
      </Parallax>

      <section className="section container">
        <div className="split" data-reveal>
          <div>
            <p className="eyebrow muted">BEING STRAIGHT ABOUT IT</p>
            <h2>
              Things we will tell you
              <br /> not to spend money on.
            </h2>
          </div>
          <div className="split-copy">
            <ul className="offer-points">
              <li>
                Furnishing rooms that will never appear in the listing or the
                viewing route.
              </li>
              <li>
                Replacing pieces you already own that are working perfectly
                well in the wrong position.
              </li>
              <li>
                Accessories bought to fill a shelf rather than to be looked at.
              </li>
              <li>
                A full redesign when a consultation and a weekend of
                rearranging would get you most of the way.
              </li>
            </ul>
            <p>
              We would rather scope a project down and be called again than
              write a proposal nobody needed.
            </p>
            <a className="text-link" href={serviceHref("design-consultation")}>
              Start with a consultation instead <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="band band-linen">
        <div className="container">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow muted">WHERE WE WORK</p>
              <h2>At home across Dubai</h2>
            </div>
            <p>
              City apartments, family villas, townhouse handovers
              <br /> and show homes. Share a location and we will confirm
              access and scheduling.
            </p>
          </div>
          <ul className="checklist" data-reveal>
            {dubaiAreas.map((place) => (
              <li key={place}>{place}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow muted">WHAT WE OFFER</p>
            <h2>Three services, one approach</h2>
          </div>
          <a className="text-link" href="/services/">
            Compare all three <Arrow />
          </a>
        </div>
        <div className="card-grid" data-reveal>
          {services.map((service) => (
            <div key={service.slug}>
              <p className="eyebrow muted">{service.eyebrow}</p>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <p className="card-link">
                <a className="text-link" href={serviceHref(service.slug)}>
                  Read more <Arrow />
                </a>
              </p>
            </div>
          ))}
        </div>
      </section>

      <Partners />

      <Voices tone="ink" />

      <CtaBand
        title={
          <>
            If any of this sounds
            <br /> like your property.
          </>
        }
        text="A short message is enough to start. Tell us the property type, where it is and what you are trying to achieve."
        message="Hello Havenly, I read about your approach and I'd like to discuss my property."
      />
    </main>
  );
}
