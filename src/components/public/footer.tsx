import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { prisma } from "@/lib/prisma";

const socials = [
  { icon: Facebook, field: "facebook" as const, label: "Facebook" },
  { icon: Twitter, field: "twitter" as const, label: "Twitter" },
  { icon: Linkedin, field: "linkedin" as const, label: "LinkedIn" },
  { icon: Instagram, field: "instagram" as const, label: "Instagram" },
  { icon: Youtube, field: "youtube" as const, label: "YouTube" },
];

export async function Footer() {
  const settings = await prisma.settings.findUnique({ where: { id: "singleton" } });
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    take: 6,
  });

  return (
    <footer className="relative bg-ink text-cream-soft">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_10%_0%,#e8692b,transparent_55%),radial-gradient(circle_at_90%_100%,#6b6559,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 hero-grid-bg opacity-[0.04]" />

      <Container className="relative py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-6 max-w-sm leading-relaxed text-cream-soft/65">
              {settings?.description ??
                "Premium construction and engineering solutions for residential, commercial, and industrial projects."}
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {socials.map(({ icon: Icon, field, label }) => {
                const url = settings?.[field];
                if (!url) return null;
                return (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/5 text-cream-soft/65 transition hover:border-orange hover:bg-orange hover:text-white"
                  >
                    <Icon className="h-4 w-4 transition group-hover:scale-110" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
                Our Services
              </p>
              <ul className="mt-5 space-y-3 text-sm text-cream-soft/70">
                {services.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="transition hover:text-orange"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
                Address
              </p>
              <ul className="mt-5 space-y-4 text-sm text-cream-soft/70">
                <li className="flex gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                  <span>{settings?.address}</span>
                </li>
                <li className="flex gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                  <span>{settings?.hours}</span>
                </li>
              </ul>
              <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
                Show on Map
              </p>
              <Link
                href="#"
                className="mt-2 inline-block text-xs text-cream-soft/60 underline underline-offset-4 hover:text-orange"
              >
                Open in Google Maps
              </Link>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
                Get In Touch
              </p>
              <ul className="mt-5 space-y-4 text-sm text-cream-soft/70">
                <li>
                  <a
                    href={`tel:${settings?.phone}`}
                    className="group flex items-start gap-2.5 transition hover:text-orange"
                  >
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                    <span className="font-display text-lg font-bold text-white">
                      (913) 297-3000
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${settings?.email}`}
                    className="flex items-start gap-2.5 transition hover:text-orange"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange" />
                    {settings?.email}
                  </a>
                </li>
              </ul>
              <div className="mt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-orange">
                  Navigate
                </p>
                <ul className="mt-4 grid grid-cols-2 gap-y-2 text-xs text-cream-soft/60">
                  {[
                    ["Home", "/"],
                    ["About", "/about"],
                    ["Gallery", "/gallery"],
                    ["Projects", "/projects"],
                    ["Blog", "/blog"],
                    ["Contact", "/contact"],
                  ].map(([l, h]) => (
                    <li key={h}>
                      <Link href={h} className="transition hover:text-orange">
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-cream-soft/50">
            © {new Date().getFullYear()} Antbytelabs Construction LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-cream-soft/50">
            <Link href="#" className="transition hover:text-orange">
              Privacy Policy
            </Link>
            <Link href="#" className="transition hover:text-orange">
              Terms of Service
            </Link>
            <span>Designed & Developed by Antbytelabs</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
