export default function Topbar() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6">

      <h1 className="text-2xl font-semibold text-gray-800">
        Book Management
      </h1>

      <div className="flex items-center gap-3">

        <div className="text-right">
          <p className="text-sm font-medium text-gray-700">
            Admin
          </p>

          <p className="text-xs text-gray-500">
            ZCAD Publication
          </p>
        </div>

        <div className="h-10 w-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold">
          A
        </div>

      </div>

    </header>
  );
}