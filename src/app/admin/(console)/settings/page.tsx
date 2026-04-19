import { AdminPageHeader } from "@/components/admin/page-header";
import { SettingsForm } from "@/components/admin/settings-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function SettingsAdminPage() {
  const settings =
    (await prisma.settings.findUnique({ where: { id: "singleton" } })) ??
    (await prisma.settings.create({ data: { id: "singleton" } }));

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Site settings"
        description="Company info, contact, social, SEO, and branding."
      />
      <SettingsForm settings={settings} />
    </div>
  );
}
