interface FlipBookControlsProps {
  handle: string;
  currentPage: number;
  totalPages: number;
  progressPercent: number;
  onPrev: () => void;
  onNext: () => void;
  onOpenZoom: () => void;
}

export default function FlipBookControls({
  handle,
  currentPage,
  totalPages,
  progressPercent,
  onPrev,
  onNext,
  onOpenZoom,
}: FlipBookControlsProps) {
  return (
    <>
      {/* Header */}
      <div className="text-center">
        <p className="text-xs font-medium tracking-[2px] uppercase text-[#185A85]">ZCAD Publications</p>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">Flip pages to preview the book</p>
      </div>

      {/* Progress + Zoom button */}
      <div className="flex items-center justify-center gap-4 flex-wrap w-full px-2">
        <div className="flex items-center gap-2">
          <div className="w-20 sm:w-28 h-[3px] bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#185A85] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap">{currentPage + 1} / {totalPages}</span>
        </div>

        <button
          onClick={onOpenZoom}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-blue-50 hover:border-[#185A85] text-gray-500 hover:text-[#185A85] text-xs font-medium transition-all active:scale-95"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Zoom View
        </button>
      </div>

      {/* Nav buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onPrev}
          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50 active:scale-95 transition text-gray-700"
        >
          ← Prev
        </button>
        <a
          href={`https://zcadgroup.myshopify.com/products/${handle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 text-xs sm:text-sm bg-[#185A85] hover:bg-[#0C447C] text-white rounded-lg font-medium transition active:scale-95"
        >
          🛒 <span className="hidden sm:inline">Buy Full Book</span>
          <span className="sm:hidden">Buy Now</span>
        </a>
        <button
          onClick={onNext}
          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50 active:scale-95 transition text-gray-700"
        >
          Next →
        </button>
      </div>

      <p className="text-[10px] tracking-widest uppercase text-gray-300">Preview Copy · ZCAD</p>
    </>
  );
}