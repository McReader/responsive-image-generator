import { buildSrcset, getLargestVariant } from "@/lib/naming";
import type { ImageVariant } from "@/lib/types";

const DEFAULT_SIZES = "(max-width: 768px) 100vw, 50vw";

export function buildImgSnippet(
  variants: ImageVariant[],
  options?: { alt?: string; sizes?: string },
): string {
  if (variants.length === 0) {
    return "";
  }

  const sorted = variants.slice().sort((a, b) => a.width - b.width);
  const largest = getLargestVariant(sorted)!;
  const alt = options?.alt ?? "";
  const sizes = options?.sizes ?? DEFAULT_SIZES;

  return `<img
  src="${largest.fileName}"
  srcset="${buildSrcset(sorted)}"
  sizes="${sizes}"
  alt="${alt}"
  width="${largest.width}"
  height="${largest.height}"
  loading="lazy"
  decoding="async"
/>`;
}

export function buildAllSnippets(
  variantsBySource: Map<string, ImageVariant[]>,
): string {
  return Array.from(variantsBySource.values())
    .map((variants) => buildImgSnippet(variants))
    .filter(Boolean)
    .join("\n\n");
}
