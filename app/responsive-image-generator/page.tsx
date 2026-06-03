import { GeneratorApp } from "@/components/generator/GeneratorApp";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Responsive Image Generator | Create srcset Images in Your Browser",
  description: "Generate responsive image sets for modern websites. Create multiple image sizes, WebP versions, and srcset markup directly in your browser. No uploads required.",
}

export default function ResponsiveImageGenerator() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Responsive Image Generator
        </h1>
        <p className="mt-6 max-w-3xl text-xl text-zinc-600 dark:text-zinc-400">
          Generate responsive image sets for websites in seconds.
        </p>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Create multiple image sizes, convert to WebP, and generate ready-to-use srcset markup directly in your browser. Your images never leave your device.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm font-medium text-zinc-500">
          <span>No uploads</span>
          <span className="text-zinc-300">•</span>
          <span>No accounts</span>
          <span className="text-zinc-300">•</span>
          <span>No server processing</span>
        </div>
      </header>

      <div className="mb-20">
        <GeneratorApp />
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-zinc-200 dark:border-zinc-800 pt-16">
        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Why Use Responsive Images?</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Responsive images allow browsers to download the most appropriate image for a user's screen size.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Instead of serving a large desktop image to every visitor, you can provide multiple image sizes and let the browser choose the best option.
          </p>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Benefits include:</h3>
          <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-400">
            <li>Faster page loads</li>
            <li>Reduced bandwidth usage</li>
            <li>Better mobile experience</li>
            <li>Improved SEO performance</li>
            <li>Better Core Web Vitals scores</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">What This Tool Generates</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Upload one or more images and automatically generate:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-400 mb-6">
            <li>Multiple responsive breakpoints</li>
            <li>WebP versions</li>
            <li>JPEG versions</li>
            <li>Downloadable ZIP archive</li>
            <li>Ready-to-use srcset markup</li>
            <li>Responsive HTML examples</li>
          </ul>
          
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
            <h4 className="text-sm font-semibold text-zinc-500 mb-2 uppercase tracking-wider">Example outputs:</h4>
            <code className="text-sm text-zinc-800 dark:text-zinc-200 block mb-4">
              hero-320.webp<br />
              hero-640.webp<br />
              hero-1024.webp<br />
              hero-1920.webp
            </code>
            <h4 className="text-sm font-semibold text-zinc-500 mb-2 uppercase tracking-wider">Generated markup:</h4>
            <pre className="text-xs text-zinc-800 dark:text-zinc-200 overflow-x-auto">
{`<img
  src="hero-640.webp"
  srcset="
    hero-320.webp 320w,
    hero-640.webp 640w,
    hero-1024.webp 1024w,
    hero-1920.webp 1920w
  "
  sizes="100vw"
  alt="Hero image"
/>`}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Privacy First Image Processing</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Unlike many online image tools, this responsive image generator performs all processing directly in your browser.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 mb-2 font-medium">Your images:</p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-400">
            <li>Are never uploaded</li>
            <li>Never leave your device</li>
            <li>Are not stored on servers</li>
            <li>Can be processed completely offline after the page loads</li>
          </ul>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            This makes the tool suitable for private, commercial, and client work.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Recommended Responsive Image Sizes</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Common breakpoints used on modern websites:
          </p>
          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
              <thead className="bg-zinc-50 dark:bg-zinc-900">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Device Type</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Width</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-950">
                <tr><td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">Small mobile</td><td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 font-mono">320px</td></tr>
                <tr><td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">Large mobile</td><td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 font-mono">480px</td></tr>
                <tr><td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">Tablet</td><td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 font-mono">768px</td></tr>
                <tr><td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">Laptop</td><td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 font-mono">1024px</td></tr>
                <tr><td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">Desktop</td><td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 font-mono">1440px</td></tr>
                <tr><td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">Large desktop</td><td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 font-mono">1920px</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            The best breakpoints depend on your design, but these sizes provide a good starting point for most projects.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">WebP vs JPEG for Responsive Images</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">WebP</h3>
              <p className="text-sm font-medium text-zinc-500 mb-1 uppercase tracking-wider">Advantages:</p>
              <ul className="list-disc pl-5 text-zinc-600 dark:text-zinc-400 text-sm mb-2">
                <li>Smaller file sizes</li>
                <li>Better compression</li>
                <li>Widely supported by modern browsers</li>
              </ul>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 italic">Best for: Most website images, marketing pages, blogs, e-commerce sites.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">JPEG</h3>
              <p className="text-sm font-medium text-zinc-500 mb-1 uppercase tracking-wider">Advantages:</p>
              <ul className="list-disc pl-5 text-zinc-600 dark:text-zinc-400 text-sm mb-2">
                <li>Universal compatibility</li>
                <li>Simple workflow</li>
              </ul>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 italic">Best for: Legacy browser support, existing image pipelines.</p>
            </div>
          </div>
          <p className="mt-6 text-zinc-600 dark:text-zinc-400">
            For most websites, WebP should be your default format.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">How Responsive Images Improve SEO</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Image optimization plays an important role in website performance.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 mb-2 font-medium">Responsive images help by:</p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-400 mb-4">
            <li>Reducing page weight</li>
            <li>Improving loading speed</li>
            <li>Lowering Largest Contentful Paint (LCP)</li>
            <li>Improving mobile performance</li>
          </ul>
          <p className="text-zinc-600 dark:text-zinc-400">
            Search engines increasingly reward fast, user-friendly websites, making responsive images a key part of technical SEO.
          </p>
        </section>

        <section className="md:col-span-2 border-t border-zinc-200 dark:border-zinc-800 pt-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Are my images uploaded to a server?</h3>
              <p className="text-zinc-600 dark:text-zinc-400">No. All processing happens locally in your browser.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Can I generate WebP images?</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Yes. The tool can generate WebP versions of your responsive image set.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Can I process multiple images at once?</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Yes. Bulk processing is supported.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Does this generate srcset markup automatically?</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Yes. The tool creates ready-to-use HTML markup that can be copied directly into your website.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Is there a file size limit?</h3>
              <p className="text-zinc-600 dark:text-zinc-400">The practical limit depends on your device's available memory, since processing happens locally.</p>
            </div>
          </div>
        </section>

        {/*<section className="md:col-span-2 border-t border-zinc-200 dark:border-zinc-800 pt-12 mb-16">*/}
        {/*  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Related Tools</h2>*/}
        {/*  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">*/}
        {/*    <Link href="/bulk-image-resizer" className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-center font-medium text-zinc-900 dark:text-zinc-100">*/}
        {/*      Bulk Image Resizer*/}
        {/*    </Link>*/}
        {/*    <Link href="/webp-converter" className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-center font-medium text-zinc-900 dark:text-zinc-100">*/}
        {/*      WebP Converter*/}
        {/*    </Link>*/}
        {/*    <Link href="/avif-converter" className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-center font-medium text-zinc-900 dark:text-zinc-100">*/}
        {/*      AVIF Converter*/}
        {/*    </Link>*/}
        {/*    <Link href="/srcset-generator" className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-center font-medium text-zinc-900 dark:text-zinc-100">*/}
        {/*      Srcset Generator*/}
        {/*    </Link>*/}
        {/*  </div>*/}
        {/*</section>*/}
      </div>
    </main>
  );
}
