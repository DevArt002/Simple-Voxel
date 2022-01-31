import { useRef, useCallback, MouseEvent } from 'react';
import { TEventFunc } from '@/Types';

export const usePressHold = (downCallback?: TEventFunc, upCallback?: TEventFunc) => {
  const pressIntervalRef = useRef<number | null>(null);

  // Listen when mouse down
  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (pressIntervalRef.current) return;

    pressIntervalRef.current = window.setInterval(() => {
      downCallback?.(e);
    }, 10);
  }, []);

  // Listen when mouse up
  const handleMouseUp = useCallback((e: MouseEvent) => {
    if (!pressIntervalRef.current) return;

    clearInterval(pressIntervalRef.current);
    pressIntervalRef.current = null;
    upCallback?.(e);
  }, []);

  return [handleMouseDown, handleMouseUp];
};
