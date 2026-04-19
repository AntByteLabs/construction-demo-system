import { AdminPageHeader } from "@/components/admin/page-header";
import { HomepageForm } from "@/components/admin/homepage-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomepageAdminPage() {
  const content =
    (await prisma.homepageContent.findUnique({ where: { id: "singleton" } })) ??
    (await prisma.homepageContent.create({ data: { id: "singleton" } }));

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Homepage"
        description="Hero, testimonial card, stats, and the feature banner image."
      />
      <HomepageForm content={content} />
    </div>
  );
}
