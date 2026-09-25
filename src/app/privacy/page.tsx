import type { Metadata } from "next";
import { Arrow } from "@/components/interactive";
import { pageMetadata } from "@/lib/seo";
import { analyticsEnabled } from "@/lib/analytics";
export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: "How the Havenly website handles your enquiry details.",
  path: "/privacy/",
});
export default function Privacy() {
  return (
    <main id="main" className="container prose">
      <p className="eyebrow muted">HAVENLY</p>
      <h1>Your privacy</h1>
      <p>
        This website lets you explore our services and prepare a project
        enquiry.
      </p>
      <h2>Your enquiry</h2>
      <p>
        Information you enter in the enquiry form stays in the current browser
        page. Preparing a brief does not send it to us, save it to a database or
        subscribe you to a mailing list. Refreshing or leaving the page clears
        the form state.
      </p>
      <p>
        If you choose to copy the brief, it is placed on your device’s
        clipboard. If an email contact is configured, choosing “Open email”
        passes the brief to your chosen email application. You can review the
        message there before sending it.
      </p>
      <h2>Cookies and analytics</h2>
      {/* Follows the build: the tags load only when their IDs are set, so
          this has to say whichever is true of the bundle it ships in. */}
      {analyticsEnabled ? (
        <>
          <p>
            We use Google Tag Manager and Google Ads to understand how visitors
            find and use the site and to measure our advertising — for example,
            whether an ad led to an enquiry. These Google services may set
            cookies and collect information such as pages viewed, the link or
            ad you arrived from, and your browser and device type. We do not
            send the contents of your enquiry to Google.
          </p>
          <p>
            Visitors in the European Economic Area, the United Kingdom and
            Switzerland have advertising and analytics cookies switched off by
            default. You can also manage ad personalisation in your{" "}
            <a
              className="text-link"
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google ad settings
            </a>{" "}
            or block cookies in your browser. Fonts and images are hosted with
            the website. The hosting provider may process standard access logs,
            such as IP address, browser information and requested pages, to
            serve and secure the site.
          </p>
        </>
      ) : (
        <p>
          This site does not install analytics, advertising trackers or
          non-essential cookies. Fonts and images are hosted with the website.
          The hosting provider may process standard access logs, such as IP
          address, browser information and requested pages, to serve and secure
          the site.
        </p>
      )}
      <h2>Concept imagery</h2>
      <p>
        The interior images on this website are AI-generated styling concepts.
        They are not records of clients or completed projects.
      </p>
      <a href="/#contact" className="text-link">
        Back to your enquiry <Arrow />
      </a>
    </main>
  );
}
