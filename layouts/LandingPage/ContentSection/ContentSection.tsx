import type {ContentBlock, ContentSectionData} from "../types";
import {OutputFiles} from "./OutputFiles";
import {CodeSnippet} from "@/components/CodeSnippet";
import styles from "./ContentSection.module.css";

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className={styles.paragraph}>{block.text}</p>;

    case "list":
      return (
        <div className={styles.listBlock}>
          {block.title ? <h3 className={styles.blockTitle}>{block.title}</h3> : null}
          <ul className={styles.list}>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      );

    case "code":
      return (
        <CodeSnippet
          title={block.title}
          code={block.content}
          language="html"
        />
      );

    case "files":
      return <OutputFiles title={block.title} items={block.items} />;

    case "comparison":
      return (
        <article className={styles.comparison}>
          <h3 className={styles.blockTitle}>{block.title}</h3>
          <ul className={styles.list}>
            {block.advantages.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={styles.bestFor}>
            <span className="font-medium">Best for:</span> {block.bestFor}
          </p>
        </article>
      );
  }
}

export function ContentSection({
  heading,
  blocks,
  sectionNumber,
}: ContentSectionData & { sectionNumber?: number }) {
  return (
    <div className={styles.content}>
      <div className={styles.headingRow}>
        {sectionNumber ? (
          <span className={styles.number} aria-hidden="true">
            {String(sectionNumber).padStart(2, "0")}
          </span>
        ) : null}
        <h2 className={styles.heading}>{heading}</h2>
      </div>
      <div className={styles.prose}>
        {blocks.map((block, index) => (
          <ContentBlockRenderer key={`${block.type}-${index}`} block={block} />
        ))}
      </div>
    </div>
  );
}
