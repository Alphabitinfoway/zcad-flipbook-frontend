import React, { forwardRef } from "react";

interface PageProps {
  image?: string;
  children?: React.ReactNode;
}

const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ image, children }, ref) => {
    return (
      <div
        ref={ref}
        className="w-full h-full bg-white"
      >
        {image ? (
          <img
            src={image}
            alt="Book Page"
            className="w-full h-full object-cover"
          />
        ) : (
          children
        )}
      </div>
    );
  }
);

Page.displayName = "Page";

export default Page;