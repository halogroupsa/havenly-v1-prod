/**
 * Google Tag Manager and the Google Ads tag.
 *
 * The studio's GTM container is baked in below, but it loads in PRODUCTION
 * BUILDS ONLY. There is no separate switch for that: it hangs off `indexable`
 * from src/lib/site.ts, which is true only when NEXT_PUBLIC_SITE_URL names the
 * live origin. So the production deploy can never forget the tag, and staging
 * and local builds never reach the reports — the same one condition that
 * decides whether a bundle may appear in search.
 *
 * To load GTM from a staging build anyway — GTM Preview, or a separate test
 * container — set NEXT_PUBLIC_GTM_ID. An explicit ID always wins, on any
 * build. Blanking GTM_CONTAINER_ID turns the baked tag off everywhere.
 *
 * The Google Ads tag has no baked-in default and stays OFF until
 * NEXT_PUBLIC_GOOGLE_ADS_ID is set at build time. It is loaded directly with
 * gtag.js, so if the same AW- ID is also added as a Google tag inside the GTM
 * container, every conversion is counted twice. Pick one home for it: leave
 * the variable unset if marketing manages Google Ads from GTM.
 *
 * Adding any other vendor's tag in GTM (Meta, LinkedIn, Hotjar…) also means
 * allowing its domains in the Content-Security-Policy in public/_headers,
 * or the browser will block it.
 */

import { indexable } from "./site";

/**
 * Validate an ID before it is written into an inline <script>.
 *
 * The value ends up inside the page's JavaScript, so anything that is not
 * exactly the expected shape fails the build here with a readable message.
 * The alternatives are worse: a typo that ships and silently tracks nothing,
 * or an arbitrary string that runs in the page.
 */
function parseId(name: string, value: string | undefined, pattern: RegExp, example: string) {
  const raw = (value ?? "").trim().toUpperCase();
  if (!raw) return "";
  if (!pattern.test(raw)) {
    throw new Error(
      `${name} must look like ${example} — "${raw}" does not. Copy it from ` +
        `the Google account exactly, or leave it unset.`,
    );
  }
  return raw;
}

/**
 * The studio's GTM container, used by production builds. Blanking this turns
 * the baked tag off everywhere; NEXT_PUBLIC_GTM_ID overrides it on any build.
 */
export const GTM_CONTAINER_ID = "GTM-5GVBDLTP";

export const analytics = {
  /* An explicit ID wins on any build, so staging can opt in for GTM Preview.
     Otherwise the baked container is a production-build default only. */
  gtmId: parseId(
    "NEXT_PUBLIC_GTM_ID",
    process.env.NEXT_PUBLIC_GTM_ID || (indexable ? GTM_CONTAINER_ID : ""),
    /^GTM-[A-Z0-9]{4,12}$/,
    "GTM-XXXXXXX",
  ),
  adsId: parseId(
    "NEXT_PUBLIC_GOOGLE_ADS_ID",
    process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
    /^AW-\d{6,15}$/,
    "AW-123456789",
  ),
};

/** Whether this build loads any Google tag. Read by the privacy page too. */
export const analyticsEnabled = Boolean(analytics.gtmId || analytics.adsId);

/**
 * Regions where Google's EU user consent policy applies: the EEA, the UK and
 * Switzerland. The site has no consent banner, so visitors from these regions
 * get ad and analytics storage denied by default (Consent Mode v2) — tags then
 * send cookieless pings only. Everyone else gets it granted. Adding a consent
 * platform later means it calls gtag("consent", "update", …) after the choice.
 */
export const CONSENT_DENIED_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH",
];

/**
 * The events the site pushes to the dataLayer. GTM triggers (Custom Event)
 * and Google Ads conversions are set up against these names, so renaming one
 * is a breaking change for the container — update both together.
 */
export type AnalyticsEvent =
  /* The enquiry form was completed and handed to WhatsApp or email. */
  | { event: "generate_lead"; contact_method: "whatsapp" | "email"; service?: string }
  /* Any WhatsApp, phone or email link was clicked. */
  | { event: "contact_click"; contact_method: "whatsapp" | "phone" | "email"; link_location?: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/** Push an event for GTM. A no-op when no tag is configured. */
export function track(payload: AnalyticsEvent) {
  if (!analyticsEnabled || typeof window === "undefined") return;
  (window.dataLayer ??= []).push(payload);
}
