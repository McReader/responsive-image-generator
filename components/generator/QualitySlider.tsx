"use client";

interface QualitySliderProps {
  quality: number;
  disabled?: boolean;
  onChange: (quality: number) => void;
}

export function QualitySlider({ quality, disabled, onChange }: QualitySliderProps) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Quality
        </h3>
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          {disabled ? "Lossless" : `${quality}%`}
        </span>
      </div>
      <input
        type="range"
        min={1}
        max={100}
        value={quality}
        disabled={disabled}
        aria-label="Output quality"
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-zinc-900 disabled:opacity-40 dark:accent-zinc-100"
      />
    </section>
  );
}
