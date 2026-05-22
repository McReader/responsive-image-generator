export type OutputFormat = "webp" | "jpeg" | "png" | "avif";

export type JobStatus = "pending" | "processing" | "done" | "error";

export interface SourceImage {
  id: string;
  file: File;
  name: string;
  previewUrl: string;
  width: number;
  height: number;
}

export interface GeneratorSettings {
  selectedBreakpoints: number[];
  format: OutputFormat;
  quality: number;
}

export interface ProcessJob {
  id: string;
  sourceImageId: string;
  sourceName: string;
  targetWidth: number;
  format: OutputFormat;
  quality: number;
  status: JobStatus;
  error?: string;
}

export interface ImageVariant {
  id: string;
  sourceImageId: string;
  sourceName: string;
  fileName: string;
  width: number;
  height: number;
  format: OutputFormat;
  quality: number;
  byteSize: number;
  blob: Blob;
  previewUrl: string;
}

export interface ProcessJobRequest {
  type: "process";
  jobId: string;
  buffer: ArrayBuffer;
  fileName: string;
  targetWidth: number;
  format: OutputFormat;
  quality: number;
}

export interface ProcessJobResult {
  type: "result";
  jobId: string;
  buffer: ArrayBuffer;
  width: number;
  height: number;
  byteSize: number;
}

export interface ProcessJobError {
  type: "error";
  jobId: string;
  message: string;
}

export type WorkerResponse = ProcessJobResult | ProcessJobError;

export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;
export const MAX_FILE_COUNT = 50;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
];
