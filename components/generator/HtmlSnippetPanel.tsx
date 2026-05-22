"use client";

import { useMemo, useState } from "react";
import { buildImgSnippet } from "@/lib/html-snippets";
import type { ImageVariant } from "@/lib/types";

interface HtmlSnippetPanelProps {
  variants: ImageVariant[];
}

export function HtmlSnippetPanel({ variants }: HtmlSnippetPanelProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const grouped = useMemo(() => {
    return variants.reduce<Map<string, ImageVariant[]>>((acc, variant) => {
      const existing = acc.get(variant.sourceImageId) ?? [];
      existing.push(variant);
      acc.set(variant.sourceImageId, existing);
      return acc;
    }, new Map());
  }, [variants]);

  if (variants.length === 0) {
    return null;
  }

  const copySnippet = async (sourceImageId: string, snippet: string) => {
    await navigator.clipboard.writeText(snippet);
    setCopiedKey(sourceImageId);
    window.setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="mb-4 text-base font-semibold text-zinc-900 dark:text-zinc-100">
        HTML snippets
      </h2>

      <div className="space-y-4">
        {Array.from(grouped.entries()).map(([sourceImageId, sourceVariants]) => {
          const snippet = buildImgSnippet(sourceVariants);
          const sourceName = sourceVariants[0]?.sourceName ?? "image";

          return (
            <article
              key={sourceImageId}
              className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
            >
              <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
                <h3 className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {sourceName}
                </h3>
                <button
                  type="button"
                  onClick={() => void copySnippet(sourceImageId, snippet)}
                  className="rounded-md px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  {copiedKey === sourceImageId ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="overflow-x-auto bg-zinc-950 p-4 text-xs leading-6 text-zinc-100">
                <code>{snippet}</code>
              </pre>
            </article>
          );
        })}
      </div>
    </section>
  );
}
