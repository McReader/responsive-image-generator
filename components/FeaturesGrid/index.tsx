export type FeatureItem = {
  title: string;
  description: string;
};

type FeaturesGridProps = {
  eyebrow?: string;
  title: string;
  items: FeatureItem[];
};

type BentoLayout = {
  gridClass: string;
  spans: number[];
};

function getBentoLayout(count: number): BentoLayout {
  switch (count) {
    case 1:
      return { gridClass: "max-w-sm grid-cols-1", spans: [1] };
    case 2:
      return { gridClass: "sm:grid-cols-2", spans: [1, 1] };
    case 3:
      return { gridClass: "sm:grid-cols-2", spans: [2, 1, 1] };
    case 4:
      return { gridClass: "sm:grid-cols-3", spans: [2, 1, 1, 2] };
    case 5:
      return { gridClass: "sm:grid-cols-2", spans: [2, 1, 1, 1, 1] };
    default:
      return {
        gridClass: "sm:grid-cols-2",
        spans: Array.from({ length: count }, () => 1),
      };
  }
}

function spanClass(span: number): string {
  if (span === 2) {
    return "sm:col-span-2";
  }

  return "sm:col-span-1";
}

export function FeaturesGrid({
  eyebrow = "Capabilities",
  title,
  items,
}: FeaturesGridProps) {
  const { gridClass, spans } = getBentoLayout(items.length);

  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {title}
        </h2>
      </div>

      <ul
        className={`mx-auto mt-8 grid max-w-3xl list-none grid-cols-1 gap-3 p-0 m-0 ${gridClass}`}
      >
        {items.map((feature, index) => {
          const featured = spans[index] === 2;

          return (
            <li
              key={feature.title}
              className={`flex flex-col rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 sm:p-5 ${spanClass(spans[index] ?? 1)}`}
            >
              <h3
                className={`font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 ${
                  featured ? "text-base" : "text-[0.9375rem]"
                }`}
              >
                {feature.title}
              </h3>
              <p className="mt-1.5 text-sm leading-snug text-zinc-500 dark:text-zinc-400">
                {feature.description}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
