import JSZip from "jszip";
import type { ImageVariant } from "@/lib/types";
import { buildAllSnippets } from "@/lib/html-snippets";
import { getBaseName } from "@/lib/breakpoints";

function triggerDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function downloadBlob(blob: Blob, fileName: string) {
  triggerDownload(blob, fileName);
}

async function addVariantsToZip(
  zip: JSZip,
  variants: ImageVariant[],
  folderName?: string,
) {
  for (const variant of variants) {
    const path = folderName
      ? `${folderName}/${variant.fileName}`
      : variant.fileName;
    zip.file(path, variant.blob);
  }
}

export async function downloadVariantsAsZip(
  variants: ImageVariant[],
  zipName: string,
  options?: { includeSnippets?: boolean; groupBySource?: boolean },
) {
  const zip = new JSZip();

  if (options?.groupBySource) {
    const grouped = new Map<string, ImageVariant[]>();
    for (const variant of variants) {
      const key = variant.sourceImageId;
      const existing = grouped.get(key) ?? [];
      existing.push(variant);
      grouped.set(key, existing);
    }

    for (const [, sourceVariants] of grouped) {
      const folderName = getBaseName(sourceVariants[0]?.sourceName ?? "image");
      await addVariantsToZip(zip, sourceVariants, folderName);
    }

    if (options.includeSnippets) {
      zip.file("snippets.html", buildAllSnippets(grouped));
    }
  } else {
    await addVariantsToZip(zip, variants);
  }

  const blob = await zip.generateAsync({ type: "blob" });
  triggerDownload(blob, zipName);
}

export async function downloadSourceVariantsAsZip(
  sourceName: string,
  variants: ImageVariant[],
) {
  const folderName = getBaseName(sourceName);
  await downloadVariantsAsZip(variants, `${folderName}-variants.zip`, {
    groupBySource: true,
  });
}

export async function downloadAllVariantsAsZip(variants: ImageVariant[]) {
  await downloadVariantsAsZip(variants, "responsive-images.zip", {
    groupBySource: true,
    includeSnippets: true,
  });
}
