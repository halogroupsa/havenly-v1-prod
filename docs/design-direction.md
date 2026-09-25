# Havenly design direction

Audience: UAE homeowners, property agents and developers preparing homes for viewings, and residents furnishing a new home.
Primary job: explain the offering and make it easy to start a property-specific enquiry.

## References

- https://mhyhomes.com/ — service category reference: staging, consultation and furnishing. Original copy used throughout; no imported claims or testimonials.
- https://thedesignhousedubai.com/ — inspected live: Assistant headings, system sans-serif body, white backgrounds, charcoal typography, modest 28–32px section headings. Fonts downloaded from Google Fonts with OFL license.
- ../dp-v3-stag — architecture reference: Next.js App Router, TypeScript and output: export. This project is independent; no secrets, analytics or business data copied.

## Tokens

Chalk #ffffff; linen #f5f4f0; sand #e9e5de; charcoal #292a27; stone #66665e; sage #777b6b.
Assistant variable font for headings and wordmark; native system sans-serif for copy, labels and controls. Desktop hero capped at 52px, section headings at 36px. No oversized editorial serif type.

## Information architecture

One page per intent, so nothing important is buried in a homepage scroll:

- `/` — overview and entry points
- `/services/` — the three offers compared; `/services/<slug>/` for each in depth
- `/spaces/` — filterable concept gallery; `/spaces/<slug>/` for each concept
- `/about/` — approach, principles, materials, coverage
- `/contact/` — WhatsApp first, full brief form second
- `/privacy/`

Every inner page shares one opening (`PageHead`: breadcrumb, eyebrow, heading, lead, actions, wide
image) and one close (`CtaBand`: WhatsApp plus a link to the brief form). Service pages carry a
sticky section index. That repetition is deliberate — it is what makes eight templates read as one
site.

## Contact

WhatsApp is the primary contact route, matching how UAE property enquiries actually start. It appears
as a floating button (charcoal, not WhatsApp green — the palette is not negotiable, the glyph carries
the recognition), a header button, a CTA on every page, and as the send target of the enquiry form,
which composes a complete first message rather than posting to a backend. The number is a build-time
environment variable; while it is unset every control falls back to `/contact/`.

## Components beyond the base grid

- `Rail` — scroll-snapped row with paging buttons; native scrolling on touch, so it degrades to a
  plain scroller without JavaScript.
- `Parallax` — a 7% vertical drift on a full-width image band, rAF-throttled, disabled under reduced
  motion. The frame is oversized by the same factor so no edge is ever exposed.
- `BeforeAfter` — comparison wipe driven by a real `<input type="range">`, so pointer, touch,
  keyboard and screen-reader support come for free.
- `OnThisPage` — IntersectionObserver section index, sticky on desktop, a horizontal tab row on
  mobile.
- `Marquee` — CSS-only ticker, paused on hover, `aria-hidden` because it repeats content available
  elsewhere.
- `Voices` — testimonial rail. Ships with placeholder quotes and a visible note; see honesty below.

## Layout

A full-width interior photograph leads into an airy introduction, service triptych, filterable concept gallery, material story, four-step process, UAE location band, FAQs and enquiry form.
Signature: restrained interior photography connected to four tactile material swatches, giving the styling direction a physical reference.

[ compact nav enquiry ]
[ interior photograph + small, clear hero copy ]
[ introduction supporting explanation ]
[ service service service ]
[ filterable interior concepts ]
[ material photograph story + palette ]
[ step step step step ]
[ UAE service area band ]
[ FAQs expandable answers ]
[ contact introduction project brief form ]

Mobile: single-column service and space cards, two-column process, collapsible navigation, large
controls, native select menus. Horizontal rails are used only for client quotes — never for content a
visitor needs, which always stacks.

## Motion

One-time hero image settle; short copy entrance; IntersectionObserver-driven section reveals; gentle image hover zoom; expanded FAQ plus rotation. Reduced motion disables all animation and smooth scrolling. Content remains visible with JavaScript disabled.

## Honesty / launch configuration

All interior imagery is generated and labelled as concepts. No fabricated client projects, results,
pricing, response times or contact numbers.

Testimonials are a deliberate exception worth stating clearly: the layout needs quotes to be designed
honestly, so `src/lib/testimonials.ts` ships written placeholders that demonstrate the intended
length and tone. They are flagged by `testimonialsArePlaceholder`, and while that flag is true every
testimonial section renders a visible note telling the reader the copy is placeholder. Replace the
quotes with approved client words and set the flag to false.

Business contact email, WhatsApp number and canonical domain remain configuration values. Without email, the brief can be copied; with email it can be reviewed and sent via the visitor's email application. No submission success is claimed.
