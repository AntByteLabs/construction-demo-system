"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Check } from "lucide-react";
import { LogoStatic } from "@/components/ui/logo";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-ink px-6 py-20">
      <div className="absolute inset-0 hero-grid-bg opacity-[0.05]" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(700px_400px_at_50%_20%,rgba(245,158,11,0.15),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-white backdrop-blur-xl sm:p-10"
      >
        <div className="flex items-center justify-between">
          <LogoStatic light />
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-amber"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to login
          </Link>
        </div>

        {!submitted ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mt-10"
          >
            <h1 className="font-display text-3xl font-bold leading-tight">
              Forgot your password?
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Enter your email address and we&apos;ll send you a reset link.
            </p>

            <label className="mt-8 block">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                Email address
              </span>
              <div className="relative mt-2">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-amber focus:bg-white/10 focus:ring-4 focus:ring-amber/20"
                />
              </div>
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber px-6 py-3.5 text-sm font-bold text-ink transition hover:bg-white"
            >
              Send reset link
            </button>
          </form>
        ) : (
          <div className="mt-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber text-ink">
              <Check className="h-6 w-6" strokeWidth={3} />
            </div>
            <h1 className="mt-6 font-display text-3xl font-bold">Check your email</h1>
            <p className="mt-3 text-sm text-white/60">
              If an account exists for that email, a reset link is on its way.
            </p>
            <Link
              href="/admin/login"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-amber"
            >
              <ArrowLeft className="h-4 w-4" /> Return to login
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
