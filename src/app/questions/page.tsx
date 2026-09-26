import type { Metadata } from "next";
import { CtaBand, PageHead } from "@/components/blocks";
import { Arrow } from "@/components/interactive";
import { serviceHref, services } from "@/lib/services";
import { generalFaqs } from "@/lib/site";
import { JsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Home Staging Cost in Dubai & FAQs",
  description:
    "What home staging costs in Dubai, how furniture packages and staging rental work, and answers to common questions about styling a Dubai property.",
  path: "/questions/",
});

/* The homepage shows four general questions and links here. This page is the
   whole set: the general ones, then each service's own, grouped under the
   service they belong to rather than merged into one long list. Nothing is
   written twice — both sources are the same data the service pages use. */
const allFaqs = [...generalFaqs, ...services.flatMap((s) => s.faqs)];

export default function QuestionsPage() {
  return (
    <main id="main">
      <JsonLd data={faqJsonLd(allFaqs)} />
      <PageHead
        eyebrow="BEFORE YOU GET IN TOUCH"
        title="Questions, answered."
        lead={
          <>
            <p>
              What staging is, how a project runs, what shapes a price and what
              we need from you. If your question is not here, ask us directly —
              WhatsApp is the quickest way to reach the studio.
            </p>
          </>
        }
        crumbs={[{ href: "/", label: "Home" }, { label: "Questions" }]}
      />

      <section className="section container faq-page" aria-labelledby="general">
        <div data-reveal>
          <p className="eyebrow muted">GENERAL</p>
          <h2 id="general">About working with us</h2>
        </div>
        <div className="faqs">
          {generalFaqs.map((faq) => (
            <details key={faq.question} name="faq-general">
              <summary>
                {faq.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {services.map((service) => (
        <section
          key={service.slug}
          className="section-tight container faq-page"
          aria-labelledby={`faq-${service.slug}`}
        >
          <div data-reveal>
            <p className="eyebrow muted">{service.eyebrow}</p>
            <h2 id={`faq-${service.slug}`}>{service.title}</h2>
            <a className="text-link" href={serviceHref(service.slug)}>
              About this service <Arrow />
            </a>
          </div>
          <div className="faqs">
            {service.faqs.map((faq) => (
              <details key={faq.question} name={`faq-${service.slug}`}>
                <summary>
                  {faq.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ))}

      <CtaBand
        eyebrow="STILL WONDERING"
        title="Ask us anything about your property."
        text="Tell us the property, the rooms and your timeline, and we will tell you honestly what we would do with it."
        message="Hello Havenly, I have a question about styling my property."
      />
    </main>
  );
}
