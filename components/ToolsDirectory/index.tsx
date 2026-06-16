import type {LandingPageEntry} from "@/layouts/LandingPage/types";
import Link from "next/link";

type ToolsDirectoryProps = {
  title: string;
  description: string;
  pages: LandingPageEntry[];
};

export function ToolsDirectory({ title, description, pages }: ToolsDirectoryProps) {
  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Tools
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
          {description}
        </p>
      </div>

      <ul className="mt-10 grid list-none gap-4 p-0 m-0 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <li key={page.slug}>
            <Link
              href={`/${page.slug}`}
              className="group flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/80"
            >
              <h3 className="text-[0.9375rem] font-semibold tracking-tight text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-50 dark:group-hover:text-zinc-200">
                {page.content.hero.heading}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {page.content.hero.description}
              </p>
              {page.tags?.length ? (
                <ul className="mt-4 flex list-none flex-wrap gap-2 p-0 m-0">
                  {page.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
