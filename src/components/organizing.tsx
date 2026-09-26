import {
  FaqPanel,
  Features,
  FilmStrip,
  PhotoStory,
  Sourcing,
  type Feature,
} from "@/components/bands";
import { CtaBand } from "@/components/blocks";
import { Parallax } from "@/components/creative";
import { Img } from "@/components/image";
import { Arrow } from "@/components/interactive";
import {
  RoomIndex,
  StyleRailSurface,
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
  businessId,
  faqJsonLd,
  ogImage,
} from "@/lib/seo";

/*
 * The organizing pages are built from bands rather than from stacked prose:
 * the work is a drawer, a rail, a shelf, so each band carries a photograph
 * and a caption, and the detail that used to sit in bullet lists either
 * became a picture or moved into the proposal.
 *
 * The compositions themselves now live in components/bands.tsx, because the
 * service pages read from the same vocabulary. What stays here is this
 * trade's wording — the room's eyebrow, the room's heading, the room's
 * accordion — wrapped around them, plus the bands that only a room has.
 */

type Faq = { question: string; answer: string };

/* ------------------------------------------------------------------ *
 * The opening
 * ------------------------------------------------------------------ */

/**
 * The organizing pages' opening is now the site's opening: every top-level
 * page uses the same full-bleed composition. Kept under its old name so the
 * seven room pages read the same as before.
 */
export { PageHero as OrgHero } from "@/components/blocks";

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
    <FilmStrip
      id="moves-title"
      eyebrow={eyebrow}
      title={title}
      aside={aside}
      tone={tone}
      steps={moves.map((move: Move, i) => ({
        image: move.image,
        alt: move.alt,
        title: move.title,
        text: lines?.[i] ?? move.text,
      }))}
    />
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

