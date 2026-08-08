import type { ReactNode } from "react";

export function PolicyPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h1>
      <p className="mt-1 text-sm text-slate-500">Last updated: {updated}</p>

      <div className="mt-6 flex flex-col gap-5 text-sm leading-relaxed text-slate-600 [&_h2]:mt-2 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-slate-900 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:marker:text-slate-400">
        {children}
      </div>
    </main>
  );
}
