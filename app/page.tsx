import { GeneratorApp } from "@/components/generator/GeneratorApp";

export default function Home() {
  return (
    <main className="flex min-h-full flex-col bg-zinc-50 dark:bg-zinc-950">
      <GeneratorApp />
    </main>
  );
}
