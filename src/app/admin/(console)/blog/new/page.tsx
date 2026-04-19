import { PostForm } from "@/components/admin/post-form";
import { prisma } from "@/lib/prisma";

export default async function NewPostPage() {
  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: "asc" },
  });
  return <PostForm categories={categories} />;
}
