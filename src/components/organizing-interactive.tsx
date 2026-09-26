"use client";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Arrow } from "@/components/creative";
import { Img } from "@/components/image";
import { type Room, roomHref } from "@/lib/organizing";

/*
 * The two interactive pieces the organizing pages have of their own. Both
 * follow the same rule as the rest of the site's creative components: the
 * server renders something complete, and JavaScript only makes it better.
 * Turn scripting off and ZoneMap is a photograph with a numbered key beside
 * it, and RoomIndex is a list of links with a picture at the top — no
 * information is behind an interaction.
 */

/* ------------------------------------------------------------------ *
 * ZoneMap — the room, annotated.
 *
 * Zoning is the part of this work that is hardest to put in a sentence and
 * easiest to point at: why the everyday things sit at eye level, why the
 * heavy things sit low, why the thing you use twice a year is allowed to be
 * awkward to reach. So the page points at it. One photograph, three numbered
 * marks on it, and a key beside them.
 *
 * The marks are `aria-hidden` and unfocusable: they are a second control for
 * the same three zones, and a screen reader hearing each zone twice would be
 * worse served than one hearing it once. The key beside the picture is the
 * real control, and it is a list of buttons — reachable by keyboard, and
 * carrying its own text whether or not it is the active one.
 *
 * All seven room photographs are 16:9, and the frame is too, so the marks sit
 * where they were placed at every width rather than drifting with a crop.
 * ------------------------------------------------------------------ */
export type Zone = {
  label: string;
  note: string;
  /** Position of the mark, as a percentage of the photograph. */
  x: number;
  y: number;
};

