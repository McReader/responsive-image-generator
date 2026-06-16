import type {GeneratorSettings} from "@/lib/types";
import type {Metadata} from "next";

export type CtaLink = {
  label: string;
  href: string;
};

export type LandingFeature = {
  title: string;
  description: string;
};

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; title?: string; items: string[] }
  | { type: "code"; title: string; content: string }
  | { type: "comparison"; title: string; advantages: string[]; bestFor: string };

export type ContentSectionData = {
  id?: string;
  heading: string;
  blocks: ContentBlock[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type LandingPageContent = {
  hero: {
    heading: string;
    description: string;
    primaryCta: CtaLink;
    secondaryCta?: CtaLink;
  };
  features: {
    title: string;
    items: LandingFeature[];
  };
  toolDefaults?: Partial<GeneratorSettings>;
  sections: ContentSectionData[];
  cta?: {
    heading: string;
    description: string;
    primaryCta: CtaLink;
  };
  faq: {
    title?: string;
    items: FaqItem[];
  };
};

export type LandingPageEntry = {
  slug: string;
  tags?: string[];
  content: LandingPageContent;
  metadata: Metadata;
};

export type HubPageContent = {
  hero: {
    eyebrow?: string;
    heading: string;
    description: string;
    primaryCta: CtaLink;
  };
  trust: {
    title: string;
    items: LandingFeature[];
  };
  tools: {
    title: string;
    description: string;
  };
  howItWorks: {
    title: string;
    steps: { title: string; description: string }[];
  };
  faq: {
    title?: string;
    items: FaqItem[];
  };
};
