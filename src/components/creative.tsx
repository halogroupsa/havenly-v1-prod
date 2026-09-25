"use client";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Img, srcAtWidth } from "@/components/image";
import { site, telLink, waDefaultMessage, whatsappLink } from "@/lib/site";

/** The site's one link arrow. See `.arrow` in globals.css. */
export function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      ↗
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * QuoteStage — one client quote at a time, on a fixed-height stage.
 * All quotes stay in the DOM stacked in a single grid cell, so the block
 * never resizes as you page through it and the content is still there
 * without JavaScript (the noscript rules in layout.tsx unstack them).
 * ------------------------------------------------------------------ */
export function QuoteStage({
  items,
}: {
  items: { quote: string; attribution: string; context: string }[];
}) {
  const [index, setIndex] = useState(0);
  const total = items.length;
  const go = (n: number) => setIndex((n + total) % total);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="voices-stage">
      <span className="voices-mark" aria-hidden="true">
        &ldquo;
      </span>
      <div className="voices-body" aria-live="polite">
        {items.map((item, n) => (
          <figure
            key={item.quote}
            className={n === index ? "voices-item is-active" : "voices-item"}
          >
            <blockquote>{item.quote}</blockquote>
            <figcaption>
              <strong>{item.attribution}</strong>
              <span>{item.context}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="voices-controls">
        <p className="voices-count">
          <strong>{pad(index + 1)}</strong>
          <span aria-hidden="true">/</span>
          {pad(total)}
        </p>
        <ol className="voices-track">
          {items.map((item, n) => (
            <li key={item.quote}>
              <button
                type="button"
                onClick={() => setIndex(n)}
                aria-current={n === index ? "true" : undefined}
              >
                <span className="visually-hidden">
                  Show quote {n + 1} of {total}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <div className="voices-arrows">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous quote"
          >
            <span aria-hidden="true">&#8592;</span>
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next quote"
          >
            <span aria-hidden="true">&#8594;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Parallax — a full-width image band whose picture is pinned to the
 * viewport: the band scrolls over a still image, revealing a different
 * part of it. The pinning is left to the browser (a fixed background
 * attachment, composited in step with the scroll) rather than driven
 * from a scroll handler, which always trails the scroll by a frame and
 * makes the picture judder. The band is decorative, so the image rides
 * on the frame with the alt text carried by role/aria-label.
 * ------------------------------------------------------------------ */
export function Parallax({
  src,
  alt,
  children,
  className = "",
}: {
  src: string;
  alt: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`parallax ${className}`.trim()}>
      <div
        className="parallax-frame"
        role="img"
        aria-label={alt}
        style={
          {
            "--band-sm": `url("${srcAtWidth(src, 768)}")`,
            "--band-md": `url("${srcAtWidth(src, 1200)}")`,
            "--band-lg": `url("${src}")`,
          } as CSSProperties
        }
      />
      {children ? <div className="parallax-copy">{children}</div> : null}
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * BeforeAfter — a comparison wipe driven by a real range input, so it
 * works with a pointer, a finger, a keyboard and a screen reader.
 * ------------------------------------------------------------------ */
export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(52);
  const id = useId();
  return (
    <figure className="compare" style={{ ["--pos" as string]: `${pos}%` }}>
      <Img
        className="compare-base"
        src={after}
        sizes="(max-width: 1240px) 92vw, 1240px"
        alt={afterAlt}
        width="1672"
        height="941"
        loading="lazy"
      />
      <div className="compare-clip">
        <Img
          src={before}
          sizes="(max-width: 1240px) 92vw, 1240px"
          alt={beforeAlt}
          width="1672"
          height="941"
          loading="lazy"
        />
      </div>
      <span className="compare-tag compare-tag-before">{beforeLabel}</span>
      <span className="compare-tag compare-tag-after">{afterLabel}</span>
      <span className="compare-line" aria-hidden="true">
        <span className="compare-grip">↔</span>
      </span>
      <label className="compare-label" htmlFor={id}>
        Reveal the styled room
      </label>
      <input
        id={id}
        className="compare-range"
        type="range"
        min={0}
        max={100}
        step={1}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare the room before and after styling"
      />
    </figure>
  );
}

/* How long each hero photograph holds before the next one fades up. Long
   enough that the change is noticed rather than watched. */
const HERO_HOLD = 6200;

/* ------------------------------------------------------------------ *
 * HeroFrames — the hero photograph, slowly cross-dissolving between four
 * rooms, with the headline and buttons sitting over it unchanged.
 *
 * Only the first frame is in the server's HTML. It is the page's largest
 * paint, so the other three are mounted after `load` rather than competing
 * with it for bandwidth — which also means a visitor without JavaScript
 * gets exactly the single hero image this page had before, and the dots,
 * being controls that cannot work without JavaScript, are never rendered
 * for them at all.
 *
 * Frame one keeps the alt text and the rest are empty. A screen reader
 * should hear the hero described once; four descriptions of which only one
 * is on screen would be worse than none.
 *
 * Under `prefers-reduced-motion` the rotation never starts — `ready` stays
 * false, so there is one still photograph and no controls.
 * ------------------------------------------------------------------ */
export function HeroFrames({
  frames,
}: {
  frames: {
    image: string;
    width: number;
    height: number;
    alt: string;
    label: string;
  }[];
}) {
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (document.readyState === "complete") {
      setReady(true);
      return;
    }
    const start = () => setReady(true);
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  /* A timeout rather than an interval, re-armed on every change: clicking a
     dot then gives that frame a full hold instead of whatever was left of
     the previous one. */
  useEffect(() => {
    if (!ready) return;
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % frames.length),
      HERO_HOLD,
    );
    return () => window.clearTimeout(id);
  }, [ready, active, frames.length]);

  return (
    <>
      <div className="hero-frames">
        {(ready ? frames : frames.slice(0, 1)).map((frame, i) => (
          <Img
            key={frame.image}
            className={i === active ? "hero-image is-active" : "hero-image"}
            src={frame.image}
            sizes="100vw"
            width={frame.width}
            height={frame.height}
            alt={i === 0 ? frame.alt : ""}
            {...(i === 0
              ? { fetchPriority: "high" as const }
              : { loading: "lazy" as const })}
          />
        ))}
      </div>
      {ready && (
        <div className="hero-dots">
          {frames.map((frame, i) => (
            <button
              key={frame.image}
              type="button"
              className={i === active ? "is-active" : undefined}
              aria-label={`Show ${frame.label}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ *
 * ProcessSteps — the four steps on the left, one sticky photograph on
 * the right that changes as each step scrolls past the middle of the
 * viewport. Every frame stays in the DOM and is cross-faded, so nothing
 * is fetched mid-scroll and the swap costs a composited opacity only.
 *
 * The stage is aria-hidden: all four images are present at once and only
 * one is visible, so reading four alt texts in a row would describe a
 * picture nobody is looking at. The steps beside it carry the meaning.
 *
 * At narrow widths there is no second column to pin to, so the stage is
 * dropped entirely and each step carries its own photograph beneath its copy.
 * Only one of the two sets is ever displayed, and `display: none` plus lazy
 * loading keeps the other set from being fetched.
 *
 * Without JavaScript the first step and the first frame are the ones the
 * server renders, and `is-live` is never added — so the unread steps are
 * not dimmed and the section reads as a plain illustrated list.
 * ------------------------------------------------------------------ */
export function ProcessSteps({
  steps,
}: {
  steps: { title: string; text: string; image: string }[];
}) {
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(false);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const els = items.current.filter((el): el is HTMLLIElement => Boolean(el));
    if (!els.length) return;
    setLive(true);
    const observer = new IntersectionObserver(
      (entries) => {
        /* The topmost step currently crossing the middle band wins, so
           scrolling back up returns through the same sequence. */
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (visible)
          setActive(Number(visible.target.getAttribute("data-step")));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [steps]);

  return (
    <div className={live ? "process is-live" : "process"}>
      <div className="process-stage" aria-hidden="true">
        <div className="process-stage-inner">
          {steps.map((step, i) => (
            <Img
              key={step.image}
              src={step.image}
              sizes="(max-width: 800px) 92vw, 46vw"
              alt=""
              width="1440"
              height="900"
              loading="lazy"
              className={i === active ? "is-active" : undefined}
            />
          ))}
        </div>
      </div>
      <ol className="process-steps">
        {steps.map((step, i) => (
          <li
            key={step.title}
            data-step={i}
            ref={(el) => {
              items.current[i] = el;
            }}
            className={i === active ? "is-active" : undefined}
          >
            <span className="step-number">0{i + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            {/* The step's own photograph. Hidden on wide screens, where the
                sticky stage carries all four; shown once the columns collapse,
                because a pinned picture with the steps sliding under it has
                nowhere to pin to in a single column. */}
            <div className="process-step-image" aria-hidden="true">
              <Img
                src={step.image}
                sizes="92vw"
                alt=""
                width="1440"
                height="900"
                loading="lazy"
              />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * WhatsApp — the studio's primary contact route.
 * ------------------------------------------------------------------ */
export function WhatsappGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.15.83.84-3.07-.2-.32a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23Zm-3.2 4.3c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.79-.19-.46-.39-.4-.54-.41h-.47Z"
      />
    </svg>
  );
}

export function WhatsappButton({
  message = waDefaultMessage,
  children,
  className = "button button-dark",
}: {
  message?: string;
  children?: ReactNode;
  className?: string;
}) {
  const external = Boolean(site.whatsapp);
  return (
    <a
      className={`${className} has-glyph`}
      href={whatsappLink(message)}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <span className="glyph" aria-hidden="true">
        <WhatsappGlyph />
      </span>
      {children ?? "Message us on WhatsApp"}
      <Arrow />
    </a>
  );
}

/* ------------------------------------------------------------------ *
 * Call us — the same studio line, for anyone who would rather speak than
 * type. Built on the same has-glyph button as WhatsappButton so the two are
 * interchangeable wherever a contact control goes.
 * ------------------------------------------------------------------ */
export function PhoneGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z"
      />
    </svg>
  );
}

export function CallButton({
  children,
  className = "button button-dark",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a className={`${className} has-glyph`} href={telLink()}>
      <span className="glyph" aria-hidden="true">
        <PhoneGlyph />
      </span>
      {children ?? "Call us"}
      <Arrow />
    </a>
  );
}

/**
 * Floating WhatsApp button. Present on every page at every scroll position —
 * it is the studio's primary contact route, so it is never gated behind a
 * scroll threshold. Styling matches the sibling DecoPaint site: a WhatsApp
 * green disc with the brand glyph, two expanding rings and a periodic rock.
 */
export function WhatsappFab() {
  const external = Boolean(site.whatsapp);
  return (
    <a
      className="wa-fab"
      href={whatsappLink(waDefaultMessage)}
      aria-label={
        external ? "Message Havenly on WhatsApp" : "Contact Havenly"
      }
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="wa-glyph" aria-hidden="true">
        <WhatsappGlyph />
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ *
 * OnThisPage — sticky section index for the long service pages.
 * ------------------------------------------------------------------ */
export function OnThisPage({
  sections,
}: {
  sections: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="page-index" aria-label="On this page">
      <p className="eyebrow muted">ON THIS PAGE</p>
      <ul>
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
