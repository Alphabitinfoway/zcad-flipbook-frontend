interface Props {
  handle: string;
}

const features = [
  "Full book access",
  "All chapters included",
  "Instant delivery",
];

export default function BuyNowPage({ handle }: Props) {
  const handleBuy = () => {
    window.open(
      `https://zcadgroup.myshopify.com/products/${handle}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="relative w-full h-full bg-white flex flex-col items-center justify-center px-8 text-center gap-5 overflow-hidden">

      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#185A85]" />

      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-[#E6F1FB] flex items-center justify-center">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#185A85"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      </div>

      {/* Text */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Preview Complete
        </h2>
        <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
          You've reached the end of the preview. Get full access to continue
          reading.
        </p>
      </div>

      {/* Features list */}
      <div className="w-full max-w-xs bg-[#E6F1FB] rounded-lg px-5 py-4 text-left space-y-2">
        {features.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 text-sm text-[#185A85]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#185A85"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {item}
          </div>
        ))}
      </div>

      {/* Buy button */}
      <button
        onClick={handleBuy}
        className="w-full max-w-xs bg-[#185A85] hover:bg-[#0C447C] active:scale-95 text-white py-3 rounded-lg font-medium text-sm transition-all"
      >
        Buy Full Book →
      </button>

      <p className="text-[10px] text-gray-300 tracking-widest uppercase">
        ZCAD Publications
      </p>
    </div>
  );
}