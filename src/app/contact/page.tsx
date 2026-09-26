import type { Metadata } from "next";
import { PageHero } from "@/components/blocks";
import { WhatsappButton } from "@/components/creative";
import { Arrow, Contact } from "@/components/interactive";
import { img } from "@/lib/images";
import { serviceHref, services } from "@/lib/services";
import { STUDIO_ADDRESS, dubaiAreas, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Book Home Staging or Design Consultation in Dubai",
  description:
    "Ask for a home staging quote, furnishing proposal or interior design consultation in Dubai. WhatsApp is the quickest way to reach the studio.",
  path: "/contact/",
  image: img.contactHero,
});

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="LET’S TALK"
        title="WhatsApp is the fastest way to reach us."
        image={img.contactHero}
        imageAlt="The entrance hall of a styled Dubai villa, daylight carried through by a mirror"
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
        actions={
          <WhatsappButton className="button button-light">
            Open WhatsApp
          </WhatsappButton>
        }
      />

      <section className="section container">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow muted">USEFUL TO SEND</p>
            <h2>What to put in the message</h2>
          </div>
          <p>
            Most projects start with a short message and two photographs. Tell
            us the property type, where it is and what you are trying to
            achieve — we will tell you which service fits and what it would
            involve.
          </p>
        </div>
        <div className="card-grid" data-reveal>
          <div>
            <h3>Two or three photographs</h3>
            <p>
              Taken from the doorway of each room, with the curtains open. They
              tell us more about proportion and light than a description can.
            </p>
          </div>
          <div>
            <h3>The rooms that matter</h3>
            <p>
              Which spaces carry the property — or which ones are currently
              refusing to work. A focused scope is almost always the better
              starting point.
            </p>
          </div>
          <div>
            <h3>Your timing</h3>
            <p>
              A photography date, a handover date, a listing date, or simply
              &ldquo;still planning&rdquo;. It changes what we would recommend
              first.
            </p>
          </div>
        </div>
      </section>

      <section className="band band-linen">
        <div className="container contact-grid">
          <div data-reveal>
            <p className="eyebrow muted">PREFER TO WRITE IT ALL DOWN?</p>
            <h2>
              Prepare a fuller
              <br /> project brief.
            </h2>
            <p>
              The form builds a complete first message from your answers. You
              review it and choose how to send it — nothing leaves your browser
              until you do.
            </p>

            <div className="contact-detail">
              <span className="small-symbol" aria-hidden="true">
                ↗
              </span>
              <span>
                Home staging &amp; styling
                <br />
                <strong>Al Quoz · Dubai</strong>
              </span>
            </div>
            {site.email && (
              <div className="contact-detail">
                <span className="small-symbol" aria-hidden="true">
                  @
                </span>
                <span>
                  Email the studio
                  <br />
                  <strong>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </strong>
                </span>
              </div>
            )}
            <div className="contact-detail">
              <span className="small-symbol" aria-hidden="true">
                ⌂
              </span>
              <span>
                The studio
                <br />
                <strong>
                  <address className="contact-address">
                    {STUDIO_ADDRESS}
                  </address>
                </strong>
              </span>
            </div>
            <p className="form-note coverage-note">
              We work across Dubai, from {dubaiAreas.slice(0, 4).join(", ")}{" "}
              to the villa communities. Share a location and we will confirm
              access, delivery and scheduling.
            </p>
          </div>
          <Contact />
        </div>
      </section>

      <section className="section container">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow muted">BEFORE YOU WRITE</p>
            <h2>You may want to read one of these first</h2>
          </div>
        </div>
        <div className="pager pager-3" data-reveal>
          {services.map((service) => (
            <a key={service.slug} href={serviceHref(service.slug)}>
              <p className="eyebrow">{service.eyebrow}</p>
              <h3>
                {service.title} <Arrow />
              </h3>
            </a>
          ))}
        </div>
        <p className="concept-note">
          Still not sure?{" "}
          <a className="text-link" href="/services/#compare">
            Compare the three services <Arrow />
          </a>
        </p>
      </section>
    </main>
  );
}
