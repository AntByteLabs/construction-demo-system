"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { FormCard } from "@/components/admin/form-card";
import { FormField, TextInput, TextArea, Select, Toggle } from "@/components/admin/form-field";
import { ImageUpload } from "@/components/admin/image-upload";
import { GalleryManager } from "@/components/admin/gallery-manager";
import { slugify } from "@/lib/utils";
import type { Project, ProjectImage } from "@prisma/client";
import {
  createProject,
  updateProject,
} from "@/app/admin/(console)/projects/actions";

const categories = ["Residential", "Commercial", "Industrial", "Interior", "Renovation"];

function toISODate(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toISOString().slice(0, 10);
}

export function ProjectForm({
  project,
  images = [],
}: {
  project?: Project;
  images?: ProjectImage[];
}) {
  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const action = project
    ? updateProject.bind(null, project.id)
    : createProject;

  const initialGallery = images
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((i) => ({
      label: i.label,
      url: i.url ?? null,
      caption: i.caption ?? null,
    }));

  return (
    <form action={action} className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/projects"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-steel text-ink-muted hover:border-orange hover:text-ink"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            {project ? "Edit project" : "New project"}
          </h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <FormCard title="Basic info">
            <FormField label="Title" required>
              <TextInput
                name="title"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!project) setSlug(slugify(e.target.value));
                }}
              />
            </FormField>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Slug" required>
                <TextInput
                  name="slug"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </FormField>
              <FormField label="Category" required>
                <Select name="category" defaultValue={project?.category ?? "Commercial"}>
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </FormField>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Client" required>
                <TextInput name="client" required defaultValue={project?.client ?? ""} />
              </FormField>
              <FormField label="Location" required>
                <TextInput
                  name="location"
                  required
                  defaultValue={project?.location ?? ""}
                />
              </FormField>
            </div>
            <FormField label="Completion date" required>
              <TextInput
                type="date"
                name="completionDate"
                required
                defaultValue={project ? toISODate(project.completionDate) : ""}
              />
            </FormField>
            <FormField label="Short description" required>
              <TextArea
                name="description"
                required
                rows={2}
                defaultValue={project?.description ?? ""}
              />
            </FormField>
            <FormField label="Full project story" required>
              <TextArea
                name="content"
                required
                rows={6}
                defaultValue={project?.content ?? ""}
              />
            </FormField>
          </FormCard>

          <FormCard title="Cover image" description="Main image shown on the projects list and detail page.">
            <ImageUpload
              name="coverUrl"
              defaultValue={project?.coverUrl ?? ""}
              labelName="coverLabel"
              defaultLabel={project?.coverLabel ?? ""}
              aspectRatio="video"
              category="project"
              hint="JPG, PNG, or WebP. Max 8MB. Recommended 1600×900."
            />
          </FormCard>

          <FormCard
            title="Project gallery"
            description="Upload additional photos shown on the project detail page. Images appear in the order you arrange them."
          >
            <GalleryManager defaultItems={initialGallery} />
          </FormCard>
        </div>

        <div className="space-y-6">
          <FormCard title="Settings">
            <FormField label="Sort order">
              <TextInput
                type="number"
                name="sortOrder"
                defaultValue={project?.sortOrder ?? 0}
              />
            </FormField>
            <Toggle
              name="isFeatured"
              defaultChecked={project?.isFeatured ?? false}
              label="Feature on homepage"
            />
            <Toggle
              name="isActive"
              defaultChecked={project?.isActive ?? true}
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
              {project ? "Save changes" : "Create project"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
