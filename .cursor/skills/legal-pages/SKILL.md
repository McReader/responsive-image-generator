---
name: legal-pages
description: >-
  Privacy policy, cookie consent, and third-party service disclosure workflow
  for this project. Use when adding integrations (Google Analytics, AdSense,
  Buy Me a Coffee, embeds), updating legal pages, cookie banner categories,
  Consent Mode wiring, or answering what data the site collects.
---

# Legal Pages & Privacy Compliance

Legal pages should be **plain static React pages** — JSX in `app/<page>/page.tsx` (or small co-located components), using the shared `LegalPage` layout for chrome only (header, TOC, footer). Write copy directly in markup; do not add new abstractions, content registries, or block-type renderers.

A **cookie consent banner** is wired to **Google Consent Mode v2** site-wide.

## Architecture

```
app/privacy/page.tsx          →  legacy content import (migrate to static JSX when touched)
app/terms/page.tsx            →  static JSX (reference implementation)
layouts/LegalPage/LegalDocumentShell.tsx →  shared shell for static legal pages
layouts/LegalPage/LegalPage.tsx          →  legacy renderer (privacy only, for now)
components/CookieConsent/     →  vanilla-cookieconsent banner + preferences modal
lib/analytics/consentMode.ts  →  Consent Mode v2 default + category → gtag mapping
app/layout.tsx                →  bootstrap script, banner, conditional GoogleAnalytics
```

**Implemented today:** `/privacy` (legacy content file), `/terms` (static JSX).

**Footer links not yet implemented:** `/cookies` (listed in `content/site.ts` → `footerLegalLinks`).

## Core principles (follow these when writing copy)

1. **Be honest about what you control.** This site has no backend and no user database. You are the *data controller* for third-party choices on your site, but Google/BMC/etc. are the *processors* that hold the actual data.
2. **Match implementation to policy.** Only list services that are actually wired in. Do not copy boilerplate services from templates.
3. **Simplify vs. generic templates.** We intentionally dropped per-jurisdiction deep dives (Switzerland, Brazil, full CCPA sale disclosures) in favor of one consolidated "Your rights" section. Do not re-expand unless the user asks.
4. **Client-side tool is the differentiator.** Images are processed in-browser via WASM and never uploaded. Keep this prominent in intro / types-of-data sections.
5. **Rights must be actionable.** Tell users *how* to exercise each right:
   - Consent-based trackers → self-service via **Cookie settings** (footer)
   - Data held by vendors → vendor's own tools / privacy policy
   - Everything else → contact email in policy

## Integration types

Classify every new service before editing files:

| Type | Examples | Cookie banner? | Privacy policy? | Code wiring |
|------|----------|----------------|-----------------|-------------|
| **A. Tracker / cookie** | Google Analytics, AdSense, Hotjar | Yes — new or existing category | Yes — detailed section | Consent Mode + conditional load |
| **B. External link only** | Buy Me a Coffee, GitHub Sponsors | No | Yes — disclose click-away | `<a href>` only, no embed |
| **C. Embedded third-party** | YouTube iframe, BMC widget, GTM | Usually yes | Yes | Block until consent or use vendor CMP |
| **D. Build-time / no runtime PII** | `next/font`, static export, WASM tool | No | Mention if relevant | None |

**Default:** if it sets cookies or loads a third-party script at runtime → Type A or C.

## Checklist: adding a new third-party service

```
Task Progress:
- [ ] Step 1: Classify integration type (A/B/C/D)
- [ ] Step 2: Implement the feature in code
- [ ] Step 3: Update cookie consent (if Type A or C)
- [ ] Step 4: Update privacy policy page (static JSX)
- [ ] Step 5: Update README if env vars or setup changed
- [ ] Step 6: Bump "Last updated" on the page
```

### Step 1: Classify

Ask:
- Does it load scripts/cookies on *this* domain before user action?
- Does user leave the site (external link)?
- What personal data does the vendor process?
- Where is data processed (usually US for Google)?

### Step 2: Implement in code

| Type | Where to wire |
|------|---------------|
| Google Analytics | `NEXT_PUBLIC_GA_MEASUREMENT_ID` + `app/layout.tsx` `<GoogleAnalytics>` |
| Google Ads / AdSense | Add tags in layout; map `marketing` category in `consentMode.ts` |
| External donation link | Component with `target="_blank"` `rel="noopener noreferrer"` |
| Other trackers | Prefer `@next/third-parties` or `next/script`, never unconditional load |

