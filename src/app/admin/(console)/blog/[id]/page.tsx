import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/post-form";
import { prisma } from "@/lib/prisma";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post, categories] = await Promise.all([
    prisma.blogPost.findUnique({ where: { id } }),
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!post) notFound();
  return <PostForm post={post} categories={categories} />;
}
