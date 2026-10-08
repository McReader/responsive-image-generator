import { Metadata } from "next";

import { GeneratorApp } from "@/components/generator/GeneratorApp";
import { Banner } from "@/components/Banner";
import { FAQ } from "@/components/FAQ";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { Footer } from "@/components/Footer";
import { BreakpointRuler } from "@/components/BreakpointRuller";

import {
  responsiveImageGeneratorContent,
  responsiveImageGeneratorMetadata,
} from "@/content/landing/responsive-image-generator";

export const metadata: Metadata = responsiveImageGeneratorMetadata;

const sectionAlignments = ["left", "center", "right", "left"] as const;

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

        <section className="py-16 bg-gray-300 dark:bg-zinc-900">
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

        {sections.map((section, index) => (
          <section
            key={section.id ?? section.heading}
            id={section.id}
            className={
              index % 2 === 1
                ? "py-16 bg-gray-300 dark:bg-zinc-900"
                : "py-16"
            }
          >
            <div className="container">
              <Banner
                variant="cta"
                align={sectionAlignments[index]}
                heading={section.heading}
                description={section.description}
              />
            </div>
          </section>
        ))}

        {cta ? (
          <section className="py-16 bg-gray-300 dark:bg-zinc-900">
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
