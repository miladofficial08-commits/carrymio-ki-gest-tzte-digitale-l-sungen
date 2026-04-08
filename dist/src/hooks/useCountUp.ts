import { useEffect, useState } from "react";

export function useCountUp(target: number, isActive: boolean, duration = 2000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let start = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setValue(current);
      if (progress < 1) {
        start = requestAnimationFrame(tick);
      }
    };

    start = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(start);
  }, [target, isActive, duration]);

  return value;
}
