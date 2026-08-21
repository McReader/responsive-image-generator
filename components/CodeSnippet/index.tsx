"use client";

import { Highlight, themes } from "prism-react-renderer";
import { useState } from "react";
import { IoCheckmark, IoCopyOutline } from "react-icons/io5";

type CodeSnippetProps = {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
};

export function CodeSnippet({
  code,
  language = "html",
  title,
  showLineNumbers = false,
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
      {title ? (
        <div className="flex items-center justify-between gap-4 border-b border-zinc-800 bg-zinc-900/80 px-4 py-2.5">
          <span className="min-w-0 truncate text-xs font-medium text-zinc-200">
            {title}
          </span>
          <div className="flex shrink-0 items-center gap-2">
            <span className="rounded-full bg-zinc-800 px-2 py-0.5 font-mono text-[0.625rem] font-medium uppercase tracking-wider text-zinc-400">
              {language}
            </span>
            <button
              type="button"
              onClick={() => void copy()}
              title={copied ? "Copied" : "Copy code"}
              aria-label={copied ? "Copied" : "Copy code"}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
            >
              {copied ? <IoCheckmark size={15} /> : <IoCopyOutline size={15} />}
            </button>
          </div>
        </div>
      ) : null}

      <Highlight theme={themes.oneDark} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} max-h-[min(70vh,32rem)] overflow-x-auto p-4 font-mono text-xs leading-6`}
            style={{ ...style, margin: 0, whiteSpace: "pre" }}
          >
            {tokens.map((line, index) => (
              <div key={index} {...getLineProps({ line, className: "flex" })}>
                {showLineNumbers ? (
                  <span
                    aria-hidden="true"
                    className="mr-4 inline-block w-6 shrink-0 select-none text-right text-zinc-500"
                  >
                    {index + 1}
                  </span>
                ) : null}
                <span className="min-w-0 flex-1">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
