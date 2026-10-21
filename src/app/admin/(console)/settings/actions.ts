"use server";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function saveSettings(formData: FormData) {
  await requireAdmin();
  const data = {
    logoUrl: String(formData.get("logoUrl") ?? "").trim() || null,
    faviconUrl: String(formData.get("faviconUrl") ?? "").trim() || null,
    companyName: String(formData.get("companyName") ?? ""),
    tagline: String(formData.get("tagline") ?? ""),
    description: String(formData.get("description") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    address: String(formData.get("address") ?? ""),
    hours: String(formData.get("hours") ?? ""),
    facebook: String(formData.get("facebook") ?? ""),
    twitter: String(formData.get("twitter") ?? ""),
    linkedin: String(formData.get("linkedin") ?? ""),
    instagram: String(formData.get("instagram") ?? ""),
    youtube: String(formData.get("youtube") ?? ""),
    primaryColor: String(formData.get("primaryColor") ?? "#1F2937"),
    secondaryColor: String(formData.get("secondaryColor") ?? "#F59E0B"),
    accentColor: String(formData.get("accentColor") ?? "#2563EB"),
    seoTitle: String(formData.get("seoTitle") ?? ""),
    seoDescription: String(formData.get("seoDescription") ?? ""),
    seoKeywords: String(formData.get("seoKeywords") ?? ""),
  };

  await prisma.settings.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
}
