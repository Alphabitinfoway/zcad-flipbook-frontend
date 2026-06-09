import HTMLFlipBook from "react-pageflip";
import Page from "../pages/page";
import BuyNowPage from "./BuyNowPage";

interface Props {
  images?: string[];
  handle: string;
}

export default function FlipBookViewer({
  images = [],
  
  handle,
}: Props) {
  console.log("🚀 ~ FlipBookViewer ~ images:", images)
  return (
    <div className="flex justify-center">
      <HTMLFlipBook
        width={500}
        height={700}
        showCover={true}
        mobileScrollSupport={true}
        maxShadowOpacity={0.5}
      >
        {images.map((img, index) => (
          <Page
            key={index}
            image={img}
          />
        ))}

        <Page>
          <BuyNowPage handle={handle} />
        </Page>
      </HTMLFlipBook>
    </div>
  );
}