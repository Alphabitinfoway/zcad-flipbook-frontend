import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/books/handle/${handle}`);

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
      <div className="max-w-7xl mx-auto py-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">{book.title}</h1>
          <p>{book.author}</p>
        </div>

        <div className="flex justify-center">
          <FlipBookViewer
            images={book.previewImages}
            handle={book.shopifyHandle}
            title={book.title}
            author={book.author}
          />
        </div>
      </div>
    </div>
  );
}
