"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function saveHomepage(formData: FormData) {
  const data = {
    heroEyebrow: String(formData.get("heroEyebrow") ?? ""),
    heroTitle: String(formData.get("heroTitle") ?? ""),
    heroSubtitle: String(formData.get("heroSubtitle") ?? ""),
    heroCtaLabel: String(formData.get("heroCtaLabel") ?? ""),
    heroCtaHref: String(formData.get("heroCtaHref") ?? ""),
    heroImageUrl: String(formData.get("heroImageUrl") ?? "").trim() || null,
    heroImageLabel: String(formData.get("heroImageLabel") ?? ""),
    heroTestimonialQuote: String(formData.get("heroTestimonialQuote") ?? ""),
    heroTestimonialName: String(formData.get("heroTestimonialName") ?? ""),
    heroTestimonialRole: String(formData.get("heroTestimonialRole") ?? ""),
    heroStat1Value: String(formData.get("heroStat1Value") ?? ""),
    heroStat1Label: String(formData.get("heroStat1Label") ?? ""),
    heroStat2Value: String(formData.get("heroStat2Value") ?? ""),
    heroStat2Label: String(formData.get("heroStat2Label") ?? ""),
    heroStat3Value: String(formData.get("heroStat3Value") ?? ""),
    heroStat3Label: String(formData.get("heroStat3Label") ?? ""),
    featureBannerImageUrl:
      String(formData.get("featureBannerImageUrl") ?? "").trim() || null,
    featureBannerLabel: String(formData.get("featureBannerLabel") ?? ""),
  };

  await prisma.homepageContent.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });

  revalidatePath("/");
  revalidatePath("/admin/homepage");
}
