import { GeneratorApp } from "@/components/generator/GeneratorApp";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-col items-center text-center mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Responsive Image Generator
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Nothing is uploaded — processing stays on your device.
        </p>
      </header>
      <GeneratorApp />
    </main>
  );
}