export function ZoneMap({
  image,
  imageAlt,
  zones,
}: {
  image: string;
  imageAlt: string;
  zones: Zone[];
}) {
  const [active, setActive] = useState(0);
  const hold = (i: number) => ({
    onMouseEnter: () => setActive(i),
    onFocus: () => setActive(i),
    onClick: () => setActive(i),
  });

  return (
    <div className="zonemap">
      <figure className="zonemap-frame" data-reveal>
        <Img
          src={image}
          sizes="(max-width: 900px) 92vw, 58vw"
          width="1440"
          height="810"
          alt={imageAlt}
          loading="lazy"
        />
        {zones.map((zone, i) => (
          <button
            key={zone.label}
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            className={
              i === active ? "zonemap-pin is-active" : "zonemap-pin"
            }
            style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
            {...hold(i)}
          >
            <span>{i + 1}</span>
          </button>
        ))}
      </figure>
      <ol className="zonemap-key" data-reveal>
        {zones.map((zone, i) => (
          <li key={zone.label} className={i === active ? "is-active" : undefined}>
            <button type="button" {...hold(i)}>
              <span className="zonemap-n" aria-hidden="true">
                {i + 1}
              </span>
              <strong>{zone.label}</strong>
              <span>{zone.note}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * RoomIndex — the other rooms, as one photograph and a list of names.
 *
 * This replaced a two-room pager, which showed a visitor two of the six
 * rooms they had not chosen and made them go back to the hub for the rest.
 * Here all six are named at once and the photograph follows the name under
 * the cursor, so the band costs one picture's worth of height rather than
 * six.
 *
 * The stage is `aria-hidden` for the same reason ProcessSteps' is: six
 * photographs are in the DOM and one is visible, so six alt texts would
 * describe five pictures nobody is looking at. Each row carries its own
 * thumbnail for narrow screens, where there is no second column to put a
 * stage in and no hover to drive it.
 * ------------------------------------------------------------------ */
export function RoomIndex({ rooms }: { rooms: Room[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="room-index">
      <div className="room-index-stage" aria-hidden="true">
        {rooms.map((room, i) => (
          <Img
            key={room.slug}
            src={room.image}
            sizes="(max-width: 900px) 1px, 42vw"
            width="1440"
            height="810"
            alt=""
            loading="lazy"
            className={i === active ? "is-active" : undefined}
          />
        ))}
      </div>
      <ol className="room-index-list">
        {rooms.map((room, i) => (
          <li key={room.slug} className={i === active ? "is-active" : undefined}>
            <a
              href={roomHref(room.slug)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="room-index-thumb" aria-hidden="true">
                <Img
                  src={room.image}
                  sizes="(max-width: 900px) 74px, 1px"
                  width="1440"
                  height="810"
                  alt=""
                  loading="lazy"
                />
              </span>
              <span className="room-index-body">
                <strong>{room.title}</strong>
                <span>{room.summary}</span>
              </span>
              <Arrow />
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * StyleRailSurface — the style rail, lent to a hand and taken back.
 *
 * The rail drifts on its own, and the drift is CSS: two copies of one
 * track, translated. Nothing about a transform tells the browser there is
 * anything to scroll, so a rail that only drifts cannot be pushed — and a
 * row of photographs moving past you is a row you want to push.
 *
 * So the rail is handed over for as long as someone is pushing it, and
 * taken back the moment they stop. Both handovers are the same trick: the
 * copies are identical, so a copy-width of scroll and a copy-width of
 * drift are the same picture. Going in, the distance the track has
 * drifted becomes the scroll position. Coming out, the scroll position
 * becomes the drift's phase — a negative animation-delay — so the rail
 * carries on from where the hand left it rather than from the top.
 * Nothing moves at either moment.
 *
 * The cursor stopping the rail is the stylesheet's doing, not this
 * component's, and stays true whether or not the JavaScript ran. Where
 * the stylesheet has already made the rail a hand-driven row — a touch
 * screen, or reduced motion — there is no drift to trade with, and this
 * keeps out of the way entirely.
 * ------------------------------------------------------------------ */

export function StyleRailSurface({ children }: { children: ReactNode }) {
  const rail = useRef<HTMLDivElement>(null);
  /* Which hands the rail is in, as a ref as well as state: a handover
     scheduled while the rail was in hand must not run against a rail that
     has since been given back, and a timeout reads the ref rather than the
     render it was born in. The state is only there to write the class. */
  const inHand = useRef(false);
  /* Seconds, read off the stylesheet rather than repeated from it. */
  const cycle = useRef(64);
  /* A sideways flick arrives before there is anything to scroll, so the
     first one is carried into the scroll position by hand. */
  const nudge = useRef(0);
  const drag = useRef<{ from: number; at: number } | null>(null);
  const settle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [manual, setManual] = useState(false);

  useEffect(
    () => () => {
      if (settle.current) clearTimeout(settle.current);
    },
    [],
  );

  const hold = () => {
    if (settle.current) clearTimeout(settle.current);
    settle.current = null;
  };

  const take = () => {
    const el = rail.current;
    if (inHand.current || !el) return;
    /* Where the stylesheet has already dropped the drift, the rail is a
       scroll container of its own and there is nothing to hand over. */
    const handDriven = "(hover: none), (prefers-reduced-motion: reduce)";
    if (window.matchMedia(handDriven).matches) return;

    let at = nudge.current;
    nudge.current = 0;
    const track = el.firstElementChild;
    if (track) {
      const now = getComputedStyle(track);
      const seconds = Number.parseFloat(now.animationDuration);
      if (seconds > 0) cycle.current = seconds;
      if (now.transform && now.transform !== "none") {
        try {
          at += Math.max(0, -new DOMMatrixReadOnly(now.transform).m41);
        } catch {
          /* An engine that will not parse its own matrix: start at the top. */
        }
      }
    }
    inHand.current = true;
    /* Flushed, because until the class lands there is nothing to scroll. */
    flushSync(() => setManual(true));
    el.scrollLeft = Math.max(0, at);
  };

  const give = () => {
    const el = rail.current;
    if (!inHand.current || !el || drag.current) return;
    hold();
    const track = el.firstElementChild as HTMLElement | null;
    const copy = track?.offsetWidth ?? 0;
    /* One copy of scroll and one copy of drift are the same picture, so
       only the remainder decides where the drift picks up. */
    const phase = copy > 0 ? (el.scrollLeft % copy) / copy : 0;
    el.style.setProperty("--rail-phase", `${-phase * cycle.current}s`);
    inHand.current = false;
    flushSync(() => setManual(false));
    el.scrollLeft = 0;
  };

  return (
    <div
      ref={rail}
      className={manual ? "style-rail is-manual" : "style-rail"}
      onDragStart={(e) => e.preventDefault()}
      onPointerDown={(e) => {
        /* A finger already has a scroll container under it on a touch
           screen; it only needs the drift out of the way. */
        if (e.pointerType === "touch") {
          take();
          return;
        }
        if (e.button !== 0) return;
        hold();
        /* Where the rail stands as this drag starts. If the drift still
           has it, take() works that out on the first move worth the name. */
        drag.current = {
          from: e.clientX,
          at: inHand.current ? (rail.current?.scrollLeft ?? 0) : 0,
        };
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d) return;
        const by = e.clientX - d.from;
        if (!inHand.current) {
          /* Below this a drag is a click that wobbled. */
          if (Math.abs(by) < 8) return;
          take();
          if (!inHand.current) return;
          /* take() has just put the rail where the drift had reached, so
             the rest of this drag is measured from there. */
          d.at = rail.current?.scrollLeft ?? 0;
          d.from = e.clientX;
          e.currentTarget.setPointerCapture(e.pointerId);
          return;
        }
        if (rail.current) rail.current.scrollLeft = d.at - by;
      }}
      onPointerUp={() => {
        drag.current = null;
        give();
      }}
      onPointerCancel={() => {
        drag.current = null;
        give();
      }}
      onPointerLeave={() => {
        if (!drag.current) give();
      }}
      onWheel={(e) => {
        /* Sideways intent only — a vertical wheel belongs to the page. */
        if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
        if (!inHand.current) {
          nudge.current += e.deltaX;
          take();
          return;
        }
        /* Native scrolling has the rail from here. A flick has no end
           event, so the rail is given back once the flicking stops. */
        hold();
        settle.current = setTimeout(give, 420);
      }}
    >
      {children}
    </div>
  );
}
