import type {LandingPageContent} from "@/layouts/LandingPage/types";
import {coreToolFeatures, defaultFaqItems, privacySection} from "./shared";

export const responsiveImageGeneratorContent: LandingPageContent = {
  hero: {
    heading: "Responsive Image Generator",
    description:
      "Create multiple image sizes, convert to WebP, and generate ready-to-use srcset markup in your browser. Your images never leave your device.",
    primaryCta: {label: "Try the generator", href: "#tool"},
    secondaryCta: {label: "Learn why responsive images matter", href: "#why-responsive-images"},
  },
  features: {
    title: "Everything you need for responsive images",
    items: coreToolFeatures,
  },
  sections: [
    {
      id: "why-responsive-images",
      heading: "Why use responsive images?",
      description:
        "Responsive images let browsers download the most appropriate file for each visitor's screen size and connection. Instead of serving one large desktop image to every device, you provide multiple sizes and let the browser choose the best option — resulting in faster page loads, less bandwidth, a better mobile experience, and stronger Core Web Vitals.",
    },
    privacySection,
  ],
  cta: {
    heading: "Responsive images improve SEO and performance",
    description:
      "Smaller, appropriately sized images reduce page weight, improve loading speed, lower Largest Contentful Paint (LCP), and help mobile performance. Search engines reward fast, user-friendly websites — responsive images are a practical part of technical SEO.",
    primaryCta: {label: "Generate responsive images now", href: "#tool"},
  },
  faq: {
    title: "Frequently asked questions",
    items: defaultFaqItems,
  },
};