### Step 3: Cookie consent (Type A / C only)

| File | What to change |
|------|----------------|
| `components/CookieConsent/cookieConsentConfig.ts` | Add category or `services` entry; `autoClear` cookie patterns; preferences modal section |
| `lib/analytics/consentMode.ts` | Map category → Consent Mode signals in `applyBannerCategoriesToConsentMode` |
| `app/globals.css` | Only if banner styling needs tweaks (`#cc-main` CSS variables) |

**Current categories:** `necessary` (read-only), `analytics` (GA).

**Adding marketing (AdSense / Google Ads):** add `marketing` category with `autoClear` for `_gcl_*`, map `ad_storage`, `ad_user_data`, `ad_personalization` to granted when accepted. See [service-integration.md](service-integration.md).

**Banner UX rules:** keep `layout: "bar inline"` at bottom; equal-weight Accept/Reject buttons; link to `/privacy` in modal footer.

### Step 4: Privacy policy page

Edit **`app/privacy/page.tsx`** (preferred). Until migration is complete, the same sections may still live in legacy `content/legal/privacy.ts` — update whichever file actually renders, but do not add new content-layer files.

Update **all sections that apply**:

| Section (anchor id) | When to update |
|---------------------|----------------|
| `types-of-data-collected` | New data categories; note if consent-gated or click-away |
| `detailed-processing-information` | **Always** — add service under correct group heading |
| `your-rights` → "How to exercise these rights" | Add bullet: self-service (cookie settings) OR vendor redirect OR contact us |
| Last updated date | **Always** bump to today |

Use `LegalPage` layout classes for consistency (`text-sm leading-relaxed text-zinc-600`, section `id` for TOC anchors, `<dl>` field grids for vendor metadata). Copy templates: [service-integration.md](service-integration.md).

Group headings in use today:
- **Analytics** → Google Analytics
- **Supporting the project** → Buy Me a Coffee

Add new group headings when needed (e.g. Advertising, Embedded content).

### Step 5: README

If the integration needs env vars or build-time config, document in **Getting started** (not a separate `.env.example` — project convention is README only).

### Step 6: Verify

- `npm run build` passes (static export)
- Policy mentions only services actually in the codebase
- Consent-gated services are blocked until acceptance
- Footer **Cookie settings** reopens preferences

## Current integrations inventory

Keep this table in sync when adding services:

| Service | Type | Consent category | Privacy section | Code location |
|---------|------|------------------|-----------------|---------------|
| Google Analytics 4 | A | `analytics` | Analytics → Google Analytics | `app/layout.tsx`, `consentMode.ts`, env `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| Buy Me a Coffee | B | — | Supporting the project → Buy Me a Coffee | `components/generator/BuyMeACoffeeButton.tsx` |
| Azure Static Web Apps (hosting logs) | D | — | Server and hosting logs | infrastructure only |
| Image processing (jSquash WASM) | D | — | intro + types-of-data | client-side only, no upload |

## "Your rights" patterns

**Consent / withdraw (trackers):**
> Click **Cookie settings** in the footer. Takes effect immediately on this device. No email needed.

**Vendor holds the data (analytics, ads, payments on vendor site):**
> We don't have a database of our own and can't look up your data. Use [vendor tool / privacy policy].

**We might hold it (future: contact form, accounts):**
> Contact us at the email in Contact information.

## Creating a new legal page (Cookies, etc.)

1. Add `app/<slug>/page.tsx` using `LegalDocumentShell` + `LegalSection` (see `app/terms/page.tsx`)
2. Export `metadata` from the same file
3. Page is auto-linked if already in `footerLegalLinks` (`content/site.ts`)

**Legacy (do not extend):** `content/legal/privacy.ts` still feeds `/privacy`. Migrate to static JSX when editing; do not create new `content/legal/*` files.

## Do not

- Introduce content registries, block types, or render-from-data patterns for legal pages
- Add iubenda-style per-country sections unless explicitly requested
- Claim you can delete/export per-user analytics data you don't store
- List contact forms, email collection, or name fields we don't have
- Load analytics/ads before Consent Mode default + user consent
- Create `.env.example` — document env vars in README Getting started

## Additional resources

- JSX copy templates and examples: [service-integration.md](service-integration.md)
- Cookie consent library docs: https://cookieconsent.orestbida.com/
- Google Consent Mode v2: https://developers.google.com/tag-platform/security/guides/consent
