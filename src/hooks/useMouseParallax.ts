import { useEffect, useRef, useState } from "react";

export function useMouseParallax(strength = 20) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      cancelAnimationFrame(frame.current ?? 0);
      frame.current = requestAnimationFrame(() => {
        const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
        const normalizedY = (event.clientY / window.innerHeight) * 2 - 1;
        setOffset({ x: normalizedX * strength, y: normalizedY * strength });
      });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame.current ?? 0);
    };
  }, [strength]);

  return offset;
}
