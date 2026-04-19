import { AdminPageHeader } from "@/components/admin/page-header";
import { ProjectsTable } from "@/components/admin/projects-table";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProjectsAdminPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Projects"
        description="Manage your portfolio — publish, feature, and categorize projects."
        action={{ label: "Add project", href: "/admin/projects/new" }}
      />
      <ProjectsTable rows={projects} />
    </div>
  );
}
