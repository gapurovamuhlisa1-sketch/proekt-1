import "server-only";
import { createHash } from "crypto";

const GRAPH_VERSION = "v21.0";

const sha256 = (value: string) =>
  createHash("sha256").update(value.trim().toLowerCase()).digest("hex");

export type CapiLead = {
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

/**
 * Meta Conversions API ga "Lead" hodisasini yuboradi.
 * eventId brauzerdagi fbq('track','Lead',{},{eventID}) bilan bir xil bo'lishi shart —
 * shunda Meta ikkita hodisani bittaga birlashtiradi (deduplication).
 */
export async function sendMetaLead(lead: CapiLead): Promise<boolean> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !token) {
    console.error("[meta-capi] PIXEL_ID yoki ACCESS_TOKEN yo'q");
    return false;
  }

  const [firstName, ...rest] = lead.name.split(" ");

  const userData: Record<string, unknown> = {
    ph: [sha256(lead.phone)],
    fn: [sha256(firstName)],
    country: [sha256("uz")],
  };
  if (rest.length) userData.ln = [sha256(rest.join(" "))];
  if (lead.clientIp) userData.client_ip_address = lead.clientIp;
  if (lead.clientUserAgent) userData.client_user_agent = lead.clientUserAgent;
  if (lead.fbp) userData.fbp = lead.fbp;
  if (lead.fbc) userData.fbc = lead.fbc;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: lead.eventId,
        event_source_url: lead.eventSourceUrl,
        action_source: "website",
        user_data: userData,
      },
    ],
  };

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
