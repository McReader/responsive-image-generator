import type {PropsWithChildren} from "react";
import styles from "./LandingContainer.module.css";

type LandingContainerProps = PropsWithChildren<{
  narrow?: boolean;
  className?: string;
}>;

export function LandingContainer({ narrow = false, className = "", children }: LandingContainerProps) {
  return (
    <div
      className={`${styles.container} ${narrow ? styles.narrow : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
