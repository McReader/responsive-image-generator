"use client";

import { useState } from "react";
import type { GeneratorSettings, SourceImage } from "@/lib/types";
import { BreakpointSelector } from "./BreakpointSelector";
import { FormatSelector } from "./FormatSelector";
import { QualitySlider } from "./QualitySlider";

interface SettingsPanelProps {
  settings: GeneratorSettings;
  images: SourceImage[];
  isProcessing: boolean;
  canGenerate: boolean;
  collapsible?: boolean;
  onSettingsChange: (settings: GeneratorSettings) => void;
  onGenerate: () => void;
  onCancel: () => void;
}

export function SettingsPanel({
  settings,
  images,
  isProcessing,
  canGenerate,
  collapsible = false,
  onSettingsChange,
  onGenerate,
  onCancel,
}: SettingsPanelProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      {collapsible ? (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
          className="flex w-full items-center justify-between gap-3 text-left"
        >
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Output settings
          </h2>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-5 w-5 shrink-0 text-zinc-500 transition-transform dark:text-zinc-400 ${expanded ? "rotate-180" : ""}`}
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ) : (
        <h2 className="mb-5 text-base font-semibold text-zinc-900 dark:text-zinc-100">
          Output settings
        </h2>
      )}

      {(!collapsible || expanded) && (
        <div className={`space-y-6 ${collapsible ? "mt-5" : ""}`}>
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
      )}

      <div className={`flex flex-col gap-3 sm:flex-row ${collapsible && !expanded ? "mt-4" : "mt-6"}`}>
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
