import { useState, useRef, useEffect, useCallback } from 'react';

export function useMapScroll() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartRef = useRef<{ startX: number; scrollLeft: number }>({
    startX: 0,
    scrollLeft: 0,
  });
  const hasDraggedRef = useRef(false);

  const updateScrollState = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    const scrollable = maxScroll > 4;

    setIsScrollable(scrollable);
    setCanScrollLeft(scrollable && scrollLeft > 8);
    setCanScrollRight(scrollable && scrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    updateScrollState();

    const handleScroll = () => updateScrollState();
    el.addEventListener('scroll', handleScroll, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      updateScrollState();
    });
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, [updateScrollState]);

  useEffect(() => {
    if (!isDragging) return;
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDragging]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest('button') || target?.closest('a')) return;

    const el = containerRef.current;
    if (!el) return;

    dragStartRef.current = {
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
    };
    hasDraggedRef.current = false;
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const el = containerRef.current;
      if (!el) return;

      const deltaX = e.clientX - dragStartRef.current.startX;
      if (Math.abs(deltaX) > 4) {
        hasDraggedRef.current = true;
      }
      el.scrollLeft = dragStartRef.current.scrollLeft - deltaX;
    },
    [isDragging],
  );

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClickCapture = useCallback((e: React.MouseEvent) => {
    if (hasDraggedRef.current) {
      e.stopPropagation();
      e.preventDefault();
      hasDraggedRef.current = false;
    }
  }, []);

  const scrollByAmount = useCallback((offset: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: offset, behavior: 'smooth' });
  }, []);

  const scrollLeft = useCallback(() => scrollByAmount(-280), [scrollByAmount]);
  const scrollRight = useCallback(() => scrollByAmount(280), [scrollByAmount]);

  return {
    containerRef,
    canScrollLeft,
    canScrollRight,
    isScrollable,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp: stopDragging,
    handleMouseLeave: stopDragging,
    handleClickCapture,
    scrollLeft,
    scrollRight,
  };
}
