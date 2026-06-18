import type {ReactNode} from "react";
import Link from "next/link";
import styles from "./Banner.module.css";

export type CtaLink = {
  label: string;
  href: string;
};

type BannerProps = {
  variant?: "hero" | "cta";
  eyebrow?: string;
  heading: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  footer?: ReactNode;
};

export function Banner({
  variant = "hero",
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
    <div className="mx-auto max-w-2xl text-center">
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

      <div
        className={`mt-8 flex flex-wrap items-center justify-center gap-3 ${enter} ${styles.enterDelay3}`}
      >
        <Link className="button primary" href={primaryCta.href}>
          {primaryCta.label}
        </Link>
        {secondaryCta ? (
          <Link className="button outlined" href={secondaryCta.href}>
            {secondaryCta.label}
          </Link>
        ) : null}
      </div>

      {footer}
    </div>
  );
}
