import type {LandingPageContent} from "@/layouts/LandingPage/types";
import {coreToolFeatures, defaultFaqItems, privacySection} from "./shared";

export const responsiveImageGeneratorContent: LandingPageContent = {
  hero: {
    heading: "Responsive Image Generator",
    description:
      "Create multiple image sizes, convert to WebP, and generate ready-to-use srcset markup in your browser. Your images never leave your device.",
    primaryCta: { label: "Try the generator", href: "#tool" },
    secondaryCta: { label: "Learn why responsive images matter", href: "#why-responsive-images" },
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
    {
      id: "what-this-tool-generates",
      heading: "What this tool generates",
      description:
        "Upload one or more images and this tool generates responsive breakpoints, WebP and JPEG versions, a downloadable ZIP archive, and ready-to-use srcset markup. Example outputs range from a 7 KB mobile hero image to a 158 KB desktop version.",
    },
    privacySection,
    {
      id: "webp-vs-jpeg",
      heading: "WebP vs JPEG for responsive images",
      description:
        "WebP offers smaller files and better compression, and is widely supported by modern browsers — making it the default choice for most website images, marketing pages, blogs, and e-commerce sites. JPEG offers universal compatibility and a simple workflow for legacy browsers and existing pipelines. For most websites, WebP should be your default format.",
    },
  ],
  cta: {
    heading: "Responsive images improve SEO and performance",
    description:
      "Smaller, appropriately sized images reduce page weight, improve loading speed, lower Largest Contentful Paint (LCP), and help mobile performance. Search engines reward fast, user-friendly websites — responsive images are a practical part of technical SEO.",
    primaryCta: { label: "Generate responsive images now", href: "#tool" },
  },
  faq: {
    title: "Frequently asked questions",
    items: defaultFaqItems,
  },
};

export const responsiveImageGeneratorMetadata = {
  title: "Responsive Image Generator | Create srcset Images in Your Browser",
  description:
    "Generate responsive image sets for modern websites. Create multiple image sizes, WebP versions, and srcset markup directly in your browser. No uploads required.",
};
