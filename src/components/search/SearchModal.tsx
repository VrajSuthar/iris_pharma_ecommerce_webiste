import { useEffect, useRef, useState } from "react";
import { useUI } from "../../context/UIContext";
import { products } from "../../data/products";
import { formatPrice } from "../../utils/formatPrice";

export function SearchModal() {
  const { isSearchOpen, closeSearch, openQuickView } = useUI();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) inputRef.current?.focus();
    else setQuery("");
  }, [isSearchOpen]);

  const trimmedQuery = query.toLowerCase().trim();
  const results = trimmedQuery
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(trimmedQuery) ||
          product.categoryName.toLowerCase().includes(trimmedQuery),
      )
    : [];

  return (
    <div
      className={`fixed inset-0 bg-[rgba(245,239,231,.98)] z-[9500] px-[8vw] py-[120px] transition-opacity duration-[400ms] overflow-y-auto ${
        isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <button
        onClick={closeSearch}
        className="absolute right-[5vw] top-[30px] border-0 bg-transparent text-[30px]"
      >
        ×
      </button>

      <div className="max-w-[900px] mx-auto border-b border-brown flex">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search Iris..."
          className="w-full border-0 outline-none bg-transparent font-serif text-[70px] max-mobile:text-[40px] py-5"
        />
      </div>

      <div className="max-w-[900px] mx-auto mt-10">
        {trimmedQuery && results.length === 0 && <p>No products found.</p>}

        {results.map((product) => (
          <div
            key={product.id}
            onClick={() => openQuickView(product.id)}
            className="flex justify-between items-center py-[18px] border-b border-border cursor-pointer"
          >
            <span>{product.name}</span>
            <strong>{formatPrice(product.price)}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
