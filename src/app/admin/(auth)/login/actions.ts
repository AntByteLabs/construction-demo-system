"use server";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const ok = await signIn(email, password);
  if (!ok) {
    return { error: "Invalid email or password." };
  }
  redirect("/admin");
}
