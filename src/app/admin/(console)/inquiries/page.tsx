import { AdminPageHeader } from "@/components/admin/page-header";
import { InquiriesInbox } from "@/components/admin/inquiries-inbox";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function InquiriesAdminPage() {
  const inquiries = await prisma.contactInquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Contact inquiries"
        description="Messages received from the public contact form."
      />
      <InquiriesInbox rows={inquiries} />
    </div>
  );
}
