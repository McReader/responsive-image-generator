import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CookieConsentManager } from "@/components/CookieConsent";
import { GA_MEASUREMENT_ID, GTAG_CONSENT_BOOTSTRAP_SCRIPT } from "@/lib/analytics/consentMode";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Responsive Image Generator",
  description:
    "Generate responsive image variants in your browser with WebAssembly. Free, private, and client-side only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          id="consent-mode-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: GTAG_CONSENT_BOOTSTRAP_SCRIPT }}
        />
        <CookieConsentManager />
        {GA_MEASUREMENT_ID ? <GoogleAnalytics gaId={GA_MEASUREMENT_ID} /> : null}
      </body>
    </html>
  );
}
