"use client";

import { useEffect, useState } from "react";
import { IoCheckmark, IoClose, IoCopyOutline } from "react-icons/io5";
import { buildImgSnippet } from "@/lib/html-snippets";
import type { ImageVariant } from "@/lib/types";

interface HtmlSnippetModalProps {
  isOpen: boolean;
  sourceName: string;
  variants: ImageVariant[];
  onClose: () => void;
}

export function HtmlSnippetModal({
  isOpen,
  sourceName,
  variants,
  onClose,
}: HtmlSnippetModalProps) {
  const [copied, setCopied] = useState(false);
  const snippet = buildImgSnippet(variants);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const copySnippet = async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="html-snippet-modal-title"
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl dark:bg-zinc-900"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="min-w-0">
            <h2
              id="html-snippet-modal-title"
              className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100"
            >
              HTML snippet
            </h2>
            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
              {sourceName}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => void copySnippet()}
              title={copied ? "Copied" : "Copy snippet"}
              aria-label={copied ? "Copied" : "Copy snippet"}
              className="icon-button"
            >
              {copied ? <IoCheckmark size={24} /> : <IoCopyOutline size={24} />}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close HTML snippet"
              className="icon-button"
            >
              <IoClose size={24} />
            </button>
          </div>
        </div>

        <pre className="max-h-[min(70vh,32rem)] overflow-auto bg-zinc-950 p-4 text-xs leading-6 text-zinc-100">
          <code>{snippet}</code>
        </pre>
      </div>
    </div>
  );
}
