import { useState, useEffect, useRef } from 'react';

export function useAnimatedNumber(target, duration = 600) {
  const [display, setDisplay] = useState(target || 0);
  const frameRef = useRef();
  const startRef = useRef();
  const fromRef = useRef(0);

  useEffect(() => {
    if (target === null || target === undefined) return;

    const from = fromRef.current;
    const to = target;

    if (Math.abs(from - to) < 0.1) {
      setDisplay(to);
      fromRef.current = to;
      return;
    }

    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = from + (to - from) * eased;
      setDisplay(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        fromRef.current = to;
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return display;
}
