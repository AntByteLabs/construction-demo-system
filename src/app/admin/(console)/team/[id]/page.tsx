import { notFound } from "next/navigation";
import { MemberForm } from "@/components/admin/member-form";
import { prisma } from "@/lib/prisma";

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) notFound();
  return <MemberForm member={member} />;
}
