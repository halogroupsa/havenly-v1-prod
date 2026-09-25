import type { Metadata } from "next";
import { Partners, Voices } from "@/components/blocks";
import {
  BeforeAfter,
  HeroFrames,
  ProcessSteps,
  WhatsappButton,
} from "@/components/creative";
import { Img } from "@/components/image";
import { Arrow, Contact, Spaces } from "@/components/interactive";
import { img } from "@/lib/images";
import { serviceHref, services } from "@/lib/services";
import {
  concepts,
  generalFaqs,
  heroFrames,
  materials,
  processSteps,
  studioFacts,
  studioFactsArePlaceholder,
} from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Home Staging & Interior Styling in Dubai | Havenly",
  absoluteTitle: true,
  description:
    "Home staging and interior styling studio in Al Quoz, Dubai. Staging, furniture packages and design consultation for Dubai villas, apartments and show homes.",
  path: "/",
});

export default function Home() {
  return (
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <HeroFrames frames={heroFrames} />
        <div className="hero-shade" />
        <div className="container hero-content">
          <h1 id="hero-title">
            Home staging and interior styling for villas and apartments in Dubai.
          </h1>
          <div className="hero-actions">
            <a href="/services/" className="button button-light">
              Discover what we do <Arrow />
            </a>
          </div>
        </div>
        <a className="hero-scroll" href="#about">
          Scroll down <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section id="about" className="section intro-section">
        <div className="container">
          {/* Three grid items, not two columns of one: the eyebrow takes a
              row of its own so the copy on the right starts level with the
              heading rather than beside the label above it. */}
          <div className="intro" data-reveal>
            <p className="eyebrow muted">THE HAVENLY WAY</p>
            <h2>
              More than a beautiful room.
              <br /> A place to see yourself.
            </h2>
            <div className="intro-copy">
              <p>
                Havenly is a home staging and interior styling studio in Dubai.
                Considered furniture, natural texture and the right details — so
                a property reads as somewhere to live rather than something to
                view.
              </p>
              <a href="/about/" className="text-link">
                Get to know our approach <Arrow />
              </a>
            </div>
          </div>
        </div>

        {/* The work is visual, so the section argues visually. Four rooms
            rather than four distances — living room, majlis, dining room,
            bedroom — so the set shows range of brief rather than range of
            lens. They are separated on light as much as on room: cool side
            light, warm raking light, flat overcast, cool morning.

            Three columns: a tall frame on each outer edge with the two
            landscape crops stacked between them. The band closes flush top and
            bottom, so the composition is read across rather than down. */}
        <div className="intro-mosaic" data-reveal>
          <figure className="mosaic-room">
            <Img
              src={img.introRoom}
              sizes="(max-width: 560px) 92vw, (max-width: 800px) 46vw, 31vw"
              width="1122"
              height="1402"
              alt="Living room of a Dubai Marina apartment with a linen sofa, a woven walnut chair and a travertine table, the marina beyond full-height glazing"
              loading="lazy"
            />
          </figure>
          <figure className="mosaic-detail">
            <Img
              src={img.introDetail}
              sizes="(max-width: 560px) 92vw, (max-width: 800px) 46vw, 31vw"
              width="1440"
              height="720"
              alt="Villa majlis with low linen seating along the wall, layered rugs and a brass dallah on an oak table in late afternoon light"
              loading="lazy"
            />
          </figure>
          <figure className="mosaic-threshold">
            <Img
              src={img.introThreshold}
              sizes="(max-width: 560px) 92vw, (max-width: 800px) 46vw, 31vw"
              width="1440"
              height="720"
              alt="Dining room with a long oak table, pale upholstered chairs and a plaster pendant under flat daylight from the terrace"
              loading="lazy"
            />
          </figure>
          <figure className="mosaic-bedroom">
            <Img
              src={img.introBedroom}
              sizes="(max-width: 560px) 92vw, (max-width: 800px) 46vw, 31vw"
              width="1122"
              height="1402"
              alt="Bedroom corner with layered linen bedding, a timber stool and a jute rug in morning light through a sheer curtain"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      {/* The trust row sits directly under the intro: the studio's own claim
          about how it works, answered immediately by the names that have
          worked with it. Linen between the two white sections either side
          keeps the three reading as separate blocks. */}
      <Partners />

      <section id="spaces" className="section container">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow muted">ROOM TO BE INSPIRED</p>
            <h2>A feeling, in every space</h2>
          </div>
          <a className="text-link" href="/spaces/">
            See all styling concepts <Arrow />
          </a>
        </div>
        <Spaces limit={6} />
        
      </section>

      <section id="services" className="section services-section">
        <div className="container">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow muted">
                A LITTLE VISION. A REAL DIFFERENCE.
              </p>
              <h2>How we can help</h2>
            </div>
            <p>
              From a fresh perspective
              <br /> to a fully furnished home.
            </p>
          </div>
          {/* Full-bleed tiles: the photograph is the card, and the title is
              all that sits on it at rest. The summary and the link stay in the
              markup — collapsed, not removed, so assistive technology still
              reads them — and rise into view on hover. Touch devices never
              open them; there the tile is a photograph, a title and a tap. */}
          <div className="services-grid">
            {services.map((service) => (
              <a
                className="service-tile"
                key={service.slug}
                href={serviceHref(service.slug)}
                data-reveal
              >
                <Img
                  src={service.tile}
                  sizes="(max-width: 560px) 92vw, 31vw"
                  width="820"
                  height="1000"
                  alt={service.tileAlt}
                  loading="lazy"
                />
                <span className="service-tile-scrim" aria-hidden="true" />
                <div className="service-tile-body">
                  <h3>{service.title}</h3>
                  <div className="service-tile-reveal">
                    <div>
                      <p>{service.summary}</p>
                      <span className="text-link">
                        Read more <Arrow />
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* The case for the whole business, made without a paragraph to carry
          it: one room photographed twice from the same position, and a handle
          to move between the two. The copy only has to say what to do. */}
      <section
        id="difference"
        className="band band-ink"
        aria-labelledby="difference-title"
      >
        <div className="container">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow muted">THE DIFFERENCE STAGING MAKES</p>
              <h2 id="difference-title">The same room, twice.</h2>
            </div>
            <p>
              Same walls, same light, same floor area.
              <br /> Drag to compare.
            </p>
          </div>
          <div data-reveal>
            <BeforeAfter
              before={img.stagingBefore}
              after={img.stagingAfter}
              beforeAlt="The room before styling, empty and without furniture to give it scale"
              afterAlt="The same room after styling, with seating, textiles and layered light"
              beforeLabel="Before styling"
              afterLabel="After styling"
            />
          </div>
          {/* <p className="concept-note">
            A styling concept created to illustrate the difference furniture
            placement makes. Not a photograph of a client project.
          </p> */}
        </div>
      </section>

      <section className="philosophy">
        <div className="philosophy-image">
          <Img
            src={img.dining}
            sizes="(max-width: 560px) 100vw, 50vw"
            width="1536"
            height="1024"
            alt="Natural wood and textured linen in a calm apartment dining area"
            loading="lazy"
          />
        </div>
        <div className="philosophy-copy" data-reveal>
          <p className="eyebrow muted">LESS CLUTTER. MORE CONNECTION.</p>
          <h2>
            The details are small.
            <br /> The feeling is everything.
          </h2>
          <p>
            A chair angled towards the light. Linen that softens a room. A table
            that brings people together. We believe the most memorable interiors
            make everyday life feel a little better.
          </p>
          {/* Four colour dots said "we have a palette". Four macro frames say
              what the palette is made of, which is the part a client can
              actually judge. The caption is one word per frame — the
              photograph is the argument. */}
          <ul className="swatches" aria-label="The materials we return to">
            {materials.map((material) => (
              <li key={material.name}>
                <Img
                  src={material.image}
                  sizes="(max-width: 560px) 22vw, 13vw"
                  width="600"
                  height="600"
                  alt={material.alt}
                  loading="lazy"
                />
                <span>{material.name}</span>
              </li>
            ))}
          </ul>
          <a href="/about/" className="text-link">
            Read about our materials <Arrow />
          </a>
        </div>
      </section>

      <section id="approach" className="section container">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow muted">THOUGHTFUL FROM START TO FINISH</p>
            <h2>A clear path to a beautiful space</h2>
          </div>
          <a href="/contact/" className="text-link">
            Start a conversation <Arrow />
          </a>
        </div>
        {/* The steps scroll, the photograph does not. One frame per step,
            swapped as the step beside it reaches the middle of the screen,
            so the copy can stay at one line each. */}
        <ProcessSteps steps={processSteps} />
      </section>

      <Voices tone="linen" />

      {/* A flat olive block asked the copy to carry the whole band. A room
          behind a scrim does most of that work before a word is read. */}
      <section className="uae-banner">
        <div
          className="uae-image"
          aria-hidden="true"
          style={{ backgroundImage: `url("${img.uaeBand}")` }}
        />
        <div className="uae-shade" aria-hidden="true" />
        <div className="container" data-reveal>
          <p className="eyebrow">ROOTED HERE. INSPIRED BY YOU.</p>
          <h2>At home in Dubai.</h2>
          <p>
            City apartments. Family villas. A fresh start.
            <br /> Spaces as individual as the people who live in them.
          </p>
          <div className="locations">
            <span>Dubai Marina</span>
            <span>Palm Jumeirah</span>
            <span>Across Dubai</span>
          </div>
        </div>
      </section>

      {/* One thin row of facts, directly under the band that earns them. */}
      <div className="stats-strip">
        <div className="container stats-row">
          {studioFacts.map((fact) => (
            <span key={fact}>{fact}</span>
          ))}
        </div>
        {/* {studioFactsArePlaceholder && (
          <div className="container">
            <p className="concept-note stats-note">
              Placeholder figures. Confirm each of these with the studio before
              this site goes live.
            </p>
          </div>
        )} */}
      </div>

      {/* The image is its own column rather than the tail of the heading
          column: as a grid item it stretches to whatever height the
          questions come to, so the two columns always end level and the
          frame is as tall as the section rather than as tall as the
          photograph happens to be. */}
      <section className="section container faq-section">
        <figure className="faq-image" data-reveal>
          <Img
            src={img.faqRoom}
            sizes="(max-width: 800px) 100vw, 40vw"
            width="1122"
            height="1402"
            alt="A styled bedroom corner with layered linen and a low walnut stool"
            loading="lazy"
          />
        </figure>
        <div data-reveal>
          <p className="eyebrow muted">A FEW THINGS YOU MIGHT BE WONDERING</p>
          <h2>
            Good questions.
            <br /> Thoughtful answers.
          </h2>
          {/* Four here, the rest on /questions/. Five was already more than
              anyone reads on a homepage. */}
          <div className="faqs">
            {generalFaqs.slice(0, 4).map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className="faq-actions">
            <a href="/questions/" className="text-link">
              See all questions <Arrow />
            </a>
            <a href="/contact/" className="text-link">
              Ask us something else <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="container contact-grid">
          <div data-reveal>
            <p className="eyebrow muted">YOUR NEXT CHAPTER STARTS HERE</p>
            <h2>
              Let’s bring your
              <br /> space to life.
            </h2>
            <p>
              Tell us a little about your property and what you have in mind.
              WhatsApp is the quickest way to reach the studio.
            </p>
            <div className="page-head-actions">
              <WhatsappButton />
            </div>
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
          </div>
          <Contact />
        </div>
      </section>

      {/* A row that fills itself: six frames straight off the concept list,
          so it stays current without anyone editing the homepage. Each one
          is a link, which is the whole point of putting it here. */}
      <section className="recent" aria-labelledby="recent-title">
        <div className="container recent-head">
          <div>
            <p className="eyebrow muted">A CLOSER LOOK</p>
            <h2 id="recent-title">Recent styling concepts</h2>
          </div>
          <a className="text-link" href="/spaces/">
            See all styling concepts <Arrow />
          </a>
        </div>
        <ul className="recent-strip">
          {concepts.slice(0, 6).map((concept) => (
            <li key={concept.slug}>
              <a href={`/spaces/${concept.slug}/`}>
                <Img
                  src={concept.image}
                  sizes="(max-width: 560px) 92vw, 31vw"
                  width="600"
                  height="600"
                  alt={concept.description}
                  loading="lazy"
                />
                <span>{concept.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
