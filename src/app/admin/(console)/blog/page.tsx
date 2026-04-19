import { AdminPageHeader } from "@/components/admin/page-header";
import { BlogTable } from "@/components/admin/blog-table";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BlogAdminPage() {
  const posts = await prisma.blogPost.findMany({
    include: { category: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Blog posts"
        description="Compose, edit, and publish articles to your public blog."
        action={{ label: "New post", href: "/admin/blog/new" }}
      />
      <BlogTable rows={posts} />
    </div>
  );
}
