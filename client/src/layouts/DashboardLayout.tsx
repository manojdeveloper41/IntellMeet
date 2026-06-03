import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-8 text-white">
          {children}
        </main>

      </div>

    </div>
  );
}