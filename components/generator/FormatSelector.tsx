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
            className={`button ${
              format === option.value
                ? "primary"
                : "outlined"
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
