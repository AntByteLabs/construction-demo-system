"use server";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

function extract(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const status = String(formData.get("status") ?? "draft");

  return {
    title,
    slug: slugify(slugInput || title),
    excerpt: String(formData.get("excerpt") ?? ""),
    content: String(formData.get("content") ?? ""),
    coverLabel: String(formData.get("coverLabel") ?? ""),
    coverUrl: String(formData.get("coverUrl") ?? "").trim() || null,
    author: String(formData.get("author") ?? ""),
    authorRole: String(formData.get("authorRole") ?? ""),
    readMinutes: Number(formData.get("readMinutes") ?? 5),
    tags: JSON.stringify(
      String(formData.get("tags") ?? "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    ),
    status,
    publishedAt:
      status === "published"
        ? formData.get("publishedAt")
          ? new Date(String(formData.get("publishedAt")))
          : new Date()
        : null,
    isFeatured: formData.get("isFeatured") === "on",
    categoryId: String(formData.get("categoryId") ?? "") || null,
  };
}

export async function createPost(formData: FormData) {
  await requireAdmin();
  await prisma.blogPost.create({ data: extract(formData) });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function updatePost(id: string, formData: FormData) {
  await requireAdmin();
  const data = extract(formData);
  await prisma.blogPost.update({ where: { id }, data });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function deletePost(id: string) {
  await requireAdmin();
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
}
