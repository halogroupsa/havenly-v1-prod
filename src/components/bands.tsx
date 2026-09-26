import { Img } from "@/components/image";
import { Arrow } from "@/components/interactive";

/*
 * Image-led bands.
 *
 * These began on the organizing pages, where the rule was: a band carries a
 * photograph and at most a line under it, type sits at two sizes only, and
 * nothing is a bullet list. The service pages were the opposite — a sticky
 * index beside six stacked prose sections, twenty-two list items among them —
 * and they now read from the same vocabulary, so the site has one way of
 * explaining work rather than two.
 *
 * Everything here is content-agnostic. The organizing components in
 * components/organizing.tsx are thin wrappers that fix the room-page wording;
 * the service pages call these directly. The CSS classes still carry their
 * `org-` prefix because the compositions were written there and are shared,
 * not copied.
 */

export type Faq = { question: string; answer: string };

/* ------------------------------------------------------------------ *
 * PhotoStory — the opening statement, then a two-frame mosaic.
 * ------------------------------------------------------------------ */

/**
 * The homepage's intro composition: eyebrow, heading, one or two short
 * paragraphs and a link in the column beside it, closed by a wide frame and a
 * detail of it.
 *
 * A detail equal to the wide shot means the close-up has not been taken yet —
 * the same picture printed twice looks like a mistake rather than a pair — so
 * the band drops to a single frame until it lands.
 */
