import {IoCheckmark, IoClose} from "react-icons/io5";

type VerdictTone = "emerald" | "zinc" | "amber" | "sky";

type FormatInfo = {
  name: string;
  extension: string;
  type: string;
  fileSize: string;
  transparency: boolean;
  bestFor: string;
  verdict: string;
  tone: VerdictTone;
};

const formats: FormatInfo[] = [
  {
    name: "WebP",
    extension: ".webp",
    type: "Lossy & lossless",
    fileSize: "Small",
    transparency: true,
    bestFor: "Photos & everyday web images",
    verdict: "Default choice",
    tone: "emerald",
  },
  {
    name: "JPEG",
    extension: ".jpg",
    type: "Lossy only",
    fileSize: "Large",
    transparency: false,
    bestFor: "Photos & maximum compatibility",
    verdict: "Universal fallback",
    tone: "zinc",
  },
  {
    name: "PNG",
    extension: ".png",
    type: "Lossless only",
    fileSize: "Very large",
    transparency: true,
    bestFor: "Logos, text & screenshots",
    verdict: "Graphics only",
    tone: "amber",
  },
  {
    name: "AVIF",
    extension: ".avif",
    type: "Lossy & lossless",
    fileSize: "Smallest",
    transparency: true,
    bestFor: "Photos when size matters most",
    verdict: "Best compression",
    tone: "sky",
  },
];

const verdictClasses: Record<VerdictTone, string> = {
  emerald:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
  zinc: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
  sky: "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300",
};

function Transparency({value}: {value: boolean}) {
  if (value) {
    return (
      <span className="inline-flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
        <IoCheckmark aria-hidden="true" className="text-emerald-600 dark:text-emerald-400" />
        Yes
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
      <IoClose aria-hidden="true" className="text-zinc-400 dark:text-zinc-500" />
      No
    </span>
  );
}

function Verdict({label, tone}: {label: string; tone: VerdictTone}) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${verdictClasses[tone]}`}
    >
      {label}
    </span>
  );
}

function MobileRow({label, value}: {label: string; value: React.ReactNode}) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-zinc-100 py-2 first:border-t-0 dark:border-zinc-800">
      <dt className="shrink-0 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {label}
      </dt>
      <dd className="text-right text-sm text-zinc-900 dark:text-zinc-50">{value}</dd>
    </div>
  );
}

export function FormatComparison() {
  return (
    <div>
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Formats
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          Choose the right image format
        </h2>
        <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
          Compare the four formats this tool supports to pick the best one for
          your images.
        </p>
      </div>

      {/* Cards for mobile and tablet */}
      <ul className="mt-8 grid list-none grid-cols-1 gap-3 p-0 m-0 sm:grid-cols-2 lg:hidden">
        {formats.map((format) => (
          <li
            key={format.name}
            className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {format.name}{" "}
                <code className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
                  {format.extension}
                </code>
              </h3>
              <Verdict label={format.verdict} tone={format.tone} />
            </div>

            <dl className="mt-3">
              <MobileRow label="Type" value={format.type} />
              <MobileRow label="File size" value={format.fileSize} />
              <MobileRow
                label="Transparency"
                value={<Transparency value={format.transparency} />}
              />
              <MobileRow label="Best for" value={format.bestFor} />
            </dl>
          </li>
        ))}
      </ul>

      {/* Table for desktop */}
      <div className="mt-8 hidden overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 lg:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">
              Comparison of the WebP, JPEG, PNG, and AVIF image formats
            </caption>
            <thead>
              <tr className="bg-zinc-50 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                <th scope="col" className="px-4 py-3 font-medium">Format</th>
                <th scope="col" className="px-4 py-3 font-medium">Type</th>
                <th scope="col" className="px-4 py-3 font-medium">File size</th>
                <th scope="col" className="px-4 py-3 font-medium">Transparency</th>
                <th scope="col" className="px-4 py-3 font-medium">Best for</th>
                <th scope="col" className="px-4 py-3 font-medium">Verdict</th>
              </tr>
            </thead>
            <tbody>
              {formats.map((format) => (
                <tr
                  key={format.name}
                  className="border-t border-zinc-200 align-top dark:border-zinc-800"
                >
                  <th
                    scope="row"
                    className="px-4 py-3 font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
                  >
                    {format.name}{" "}
                    <code className="ml-0.5 text-xs font-normal text-zinc-500 dark:text-zinc-400">
                      {format.extension}
                    </code>
                  </th>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {format.type}
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {format.fileSize}
                  </td>
                  <td className="px-4 py-3">
                    <Transparency value={format.transparency} />
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                    {format.bestFor}
                  </td>
                  <td className="px-4 py-3">
                    <Verdict label={format.verdict} tone={format.tone} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        All four formats work in every modern browser. For a typical photo,
        WebP is about 30% smaller than JPEG, and AVIF is about 50% smaller.
        PNG stays lossless, so its files remain large.
      </p>
    </div>
  );
}
