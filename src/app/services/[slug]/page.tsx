import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand, PageHead, Voices } from "@/components/blocks";
import {
  BeforeAfter,
  OnThisPage,
  Parallax,
  WhatsappButton,
} from "@/components/creative";
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

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "paths", label: "Ways in" },
    ...(showComparison ? [{ id: "difference", label: "The difference" }] : []),
    { id: "included", label: "What’s included" },
    { id: "outcomes", label: "What changes" },
    { id: "process", label: "How it runs" },
    { id: "questions", label: "Questions" },
  ];

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
      <PageHead
        eyebrow={service.eyebrow}
        title={service.hero}
        lead={
          <>
            <p>{service.summary}</p>
            <p className="lead-note muted">
              {service.audience}
            </p>
          </>
        }
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services/", label: "Services" },
          { label: service.title },
        ]}
        actions={
          <>
            <WhatsappButton message={guide.waMessage}>
              Start on WhatsApp
            </WhatsappButton>
            <a className="text-link" href="#included">
              See what’s included <Arrow />
            </a>
          </>
        }
        image={service.image}
        imageAlt={service.imageAlt}
      />

      <div className="container section">
        <div className="service-body">
          <OnThisPage sections={sections} />
          <div className="service-sections">
            <section id="overview" data-reveal>
              <h2>{guide.bestWhen}</h2>
              {service.introduction.map((paragraph) => (
                <p key={paragraph} className="split-copy">
                  {paragraph}
                </p>
              ))}
            </section>

            <section id="paths" data-reveal>
              <h2>Three ways this usually starts</h2>
              <ul className="feature-list">
                {service.paths.map((path) => (
                  <li key={path.title}>
                    <div>
                      <p className="eyebrow muted">{path.label}</p>
                      <h3>{path.title}</h3>
                    </div>
                    <p>{path.text}</p>
                  </li>
                ))}
              </ul>
            </section>

            {showComparison && (
              <section id="difference" data-reveal>
                <h2>The same room, twice</h2>
                <p className="split-copy">
                  Nothing structural changes between these two photographs. The
                  walls, the light and the floor area are identical — only the
                  furniture, its placement and the finishing layers are
                  different. Drag to compare.
                </p>
                <BeforeAfter
                  before={img.stagingBefore}
                  after={img.stagingAfter}
                  beforeAlt="The room before styling, with no furniture to give it scale"
                  afterAlt="The same room after styling, with seating, textiles and layered light"
                  beforeLabel="Before styling"
                  afterLabel="After styling"
                />
              </section>
            )}

            <section id="included" data-reveal>
              <h2>What’s included</h2>
              <p className="split-copy">
                Every proposal is written for the property in front of us, so
                the detail moves. This is the shape it generally takes.
              </p>
              <ul className="checklist">
                {service.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section id="outcomes" data-reveal>
              <h2>What actually changes</h2>
              <div className="card-grid card-grid-2">
                {service.outcomes.map((outcome) => (
                  <div key={outcome.title}>
                    <h3>{outcome.title}</h3>
                    <p>{outcome.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="process" data-reveal>
              <h2>How it runs</h2>
              <div className="card-grid card-grid-2">
                {service.process.map((step, i) => (
                  <div key={step.title}>
                    <span className="step-number">0{i + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="questions" data-reveal>
              <h2>Questions people ask</h2>
              <div className="faqs">
                {service.faqs.map((faq) => (
                  <details key={faq.question}>
                    <summary>
                      {faq.question}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
              <p className="concept-note">
                {guide.considerInstead.text}{" "}
                <a
                  className="text-link"
                  href={serviceHref(guide.considerInstead.slug)}
                >
                  Read that instead <Arrow />
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>

      <Parallax
        src={img.installDay}
        alt="Furniture and textiles being placed during an installation"
      >
        <div data-reveal>
          <p className="eyebrow">{service.eyebrow}</p>
          <h2>{guide.typicalScope}.</h2>
          <p>{guide.youKeep}.</p>
        </div>
      </Parallax>

      <Voices tone="paper" />

      <section className="band band-linen">
        <div className="container">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow muted">THE OTHER TWO</p>
              <h2>If this isn’t quite it</h2>
            </div>
          </div>
          <div className="pager" data-reveal>
            {others.map((other) => (
              <a key={other.slug} href={serviceHref(other.slug)}>
                <p className="eyebrow">{other.eyebrow}</p>
                <h3>
                  {other.title} <Arrow />
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>

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
