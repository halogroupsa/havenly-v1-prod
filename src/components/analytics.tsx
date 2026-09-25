import { CONSENT_DENIED_REGIONS, analytics, analyticsEnabled } from "@/lib/analytics";

/**
 * The Google tag bootstrap, rendered into <head>.
 *
 * Plain inline scripts rather than next/script: Google asks for GTM as high
 * in <head> as possible, and "afterInteractive" would wait for hydration and
 * miss visitors who bounce before it. Both loaders are async, so neither
 * blocks rendering.
 *
 * Order matters and is the reason this is one block: the dataLayer and the
 * consent defaults have to exist before GTM or gtag.js read them. The site
 * navigates with full page loads (no client-side router), so each page load
 * is one page_view and no route-change tracking is needed.
 *
 * Renders nothing when no ID is configured — see src/lib/analytics.ts.
 */
export function GoogleTagsHead() {
  if (!analyticsEnabled) return null;
  const { gtmId, adsId } = analytics;

  const denied = {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  };
  const granted = Object.fromEntries(
    Object.keys(denied).map((key) => [key, "granted"]),
  );

  /* IDs are validated in src/lib/analytics.ts; JSON.stringify is the second
     guard, so nothing reaches the script except as a quoted string literal. */
  const bootstrap = [
    "window.dataLayer=window.dataLayer||[];",
    "function gtag(){dataLayer.push(arguments);}",
    /* The region-specific default wins for those regions; the second, general
       default applies everywhere else. */
    `gtag("consent","default",${JSON.stringify({ ...denied, region: CONSENT_DENIED_REGIONS })});`,
    `gtag("consent","default",${JSON.stringify(granted)});`,
    /* Strip ad click identifiers from requests wherever ad_storage is denied. */
    'gtag("set","ads_data_redaction",true);',
    gtmId &&
      `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});` +
        `var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";` +
        `j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);` +
        `})(window,document,"script","dataLayer",${JSON.stringify(gtmId)});`,
    adsId && `gtag("js",new Date());gtag("config",${JSON.stringify(adsId)});`,
  ]
    .filter(Boolean)
    .join("");

  return (
    <>
      <script id="google-tags" dangerouslySetInnerHTML={{ __html: bootstrap }} />
      {adsId && (
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(adsId)}`}
        />
      )}
    </>
  );
}

/** GTM's no-JavaScript fallback, placed first inside <body>. */
export function GoogleTagsNoscript() {
  if (!analytics.gtmId) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(analytics.gtmId)}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
