"use server";

import { headers, cookies } from "next/headers";
import { randomUUID } from "crypto";
import { validateLead } from "@/lib/validation";
import { sendToTelegram } from "@/lib/telegram";
import { sendMetaLead } from "@/lib/meta";
import { seal, type SealedLead } from "@/lib/crypto";

export type LeadState = {
  status: "idle" | "ok" | "error";
  message?: string;
  /** Brauzerdagi fbq Lead hodisasi uchun. CAPI bilan bir xil bo'lishi shart. */
  eventId?: string;
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

function siteOrigin(fallbackUrl?: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (base) return base.replace(/\/+$/, "");
  if (fallbackUrl) {
    try {
      return new URL(fallbackUrl).origin;
    } catch {
      /* ignore */
    }
  }
  return "";
}

export async function submitLead(
  _prev: LeadState,
  formData: FormData
): Promise<LeadState> {
  // Honeypot — botlar to'ldiradi, odam ko'rmaydi.
  if (formData.get("website")) {
    return { status: "ok", eventId: randomUUID() };
  }

  const parsed = validateLead(formData);
  if (!parsed.ok) {
    return { status: "error", message: parsed.error };
  }

  const { name, phone } = parsed.data;
  const eventId = randomUUID();

  const h = await headers();
  const c = await cookies();

  const clientIp =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    undefined;
  const clientUserAgent = h.get("user-agent") ?? undefined;
  const fbp = c.get("_fbp")?.value;
  const fbc = c.get("_fbc")?.value;

  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = formData.get(key);
    if (typeof value === "string" && value) utm[key] = value.slice(0, 120);
  }

  const pageUrl =
    String(formData.get("page_url") || "") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    undefined;

  // Purchase uchun mijoz ma'lumotlarini shifrlaymiz va himoyalangan havola quramiz.
  let purchaseUrl: string | undefined;
  try {
    const sealed: SealedLead = {
      name,
      phone,
      fbp,
      fbc,
      ip: clientIp,
      ua: clientUserAgent,
      url: pageUrl,
      ts: Date.now(),
    };
    const token = seal(sealed);
    const origin = siteOrigin(pageUrl);
    if (origin) purchaseUrl = `${origin}/sotuv?t=${token}`;
  } catch (err) {
    // LEAD_SECRET yo'q bo'lsa havola bo'lmaydi, lekin ariza baribir tushadi.
    console.error("[lead] havola yaratilmadi:", err);
  }

  const [telegramOk] = await Promise.all([
    sendToTelegram({ name, phone, utm, pageUrl, ip: clientIp, purchaseUrl }),
    sendMetaLead({
      eventId,
      name,
      phone,
      eventSourceUrl: pageUrl,
      clientIp,
      clientUserAgent,
      fbp,
      fbc,
    }),
  ]);

  if (!telegramOk) {
    return {
      status: "error",
      message: "Ariza yuborilmadi. Qayta urinib ko'ring yoki Telegramda yozing.",
    };
  }

  return { status: "ok", eventId };
}