"use client";

import type { GeneratorSettings, SourceImage } from "@/lib/types";
import { BreakpointSelector } from "./BreakpointSelector";
import { FormatSelector } from "./FormatSelector";
import { QualitySlider } from "./QualitySlider";

interface SettingsPanelProps {
  settings: GeneratorSettings;
  images: SourceImage[];
  isProcessing: boolean;
  canGenerate: boolean;
  onSettingsChange: (settings: GeneratorSettings) => void;
  onGenerate: () => void;
  onCancel: () => void;
}

export function SettingsPanel({
  settings,
  images,
  isProcessing,
  canGenerate,
  onSettingsChange,
  onGenerate,
  onCancel,
}: SettingsPanelProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="mb-5 text-base font-semibold text-zinc-900 dark:text-zinc-100">
        Output settings
      </h2>

      <div className="space-y-6">
        <BreakpointSelector
          selectedBreakpoints={settings.selectedBreakpoints}
          images={images}
          onChange={(selectedBreakpoints) =>
            onSettingsChange({ ...settings, selectedBreakpoints })
          }
        />

        <FormatSelector
          format={settings.format}
          onChange={(format) => onSettingsChange({ ...settings, format })}
        />

        <QualitySlider
          quality={settings.quality}
          disabled={settings.format === "png"}
          onChange={(quality) => onSettingsChange({ ...settings, quality })}
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={!canGenerate || isProcessing}
          onClick={onGenerate}
          className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {isProcessing ? "Generating..." : "Generate variants"}
        </button>
        {isProcessing && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-300 px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
        )}
      </div>
    </section>
  );
}
