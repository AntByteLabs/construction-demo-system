"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

type GalleryItem = { label: string; url: string | null; caption: string | null };

type Payload = {
  slug: string;
  title: string;
  category: string;
  location: string;
  client: string;
  completionDate: Date;
  description: string;
  content: string;
  coverLabel: string;
  coverUrl: string | null;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  galleryItems: GalleryItem[];
};

function extract(formData: FormData): Payload {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const completionRaw = String(formData.get("completionDate") ?? "");

  const galleryRaw = String(formData.get("galleryJson") ?? "[]");
  let galleryItems: GalleryItem[] = [];
  try {
    const parsed = JSON.parse(galleryRaw);
    if (Array.isArray(parsed)) {
      galleryItems = parsed
        .map((it) => ({
          label: String(it?.label ?? "").trim(),
          url: it?.url ? String(it.url) : null,
          caption: it?.caption ? String(it.caption) : null,
        }))
        .filter((it) => it.label || it.url);
    }
  } catch {
    /* ignore */
  }

  return {
    title,
    slug: slugify(slugInput || title),
    category: String(formData.get("category") ?? "Commercial"),
    location: String(formData.get("location") ?? ""),
    client: String(formData.get("client") ?? ""),
    completionDate: completionRaw ? new Date(completionRaw) : new Date(),
    description: String(formData.get("description") ?? ""),
    content: String(formData.get("content") ?? ""),
    coverLabel: String(formData.get("coverLabel") ?? ""),
    coverUrl: String(formData.get("coverUrl") ?? "").trim() || null,
    isFeatured: formData.get("isFeatured") === "on",
    isActive: formData.get("isActive") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0),
    galleryItems,
  };
}

export async function createProject(formData: FormData) {
  const data = extract(formData);
  const { galleryItems, ...rest } = data;
  await prisma.project.create({
    data: {
      ...rest,
      images: {
        create: galleryItems.map((img, i) => ({
          label: img.label,
          url: img.url,
          caption: img.caption,
          sortOrder: i,
        })),
      },
    },
  });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/gallery");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const data = extract(formData);
  const { galleryItems, ...rest } = data;
  await prisma.$transaction(async (tx) => {
    await tx.project.update({ where: { id }, data: rest });
    await tx.projectImage.deleteMany({ where: { projectId: id } });
    if (galleryItems.length > 0) {
      await tx.projectImage.createMany({
        data: galleryItems.map((img, i) => ({
          projectId: id,
          label: img.label,
          url: img.url,
          caption: img.caption,
          sortOrder: i,
        })),
      });
    }
  });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${data.slug}`);
  revalidatePath("/gallery");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}
