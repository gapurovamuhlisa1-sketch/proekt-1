"use server";

import { randomUUID } from "crypto";
import { open, type SealedLead } from "@/lib/crypto";
import { sendMetaPurchase } from "@/lib/meta";
import { notifyPurchase } from "@/lib/telegram";

export type PurchaseState = {
  status: "idle" | "ok" | "error";
  message?: string;
};

export async function submitPurchase(
  _prev: PurchaseState,
  formData: FormData
): Promise<PurchaseState> {
  const token = String(formData.get("token") || "");
  const amountRaw = String(formData.get("amount") || "").replace(",", ".");
  const pin = String(formData.get("pin") || "");

  // Ixtiyoriy PIN himoyasi. ADMIN_PIN o'rnatilmagan bo'lsa — tekshirilmaydi.
  const needPin = process.env.ADMIN_PIN;
  if (needPin && pin !== needPin) {
    return { status: "error", message: "PIN noto'g'ri." };
  }

  const amount = Number(amountRaw);
  if (!Number.isFinite(amount) || amount <= 0) {
    return { status: "error", message: "Summani to'g'ri kiriting." };
  }

  const lead = open<SealedLead>(token);
  if (!lead) {
    return { status: "error", message: "Havola yaroqsiz yoki muddati o'tgan." };
  }

  const ok = await sendMetaPurchase({
    eventId: randomUUID(),
    name: lead.name,
    phone: lead.phone,
    value: amount,
    eventSourceUrl: lead.url,
    clientIp: lead.ip,
    clientUserAgent: lead.ua,
    fbp: lead.fbp,
    fbc: lead.fbc,
  });

  if (!ok) {
    return {
      status: "error",
      message: "Meta'ga yuborilmadi. Keyinroq urinib ko'ring.",
    };
  }

  // Guruhga "sotuv qayd etildi" xabari (ixtiyoriy, xato bo'lsa ham to'xtatmaydi).
  await notifyPurchase(lead.name, lead.phone, amount).catch(() => {});

  return { status: "ok" };
}