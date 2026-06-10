import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaTachometerAlt,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-200 shadow-sm">

      {/* Logo */}
      <div className="p-6 border-b border-gray-200">

        <h2 className="text-2xl font-bold text-gray-800">
          ZCAD Admin
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Publication Management
        </p>

      </div>

      {/* Menu */}
      <nav className="p-4 space-y-2">

        <Link
          to="/admin"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-primary-500 transition-all duration-200"
        >
          <FaTachometerAlt size={18} />

          <span className="font-medium">
            Dashboard
          </span>
        </Link>

        <Link
          to="/admin/books"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-primary-500 transition-all duration-200"
        >
          <FaBookOpen size={18} />

          <span className="font-medium">
            Books
          </span>
        </Link>

      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">

        <p className="text-xs text-center text-gray-400">
          © ZCAD Publication
        </p>

      </div>

    </aside>
  );
}