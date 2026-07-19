import "server-only";
import { createCipheriv, createDecipheriv, randomBytes, createHash } from "crypto";

/**
 * Lead ma'lumotlarini AES-256-GCM bilan shifrlaydi.
 * Havolaga faqat shifrlangan token tushadi — telefon/fbp/fbc URL'da ko'rinmaydi.
 * Faqat LEAD_SECRET ga ega server tokenni ocha oladi.
 */

function key() {
  const secret = process.env.LEAD_SECRET;
  if (!secret) throw new Error("LEAD_SECRET yo'q (.env.local ni tekshiring)");
  return createHash("sha256").update(secret).digest(); // 32 bayt
}

export function seal(data: object): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const enc = Buffer.concat([
    cipher.update(JSON.stringify(data), "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  // iv(12) + tag(16) + shifr  ->  base64url (URL uchun xavfsiz)
  return Buffer.concat([iv, tag, enc]).toString("base64url");
}

export function open<T>(token: string): T | null {
  try {
    const buf = Buffer.from(token, "base64url");
    const iv = buf.subarray(0, 12);
    const tag = buf.subarray(12, 28);
    const enc = buf.subarray(28);
    const decipher = createDecipheriv("aes-256-gcm", key(), iv);
    decipher.setAuthTag(tag);
    const dec = Buffer.concat([decipher.update(enc), decipher.final()]);
    return JSON.parse(dec.toString("utf8")) as T;
  } catch {
    return null; // buzilgan yoki soxta token
  }
}

/** Havolada va Purchase'da ishlatiladigan lead ma'lumotlari. */
export type SealedLead = {
  name: string;
  phone: string;
  fbp?: string;
  fbc?: string;
  ip?: string;
  ua?: string;
  url?: string;
  ts: number;
};