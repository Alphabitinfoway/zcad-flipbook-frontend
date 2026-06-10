import React, { useEffect, useState } from "react";

import { updateBook } from "../../services/bookService";

const EditBookModal = ({ show, onClose, book, onSuccess }: any) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    shopifyHandle: "",
  });
  const [pdf, setPdf] = useState<File | null>(null);
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",

        author: book.author || "",

        shopifyHandle: book.shopifyHandle || "",
      });
    }
  }, [book]);

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      data.append("title", formData.title);

      data.append("author", formData.author);

      data.append("shopifyHandle", formData.shopifyHandle);

      if (pdf) {
        data.append("pdf", pdf);
      }

      await updateBook(book._id, data);

      onSuccess();

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!show || !book) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] rounded-xl p-6">
        <h2 className="text-xl font-bold mb-5">Edit Book</h2>

        <input
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
          className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 mb-2"
        />

        <input
          value={formData.author}
          onChange={(e) =>
            setFormData({
              ...formData,
              author: e.target.value,
            })
          }
          className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 mb-2"
        />

        <input
          value={formData.shopifyHandle}
          onChange={(e) =>
            setFormData({
              ...formData,
              shopifyHandle: e.target.value,
            })
          }
          className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 mb-2"
        />
        <div className="mt-3">
          <label className="block mb-2 font-medium">
            Change PDF (Optional)
          </label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setPdf(e.target.files?.[0] || null)}
            className="w-full border border-dashed border-gray-300 rounded-lg p-4"
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="bg-primary-500 hover:bg-primary-600 px-6 py-2  border rounded-lg disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-primary-500 hover:bg-primary-600 px-6 py-2  border rounded-lg disabled:opacity-50 cursor-pointer"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookModal;
