import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/blocks";
import { Parallax, WhatsappButton } from "@/components/creative";
import { Arrow, Spaces } from "@/components/interactive";
import { img } from "@/lib/images";
import { concepts } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Villa & Apartment Styling Concepts in Dubai",
  description:
    "Villa and apartment styling concepts from our Dubai studio: living rooms, a modern majlis, bedrooms, terraces and the details that carry a viewing.",
  path: "/spaces/",
  image: img.spacesHero,
});

export default function SpacesPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="STYLING CONCEPTS"
        title="Rooms, and the reasons they work."
        image={img.spacesHero}
        imageAlt="Sunlit villa living room styled with linen seating and open garden views"
        crumbs={[{ href: "/", label: "Home" }, { label: "Our spaces" }]}
        actions={
          <WhatsappButton className="button button-light">
            Discuss a space like this
          </WhatsappButton>
        }
      />

      <section className="section section-tight container">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow muted">WHAT YOU ARE LOOKING AT</p>
            <h2>Every room starts with a decision</h2>
          </div>
          <p>
            A visual record of how we think about space. Each one is chosen to
            show a specific decision — where the seating faces, how a plan is
            zoned, what a terrace needs to stop being an afterthought.
          </p>
        </div>
        <Spaces />
      </section>

      <Parallax
        src={img.heroVilla}
        alt="Villa interior arranged around the light from the garden doors"
      >
        <div data-reveal>
          <p className="eyebrow">HOW TO READ THESE</p>
          <h2>The furniture is the least interesting part.</h2>
          <p>
            In every concept, look at what the room is asking you to do — where
            you would sit, what you would look at, how you would cross it. That
            is the part we design. The pieces follow.
          </p>
        </div>
      </Parallax>

      <section className="section container">
        <div className="split" data-reveal>
          <div>
            <p className="eyebrow muted">YOUR PROPERTY</p>
            <h2>
              None of these
              <br /> are your home.
            </h2>
          </div>
          <div className="split-copy">
            <p>
              Which is the point of showing them. Every proposal starts from
              your rooms, your light, your ceiling heights and what is already
              in the property — not from a look that has been decided in
              advance.
            </p>
            <p>
              If one of these concepts is close to what you are imagining, say
              so when you get in touch. It is a useful shortcut for both of us.
            </p>
            <a className="text-link" href="/services/">
              See the three services <Arrow />
            </a>
          </div>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Send us a photograph
            <br /> of the room.
          </>
        }
        text="One or two pictures and the room dimensions are usually enough for us to say what we would change first."
        message="Hello Havenly, I saw your styling concepts and I'd like to discuss a room in my property."
      />
    </main>
  );
}
