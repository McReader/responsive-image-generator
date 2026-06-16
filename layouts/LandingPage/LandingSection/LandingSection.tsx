import type {PropsWithChildren} from "react";
import styles from "./LandingSection.module.css";

type LandingSectionProps = PropsWithChildren<{
  id?: string;
  ariaLabel?: string;
  className?: string;
}>;

export function LandingSection({ id, ariaLabel, className = "", children }: LandingSectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`${styles.section} ${className}`.trim()}
    >
      {children}
    </section>
  );
}
