import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";
import FlipBookViewer from "../components/FlipBookViewer";

interface Book {
  _id: string;
  title: string;
  author: string;
  shopifyHandle: string;
  previewImages: string[];
  previewPages: number;
  pdfUrl?: string;
}

export default function BookPreview() {
  const { handle } = useParams();

  const [book, setBook] = useState<Book | null>(null);
  console.log("🚀 ~ BookPreview ~ book:", book)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  console.log("BOOK:", book);
console.log("BOOK PREVIEW IMAGES:", book?.previewImages);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/books/handle/${handle}`);
        console.log("🚀 ~ fetchBook ~ res:", res)
        setBook(res.data.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (handle) {
      fetchBook();
    }
  }, [handle]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !book) {
    return <div>Book Not Found</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto py-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">{book.title}</h1>
          <p>{book.author}</p>
        </div>

        <div className="flex justify-center">
          <FlipBookViewer
  images={book.previewImages}
  handle={book.shopifyHandle}
/>
        </div>
      </div>
    </div>
  );
}