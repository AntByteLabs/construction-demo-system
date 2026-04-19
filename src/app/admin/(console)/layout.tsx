import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-mist">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminTopbar />
        <main className="p-5 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
