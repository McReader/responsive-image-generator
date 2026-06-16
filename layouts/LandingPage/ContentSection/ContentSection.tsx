import type {ContentBlock, ContentSectionData} from "../types";
import styles from "./ContentSection.module.css";

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;

    case "list":
      return (
        <div>
          {block.title ? <h3>{block.title}</h3> : null}
          <ul>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      );

    case "code":
      return (
        <div className="mt-6">
          <h4>{block.title}</h4>
          <pre className={styles.code}>{block.content}</pre>
        </div>
      );

    case "comparison":
      return (
        <article className={styles.comparison}>
          <h3>{block.title}</h3>
          <p className="mt-3 text-sm font-medium">Advantages</p>
          <ul className="mt-2">
            {block.advantages.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm">
            <span className="font-medium">Best for:</span> {block.bestFor}
          </p>
        </article>
      );
  }
}

export function ContentSection({ heading, blocks }: ContentSectionData) {
  return (
    <>
      <h2 className={styles.heading}>{heading}</h2>
      <div className={`${styles.prose} mt-6`}>
        {blocks.map((block, index) => (
          <ContentBlockRenderer key={`${block.type}-${index}`} block={block} />
        ))}
      </div>
    </>
  );
}
