import { Fragment } from "react";
import { CtaBand } from "@/components/blocks";
import { Parallax } from "@/components/creative";
import { Img } from "@/components/image";
import { Arrow } from "@/components/interactive";
import {
  RoomIndex,
  ZoneMap,
  type Zone,
} from "@/components/organizing-interactive";
import { img, shot } from "@/lib/images";
import {
  ORGANIZING_HREF,
  type Move,
  type RoomPackage,
  moves,
  otherRooms,
  roomHref,
  rooms,
  type Room,
} from "@/lib/organizing";
import { site } from "@/lib/site";
import {
  JsonLd,
  breadcrumbJsonLd,
  businessId,
  faqJsonLd,
  ogImage,
} from "@/lib/seo";

/*
 * The organizing pages are built from these bands rather than from the
 * service-page template. The service pages are read: someone deciding
 * between staging and furnishing wants the detail. An organizing page is
 * looked at — the work is a drawer, a rail, a shelf — so each band here
 * carries a photograph and a caption, and the detail that used to sit in
 * bullet lists either became a picture or moved into the proposal.
 */

type Faq = { question: string; answer: string };
type Crumb = { href?: string; label: string };

/* ------------------------------------------------------------------ *
 * The opening
 * ------------------------------------------------------------------ */

/**
 * Full-bleed photograph, title at its foot — the homepage's composition,
 * so a room page opens like the site rather than like a sub-page. The
 * breadcrumb sits under the picture, where it can be read.
 */
