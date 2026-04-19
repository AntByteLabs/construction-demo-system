"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function markRead(id: string, isRead: boolean) {
  await prisma.contactInquiry.update({ where: { id }, data: { isRead } });
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}

export async function markAllRead() {
  await prisma.contactInquiry.updateMany({ data: { isRead: true } });
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}

export async function deleteInquiry(id: string) {
  await prisma.contactInquiry.delete({ where: { id } });
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}
