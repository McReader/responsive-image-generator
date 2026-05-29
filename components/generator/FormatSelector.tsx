"use client";

import type { OutputFormat } from "@/lib/types";

const FORMAT_OPTIONS: { value: OutputFormat; label: string }[] = [
  { value: "webp", label: "WebP" },
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "avif", label: "AVIF" },
];

interface FormatSelectorProps {
  format: OutputFormat;
  onChange: (format: OutputFormat) => void;
}

export function FormatSelector({ format, onChange }: FormatSelectorProps) {
  return (
    <section>
      <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        Output format
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {FORMAT_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-sm font-medium ${
              format === option.value
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-200 text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500"
            }`}
          >
            <input
              type="radio"
              name="format"
              value={option.value}
              checked={format === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
      {format === "avif" && (
        <p className="mt-2 text-xs text-amber-700 dark:text-amber-400">
          AVIF encoding can be slower on mobile devices.
        </p>
      )}
    </section>
  );
}
