"use client";
import { Save } from "lucide-react";
import { FormCard } from "@/components/admin/form-card";
import { FormField, TextInput, TextArea } from "@/components/admin/form-field";
import { ImageUpload } from "@/components/admin/image-upload";
import type { Settings } from "@prisma/client";
import { saveSettings } from "@/app/admin/(console)/settings/actions";

export function SettingsForm({ settings }: { settings: Settings }) {
  return (
    <form action={saveSettings} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <FormCard title="Company details">
            <FormField label="Company name" required>
              <TextInput name="companyName" defaultValue={settings.companyName} />
            </FormField>
            <FormField label="Tagline">
              <TextInput name="tagline" defaultValue={settings.tagline} />
            </FormField>
            <FormField label="Description">
              <TextArea name="description" rows={3} defaultValue={settings.description} />
            </FormField>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Phone">
                <TextInput name="phone" defaultValue={settings.phone} />
              </FormField>
              <FormField label="Email">
                <TextInput name="email" type="email" defaultValue={settings.email} />
              </FormField>
            </div>
            <FormField label="Address">
              <TextArea name="address" rows={2} defaultValue={settings.address} />
            </FormField>
            <FormField label="Office hours">
              <TextInput name="hours" defaultValue={settings.hours} />
            </FormField>
          </FormCard>

          <FormCard title="Social links">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Facebook">
                <TextInput name="facebook" defaultValue={settings.facebook} />
              </FormField>
              <FormField label="Twitter / X">
                <TextInput name="twitter" defaultValue={settings.twitter} />
              </FormField>
              <FormField label="LinkedIn">
                <TextInput name="linkedin" defaultValue={settings.linkedin} />
              </FormField>
              <FormField label="Instagram">
                <TextInput name="instagram" defaultValue={settings.instagram} />
              </FormField>
              <FormField label="YouTube">
                <TextInput name="youtube" defaultValue={settings.youtube} />
              </FormField>
            </div>
          </FormCard>

          <FormCard title="SEO">
            <FormField label="SEO title" hint="Used in browser tabs and search results.">
              <TextInput name="seoTitle" defaultValue={settings.seoTitle} />
            </FormField>
            <FormField label="Meta description">
              <TextArea name="seoDescription" rows={3} defaultValue={settings.seoDescription} />
            </FormField>
            <FormField label="Keywords" hint="Comma-separated.">
              <TextInput name="seoKeywords" defaultValue={settings.seoKeywords} />
            </FormField>
          </FormCard>
        </div>

        <div className="space-y-6">
          <FormCard title="Branding">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                Company logo
              </p>
              <div className="mt-2">
                <ImageUpload
                  name="logoUrl"
                  defaultValue={settings.logoUrl ?? ""}
                  aspectRatio="square"
                  category="branding"
                  hint="SVG or PNG with transparent background. Square aspect."
                />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                Favicon
              </p>
              <div className="mt-2">
                <ImageUpload
                  name="faviconUrl"
                  defaultValue={settings.faviconUrl ?? ""}
                  aspectRatio="square"
                  category="branding"
                  hint="32×32 or 64×64. PNG or ICO."
                />
              </div>
            </div>
          </FormCard>

          <FormCard title="Theme colors">
            <ColorInput name="primaryColor" label="Primary" defaultValue={settings.primaryColor} />
            <ColorInput name="secondaryColor" label="Secondary" defaultValue={settings.secondaryColor} />
            <ColorInput name="accentColor" label="Accent" defaultValue={settings.accentColor} />
            <p className="rounded-lg bg-mist/60 p-3 text-xs text-ink-muted">
              Note: theme colors are stored and can be consumed by the public theme in production. For this demo, they display as swatches.
            </p>
          </FormCard>

          <div className="rounded-2xl border border-steel/70 bg-ink p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber">
              Save changes
            </p>
            <p className="mt-2 text-sm text-white/70">
              Updates apply instantly across the live site.
            </p>
            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber px-4 py-3 text-sm font-bold text-ink transition hover:bg-white"
            >
              <Save className="h-4 w-4" />
              Save settings
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function ColorInput({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  return (
    <label className="flex items-center justify-between rounded-xl border border-steel bg-white p-3 pl-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
          {label}
        </p>
        <p className="mt-0.5 font-mono text-xs text-ink">{defaultValue}</p>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="color"
          name={name}
          defaultValue={defaultValue}
          className="h-10 w-10 cursor-pointer rounded-lg border-0 bg-transparent p-0"
        />
      </div>
    </label>
  );
}
