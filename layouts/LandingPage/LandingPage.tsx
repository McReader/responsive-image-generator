import {GeneratorApp} from "@/components/generator/GeneratorApp";
import {Banner} from "@/components/Banner";
import {FAQ} from "@/components/FAQ";
import {FeaturesGrid} from "@/components/FeaturesGrid";
import {Footer} from "@/components/Footer";
import {landingPages} from "@/content/landing";
import {ContentSection} from "./ContentSection";
import {BreakpointRuler} from "./BreakpointRuller";
import {LandingSection} from "./LandingSection";
import type {LandingPageContent} from "./types";
import styles from "./LandingPage.module.css";

type LandingPageProps = {
  content: LandingPageContent;
};

export function LandingPage({ content }: LandingPageProps) {
  const { hero, features, sections, cta, faq } = content;
  const currentSlug = landingPages.find((page) => page.content === content)?.slug;

  return (
    <>
      <main className={styles.page}>
        <LandingSection className="pt-16 pb-12 sm:pt-20 sm:pb-16">
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
        </LandingSection>

        <LandingSection tone="band">
          <div className="container">
            <FeaturesGrid title={features.title} items={features.items} />
          </div>
        </LandingSection>

        <LandingSection id="tool" ariaLabel="Image generator" tone="band">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Tool
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                Generate your images
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
                Upload, choose breakpoints, and download optimized files with markup.
              </p>
            </div>

            <div className={`${styles.toolShell} mt-8`}>
              <GeneratorApp initialSettings={content.toolDefaults} />
            </div>
          </div>
        </LandingSection>

        {sections.map((section) => (
          <LandingSection key={section.id ?? section.heading} id={section.id}>
            <div className="container">
              <ContentSection {...section} />
            </div>
          </LandingSection>
        ))}

        {cta ? (
          <LandingSection tone="band">
            <div className="container">
              <Banner
                variant="cta"
                heading={cta.heading}
                description={cta.description}
                primaryCta={cta.primaryCta}
              />
            </div>
          </LandingSection>
        ) : null}

        <LandingSection>
          <div className="container max-w-2xl mx-auto">
            <FAQ title={faq.title} items={faq.items} />
          </div>
        </LandingSection>
      </main>

      <Footer currentPath={currentSlug ? `/${currentSlug}` : undefined} />
    </>
  );
}
