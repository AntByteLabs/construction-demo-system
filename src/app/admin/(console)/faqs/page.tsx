import { AdminPageHeader } from "@/components/admin/page-header";
import { FaqsTable } from "@/components/admin/faqs-table";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function FaqsAdminPage() {
  const faqs = await prisma.faq.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="FAQs"
        description="Questions and answers shown on the homepage FAQ section."
        action={{ label: "Add FAQ", href: "/admin/faqs/new" }}
      />
      <FaqsTable rows={faqs} />
    </div>
  );
}
