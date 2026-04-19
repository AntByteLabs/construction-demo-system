import { notFound } from "next/navigation";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { prisma } from "@/lib/prisma";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();
  return <TestimonialForm testimonial={testimonial} />;
}
