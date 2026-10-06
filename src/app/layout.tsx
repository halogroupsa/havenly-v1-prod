import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  ContactTracking,
  Header,
  Motion,
  PageFade,
} from "@/components/interactive";
import { GoogleTagsHead, GoogleTagsNoscript } from "@/components/analytics";
import { WhatsappFab } from "@/components/creative";
import { SocialRow } from "@/components/blocks";
import { serviceHref, services } from "@/lib/services";
import { ORGANIZING_HREF, roomHref, rooms } from "@/lib/organizing";
import { STUDIO_ADDRESS, dubaiAreas, indexable, site } from "@/lib/site";
import { JsonLd, businessId, ogImage } from "@/lib/seo";
import "./globals.css";

const assistant = localFont({
  src: "../../public/fonts/assistant.ttf",
  variable: "--font-assistant",
  display: "swap",
  weight: "200 800",
});

export const metadata: Metadata = {
  title: {
    default: "Home Staging & Interior Styling in Dubai | Havenly",
    template: "%s | Havenly",
  },
  description:
    "Home staging and interior styling studio in Al Quoz, Dubai. Staging, furniture packages and design consultation for Dubai villas, apartments and show homes.",
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  // Indexing is off unless this bundle was built for the production origin —
  // see `indexable` in src/lib/site.ts. This <meta> backs up the X-Robots-Tag
  // header in out/_headers, covering any host that strips response headers;
  // scripts/robots.mjs keeps that header and robots.txt in step with it.
  //
  // An indexable build emits no robots meta at all rather than an explicit
  // "index, follow". Absent means indexable to every crawler, and the positive
  // form would land a second, contradictory robots tag on the pages Next
  // already marks noindex itself — 404 and not-found.
  ...(indexable
    ? {}
    : {
        robots: {
          index: false,
          follow: false,
          nocache: true,
          googleBot: { index: false, follow: false, noimageindex: true },
        },
      }),
  // Fallback share card for any page that does not build its own with
  // pageMetadata() in src/lib/seo.tsx — in practice, only the 404.
  openGraph: {
    title: "Havenly — Home staging & interior styling in Dubai",
    description:
      "Home staging, furnishing and interior styling for villas and apartments in Dubai.",
    siteName: site.name,
    ...(site.url
      ? { images: [{ url: ogImage(), width: 1200, height: 630 }] }
      : {}),
    locale: "en_AE",
    type: "website",
  },
};

/* Local-business structured data, so search engines can tie the studio to
   Dubai and the services it offers. Only fields the site already states —
   no opening hours, coordinates or price range until the studio confirms
   them. The @id lets each service page name this node as its provider. */
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  description:
    "Home staging, furnishing and interior styling studio in Al Quoz, Dubai.",
  ...(site.url
    ? {
        "@id": businessId(),
        url: `${site.url}/`,
        image: `${site.url}${ogImage()}`,
      }
    : {}),
  ...(site.email ? { email: site.email } : {}),
  ...(site.phone ? { telephone: `+${site.phone}` } : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Marabea Street, Al Quoz 1",
    postOfficeBoxNumber: "26800",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.name}, ${STUDIO_ADDRESS}`,
  )}`,
  areaServed: {
    "@type": "City",
    name: "Dubai",
    containsPlace: dubaiAreas.map((name) => ({ "@type": "Place", name })),
  },
  makesOffer: [
    ...services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.title },
    })),
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Interior organizing" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AE" className={assistant.variable}>
      <head>
        <GoogleTagsHead />
      </head>
      <body>
        <GoogleTagsNoscript />
        <JsonLd data={businessJsonLd} />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <noscript>
          <style>{`.header.is-over-hero{position:sticky;background:rgba(255,255,255,.97);border-bottom-color:#eceee9;color:var(--ink)}.hero-content{padding-top:0}.hero{height:min(730px,calc(100svh - 92px))}@media(max-width:1100px){.hero{height:min(640px,calc(90svh - 76px))}}.menu-toggle,.nav-group-toggle,.space-filters,.contact-form,.voices-controls{display:none!important}.voices-body{gap:40px}.voices-item{grid-area:auto;opacity:1;visibility:visible;transform:none}@media(max-width:800px){.main-nav{display:flex;position:static;inset:auto;flex-wrap:wrap;box-shadow:none;gap:15px;padding:10px 0;background:none;backdrop-filter:none;color:inherit;font-size:12px;overflow:visible}.main-nav .nav-link{color:inherit;border:0;padding:0}.nav-group,.nav-group-row{display:contents}.nav-sub{display:none}.nav-inner{flex-wrap:wrap;padding-block:16px}.main-nav .nav-cta{margin:0}}`}</style>
        </noscript>
        {/* Held between pages: while one document hands over to the next,
            the content fades down to the paper ground and the mark is what
            stands on it. Static markup — the fade is CSS both ways, so it
            plays on an ordinary page load too. */}
        <div className="page-mark" aria-hidden="true">
          <img
            className="page-mark-emblem"
            src="/images/logo/havenly-emblem.png"
            alt=""
            width={256}
            height={256}
          />
        </div>
        {children}
        <footer className="footer">
          <div className="container footer-top">
            <div className="footer-brand">
              <a className="brand" href="/" aria-label="Havenly home">
                <img
                  className="brand-logo"
                  src="/images/logo/havenly-logo.png"
                  alt="Havenly"
                  width={1200}
                  height={424}
                />
              </a>
              <p>
                Thoughtfully styled.
                <br />
                Beautifully lived.
              </p>
              <SocialRow />
            </div>
            <div className="footer-cols">
              <nav aria-label="Services">
                <p className="eyebrow">SERVICES</p>
                {services.map((service) => (
                  <a key={service.slug} href={serviceHref(service.slug)}>
                    {service.title}
                  </a>
                ))}
                <a href="/services/">All services</a>
              </nav>
              <nav aria-label="Interior organizing">
                <p className="eyebrow">ORGANIZING</p>
                {rooms.map((room) => (
                  <a key={room.slug} href={roomHref(room.slug)}>
                    {room.title}
                  </a>
                ))}
                <a href={ORGANIZING_HREF}>All rooms</a>
              </nav>
              <nav aria-label="Studio">
                <p className="eyebrow">STUDIO</p>
                <a href="/about/">About us</a>
                <a href="/spaces/">Our spaces</a>
                <a href="/questions/">Questions</a>
                <a href="/privacy/">Privacy</a>
              </nav>
              <nav aria-label="Contact">
                <p className="eyebrow">CONTACT</p>
                <a href="/contact/">Start a project</a>
                {site.email && (
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                )}
                <address className="footer-address">{STUDIO_ADDRESS}</address>
              </nav>
            </div>
          </div>
          <div className="container footer-bottom">
            <span>© {new Date().getFullYear()} Havenly</span>
            <span>Al Quoz · Dubai · United Arab Emirates</span>
            <a href="/privacy/">Privacy</a>
            <span className="footer-credit">
              Digital Experience by Designs Frontier
            </span>
          </div>
        </footer>
        <Motion />
        <PageFade />
        <WhatsappFab />
        <ContactTracking />
      </body>
    </html>
  );
}
