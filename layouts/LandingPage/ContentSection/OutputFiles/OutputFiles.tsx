import {IoImageOutline} from "react-icons/io5";
import type {CSSProperties} from "react";
import type {OutputFile} from "../../types";
import styles from "./OutputFiles.module.css";

function formatOf(name: string): string {
  return /\.([a-z0-9]+)$/i.exec(name)?.[1].toUpperCase() ?? "";
}

function widthOf(name: string): number | null {
  const match = /-(\d{3,4})\./i.exec(name);

  return match ? Number(match[1]) : null;
}

function sizeKb(size?: string): number {
  if (!size) return 0;
  const match = /([\d.]+)\s*([a-z]+)/i.exec(size);

  if (!match) return 0;
  const value = Number(match[1]);
  const unit = match[2].toLowerCase();

  if (unit === "mb") return value * 1024;
  if (unit === "gb") return value * 1024 * 1024;

  return value;
}

type OutputFilesProps = {
  title?: string;
  items: OutputFile[];
};

export function OutputFiles({ title, items }: OutputFilesProps) {
  const widths = items.map((item) => widthOf(item.name) ?? 0);
  const maxWidth = Math.max(...widths, 1);
  const maxSize = Math.max(...items.map((item) => sizeKb(item.size)), 1);

  return (
    <div>
      {title ? <p className={styles.title}>{title}</p> : null}
      <ul className={styles.grid}>
        {items.map((item) => {
          const width = widthOf(item.name);
          const scale = width ? Math.max(0.35, width / maxWidth) : 1;

          return (
            <li key={item.name} className={styles.card}>
              <span
                className={styles.thumb}
                style={{"--file-scale": scale} as CSSProperties}
              >
                <IoImageOutline aria-hidden="true" />
                {width ? <span className={styles.width}>{width}px</span> : null}
              </span>
              <span className={styles.meta}>
                <code className={styles.name}>{item.name}</code>
                <span className={styles.note}>
                  {formatOf(item.name) ? (
                    <span className={styles.format}>{formatOf(item.name)}</span>
                  ) : null}
                  {item.label ? <span>{item.label}</span> : null}
                </span>
                {item.size ? (
                  <span className={styles.sizeRow}>
                    <span className={styles.sizeBar}>
                      <span
                        className={styles.sizeBarFill}
                        style={
                          {
                            "--size-scale": Math.max(0.03, sizeKb(item.size) / maxSize),
                          } as CSSProperties
                        }
                      />
                    </span>
                    <span className={styles.sizeLabel}>{item.size}</span>
                  </span>
                ) : null}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
