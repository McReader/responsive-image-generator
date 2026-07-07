"use client";

import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import { cookieConsentConfig } from "./cookieConsentConfig";

/**
 * Mounts the cookie consent banner once on the client. Renders nothing
 * itself — the plugin manages its own DOM nodes outside of React.
 */
export function CookieConsentManager() {
  useEffect(() => {
    CookieConsent.run(cookieConsentConfig);
  }, []);

  return null;
}
