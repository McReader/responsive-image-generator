"use client";

import { useCallback, useRef, useState } from "react";
import { filesToSourceImages } from "@/lib/image-utils";
import type { SourceImage } from "@/lib/types";
import { MAX_FILE_COUNT } from "@/lib/types";

interface UploadZoneProps {
  images: SourceImage[];
  onAddImages: (images: SourceImage[]) => void;
  registerUrl: (url: string) => string;
}

export function UploadZone({ images, onAddImages, registerUrl }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const files = Array.from(fileList);
      const remainingSlots = MAX_FILE_COUNT - images.length;

      if (remainingSlots <= 0) {
        setErrors([`Maximum of ${MAX_FILE_COUNT} images allowed.`]);
        return;
      }

      const selectedFiles = files.slice(0, remainingSlots);
      const { images: nextImages, errors: nextErrors } = await filesToSourceImages(
        selectedFiles,
        registerUrl,
      );

      if (nextImages.length > 0) {
        onAddImages(nextImages);
      }

      if (files.length > remainingSlots) {
        nextErrors.push(`Only ${remainingSlots} more image(s) can be added.`);
      }

      setErrors(nextErrors);
    },
    [images.length, onAddImages, registerUrl],
  );

  return (
    <section className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload images"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          void handleFiles(event.dataTransfer.files);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl px-6 py-12 text-center transition-colors ${
          isDragging
            ? "bg-zinc-100 dark:bg-zinc-800"
            : "bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-800"
        }`}
      >
        <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          Drop images here or click to browse
        </p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          JPEG, PNG, WebP, AVIF, GIF · up to 25 MB each · max {MAX_FILE_COUNT} files
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(event) => {
          if (event.target.files) {
            void handleFiles(event.target.files);
            event.target.value = "";
          }
        }}
      />

      {errors.length > 0 && (
        <ul className="mt-4 space-y-1 text-sm text-red-600 dark:text-red-400">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
