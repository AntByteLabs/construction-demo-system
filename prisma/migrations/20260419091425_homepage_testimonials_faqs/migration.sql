-- CreateTable
CREATE TABLE "HomepageContent" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "heroEyebrow" TEXT NOT NULL DEFAULT 'Construction Company',
    "heroTitle" TEXT NOT NULL DEFAULT 'Where plans become projects.',
    "heroSubtitle" TEXT NOT NULL DEFAULT 'From first conversation to final walkthrough, we turn plans into solid results — with clear communication, fair pricing, and craftsmanship that lasts.',
    "heroCtaLabel" TEXT NOT NULL DEFAULT 'Request a Quote',
    "heroCtaHref" TEXT NOT NULL DEFAULT '/contact',
    "heroImageUrl" TEXT,
    "heroImageLabel" TEXT NOT NULL DEFAULT 'Wood frame structure under construction',
    "heroTestimonialQuote" TEXT NOT NULL DEFAULT 'Professional, careful, and high-quality results on our deck and siding.',
    "heroTestimonialName" TEXT NOT NULL DEFAULT 'Emily Rowland',
    "heroTestimonialRole" TEXT NOT NULL DEFAULT 'Homeowner',
    "heroStat1Value" TEXT NOT NULL DEFAULT '500+',
    "heroStat1Label" TEXT NOT NULL DEFAULT 'Projects completed',
    "heroStat2Value" TEXT NOT NULL DEFAULT '35+',
    "heroStat2Label" TEXT NOT NULL DEFAULT 'Years in business',
    "heroStat3Value" TEXT NOT NULL DEFAULT '4.8',
    "heroStat3Label" TEXT NOT NULL DEFAULT 'Average review',
    "featureBannerImageUrl" TEXT,
    "featureBannerLabel" TEXT NOT NULL DEFAULT 'Sun-dappled wood frame under construction',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quote" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "photoUrl" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
