import { landingPages } from "@/content/landing";

export type NavLink = {
  label: string;
  href: string;
};

export function getToolNavLinks(): NavLink[] {
  return [
    { label: "All tools", href: "/" },
    ...landingPages.map((page) => ({
      label: page.content.hero.heading,
      href: `/${page.slug}`,
    })),
  ];
}
