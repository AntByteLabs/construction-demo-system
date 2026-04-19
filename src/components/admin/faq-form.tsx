"use client";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { FormCard } from "@/components/admin/form-card";
import { FormField, TextInput, TextArea, Toggle } from "@/components/admin/form-field";
import type { Faq } from "@prisma/client";
import { createFaq, updateFaq } from "@/app/admin/(console)/faqs/actions";

export function FaqForm({ faq }: { faq?: Faq }) {
  const action = faq ? updateFaq.bind(null, faq.id) : createFaq;

  return (
    <form action={action} className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/faqs"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-steel text-ink-muted hover:border-orange hover:text-ink"
          aria-label="Back"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            {faq ? "Edit FAQ" : "New FAQ"}
          </h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <FormCard title="Question & answer">
            <FormField label="Question" required>
              <TextInput
                name="question"
                required
                defaultValue={faq?.question ?? ""}
              />
            </FormField>
            <FormField label="Answer" required>
              <TextArea
                name="answer"
                required
                rows={6}
                defaultValue={faq?.answer ?? ""}
              />
            </FormField>
          </FormCard>
        </div>

        <div className="space-y-6">
          <FormCard title="Settings">
            <FormField label="Sort order" hint="Lower numbers appear first.">
              <TextInput
                type="number"
                name="sortOrder"
                defaultValue={faq?.sortOrder ?? 0}
              />
            </FormField>
            <Toggle
              name="isActive"
              defaultChecked={faq?.isActive ?? true}
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
              {faq ? "Save changes" : "Create FAQ"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
