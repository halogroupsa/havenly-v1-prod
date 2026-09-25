"use client";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Arrow,
  CallButton,
  WhatsappButton,
  WhatsappGlyph,
} from "@/components/creative";
import { Img } from "@/components/image";
import {
  concepts,
  conceptFilters,
  dubaiAreas,
  mailtoLink,
  nav,
  site,
  whatsappLink,
} from "@/lib/site";
import { services, serviceHref } from "@/lib/services";
import { rooms, roomHref } from "@/lib/organizing";
import { analyticsEnabled, track } from "@/lib/analytics";

/* Arrow is defined in creative.tsx — the leaf module — so the WhatsApp
   button can use it without importing back from here. Re-exported so the
   pages keep taking it from the one place they take everything else. */
export { Arrow };

/* The submenus hung off top-level nav entries, keyed by the entry's href. */
const menus: Record<
  string,
  { id: string; noun: string; all: string; links: { href: string; label: string }[] }
> = {
  "/services/": {
    id: "nav-services",
    noun: "services",
    all: "All services",
    links: services.map((s) => ({ href: serviceHref(s.slug), label: s.title })),
  },
  "/interior-organizing/": {
    id: "nav-organizing",
    noun: "rooms",
    all: "All rooms",
    links: rooms.map((r) => ({ href: roomHref(r.slug), label: r.title })),
  },
};

export function Header() {
  const [open, setOpen] = useState(false);
  /* The three offers hang off the services entry: a panel under the bar on
     the desktop header, a row that expands in place on the phone. One piece
     of state drives both, so aria-expanded is true exactly when the list is
     on screen however it was opened. */
  const [subOpen, setSubOpen] = useState<string | null>(null);
  const [pinned, setPinned] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const bar = useRef<HTMLElement>(null);
  const pathname = usePathname();

  /* The homepage hero is a full-height photograph and the bar sits on top of
     it with no ground of its own. Everywhere else the bar keeps its usual
     white, because everywhere else it would be sitting on white. */
  const overHero = pathname === "/";

  /* Once the hero has scrolled past, the bar is over ordinary page content
     and has to take its background back — white type on a white section is
     no navigation at all. Rendered transparent and corrected here rather
     than the other way round, so there is no white flash on arrival; the
     no-JS path is handled by the <noscript> block in layout.tsx. */
  useEffect(() => {
    if (!overHero) return;
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const onScroll = () => {
      const height = bar.current?.offsetHeight ?? 0;
      setPinned(window.scrollY > hero.clientHeight - height);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [overHero]);

  useEffect(() => {
    if (!open) {
      setSubOpen(null);
      return;
    }
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    /* The panel covers the viewport, so the page behind it should not
       scroll away underneath. The class is what the floating WhatsApp disc
       reads to stand down — the panel carries its own WhatsApp row. */
    const scrollLock = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("has-menu-open");
    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflow = scrollLock;
      document.body.classList.remove("has-menu-open");
    };
  }, [open]);

  useEffect(() => {
    if (!subOpen) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSubOpen(null);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [subOpen]);

  /* A route change from inside the panel leaves it open over the new page. */
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      ref={bar}
      className={[
        "header",
        overHero ? "is-over-hero" : "",
        pinned ? "is-pinned" : "",
        open ? "is-menu-open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="container nav-inner">
        <a className="brand" href="/" aria-label="Havenly home">
          <span className="brand-mark">
            h<span>h</span>
          </span>
          <span>
            HAVENLY<small>HOME STAGING &amp; STYLING</small>
          </span>
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          <span className="visually-hidden">{open ? "Close menu" : "Menu"}</span>
          <span className="menu-icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
        <nav
          id="main-navigation"
          className={open ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
          onClick={() => {
            setOpen(false);
            setSubOpen(null);
          }}
        >
          {nav.map((item) => {
            const current =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));
            const link = (
              <a
                key={item.href}
                className="nav-link"
                href={item.href}
                aria-current={current ? "page" : undefined}
              >
                {item.label}
              </a>
            );
            /* Services and interior organizing each carry a submenu. */
            const menu = menus[item.href];
            if (!menu) return link;
            const isOpen = subOpen === item.href;
            const setOpenMenu = (next: boolean) =>
              setSubOpen((cur) => (next ? item.href : cur === item.href ? null : cur));
            return (
              <div
                className="nav-group"
                key={item.href}
                /* Pointer-driven only where there is a real pointer: on a
                   touch screen the same events fire on tap, and the tap
                   belongs to the link under the finger. */
                onMouseEnter={() => {
                  if (matchMedia("(hover: hover)").matches) setOpenMenu(true);
                }}
                onMouseLeave={() => {
                  if (matchMedia("(hover: hover)").matches) setOpenMenu(false);
                }}
                /* Keyboard arrives at the parent link first; opening on
                   that focus is what puts the submenu in the tab order
                   behind it. */
                onFocus={() => {
                  if (matchMedia("(hover: hover)").matches) setOpenMenu(true);
                }}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setOpenMenu(false);
                  }
                }}
              >
                <div className="nav-group-row">
                  {link}
                  <button
                    type="button"
                    className="nav-group-toggle"
                    aria-expanded={isOpen}
                    aria-controls={menu.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu(!isOpen);
                    }}
                  >
                    <span className="visually-hidden">
                      {isOpen ? `Hide ${menu.noun}` : `Show ${menu.noun}`}
                    </span>
                    <span className="nav-chevron" aria-hidden="true" />
                  </button>
                </div>
                <div
                  id={menu.id}
                  className={isOpen ? "nav-sub is-open" : "nav-sub"}
                >
                  <div>
                    {menu.links.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        tabIndex={isOpen ? undefined : -1}
                        aria-current={pathname === sub.href ? "page" : undefined}
                      >
                        {sub.label}
                      </a>
                    ))}
                    <a href={item.href} tabIndex={isOpen ? undefined : -1}>
                      {menu.all}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Calling, not WhatsApp: the floating disc already carries the
              chat route on every page, so the bar offers the other one. */}
          <CallButton className="button button-dark nav-cta">
            Call us
          </CallButton>
        </nav>
      </div>
    </header>
  );
}

