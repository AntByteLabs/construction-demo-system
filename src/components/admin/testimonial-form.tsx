"use client";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { FormCard } from "@/components/admin/form-card";
import { FormField, TextInput, TextArea, Select, Toggle } from "@/components/admin/form-field";
import { ImageUpload } from "@/components/admin/image-upload";
import type { Testimonial } from "@prisma/client";
import {
  createTestimonial,
  updateTestimonial,
} from "@/app/admin/(console)/testimonials/actions";

export function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  const action = testimonial
    ? updateTestimonial.bind(null, testimonial.id)
    : createTestimonial;

  return (
    <form action={action} className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/testimonials"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-steel text-ink-muted hover:border-orange hover:text-ink"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            {testimonial ? "Edit testimonial" : "New testimonial"}
          </h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <FormCard title="Testimonial content">
            <FormField label="Quote" required>
              <TextArea
                name="quote"
                required
                rows={5}
                defaultValue={testimonial?.quote ?? ""}
              />
            </FormField>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Name" required>
                <TextInput
                  name="name"
                  required
                  defaultValue={testimonial?.name ?? ""}
                />
              </FormField>
              <FormField label="Role / title">
                <TextInput
                  name="role"
                  defaultValue={testimonial?.role ?? ""}
                  placeholder="Homeowner, Property owner, etc."
                />
              </FormField>
            </div>
          </FormCard>

          <FormCard title="Author photo" description="Optional — falls back to initials avatar.">
            <ImageUpload
              name="photoUrl"
              defaultValue={testimonial?.photoUrl ?? ""}
              aspectRatio="square"
              category="general"
              hint="Square crop preferred. JPG, PNG, or WebP."
            />
          </FormCard>
        </div>

        <div className="space-y-6">
          <FormCard title="Settings">
            <FormField label="Rating (1–5)">
              <Select name="rating" defaultValue={String(testimonial?.rating ?? 5)}>
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} star{n > 1 ? "s" : ""}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField label="Sort order">
              <TextInput
                type="number"
                name="sortOrder"
                defaultValue={testimonial?.sortOrder ?? 0}
              />
            </FormField>
            <Toggle
              name="isFeatured"
              defaultChecked={testimonial?.isFeatured ?? false}
              label="Feature on homepage"
            />
            <Toggle
              name="isActive"
              defaultChecked={testimonial?.isActive ?? true}
              label="Active — show on public site"
            />
          </FormCard>

          <div className="rounded-lg border border-steel bg-ink p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange">
              Ready to save?
            </p>
            <button
              type="submit"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-orange px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-dark"
            >
              <Save className="h-4 w-4" />
              {testimonial ? "Save changes" : "Create testimonial"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
