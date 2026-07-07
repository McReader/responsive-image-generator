# Responsive Image Generator

A client-side Next.js app for generating responsive image variants in the browser. Upload images, pick breakpoints and output settings, then download resized files plus ready-to-use HTML `srcset` snippets.

All image processing runs locally with WebAssembly (jSquash) inside a Web Worker. Nothing is uploaded to a server.

## Features

- Bulk image upload with previews
- Preset breakpoints: 320, 480, 640, 768, 1024, 1280, 1920
- Output formats: WebP, JPEG, PNG, AVIF
- Quality slider for lossy formats
- Consistent naming: `hero-640w.webp`
- HTML snippet preview with `srcset` and `sizes`
- Download per image or all variants as ZIP
- Static export for Azure Static Web Apps free tier

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Optional: Google Analytics

Google Analytics is disabled unless you set a measurement ID at build time. Create a `.env.local` file in the project root:

```bash
# Google Analytics 4 measurement ID (e.g. G-XXXXXXXXXX).
# Leave empty or unset to keep Google Analytics fully disabled.
# Visitors must still accept the "Analytics" cookie category before any
# data is sent, regardless of this value.
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

Restart `npm run dev` after changing this value. For production builds, set the same variable in your CI environment before `npm run build`.

## Build

```bash
npm run build
```

This produces a static site in `out/` because the app uses `output: "export"`.

## Deploy to Azure Static Web Apps

1. Create an Azure Static Web App (free tier).
2. Connect your GitHub repository.
3. Add the deployment token as `AZURE_STATIC_WEB_APPS_API_TOKEN` in GitHub Actions secrets.
4. Push to `main`.

The workflow in [`.github/workflows/azure-static-web-apps.yml`](.github/workflows/azure-static-web-apps.yml) builds the app and deploys the `out/` folder.

Routing fallback is configured in [`staticwebapp.config.json`](staticwebapp.config.json).

## Browser support

Requires a modern browser with:

- WebAssembly
- Web Workers
- `createImageBitmap` (recommended)
- Clipboard API for copy buttons

AVIF encoding can be slow on mobile devices.

## Tech stack

- Next.js 16 (App Router, static export)
- React 19
- Tailwind CSS 4
- jSquash WASM codecs
- JSZip

## Privacy

No server-side image processing is included; your files never leave your browser.

Google Analytics is wired in but **disabled by default**. It only activates if:

1. you set the `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable at build time (see **Getting started** above), and
2. a visitor accepts the "Analytics" category in the cookie consent banner.

The banner uses [`vanilla-cookieconsent`](https://cookieconsent.orestbida.com/) and wires visitor choices into [Google Consent Mode v2](https://developers.google.com/tag-platform/security/guides/consent), so Analytics (and any Google Ads/AdSense tags added later) respect the same consent signal automatically. Visitors can change their choice anytime via the "Cookie settings" link in the footer — see `components/CookieConsent/` and `lib/analytics/consentMode.ts`.

Because this app uses `output: "export"`, environment variables are baked in at build time. If you deploy via the GitHub Actions workflow, add `NEXT_PUBLIC_GA_MEASUREMENT_ID` as a repository variable and pass it to the build step's `env:` block.
