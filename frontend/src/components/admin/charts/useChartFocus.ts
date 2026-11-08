// The active data point: follows the pointer (snapped to the nearest x) and the arrow keys.
import { useState, type KeyboardEvent, type PointerEvent } from 'react';

export function useChartFocus(count: number, xOf: (i: number) => number) {
  const [active, setActive] = useState<number | null>(null);

  const onPointerMove = (e: PointerEvent<SVGSVGElement>) => {
    const x = e.clientX - e.currentTarget.getBoundingClientRect().left;
    let nearest = 0;
    for (let i = 1; i < count; i++) if (Math.abs(xOf(i) - x) < Math.abs(xOf(nearest) - x)) nearest = i;
    setActive(nearest);
  };

  const onKeyDown = (e: KeyboardEvent<SVGSVGElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const move = e.key === 'ArrowRight' ? 1 : -1;
    setActive((i) => Math.min(count - 1, Math.max(0, (i ?? count - 1) + move)));
  };

  return {
    active,
    handlers: {
      onPointerMove,
      onPointerLeave: () => setActive(null),
      onKeyDown,
      onFocus: () => setActive(count - 1),
      onBlur: () => setActive(null),
    },
  };
}
