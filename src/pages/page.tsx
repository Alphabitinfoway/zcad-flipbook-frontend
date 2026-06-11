import React, { forwardRef } from "react";

interface PageProps {
  image?: string;
  pageNumber?: number;
  children?: React.ReactNode;
}

const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ image, children, pageNumber }, ref) => {
    return (
      <div
        ref={ref}
        className="relative w-full h-full overflow-hidden bg-white"
      >
        {/* Top accent strip */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#185A85]/10 z-10" />

        {image ? (
          <img
            src={image}
            alt={`Page ${pageNumber ?? ""}`}
            className="w-full h-full object-contain bg-white"
          />
        ) : (
          children
        )}

        {/* Page number */}
        {pageNumber !== undefined && pageNumber > 0 && (
          <div className="absolute bottom-3 right-4 text-[11px] text-gray-300 font-medium select-none">
            {pageNumber}
          </div>
        )}

        {/* Fold corner hint */}
        {image && (
          <div
            className="absolute bottom-0 right-0 w-5 h-5"
            style={{
              background:
                "linear-gradient(135deg, transparent 50%, #E6F1FB 50%)",
            }}
          />
        )}
      </div>
    );
  }
);

Page.displayName = "Page";

export default Page;