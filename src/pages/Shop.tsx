import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import type { FilterOption, SortOption } from "../types";
import { SectionLabel } from "../components/common/SectionLabel";
import { Reveal } from "../components/common/Reveal";
import { ShopControls } from "../components/shop/ShopControls";
import { ShopFilters } from "../components/shop/ShopFilters";
import { ProductGrid } from "../components/shop/ProductGrid";

const VALID_CATEGORIES: FilterOption[] = ["all", "face", "serum", "body", "cleanser"];

export function Shop() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const initialFilter: FilterOption = VALID_CATEGORIES.includes(categoryParam as FilterOption)
    ? (categoryParam as FilterOption)
    : "all";

  const [activeFilter, setActiveFilter] = useState<FilterOption>(initialFilter);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("default");

  const visibleProducts = useMemo(() => {
    const query = search.toLowerCase().trim();

    const filtered = products.filter((product) => {
      const matchesFilter = activeFilter === "all" || product.category === activeFilter;
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.categoryName.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });

    if (sort === "low") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...filtered].sort((a, b) => b.price - a.price);
    if (sort === "name") return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }, [activeFilter, search, sort]);

  return (
    <section className="px-[5vw] max-mobile:px-[6vw] py-[140px] max-mobile:py-[100px]">
      <Reveal className="flex items-end justify-between mb-[35px] max-mobile:block">
        <div>
          <SectionLabel>The Collection</SectionLabel>
          <h2 className="font-serif text-[clamp(55px,7vw,95px)] leading-[.85] font-normal -tracking-[.05em] mt-[18px]">
            Skin Essentials
          </h2>
        </div>

        <div className="max-mobile:mt-[25px]">
          <ShopControls
            search={search}
            onSearchChange={setSearch}
            sort={sort}
            onSortChange={setSort}
          />
        </div>
      </Reveal>

      <ShopFilters active={activeFilter} onChange={setActiveFilter} />

      <ProductGrid products={visibleProducts} />
    </section>
  );
}
