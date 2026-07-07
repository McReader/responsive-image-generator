"use client";

import * as CookieConsent from "vanilla-cookieconsent";

type CookieSettingsButtonProps = {
  className?: string;
};

export function CookieSettingsButton({ className }: CookieSettingsButtonProps) {
  return (
    <button
      type="button"
      onClick={() => CookieConsent.showPreferences()}
      className={className}
    >
      Cookie settings
    </button>
  );
}
