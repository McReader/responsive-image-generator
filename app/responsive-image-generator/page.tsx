import { Metadata } from "next";

import { GeneratorApp } from "@/components/generator/GeneratorApp";
import { Banner } from "@/components/Banner";
import { FAQ } from "@/components/FAQ";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { Footer } from "@/components/Footer";
import { BreakpointRuler } from "@/components/BreakpointRuller";

import {
  responsiveImageGeneratorContent,
} from "@/content/landing/responsive-image-generator";
import {CodeSnippet} from "@/components/CodeSnippet";
import {OutputFiles} from "@/components/OutputFiles";

export const metadata: Metadata = {
  title: "Responsive Image Generator | Create srcset Images in Your Browser",
  description:
    "Generate responsive image sets for modern websites. Create multiple image sizes, WebP versions, and srcset markup directly in your browser. No uploads required.",
};

const sectionAlignments = ["left", "center", "right", "left"] as const;
const outputFiles = [
  {name: "hero-320.webp", label: "Mobile", size: "7 KB"},
  {name: "hero-640.webp", label: "Tablet", size: "24 KB"},
  {name: "hero-1024.webp", label: "Laptop", size: "58 KB"},
  {name: "hero-1920.webp", label: "Desktop", size: "158 KB"},
]

export default function ResponsiveImageGeneratorPage() {
  const content = responsiveImageGeneratorContent;

  const { hero, features, sections, cta, faq } = content;
  const currentSlug = "responsive-image-generator";

  return (
    <>
      <main>
        <section className="pt-16 pb-12 sm:pt-20 sm:pb-16">
          <div className="container">
            <Banner
              variant="hero"
              eyebrow="Browser-based · Private · Free"
              heading={hero.heading}
              description={hero.description}
              primaryCta={hero.primaryCta}
              secondaryCta={hero.secondaryCta}
              footer={<BreakpointRuler />}
            />
          </div>
        </section>

        <section className="py-16 bg-surface-subtle">
          <div className="container">
            <FeaturesGrid title={features.title} items={features.items} />
          </div>
        </section>

        <section id="tool" aria-label="Image generator" className="py-16">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Tool
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                Generate your images
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
                Upload, choose breakpoints, and download optimized files with
                markup.
              </p>
            </div>

            <div className="mt-8">
              <GeneratorApp initialSettings={content.toolDefaults} />
            </div>
          </div>
        </section>

        <section
          key={sections[0].id ?? sections[0].heading}
          id={sections[0].id}
          className="bg-surface-subtle py-16"
        >
          <div className="container">
            <Banner
              variant="cta"
              align="left"
              heading={sections[0].heading}
              description={sections[0].description}
            />
          </div>
        </section>

        <section id="tool" aria-label="Image generator" className="py-16">
          <div className="container">
            <div className="flex flex-col mx-auto max-w-2xl gap-y-6">
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                What this tool generates
              </h2>
              <p>
                Upload one or more images and this tool generates responsive breakpoints as a downloadable ZIP archive and ready-to-use HTML markup.
              </p>
              <OutputFiles title="Example outputs" items={outputFiles} />
              <CodeSnippet
                title="Generated markup"
                code={`<img
  src="hero-640.webp"
  srcset="
    hero-320.webp 320w,
    hero-640.webp 640w,
    hero-1024.webp 1024w,
    hero-1920.webp 1920w
  "
  sizes="100vw"
  alt="Hero image"
/>
`}
                language="html"
              />
            </div>
          </div>
        </section>

        <section
          key={sections[1].id ?? sections[1].heading}
          id={sections[1].id}
          className="py-16 bg-surface-subtle"
        >
          <div className="container">
            <Banner
              variant="cta"
              align="left"
              heading={sections[1].heading}
              description={sections[1].description}
            />
          </div>
        </section>

        <section
          key={sections[2].id ?? sections[2].heading}
          id={sections[2].id}
          className="py-16"
        >
          <div className="container">
            <Banner
              variant="cta"
              align="left"
              heading={sections[2].heading}
              description={sections[2].description}
            />
          </div>
        </section>

        {cta ? (
          <section className="py-16 bg-surface-subtle">
            <div className="container">
              <Banner
                variant="cta"
                heading={cta.heading}
                description={cta.description}
                primaryCta={cta.primaryCta}
              />
            </div>
          </section>
        ) : null}

        <section className="py-16">
          <div className="container max-w-2xl mx-auto">
            <FAQ title={faq.title} items={faq.items} />
          </div>
        </section>
      </main>

      <Footer currentPath={currentSlug ? `/${currentSlug}` : undefined} />
    </>
  );
}