/** One matched room concept, shown before and after the organizing system. */
export function BeforeIllustration({ room, slug }: { room: string; slug: string }) {
  return (
    <section className="org-comparison org-band-tight" aria-labelledby="before-example-title">
      <div className="container section-heading org-head" data-reveal>
        <div>
          <p className="eyebrow muted">ORGANIZING CONCEPT</p>
          <h2 id="before-example-title">A room, thoughtfully reworked.</h2>
        </div>
        <p>Measured storage, considered zones and a finish that belongs in the home.</p>
      </div>
      <div className="container org-comparison-grid" data-reveal>
        {(["before", "after"] as const).map((state) => (
          <figure key={state}>
            <Img
              src={`/images/org-${slug}-transformation-concept.webp`}
              sizes="(max-width: 800px) 46vw, 44vw"
              width="1536"
              height="1024"
              alt={`${state === "before" ? "Before" : "After"} view of an illustrative ${room} organizing concept`}
              loading="lazy"
            />
            <figcaption>{state === "before" ? "BEFORE" : "AFTER"}</figcaption>
          </figure>
        ))}
      </div>
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
    <FaqPanel
      eyebrow="GOOD QUESTIONS"
      title="Before you book"
      name="room-faq"
      faqs={faqs}
      image={image}
      imageAlt={imageAlt}
    />
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
  /* `img` falls back to the room's wide shot for a detail slot with no file
     of its own, and PhotoStory drops to a single frame when the two match. */
  return (
    <PhotoStory
      eyebrow="THE ROOM, RESET"
      line={line}
      body={body}
      cta="See what a reset covers"
      href="#packages"
      wide={wide}
      wideAlt={wideAlt}
      detail={detail}
      detailAlt={detailAlt}
    />
  );
}

/**
 * A short, room-specific proof of how a system works. Unlike the style rail,
 * these are close functional views: the pull-out, the drawer, the storage a
 * child can use. They add evidence without asking a visitor to infer the
 * useful part from a room-wide photograph.
 *
 * The band also performs what it describes. Photograph and copy meet with
 * nothing between them, and the copy starts tucked toward the picture and
 * settles out as the band is scrolled into view — a drawer, opening. The
 * whole of that is in the stylesheet, twice over: where the browser can
 * scrub an animation against the scroll position the drawer opens under the
 * visitor's hand, and everywhere else the same movement is played once off
 * the reveal observer the rest of the site already uses. Either way it ends
 * open and stays open, so nothing here is behind an interaction — the rule
 * the zone map and the room index keep too.
 *
 * `focus` is the one thing a page may need to say about its photograph. The
 * frame is landscape and these renders are portrait, so the frame keeps the
 * middle of the picture unless the page names a better part to keep.
 */
export type StorageFeature = Feature;

export function StorageFeatures({
  id,
  eyebrow = "THE DETAIL THAT HELPS",
  title,
  items,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  items: StorageFeature[];
}) {
  return <Features id={id} eyebrow={eyebrow} title={title} items={items} />;
}

/**
 * Sourcing, on the homepage's philosophy composition: a covering photograph
 * on one half, the copy centred on linen on the other, and the three product
 * groups as a quiet ruled list rather than a second heading level.
 */
export function RoomSourcing({
  title = "Made for this space.",
  text = "Nothing is bought before it is measured. Containers are chosen for the shelf they will sit on, and pre-tested for quality, scale and how they sit together.",
  image,
  imageAlt,
  groups,
}: {
  title?: string;
  text?: string;
  image: string;
  imageAlt: string;
  groups: { title: string; items: string }[];
}) {
  return (
    <Sourcing
      eyebrow="MEASURED TO FIT"
      title={title}
      text={text}
      image={image}
      imageAlt={imageAlt}
      groups={groups}
    />
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
 * travelling one copy-width in the same time, so the restart has no seam.
 * The second copy is decoration and is hidden from assistive technology;
 * the first names every style once.
 *
 * Frames alternate tall and short, and sit high and low against the rail, so
 * the row reads as a strip someone laid out rather than a conveyor belt.
 *
 * The drift, the hover-pause and the fallbacks are all CSS. Where there is
 * no pointer to hover with — a phone — and wherever reduced motion is asked
 * for, the drift is dropped entirely and the rail becomes an ordinary
 * scroll-snap row that you push with a finger or an arrow key. On a
 * trackpad or a mouse StyleRailSurface adds the same push, and the rail is
 * complete without it.
 * ------------------------------------------------------------------ */
export type RoomStyle = {
  /** Usually names the file: /images/org-<room>-style-<slug>.webp */
  slug: string;
  name: string;
  /** One short line. What makes this layout its own thing. */
  note: string;
  alt: string;
  /** An explicitly selected photograph, when a room needs a precise art
   * direction rather than the conventional filename lookup. */
  image?: string;
};

/* Below three real photographs the rail is not a range, it is a repeat, so
   the band leaves itself out rather than padding the set with stand-ins. */
const RAIL_MINIMUM = 3;

export function StyleRail({
  room,
  eyebrow = "MANY WAYS",
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
      src: style.image ?? shot(`org-${room}-style-${style.slug}`),
    }))
    .filter((style): style is RoomStyle & { src: string } =>
      Boolean(style.src),
    );
  if (live.length < RAIL_MINIMUM) return null;

  /* How many times a copy repeats the room's styles, which two things
     decide. High and low alternate by position, so a copy holding an odd
     number of frames stands two highs side by side where it meets the next
     copy — the count has to be even. And a copy narrower than the screen
     cannot cover the frame on its own, which is the second copy's whole
     job. Both are free to fix: it is the same set of photographs either way. */
  let repeats = Math.max(1, Math.ceil(8 / live.length));
  if ((repeats * live.length) % 2) repeats += 1;
  const frames = Array.from({ length: repeats }, () => live).flat();

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
      <StyleRailSurface>
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="style-track"
            aria-label={copy === 0 ? `${title} — the layouts` : undefined}
            aria-hidden={copy !== 0 || undefined}
          >
            {frames.map((style, i) => {
              /* The first pass through the styles is the one that speaks. */
              const spoken = copy === 0 && i < live.length;
              return (
                <li
                  key={`${style.slug}-${i}`}
                  className={i % 2 ? "is-low" : "is-high"}
                  aria-hidden={!spoken || undefined}
                >
                  <figure>
                    <Img
                      src={style.src}
                      sizes="(max-width: 560px) 66vw, (max-width: 900px) 38vw, 25vw"
                      width="1000"
                      height="1250"
                      alt={spoken ? style.alt : ""}
                      loading="lazy"
                    />
                    <figcaption>
                      <strong>{style.name}</strong>
                      <span>{style.note}</span>
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        ))}
      </StyleRailSurface>
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
