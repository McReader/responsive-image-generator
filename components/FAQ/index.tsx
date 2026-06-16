export type FaqItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  eyebrow?: string;
  title?: string;
  items: FaqItem[];
};

export function FAQ({
  eyebrow = "Support",
  title = "Frequently asked questions",
  items,
}: FAQProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
        {title}
      </h2>

      <dl className="mt-8 border-t border-zinc-200 dark:border-zinc-800">
        {items.map((item) => (
          <div key={item.question} className="border-b border-zinc-200 py-5 dark:border-zinc-800">
            <dt className="text-[0.9375rem] font-medium text-zinc-900 dark:text-zinc-50">
              {item.question}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
