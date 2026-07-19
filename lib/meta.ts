import "server-only";
import { createHash } from "crypto";

const GRAPH_VERSION = "v21.0";

/** Purchase valyutasi. UZS yoki USD. Bitta joydan o'zgartiriladi. */
export const CURRENCY = "UZS";

const sha256 = (value: string) =>
  createHash("sha256").update(value.trim().toLowerCase()).digest("hex");

type Person = {
  eventId: string;
  name: string;
  /** raqamlar, "998901234567" ko'rinishida */
  phone: string;
  eventSourceUrl?: string;
  clientIp?: string;
  clientUserAgent?: string;
  fbp?: string;
  fbc?: string;
};

/** Mijoz ma'lumotlarini xeshlab Meta formatiga o'giradi. */
function buildUserData(p: Person) {
  const [firstName, ...rest] = p.name.split(" ");
  const userData: Record<string, unknown> = {
    ph: [sha256(p.phone)],
    fn: [sha256(firstName)],
    country: [sha256("uz")],
  };
  if (rest.length) userData.ln = [sha256(rest.join(" "))];
  if (p.clientIp) userData.client_ip_address = p.clientIp;
  if (p.clientUserAgent) userData.client_user_agent = p.clientUserAgent;
  if (p.fbp) userData.fbp = p.fbp;
  if (p.fbc) userData.fbc = p.fbc;
  return userData;
}

async function sendEvent(event: Record<string, unknown>): Promise<boolean> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !token) {
    console.error("[meta-capi] PIXEL_ID yoki ACCESS_TOKEN yo'q");
    return false;
  }

  const payload: Record<string, unknown> = { data: [event] };
  if (process.env.META_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.error("[meta-capi] xato:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[meta-capi] fetch xato:", err);
    return false;
  }
}

/**
 * "Lead" hodisasi. eventId brauzerdagi fbq('track','Lead',{},{eventID})
 * bilan bir xil bo'lishi shart — Meta ikkisini bittaga birlashtiradi.
 */
export function sendMetaLead(lead: Person): Promise<boolean> {
  return sendEvent({
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_id: lead.eventId,
    event_source_url: lead.eventSourceUrl,
    action_source: "website",
    user_data: buildUserData(lead),
  });
}

/**
 * "Purchase" hodisasi. Sotuv yopilgach operator qo'lda yuboradi.
 * value — sotuv summasi, currency — CURRENCY.
 */
export function sendMetaPurchase(
  purchase: Person & { value: number }
): Promise<boolean> {
  return sendEvent({
    event_name: "Purchase",
    event_time: Math.floor(Date.now() / 1000),
    event_id: purchase.eventId,
    event_source_url: purchase.eventSourceUrl,
    action_source: "website",
    user_data: buildUserData(purchase),
    custom_data: {
      value: purchase.value,
      currency: CURRENCY,
    },
  });
}