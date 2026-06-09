import { useState } from "react";
import { uploadBook } from "../../services/bookService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // ✅ missing hatu, add karyu
}

export default function AddBookModal({ isOpen, onClose, onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [shopifyHandle, setShopifyHandle] = useState("");
  const [pdf, setPdf] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false); // ✅ loading state add karyu

  if (!isOpen) return null;

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("shopifyHandle", shopifyHandle);

      if (pdf) {
        formData.append("pdf", pdf);
      }

      const response = await uploadBook(formData);
      console.log("Upload Success", response.data);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Upload Failed", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add New Book</h2>
          <button onClick={onClose} className="text-red-500 text-xl">
            ✕
          </button>
        </div>

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            placeholder="Book Title"
            className="w-full border p-3 rounded-lg"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Author"
            className="w-full border p-3 rounded-lg"
            value={author}
            required
            onChange={(e) => setAuthor(e.target.value)}
          />

          <input
            type="text"
            placeholder="Shopify Handle"
            className="w-full border p-3 rounded-lg"
            value={shopifyHandle}
            required
            onChange={(e) => setShopifyHandle(e.target.value)}
          />

          <input
            type="file"
            accept=".pdf"
            className="w-full border p-3 rounded-lg"
            onChange={(e) => setPdf(e.target.files?.[0] || null)}
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={uploading}
              className="bg-[#1e3a8a] text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Save Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}