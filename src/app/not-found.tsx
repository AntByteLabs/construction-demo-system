import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-ink px-6 py-20 text-white">
      <div className="pointer-events-none absolute inset-0 hero-grid-bg opacity-[0.06]" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(700px_400px_at_50%_20%,rgba(245,158,11,0.18),transparent_60%)]" />
      <div className="relative mx-auto max-w-xl text-center">
        <p className="font-display text-[10rem] font-bold leading-none text-transparent [-webkit-text-stroke:2px_rgba(245,158,11,0.6)] sm:text-[12rem]">
          404
        </p>
        <h1 className="mt-6 font-display text-4xl font-bold">Page not found</h1>
        <p className="mt-4 text-white/70">
          The page you&apos;re looking for has moved, been removed, or never existed.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-ink transition hover:bg-white"
          >
            <Home className="h-4 w-4" />
            Back home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-amber hover:bg-amber/10"
          >
            <ArrowLeft className="h-4 w-4" />
            View projects
          </Link>
        </div>
      </div>
    </div>
  );
}