export function PhotoStory({
  id = "story-title",
  eyebrow,
  line,
  body,
  cta,
  href,
  wide,
  wideAlt,
  detail,
  detailAlt,
}: {
  id?: string;
  eyebrow: string;
  line: string;
  body: string | string[];
  cta: string;
  href: string;
  wide: string;
  wideAlt: string;
  detail: string;
  detailAlt: string;
}) {
  const solo = detail === wide;
  const paragraphs = Array.isArray(body) ? body : [body];
  return (
    <section className="section org-room-intro" aria-labelledby={id}>
      <div className="container">
        <div className="intro" data-reveal>
          <p className="eyebrow muted">{eyebrow}</p>
          <h2 id={id}>{line}</h2>
          <div className="intro-copy">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <a className="text-link" href={href}>
              {cta} <Arrow />
            </a>
          </div>
        </div>
      </div>
      <div
        className={solo ? "container org-mosaic org-mosaic-solo" : "container org-mosaic"}
        data-reveal
      >
        <figure>
          <Img
            src={wide}
            sizes={solo ? "(max-width: 1240px) 92vw, 1240px" : "(max-width: 900px) 55vw, 44vw"}
            width="1440"
            height="1080"
            alt={wideAlt}
            loading="lazy"
          />
        </figure>
        {!solo && (
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

/* ------------------------------------------------------------------ *
 * PhotoCards — a short set, one photograph each.
 * ------------------------------------------------------------------ */

export type PhotoCard = {
  image: string;
  alt: string;
  /** The small capitalised line above the name. */
  label?: string;
  title: string;
  text: string;
};

/**
 * Three or four portrait frames with a caption under each. This is what a
 * `.feature-list` of three headed paragraphs becomes when the thing being
 * described is a room: the difference between vacant staging and occupied
 * staging is visible in a second and takes a sentence to write.
 */
export function PhotoCards({
  id,
  eyebrow,
  title,
  aside,
  cards,
  tone = "paper",
}: {
  id: string;
  eyebrow: string;
  title: string;
  aside?: React.ReactNode;
  cards: PhotoCard[];
  tone?: "paper" | "linen";
}) {
  return (
    <section
      className={tone === "linen" ? "band band-linen org-band" : "org-band"}
      aria-labelledby={id}
    >
      <div className="container">
        <div className="section-heading org-head" data-reveal>
          <div>
            <p className="eyebrow muted">{eyebrow}</p>
            <h2 id={id}>{title}</h2>
          </div>
          {aside}
        </div>
        <ul className="photo-cards">
          {cards.map((card) => (
            <li key={card.title} data-reveal>
              <figure>
                <Img
                  src={card.image}
                  sizes="(max-width: 560px) 92vw, (max-width: 1100px) 46vw, 31vw"
                  width="900"
                  height="1125"
                  alt={card.alt}
                  loading="lazy"
                />
              </figure>
              {card.label && <p className="eyebrow muted">{card.label}</p>}
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * FilmStrip — a sequence, one photograph and one numeral per step.
 * ------------------------------------------------------------------ */

export type FilmStep = {
  image: string;
  alt: string;
  title: string;
  text: string;
};

/**
 * Four frames in a row, each carrying a large pale numeral. A process is the
 * one thing on these pages that is genuinely a sequence, so it is the one
 * thing allowed to look like a list — as pictures, in order.
 */
export function FilmStrip({
  id,
  eyebrow,
  title,
  aside,
  steps,
  tone = "paper",
}: {
  id: string;
  eyebrow: string;
  title: string;
  aside?: React.ReactNode;
  steps: FilmStep[];
  tone?: "paper" | "linen";
}) {
  return (
    <section
      className={tone === "linen" ? "band band-linen org-band" : "org-band"}
      aria-labelledby={id}
    >
      <div className="container">
        <div className="section-heading org-head" data-reveal>
          <div>
            <p className="eyebrow muted">{eyebrow}</p>
            <h2 id={id}>{title}</h2>
          </div>
          {aside}
        </div>
        <ol className="org-moves">
          {steps.map((step, i) => (
            <li key={step.title} data-reveal>
              <figure>
                <Img
                  src={step.image}
                  sizes="(max-width: 560px) 92vw, (max-width: 1100px) 46vw, 23vw"
                  width="900"
                  height="1125"
                  alt={step.alt}
                  loading="lazy"
                />
                <figcaption aria-hidden="true">0{i + 1}</figcaption>
              </figure>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Features — a close, practical proof, photograph flush to its copy.
 * ------------------------------------------------------------------ */

export type Feature = {
  image: string;
  alt: string;
  title: string;
  text: string;
  /** `object-position` for the landscape frame, e.g. `"center 62%"`. */
  focus?: string;
};

/**
 * The band performs what it describes. Photograph and copy meet with nothing
 * between them, and the copy starts tucked toward the picture and settles out
 * as the band is scrolled into view — a drawer, opening. The whole of that is
 * in the stylesheet, twice over: where the browser can scrub an animation
 * against the scroll position it opens under the visitor's hand, and
 * everywhere else the same movement plays once off the reveal observer the
 * rest of the site already uses. Either way it ends open and stays open, so
 * nothing here is behind an interaction.
 */
export function Features({
  id,
  eyebrow,
  title,
  aside,
  items,
}: {
  id: string;
  eyebrow: string;
  title: string;
  aside?: React.ReactNode;
  items: Feature[];
}) {
  return (
    <section className="org-features" aria-labelledby={id}>
      <div className="container">
        <div className="section-heading org-head" data-reveal>
          <div>
            <p className="eyebrow muted">{eyebrow}</p>
            <h2 id={id}>{title}</h2>
          </div>
          {aside}
        </div>
        <div className="org-pulls">
          {items.map((item, i) => (
            /* Every second one opens from the other side, so a band of two or
               three does not read as one row printed twice. */
            <article
              className={i % 2 === 1 ? "org-pull is-flipped" : "org-pull"}
              key={item.title}
              data-reveal
            >
              <figure>
                <Img
                  src={item.image}
                  sizes="(max-width: 900px) 92vw, 54vw"
                  width="1122"
                  height="1402"
                  alt={item.alt}
                  loading="lazy"
                  style={item.focus ? { objectPosition: item.focus } : undefined}
                />
              </figure>
              <div className="org-pull-copy">
                <div className="org-pull-body" data-reveal>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Sourcing — a covering photograph on one half, copy on linen on the other.
 * ------------------------------------------------------------------ */

/**
 * The homepage's philosophy composition. What a scope covers is three ruled
 * pairs here rather than a six-item checklist: the same ground, at the size a
 * caption should be, beside a picture of the work it buys.
 */
export function Sourcing({
  id = "sourcing-title",
  anchor,
  eyebrow,
  title,
  text,
  image,
  imageAlt,
  groups,
}: {
  id?: string;
  /** Set when the band is a link target, so the jump lands on its top edge
   *  rather than on a heading centred in the copy half. */
  anchor?: string;
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  groups: { title: string; items: string }[];
}) {
  return (
    <section className="org-sourcing" id={anchor} aria-labelledby={id}>
      <figure>
        <Img
          src={image}
          sizes="(max-width: 900px) 100vw, 50vw"
          width="1536"
          height="1024"
          alt={imageAlt}
          loading="lazy"
        />
      </figure>
      <div className="org-sourcing-copy" data-reveal>
        <p className="eyebrow muted">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
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
 * FaqPanel — a tall frame beside the collapsed questions.
 * ------------------------------------------------------------------ */

/**
 * The questions have to be on the page a visitor can read: both the service
 * and the room pages emit FAQPage structured data, and that markup is only
 * honest if the answers are here.
 *
 * `name` groups the `<details>` so only one answer is open at a time, and has
 * to differ per page template or two accordions would close each other.
 */
export function FaqPanel({
  id = "questions-title",
  eyebrow,
  title,
  name,
  faqs,
  image,
  imageAlt,
  note,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  name: string;
  faqs: Faq[];
  image: string;
  imageAlt: string;
  note?: React.ReactNode;
}) {
  return (
    <section className="container org-band-tight faq-section" aria-labelledby={id}>
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
        <p className="eyebrow muted">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
        <div className="faqs">
          {faqs.map((faq) => (
            <details key={faq.question} name={name}>
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
        {note}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * TilePair — where to go next, as photographs.
 * ------------------------------------------------------------------ */

/**
 * Two or three photographic links, on the room index's tile. It replaces the
 * `.pager` of bare headings the service pages closed with: someone who has
 * read to the bottom and found this is not their service is being shown the
 * other one, and a picture of it is the fastest way to say so.
 */
export function TilePair({
  id,
  eyebrow,
  title,
  aside,
  tiles,
  tone = "linen",
}: {
  id: string;
  eyebrow: string;
  title: string;
  aside?: React.ReactNode;
  tiles: { href: string; image: string; alt: string; title: string; text: string }[];
  tone?: "paper" | "linen";
}) {
  return (
    <section
      className={tone === "linen" ? "band band-linen org-band" : "org-band"}
      aria-labelledby={id}
    >
      <div className="container">
        <div className="section-heading org-head" data-reveal>
          <div>
            <p className="eyebrow muted">{eyebrow}</p>
            <h2 id={id}>{title}</h2>
          </div>
          {aside}
        </div>
        <div className="tile-pair">
          {tiles.map((tile) => (
            <a className="room-tile" href={tile.href} key={tile.href} data-reveal>
              <Img
                src={tile.image}
                sizes="(max-width: 700px) 92vw, 46vw"
                width="900"
                height="1080"
                alt={tile.alt}
                loading="lazy"
              />
              <div className="room-tile-body">
                <h3>{tile.title}</h3>
                <p>{tile.text}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
