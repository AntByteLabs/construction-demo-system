import { AdminPageHeader } from "@/components/admin/page-header";
import { TestimonialsTable } from "@/components/admin/testimonials-table";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function TestimonialsAdminPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }],
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Testimonials"
        description="Manage the testimonials shown on the homepage and public site."
        action={{ label: "Add testimonial", href: "/admin/testimonials/new" }}
      />
      <TestimonialsTable rows={testimonials} />
    </div>
  );
}
