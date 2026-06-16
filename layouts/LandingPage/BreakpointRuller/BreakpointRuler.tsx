import styles from "./BreakpointRuler.module.css";

const BREAKPOINTS = [320, 640, 1024, 1920] as const;
const MAX_WIDTH = BREAKPOINTS[BREAKPOINTS.length - 1];

export function BreakpointRuler() {
  return (
    <div aria-hidden className={styles.ruler}>
      <div className={styles.track}>
        {BREAKPOINTS.map((width) => (
          <span
            key={width}
            className={styles.tick}
            style={{ left: `${(width / MAX_WIDTH) * 100}%` }}
          >
            <span className={styles.mark} />
            <span className={styles.label}>{width}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
