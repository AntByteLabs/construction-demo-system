"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function extract(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    bio: String(formData.get("bio") ?? "").trim(),
    photoLabel: String(formData.get("photoLabel") ?? "").trim(),
    photoUrl: String(formData.get("photoUrl") ?? "").trim() || null,
    email: String(formData.get("email") ?? "").trim() || null,
    linkedin: String(formData.get("linkedin") ?? "").trim() || null,
    twitter: String(formData.get("twitter") ?? "").trim() || null,
    facebook: String(formData.get("facebook") ?? "").trim() || null,
    sortOrder: Number(formData.get("sortOrder") ?? 0),
    isActive: formData.get("isActive") === "on",
  };
}

export async function createMember(formData: FormData) {
  await prisma.teamMember.create({ data: extract(formData) });
  revalidatePath("/admin/team");
  revalidatePath("/team");
  revalidatePath("/");
  redirect("/admin/team");
}

export async function updateMember(id: string, formData: FormData) {
  await prisma.teamMember.update({ where: { id }, data: extract(formData) });
  revalidatePath("/admin/team");
  revalidatePath("/team");
  revalidatePath("/");
  redirect("/admin/team");
}

export async function deleteMember(id: string) {
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/admin/team");
  revalidatePath("/team");
  revalidatePath("/");
}
