"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { FormCard } from "@/components/admin/form-card";
import { FormField, TextInput, TextArea, Select, Toggle } from "@/components/admin/form-field";
import { ImageUpload } from "@/components/admin/image-upload";
import { TiptapEditor } from "@/components/admin/tiptap-editor";
import { parseJSON, slugify } from "@/lib/utils";
import type { BlogPost, BlogCategory } from "@prisma/client";
import { createPost, updatePost } from "@/app/admin/(console)/blog/actions";

function toISODate(d?: Date | string | null) {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toISOString().slice(0, 10);
}

export function PostForm({
  post,
  categories,
}: {
  post?: BlogPost;
  categories: BlogCategory[];
}) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const action = post ? updatePost.bind(null, post.id) : createPost;
  const tags = parseJSON<string[]>(post?.tags ?? null, []);

  return (
    <form action={action} className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/blog"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-steel text-ink-muted hover:border-amber hover:text-ink"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            {post ? "Edit post" : "New post"}
          </h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <FormCard title="Post content">
            <FormField label="Title" required>
              <TextInput
                name="title"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!post) setSlug(slugify(e.target.value));
                }}
              />
            </FormField>
            <FormField label="Slug" required>
              <TextInput
                name="slug"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </FormField>
            <FormField label="Excerpt" required hint="Displayed on cards and the article preview.">
              <TextArea name="excerpt" required rows={3} defaultValue={post?.excerpt ?? ""} />
            </FormField>
            <FormField label="Body" required>
              <TiptapEditor
                name="content"
                defaultValue={post?.content ?? ""}
                placeholder="Write your article..."
              />
            </FormField>
          </FormCard>

          <FormCard title="Cover image" description="Featured image shown on the blog list and article hero.">
            <ImageUpload
              name="coverUrl"
              defaultValue={post?.coverUrl ?? ""}
              labelName="coverLabel"
              defaultLabel={post?.coverLabel ?? ""}
              aspectRatio="video"
              category="blog"
              hint="JPG, PNG, or WebP. Max 8MB. Recommended 1600×900."
            />
          </FormCard>
        </div>

        <div className="space-y-6">
          <FormCard title="Publish settings">
            <FormField label="Status">
              <Select name="status" defaultValue={post?.status ?? "draft"}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </Select>
            </FormField>
            <FormField label="Publish date" hint="Used only if status is Published.">
              <TextInput
                type="date"
                name="publishedAt"
                defaultValue={toISODate(post?.publishedAt)}
              />
            </FormField>
            <FormField label="Category">
              <Select name="categoryId" defaultValue={post?.categoryId ?? ""}>
                <option value="">Uncategorized</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </FormField>
            <Toggle
              name="isFeatured"
              defaultChecked={post?.isFeatured ?? false}
              label="Feature article"
            />
          </FormCard>

          <FormCard title="Meta">
            <FormField label="Author" required>
              <TextInput name="author" required defaultValue={post?.author ?? ""} />
            </FormField>
            <FormField label="Author role" required>
              <TextInput
                name="authorRole"
                required
                defaultValue={post?.authorRole ?? ""}
              />
            </FormField>
            <FormField label="Read time (minutes)">
              <TextInput
                type="number"
                name="readMinutes"
                defaultValue={post?.readMinutes ?? 5}
              />
            </FormField>
            <FormField label="Tags" hint="Comma-separated.">
              <TextInput name="tags" defaultValue={tags.join(", ")} />
            </FormField>
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
              {post ? "Save changes" : "Create post"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