export function OrgHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  crumbs,
  actions,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  crumbs: Crumb[];
  actions: React.ReactNode;
}) {
  return (
    <>
      {site.url && <JsonLd data={breadcrumbJsonLd(crumbs)} />}
      <section className="org-hero" aria-labelledby="page-title">
        <Img
          src={image}
          alt={imageAlt}
          sizes="100vw"
          width="1920"
          height="1080"
          fetchPriority="high"
        />
        <div className="org-hero-shade" aria-hidden="true" />
        <div className="container org-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="page-title">{title}</h1>
          <p>{lead}</p>
          <div className="hero-actions">{actions}</div>
        </div>
      </section>
      <div className="container org-crumb">
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
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * The bands
 * ------------------------------------------------------------------ */

/**
 * Visit, edit, fit, finish — four photographs, four numerals, one line
 * each. This is the whole framework: the consultation, the four steps of
 * the edit, the system and the finish. Stated as five headed lists it ran
 * to twenty-two items; as four pictures it is taken in at a glance.
 *
 * `lines` is the room's own wording for each move, so the four sentences
 * are specific to the kitchen or the wardrobe rather than repeated across
 * seven pages.
 *
 * The head is the site's `.section-heading` — eyebrow and heading left, a
 * short line right — the same one the homepage uses above the services and
 * the concepts, so this band sits at the site's heading size rather than a
 * display size of its own.
 */
export function Moves({
  eyebrow = "THE HAVENLY WAY",
  title = "Four quiet moves",
  aside = (
    <p>
      The same four in every room.
      <br /> Only the contents change.
    </p>
  ),
  lines,
  tone = "paper",
}: {
  eyebrow?: string;
  title?: string;
  aside?: React.ReactNode;
  lines?: string[];
  tone?: "paper" | "linen";
}) {
  return (
    <section
      className={tone === "linen" ? "band band-linen org-band" : "org-band"}
      aria-labelledby="moves-title"
    >
      <div className="container">
        <div className="section-heading org-head" data-reveal>
          <div>
            <p className="eyebrow muted">{eyebrow}</p>
            <h2 id="moves-title">{title}</h2>
          </div>
          {aside}
        </div>
        <ol className="org-moves">
          {moves.map((move: Move, i) => (
            <li key={move.title} data-reveal>
              <figure>
                <Img
                  src={move.image}
                  sizes="(max-width: 560px) 92vw, (max-width: 1100px) 46vw, 23vw"
                  width="900"
                  height="1125"
                  alt={move.alt}
                  loading="lazy"
                />
                <figcaption aria-hidden="true">0{i + 1}</figcaption>
              </figure>
              <h3>{move.title}</h3>
              <p>{lines?.[i] ?? move.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * Four portrait frames of the room as we find it. Real "before"
 * photographs can only come from client projects, so a zone with no `src`
 * renders as an empty, labelled frame — a slot that is visibly waiting,
 * rather than a stock photograph standing in for a client's home.
 */
export function Before({
  room,
  zones,
}: {
  room: string;
  zones: { label: string; src?: string; alt?: string }[];
}) {
  /* Four empty frames are worse than no band at all: they read as a gap in
     the page rather than as a section waiting for its pictures. The zones
     stay in the room's page file, so the band returns the moment the studio
     has photographs to put in it. */
  if (!zones.some((zone) => zone.src)) return null;
  return (
    <section className="container org-band-tight" aria-labelledby="before-title">
      <div className="org-head" data-reveal>
        <p className="eyebrow muted">WHERE IT STARTS</p>
        <h2 id="before-title">Before</h2>
      </div>
      <ul className="org-before" data-reveal>
        {zones.map((zone) => (
          <li key={zone.label}>
            {zone.src ? (
              <Img
                src={zone.src}
                sizes="(max-width: 560px) 46vw, 22vw"
                width="800"
                height="1000"
                alt={zone.alt || `${room} before organizing: ${zone.label}`}
                loading="lazy"
              />
            ) : (
              <span className="org-before-empty" aria-hidden="true" />
            )}
            <span className="org-before-label">
              <span>BEFORE</span>
              {zone.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * The room's questions, on the homepage's FAQ composition — a tall frame in
 * the left column, the collapsed questions in the right.
 *
 * It also has to be here at all: each room page emits FAQPage structured
 * data, and that markup is only honest if the answers are on the page a
 * visitor can read.
 */
export function Questions({
  faqs,
  image,
  imageAlt,
}: {
  faqs: Faq[];
  image: string;
  imageAlt: string;
}) {
  return (
    <section
      className="container org-band-tight faq-section"
      aria-labelledby="questions-title"
    >
      <figure className="faq-image" data-reveal>
        <Img
          src={image}
          sizes="(max-width: 800px) 92vw, 40vw"
          width="1000"
          height="1250"
          alt={imageAlt}
          loading="lazy"
        />
      </figure>
      <div data-reveal>
        <p className="eyebrow muted">GOOD QUESTIONS</p>
        <h2 id="questions-title">Before you book</h2>
        <div className="faqs">
          {faqs.map((faq) => (
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
          <a className="text-link" href="/questions/">
            See all questions <Arrow />
          </a>
          <a className="text-link" href="/contact/">
            Ask us something else <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

/** One photographic tile per room — the hub's grid and the room pager. */
export function RoomTile({ room }: { room: Room }) {
  return (
    <a className="room-tile" href={roomHref(room.slug)} data-reveal>
      <Img
        src={room.image}
        sizes="(max-width: 560px) 46vw, (max-width: 1100px) 46vw, 23vw"
        width="900"
        height="1080"
        alt={room.imageAlt}
        loading="lazy"
      />
      <div className="room-tile-body">
        <h3>{room.title}</h3>
        <p>{room.summary}</p>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------ *
 * The close
 * ------------------------------------------------------------------ */

/** The signature finish, as a full-width band. */
export function SignatureFinish({
  title = "Effortless, refined, complete.",
  text = "Shelves styled, spacing fine-tuned, a last walkthrough together — and a few habits that keep it this way.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <Parallax
      src={img.orgProducts}
      alt="Organized shelving with uniform containers, aligned and evenly spaced"
    >
      <div data-reveal>
        <p className="eyebrow">THE SIGNATURE HAVENLY FINISH</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </Parallax>
  );
}

/* ------------------------------------------------------------------ *
 * The visual room sequence
 * ------------------------------------------------------------------ */

/**
 * What this room becomes — the homepage's intro composition: the eyebrow on
 * its own row, the heading under it, one short paragraph and a link in the
 * column beside it, then a mosaic closing the band.
 *
 * It replaces a band that put two mismatched frames above a 62px display
 * line sitting alone in half a screen of white. The heading here is a plain
 * h2, so it is the same size as "A feeling, in every space" on the homepage.
 */
export function RoomStory({
  line,
  body,
  wide,
  wideAlt,
  detail,
  detailAlt,
}: {
  line: string;
  body: string;
  wide: string;
  wideAlt: string;
  detail: string;
  detailAlt: string;
}) {
  return (
    <section className="section org-room-intro" aria-labelledby="story-title">
      <div className="container">
        <div className="intro" data-reveal>
          <p className="eyebrow muted">THE ROOM, RESET</p>
          <h2 id="story-title">{line}</h2>
          <div className="intro-copy">
            <p>{body}</p>
            <a className="text-link" href="#packages">
              See what a reset covers <Arrow />
            </a>
          </div>
        </div>
      </div>
      {/* Two frames — the room, and a detail of it — unless the room's
          close-up photograph has not been taken yet. `img` falls back to the
          room's wide shot for a detail slot that has no file, and the same
          picture printed twice side by side looks like a mistake rather than
          a pair, so the band drops to one frame until the detail lands. */}
      <div
        className={detail === wide ? "container org-mosaic org-mosaic-solo" : "container org-mosaic"}
        data-reveal
      >
        <figure>
          <Img
            src={wide}
            sizes={detail === wide ? "(max-width: 1240px) 92vw, 1240px" : "(max-width: 900px) 55vw, 44vw"}
            width="1440"
            height="1080"
            alt={wideAlt}
            loading="lazy"
          />
        </figure>
        {detail !== wide && (
          <figure>
            <Img
              src={detail}
              sizes="(max-width: 900px) 42vw, 33vw"
              width="1000"
              height="1250"
              alt={detailAlt}
              loading="lazy"
            />
          </figure>
        )}
      </div>
    </section>
  );
}

/**
 * Sourcing, on the homepage's philosophy composition: a covering photograph
 * on one half, the copy centred on linen on the other, and the three product
 * groups as a quiet ruled list rather than a second heading level.
 */
export function RoomSourcing({
  title = "Made for this space.",
  text = "Nothing is bought before it is measured. Containers are chosen for the shelf they will sit on, and pre-tested for quality, scale and how they sit together.",
  groups,
}: {
  title?: string;
  text?: string;
  groups: { title: string; items: string }[];
}) {
  return (
    <section className="org-sourcing" aria-labelledby="sourcing-title">
      <figure>
        <Img
          src={img.orgProducts}
          sizes="(max-width: 900px) 100vw, 50vw"
          width="1536"
          height="1024"
          alt="Organizing products selected for a calm, cohesive home"
          loading="lazy"
        />
      </figure>
      <div className="org-sourcing-copy" data-reveal>
        <p className="eyebrow muted">MEASURED TO FIT</p>
        <h2 id="sourcing-title">{title}</h2>
        <p>{text}</p>
        <ul className="org-sourcing-list">
          {groups.slice(0, 3).map((group) => (
            <li key={group.title}>
              <strong>{group.title}</strong>
              <span>{group.items}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * StyleRail — the ways one room can be laid out.
 *
 * A pantry is not one thing. It is a butler's room off the kitchen, or three
 * walls of a walk-in, or a tall cupboard of pull-outs, or the space under the
 * stairs. A visitor arrives with one of those in their head and wants to see
 * that one — and a page that shows a single pantry quietly tells six of them
 * that this studio does not do theirs.
 *
 * So the band is a rail rather than a grid: it drifts, it holds still under
 * the cursor, and it carries more frames than fit on the screen, which is the
 * point — the set is meant to feel longer than the page. The mechanism is the
 * homepage partner strip's, verbatim: two copies of the same track, each
 * travelling one copy-width in the same time, so the restart has no seam. The
 * second copy is decoration and is hidden from assistive technology; the
 * first names every style once.
 *
 * Frames alternate tall and short, and sit high and low against the rail, so
 * the row reads as a strip someone laid out rather than a conveyor belt.
 *
 * No JavaScript: the drift, the hover-pause and the fallbacks are all CSS.
 * Where there is no pointer to hover with — a phone — and wherever reduced
 * motion is asked for, the drift is dropped entirely and the rail becomes an
 * ordinary scroll-snap row that you push with a finger or an arrow key.
 * ------------------------------------------------------------------ */
export type RoomStyle = {
  /** Also the file: /images/org-<room>-style-<slug>.webp */
  slug: string;
  name: string;
  /** One short line. What makes this layout its own thing. */
  note: string;
  alt: string;
};

/* Below three real photographs the rail is not a range, it is a repeat, so
   the band leaves itself out rather than padding the set with stand-ins. */
const RAIL_MINIMUM = 3;

export function StyleRail({
  room,
  eyebrow = "FIVE WAYS",
  title,
  styles,
}: {
  /** The room's slug, which names the files. */
  room: string;
  eyebrow?: string;
  title: string;
  styles: RoomStyle[];
}) {
  const live = styles
    .map((style) => ({
      ...style,
      src: shot(`org-${room}-style-${style.slug}`),
    }))
    .filter((style): style is RoomStyle & { src: string } =>
      Boolean(style.src),
    );
  if (live.length < RAIL_MINIMUM) return null;

  return (
    <section className="org-band style-band" aria-labelledby="styles-title">
      <div className="container section-heading org-head" data-reveal>
        <div>
          <p className="eyebrow muted">{eyebrow}</p>
          <h2 id="styles-title">{title}</h2>
        </div>
        <p>
          Yours will not be on this rail.
          <br /> It will be planned like these.
        </p>
      </div>
      <div className="style-rail">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="style-track"
            aria-label={copy === 0 ? `${title} — the layouts` : undefined}
            aria-hidden={copy === 1 || undefined}
          >
            {live.map((style, i) => (
              <li key={style.slug} className={i % 2 ? "is-low" : "is-high"}>
                <figure>
                  <Img
                    src={style.src}
                    sizes="(max-width: 560px) 66vw, (max-width: 900px) 38vw, 25vw"
                    width="1000"
                    height="1250"
                    alt={copy === 0 ? style.alt : ""}
                    loading="lazy"
                  />
                  <figcaption>
                    <strong>{style.name}</strong>
                    <span>{style.note}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

/**
 * The room, annotated. A band around ZoneMap — the heading and the closing
 * note are the page's, the picture and its key are the component's.
 */
export function Zoning({
  title,
  image,
  imageAlt,
  zones,
}: {
  title: string;
  image: string;
  imageAlt: string;
  zones: Zone[];
}) {
  return (
    <section className="container org-band" aria-labelledby="zoning-title">
      <div className="section-heading org-head" data-reveal>
        <div>
          <p className="eyebrow muted">ZONED BY HOW YOU REACH</p>
          <h2 id="zoning-title">{title}</h2>
        </div>
        {/* "Hover" would be a lie on a phone, where this is a tap, and on a
            keyboard, where it is an arrow key. "Choose" is true everywhere. */}
        <p>
          Choose a number
          <br /> to see what sits there.
        </p>
      </div>
      <ZoneMap image={image} imageAlt={imageAlt} zones={zones} />
    </section>
  );
}

/** Three tiers under a standard section heading. One sentence each. */
export function RoomPackages({
  title,
  packages,
}: {
  title: string;
  packages: RoomPackage[];
}) {
  return (
    <section
      id="packages"
      className="container org-band"
      aria-labelledby="room-packages-title"
    >
      <div className="section-heading org-head" data-reveal>
        <div>
          <p className="eyebrow muted">CHOOSE YOUR RESET</p>
          <h2 id="room-packages-title">{title}</h2>
        </div>
        <p>
          Every one begins with the visit
          <br /> and ends with the walkthrough.
        </p>
      </div>
      <div className="org-tiers" data-reveal>
        {packages.map((pkg, i) => (
          <article key={pkg.name}>
            <span>0{i + 1}</span>
            <h3>{pkg.name}</h3>
            <p>{pkg.scope}</p>
            <p className="org-price">
              {pkg.from ? (
                <>
                  Starting from
                  <strong>{pkg.from}</strong>
                </>
              ) : (
                <>Quoted after your visit</>
              )}
            </p>
          </article>
        ))}
      </div>
      <p className="org-note">
        Your fee is confirmed in writing after the visit, before any work
        begins.
      </p>
    </section>
  );
}

/** The other six rooms as one index, then the close. */
export function RoomClose({
  slug,
  space,
  message,
}: {
  slug: string;
  space: string;
  message: string;
}) {
  return (
    <>
      <section className="container org-band-tight" aria-labelledby="next-title">
        <div className="section-heading org-head" data-reveal>
          <div>
            <p className="eyebrow muted">ROOM BY ROOM</p>
            <h2 id="next-title">The same care, next door</h2>
          </div>
          <a className="text-link" href={ORGANIZING_HREF}>
            All rooms <Arrow />
          </a>
        </div>
        <RoomIndex rooms={otherRooms(slug, rooms.length - 1)} />
      </section>

      <CtaBand
        eyebrow="BOOK A VISIT"
        title={
          <>
            Make your {space}
            <br /> a haven.
          </>
        }
        text="Send a few photographs and your community in Dubai. We will arrange the visit and confirm the scope before anything else happens."
        message={message}
        action="Book a visit"
      />
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Structured data
 * ------------------------------------------------------------------ */

export function RoomJsonLd({
  name,
  description,
  path,
  image,
  faqs,
}: {
  name: string;
  description: string;
  path: string;
  image: string;
  faqs: Faq[];
}) {
  return (
    <>
      {site.url && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name,
            serviceType: "Professional home organizing",
            description,
            url: new URL(path, site.url).href,
            image: `${site.url}${ogImage(image)}`,
            provider: { "@id": businessId() },
            areaServed: { "@type": "City", name: "Dubai" },
          }}
        />
      )}
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
