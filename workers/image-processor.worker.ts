import type { OutputFormat, ProcessJobRequest, WorkerResponse } from "@/lib/types";

type DetectedFormat = "jpeg" | "png" | "webp" | "avif" | "unknown";

function detectFormatFromName(fileName: string): DetectedFormat {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "jpeg";
    case "png":
      return "png";
    case "webp":
      return "webp";
    case "avif":
      return "avif";
    default:
      return "unknown";
  }
}

function detectFormatFromBytes(buffer: ArrayBuffer): DetectedFormat {
  const bytes = new Uint8Array(buffer.slice(0, 16));

  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "jpeg";
  }

  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "png";
  }

  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "webp";
  }

  if (
    bytes[4] === 0x66 &&
    bytes[5] === 0x74 &&
    bytes[6] === 0x79 &&
    bytes[7] === 0x70 &&
    bytes[8] === 0x61 &&
    bytes[9] === 0x76 &&
    bytes[10] === 0x69 &&
    bytes[11] === 0x66
  ) {
    return "avif";
  }

  return "unknown";
}

async function decodeWithBitmap(
  buffer: ArrayBuffer,
): Promise<ImageData | null> {
  if (
    typeof createImageBitmap !== "function" ||
    typeof OffscreenCanvas === "undefined"
  ) {
    return null;
  }

  const blob = new Blob([buffer]);
  const bitmap = await createImageBitmap(blob);
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const context = canvas.getContext("2d");

  if (!context) {
    bitmap.close();
    return null;
  }

  context.drawImage(bitmap, 0, 0);
  bitmap.close();
  return context.getImageData(0, 0, canvas.width, canvas.height);
}

async function decodeImage(
  buffer: ArrayBuffer,
  fileName: string,
): Promise<ImageData> {
  const detected =
    detectFormatFromName(fileName) === "unknown"
      ? detectFormatFromBytes(buffer)
      : detectFormatFromName(fileName);

  switch (detected) {
    case "jpeg": {
      const { decode } = await import("@jsquash/jpeg");
      const decoded = await decode(buffer);
      if (!decoded) {
        throw new Error(`Could not decode JPEG for ${fileName}`);
      }
      return decoded;
    }
    case "png": {
      const { decode } = await import("@jsquash/png");
      const decoded = await decode(buffer);
      if (!decoded) {
        throw new Error(`Could not decode PNG for ${fileName}`);
      }
      return decoded;
    }
    case "webp": {
      const { decode } = await import("@jsquash/webp");
      const decoded = await decode(buffer);
      if (!decoded) {
        throw new Error(`Could not decode WebP for ${fileName}`);
      }
      return decoded;
    }
    case "avif": {
      const { decode } = await import("@jsquash/avif");
      const decoded = await decode(buffer);
      if (!decoded) {
        throw new Error(`Could not decode AVIF for ${fileName}`);
      }
      return decoded;
    }
    default: {
      const fallback = await decodeWithBitmap(buffer);
      if (fallback) {
        return fallback;
      }
      throw new Error(`Unsupported input format for ${fileName}`);
    }
  }
}

function calculateTargetHeight(
  sourceWidth: number,
  sourceHeight: number,
  targetWidth: number,
): number {
  const scale = targetWidth / sourceWidth;
  return Math.max(1, Math.round(sourceHeight * scale));
}

async function resizeImage(
  imageData: ImageData,
  targetWidth: number,
): Promise<ImageData> {
  const targetHeight = calculateTargetHeight(
    imageData.width,
    imageData.height,
    targetWidth,
  );

  if (targetWidth === imageData.width && targetHeight === imageData.height) {
    return imageData;
  }

  const resize = (await import("@jsquash/resize")).default;
  return resize(imageData, {
    width: targetWidth,
    height: targetHeight,
    method: "lanczos3",
    fitMethod: "stretch",
  });
}

async function encodeImage(
  imageData: ImageData,
  format: OutputFormat,
  quality: number,
): Promise<ArrayBuffer> {
  switch (format) {
    case "webp": {
      const { encode } = await import("@jsquash/webp");
      return encode(imageData, { quality });
    }
    case "jpeg": {
      const { encode } = await import("@jsquash/jpeg");
      return encode(imageData, { quality });
    }
    case "png": {
      const { encode } = await import("@jsquash/png");
      return encode(imageData);
    }
    case "avif": {
      const { encode } = await import("@jsquash/avif");
      const cqLevel = Math.round(((100 - quality) / 100) * 63);
      return encode(imageData, { cqLevel });
    }
    default:
      throw new Error(`Unsupported output format: ${format satisfies never}`);
  }
}

async function processImageJob(
  buffer: ArrayBuffer,
  fileName: string,
  targetWidth: number,
  format: OutputFormat,
  quality: number,
) {
  const decoded = await decodeImage(buffer, fileName);

  if (targetWidth > decoded.width) {
    throw new Error(
      `Target width ${targetWidth}px exceeds source width ${decoded.width}px`,
    );
  }

  const resized = await resizeImage(decoded, targetWidth);
  const encoded = await encodeImage(resized, format, quality);

  return {
    buffer: encoded,
    width: resized.width,
    height: resized.height,
    byteSize: encoded.byteLength,
  };
}

self.onmessage = async (event: MessageEvent<ProcessJobRequest>) => {
  const message = event.data;

  if (message.type !== "process") {
    return;
  }

  try {
    const result = await processImageJob(
      message.buffer,
      message.fileName,
      message.targetWidth,
      message.format,
      message.quality,
    );

    const response: WorkerResponse = {
      type: "result",
      jobId: message.jobId,
      buffer: result.buffer,
      width: result.width,
      height: result.height,
      byteSize: result.byteSize,
    };

    self.postMessage(response, { transfer: [result.buffer] });
  } catch (error) {
    const response: WorkerResponse = {
      type: "error",
      jobId: message.jobId,
      message: error instanceof Error ? error.message : "Processing failed",
    };
    self.postMessage(response);
  }
};

export {};
