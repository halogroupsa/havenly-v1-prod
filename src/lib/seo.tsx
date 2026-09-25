import type { Metadata } from "next";
import { site } from "./site";

/**
 * The share image for a page, as a 1200×630 JPG.
 *
 * Link previews are how most people here first see the site — a URL pasted
 * into WhatsApp — and WhatsApp does not reliably render WebP. So every page
 * points at `/og/<name>.jpg`, and scripts/og-images.mjs cuts that JPG from
 * `/images/<name>.webp` after the export. Only files a page actually names
 * are generated, and the build fails if one has no source.
 */
export function ogImage(src = "/images/villa.webp") {
  const name = src.replace(/^\/images\//, "").replace(/\.webp$/, "");
  return `/og/${name}.jpg`;
}

/**
 * Per-page metadata: title, description, canonical URL and the share card.
 *
 * Next merges `openGraph` shallowly, so a page that sets only a title would
 * otherwise share the layout's og:title, og:description and og:image with
 * every other page. Building the whole block here keeps each preview true to
 * its own page. Canonical and share URLs need an absolute origin, so a build
 * with no NEXT_PUBLIC_SITE_URL (staging, which is noindex anyway) omits them.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  /** With its trailing slash, e.g. `/about/` — the URL that answers 200. */
  path: string;
  /** A `/images/*.webp` source; the default villa photograph if omitted. */
  image?: string;
  /** The homepage title is written out in full rather than templated. */
  absoluteTitle?: boolean;
}): Metadata {
  const shareTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(site.url
      ? {
          alternates: { canonical: path },
          openGraph: {
            title: shareTitle,
            description,
            url: path,
            siteName: site.name,
            locale: "en_AE",
            type: "website",
            images: [
              { url: ogImage(image), width: 1200, height: 630, alt: title },
            ],
          },
          twitter: {
            card: "summary_large_image",
            title: shareTitle,
            description,
            images: [ogImage(image)],
          },
        }
      : {}),
  };
}

/** The studio's node in the structured data, referenced from other pages. */
export function businessId() {
  return `${site.url}/#business`;
}

/** Breadcrumb trail as schema.org BreadcrumbList. */
export function breadcrumbJsonLd(crumbs: { href?: string; label: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      /* The last crumb is the current page and carries no link; schema.org
         and Google both allow the final item without one. */
      ...(crumb.href ? { item: new URL(crumb.href, site.url).href } : {}),
    })),
  };
}

/** Questions and answers as schema.org FAQPage. */
export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** A `<script type="application/ld+json">` for one structured-data object. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
