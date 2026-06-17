import type {PropsWithChildren} from "react";
import styles from "./LandingSection.module.css";

type LandingSectionTone = "default" | "band";

type LandingSectionProps = PropsWithChildren<{
  id?: string;
  ariaLabel?: string;
  className?: string;
  tone?: LandingSectionTone;
}>;

export function LandingSection({
  id,
  ariaLabel,
  className = "",
  tone = "default",
  children,
}: LandingSectionProps) {
  const toneClass = tone === "band" ? styles.band : "";

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`${styles.section} ${toneClass} ${className}`.trim()}
    >
      {children}
    </section>
  );
}
