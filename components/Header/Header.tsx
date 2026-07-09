"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { IoChevronDown, IoClose, IoMenu } from "react-icons/io5";
import { siteName, siteShortName } from "@/content/site";
import { getToolNavLinks } from "@/lib/navigation";
import { Logo } from "./Logo";

const navLinkClass =
  "text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50";

const navLinkActiveClass =
  "text-sm font-medium text-zinc-900 dark:text-zinc-50";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const toolsMenuId = useId();
  const mobileMenuId = useId();
  const toolsRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolLinks = getToolNavLinks();
  const activeTool = toolLinks.find(
    (link) => link.href !== "/" && isActivePath(pathname, link.href),
  );

  useEffect(() => {
    setMobileOpen(false);
    setToolsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!toolsOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!toolsRef.current?.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setToolsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [toolsOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/85 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/85">
      <div className="container flex h-14 items-center justify-between md:justify-start gap-4 sm:h-16">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-zinc-50"
          aria-label={`${siteName} home`}
        >
          <Logo />
          <span className="truncate text-[0.9375rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            <span className="sm:hidden">{siteShortName}</span>
            <span className="hidden sm:inline">{siteName}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          <div className="relative" ref={toolsRef}>
            <button
              type="button"
              className={`inline-flex items-center gap-1 rounded-md px-3 py-2 ${
                activeTool ? navLinkActiveClass : navLinkClass
              } hover:text-zinc-900 dark:hover:text-zinc-50`}
              aria-expanded={toolsOpen}
              aria-haspopup="true"
              aria-controls={toolsMenuId}
              onClick={() => setToolsOpen((open) => !open)}
            >
              {activeTool ? activeTool.label : "Tools"}
              <IoChevronDown
                className={`h-4 w-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            {toolsOpen ? (
              <div
                id={toolsMenuId}
                role="menu"
                className="absolute right-0 top-full z-50 mt-1 min-w-[16rem] rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
              >
                {toolLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    className={`block rounded-lg px-3 py-2 ${
                      isActivePath(pathname, link.href)
                        ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-50"
                    }`}
                    onClick={() => setToolsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          aria-expanded={mobileOpen}
          aria-controls={mobileMenuId}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <IoClose className="h-5 w-5" aria-hidden="true" />
          ) : (
            <IoMenu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {mobileOpen ? (
        <nav
          id={mobileMenuId}
          className="border-t border-zinc-200 bg-white md:hidden dark:border-zinc-800 dark:bg-zinc-950"
          aria-label="Main"
        >
          <div className="space-y-1 py-3">
            <p className="px-3 py-2 text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Tools
            </p>
            {toolLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-lg px-3 py-2.5 ${
                  isActivePath(pathname, link.href)
                    ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                    : navLinkClass
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
