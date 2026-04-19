import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/admin/service-form";
import { prisma } from "@/lib/prisma";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();
  return <ServiceForm service={service} />;
}
