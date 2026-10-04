// Authentication & Session Utilities for Startup Jigawa CMS

export const SESSION_COOKIE_NAME = "sj_admin_session";

// Fallback secret for dev if AUTH_SECRET is not yet defined
const FALLBACK_SECRET = "50a825571cab72d101fd9cf715074e2ec52dd030f0bd4c15b6f8925d403d1ae4";

export function getAuthSecret(): string {
  return process.env.AUTH_SECRET || FALLBACK_SECRET;
}

export function getAdminCredentials() {
  return {
    email: (process.env.ADMIN_EMAIL || "admin@startupjigawa.com.ng").trim().toLowerCase(),
    password: process.env.ADMIN_PASSWORD || "Jigawa2026!Admin",
  };
}

export function validateAdminCredentials(email: string, pass: string): boolean {
  const creds = getAdminCredentials();
  return (
    email.trim().toLowerCase() === creds.email &&
    pass === creds.password
  );
}

// Pure Web Crypto base64url encoding (Works in Edge Middleware & Node.js Server Routes)
const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string): Uint8Array {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  return await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export interface SessionPayload {
  email: string;
  role: string;
  exp: number;
}

export async function signSessionToken(
  email: string,
  durationDays = 7
): Promise<string> {
  const secret = getAuthSecret();
  const key = await getHmacKey(secret);
  const exp = Date.now() + durationDays * 24 * 60 * 60 * 1000;
  const payload: SessionPayload = {
    email: email.trim().toLowerCase(),
    role: "SUPER_ADMIN",
    exp,
  };

  const payloadJson = JSON.stringify(payload);
  const dataB64 = toBase64Url(encoder.encode(payloadJson));
  const sigBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(dataB64) as unknown as BufferSource
  );
  const sigB64 = toBase64Url(new Uint8Array(sigBuffer));

  return `${dataB64}.${sigB64}`;
}

export async function verifySessionToken(
  token: string | null | undefined
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [dataB64, sigB64] = parts;

    const secret = getAuthSecret();
    const key = await getHmacKey(secret);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(sigB64) as unknown as BufferSource,
      encoder.encode(dataB64) as unknown as BufferSource
    );

    if (!valid) return null;

    const payloadRaw = decoder.decode(fromBase64Url(dataB64));
    const payload: SessionPayload = JSON.parse(payloadRaw);

    if (payload.exp && Date.now() > payload.exp) {
      return null; // Expired session
    }

    return payload;
  } catch {
    return null;
  }
}
