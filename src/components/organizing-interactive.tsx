"use client";
import { useState } from "react";
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
