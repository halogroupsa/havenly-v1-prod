import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  FaqPanel,
  Features,
  FilmStrip,
  PhotoCards,
  PhotoStory,
  Sourcing,
  TilePair,
} from "@/components/bands";
import { CtaBand, PageHero, Voices } from "@/components/blocks";
import { BeforeAfter, Parallax, WhatsappButton } from "@/components/creative";
import { Arrow } from "@/components/interactive";
import { img } from "@/lib/images";
import {
  getService,
  serviceGuide,
  serviceHref,
  services,
} from "@/lib/services";
import { site } from "@/lib/site";
import {
  JsonLd,
  businessId,
  faqJsonLd,
  ogImage,
  pageMetadata,
} from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return pageMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: serviceHref(service.slug),
    image: service.image,
  });
}

/*
 * A service page is a sequence of photographed bands, the same vocabulary the
 * organizing pages read from. It replaced a sticky index beside six stacked
 * prose sections: three headed paragraphs for the ways in, a six-item
 * checklist for the scope, and two card grids for the outcomes and the
 * process. The words are largely the same words — each one now sits as a
 * caption to a picture of the thing it describes, which is what someone
 * choosing between staging, furnishing and a consultation actually wants to
 * compare.
 *
 * The order is also the ground the bands sit on, and no two touching bands
 * share one. Reading down: white, sand, white, linen, white, photograph,
 * white, ink, white, linen — every seam is a change of colour, so a band ends
 * where the ground ends rather than wherever its copy runs out. Staging adds
 * its comparison on linen straight after the opening, which is the one place
 * a before-and-after belongs and keeps the alternation intact. Move a band
 * here and its neighbour's tone has to move with it.
 */
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const guide = serviceGuide[service.slug];
  const showComparison = service.slug === "home-staging";
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <main id="main">
      {site.url && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            serviceType: service.title,
            description: service.seoDescription,
            url: new URL(serviceHref(service.slug), site.url).href,
            image: `${site.url}${ogImage(service.image)}`,
            provider: { "@id": businessId() },
            areaServed: { "@type": "City", name: "Dubai" },
          }}
        />
      )}
      <JsonLd data={faqJsonLd(service.faqs)} />

      <PageHero
        eyebrow={service.eyebrow}
        title={service.hero}
        image={service.image}
        imageAlt={service.imageAlt}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services/", label: "Services" },
          { label: service.title },
        ]}
        actions={
          <>
            <WhatsappButton
              className="button button-light"
              message={guide.waMessage}
            >
              Start on WhatsApp
            </WhatsappButton>
            <a className="text-link" href="#included">
              See what’s included <Arrow />
            </a>
          </>
        }
      />

      <PhotoStory
        eyebrow={service.eyebrow}
        line={`${guide.bestWhen}.`}
        body={[service.summary, service.introduction[0]]}
        cta="See what’s included"
        href="#included"
        wide={service.story.wide}
        wideAlt={service.story.wideAlt}
        detail={service.story.detail}
        detailAlt={service.story.detailAlt}
      />

      {/* Staging is the one service whose whole argument is a photograph of
          the same room twice, so it keeps the wipe — and takes the linen the
          organizing pages give their comparison. */}
      {showComparison && (
        <section
          id="difference"
          className="band band-linen org-band-tight"
          aria-labelledby="difference-title"
        >
          <div className="container">
            <div className="section-heading org-head" data-reveal>
              <div>
                <p className="eyebrow muted">THE SAME ROOM, TWICE</p>
                <h2 id="difference-title">Nothing structural changed.</h2>
              </div>
              <p>
                The walls, the light and the floor area are identical.
                <br /> Drag to compare.
              </p>
            </div>
            <BeforeAfter
              before={img.stagingBefore}
              after={img.stagingAfter}
              beforeAlt="The room before styling, with no furniture to give it scale"
              afterAlt="The same room after styling, with seating, textiles and layered light"
              beforeLabel="Before styling"
              afterLabel="After styling"
            />
          </div>
        </section>
      )}

      <Features
        id="outcomes-title"
        eyebrow="WHAT CHANGES"
        title="What actually changes"
        items={service.outcomes.map((outcome) => ({
          image: outcome.image,
          alt: outcome.imageAlt,
          title: outcome.title,
          text: outcome.text,
        }))}
      />

      <PhotoCards
        id="paths-title"
        eyebrow="WAYS IN"
        title="Three ways this usually starts"
        aside={<p>{service.audience}</p>}
        cards={service.paths.map((path) => ({
          image: path.image,
          alt: path.imageAlt,
          label: path.label,
          title: path.title,
          text: path.text,
        }))}
      />

      <Sourcing
        anchor="included"
        eyebrow="IN THE SCOPE"
        title="What’s included"
        text={service.introduction[1]}
        image={service.includedImage}
        imageAlt={service.includedImageAlt}
        groups={service.included}
      />

      <FilmStrip
        id="process-title"
        eyebrow="HOW IT RUNS"
        title="From first look to handover"
        aside={
          <p>
            Four stages, every time.
            <br /> Only the property changes.
          </p>
        }
        steps={service.process.map((step) => ({
          image: step.image,
          alt: step.imageAlt,
          title: step.title,
          text: step.text,
        }))}
      />

      <Parallax src={service.band.image} alt={service.band.alt}>
        <div data-reveal>
          <p className="eyebrow">{service.eyebrow}</p>
          <h2>{guide.typicalScope}.</h2>
          <p>{guide.youKeep}.</p>
        </div>
      </Parallax>

      <FaqPanel
        eyebrow="GOOD QUESTIONS"
        title="Questions people ask"
        name="service-faq"
        faqs={service.faqs}
        image={service.faqImage}
        imageAlt={service.faqImageAlt}
        note={
          <p className="concept-note">
            {guide.considerInstead.text}{" "}
            <a
              className="text-link"
              href={serviceHref(guide.considerInstead.slug)}
            >
              Read that instead <Arrow />
            </a>
          </p>
        }
      />

      <Voices tone="ink" />

      <TilePair
        id="others-title"
        eyebrow="THE OTHER TWO"
        title="If this isn’t quite it"
        tone="paper"
        tiles={others.map((other) => ({
          href: serviceHref(other.slug),
          image: other.tile,
          alt: other.tileAlt,
          title: other.title,
          text: serviceGuide[other.slug].bestWhen,
        }))}
      />

      <CtaBand
        title={
          <>
            Tell us about
            <br /> the property.
          </>
        }
        text="A message with the location, the rooms involved and your timing is enough to get a straight answer about scope and fit."
        message={guide.waMessage}
      />
    </main>
  );
}
