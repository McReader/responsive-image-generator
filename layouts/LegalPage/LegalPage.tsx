import Link from "next/link";
import {Footer} from "@/components/Footer";
import {LandingSection} from "@/layouts/LandingPage/LandingSection";
import pageStyles from "@/layouts/LandingPage/LandingPage.module.css";
import type {LegalBlock, LegalPageContent, RichText} from "@/content/legal/types";

const bodyText = "text-sm leading-relaxed text-zinc-600 dark:text-zinc-400";

function RichTextRenderer({ content }: { content: RichText }) {
  return (
    <>
      {content.map((segment, index) => {
        if (typeof segment === "string") {
          return <span key={index}>{segment}</span>;
        }

        if ("href" in segment) {
          return (
            <a
              key={index}
              href={segment.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-900 underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-900 dark:text-zinc-50 dark:decoration-zinc-600 dark:hover:decoration-zinc-50"
            >
              {segment.text}
            </a>
          );
        }

        return (
          <strong key={index} className="font-semibold text-zinc-900 dark:text-zinc-50">
            {segment.bold}
          </strong>
        );
      })}
    </>
  );
}

function LegalBlockRenderer({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className={bodyText}>
          <RichTextRenderer content={block.content} />
        </p>
      );

    case "list":
      return (
        <ul className={`${bodyText} list-disc space-y-2 pl-5 marker:text-zinc-300 dark:marker:text-zinc-600`}>
          {block.items.map((item, index) => (
            <li key={index}>
              <RichTextRenderer content={item} />
            </li>
          ))}
        </ul>
      );

    case "subheading":
      return (
        <h3 className="text-[0.9375rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {block.text}
        </h3>
      );

    case "fields":
      return (
        <dl className="grid gap-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
          {block.items.map((field) => (
            <div key={field.label} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-900 dark:text-zinc-50">
                {field.label}
              </dt>
              <dd className={`${bodyText} m-0`}>
                <RichTextRenderer content={field.value} />
              </dd>
            </div>
          ))}
        </dl>
      );
  }
}

type LegalPageProps = {
  content: LegalPageContent;
  currentPath: string;
};

export function LegalPage({ content, currentPath }: LegalPageProps) {
  return (
    <>
      <main className={pageStyles.page}>
        <LandingSection className="pt-16 pb-12 sm:pt-20 sm:pb-16">
          <div className="container">
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Legal
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {content.title}
            </h1>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
              Last updated: {content.lastUpdated}
            </p>

            <div className="mt-8 space-y-4">
              {content.intro.map((paragraph, index) => (
                <p key={index} className={bodyText}>
                  <RichTextRenderer content={paragraph} />
                </p>
              ))}
            </div>

            <nav
              aria-label="Table of contents"
              className="mt-10 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Table of contents
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 marker:text-zinc-400 dark:marker:text-zinc-500">
                {content.sections.map((section) => (
                  <li key={section.id} className="text-sm">
                    <Link
                      href={`#${section.id}`}
                      className="text-zinc-900 hover:underline dark:text-zinc-50"
                    >
                      {section.heading}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </LandingSection>

        <LandingSection tone="band">
          <div className="container">
            <div className="grid gap-12 sm:gap-14">
              {content.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-6">
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.blocks.map((block, index) => (
                      <LegalBlockRenderer key={index} block={block} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </LandingSection>
      </main>

      <Footer currentPath={currentPath} />
    </>
  );
}
