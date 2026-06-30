import Link from "next/link";
import {landingPages} from "@/content/landing";
import {footerCompanyLinks, footerLegalLinks, siteName, siteTagline} from "@/content/site";
import {LandingContainer} from "@/layouts/LandingPage/LandingContainer";

function FooterColumn({
  title,
  links,
  currentPath,
}: {
  title: string;
  links: { label: string; href: string }[];
  currentPath?: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        {title}
      </p>
      <ul className="mt-4 list-none space-y-3 p-0 m-0">
        {links.map((link) =>
          link.href === currentPath ? (
            <li key={link.href}>
              <span
                aria-current="page"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
              >
                {link.label}
              </span>
            </li>
          ) : (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                {link.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

type FooterProps = {
  currentPath?: string;
};

export function Footer({ currentPath }: FooterProps) {
  const toolLinks = [
    { label: "All tools", href: "/" },
    ...landingPages.map((page) => ({
      label: page.content.hero.heading,
      href: `/${page.slug}`,
    })),
  ];

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <LandingContainer>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-[0.9375rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {siteName}
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {siteTagline}
            </p>
          </div>

          <FooterColumn title="Tools" links={toolLinks} currentPath={currentPath} />
          <FooterColumn title="Company" links={footerCompanyLinks} currentPath={currentPath} />
          <FooterColumn title="Legal" links={footerLegalLinks} currentPath={currentPath} />
        </div>

        <div className="border-t border-zinc-200 py-6 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>
      </LandingContainer>
    </footer>
  );
}
