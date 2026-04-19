import { NextResponse } from "next/server";
import { signOut } from "@/lib/auth";

export async function POST(req: Request) {
  await signOut();
  const url = new URL("/admin/login", req.url);
  return NextResponse.redirect(url, 303);
}
