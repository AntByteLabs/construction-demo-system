"use server";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

type ServiceInput = {
  title: string;
  slug: string;
  icon: string;
  shortDesc: string;
  content: string;
  imageLabel: string;
  imageUrl: string | null;
  features: string;
  sortOrder: number;
  isActive: boolean;
};

function extract(formData: FormData): ServiceInput {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  return {
    title,
    slug: slugify(slugInput || title),
    icon: String(formData.get("icon") ?? "Building2"),
    shortDesc: String(formData.get("shortDesc") ?? ""),
    content: String(formData.get("content") ?? ""),
    imageLabel: String(formData.get("imageLabel") ?? ""),
    imageUrl: (String(formData.get("imageUrl") ?? "").trim() || null),
    features: JSON.stringify(
      String(formData.get("features") ?? "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
    ),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
    isActive: formData.get("isActive") === "on",
  };
}

export async function createService(formData: FormData) {
  await requireAdmin();
  const data = extract(formData);
  await prisma.service.create({ data });
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  await requireAdmin();
  const data = extract(formData);
  await prisma.service.update({ where: { id }, data });
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath(`/services/${data.slug}`);
  revalidatePath("/");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await requireAdmin();
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}
