import type {FaqItem, LandingFeature} from "@/layouts/LandingPage/types";

export const defaultFaqItems: FaqItem[] = [
  {
    question: "Are my images uploaded to a server?",
    answer: "No. All processing happens locally in your browser.",
  },
  {
    question: "Can I generate WebP images?",
    answer: "Yes. The tool can generate WebP versions of your responsive image set.",
  },
  {
    question: "Can I process multiple images at once?",
    answer: "Yes. Bulk processing is supported.",
  },
  {
    question: "Does this generate srcset markup automatically?",
    answer: "Yes. The tool creates ready-to-use HTML markup that you can copy directly into your website.",
  },
  {
    question: "Is there a file size limit?",
    answer: "The practical limit depends on your device's available memory, since processing happens locally.",
  },
];

export const coreToolFeatures: LandingFeature[] = [
  {
    title: "Create responsive image sets",
    description: "Generate multiple image sizes from a single upload.",
  },
  {
    title: "Generate srcset markup",
    description: "Copy ready-to-use HTML directly into your project.",
  },
  {
    title: "Convert to modern formats",
    description: "Export WebP, JPEG, and AVIF versions.",
  },
  {
    title: "Process images in bulk",
    description: "Upload multiple images and generate all outputs at once.",
  },
];

export const privacySection = {
  id: "privacy",
  heading: "Privacy-first image processing",
  blocks: [
    {
      type: "paragraph" as const,
      text: "Unlike many online image tools, this generator performs all processing directly in your browser.",
    },
    {
      type: "list" as const,
      title: "Your images:",
      items: [
        "Are never uploaded",
        "Never leave your device",
        "Are not stored on servers",
        "Can be processed offline after the page loads",
      ],
    },
    {
      type: "paragraph" as const,
      text: "This makes the tool suitable for private, commercial, and client work.",
    },
  ],
};
