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

No analytics or server-side image processing are included. Your files never leave your browser.
