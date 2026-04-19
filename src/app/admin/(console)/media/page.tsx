import { AdminPageHeader } from "@/components/admin/page-header";
import { MediaLibrary } from "@/components/admin/media-library";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function MediaAdminPage() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Media library"
        description="Manage image placeholders and asset metadata."
      />
      <MediaLibrary rows={media} />
    </div>
  );
}
