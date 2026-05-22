import type { ImageVariant } from "@/lib/types";

export function getFormatExtension(format: ImageVariant["format"]): string {
  return format;
}

export function buildVariantFileName(
  baseName: string,
  width: number,
  format: ImageVariant["format"],
): string {
  return `${baseName}-${width}w.${getFormatExtension(format)}`;
}

export function buildSrcset(variants: ImageVariant[]): string {
  return variants
    .slice()
    .sort((a, b) => a.width - b.width)
    .map((variant) => `${variant.fileName} ${variant.width}w`)
    .join(", ");
}

export function getLargestVariant(variants: ImageVariant[]): ImageVariant | undefined {
  return variants.slice().sort((a, b) => b.width - a.width)[0];
}
