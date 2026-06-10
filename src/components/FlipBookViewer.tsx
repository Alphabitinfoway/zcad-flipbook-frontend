import HTMLFlipBook from "react-pageflip";
import { useRef, useState, useEffect } from "react";

import Page from "../pages/page";
import BuyNowPage from "./BuyNowPage";
import CoverPage from "./admin/CoverPage";

interface Props {
  images?: string[];
  handle: string;
  title: string;
  author: string;
}

interface FlipEvent {
  data: number;
}

function getBookSize() {
  const screenW = window.innerWidth;

  if (screenW < 480) {
    // Mobile
    return { width: 160, height: 220 };
  } else if (screenW < 768) {
    // Large mobile / small tablet
    return { width: 220, height: 300 };
  } else if (screenW < 1024) {
    // Tablet
    return { width: 300, height: 420 };
  } else {
    // Desktop
    return { width: 420, height: 580 };
  }
}

export default function FlipBookViewer({
  images = [],
  handle,
  title,
  author,
}: Props) {
  const flipBookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [bookSize, setBookSize] = useState(getBookSize);

  const totalPages = images.length + 2;

  // Update size on window resize
  useEffect(() => {
    const handleResize = () => {
      setBookSize(getBookSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    flipBookRef.current?.pageFlip()?.flipPrev();
  };

  const handleNext = () => {
    flipBookRef.current?.pageFlip()?.flipNext();
  };

  const handleFlip = (e: FlipEvent) => {
    setCurrentPage(e.data);
  };

  const progressPercent = Math.round(((currentPage + 1) / totalPages) * 100);

  return (
    <div className="flex flex-col items-center gap-4 py-4 px-2 w-full">

      {/* Header */}
      <div className="text-center">
        <p className="text-xs font-medium tracking-[2px] uppercase text-[#185A85]">
          ZCAD Publications
        </p>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Flip pages to preview the book
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="w-24 sm:w-32 h-[3px] bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#185A85] rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-xs text-gray-400">
          Page {currentPage + 1} of {totalPages}
        </span>
      </div>

      {/* Book */}
      <div
        className="rounded-r-lg overflow-hidden"
        style={{
          boxShadow:
            "0 8px 40px rgba(24,90,133,0.18), 0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        {/* @ts-ignore */}
        <HTMLFlipBook
          key={`${bookSize.width}-${bookSize.height}`}
          ref={flipBookRef}
          width={bookSize.width}
          height={bookSize.height}
          size="fixed"
          minWidth={bookSize.width}
          maxWidth={bookSize.width}
          minHeight={bookSize.height}
          maxHeight={bookSize.height}
          showCover={true}
          flippingTime={700}
          className=""
          style={{}}
          startPage={0}
          drawShadow={true}
          usePortrait={false}
          startZIndex={0}
          autoSize={false}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          mobileScrollSupport={true}
          maxShadowOpacity={0.4}
          onFlip={handleFlip}
        >
          {/* Cover */}
          <Page pageNumber={0}>
            <CoverPage title={title} author={author} />
          </Page>

          {/* PDF Pages */}
          {images.map((img, index) => (
            <Page key={index} image={img} pageNumber={index + 1} />
          ))}

          {/* Buy Now */}
          <Page pageNumber={images.length + 1}>
            <BuyNowPage handle={handle} />
          </Page>
        </HTMLFlipBook>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 sm:gap-3 mt-2">
        <button
          onClick={handlePrev}
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
          onClick={handleNext}
          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50 active:scale-95 transition text-gray-700"
        >
          Next →
        </button>
      </div>

      {/* Watermark */}
      <p className="text-[10px] tracking-widest uppercase text-gray-300">
        Preview Copy · ZCAD
      </p>
    </div>
  );
}