/* Matches the .is-leaving transition in globals.css — the navigation is
   fired when the fade has finished, not while it is running. */
const EXIT_MS = 240;

/**
 * PageFade — the crossfade between pages.
 *
 * Every link on the site is a plain anchor and every page is its own
 * document, so a click would otherwise blank the old page the instant the
 * new one arrives. The arrival half is pure CSS (main fades up on load, so
 * it works with JavaScript off and is switched off by reduced motion); this
 * handles the departure: the content fades down first and the navigation
 * follows, leaving the header and the paper ground standing still across the
 * swap. The two halves meet on the same background colour, so the join reads
 * as one movement rather than two.
 */
export function PageFade() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let leaving = false;

    /* Coming back through the history cache hands us the document exactly as
       it left — faded out, mid-exit. */
    const restore = () => {
      leaving = false;
      document.body.classList.remove("is-leaving");
    };

    const onClick = (e: MouseEvent) => {
      if (reduced.matches || leaving) return;
      /* Anything but a plain left click is the browser's to handle: a new
         tab, a saved file, a context menu. */
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.target !== "" || link.hasAttribute("download")) return;

      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.protocol !== "http:" && url.protocol !== "https:") return;
      /* A link into the current page is a scroll, not a navigation. */
      if (
        url.pathname === location.pathname &&
        url.search === location.search
      ) {
        return;
      }

      e.preventDefault();
      leaving = true;
      document.body.classList.add("is-leaving");
      window.setTimeout(() => {
        location.href = url.href;
      }, EXIT_MS);
    };

    document.addEventListener("click", onClick);
    window.addEventListener("pageshow", restore);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("pageshow", restore);
    };
  }, []);
  return null;
}

/**
 * Reports clicks on any WhatsApp, phone or email link to the dataLayer as
 * `contact_click`. One delegated listener rather than a handler on every
 * button: the links are spread across the header, hero, footer, service
 * pages and the floating button, and new ones are covered automatically.
 * The enquiry form reports its own `generate_lead` in <Contact>.
 */
export function ContactTracking() {
  useEffect(() => {
    if (!analyticsEnabled) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!(link instanceof HTMLAnchorElement)) return;
      const href = link.href;
      const method = href.startsWith("https://wa.me/")
        ? "whatsapp"
        : href.startsWith("tel:")
          ? "phone"
          : href.startsWith("mailto:")
            ? "email"
            : null;
      if (!method) return;
      const region = link.closest("header, footer, main, [data-track-location]");
      track({
        event: "contact_click",
        contact_method: method,
        link_location:
          region?.getAttribute("data-track-location") ??
          region?.tagName.toLowerCase() ??
          "floating",
      });
    };
    /* Capture phase, so a handler that stops propagation cannot hide it. */
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}

