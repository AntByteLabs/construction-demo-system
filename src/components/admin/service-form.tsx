"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { FormCard } from "@/components/admin/form-card";
import { FormField, TextInput, TextArea, Select, Toggle } from "@/components/admin/form-field";
import { ImageUpload } from "@/components/admin/image-upload";
import { parseJSON, slugify } from "@/lib/utils";
import type { Service } from "@prisma/client";
import { createService, updateService } from "@/app/admin/(console)/services/actions";

const iconOptions = [
  "Home",
  "Building2",
  "Factory",
  "Sofa",
  "Hammer",
  "ClipboardCheck",
  "Wrench",
  "HardHat",
  "Layers",
  "Ruler",
];

export function ServiceForm({ service }: { service?: Service }) {
  const [title, setTitle] = useState(service?.title ?? "");
  const [slug, setSlug] = useState(service?.slug ?? "");
  const featuresArray = parseJSON<string[]>(service?.features ?? null, []);

  const action = service
    ? updateService.bind(null, service.id)
    : createService;

  return (
    <form action={action} className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/services"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-steel text-ink-muted hover:border-amber hover:text-ink"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            {service ? "Edit service" : "New service"}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            {service ? "Update service details and visibility." : "Add a new service to your website."}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <FormCard title="Basic info" description="Shown on the services list and detail page.">
            <FormField label="Title" required>
              <TextInput
                name="title"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!service) setSlug(slugify(e.target.value));
                }}
              />
            </FormField>
            <FormField label="Slug" hint="URL-friendly identifier, e.g. residential-construction" required>
              <TextInput
                name="slug"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </FormField>
            <FormField label="Short description" required>
              <TextArea
                name="shortDesc"
                required
                rows={2}
                defaultValue={service?.shortDesc ?? ""}
              />
            </FormField>
            <FormField label="Detail page content" required>
              <TextArea
                name="content"
                required
                rows={6}
                defaultValue={service?.content ?? ""}
              />
            </FormField>
            <FormField
              label="Capability list"
              hint="One item per line. Shown as bulleted features."
            >
              <TextArea
                name="features"
                rows={6}
                defaultValue={featuresArray.join("\n")}
              />
            </FormField>
          </FormCard>

          <FormCard title="Service image" description="Upload the cover image shown on the services list and detail page.">
            <ImageUpload
              name="imageUrl"
              defaultValue={service?.imageUrl ?? ""}
              labelName="imageLabel"
              defaultLabel={service?.imageLabel ?? ""}
              aspectRatio="video"
              category="service"
              hint="JPG, PNG, or WebP. Max 8MB. Recommended 1600×900."
            />
          </FormCard>
        </div>

        <div className="space-y-6">
          <FormCard title="Settings">
            <FormField label="Icon">
              <Select name="icon" defaultValue={service?.icon ?? "Building2"}>
                {iconOptions.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField label="Sort order" hint="Lower numbers appear first.">
              <TextInput
                type="number"
                name="sortOrder"
                defaultValue={service?.sortOrder ?? 0}
              />
            </FormField>
            <Toggle
              name="isActive"
              defaultChecked={service?.isActive ?? true}
              label="Active — show on public site"
            />
          </FormCard>

          <div className="rounded-2xl border border-steel/70 bg-ink p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber">
              Ready to save?
            </p>
            <p className="mt-2 text-sm text-white/70">
              Changes are published immediately to your live site.
            </p>
            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber px-4 py-3 text-sm font-bold text-ink transition hover:bg-white"
            >
              <Save className="h-4 w-4" />
              {service ? "Save changes" : "Create service"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
