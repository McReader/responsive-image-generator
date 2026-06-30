import {GeneratorApp} from "@/components/generator/GeneratorApp";
import {Banner} from "@/components/Banner";
import {FAQ} from "@/components/FAQ";
import {FeaturesGrid} from "@/components/FeaturesGrid";
import {Footer} from "@/components/Footer";
import {landingPages} from "@/content/landing";
import {ContentSection} from "./ContentSection";
import {BreakpointRuler} from "./BreakpointRuller";
import {LandingContainer} from "./LandingContainer";
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
          <LandingContainer>
            <Banner
              variant="hero"
              eyebrow="Browser-based · Private · Free"
              heading={hero.heading}
              description={hero.description}
              primaryCta={hero.primaryCta}
              secondaryCta={hero.secondaryCta}
              footer={<BreakpointRuler />}
            />
          </LandingContainer>
        </LandingSection>

        <LandingSection tone="band">
          <LandingContainer>
            <FeaturesGrid title={features.title} items={features.items} />
          </LandingContainer>
        </LandingSection>

        <LandingSection id="tool" ariaLabel="Image generator" tone="band">
          <LandingContainer>
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
          </LandingContainer>
        </LandingSection>

        {sections.map((section) => (
          <LandingSection key={section.id ?? section.heading} id={section.id}>
            <LandingContainer narrow>
              <ContentSection {...section} />
            </LandingContainer>
          </LandingSection>
        ))}

        {cta ? (
          <LandingSection tone="band">
            <LandingContainer narrow>
              <Banner
                variant="cta"
                heading={cta.heading}
                description={cta.description}
                primaryCta={cta.primaryCta}
              />
            </LandingContainer>
          </LandingSection>
        ) : null}

        <LandingSection>
          <LandingContainer narrow>
            <FAQ title={faq.title} items={faq.items} />
          </LandingContainer>
        </LandingSection>
      </main>

      <Footer currentPath={currentSlug ? `/${currentSlug}` : undefined} />
    </>
  );
}
