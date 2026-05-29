"use client";

import {useCallback, useState} from "react";
import {DEFAULT_SELECTED_BREAKPOINTS} from "@/lib/breakpoints";
import type {GeneratorSettings, SourceImage} from "@/lib/types";
import {useImageProcessor} from "@/hooks/useImageProcessor";
import {useObjectUrls} from "@/hooks/useObjectUrls";
import {HtmlSnippetPanel} from "./HtmlSnippetPanel";
import {ImagePreviewGrid} from "./ImagePreviewGrid";
import {ResultsPanel} from "./ResultsPanel";
import {SettingsPanel} from "./SettingsPanel";
import {UploadZone} from "./UploadZone";

export function GeneratorApp() {
  const {register, revoke, revokeAll} = useObjectUrls();
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

  const settingsPanelProps = {
    settings,
    images,
    isProcessing,
    canGenerate,
    onSettingsChange: setSettings,
    onGenerate: handleGenerate,
    onCancel: cancelProcessing,
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.9fr)]">
      <div className="space-y-6">
        <UploadZone
          images={images}
          onAddImages={handleAddImages}
          registerUrl={register}
        />

        <div className="lg:hidden">
          <SettingsPanel {...settingsPanelProps} collapsible/>
        </div>

        <ImagePreviewGrid
          images={images}
          onRemove={handleRemoveImage}
          onClearAll={handleClearAll}
          selectedBreakpointsCount={settings.selectedBreakpoints.length}
        />

        <ResultsPanel
          variants={variants}
          jobs={jobs}
          isProcessing={isProcessing}
          hasResults={hasResults}
          progress={progress}
          formatBytes={formatBytes}
        />

        <HtmlSnippetPanel variants={variants}/>
      </div>

      <div className="space-y-6">
        <div className="hidden lg:block">
          <SettingsPanel {...settingsPanelProps} />
        </div>
      </div>
    </div>
  );
}
