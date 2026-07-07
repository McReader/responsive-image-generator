/**
 * Wiring between the cookie consent banner and Google's Consent Mode v2.
 * Consent Mode is the mechanism Google Analytics, Google Ads, and AdSense
 * read to decide whether they're allowed to use cookies/storage for a given
 * visitor. See https://developers.google.com/tag-platform/security/guides/consent.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export type ConsentSignal = "granted" | "denied";

export type ConsentModeState = {
  ad_storage: ConsentSignal;
  ad_user_data: ConsentSignal;
  ad_personalization: ConsentSignal;
  analytics_storage: ConsentSignal;
  functionality_storage: ConsentSignal;
  personalization_storage: ConsentSignal;
};

const DENIED_STATE: ConsentModeState = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "denied",
  personalization_storage: "denied",
};

/**
 * Inline bootstrap script. Must run with the `beforeInteractive` strategy so
 * the "denied by default" signal reaches Google's tags before they execute,
 * even before the cookie consent banner itself has loaded.
 */
export const GTAG_CONSENT_BOOTSTRAP_SCRIPT = `
window.dataLayer = window.dataLayer || [];
function gtag(){ window.dataLayer.push(arguments); }
window.gtag = gtag;
gtag('consent', 'default', ${JSON.stringify({ ...DENIED_STATE, wait_for_update: 500 })});
`;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function updateConsentMode(partial: Partial<ConsentModeState>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("consent", "update", partial);
}

/**
 * Maps the categories accepted in the cookie banner to Google's Consent
 * Mode v2 signals. Add an `ad_storage`/`ad_user_data`/`ad_personalization`
 * mapping here if a "marketing" category (e.g. for AdSense or Google Ads) is
 * ever added to the banner.
 */
export function applyBannerCategoriesToConsentMode(acceptedCategories: string[]) {
  updateConsentMode({
    analytics_storage: acceptedCategories.includes("analytics") ? "granted" : "denied",
  });
}
