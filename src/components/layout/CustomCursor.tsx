import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isGrown, setIsGrown] = useState(false);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame.current ?? 0);
      frame.current = requestAnimationFrame(() => {
        setPosition({ x: event.clientX, y: event.clientY });
      });
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setIsGrown(Boolean(target.closest("button, a, .product")));
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(frame.current ?? 0);
    };
  }, []);

  return (
    <div
      className="cursor-dot fixed rounded-full bg-rose-dark pointer-events-none z-[100000] -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-[250ms] [mix-blend-mode:multiply]"
      style={{
        left: position.x,
        top: position.y,
        width: isGrown ? 30 : 12,
        height: isGrown ? 30 : 12,
      }}
    />
  );
}
