"use server";

import { headers, cookies } from "next/headers";
import { randomUUID } from "crypto";
import { validateLead } from "@/lib/validation";
import { sendToTelegram } from "@/lib/telegram";
import { sendMetaLead } from "@/lib/meta";

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

  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = formData.get(key);
    if (typeof value === "string" && value) utm[key] = value.slice(0, 120);
  }

  const pageUrl =
    String(formData.get("page_url") || "") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    undefined;

  // Ikkalasi parallel ketadi. Telegram — biznes uchun, CAPI — Meta uchun.
  const [telegramOk] = await Promise.all([
    sendToTelegram({ name, phone, utm, pageUrl, ip: clientIp }),
    sendMetaLead({
      eventId,
      name,
      phone,
      eventSourceUrl: pageUrl,
      clientIp,
      clientUserAgent,
      fbp: c.get("_fbp")?.value,
      fbc: c.get("_fbc")?.value,
    }),
  ]);

  // Telegram tushmasa — ariza yo'qoladi, shuning uchun faqat shu blokirovka qiladi.
  if (!telegramOk) {
    return {
      status: "error",
      message: "Ariza yuborilmadi. Qayta urinib ko'ring yoki Telegramda yozing.",
    };
  }

  return { status: "ok", eventId };
}
