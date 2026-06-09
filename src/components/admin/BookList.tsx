import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import DataTable from "react-data-table-component";

import AdminLayout from "../../components/admin/AdminLayout";
import AddBookModal from "../../components/admin/AddBookModal";
import { getBooks } from "../../services/bookService";
import type { Book } from "../../types/book";

export default function BookList() {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await getBooks();
      setBooks(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchBooks();
  }, []);

  const columns = [
    {
      name: "#",
      cell: (_row: Book, index: number) => index + 1,
      width: "60px",
    },
    {
      name: "Book Title",
      selector: (row: Book) => row.title,
      sortable: true,
    },
    {
      name: "Author",
      selector: (row: Book) => row.author,
    },
    {
      name: "Preview Pages",
      selector: (row: Book) => row.previewPages,
      center: true,
    },
    {
      name: "Status",
      cell: (row: Book) => (
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            row.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row: Book) => (
        <div className="flex gap-3">
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => console.log("Edit", row._id)}
          >
            <FaEdit />
          </button>
          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => console.log("Delete", row._id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const filteredData = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Book Management</h2>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-[#1e3a8a] text-white px-5 py-2 rounded-lg flex items-center gap-2"
          >
            <FaPlus />
            Add Book
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Books..."
            className="border rounded-lg px-4 py-2 w-80"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          progressPending={loading}
          pagination
          highlightOnHover
          responsive
        />

        <AddBookModal
          isOpen={openModal}
          onSuccess={fetchBooks}
          onClose={() => setOpenModal(false)}
        />
      </div>
    </AdminLayout>
  );
}