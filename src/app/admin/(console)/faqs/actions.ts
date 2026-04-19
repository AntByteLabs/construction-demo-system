"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

function extract(formData: FormData) {
  return {
    question: String(formData.get("question") ?? "").trim(),
    answer: String(formData.get("answer") ?? "").trim(),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
    isActive: formData.get("isActive") === "on",
  };
}

export async function createFaq(formData: FormData) {
  await prisma.faq.create({ data: extract(formData) });
  revalidatePath("/admin/faqs");
  revalidatePath("/");
  redirect("/admin/faqs");
}

export async function updateFaq(id: string, formData: FormData) {
  await prisma.faq.update({ where: { id }, data: extract(formData) });
  revalidatePath("/admin/faqs");
  revalidatePath("/");
  redirect("/admin/faqs");
}

export async function deleteFaq(id: string) {
  await prisma.faq.delete({ where: { id } });
  revalidatePath("/admin/faqs");
  revalidatePath("/");
}
