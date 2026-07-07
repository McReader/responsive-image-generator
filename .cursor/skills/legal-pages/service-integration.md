# Service Integration Templates

JSX copy templates for `app/privacy/page.tsx`. Match existing `LegalPage` section styling and anchor ids.

Replace bracketed placeholders. Always bump the "Last updated" date.

---

## Type A: Cookie / tracker service (e.g. Google Analytics)

### Detailed processing section

Add under `#detailed-processing-information`, inside the correct group `<h3>`:

```tsx
<h3 className="text-[0.9375rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
  [Service Name] ([Legal Entity])
</h3>
<p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
  [One paragraph: what the service does, who provides it.] To understand [vendor]&apos;s
  use of data, consult their{" "}
  <a
    href="[https://...]"
    target="_blank"
    rel="noopener noreferrer"
    className="text-zinc-900 underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-900 dark:text-zinc-50 dark:decoration-zinc-600 dark:hover:decoration-zinc-50"
  >
    privacy policy
  </a>
  .
</p>
<p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
  [Service] only runs if you accept the &ldquo;[Category name]&rdquo; category in our
  cookie banner. Until you do, no [cookies/trackers] are set and no data is sent to
  [vendor]. You can grant, withdraw, or change this choice at any time using{" "}
  <strong className="font-semibold text-zinc-900 dark:text-zinc-50">Cookie settings</strong>{" "}
  in the footer.
</p>
<dl className="grid gap-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
  <div className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-3">
    <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-900 dark:text-zinc-50">
      Personal data processed
    </dt>
    <dd className="m-0 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
      [e.g. Trackers; usage data]
    </dd>
  </div>
  <div className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-3">
    <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-900 dark:text-zinc-50">
      Place of processing
    </dt>
    <dd className="m-0 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
      [e.g. United States]
    </dd>
  </div>
  <div className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-3">
    <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-900 dark:text-zinc-50">
      Privacy policy
    </dt>
    <dd className="m-0 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
      <a href="[https://...]" target="_blank" rel="noopener noreferrer" className="...">
        [short label]
      </a>
    </dd>
  </div>
  <div className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-3">
    <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-900 dark:text-zinc-50">
      Opt-out
    </dt>
    <dd className="m-0 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
      <a href="[https://...]" target="_blank" rel="noopener noreferrer" className="...">
        [opt-out tool name]
      </a>
    </dd>
  </div>
</dl>
```

### Types of data collected

If not already covered, add a list item or paragraph under `#types-of-data-collected`. Consent-gated trackers should reference the cookie banner.

### Your rights bullet

```tsx
<li className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
  <strong className="font-semibold text-zinc-900 dark:text-zinc-50">
    Access, correct, delete, or port data processed by [Service]
  </strong>
  : because [Service] is a third-party processor and we don&apos;t have a database of
  our own, we can&apos;t look up, edit, or export data tied to a specific person on
  [vendor]&apos;s systems. Use [vendor]&apos;s{" "}
  <a href="[https://...]" ...>[tool name]</a>.
</li>
```

### Cookie consent category (`cookieConsentConfig.ts`)

```ts
analytics: {  // or new category key, e.g. marketing
  autoClear: {
    cookies: [{ name: /^_ga/ }, { name: "_gid" }],  // adjust per vendor
  },
},
```

Add preferences modal section:

```ts
{
  title: "[Category display name]",
  description: "[What it does. State nothing loads without acceptance.]",
  linkedCategory: "[category-key]",
},
```

### Consent Mode mapping (`consentMode.ts`)

Analytics:

```ts
analytics_storage: acceptedCategories.includes("analytics") ? "granted" : "denied",
```

Marketing / AdSense (add when implemented):

```ts
const marketingGranted = acceptedCategories.includes("marketing") ? "granted" : "denied";
updateConsentMode({
  analytics_storage: acceptedCategories.includes("analytics") ? "granted" : "denied",
  ad_storage: marketingGranted,
  ad_user_data: marketingGranted,
  ad_personalization: marketingGranted,
});
```

Update `consentModal.description` in `cookieConsentConfig.ts` when categories change.

---

## Type B: External link only (e.g. Buy Me a Coffee)

No cookie banner changes.

### Types of data collected

```tsx
<p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
  If you choose to [action] via the{" "}
  <strong className="font-semibold text-zinc-900 dark:text-zinc-50">[Button label]</strong>{" "}
  button, you leave this website and are taken to{" "}
  <a href="[https://...]" ...>[domain]</a>. Any information you provide there — such
  as [data types] — is collected and processed by [Vendor], not by us.
</p>
```

### Detailed processing section

```tsx
<h3 ...>[Group name, e.g. Supporting the project]</h3>
<p ...>[One sentence: optional, not required to use the tool.]</p>
<h3 ...>[Service Name]</h3>
<p ...>
  [Service] is a third-party platform for [purpose]. This website only links to our
  [Service] page — we do not embed [Service] scripts, widgets, or payment forms.
  Nothing is loaded from [Service] until you click the link and open their site in a
  new tab.
</p>
<p ...>
  If you choose to [transact], [Vendor] and its payment processors (such as Stripe)
  collect the information needed to complete the transaction. We do not receive your
  payment card details, and we do not maintain [relevant data] on this website.
  Consult their <a href="[https://...]" ...>privacy policy</a>.
</p>
<dl ...>
  {/* Personal data processed, Place of processing, Privacy policy — same dl pattern as Type A */}
</dl>
```

### Your rights bullet

```tsx
<li ...>
  <strong ...>Access, correct, delete, or port data related to [action]</strong>
  : because [Vendor] processes [what] on its own platform, we don&apos;t hold that
  information. Contact [Vendor] directly using the details in their{" "}
  <a href="[https://...]" ...>privacy policy</a>.
</li>
```

---

## Type C: Embedded widget / iframe

Treat like Type A unless the embed is strictly necessary (rare). Prefer external link (Type B) when possible.

1. Add consent category — do not load embed JS until accepted
2. Privacy detailed section — note embed loads content from external platform
3. Document: personal data processed, place of processing, vendor privacy URL

**Google Fonts via CDN** (not used — `next/font/google` self-hosts at build time; no runtime Google request).

---

## Example: Google AdSense (not yet implemented)

1. Add `marketing` category to `cookieConsentConfig.ts`
2. Map `ad_storage`, `ad_user_data`, `ad_personalization` in `consentMode.ts`
3. Load AdSense only after marketing consent
4. Privacy page: new **Advertising** group → Google AdSense subsection
5. Types of data: may need advertising identifiers
6. Your rights: vendor redirect + cookie settings for withdraw
7. README: note AdSense requires consent + possibly ads.txt

---

## Live references (current copy)

Until `app/privacy/page.tsx` is fully migrated, the canonical text may still be in legacy `content/legal/privacy.ts`. When editing, migrate the touched section to static JSX rather than extending the content file.

| Topic | Sections to find |
|-------|------------------|
| Google Analytics | `detailed-processing-information` → Analytics; `your-rights` → Cookie settings + Google tools |
| Buy Me a Coffee | `types-of-data-collected`; `detailed-processing-information` → Supporting the project; `your-rights` → BMC privacy policy |

Code: `lib/analytics/consentMode.ts`, `components/CookieConsent/cookieConsentConfig.ts`, `app/layout.tsx`, `components/generator/BuyMeACoffeeButton.tsx`.

Env: `NEXT_PUBLIC_GA_MEASUREMENT_ID` in README Getting started.

---

## Placeholder to fix before launch

Contact information email is still `privacy@example.com`. Replace with a real address before production.
