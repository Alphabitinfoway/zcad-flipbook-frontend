import React, { useEffect, useState } from "react";

import axios from "axios";
import { baseURL } from "../../services/api";

import { uploadBook } from "../../services/bookService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface Product {
  id: number;
  title: string;
  handle: string;
  product_type: string;
}

export default function AddBookModal({ isOpen, onClose, onSuccess }: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  const [selectedProduct, setSelectedProduct] = useState("");

  const [title, setTitle] = useState("");

  const [author, setAuthor] = useState("");

  const [shopifyHandle, setShopifyHandle] = useState("");

  const [pdf, setPdf] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${baseURL}/shopify/products`);

      setProducts(res.data.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const product = products.find(
      (item) => item.id.toString() === e.target.value,
    );

    if (!product) return;

    setSelectedProduct(e.target.value);

    setTitle(product.title);

    setShopifyHandle(product.title);

    setAuthor(product.product_type || "");
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setShopifyHandle("");
    setPdf(null);
    setSelectedProduct("");
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduct) {
      alert("Please select a product");

      return;
    }

    if (!pdf) {
      alert("Please upload PDF");

      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("title", title);

      formData.append("author", author);

      formData.append("shopifyHandle", shopifyHandle);

      formData.append("productId", selectedProduct);

      formData.append("pdf", pdf);

      const response = await uploadBook(formData);

      console.log(response.data);

      onSuccess();

      resetForm();

      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}

        <div className="flex justify-between items-center px-6 py-5 border-b">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Add New Book
            </h2>

            <p className="text-sm text-gray-500">Upload book preview PDF</p>
          </div>

          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="text-xl text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* Form */}

        <form onSubmit={submitHandler} className="p-6 space-y-5">
          {/* Product */}

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Shopify Product
            </label>

            <select
              value={selectedProduct}
              onChange={handleProductChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none"
            >
              <option value="">Select Product</option>

              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.title}
                </option>
              ))}
            </select>
          </div>

          {/* Preview */}

          {title && (
            <div className="bg-gray-50 border rounded-lg p-4">
              <p className="text-sm mt-1">
                <span className="font-semibold">Handle:</span> {shopifyHandle}
              </p>
            </div>
          )}

          {/* Author */}

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Author Name
            </label>

            <input
              type="text"
              value={author}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50"
            />
          </div>

          {/* PDF */}

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Preview PDF
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdf(e.target.files?.[0] || null)}
              className="w-full border border-dashed border-gray-300 rounded-lg p-4"
            />
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-5 py-2 border rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={uploading}
              className="bg-primary-500 hover:bg-primary-600 px-6 py-2  border rounded-lg disabled:opacity-50 cursor-pointer"
            >
              {uploading ? "Uploading..." : "Save Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
