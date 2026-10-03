import { useEffect, useState } from "react";

const HIDE_DELAY_MS = 900;

export function Loader() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsHidden(true), HIDE_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-brown text-cream flex justify-center items-center transition-[opacity,visibility] duration-700 ${
        isHidden ? "opacity-0 invisible" : "opacity-100 visible"
      }`}
    >
      <div className="text-center">
        <div className="font-serif text-[75px] tracking-[.08em] animate-loader-pulse">
          IRIS
        </div>
        <div className="text-[8px] tracking-[.4em] -mt-3">PHARMA</div>
      </div>
    </div>
  );
}
