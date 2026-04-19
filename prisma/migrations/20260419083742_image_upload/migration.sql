-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN "coverUrl" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN "coverUrl" TEXT;

-- AlterTable
ALTER TABLE "ProjectImage" ADD COLUMN "url" TEXT;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Settings" ADD COLUMN "faviconUrl" TEXT;
ALTER TABLE "Settings" ADD COLUMN "logoUrl" TEXT;

-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN "photoUrl" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "url" TEXT,
    "filename" TEXT,
    "mimeType" TEXT,
    "sizeBytes" INTEGER NOT NULL DEFAULT 0,
    "category" TEXT NOT NULL,
    "aspectRatio" TEXT NOT NULL DEFAULT '16/9',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Media" ("aspectRatio", "category", "createdAt", "id", "label") SELECT "aspectRatio", "category", "createdAt", "id", "label" FROM "Media";
DROP TABLE "Media";
ALTER TABLE "new_Media" RENAME TO "Media";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
