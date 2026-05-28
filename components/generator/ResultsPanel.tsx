import { BuyMeACoffeeButton } from "./BuyMeACoffeeButton";
import { getBaseName } from "@/lib/breakpoints";
import { downloadSourceVariantsAsZip } from "@/lib/download";
import type { ImageVariant, ProcessJob } from "@/lib/types";

interface ResultsPanelProps {
  variants: ImageVariant[];
  jobs: ProcessJob[];
  isProcessing: boolean;
  progress: number;
  formatBytes: (bytes: number) => string;
}

export function ResultsPanel({
  variants,
  jobs,
  isProcessing,
  progress,
  formatBytes,
}: ResultsPanelProps) {
  const grouped = variants.reduce<Map<string, ImageVariant[]>>((acc, variant) => {
    const existing = acc.get(variant.sourceImageId) ?? [];
    existing.push(variant);
    acc.set(variant.sourceImageId, existing);
    return acc;
  }, new Map());

  const failedJobs = jobs.filter((job) => job.status === "error");
  const hasResults = variants.length > 0;

  if (variants.length === 0 && !isProcessing && failedJobs.length === 0) {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        Generated variants will appear here after processing.
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Generated variants
          </h2>
          {isProcessing && (
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Processing {progress}% complete
            </p>
          )}
        </div>
        {hasResults && <BuyMeACoffeeButton />}
      </div>

      {isProcessing && (
        <div className="mb-5 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-zinc-900 transition-all dark:bg-zinc-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {failedJobs.length > 0 && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
          <p className="text-sm font-medium text-red-700 dark:text-red-300">
            {failedJobs.length} job(s) failed
          </p>
          <ul className="mt-2 space-y-1 text-sm text-red-600 dark:text-red-400">
            {failedJobs.slice(0, 5).map((job) => (
              <li key={job.id}>
                {getBaseName(job.sourceName)} @ {job.targetWidth}px: {job.error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-6">
        {Array.from(grouped.entries()).map(([sourceImageId, sourceVariants]) => {
          const sourceName = sourceVariants[0]?.sourceName ?? "image";
          const sorted = sourceVariants.slice().sort((a, b) => a.width - b.width);

          return (
            <article
              key={sourceImageId}
              className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {sourceName}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {sorted.length} variant(s)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    void downloadSourceVariantsAsZip(sourceName, sorted)
                  }
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-zinc-300 px-3 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  Download image ZIP
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {sorted.map((variant) => (
                  <div
                    key={variant.id}
                    className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800"
                  >
                    <div className="aspect-video bg-zinc-100 dark:bg-zinc-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={variant.previewUrl}
                        alt={variant.fileName}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="space-y-1 p-3 text-xs text-zinc-600 dark:text-zinc-400">
                      <p className="truncate font-medium text-zinc-900 dark:text-zinc-100">
                        {variant.fileName}
                      </p>
                      <p>
                        {variant.width} × {variant.height}px · {formatBytes(variant.byteSize)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