export function Motion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.classList.add("will-reveal");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return null;
}

/* How many cards the phone shows before asking. One card per row there, so
   the full set is a long scroll past everything after it; four is enough to
   read the set as a set and still see what comes next. Desktop lays them out
   in rows and never needs the button. */
const MOBILE_PREVIEW = 4;

export function Spaces({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState("All spaces");
  /* Every card is always rendered — the phone hides the overflow in CSS
     rather than the component dropping it. That keeps one markup for both
     layouts, leaves the whole set in the page for search engines, and means
     nothing has to be measured at render time to decide what to send. */
  const [expanded, setExpanded] = useState(false);
  const shown = useMemo(() => {
    const matched = concepts.filter(
      (c) => filter === "All spaces" || c.type === filter,
    );
    return limit ? matched.slice(0, limit) : matched;
  }, [filter, limit]);

  return (
    <>
      <div
        className="space-filters"
        role="group"
        aria-label="Filter inspiration spaces"
      >
        {conceptFilters.map((item) => (
          <button
            key={item}
            aria-pressed={filter === item}
            onClick={() => {
              setFilter(item);
              /* A new set starts collapsed again — otherwise picking a
                 filter after expanding quietly opens the next one too. */
              setExpanded(false);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div
        id="spaces-grid"
        className={expanded ? "spaces-grid is-expanded" : "spaces-grid"}
      >
        {shown.map((p) => (
          /* The photograph is the card. The only thing set on it is the
             name of the space, on a bar flush to the bottom edge — the type
             is already the filter above, and the location is on the page the
             card opens. */
          <a className="space-card" key={p.slug} href={`/spaces/${p.slug}/`}>
            <Img
              src={p.image}
              sizes="(max-width: 560px) 92vw, (max-width: 900px) 46vw, 31vw"
              alt={p.description}
              width="900"
              height="1050"
              loading="lazy"
            />
            <h3 className="card-caption">{p.title}</h3>
          </a>
        ))}
      </div>
      {/* Rendered whenever the set is long enough for the phone to fold it,
          and hidden in CSS on every width that shows the whole grid — the
          same reason the cards themselves are all in the markup. */}
      {!expanded && shown.length > MOBILE_PREVIEW && (
        <button
          type="button"
          className="spaces-more"
          aria-controls="spaces-grid"
          aria-expanded={false}
          onClick={() => setExpanded(true)}
        >
          Load {shown.length - MOBILE_PREVIEW} more
          {/* Down, not the site's usual ↗: this opens the rest in place
              rather than sending anyone anywhere. */}
          <span aria-hidden="true">↓</span>
        </button>
      )}
    </>
  );
}

/**
 * Enquiry form. The answers are composed into a complete first message and
 * handed straight to the channel the visitor picks — WhatsApp, the studio's
 * primary route, or their own email app. Nothing is posted anywhere; the
 * prepared message is also shown below so it can be copied by hand.
 */
export function Contact({ service }: { service?: string }) {
  const [summary, setSummary] = useState("");
  const [channel, setChannel] = useState<"whatsapp" | "email" | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  /* Which button was pressed. A ref, not state: the click lands in the same
     tick as the submit it triggers, so a state update would not be read
     back in time. */
  const intent = useRef<"whatsapp" | "email">("whatsapp");

  const reset = () => {
    setSummary("");
    setChannel(null);
    setCopied(false);
    setCopyError(false);
  };

  return (
    <form
      className="contact-form"
      onChange={reset}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const message = [
          "Hello Havenly, I'd like to talk about my property.",
          "",
          `Name: ${data.get("name")}`,
          `Location: ${data.get("location")}`,
          `Property: ${data.get("property")}`,
          `Service: ${data.get("service")}`,
          `Timing: ${data.get("timing")}`,
          `Details: ${data.get("details") || "—"}`,
          `Email: ${data.get("email") || "—"}`,
        ].join("\n");
        const via = intent.current;
        setSummary(message);
        setChannel(via);
        setCopied(false);
        setCopyError(false);
        /* The form's own conversion. Reported on submit, not on the
           message being sent: the site cannot see past the hand-off to
           WhatsApp or the mail app. */
        track({
          event: "generate_lead",
          contact_method: via,
          service: String(data.get("service") ?? "") || undefined,
        });
        /* Opened from inside the submit the click started, so the browser
           treats it as user-initiated and lets it through. */
        if (via === "whatsapp") {
          if (site.whatsapp) {
            window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
          }
        } else if (site.email) {
          window.location.href = mailtoLink(message);
        }
      }}
    >
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="Full name"
            maxLength={100}
          />
        </label>
        <label>
          Email address <span className="muted">(optional)</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Property location
          <select name="location" required defaultValue="">
            <option value="" disabled>
              Select area
            </option>
            {dubaiAreas.map((l) => (
              <option key={l}>{l}</option>
            ))}
            <option>Elsewhere in Dubai</option>
          </select>
        </label>
        <label>
          Property type
          <select name="property" defaultValue="Apartment">
            {[
              "Apartment",
              "Villa",
              "Townhouse",
              "Penthouse",
              "Holiday home",
              "Show home",
            ].map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="form-row">
        <label>
          I’m interested in
          <select name="service" defaultValue={service || services[0].title}>
            {services.map((s) => (
              <option key={s.slug}>{s.title}</option>
            ))}
            <option>Interior organizing</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label>
          Ideal timing
          <select name="timing" defaultValue="Within a month">
            {[
              "As soon as possible",
              "Within a month",
              "One to three months",
              "Still planning",
            ].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        A little about your space
        <textarea
          name="details"
          rows={3}
          placeholder="Rooms involved, what is already there, and what you'd like to achieve…"
          maxLength={2000}
        />
      </label>
      <p className="form-note">
        Nothing is sent until you choose to send it — your answers stay in this
        browser and are handed to WhatsApp or your email app for you to review.{" "}
        <a href="/privacy/">Privacy information</a>
      </p>
      <div className="form-actions">
        <button
          className="button button-dark has-glyph"
          type="submit"
          onClick={() => (intent.current = "whatsapp")}
        >
          <span className="glyph" aria-hidden="true">
            <WhatsappGlyph />
          </span>
          Send via WhatsApp <Arrow />
        </button>
        <button
          className="button button-outline"
          type="submit"
          onClick={() => (intent.current = "email")}
        >
          Email us <Arrow />
        </button>
      </div>
      {summary && (
        <div className="enquiry-result" role="status">
          <h3>
            {channel === "email"
              ? "Ready in your email app"
              : "Ready in WhatsApp"}
          </h3>
          <p>
            {channel === "email"
              ? site.email
                ? "Your message is waiting in your email app. Review it there and send it — nothing has left this browser yet."
                : "Email is not connected on this preview build yet. Copy your message below and send it to the studio in the meantime."
              : site.whatsapp
                ? "Your message is waiting in WhatsApp. Review it there and send it — nothing has left this browser yet."
                : "WhatsApp is not connected on this preview build yet. Copy your message below and send it to the studio in the meantime."}
          </p>
          {channel === "email"
            ? site.email && (
                <div className="enquiry-actions">
                  <a className="text-link" href={mailtoLink(summary)}>
                    Open my email app again <Arrow />
                  </a>
                </div>
              )
            : site.whatsapp && (
                <div className="enquiry-actions">
                  <WhatsappButton message={summary}>
                    Open WhatsApp again
                  </WhatsappButton>
                </div>
              )}
          <textarea
            aria-label="Your prepared message"
            readOnly
            value={summary}
            rows={7}
          />
          <button
            type="button"
            className="text-link"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(summary);
                setCopied(true);
              } catch {
                setCopied(false);
                setCopyError(true);
              }
            }}
          >
            {copied ? "Copied to clipboard" : "Copy message"} <Arrow />
          </button>
          {copyError && (
            <p>
              Select the message above and copy it manually. Your browser
              couldn’t access the clipboard.
            </p>
          )}
        </div>
      )}
      <noscript>
        <p className="form-note">
          This form needs JavaScript to prepare your message.{" "}
          <a href={whatsappLink()}>Message the studio on WhatsApp</a> or{" "}
          <a href={mailtoLink()}>email us</a> instead.
        </p>
      </noscript>
    </form>
  );
}
