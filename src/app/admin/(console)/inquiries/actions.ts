"use server";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function markRead(id: string, isRead: boolean) {
  await requireAdmin();
  await prisma.contactInquiry.update({ where: { id }, data: { isRead } });
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}

export async function markAllRead() {
  await requireAdmin();
  await prisma.contactInquiry.updateMany({ data: { isRead: true } });
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}

export async function deleteInquiry(id: string) {
  await requireAdmin();
  await prisma.contactInquiry.delete({ where: { id } });
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}
