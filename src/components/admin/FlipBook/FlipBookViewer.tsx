import HTMLFlipBook from "react-pageflip";
import type { RefObject } from "react";

import Page from "../../../pages/page";
import BuyNowPage from "../../BuyNowPage";
import CoverPage from "../CoverPage";

import { useFlipBook } from "./useFlipBook";
import ZoomModal from "./zoomModal";
import FlipBookControls from "./Flipbookcontrols";

interface Props {
  images?: string[];
  handle: string;
  title: string;
  author: string;
}

export default function FlipBookViewer({ images = [], handle, title, author }: Props) {
  const totalPages = images.length + 2;

  const {
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
  } = useFlipBook(totalPages);

  // Single instance — never unmounted
  const flipBook = (
    <HTMLFlipBook
      key={`${config.width}-${config.height}-${String(config.portrait)}`}
      ref={flipBookRef}
      width={config.width}
      height={config.height}
      size="fixed"
      minWidth={config.width}
      maxWidth={config.width}
      minHeight={config.height}
      maxHeight={config.height}
      showCover={true}
      flippingTime={700}
      className=""
      style={{}}
      startPage={0}
      drawShadow={true}
      usePortrait={config.portrait}
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
      <Page pageNumber={0}><CoverPage title={title} author={author} /></Page>
      {images.map((img, index) => (
        <Page key={index} image={img} pageNumber={index + 1} />
      ))}
      <Page pageNumber={images.length + 1}><BuyNowPage handle={handle} /></Page>
    </HTMLFlipBook>
  );

  return (
    <>
      {/* Zoom Modal */}
      {isZoomed && (
        <ZoomModal
          title={title}
          zoom={zoom}
          zoomIndex={zoomIndex}
          currentPage={currentPage}
          totalPages={totalPages}
          bookW={bookW}
          bookH={bookH}
          scaledW={scaledW}
          scaledH={scaledH}
          scrollRef={scrollRef as RefObject<HTMLDivElement>}
          flipBook={flipBook}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onResetZoom={resetZoom}
          onClose={closeZoom}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}

      {/* Normal View */}
      <div className="flex flex-col items-center gap-4 py-4 px-2 w-full">

        <FlipBookControls
          handle={handle}
          currentPage={currentPage}
          totalPages={totalPages}
          progressPercent={progressPercent}
          onPrev={handlePrev}
          onNext={handleNext}
          onOpenZoom={openZoom}
        />

        {/* Book */}
        <div style={{
          width: bookW,
          height: bookH,
          borderRadius: 6,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(24,90,133,0.18), 0 2px 8px rgba(0,0,0,0.08)",
          flexShrink: 0,
        }}>
          {!isZoomed && flipBook}
        </div>

      </div>
    </>
  );
}