import Link from "next/link";
import type {ReactNode} from "react";
import {Footer} from "@/components/Footer";
import {LandingSection} from "@/layouts/LandingPage/LandingSection";
import pageStyles from "@/layouts/LandingPage/LandingPage.module.css";

export const legalBodyText =
  "text-sm leading-relaxed text-zinc-600 dark:text-zinc-400";

export const legalLinkClass =
  "text-zinc-900 underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-900 dark:text-zinc-50 dark:decoration-zinc-600 dark:hover:decoration-zinc-50";

type TocItem = {
  id: string;
  heading: string;
};

type LegalDocumentShellProps = {
  title: string;
  lastUpdated: string;
  intro: ReactNode;
  toc: TocItem[];
  currentPath: string;
  children: ReactNode;
};

export function LegalDocumentShell({
  title,
  lastUpdated,
  intro,
  toc,
  currentPath,
  children,
}: LegalDocumentShellProps) {
  return (
    <>
      <main className={pageStyles.page}>
        <LandingSection className="pt-16 pb-12 sm:pt-20 sm:pb-16">
          <div className="container">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Legal
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
              Last updated: {lastUpdated}
            </p>

            <div className="mt-8 space-y-4">{intro}</div>

            <nav
              aria-label="Table of contents"
              className="mt-10 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Table of contents
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 marker:text-zinc-400 dark:marker:text-zinc-500">
                {toc.map((item) => (
                  <li key={item.id} className="text-sm">
                    <Link
                      href={`#${item.id}`}
                      className="text-zinc-900 hover:underline dark:text-zinc-50"
                    >
                      {item.heading}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </LandingSection>

        <LandingSection tone="band">
          <div className="container">
            <div className="grid gap-12 sm:gap-14">{children}</div>
          </div>
        </LandingSection>
      </main>

      <Footer currentPath={currentPath} />
    </>
  );
}

type LegalSectionProps = {
  id: string;
  heading: string;
  children: ReactNode;
};

export function LegalSection({ id, heading, children }: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-6">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
        {heading}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}
