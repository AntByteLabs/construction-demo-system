import { notFound } from "next/navigation";
import { FaqForm } from "@/components/admin/faq-form";
import { prisma } from "@/lib/prisma";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const faq = await prisma.faq.findUnique({ where: { id } });
  if (!faq) notFound();
  return <FaqForm faq={faq} />;
}
