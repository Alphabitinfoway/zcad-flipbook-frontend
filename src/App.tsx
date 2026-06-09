import { BrowserRouter, Routes, Route } from "react-router-dom";

import BookPreview from "./pages/bookPreview";

// Admin Pages
import BookList from "./components/admin/BookList";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* User Preview */}
        <Route
          path="/preview/:handle"
          element={<BookPreview />}
        />

        {/* Admin */}
        <Route
          path="/admin/books"
          element={<BookList />}
        />

        {/* Default Route */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen">
              <h1 className="text-3xl font-bold">
                Page Not Found
              </h1>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;