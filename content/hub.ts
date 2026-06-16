import type {HubPageContent} from "@/layouts/LandingPage/types";
import type {Metadata} from "next";

export const hubContent: HubPageContent = {
  hero: {
    eyebrow: "Browser-based · Private · Free",
    heading: "Image tools that run in your browser",
    description:
      "Resize, convert, and generate responsive markup without uploading files. Pick the tool that matches your workflow.",
    primaryCta: { label: "Browse tools", href: "#tools" },
  },
  trust: {
    title: "Built for privacy and speed",
    items: [
      {
        title: "Nothing leaves your device",
        description: "All processing happens locally in your browser.",
      },
      {
        title: "No account required",
        description: "Open a tool and start working immediately.",
      },
      {
        title: "Works offline",
        description: "After the page loads, you can process images without a connection.",
      },
    ],
  },
  tools: {
    title: "Choose a tool",
    description: "Each page is tailored to a specific image workflow with sensible defaults.",
  },
  howItWorks: {
    title: "How it works",
    steps: [
      {
        title: "Pick a tool",
        description: "Choose the landing page that matches your format or output needs.",
      },
      {
        title: "Upload images",
        description: "Drag and drop one or many files. Pre-configured settings get you started fast.",
      },
      {
        title: "Download results",
        description: "Get optimized files, a ZIP archive, and ready-to-use HTML markup.",
      },
    ],
  },
  faq: {
    title: "About these tools",
    items: [
      {
        question: "Are my images uploaded to a server?",
        answer: "No. Every tool runs entirely in your browser.",
      },
      {
        question: "Is this free to use?",
        answer: "Yes. There are no fees, subscriptions, or sign-up requirements.",
      },
      {
        question: "Which tool should I use?",
        answer:
          "Start with the page that matches your goal — responsive srcset images, WebP conversion, bulk resizing, and more. Each tool uses the same engine with different defaults.",
      },
    ],
  },
};

export const hubMetadata: Metadata = {
  title: "Browser Image Tools | Free, Private, Client-Side",
  description:
    "Free browser-based image tools for responsive images, format conversion, and srcset markup. No uploads. No sign-up. Processing happens on your device.",
};
