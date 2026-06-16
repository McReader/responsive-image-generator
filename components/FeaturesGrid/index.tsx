export type FeatureItem = {
  title: string;
  description: string;
};

type FeaturesGridProps = {
  eyebrow?: string;
  title: string;
  items: FeatureItem[];
};

export function FeaturesGrid({
  eyebrow = "Capabilities",
  title,
  items,
}: FeaturesGridProps) {
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

      <ul className="mt-10 grid list-none grid-cols-1 gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 p-0 m-0 md:grid-cols-2 lg:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-800">
        {items.map((feature) => (
          <li
            key={feature.title}
            className="flex flex-col gap-2 bg-white p-6 dark:bg-zinc-900"
          >
            <h3 className="text-[0.9375rem] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {feature.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
