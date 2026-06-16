# Spoke Content Template

Reference for `LandingPageContent` in `content/landing/<slug>.ts`.

## Minimal structure

```ts
import type { LandingPageContent } from "@/layouts/LandingPage/types";
import { coreToolFeatures, defaultFaqItems, privacySection } from "./shared";

export const exampleContent: LandingPageContent = {
  hero: {
    heading: "Target Keyword Here",
    description: "One sentence value prop with the keyword naturally included.",
    primaryCta: { label: "Try the generator", href: "#tool" },
    secondaryCta: { label: "Learn more", href: "#section-id" },
  },
  features: {
    title: "Features framed for this keyword",
    items: coreToolFeatures, // or customized subset
  },
  toolDefaults: {
    format: "webp",
    selectedBreakpoints: [640, 1024, 1280],
    quality: 80,
  },
  sections: [
    {
      id: "section-id",
      heading: "Educational H2 targeting a related long-tail phrase",
      blocks: [
        { type: "paragraph", text: "..." },
        { type: "list", title: "Benefits:", items: ["...", "..."] },
        { type: "code", title: "Example output", content: "..." },
        {
          type: "comparison",
          title: "Format A",
          advantages: ["..."],
          bestFor: "...",
        },
      ],
    },
    privacySection,
  ],
  cta: {
    heading: "Conversion headline tied to keyword benefit",
    description: "Why act now — performance, SEO, workflow speed.",
    primaryCta: { label: "Generate images now", href: "#tool" },
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      ...defaultFaqItems,
      // Add 1–3 keyword-specific Q&As
    ],
  },
};

export const exampleMetadata = {
  title: "Target Keyword | Specific Benefit Phrase",
  description:
    "Unique 150–160 char description with primary keyword. Mention browser-based, no uploads.",
};
```

## Section types (`ContentBlock`)

| Type | Use for |
|------|---------|
| `paragraph` | Explanatory prose |
| `list` | Benefits, features, outputs |
| `code` | Example filenames, HTML snippets, CLI-style output |
| `comparison` | Format or approach comparisons (WebP vs JPEG, etc.) |

## Recommended sections by spoke type

**Responsive / srcset spokes:** why responsive images, what the tool generates (with code examples), privacy, format comparison.

**Format conversion spokes (WebP, AVIF):** format benefits, browser support, when to use vs fallback, privacy.

**Bulk / resize spokes:** workflow efficiency, naming conventions, batch output, privacy.

## FAQ guidance

- Start with `defaultFaqItems` from `shared.ts` for universal questions.
- Add spoke-specific questions that match real search queries ("Can I convert PNG to WebP?", "Does this generate srcset?").
- Keep answers concise — 1–2 sentences.

## Metadata guidance

- **Title:** `Primary Keyword | Secondary Benefit` (under ~60 chars ideal).
- **Description:** Include primary keyword once, mention privacy/browser-based, unique per spoke.
- Never copy hub metadata to a spoke or vice versa.
