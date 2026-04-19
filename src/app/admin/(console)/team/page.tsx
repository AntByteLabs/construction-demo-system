import { AdminPageHeader } from "@/components/admin/page-header";
import { TeamTable } from "@/components/admin/team-table";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function TeamAdminPage() {
  const team = await prisma.teamMember.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Team members"
        description="Manage profiles displayed on the public Team page."
        action={{ label: "Add member", href: "/admin/team/new" }}
      />
      <TeamTable rows={team} />
    </div>
  );
}
