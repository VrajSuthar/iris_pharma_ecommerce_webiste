import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, isActive: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  const frame = useRef<number | undefined>(undefined);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isActive || hasRun.current) return;
    hasRun.current = true;

    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(eased * target);
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    }

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current ?? 0);
  }, [isActive, target, duration]);

  return value;
}
