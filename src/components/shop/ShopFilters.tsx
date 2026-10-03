import type { FilterOption } from "../../types";

const FILTERS: { label: string; value: FilterOption }[] = [
  { label: "All", value: "all" },
  { label: "Face", value: "face" },
  { label: "Serums", value: "serum" },
  { label: "Body", value: "body" },
  { label: "Cleansers", value: "cleanser" },
];

interface ShopFiltersProps {
  active: FilterOption;
  onChange: (filter: FilterOption) => void;
}

export function ShopFilters({ active, onChange }: ShopFiltersProps) {
  return (
    <div className="flex gap-[10px] flex-wrap mb-[30px]">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={`border border-border px-[18px] py-3 text-[9px] uppercase tracking-[.12em] ${
            active === filter.value ? "bg-brown text-white" : "bg-transparent hover:bg-brown hover:text-white"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
