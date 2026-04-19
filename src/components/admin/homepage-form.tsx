"use client";
import { Save } from "lucide-react";
import { FormCard } from "@/components/admin/form-card";
import { FormField, TextInput, TextArea } from "@/components/admin/form-field";
import { ImageUpload } from "@/components/admin/image-upload";
import type { HomepageContent } from "@prisma/client";
import { saveHomepage } from "@/app/admin/(console)/homepage/actions";

export function HomepageForm({ content }: { content: HomepageContent }) {
  return (
    <form action={saveHomepage} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <FormCard
            title="Hero section"
            description="The top of your homepage — headline, sub-copy, and the primary CTA."
          >
            <FormField label="Eyebrow (small label above headline)">
              <TextInput name="heroEyebrow" defaultValue={content.heroEyebrow} />
            </FormField>
            <FormField label="Headline" required>
              <TextInput name="heroTitle" required defaultValue={content.heroTitle} />
            </FormField>
            <FormField label="Sub-headline" required>
              <TextArea
                name="heroSubtitle"
                required
                rows={3}
                defaultValue={content.heroSubtitle}
              />
            </FormField>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="CTA button label">
                <TextInput name="heroCtaLabel" defaultValue={content.heroCtaLabel} />
              </FormField>
              <FormField label="CTA button link">
                <TextInput
                  name="heroCtaHref"
                  defaultValue={content.heroCtaHref}
                  placeholder="/contact"
                />
              </FormField>
            </div>
          </FormCard>

          <FormCard
            title="Hero image"
            description="The large photo shown on the right side of the hero."
          >
            <ImageUpload
              name="heroImageUrl"
              defaultValue={content.heroImageUrl ?? ""}
              labelName="heroImageLabel"
              defaultLabel={content.heroImageLabel ?? ""}
              aspectRatio="4/3"
              category="hero"
              hint="Recommended 1400×1050. JPG, PNG, or WebP. Max 8MB."
            />
          </FormCard>

          <FormCard
            title="Hero testimonial card"
            description="The small overlay card on the hero photo."
          >
            <FormField label="Quote" required>
              <TextArea
                name="heroTestimonialQuote"
                required
                rows={3}
                defaultValue={content.heroTestimonialQuote}
              />
            </FormField>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Name" required>
                <TextInput
                  name="heroTestimonialName"
                  required
                  defaultValue={content.heroTestimonialName}
                />
              </FormField>
              <FormField label="Role">
                <TextInput
                  name="heroTestimonialRole"
                  defaultValue={content.heroTestimonialRole}
                />
              </FormField>
            </div>
          </FormCard>

          <FormCard
            title="Feature banner image"
            description="Full-width photo shown after the About section."
          >
            <ImageUpload
              name="featureBannerImageUrl"
              defaultValue={content.featureBannerImageUrl ?? ""}
              labelName="featureBannerLabel"
              defaultLabel={content.featureBannerLabel ?? ""}
              aspectRatio="21/9"
              category="hero"
              hint="Ultra-wide photo, 2400×1200. JPG, PNG, or WebP."
            />
          </FormCard>
        </div>

        <div className="space-y-6">
          <FormCard
            title="Hero stats"
            description="Three metric pills below the hero CTA."
          >
            {([1, 2, 3] as const).map((n) => (
              <div key={n} className="space-y-3 border-b border-steel pb-5 last:border-b-0 last:pb-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                  Stat {n}
                </p>
                <FormField label="Value">
                  <TextInput
                    name={`heroStat${n}Value`}
                    defaultValue={
                      content[`heroStat${n}Value` as const] as string
                    }
                  />
                </FormField>
                <FormField label="Label">
                  <TextInput
                    name={`heroStat${n}Label`}
                    defaultValue={
                      content[`heroStat${n}Label` as const] as string
                    }
                  />
                </FormField>
              </div>
            ))}
          </FormCard>

          <div className="rounded-lg border border-steel bg-ink p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange">
              Publish changes
            </p>
            <p className="mt-2 text-sm text-white/70">
              Updates apply instantly to the public site.
            </p>
            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-orange px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-dark"
            >
              <Save className="h-4 w-4" />
              Save homepage
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
