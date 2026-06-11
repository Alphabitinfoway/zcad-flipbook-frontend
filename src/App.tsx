import { BrowserRouter, Routes, Route } from "react-router-dom";

import BookPreview from "./pages/bookPreview";

// Admin Pages
import BookList from "./components/admin/BookList";
import { Toaster } from "react-hot-toast";

function App() {
  return (
<>
      <Toaster />
    <BrowserRouter>
      <Routes>
        {/* User Preview */}
        <Route path="/preview/:handle" element={<BookPreview />} />

        {/* Admin */}
        <Route path="/" element={<BookList />} />

        {/* Default Route */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen">
              <h1 className="text-3xl font-bold">Page Not Found</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
</>
  );
}

export default App;
