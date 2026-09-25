import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand, PageHead } from "@/components/blocks";
import { WhatsappButton } from "@/components/creative";
import { Arrow } from "@/components/interactive";
import { concepts, conceptNeighbours, getConcept } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return concepts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (!concept) return { title: "Space not found" };
  return pageMetadata({
    title: concept.seoTitle,
    description: concept.seoDescription || concept.description,
    path: `/spaces/${concept.slug}/`,
    image: concept.image,
  });
}

export default async function SpacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (!concept) notFound();
  const { prev, next } = conceptNeighbours(slug);

  return (
    <main id="main">
      <PageHead
        eyebrow={`${concept.type.toUpperCase()} STYLING CONCEPT · ${concept.location.toUpperCase()}`}
        title={concept.title}
        lead={<p>{concept.description}</p>}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/spaces/", label: "Our spaces" },
          { label: concept.title },
        ]}
        actions={
          <WhatsappButton
            message={`Hello Havenly, I'd like to discuss a space similar to "${concept.title}".`}
          >
            Discuss a space like this
          </WhatsappButton>
        }
        image={concept.image}
        imageAlt={concept.description}
      />

      <section className="section container">
        <div className="split" data-reveal>
          <div>
            <p className="eyebrow muted">THE THOUGHT BEHIND THE SPACE</p>
            <h2>
              Simple choices.
              <br /> A lasting feeling.
            </h2>
          </div>
          <div className="split-copy">
            <p>{concept.detail}</p>
          </div>
        </div>
      </section>

      <section className="band band-linen">
        <div className="container">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow muted">WHAT MAKES IT WORK</p>
              <h2>Three decisions</h2>
            </div>
            <p>{concept.scope}</p>
          </div>
          <div className="card-grid" data-reveal>
            {concept.notes.map((note, i) => (
              <div key={note}>
                <span className="step-number">0{i + 1}</span>
                <p>{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow muted">KEEP LOOKING</p>
            <h2>Nearby concepts</h2>
          </div>
          <a className="text-link" href="/spaces/">
            All spaces <Arrow />
          </a>
        </div>
        <div className="pager" data-reveal>
          {prev && (
            <a href={`/spaces/${prev.slug}/`}>
              <p className="eyebrow">← PREVIOUS</p>
              <h3>{prev.title}</h3>
            </a>
          )}
          {next && (
            <a href={`/spaces/${next.slug}/`}>
              <p className="eyebrow">NEXT →</p>
              <h3>{next.title}</h3>
            </a>
          )}
        </div>
      </section>

      <CtaBand
        title={
          <>
            Inspired by {concept.location}.
            <br /> Made for your property.
          </>
        }
        text="Every proposal is tailored to your rooms, your light and the way you want the property to feel."
        message={`Hello Havenly, I'd like to discuss a space similar to "${concept.title}".`}
      />
    </main>
  );
}
