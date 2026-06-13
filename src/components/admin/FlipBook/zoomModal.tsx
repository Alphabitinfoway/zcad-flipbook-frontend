import React from "react";
import { ZOOM_LEVELS } from "./useFlipBook";

interface ZoomModalProps {
  title: string;
  zoom: number;
  zoomIndex: number;
  currentPage: number;
  totalPages: number;
  bookW: number;
  bookH: number;
  scaledW: number;
  scaledH: number;
  scrollRef: React.RefObject<HTMLDivElement>;
  flipBook: React.ReactNode;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ZoomModal({
  title,
  zoom,
  zoomIndex,
  currentPage,
  totalPages,
  bookW,
  bookH,
  scaledW,
  scaledH,
  scrollRef,
  flipBook,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onClose,
  onPrev,
  onNext,
}: ZoomModalProps) {
  return (
    <div className="fixed inset-0 z-40 flex flex-col" style={{ background: "rgba(0,0,0,0.88)" }}>

      {/* Toolbar */}
      <div className="shrink-0 flex items-center justify-between px-4 py-3 bg-black/60 backdrop-blur-sm border-b border-white/10 z-10">
        <p className="text-white text-sm font-medium truncate max-w-[35%]">{title}</p>

        {/* Zoom controls */}
        <div className="flex items-center gap-1 bg-white/10 border border-white/20 rounded-lg px-1.5 py-1">
          <button
            onClick={onZoomOut}
            disabled={zoomIndex === 0}
            className="w-8 h-8 flex items-center justify-center rounded-md text-white hover:bg-white/20 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xl leading-none select-none"
          >−</button>
          <button
            onClick={onResetZoom}
            className="min-w-[52px] text-center text-xs font-bold text-white hover:bg-white/20 rounded-md px-2 py-1.5 transition-all"
          >{Math.round(zoom * 100)}%</button>
          <button
            onClick={onZoomIn}
            disabled={zoomIndex === ZOOM_LEVELS.length - 1}
            className="w-8 h-8 flex items-center justify-center rounded-md text-white hover:bg-white/20 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xl leading-none select-none"
          >+</button>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all active:scale-95"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Close
        </button>
      </div>

      {/* Scrollable canvas */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto"
        style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        <div
          style={{
            width: Math.max(scaledW, 100) + 64,
            height: Math.max(scaledH, 100) + 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: bookW,
              height: bookH,
              transform: `scale(${zoom})`,
              transformOrigin: "center center",
              transition: "transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94)",
              borderRadius: 6,
              overflow: "hidden",
              boxShadow: "0 16px 64px rgba(0,0,0,0.55)",
              flexShrink: 0,
            }}
          >
            {flipBook}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="shrink-0 flex items-center justify-center gap-3 px-4 py-3 bg-black/60 backdrop-blur-sm border-t border-white/10">
        <button onClick={onPrev} className="flex items-center gap-2 px-5 py-2 text-sm border border-white/20 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition text-white">
          ← Prev
        </button>
        <span className="text-xs text-white/50">{currentPage + 1} / {totalPages}</span>
        <button onClick={onNext} className="flex items-center gap-2 px-5 py-2 text-sm border border-white/20 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition text-white">
          Next →
        </button>
      </div>
    </div>
  );
}