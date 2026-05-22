"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getApplicableBreakpoints, getBaseName } from "@/lib/breakpoints";
import { buildVariantFileName } from "@/lib/naming";
import type {
  GeneratorSettings,
  ImageVariant,
  ProcessJob,
  SourceImage,
  WorkerResponse,
} from "@/lib/types";

function getConcurrencyLimit() {
  const cores = typeof navigator !== "undefined" ? navigator.hardwareConcurrency : 4;
  return Math.max(1, Math.min(2, Math.floor(cores / 2) || 1));
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function useImageProcessor() {
  const workerRef = useRef<Worker | null>(null);
  const pendingResolversRef = useRef(
    new Map<
      string,
      {
        resolve: (value: WorkerResponse) => void;
        reject: (reason?: unknown) => void;
      }
    >(),
  );
  const cancelledRef = useRef(false);
  const variantUrlsRef = useRef<Set<string>>(new Set());

  const [jobs, setJobs] = useState<ProcessJob[]>([]);
  const [variants, setVariants] = useState<ImageVariant[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const createWorker = useCallback(() => {
    workerRef.current?.terminate();
    const worker = new Worker(
      new URL("../workers/image-processor.worker.ts", import.meta.url),
    );

    worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
      const resolver = pendingResolversRef.current.get(event.data.jobId);
      if (!resolver) {
        return;
      }

      pendingResolversRef.current.delete(event.data.jobId);
      resolver.resolve(event.data);
    };

    worker.onerror = () => {
      for (const [, resolver] of pendingResolversRef.current) {
        resolver.reject(new Error("Image worker crashed"));
      }
      pendingResolversRef.current.clear();
    };

    workerRef.current = worker;
    return worker;
  }, []);

  useEffect(() => {
    createWorker();
    return () => {
      workerRef.current?.terminate();
      const urlsToRevoke = variantUrlsRef.current;
      for (const url of urlsToRevoke) {
        URL.revokeObjectURL(url);
      }
      urlsToRevoke.clear();
    };
  }, [createWorker]);

  const runJob = useCallback(
    async (job: ProcessJob, sourceImage: SourceImage) => {
      const worker = workerRef.current ?? createWorker();
      const buffer = await sourceImage.file.arrayBuffer();

      return new Promise<WorkerResponse>((resolve, reject) => {
        pendingResolversRef.current.set(job.id, { resolve, reject });
        worker.postMessage(
          {
            type: "process",
            jobId: job.id,
            buffer,
            fileName: sourceImage.name,
            targetWidth: job.targetWidth,
            format: job.format,
            quality: job.quality,
          },
          { transfer: [buffer] },
        );
      });
    },
    [createWorker],
  );

  const clearResults = useCallback(() => {
    for (const url of variantUrlsRef.current) {
      URL.revokeObjectURL(url);
    }
    variantUrlsRef.current.clear();
    setVariants([]);
    setJobs([]);
    setProgress(0);
  }, []);

  const cancelProcessing = useCallback(() => {
    cancelledRef.current = true;
    workerRef.current?.terminate();
    pendingResolversRef.current.clear();
    createWorker();
    setIsProcessing(false);
  }, [createWorker]);

  const processImages = useCallback(
    async (images: SourceImage[], settings: GeneratorSettings) => {
      if (images.length === 0 || settings.selectedBreakpoints.length === 0) {
        return;
      }

      cancelledRef.current = false;
      clearResults();
      setIsProcessing(true);

      const nextJobs: ProcessJob[] = [];

      for (const image of images) {
        const applicable = getApplicableBreakpoints(
          settings.selectedBreakpoints,
          image.width,
        );

        for (const targetWidth of applicable) {
          nextJobs.push({
            id: crypto.randomUUID(),
            sourceImageId: image.id,
            sourceName: image.name,
            targetWidth,
            format: settings.format,
            quality: settings.quality,
            status: "pending",
          });
        }
      }

      if (nextJobs.length === 0) {
        setIsProcessing(false);
        return;
      }

      setJobs(nextJobs);

      const imageMap = new Map(images.map((image) => [image.id, image]));
      let completedCount = 0;
      const concurrency = getConcurrencyLimit();
      let cursor = 0;

      const handleJob = async (job: ProcessJob) => {
        if (cancelledRef.current) {
          return;
        }

        setJobs((current) =>
          current.map((entry) =>
            entry.id === job.id ? { ...entry, status: "processing" } : entry,
          ),
        );

        const sourceImage = imageMap.get(job.sourceImageId);
        if (!sourceImage) {
          setJobs((current) =>
            current.map((entry) =>
              entry.id === job.id
                ? { ...entry, status: "error", error: "Source image missing" }
                : entry,
            ),
          );
          completedCount += 1;
          setProgress(Math.round((completedCount / nextJobs.length) * 100));
          return;
        }

        try {
          const response = await runJob(job, sourceImage);

          if (response.type === "error") {
            throw new Error(response.message);
          }

          const blob = new Blob([response.buffer], {
            type: `image/${job.format}`,
          });
          const previewUrl = URL.createObjectURL(blob);
          variantUrlsRef.current.add(previewUrl);

          const baseName = getBaseName(sourceImage.name);
          const variant: ImageVariant = {
            id: crypto.randomUUID(),
            sourceImageId: job.sourceImageId,
            sourceName: job.sourceName,
            fileName: buildVariantFileName(baseName, response.width, job.format),
            width: response.width,
            height: response.height,
            format: job.format,
            quality: job.quality,
            byteSize: response.byteSize,
            blob,
            previewUrl,
          };

          setVariants((current) => [...current, variant]);
          setJobs((current) =>
            current.map((entry) =>
              entry.id === job.id ? { ...entry, status: "done" } : entry,
            ),
          );
        } catch (error) {
          setJobs((current) =>
            current.map((entry) =>
              entry.id === job.id
                ? {
                    ...entry,
                    status: "error",
                    error:
                      error instanceof Error ? error.message : "Processing failed",
                  }
                : entry,
            ),
          );
        } finally {
          completedCount += 1;
          setProgress(Math.round((completedCount / nextJobs.length) * 100));
        }
      };

      const workers = Array.from({ length: concurrency }, async () => {
        while (cursor < nextJobs.length && !cancelledRef.current) {
          const job = nextJobs[cursor];
          cursor += 1;
          if (!job) {
            break;
          }
          await handleJob(job);
        }
      });

      await Promise.all(workers);
      setIsProcessing(false);
    },
    [clearResults, runJob],
  );

  return {
    jobs,
    variants,
    isProcessing,
    progress,
    processImages,
    cancelProcessing,
    clearResults,
    formatBytes,
  };
}
