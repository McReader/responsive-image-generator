import type {ReactNode} from "react";
import Link from "next/link";
import styles from "./Banner.module.css";

export type CtaLink = {
  label: string;
  href: string;
};

type BannerAlign = "left" | "center" | "right";

type BannerProps = {
  variant?: "hero" | "cta";
  align?: BannerAlign;
  eyebrow?: string;
  heading: string;
  description: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  footer?: ReactNode;
};

const alignTextClass: Record<BannerAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const alignCtaClass: Record<BannerAlign, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

export function Banner({
  variant = "hero",
  align = "center",
  eyebrow,
  heading,
  description,
  primaryCta,
  secondaryCta,
  footer,
}: BannerProps) {
  const HeadingTag = variant === "hero" ? "h1" : "h2";
  const isHero = variant === "hero";
  const enter = isHero ? styles.enter : "";

  return (
    <div className={`mx-auto max-w-2xl ${alignTextClass[align]}`}>
      {eyebrow ? (
        <p
          className={`text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400 ${enter}`}
        >
          {eyebrow}
        </p>
      ) : null}

      <HeadingTag
        className={`font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 text-balance ${
          isHero
            ? `mt-4 text-4xl sm:text-5xl ${enter} ${styles.enterDelay1}`
            : "text-2xl sm:text-3xl"
        }`}
      >
        {heading}
      </HeadingTag>

      <p
        className={`mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg text-pretty ${enter} ${styles.enterDelay2}`}
      >
        {description}
      </p>

      {primaryCta || secondaryCta ? (
        <div
          className={`mt-8 flex flex-wrap items-center gap-3 ${alignCtaClass[align]} ${enter} ${styles.enterDelay3}`}
        >
          {primaryCta ? (
            <Link className="button primary" href={primaryCta.href}>
              {primaryCta.label}
            </Link>
          ) : null}
          {secondaryCta ? (
            <Link className="button outlined" href={secondaryCta.href}>
              {secondaryCta.label}
            </Link>
          ) : null}
        </div>
      ) : null}

      {footer}
    </div>
  );
}
