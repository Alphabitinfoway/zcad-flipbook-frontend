import type{ ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="ml-72">
        <Topbar />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}