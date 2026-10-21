import { cookies } from "next/headers";

// Admin login comes from the environment, never from the code:
//   ADMIN_EMAIL, ADMIN_PASSWORD, SESSION_SECRET (32+ random characters).
// If any is missing, nobody can log in.
//
// The session cookie is "<expiry ms>.<HMAC-SHA256 of the expiry>", signed
// with SESSION_SECRET, so it cannot be forged or kept past its expiry.
// Web Crypto keeps this usable from both the middleware and the server.

export const ADMIN_COOKIE = "admin_session";
const SESSION_TTL_MS = 60 * 60 * 24 * 7 * 1000;

const encoder = new TextEncoder();

function secret() {
  const s = process.env.SESSION_SECRET ?? "";
  return s.length >= 32 ? s : null;
}

async function hmac(data: string, key: string) {
  const k = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", k, encoder.encode(data));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

// Compares in constant time, so response timing reveals nothing.
async function safeEqual(a: string, b: string) {
  const key = secret() ?? "compare";
  const [x, y] = await Promise.all([hmac(a, key), hmac(b, key)]);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x.charCodeAt(i) ^ y.charCodeAt(i);
  return diff === 0;
}

export async function verifySession(value: string | undefined) {
  const key = secret();
  if (!key || !value) return false;
  const [expires, sig] = value.split(".");
  if (!expires || !sig || Number(expires) < Date.now()) return false;
  return safeEqual(sig, await hmac(expires, key));
}

export async function isAuthenticated() {
  const store = await cookies();
  return verifySession(store.get(ADMIN_COOKIE)?.value);
}

// Every admin server action calls this first: server actions are POST
// endpoints, so the middleware redirect alone does not protect them.
export async function requireAdmin() {
  if (!(await isAuthenticated())) throw new Error("Unauthorized");
}

export async function signIn(email: string, password: string) {
  const key = secret();
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!key || !adminEmail || !adminPassword) return false;
  const [emailOk, passwordOk] = await Promise.all([
    safeEqual(email.trim().toLowerCase(), adminEmail.trim().toLowerCase()),
    safeEqual(password, adminPassword),
  ]);
  if (!emailOk || !passwordOk) return false;

  const expires = String(Date.now() + SESSION_TTL_MS);
  const store = await cookies();
  store.set(ADMIN_COOKIE, `${expires}.${await hmac(expires, key)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
  return true;
}

export async function signOut() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}
