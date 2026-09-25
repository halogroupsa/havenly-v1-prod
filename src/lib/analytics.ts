/**
 * Google Tag Manager and the Google Ads tag.
 *
 * Both are OFF unless their ID is set at build time, so a clean checkout, a
 * local build and staging load no third-party script at all. Set the IDs only
 * in the production build's environment (the Cloudflare dashboard, alongside
 * NEXT_PUBLIC_SITE_URL) so staging traffic never reaches the ad account.
 *
 * The Google Ads tag is loaded directly with gtag.js. If the same AW- ID is
 * also added as a Google tag inside the GTM container, every conversion is
 * counted twice. Pick one home for it: leave NEXT_PUBLIC_GOOGLE_ADS_ID unset
 * if marketing manages Google Ads from GTM.
 *
 * Adding any other vendor's tag in GTM (Meta, LinkedIn, Hotjar…) also means
 * allowing its domains in the Content-Security-Policy in public/_headers,
 * or the browser will block it.
 */

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
        `the Google account exactly, or leave it unset to load no tag.`,
    );
  }
  return raw;
}

export const analytics = {
  gtmId: parseId(
    "NEXT_PUBLIC_GTM_ID",
    process.env.NEXT_PUBLIC_GTM_ID,
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
