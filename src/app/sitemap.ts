import type { MetadataRoute } from "next";
import { concepts, indexable, site } from "@/lib/site";
import { serviceHref, services } from "@/lib/services";
import { ORGANIZING_HREF, roomHref, rooms } from "@/lib/organizing";

/**
 * The XML sitemap, exported to out/sitemap.xml.
 *
 * Only the pages that do not come from a data file are listed by hand; the
 * service and concept pages are generated from the same arrays their routes
 * use in generateStaticParams, so adding a concept adds its URL here with no
 * second edit. scripts/robots.mjs then checks this list against the pages
 * actually exported and fails the build if a page is missing from it, which is
 * what catches a new hand-written route that was not added below.
 *
 * Every path keeps its trailing slash: next.config.mjs sets
 * `trailingSlash: true`, so /about is a redirect and /about/ is the page. A
 * sitemap should list the URL that answers with 200, not the one that bounces.
 *
 * No `lastModified`. The only date available at build time is the build
 * itself, and stamping that on every entry claims the whole site changed on
 * every deploy — a crawler that checks a few and finds them unchanged learns
 * to disregard the field. Better to omit it than to fill it with something
 * untrue. Populate it from real per-page publication dates if they ever exist.
 * `changeFrequency` and `priority` are left out for the same reason: Google
 * ignores both.
 */
/* `output: "export"` treats a metadata route as a route handler, which it will
   not export unless it is declared static. Without this the build fails with
   "export const dynamic = force-static ... not configured on route
   /sitemap.xml". Nothing here reads a request, so it is static by nature. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  /* A hidden build has no business advertising its URLs. Returning nothing
     leaves an empty sitemap, which scripts/robots.mjs deletes from out/. */
  if (!indexable) return [];

  const paths = [
    "/",
    "/services/",
    ...services.map((service) => serviceHref(service.slug)),
    ORGANIZING_HREF,
    ...rooms.map((room) => roomHref(room.slug)),
    "/spaces/",
    ...concepts.map((concept) => `/spaces/${concept.slug}/`),
    "/about/",
    "/contact/",
    "/questions/",
    "/privacy/",
  ];

  return paths.map((path) => ({ url: new URL(path, site.url).href }));
}
