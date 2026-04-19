"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, ArrowUpRight } from "lucide-react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General inquiry",
    message: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("fail");
      setState("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "General inquiry",
        message: "",
      });
    } catch {
      setState("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-3xl border border-steel/70 bg-white p-8 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.15)] sm:p-10"
    >
      <AnimatePresence>
        {state === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-white/95 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber text-ink">
                <Check className="h-8 w-8" strokeWidth={3} />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-ink">
                Message received
              </h3>
              <p className="mt-3 max-w-sm text-ink-muted">
                We&apos;ll respond within one business day. Thank you for reaching out to Antbytelabs Construction.
              </p>
              <button
                type="button"
                onClick={() => setState("idle")}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-dark"
              >
                Send another <ArrowUpRight className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
        Send us a message
      </h3>
      <p className="mt-2 text-ink-muted">
        Tell us about your project. We&apos;ll be in touch within one business day.
      </p>

      <div className="mt-8 grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Full name"
            name="name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            required
          />
          <Field
            label="Email address"
            name="email"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            required
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Phone (optional)"
            name="phone"
            value={form.phone}
            onChange={(v) => setForm({ ...form, phone: v })}
          />
          <SelectField
            label="Project type"
            name="subject"
            value={form.subject}
            onChange={(v) => setForm({ ...form, subject: v })}
            options={[
              "General inquiry",
              "Residential construction",
              "Commercial construction",
              "Industrial / infrastructure",
              "Interior design & fit-out",
              "Renovation & remodeling",
              "Project management",
              "Press & partnerships",
            ]}
          />
        </div>
        <TextAreaField
          label="Tell us about your project"
          name="message"
          value={form.message}
          onChange={(v) => setForm({ ...form, message: v })}
          required
        />
      </div>

      {state === "error" && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          Something went wrong. Please try again.
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-xs text-ink-muted">
          By submitting, you agree to our privacy terms.
        </p>
        <button
          type="submit"
          disabled={state === "submitting"}
          className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white transition hover:bg-amber hover:text-ink disabled:opacity-60"
        >
          {state === "submitting" ? "Sending..." : "Send message"}
          <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
        {label} {required && <span className="text-amber">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-steel bg-white px-4 py-3 text-sm outline-none transition focus:border-amber focus:ring-4 focus:ring-amber/20"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
        {label}
      </span>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full appearance-none rounded-xl border border-steel bg-white px-4 py-3 text-sm outline-none transition focus:border-amber focus:ring-4 focus:ring-amber/20"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
        {label} {required && <span className="text-amber">*</span>}
      </span>
      <textarea
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        className="mt-2 w-full resize-none rounded-xl border border-steel bg-white px-4 py-3 text-sm outline-none transition focus:border-amber focus:ring-4 focus:ring-amber/20"
      />
    </label>
  );
}
