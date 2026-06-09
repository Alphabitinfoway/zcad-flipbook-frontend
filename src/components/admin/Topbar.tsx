export default function Topbar() {
  return (
    <header className="h-20 bg-white shadow flex items-center justify-between px-6">

      <h1 className="text-xl font-semibold">
        Book Management
      </h1>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-700" />
      </div>

    </header>
  );
}