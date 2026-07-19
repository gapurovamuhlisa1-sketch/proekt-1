import "server-only";
import { formatPhone } from "./validation";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const BOT = () => process.env.TELEGRAM_BOT_TOKEN;
const CHAT = () => process.env.TELEGRAM_CHAT_ID;

async function tgSend(body: Record<string, unknown>): Promise<boolean> {
  const token = BOT();
  if (!token) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[telegram] xato:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[telegram] fetch xato:", err);
    return false;
  }
}

export type TelegramLead = {
  name: string;
  phone: string;
  utm?: Record<string, string>;
  pageUrl?: string;
  ip?: string;
  /** "Sotuv qo'shish" tugmasi uchun to'liq havola. */
  purchaseUrl?: string;
};

export async function sendToTelegram(lead: TelegramLead): Promise<boolean> {
  const token = BOT();
  const chatId = CHAT();

  if (!token || !chatId) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[telegram] Bot sozlanmagan (.env.local). Dev rejimi — ariza terminalga chiqarildi:",
        lead
      );
      return true;
    }
    console.error("[telegram] TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID yo'q");
    return false;
  }

  const time = new Intl.DateTimeFormat("uz-UZ", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/Tashkent",
  }).format(new Date());

  const utmLines = Object.entries(lead.utm ?? {})
    .filter(([, v]) => v)
    .map(([k, v]) => `${escapeHtml(k)}: <code>${escapeHtml(v)}</code>`)
    .join("\n");

  const text = [
    "🎯 <b>Yangi ariza</b>",
    "",
    `👤 Ism: <b>${escapeHtml(lead.name)}</b>`,
    `📞 Telefon: <a href="tel:+${lead.phone}">${formatPhone(lead.phone)}</a>`,
    `🕒 Vaqt: ${escapeHtml(time)} (Toshkent)`,
    lead.pageUrl ? `🔗 Sahifa: ${escapeHtml(lead.pageUrl)}` : "",
    utmLines ? `\n📊 <b>Manba</b>\n${utmLines}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const body: Record<string, unknown> = {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  };

  // Sotuv yopilganda bosiladigan himoyalangan tugma.
  if (lead.purchaseUrl) {
    body.reply_markup = {
      inline_keyboard: [
        [{ text: "💰 Sotuv summasini kiritish", url: lead.purchaseUrl }],
      ],
    };
  }

  return tgSend(body);
}

/** Sotuv Meta'ga yuborilgach guruhga tasdiq xabari. */
export async function notifyPurchase(
  name: string,
  phone: string,
  amount: number
): Promise<boolean> {
  const chatId = CHAT();
  if (!BOT() || !chatId) return false;

  const sum = new Intl.NumberFormat("uz-UZ").format(amount);
  const text = [
    "✅ <b>Purchase Meta'ga yuborildi</b>",
    "",
    `👤 ${escapeHtml(name)}`,
    `📞 ${formatPhone(phone)}`,
    `💰 Summa: <b>${sum}</b>`,
  ].join("\n");

  return tgSend({ chat_id: chatId, text, parse_mode: "HTML" });
}