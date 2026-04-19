import { AdminPageHeader } from "@/components/admin/page-header";
import { ServicesTable } from "@/components/admin/services-table";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ServicesAdminPage() {
  const services = await prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Services"
        description="Every service shown on the public site is managed from here."
        action={{ label: "Add service", href: "/admin/services/new" }}
      />
      <ServicesTable rows={services} />
    </div>
  );
}
