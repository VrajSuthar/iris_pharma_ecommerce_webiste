import type { SortOption } from "../../types";

interface ShopControlsProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}

export function ShopControls({ search, onSearchChange, sort, onSortChange }: ShopControlsProps) {
  return (
    <div className="flex gap-[10px] flex-wrap">
      <div className="flex items-center gap-[10px] border-b border-brown w-[200px] max-mobile:w-full">
        <span>⌕</span>
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search products..."
          className="w-full border-0 outline-none bg-transparent py-[10px] text-[12px]"
        />
      </div>

      <select
        value={sort}
        onChange={(event) => onSortChange(event.target.value as SortOption)}
        className="border border-border bg-transparent p-[11px] text-[10px] text-brown"
      >
        <option value="default">Sort</option>
        <option value="low">Price: Low</option>
        <option value="high">Price: High</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
}
