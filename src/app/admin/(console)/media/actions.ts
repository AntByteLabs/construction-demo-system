"use server";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { unlink } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";

export async function deleteMedia(id: string) {
  await requireAdmin();
  const media = await prisma.media.findUnique({ where: { id } });
  if (media?.filename) {
    try {
      await unlink(path.join(process.cwd(), "public", "uploads", media.filename));
    } catch {
      /* file already missing */
    }
  }
  await prisma.media.delete({ where: { id } });
  revalidatePath("/admin/media");
}
