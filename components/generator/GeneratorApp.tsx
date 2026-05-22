"use client";

import { useCallback, useMemo, useState } from "react";
import { DEFAULT_SELECTED_BREAKPOINTS } from "@/lib/breakpoints";
import { downloadAllVariantsAsZip } from "@/lib/download";
import type { GeneratorSettings, SourceImage } from "@/lib/types";
import { useImageProcessor } from "@/hooks/useImageProcessor";
import { useObjectUrls } from "@/hooks/useObjectUrls";
import { HtmlSnippetPanel } from "./HtmlSnippetPanel";
import { ImagePreviewGrid } from "./ImagePreviewGrid";
import { ResultsPanel } from "./ResultsPanel";
import { SettingsPanel } from "./SettingsPanel";
import { UploadZone } from "./UploadZone";

export function GeneratorApp() {
  const { register, revoke, revokeAll } = useObjectUrls();
  const {
    jobs,
    variants,
    isProcessing,
    progress,
    processImages,
    cancelProcessing,
    clearResults,
    formatBytes,
  } = useImageProcessor();

  const [images, setImages] = useState<SourceImage[]>([]);
  const [settings, setSettings] = useState<GeneratorSettings>({
    selectedBreakpoints: DEFAULT_SELECTED_BREAKPOINTS,
    format: "webp",
    quality: 80,
  });

  const canGenerate =
    images.length > 0 && settings.selectedBreakpoints.length > 0 && !isProcessing;

  const handleAddImages = useCallback(
    (nextImages: SourceImage[]) => {
      setImages((current) => [...current, ...nextImages]);
      clearResults();
    },
    [clearResults],
  );

  const handleRemoveImage = useCallback(
    (id: string) => {
      setImages((current) => {
        const target = current.find((image) => image.id === id);
        if (target) {
          revoke(target.previewUrl);
        }
        return current.filter((image) => image.id !== id);
      });
      clearResults();
    },
    [clearResults, revoke],
  );

  const handleClearAll = useCallback(() => {
    revokeAll();
    setImages([]);
    clearResults();
  }, [clearResults, revokeAll]);

  const handleGenerate = useCallback(() => {
    void processImages(images, settings);
  }, [images, processImages, settings]);

  const hasResults = variants.length > 0;

  const summaryText = useMemo(() => {
    if (images.length === 0) {
      return "Upload one or more images to get started.";
    }

    return `${images.length} image(s) ready · ${settings.selectedBreakpoints.length} breakpoint(s) selected`;
  }, [images.length, settings.selectedBreakpoints.length]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.9fr)]">
      <div className="min-w-0 space-y-6">
        <UploadZone
          images={images}
          onAddImages={handleAddImages}
          registerUrl={register}
        />
        <ImagePreviewGrid images={images} onRemove={handleRemoveImage} />
        <ResultsPanel
          variants={variants}
          jobs={jobs}
          isProcessing={isProcessing}
          progress={progress}
          formatBytes={formatBytes}
        />
        <HtmlSnippetPanel variants={variants} />
      </div>

      <div className="space-y-6">
        <SettingsPanel
          settings={settings}
          images={images}
          isProcessing={isProcessing}
          canGenerate={canGenerate}
          onSettingsChange={setSettings}
          onGenerate={handleGenerate}
          onCancel={cancelProcessing}
        />

        <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Session
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{summaryText}</p>
          <div className="mt-4 flex flex-col gap-3">
            {hasResults && (
              <button
                type="button"
                onClick={() => void downloadAllVariantsAsZip(variants)}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                Download all as ZIP
              </button>
            )}
            <button
              type="button"
              onClick={handleClearAll}
              disabled={images.length === 0 && !hasResults}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-zinc-300 px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Clear all
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
