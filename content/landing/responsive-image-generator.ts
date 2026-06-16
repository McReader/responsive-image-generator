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
      blocks: [
        {
          type: "paragraph",
          text: "Responsive images let browsers download the most appropriate file for each visitor's screen size and connection.",
        },
        {
          type: "paragraph",
          text: "Instead of serving a large desktop image to every device, you provide multiple sizes and let the browser choose the best option.",
        },
        {
          type: "list",
          title: "Benefits include:",
          items: [
            "Faster page loads",
            "Reduced bandwidth usage",
            "Better mobile experience",
            "Improved SEO performance",
            "Better Core Web Vitals scores",
          ],
        },
      ],
    },
    {
      id: "what-this-tool-generates",
      heading: "What this tool generates",
      blocks: [
        {
          type: "paragraph",
          text: "Upload one or more images and automatically generate:",
        },
        {
          type: "list",
          items: [
            "Multiple responsive breakpoints",
            "WebP and JPEG versions",
            "A downloadable ZIP archive",
            "Ready-to-use srcset markup",
            "Responsive HTML examples",
          ],
        },
        {
          type: "code",
          title: "Example outputs",
          content: "hero-320.webp\nhero-640.webp\nhero-1024.webp\nhero-1920.webp",
        },
        {
          type: "code",
          title: "Generated markup",
          content: `<img
  src="hero-640.webp"
  srcset="
    hero-320.webp 320w,
    hero-640.webp 640w,
    hero-1024.webp 1024w,
    hero-1920.webp 1920w
  "
  sizes="100vw"
  alt="Hero image"
/>`,
        },
      ],
    },
    privacySection,
    {
      id: "webp-vs-jpeg",
      heading: "WebP vs JPEG for responsive images",
      blocks: [
        {
          type: "comparison",
          title: "WebP",
          advantages: [
            "Smaller file sizes",
            "Better compression",
            "Widely supported by modern browsers",
          ],
          bestFor: "Most website images, marketing pages, blogs, and e-commerce sites.",
        },
        {
          type: "comparison",
          title: "JPEG",
          advantages: ["Universal compatibility", "Simple workflow"],
          bestFor: "Legacy browser support and existing image pipelines.",
        },
        {
          type: "paragraph",
          text: "For most websites, WebP should be your default format.",
        },
      ],
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
