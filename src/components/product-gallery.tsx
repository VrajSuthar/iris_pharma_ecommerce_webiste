"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_48px_-24px_rgba(15,23,42,0.3)] ring-1 ring-slate-200">
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1} of ${alt}`}
              aria-current={i === active}
              className={`relative aspect-square overflow-hidden rounded-xl bg-white ring-1 transition-all ${
                i === active
                  ? "ring-2 ring-primary"
                  : "ring-slate-200 hover:ring-primary/40"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="20vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
