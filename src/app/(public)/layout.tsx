import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { prisma } from "@/lib/prisma";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await prisma.settings.findUnique({
    where: { id: "singleton" },
  });

  return (
    <div className="flex min-h-screen flex-col bg-cream-soft">
      <Navbar
        logoUrl={settings?.logoUrl}
        companyName={settings?.companyName}
        phone={settings?.phone}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
