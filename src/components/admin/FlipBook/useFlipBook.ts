import { useRef, useState, useEffect } from "react";

export type FlipBookRef = {
  pageFlip?: () => {
    flipPrev: () => void;
    flipNext: () => void;
  };
};

interface FlipEvent {
  data: number;
}

export interface BookConfig {
  width: number;
  height: number;
  portrait: boolean;
}

export const ZOOM_LEVELS = [1, 1.15, 1.3, 1.45, 1.6];

export function getBookConfig(): BookConfig {
  const w = window.innerWidth;
  if (w < 480) {
    return { width: Math.min(w - 32, 320), height: Math.min(w - 32, 320) * 1.45, portrait: true };
  } else if (w < 768) {
    return { width: 300, height: 420, portrait: true };
  } else if (w < 1024) {
    return { width: 320, height: 450, portrait: true };
  } else {
    return { width: 550, height: 750, portrait: false };
  }
}

export function useFlipBook(totalPages: number) {
  const flipBookRef = useRef<FlipBookRef | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [config, setConfig] = useState<BookConfig>(getBookConfig);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const zoom = ZOOM_LEVELS[zoomIndex];
  const bookW = config.portrait ? config.width : config.width * 2;
  const bookH = config.height;
  const scaledW = Math.round(bookW * zoom);
  const scaledH = Math.round(bookH * zoom);
  const progressPercent = Math.round(((currentPage + 1) / totalPages) * 100);

  // Resize listener
  useEffect(() => {
    const handleResize = () => setConfig(getBookConfig());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when zoomed
  useEffect(() => {
    document.body.style.overflow = isZoomed ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isZoomed]);

  // Escape key closes zoom
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsZoomed(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Re-center scroll on zoom change
  useEffect(() => {
    if (!isZoomed || !scrollRef.current) return;
    const el = scrollRef.current;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    el.scrollTop = (el.scrollHeight - el.clientHeight) / 2;
  }, [zoomIndex, isZoomed]);

  const handlePrev = () => flipBookRef.current?.pageFlip?.()?.flipPrev?.();
  const handleNext = () => flipBookRef.current?.pageFlip?.()?.flipNext?.();
  const handleFlip = (e: FlipEvent) => setCurrentPage(e.data);

  const zoomIn = () => setZoomIndex((i) => Math.min(i + 1, ZOOM_LEVELS.length - 1));
  const zoomOut = () => setZoomIndex((i) => Math.max(i - 1, 0));
  const resetZoom = () => setZoomIndex(0);
  const openZoom = () => { resetZoom(); setIsZoomed(true); };
  const closeZoom = () => setIsZoomed(false);

  return {
    flipBookRef,
    scrollRef,
    currentPage,
    config,
    zoom,
    zoomIndex,
    isZoomed,
    bookW,
    bookH,
    scaledW,
    scaledH,
    progressPercent,
    handlePrev,
    handleNext,
    handleFlip,
    zoomIn,
    zoomOut,
    resetZoom,
    openZoom,
    closeZoom,
  };
}