import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const MAX_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
]);

function extFrom(mime: string, fallback: string) {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg",
    "image/avif": "avif",
  };
  return map[mime] ?? fallback;
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json(
      { ok: false, error: "Expected multipart/form-data" },
      { status: 400 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file");
  const label = String(formData.get("label") ?? "").trim();
  const category = String(formData.get("category") ?? "general").trim();

  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "Missing file" },
      { status: 400 }
    );
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { ok: false, error: `File type ${file.type} not allowed` },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, error: `File too large (max ${MAX_BYTES / 1024 / 1024}MB)` },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const fallbackExt = (file.name.split(".").pop() ?? "bin").toLowerCase();
  const ext = extFrom(file.type, fallbackExt);
  const filename = `${randomUUID()}.${ext}`;
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  const fullPath = path.join(uploadsDir, filename);
  await writeFile(fullPath, buffer);

  const url = `/uploads/${filename}`;

  await prisma.media.create({
    data: {
      label: label || file.name,
      url,
      filename,
      mimeType: file.type,
      sizeBytes: file.size,
      category: category || "general",
      aspectRatio: "16/9",
    },
  });

  return NextResponse.json({
    ok: true,
    url,
    filename,
    size: file.size,
    mimeType: file.type,
  });
}
