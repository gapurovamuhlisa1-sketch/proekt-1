import "server-only";
import { formatPhone } from "./validation";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export type TelegramLead = {
  name: string;
  phone: string;
  utm?: Record<string, string>;
  pageUrl?: string;
  ip?: string;
};

export async function sendToTelegram(lead: TelegramLead): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    // Dev rejimida bot sozlanmagan bo'lsa ham formani sinab ko'ra olasiz:
    // ariza terminalga chiqadi va /rahmat sahifasi ochiladi.
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

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
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
