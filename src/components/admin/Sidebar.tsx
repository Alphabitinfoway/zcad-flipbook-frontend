import { Link } from "react-router-dom";

import {
  FaBookOpen,
  FaTachometerAlt,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#1e3a8a] text-white shadow-lg">

      <div className="p-6 border-b border-blue-500">
        <h2 className="text-2xl font-bold">
          ZCAD Admin
        </h2>

        <p className="text-sm text-blue-200 mt-1">
          Book Preview Management
        </p>
      </div>

      <nav className="p-4 space-y-2">

        <Link
          to="/admin"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-700 transition-all"
        >
          <FaTachometerAlt size={18} />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/admin/books"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-700 transition-all"
        >
          <FaBookOpen size={18} />
          <span>Books</span>
        </Link>

      </nav>

    </aside>
  );
}