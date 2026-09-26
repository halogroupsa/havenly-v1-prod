import { Fragment } from "react";
import { Arrow } from "@/components/interactive";
import { QuoteStage, WhatsappButton } from "@/components/creative";
import { Img } from "@/components/image";
import { testimonials, testimonialsArePlaceholder } from "@/lib/testimonials";
import {
  founder,
  founderIsPlaceholder,
  founderSignature,
  partners,
  partnersAreUnverified,
  site,
  socials,
} from "@/lib/site";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

type Crumb = { href?: string; label: string };

/** The visible trail, restated for search results. Needs an absolute origin,
    so staging builds (which are noindex) leave it out. */
function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => (
        <Fragment key={crumb.label}>
          {i > 0 && <span aria-hidden="true">/</span>}
          {crumb.href ? (
            <a href={crumb.href}>{crumb.label}</a>
          ) : (
            <span aria-current="page">{crumb.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

/**
 * Full-bleed photograph, title at its foot — the homepage's composition, so
 * every page opens like the site rather than like a sub-page. The breadcrumb
 * sits under the picture, where it can be read rather than competing with the
 * title.
 *
 * There is deliberately no lead: the hero carries an eyebrow, a heading and
 * the actions, and nothing else. A paragraph over the photograph is what
 * stops a page reading like the homepage, so copy that would sit here goes
 * in the first band underneath instead.
 */
export function PageHero({
  eyebrow,
  title,
  image,
  imageAlt,
  crumbs,
  actions,
}: {
  eyebrow: string;
  title: React.ReactNode;
  image: string;
  imageAlt: string;
  crumbs: Crumb[];
  actions?: React.ReactNode;
}) {
  return (
    <>
      {site.url && <JsonLd data={breadcrumbJsonLd(crumbs)} />}
      <section className="page-hero" aria-labelledby="page-title">
        <Img
          src={image}
          alt={imageAlt}
          sizes="100vw"
          width="1920"
          height="1080"
          fetchPriority="high"
        />
        <div className="page-hero-shade" aria-hidden="true" />
        <div className="container page-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="page-title">{title}</h1>
          {actions && <div className="hero-actions">{actions}</div>}
        </div>
      </section>
      <div className="container page-hero-crumb">
        <Breadcrumb crumbs={crumbs} />
      </div>
    </>
  );
}

/** Shared page opening: breadcrumb, heading, lead copy, actions, wide image. */
export function PageHead({
  eyebrow,
  title,
  lead,
  crumbs,
  actions,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  crumbs: Crumb[];
  actions?: React.ReactNode;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <div className="container page-head">
      {site.url && <JsonLd data={breadcrumbJsonLd(crumbs)} />}
      <Breadcrumb crumbs={crumbs} />
      <div className="page-head-grid">
        <div>
          <p className="eyebrow muted">{eyebrow}</p>
          <h1>{title}</h1>
        </div>
        <div className="page-lead">
          {lead}
          {actions && <div className="page-head-actions">{actions}</div>}
        </div>
      </div>
      {image && (
        <div className="page-media">
          <Img
            src={image}
            alt={imageAlt || ""}
            sizes="(max-width: 1240px) 92vw, 1240px"
            width="1672"
            height="941"
            fetchPriority="high"
          />
        </div>
      )}
    </div>
  );
}

/** Closing conversion band. WhatsApp first, form second. */
export function CtaBand({
  eyebrow = "START A CONVERSATION",
  title,
  text,
  message,
  action,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text: string;
  message?: string;
  /** The WhatsApp button's label; the button's own default if omitted. */
  action?: string;
}) {
  return (
    <section className="band band-linen">
      <div className="container cta-band" data-reveal>
        <div>
          <p className="eyebrow muted">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-actions">
          <WhatsappButton message={message}>{action}</WhatsappButton>
          <a className="text-link" href="/contact/">
            Send a detailed brief <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

/** Infinite ticker. Pure CSS; the list is duplicated so the loop is seamless. */
export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={`${item}-${i}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}

/** Client quotes, presented one at a time on a fixed-height stage. */
export function Voices({
  eyebrow = "IN THEIR WORDS",
  title = "What working together feels like",
  tone = "linen",
}: {
  eyebrow?: string;
  title?: string;
  tone?: "linen" | "ink" | "paper";
}) {
  const band =
    tone === "ink"
      ? "band band-ink voices"
      : tone === "linen"
        ? "band band-linen voices"
        : "band voices";
  return (
    <section className={band}>
      <div className="container" data-reveal>
        <div className="voices-head">
          <p className="eyebrow muted">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <QuoteStage items={testimonials} />
        
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Social links. Two hand-drawn glyphs in the same style as the WhatsApp and
 * phone marks in creative.tsx, so the site still carries no icon font and no
 * icon dependency. The row renders nothing at all when `socials` is empty,
 * which is how a blanked URL removes an icon rather than leaving a dead one.
 * ------------------------------------------------------------------ */
function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.81 3.81 0 0 1-1.38-.9 3.81 3.81 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07Zm0 2.16c-3.14 0-3.51.01-4.75.07-1.15.05-1.77.24-2.18.4-.55.22-.94.47-1.35.88-.41.41-.66.8-.88 1.35-.16.41-.35 1.03-.4 2.18-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1.15.24 1.77.4 2.18.22.55.47.94.88 1.35.41.41.8.66 1.35.88.41.16 1.03.35 2.18.4 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1.15-.05 1.77-.24 2.18-.4.55-.22.94-.47 1.35-.88.41-.41.66-.8.88-1.35.16-.41.35-1.03.4-2.18.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1.15-.24-1.77-.4-2.18a3.64 3.64 0 0 0-.88-1.35 3.64 3.64 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.18-.4-1.24-.06-1.61-.07-4.75-.07Z"
      />
      <path
        fill="currentColor"
        d="M12 7.13a4.87 4.87 0 1 0 0 9.74 4.87 4.87 0 0 0 0-9.74Zm0 8.03a3.16 3.16 0 1 1 0-6.32 3.16 3.16 0 0 1 0 6.32Zm6.2-8.22a1.14 1.14 0 1 1-2.27 0 1.14 1.14 0 0 1 2.27 0Z"
      />
    </svg>
  );
}

function FacebookGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z"
      />
    </svg>
  );
}

/** The footer's social row. Renders nothing when no URL is configured. */
export function SocialRow({ className = "social-row" }: { className?: string }) {
  if (socials.length === 0) return null;
  return (
    <ul className={className}>
      {socials.map((social) => (
        <li key={social.name}>
          <a
            href={social.href}
            aria-label={`Havenly on ${social.name}`}
            target="_blank"
            rel="noopener noreferrer me"
          >
            {social.name === "Instagram" ? <InstagramGlyph /> : <FacebookGlyph />}
          </a>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ *
 * The trust row. A quiet strip of client marks on linen — no carousel, no
 * autoplay, no Swiper. Eight logos fit a static grid at every width the site
 * supports, and a row that does not move is easier to read and costs nothing
 * to render.
 * ------------------------------------------------------------------ */
export function Partners({
  /* The eyebrow does the attributing now that the explanatory paragraph is
     gone. It has to stay: without it the heading reads as a list of Havenly
     Halo's own clients, which these are not. */
  eyebrow = "HALO INTERIORS, DUBAI — SINCE 1996",
  title = "Our Trusted Partners",
}: {
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="band band-linen partners">
      <div className="container" data-reveal>
        <div className="partners-head">
          {/* <p className="eyebrow muted">{eyebrow}</p> */}
          <h2>{title}</h2>
        </div>
      </div>
      {/* The strip runs the full width of the page, outside the container, and
          holds the set twice. Both copies travel one full copy-width to the
          left in the same time: when the first has left the frame the second
          is exactly where the first began, so the restart is invisible and
          there is no seam to land on. The second copy is decoration — the
          first already names every brand — so it is hidden from assistive
          technology rather than read out twice.

          Both copies request the same eight URLs, so the duplicate resolves
          from cache and never pops in behind the animation. */}
      <div className="partner-marquee">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="partner-track"
            aria-label={copy === 0 ? "Brands we have worked alongside" : undefined}
            aria-hidden={copy === 1 || undefined}
          >
            {partners.map((partner) => (
              <li key={partner.name}>
                <Img
                  src={partner.image}
                  sizes="200px"
                  alt={copy === 0 ? partner.name : ""}
                  loading="lazy"
                  decoding="async"
                  width={200}
                  height={111}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
      {/* {partnersAreUnverified && (
        <div className="container">
          <p className="concept-note partners-note">
            Logos from halo.ae, not yet cleared for use here.
          </p>
        </div>
      )} */}
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * The founder's note. A portrait and a short signed piece of first-person
 * copy — the one place on the site where a person, rather than the studio,
 * is speaking.
 * ------------------------------------------------------------------ */
export function FounderNote() {
  return (
    <section className="section container founder">
      <div className="founder-inner" data-reveal>
        <figure className="founder-media">
          <Img
            src={founder.image}
            sizes="(max-width: 900px) 92vw, 42vw"
            alt={founder.imageAlt}
            loading="lazy"
            decoding="async"
            width={1122}
            height={1402}
          />
        </figure>
        <div className="founder-copy">
          <p className="eyebrow muted">A NOTE FROM THE FOUNDER</p>
          {founder.note.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
          <p className="founder-sign">
            <strong>{founderSignature()}</strong>
            <span>{founder.role}</span>
          </p>
        </div>
      </div>
      {/* {founderIsPlaceholder && (
        <p className="concept-note founder-note-flag">
          Placeholder. The portrait is a generated likeness, not a photograph
          of a real person, and the note is written to the studio&rsquo;s voice
          rather than dictated by whoever signs it. A signed note beside a
          synthetic face is the one thing on this site that reads as a claim
          about a person — both must be replaced with the real founder before
          launch. See docs/image-prompts.md.
        </p>
      )} */}
    </section>
  );
}
