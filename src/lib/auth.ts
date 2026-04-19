import { cookies } from "next/headers";

export const ADMIN_COOKIE = "abl_admin";
export const ADMIN_EMAIL = "admin@antbytelabs.com";
export const ADMIN_PASSWORD = "admin123";

export async function isAuthenticated() {
  const store = await cookies();
  const cookie = store.get(ADMIN_COOKIE);
  return cookie?.value === "authenticated";
}

export async function signIn(email: string, password: string) {
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) return false;
  const store = await cookies();
  store.set(ADMIN_COOKIE, "authenticated", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return true;
}

export async function signOut() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}
