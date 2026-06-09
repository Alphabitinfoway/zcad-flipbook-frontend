interface Props {
  handle: string;
}

export default function BuyNowPage({
  handle,
}: Props) {
  return (
    <div className="h-full flex flex-col justify-center items-center p-8">

      <h1 className="text-4xl font-bold mb-4">
        Preview Completed
      </h1>

      <p className="mb-6">
        Purchase the full book to continue reading.
      </p>

      <button
        onClick={() =>
          window.open(
            `https://zcadgroup.myshopify.com/products/${handle}`,
            "_blank"
          )
        }
        className="bg-purple-700 text-white px-6 py-3 rounded-lg"
      >
        Buy Full Book
      </button>

    </div>
  );
}