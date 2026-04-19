"use client";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { FormCard } from "@/components/admin/form-card";
import { FormField, TextInput, TextArea, Toggle } from "@/components/admin/form-field";
import { ImageUpload } from "@/components/admin/image-upload";
import type { TeamMember } from "@prisma/client";
import {
  createMember,
  updateMember,
} from "@/app/admin/(console)/team/actions";

export function MemberForm({ member }: { member?: TeamMember }) {
  const action = member ? updateMember.bind(null, member.id) : createMember;

  return (
    <form action={action} className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/team"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-steel text-ink-muted hover:border-amber hover:text-ink"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            {member ? "Edit member" : "New team member"}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            {member ? "Update profile and social links." : "Add a new team member."}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <FormCard title="Profile">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Full name" required>
                <TextInput name="name" required defaultValue={member?.name ?? ""} />
              </FormField>
              <FormField label="Role / title" required>
                <TextInput name="role" required defaultValue={member?.role ?? ""} />
              </FormField>
            </div>
            <FormField label="Short bio" required>
              <TextArea name="bio" required rows={4} defaultValue={member?.bio ?? ""} />
            </FormField>
          </FormCard>

          <FormCard title="Contact">
            <FormField label="Email">
              <TextInput
                type="email"
                name="email"
                defaultValue={member?.email ?? ""}
                placeholder="name@antbytelabs.com"
              />
            </FormField>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="LinkedIn">
                <TextInput
                  name="linkedin"
                  defaultValue={member?.linkedin ?? ""}
                  placeholder="https://linkedin.com/in/..."
                />
              </FormField>
              <FormField label="Twitter / X">
                <TextInput
                  name="twitter"
                  defaultValue={member?.twitter ?? ""}
                  placeholder="https://twitter.com/..."
                />
              </FormField>
              <FormField label="Facebook">
                <TextInput
                  name="facebook"
                  defaultValue={member?.facebook ?? ""}
                  placeholder="https://facebook.com/..."
                />
              </FormField>
            </div>
          </FormCard>
        </div>

        <div className="space-y-6">
          <FormCard title="Photo" description="Upload a portrait photo of the team member.">
            <ImageUpload
              name="photoUrl"
              defaultValue={member?.photoUrl ?? ""}
              labelName="photoLabel"
              defaultLabel={member?.photoLabel ?? ""}
              aspectRatio="portrait"
              category="team"
              hint="Portrait crop preferred. JPG, PNG, or WebP. Max 8MB."
            />
          </FormCard>

          <FormCard title="Settings">
            <FormField label="Sort order">
              <TextInput
                type="number"
                name="sortOrder"
                defaultValue={member?.sortOrder ?? 0}
              />
            </FormField>
            <Toggle
              name="isActive"
              defaultChecked={member?.isActive ?? true}
              label="Active — show on public site"
            />
          </FormCard>

          <div className="rounded-2xl border border-steel/70 bg-ink p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber">
              Ready to save?
            </p>
            <button
              type="submit"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber px-4 py-3 text-sm font-bold text-ink transition hover:bg-white"
            >
              <Save className="h-4 w-4" />
              {member ? "Save changes" : "Create member"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
