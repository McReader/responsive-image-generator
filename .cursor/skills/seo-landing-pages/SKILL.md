---
name: seo-landing-pages
description: Hub-and-spoke SEO architecture for keyword-targeted landing pages that share one browser-based tool. Use when creating landing pages, adding routes, writing page content, configuring tool defaults, planning internal links, or working on SEO metadata for this project.
---

# SEO Landing Pages

This project uses a **hub-and-spoke** model: one site home (`/`) plus many keyword-targeted landing pages (`/[slug]`) that render the same `GeneratorApp` with different content and pre-configured settings.

## Architecture

```
/  →  HubPage        (brand + tool directory — NOT a keyword landing page)
/[slug]  →  LandingPage  (keyword SEO + educational content + tool)
```

- **Hub** links out to all spokes. Spokes link back to hub and sideways to related spokes.
- **Do not** duplicate spoke keyword content on the hub. Avoid keyword cannibalization.
- **Do not** embed the full tool on the hub. Spokes are the conversion URLs.

## Hub (`/`) — what belongs here

| Include | Avoid |
|---------|-------|
| Brand/category hero (e.g. "Image tools that run in your browser") | Keyword H1 like "Responsive Image Generator" |
| Tool directory from `landingPages` registry | Full educational sections (WebP vs JPEG, srcset tutorials) |
| Brief trust signals (privacy, free, offline) | Spoke-specific FAQ |
| Generic 3-step "how it works" | Duplicate spoke metadata |

**Files:** `app/page.tsx`, `content/hub.ts`, `layouts/HubPage/HubPage.tsx`, `components/ToolsDirectory/`

## Spoke (`/[slug]`) — what belongs here

Each spoke targets **one keyword intent** with long-form SEO content:

1. **Hero** — keyword in H1, value prop, CTAs to `#tool` and an educational anchor
2. **Features grid** — capabilities relevant to this keyword
3. **Tool section** (`#tool`) — `GeneratorApp` with `toolDefaults`
4. **Educational sections** — why, what it generates, privacy, format comparisons, etc.
5. **CTA banner** — second push back to `#tool`
6. **FAQ** — keyword-specific questions
7. **Related pages** — cross-links to sibling spokes

**Files:** `content/landing/<slug>.ts`, `layouts/LandingPage/`, `app/[slug]/page.tsx`

## Key files

| Path | Purpose |
|------|---------|
| `content/landing/index.ts` | Central registry of all spokes (`landingPages` array) |
| `content/landing/shared.ts` | Reusable FAQ items, features, privacy section |
| `content/landing/<slug>.ts` | Per-page content + metadata exports |
| `content/hub.ts` | Hub page content + metadata |
| `layouts/LandingPage/types.ts` | `LandingPageContent`, `LandingPageEntry`, `HubPageContent` |
| `components/generator/GeneratorApp.tsx` | Accepts `initialSettings` for spoke pre-configuration |

## Adding a new landing page

```
Task Progress:
- [ ] Step 1: Create content file
- [ ] Step 2: Register in landingPages
- [ ] Step 3: Verify route and hub directory
- [ ] Step 4: Add cross-links to related spokes
```

### Step 1: Create `content/landing/<slug>.ts`

Copy the pattern from `content/landing/responsive-image-generator.ts`. Export:

- `<name>Content: LandingPageContent`
- `<name>Metadata: Metadata`

Reuse shared blocks from `content/landing/shared.ts` where appropriate (`coreToolFeatures`, `defaultFaqItems`, `privacySection`). Customize hero, sections, FAQ, and metadata for the target keyword.

Set `toolDefaults` when the spoke implies specific settings:

```ts
toolDefaults: {
  format: "webp",
  selectedBreakpoints: [320, 640, 1024, 1920],
  quality: 85,
},
```

### Step 2: Register in `content/landing/index.ts`

```ts
{
  slug: "webp-converter",
  tags: ["WebP", "conversion"],
  content: webpConverterContent,
  metadata: webpConverterMetadata,
},
```

The hub `ToolsDirectory` reads from this registry automatically.

### Step 3: Route

Prefer a single dynamic route at `app/[slug]/page.tsx` with `generateStaticParams` reading from `landingPages`. Do **not** create per-slug folders under `app/` when scaling to dozens of pages.

### Step 4: Cross-links

Add `relatedPages` on spoke content for manual curation, or derive siblings from the registry (all pages except current). Every spoke should link back to `/` ("All tools") and to 2–4 related spokes.

## SEO intent split

| Page | Target intent | Title pattern |
|------|---------------|---------------|
| `/` | Brand + category | "Browser Image Tools \| [Site Name]" |
| `/responsive-image-generator` | Long-tail keyword | "Responsive Image Generator \| …" |
| `/webp-converter` | Long-tail keyword | "WebP Converter \| …" |

- Spoke `metadata.title` and `metadata.description` must be unique per page.
- Hub metadata stays generic — never reuse a spoke's title verbatim.
- Section `id` values become anchor targets (`#why-responsive-images`). Use kebab-case matching the keyword topic.

## Content authoring rules

1. **One keyword per spoke** — don't try to rank one page for unrelated terms.
2. **Unique copy** — no copy-paste between spokes; rewrite hero, sections, and FAQ for each intent.
3. **Shared facts, not shared paragraphs** — privacy/trust messaging can repeat concepts but not identical blocks.
4. **CTAs point to `#tool`** on the same page, not to another spoke.
5. **Pre-configure thoughtfully** — `toolDefaults` should match what the keyword promises (e.g. WebP page defaults to `format: "webp"`).

## Spoke content checklist

See [spoke-template.md](spoke-template.md) for the full `LandingPageContent` structure and section guidance.

## When editing existing pages

- **Hub changes** → edit `content/hub.ts` only. Never move spoke keyword content here.
- **Spoke changes** → edit the spoke's content file, not `LandingPage.tsx` layout (layout is shared).
- **New shared copy** → add to `content/landing/shared.ts` if used by 2+ spokes.
- **Layout changes** → edit `layouts/LandingPage/` or `layouts/HubPage/`; all pages inherit.
