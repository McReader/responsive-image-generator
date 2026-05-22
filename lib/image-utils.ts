import type { SourceImage } from "@/lib/types";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE_BYTES } from "@/lib/types";

async function readImageDimensions(file: File): Promise<{ width: number; height: number }> {
  if (typeof createImageBitmap === "function") {
    const bitmap = await createImageBitmap(file);
    const dimensions = { width: bitmap.width, height: bitmap.height };
    bitmap.close();
    return dimensions;
  }

  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
      URL.revokeObjectURL(url);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Could not read dimensions for ${file.name}`));
    };

    image.src = url;
  });
}

export async function filesToSourceImages(
  files: File[],
  registerUrl: (url: string) => string,
): Promise<{ images: SourceImage[]; errors: string[] }> {
  const images: SourceImage[] = [];
  const errors: string[] = [];

  for (const file of files) {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      errors.push(`${file.name}: unsupported file type`);
      continue;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      errors.push(`${file.name}: exceeds 25 MB limit`);
      continue;
    }

    try {
      const { width, height } = await readImageDimensions(file);
      images.push({
        id: crypto.randomUUID(),
        file,
        name: file.name,
        previewUrl: registerUrl(URL.createObjectURL(file)),
        width,
        height,
      });
    } catch {
      errors.push(`${file.name}: could not read image`);
    }
  }

  return { images, errors };
}
