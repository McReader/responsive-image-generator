import type * as CookieConsent from "vanilla-cookieconsent";
import { applyBannerCategoriesToConsentMode } from "@/lib/analytics/consentMode";

function syncConsentMode(cookie: { categories: string[] }) {
  applyBannerCategoriesToConsentMode(cookie.categories);
}

export const cookieConsentConfig: CookieConsent.CookieConsentConfig = {
  mode: "opt-in",
  autoClearCookies: true,
  hideFromBots: true,
  disablePageInteraction: false,
  guiOptions: {
    consentModal: {
      layout: "bar inline",
      position: "bottom",
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: "box",
      position: "right",
      equalWeightButtons: true,
    },
  },
  categories: {
    necessary: {
      readOnly: true,
      enabled: true,
    },
    analytics: {
      autoClear: {
        cookies: [{ name: /^_ga/ }, { name: "_gid" }],
      },
    },
  },
  onFirstConsent: ({ cookie }) => syncConsentMode(cookie),
  onConsent: ({ cookie }) => syncConsentMode(cookie),
  onChange: ({ cookie }) => syncConsentMode(cookie),
  language: {
    default: "en",
    translations: {
      en: {
        consentModal: {
          title: "Cookies, kept to a minimum",
          description:
            "We only use Google Analytics to see how this site is used, and it stays off until you say yes. Manage or withdraw your choice anytime from \u201cCookie settings\u201d in the footer.",
          acceptAllBtn: "Accept",
          acceptNecessaryBtn: "Reject",
          showPreferencesBtn: "Manage preferences",
          footer: '<a href="/privacy">Privacy Policy</a>',
        },
        preferencesModal: {
          title: "Cookie preferences",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Save preferences",
          closeIconLabel: "Close",
          serviceCounterLabel: "Service|Services",
          sections: [
            {
              title: "Strictly necessary",
              description: "Required for the site to run. There's nothing to opt out of here.",
              linkedCategory: "necessary",
            },
            {
              title: "Analytics",
              description:
                "Google Analytics, used to understand traffic and which tools are useful. No analytics cookies are set unless you accept this category.",
              linkedCategory: "analytics",
            },
            {
              title: "More information",
              description:
                'See our <a href="/privacy#detailed-processing-information">Privacy Policy</a> for details on what Google Analytics collects and how to opt out at the source.',
            },
          ],
        },
      },
    },
  },
};
