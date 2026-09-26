import type { Metadata } from "next";
import { CtaBand, Marquee, PageHero, Voices } from "@/components/blocks";
import { Parallax, WhatsappButton } from "@/components/creative";
import { Img } from "@/components/image";
import { Arrow } from "@/components/interactive";
import { img } from "@/lib/images";
import { serviceGuide, serviceHref, services } from "@/lib/services";
import { audiences } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Interior Styling & Staging Services in Dubai",
  description:
    "Home staging, furniture packages and interior design consultation for villas, apartments and show homes across Dubai.",
  path: "/services/",
  image: img.servicesHero,
});

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="WHAT WE DO"
        title="Three ways to make a property feel resolved."
        image={img.servicesHero}
        imageAlt="Villa living room styled with linen seating and warm timber"
        crumbs={[{ href: "/", label: "Home" }, { label: "Services" }]}
        actions={
          <>
            <WhatsappButton className="button button-light">
              Ask which one fits
            </WhatsappButton>
            <a className="text-link" href="#compare">
              Compare the three <Arrow />
            </a>
          </>
        }
      />

      <div className="container marquee-wrap">
        <Marquee
          items={[
            "Vacant staging",
            "Occupied staging",
            "Listing-day styling",
            "Move-in furnishing",
            "Rental-ready packages",
            "Room reset",
            "Selection review",
            "Show home styling",
          ]}
        />
      </div>

      <section className="section container">
        <div className="split" data-reveal>
          <div>
            <p className="eyebrow muted">WHERE YOURS SITS</p>
            <h2>
              Every property arrives
              <br /> at a different point.
            </h2>
          </div>
          <div className="split-copy">
            <p>
              Some are empty and going to market next month. Some are full of a
              life that is halfway packed. Some simply need someone to say
              which decision to make first.
            </p>
            <p>
              Tell us where yours sits and we will tell you which of these
              actually helps.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-tight container">
        <div className="offer-rows">
          {services.map((service, i) => {
            const guide = serviceGuide[service.slug];
            return (
              <article className="offer-row" key={service.slug} data-reveal>
                <div className="offer-media">
                  <Img
                    src={service.image}
                    sizes="(max-width: 800px) 92vw, 46vw"
                    alt={service.imageAlt}
                    width="900"
                    height="760"
                    loading="lazy"
                  />
                </div>
                <div className="offer-copy">
                  <span className="offer-index">0{i + 1} — {service.eyebrow}</span>
                  <h2>{service.title}</h2>
                  <p>{service.summary}</p>
                  <ul className="offer-points">
                    {guide.rightIf.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <a className="text-link" href={serviceHref(service.slug)}>
                    Read about {service.title.toLowerCase()} <Arrow />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="compare" className="band band-linen">
        <div className="container">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow muted">SIDE BY SIDE</p>
              <h2>Which one fits your property</h2>
            </div>
            <p>
              The difference is usually not the rooms.
              <br /> It is what happens to the furniture afterwards.
            </p>
          </div>
          <div className="compare-table" data-reveal>
            <div className="compare-head">
              <span>Service</span>
              {services.map((s) => (
                <h3 key={s.slug}>
                  <a href={serviceHref(s.slug)}>{s.title}</a>
                </h3>
              ))}
            </div>
            {(
              [
                ["Best when", "bestWhen"],
                ["Typical scope", "typicalScope"],
                ["Afterwards", "youKeep"],
                ["Suits", "audience"],
              ] as const
            ).map(([label, key]) => (
              <dl key={label}>
                <dt>{label}</dt>
                {services.map((s) => (
                  <dd key={s.slug} data-service={s.title}>
                    {key === "audience"
                      ? s.audience
                      : serviceGuide[s.slug][key]}
                  </dd>
                ))}
              </dl>
            ))}
            <dl>
              <dt>Read more</dt>
              {services.map((s) => (
                <dd key={s.slug} data-service={s.title}>
                  <a className="text-link" href={serviceHref(s.slug)}>
                    {s.title} <Arrow />
                  </a>
                </dd>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Parallax
        src={img.materialDetail}
        alt="Close detail of natural linen, oak and ceramic surfaces"
      >
        <div data-reveal>
          <p className="eyebrow">THE PART THAT IS THE SAME EVERY TIME</p>
          <h2>We resolve the room before we decorate it.</h2>
          <p>
            Scale, circulation and light first. Whatever the service, those
            three decide whether a room feels generous — and no amount of
            styling rescues them once they are wrong.
          </p>
        </div>
      </Parallax>

      <section className="section container">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow muted">WHO WE WORK WITH</p>
            <h2>Briefs we know well</h2>
          </div>
          <p>
            Different reasons for calling.
            <br /> The same need to be understood quickly.
          </p>
        </div>
        <div className="card-grid" data-reveal>
          {audiences.map((a) => (
            <div key={a.title}>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Voices tone="ink" />

      <CtaBand
        title={
          <>
            Not sure which one
            <br /> you need?
          </>
        }
        text="Send us the property type, the rooms involved and your timing. We will tell you honestly which service fits — including when the answer is the smallest one."
        message="Hello Havenly, I'd like help choosing the right service for my property."
      />
    </main>
  );
}
