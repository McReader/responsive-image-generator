"use client";

import { PRESET_BREAKPOINTS } from "@/lib/breakpoints";
import type { SourceImage } from "@/lib/types";

interface BreakpointSelectorProps {
  selectedBreakpoints: number[];
  images: SourceImage[];
  onChange: (breakpoints: number[]) => void;
}

export function BreakpointSelector({
  selectedBreakpoints,
  images,
  onChange,
}: BreakpointSelectorProps) {
  const maxSourceWidth =
    images.length > 0 ? Math.max(...images.map((image) => image.width)) : Infinity;

  const toggleBreakpoint = (width: number) => {
    if (selectedBreakpoints.includes(width)) {
      onChange(selectedBreakpoints.filter((value) => value !== width));
      return;
    }

    onChange([...selectedBreakpoints, width].sort((a, b) => a - b));
  };

  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Breakpoints
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onChange([...PRESET_BREAKPOINTS])}
            className="text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Select all
          </button>
          <button
            type="button"
            onClick={() => onChange([])}
            className="text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {PRESET_BREAKPOINTS.map((width) => {
          const disabled = width > maxSourceWidth;
          const checked = selectedBreakpoints.includes(width);

          return (
            <label
              key={width}
              title={
                disabled
                  ? "Skipped — wider than the largest uploaded image"
                  : undefined
              }
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                disabled
                  ? "cursor-not-allowed border-zinc-200 text-zinc-400 dark:border-zinc-800 dark:text-zinc-600"
                  : "cursor-pointer border-zinc-200 text-zinc-800 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500"
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={() => toggleBreakpoint(width)}
                className="rounded border-zinc-300"
              />
              <span>{width}px</span>
            </label>
          );
        })}
      </div>
    </section>
  );
}
