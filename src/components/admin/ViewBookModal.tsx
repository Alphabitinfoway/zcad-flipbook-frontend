import React from "react";

const ViewBookModal = ({
  show,
  onClose,
  book,
}: any) => {

  if (!show || !book)
    return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white w-[600px] rounded-xl p-6">

        <div className="flex justify-between mb-5">

          <h2 className="text-xl font-bold">
            Book Details
          </h2>

          <button
            onClick={onClose}
            className="text-red-500"
          >
            ✕
          </button>

        </div>

        <div className="space-y-4">

          <div>
            <strong>
              Title:
            </strong>{" "}
            {book.title}
          </div>

          <div>
            <strong>
              Author:
            </strong>{" "}
            {book.author}
          </div>

          <div>
            <strong>
              Handle:
            </strong>{" "}
            {book.shopifyHandle}
          </div>

          <div>
            <strong>
              Product ID:
            </strong>{" "}
            {book.productId}
          </div>

          <div>
            <strong>
              PDF:
            </strong>

            <a
              href={book.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 ml-2"
            >
              View PDF
            </a>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ViewBookModal;