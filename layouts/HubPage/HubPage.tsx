import {Banner} from "@/components/Banner";
import {FAQ} from "@/components/FAQ";
import {FeaturesGrid} from "@/components/FeaturesGrid";
import {Footer} from "@/components/Footer";
import {ToolsDirectory} from "@/components/ToolsDirectory";
import type {HubPageContent, LandingPageEntry} from "@/layouts/LandingPage/types";
import {LandingContainer} from "@/layouts/LandingPage/LandingContainer";
import {LandingSection} from "@/layouts/LandingPage/LandingSection";
import styles from "@/layouts/LandingPage/LandingPage.module.css";

type HubPageProps = {
  content: HubPageContent;
  landingPages: LandingPageEntry[];
};

export function HubPage({ content, landingPages }: HubPageProps) {
  const { hero, trust, tools, howItWorks, faq } = content;

  return (
    <>
      <main className={styles.page}>
        <LandingSection className="pt-16 pb-12 sm:pt-20 sm:pb-16">
          <LandingContainer>
            <Banner
              variant="hero"
              eyebrow={hero.eyebrow}
              heading={hero.heading}
              description={hero.description}
              primaryCta={hero.primaryCta}
            />
          </LandingContainer>
        </LandingSection>

        <LandingSection tone="band">
          <LandingContainer>
            <FeaturesGrid title={trust.title} items={trust.items} eyebrow="Trust" />
          </LandingContainer>
        </LandingSection>

        <LandingSection id="tools" ariaLabel="Image tools" tone="band">
          <LandingContainer>
            <ToolsDirectory
              title={tools.title}
              description={tools.description}
              pages={landingPages}
            />
          </LandingContainer>
        </LandingSection>

        <LandingSection>
          <LandingContainer narrow>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Workflow
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                {howItWorks.title}
              </h2>

              <ol className="mt-8 grid list-none gap-6 p-0 m-0 sm:grid-cols-3">
                {howItWorks.steps.map((step, index) => (
                  <li
                    key={step.title}
                    className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <span className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                      Step {index + 1}
                    </span>
                    <h3 className="mt-2 text-[0.9375rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </LandingContainer>
        </LandingSection>

        <LandingSection>
          <LandingContainer narrow>
            <FAQ title={faq.title} items={faq.items} />
          </LandingContainer>
        </LandingSection>
      </main>

      <Footer currentPath="/" />
    </>
  );
}
