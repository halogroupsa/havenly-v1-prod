import { TilePair } from "@/components/bands";
import { Parallax } from "@/components/creative";
import { Img } from "@/components/image";
import { Arrow } from "@/components/interactive";
import { ZoneMap, type Zone } from "@/components/organizing-interactive";
import { ready, shot } from "@/lib/images";
import { conceptNeighbours } from "@/lib/site";

/*
 * The bands a styling concept page is built from.
 *
 * A concept page used to be a heading, two paragraphs and three numbered
 * sentences — "three decisions" described in words beside no picture of
 * them. A concept is a photograph of a room, so the page now points at the
 * photograph instead: the three decisions are marked on it, the materials
 * are shown as macros, and the close-ups are what a visitor would lean in
 * to look at.
 *
 * Each page is its own file with its own words (app/spaces/<slug>/page.tsx);
 * these only fix the compositions, which are the organizing pages' and the
 * service pages', not new ones.
 *
 * The grounds alternate down the page — paper, linen, photograph, paper,
 * linen — and the only band that can drop out is the linen one, which always
 * sits between paper and a photograph. So a page missing its close-ups and
 * swatches still never stands two paper bands against each other. That is
 * also why the full-bleed band always has a picture: it falls back to an
 * existing one rather than leaving itself out.
 */

/* ------------------------------------------------------------------ *
 * The three decisions, marked on the room
 * ------------------------------------------------------------------ */

/**
 * The room's photograph with three numbered marks and a key beside it — the
 * organizing pages' zone map. The frame is 16:9, so `image` should be a 16:9
 * photograph or the marks drift with the crop.
 */
export function SpaceDecisions({
  title,
  aside,
  image,
  imageAlt,
  zones,
}: {
  title: string;
  aside: React.ReactNode;
  image: string;
  imageAlt: string;
  zones: Zone[];
}) {
  return (
    <section className="container org-band" aria-labelledby="decisions-title">
      <div className="section-heading org-head" data-reveal>
        <div>
          <p className="eyebrow muted">THREE DECISIONS</p>
          <h2 id="decisions-title">{title}</h2>
        </div>
        {aside}
      </div>
      <ZoneMap image={image} imageAlt={imageAlt} zones={zones} />
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Up close — three details and the palette
 * ------------------------------------------------------------------ */

export type CloseUp = {
  /** Names the file: /images/space-<page>-close-<slug>.webp */
  slug: string;
  alt: string;
  title: string;
  text: string;
};

export type Material = {
  /** Names the file: /images/swatch-<slug>.webp, shared by every page. */
  slug: string;
  name: string;
  alt: string;
};

/* Three close-ups or none: two portraits and a gap read as a missing
   picture. The palette can stand at three of four. */
const CLOSE_UPS = 3;
const PALETTE_MINIMUM = 3;

/**
 * Three portrait close-ups, then the room's materials as square macros with
 * one word each — the homepage's swatches, at the size of a band rather than
 * a footnote.
 *
 * Both sets ask `shot()`, not `ready()`: a close-up standing in with the
 * room's wide photograph is not a close-up. So the band shows what exists,
 * and leaves itself out when neither set does. The swatches are one library
 * for every concept page, so a jute macro made for the terrace also turns up
 * on the townhouse.
 */
export function SpaceDetails({
  page,
  title,
  aside,
  closeUps,
  palette,
}: {
  /** The concept's slug, which names the close-up files. */
  page: string;
  title: string;
  aside?: React.ReactNode;
  closeUps: CloseUp[];
  palette: Material[];
}) {
  const shots = closeUps
    .map((item) => ({ ...item, src: shot(`space-${page}-close-${item.slug}`) }))
    .filter((item): item is CloseUp & { src: string } => Boolean(item.src));
  const swatches = palette
    .map((material) => ({ ...material, src: shot(`swatch-${material.slug}`) }))
    .filter((material): material is Material & { src: string } =>
      Boolean(material.src),
    );
  const showShots = shots.length >= CLOSE_UPS;
  const showPalette = swatches.length >= PALETTE_MINIMUM;
  if (!showShots && !showPalette) return null;

  const swatchList = (
    <ul
      className="space-palette"
      aria-label="The materials in this room"
      /* Three swatches fill the row as three, not as four with a gap. */
      style={{ "--swatches": swatches.length } as React.CSSProperties}
    >
      {swatches.map((material) => (
        <li key={material.slug} data-reveal>
          <figure>
            <Img
              src={material.src}
              sizes="(max-width: 560px) 44vw, 23vw"
              width="600"
              height="600"
              alt={material.alt}
              loading="lazy"
            />
          </figure>
          <span>{material.name}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="band band-linen org-band" aria-labelledby="details-title">
      <div className="container">
        <div className="section-heading org-head" data-reveal>
          <div>
            <p className="eyebrow muted">
              {showShots ? "UP CLOSE" : "THE PALETTE"}
            </p>
            <h2 id="details-title">{title}</h2>
          </div>
          {aside}
        </div>
        {showShots && (
          <ul className="photo-cards">
            {shots.slice(0, CLOSE_UPS).map((item) => (
              <li key={item.slug} data-reveal>
                <figure>
                  <Img
                    src={item.src}
                    sizes="(max-width: 900px) 92vw, 31vw"
                    width="900"
                    height="1125"
                    alt={item.alt}
                    loading="lazy"
                  />
                </figure>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        )}
        {showShots && showPalette ? (
          <div className="space-palette-row">
            <p className="eyebrow muted">THE PALETTE</p>
            {swatchList}
          </div>
        ) : (
          showPalette && swatchList
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * The room from further back
 * ------------------------------------------------------------------ */

/**
 * One full-bleed photograph and one sentence over it. `image` is the page's
 * own wide angle once it exists; until then `fallback` — an existing
 * photograph of the same kind of room — keeps the band, and with it the
 * alternation of grounds described at the top of this file.
 */
export function SpaceWide({
  page,
  fallback,
  alt,
  eyebrow,
  line,
  text,
}: {
  page: string;
  fallback: string;
  alt: string;
  eyebrow: string;
  line: string;
  text?: string;
}) {
  return (
    <Parallax src={ready(`space-${page}-wide`, fallback)} alt={alt}>
      <div data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{line}</h2>
        {text && <p>{text}</p>}
      </div>
    </Parallax>
  );
}

/* ------------------------------------------------------------------ *
 * Keep looking
 * ------------------------------------------------------------------ */

/**
 * The previous and next concepts as two photographs — the service pages'
 * closing pair — in place of the `.pager` of two bare headings. On paper,
 * because the closing CtaBand is linen.
 */
export function SpaceNext({ page }: { page: string }) {
  const { prev, next } = conceptNeighbours(page);
  const tiles = [prev, next]
    .filter((concept) => concept !== undefined)
    .map((concept) => ({
      href: `/spaces/${concept.slug}/`,
      image: concept.image,
      alt: concept.description,
      title: concept.title,
      text: `${concept.type} · ${concept.location}`,
    }));
  return (
    <TilePair
      id="next-title"
      eyebrow="KEEP LOOKING"
      title="Two more rooms"
      aside={
        <a className="text-link" href="/spaces/">
          All spaces <Arrow />
        </a>
      }
      tone="paper"
      tiles={tiles}
    />
  );
}
