import type {SourceImage} from "@/lib/types";

interface ImagePreviewGridProps {
  images: SourceImage[];
  onClearAll: () => void;
  onRemove: (id: string) => void;
  selectedBreakpointsCount?: number;
}

export function ImagePreviewGrid({ images, onClearAll, onRemove, selectedBreakpointsCount = 0 }: ImagePreviewGridProps) {
  if (images.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
        Uploaded images will appear here.
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Uploaded images ({images.length})
        </h2>

        <button
          type="button"
          onClick={onClearAll}
          className="text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Clear All
        </button>
      </div>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400 mt-1">{selectedBreakpointsCount} breakpoint(s) selected</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {images.map((image) => (
          <article
            key={image.id}
            className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
          >
            <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.previewUrl}
                alt={image.name}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex items-start justify-between gap-3 p-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {image.name}
                </p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {image.width} × {image.height}px
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(image.id)}
                className="rounded-md px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
