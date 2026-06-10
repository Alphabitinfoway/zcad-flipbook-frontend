import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios"
import { uploadBook } from "../../services/bookService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface Product {
  id: string;
  title: string;
  handle: string;
}

export default function AddBookModal({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const [title, setTitle] =
    useState("");

  const [author, setAuthor] =
    useState("");

  const [
    shopifyHandle,
    setShopifyHandle,
  ] = useState("");

  const [pdf, setPdf] =
    useState<File | null>(null);

  const [uploading, setUploading] =
    useState(false);

  const [products, setProducts] =
    useState<Product[]>([]);

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  const fetchProducts =
    async () => {
      try {
        const res =
          await axios.get(
            "/shopify/products"
          );

        setProducts(
          res.data.products || []
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleProductChange =
    (
      e: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const product =
        products.find(
          (item) =>
            item.id ===
            e.target.value
        );

      setSelectedProduct(
        e.target.value
      );

      setTitle(
        product?.title || ""
      );

      setShopifyHandle(
        product?.handle || ""
      );
    };

  const submitHandler =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setUploading(true);

        const formData =
          new FormData();

        formData.append(
          "title",
          title
        );

        formData.append(
          "author",
          author
        );

        formData.append(
          "shopifyHandle",
          shopifyHandle
        );

        if (pdf) {
          formData.append(
            "pdf",
            pdf
          );
        }

        const response =
          await uploadBook(
            formData
          );

        console.log(
          response.data
        );

        onSuccess();

        onClose();

        setTitle("");
        setAuthor("");
        setShopifyHandle("");
        setPdf(null);
        setSelectedProduct("");

      } catch (error) {

        console.log(error);

      } finally {

        setUploading(false);

      }
    };

  if (!isOpen)
    return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="flex justify-between items-center p-6 border-b">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Add New Book
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Upload Book Preview PDF
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-red-500"
          >
            ✕
          </button>

        </div>

        {/* Body */}

        <form
          onSubmit={
            submitHandler
          }
          className="p-6 space-y-5"
        >

          {/* Product */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shopify Product
            </label>

            <select
              value={
                selectedProduct
              }
              onChange={
                handleProductChange
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">
                Select Product
              </option>

              {products.map(
                (
                  product
                ) => (
                  <option
                    key={
                      product.id
                    }
                    value={
                      product.id
                    }
                  >
                    {
                      product.title
                    }
                  </option>
                )
              )}
            </select>

          </div>

          {/* Book Title */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Book Title
            </label>

            <input
              type="text"
              value={title}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50"
            />

          </div>

          {/* Author */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author
            </label>

            <input
              type="text"
              placeholder="Author Name"
              value={author}
              required
              onChange={(e) =>
                setAuthor(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />

          </div>

          {/* Handle */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shopify Handle
            </label>

            <input
              type="text"
              value={
                shopifyHandle
              }
              readOnly
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50"
            />

          </div>

          {/* PDF */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview PDF
            </label>

            <input
              type="file"
              accept=".pdf"
              required
              onChange={(e) =>
                setPdf(
                  e.target
                    .files?.[0] ||
                    null
                )
              }
              className="w-full border border-dashed border-gray-300 rounded-lg p-4"
            />

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 pt-4 border-t">

            <button
              type="button"
              onClick={
                onClose
              }
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                uploading
              }
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              {uploading
                ? "Uploading..."
                : "Save Book"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}