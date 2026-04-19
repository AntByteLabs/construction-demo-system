"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";
import { LogoStatic } from "@/components/ui/logo";
import { loginAction } from "./actions";

export default function AdminLoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  async function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const res = await loginAction(formData);
      if (res?.error) setError(res.error);
    });
  }

  return (
    <div className="relative flex min-h-screen items-stretch bg-ink">
      <div className="absolute inset-0 hero-grid-bg opacity-[0.05]" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(700px_400px_at_70%_30%,rgba(245,158,11,0.18),transparent_60%),radial-gradient(500px_300px_at_20%_80%,rgba(37,99,235,0.15),transparent_60%)]" />

      <div className="relative flex flex-1 items-center justify-center px-6 py-20 lg:w-[46%] lg:max-w-[640px] lg:flex-none lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-white backdrop-blur-xl sm:p-10"
        >
          <div className="flex items-center justify-between">
            <LogoStatic light />
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-amber"
            >
              Back to site <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber">
              <Sparkles className="h-3 w-3" /> Admin Console
            </p>
            <h1 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl">
              Welcome back.
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Sign in to manage your site content.
            </p>
          </div>

          <form action={onSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                Email address
              </span>
              <div className="relative mt-2">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue="admin@antbytelabs.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-amber focus:bg-white/10 focus:ring-4 focus:ring-amber/20"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                Password
              </span>
              <div className="relative mt-2">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  required
                  defaultValue="admin123"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-12 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-amber focus:bg-white/10 focus:ring-4 focus:ring-amber/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-white/40 hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-white/60">
                <input type="checkbox" defaultChecked className="accent-amber" />
                Remember me
              </label>
              <Link
                href="/admin/forgot-password"
                className="font-semibold text-amber hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-red-500/10 px-3.5 py-2.5 text-sm text-red-300"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber px-6 py-3.5 text-sm font-bold text-ink transition hover:bg-white disabled:opacity-60"
            >
              {pending ? "Signing in..." : "Sign in"}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>

            <p className="mt-6 rounded-xl border border-white/10 bg-white/5 p-3 text-center text-xs text-white/60">
              Demo credentials prefilled: <span className="font-mono text-amber">admin@antbytelabs.com</span> / <span className="font-mono text-amber">admin123</span>
            </p>
          </form>
        </motion.div>
      </div>

      <div className="relative hidden flex-1 items-center justify-center overflow-hidden lg:flex">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900 to-ink" />
        <div className="pointer-events-none absolute inset-0 hero-grid-bg opacity-[0.08]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative z-10 mx-auto max-w-lg px-12 text-white"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-amber">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            Admin Platform
          </div>
          <h2 className="mt-8 font-display text-5xl font-bold leading-[1.05]">
            Your site, fully <span className="text-amber">under control</span>.
          </h2>
          <p className="mt-6 text-lg text-white/70">
            Manage services, projects, team, blog posts, and inquiries — all from a single, beautifully designed dashboard.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-5">
            {[
              "Live content updates",
              "Rich-text blog editor",
              "Project galleries",
              "Inquiry inbox",
            ].map((f) => (
              <div key={f} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="h-2 w-10 rounded-full bg-amber" />
                <p className="mt-3 text-sm font-semibold">{f}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
