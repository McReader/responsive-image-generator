import Link from "next/link";
import {footerCompanyLinks, footerLegalLinks, siteName, siteTagline} from "@/content/site";
import {CookieSettingsButton} from "@/components/CookieConsent";

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
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="container">
        <div className="grid gap-10 py-12 sm:grid-cols-3">
          <div>
            <p className="text-[0.9375rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {siteName}
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {siteTagline}
            </p>
          </div>

          <FooterColumn title="Company" links={footerCompanyLinks} currentPath={currentPath} />
          <FooterColumn title="Legal" links={footerLegalLinks} currentPath={currentPath} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 py-6 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <span>© {new Date().getFullYear()} {siteName}. All rights reserved.</span>
          <CookieSettingsButton className="text-zinc-500 underline decoration-zinc-300 underline-offset-2 hover:text-zinc-900 hover:decoration-zinc-900 dark:text-zinc-400 dark:decoration-zinc-600 dark:hover:text-zinc-50 dark:hover:decoration-zinc-50" />
        </div>
      </div>
    </footer>
  );
}
