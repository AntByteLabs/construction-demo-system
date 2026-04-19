-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "shortDesc" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageLabel" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "photoLabel" TEXT NOT NULL,
    "email" TEXT,
    "linkedin" TEXT,
    "twitter" TEXT,
    "facebook" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "completionDate" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "coverLabel" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ProjectImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "caption" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "ProjectImage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BlogCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "coverLabel" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "authorRole" TEXT NOT NULL,
    "readMinutes" INTEGER NOT NULL DEFAULT 5,
    "tags" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "publishedAt" DATETIME,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BlogPost_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "BlogCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContactInquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "aspectRatio" TEXT NOT NULL DEFAULT '16/9',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
    "companyName" TEXT NOT NULL DEFAULT 'Antbytelabs Construction',
    "tagline" TEXT NOT NULL DEFAULT 'Building Tomorrow, Today',
    "description" TEXT NOT NULL DEFAULT 'Premium construction and engineering solutions for residential, commercial, and industrial projects across the nation.',
    "phone" TEXT NOT NULL DEFAULT '+1 (555) 123-4567',
    "email" TEXT NOT NULL DEFAULT 'hello@antbytelabs.com',
    "address" TEXT NOT NULL DEFAULT '2847 Industrial Parkway, Suite 400, Metro City, CA 90210',
    "hours" TEXT NOT NULL DEFAULT 'Mon–Fri: 8:00 AM – 6:00 PM',
    "facebook" TEXT NOT NULL DEFAULT 'https://facebook.com/antbytelabs',
    "twitter" TEXT NOT NULL DEFAULT 'https://twitter.com/antbytelabs',
    "linkedin" TEXT NOT NULL DEFAULT 'https://linkedin.com/company/antbytelabs',
    "instagram" TEXT NOT NULL DEFAULT 'https://instagram.com/antbytelabs',
    "youtube" TEXT NOT NULL DEFAULT 'https://youtube.com/@antbytelabs',
    "primaryColor" TEXT NOT NULL DEFAULT '#1F2937',
    "secondaryColor" TEXT NOT NULL DEFAULT '#F59E0B',
    "accentColor" TEXT NOT NULL DEFAULT '#2563EB',
    "seoTitle" TEXT NOT NULL DEFAULT 'Antbytelabs Construction — Building Tomorrow, Today',
    "seoDescription" TEXT NOT NULL DEFAULT 'Premium construction services for residential, commercial, industrial, and renovation projects. 25+ years of excellence.',
    "seoKeywords" TEXT NOT NULL DEFAULT 'construction, builders, contractor, renovation, commercial construction',
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogCategory_slug_key" ON "BlogCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
