import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { PageHeader } from "@/components/public/page-header";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/public/contact-form";
import { Placeholder } from "@/components/ui/placeholder";
import { FadeIn } from "@/components/ui/motion";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function ContactPage() {
  const settings = await prisma.settings.findUnique({ where: { id: "singleton" } });

  const info = [
    { icon: MapPin, label: "Head office", value: settings?.address },
    { icon: Phone, label: "Call us", value: settings?.phone, href: `tel:${settings?.phone}` },
    { icon: Mail, label: "Email", value: settings?.email, href: `mailto:${settings?.email}` },
    { icon: Clock, label: "Office hours", value: settings?.hours },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let&rsquo;s talk about your project."
        description="Whether you&rsquo;re ready to break ground or still sketching ideas, our pre-construction team would love to hear from you."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <FadeIn className="lg:col-span-7">
              <ContactForm />
            </FadeIn>

            <div className="space-y-5 lg:col-span-5">
              <FadeIn delay={0.1} className="rounded-3xl border border-steel/70 bg-white p-8">
                <h3 className="font-display text-2xl font-bold text-ink">Reach us</h3>
                <ul className="mt-6 space-y-5">
                  {info.map((item) => (
                    <li key={item.label} className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-amber">
                        <item.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="mt-1 block text-sm font-semibold text-ink hover:text-amber-dark"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-1 text-sm font-semibold text-ink">{item.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex items-center gap-2.5 border-t border-steel pt-6">
                  {[
                    { icon: Facebook, url: settings?.facebook },
                    { icon: Twitter, url: settings?.twitter },
                    { icon: Linkedin, url: settings?.linkedin },
                    { icon: Instagram, url: settings?.instagram },
                  ].map(({ icon: Icon, url }, i) =>
                    url ? (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-steel text-ink transition hover:border-amber hover:bg-amber hover:text-ink"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ) : null
                  )}
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <Placeholder
                  label="Office location map"
                  aspectRatio="4/3"
                  variant="blueprint"
                  className="shadow-float"
                />
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Secondary CTA */}
      <section className="relative overflow-hidden bg-ink py-20 text-white">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(600px_400px_at_80%_50%,rgba(245,158,11,0.18),transparent_60%)]" />
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber">
                Not ready to send a message?
              </p>
              <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl">
                Book a 30-minute consultation instead.
              </h2>
              <p className="mt-4 max-w-xl text-white/70">
                Pick a time that works for you. No sales pitch — we&apos;ll walk through your project and answer questions.
              </p>
            </div>
            <div className="lg:text-right">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-amber px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-white"
              >
                Schedule consultation
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
