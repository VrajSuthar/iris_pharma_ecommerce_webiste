// Small tricolor "Indian flag" badge used to flag festival/limited-time
// promos (e.g. an Independence Day sale) on a product's card or page.
// Decorative/seasonal use only — keep this out of the brand primary/success
// palette per docs/DESIGN_SYSTEM.md.
export function PromoBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white py-1 pr-2.5 pl-1 text-[10px] font-bold tracking-wide text-slate-700 uppercase shadow-sm">
      <span className="flex h-3 w-4 shrink-0 flex-col overflow-hidden rounded-[2px] ring-1 ring-slate-200">
        <span className="h-1 flex-1 bg-[#FF9933]" />
        <span className="flex h-1 flex-1 items-center justify-center bg-white">
          <span className="block size-[3px] rounded-full bg-[#000080]" />
        </span>
        <span className="h-1 flex-1 bg-[#138808]" />
      </span>
      {label}
    </div>
  );
}
