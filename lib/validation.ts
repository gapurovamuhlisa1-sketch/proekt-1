export type LeadInput = {
  name: string;
  phone: string;
};

/**
 * "+998 90 123 45 67", "998901234567", "901234567" -> "998901234567"
 * Returns null if it is not a valid Uzbek mobile number.
 */
export function normalizePhone(raw: string): string | null {
  let digits = (raw || "").replace(/\D/g, "");

  if (digits.length === 9) digits = "998" + digits;
  if (digits.length === 12 && digits.startsWith("998")) {
    // Operator kodi 2 xonali va 3..99 oralig'ida bo'lishi kerak
    const operator = digits.slice(3, 5);
    if (/^\d{2}$/.test(operator) && operator !== "00") return digits;
  }
  return null;
}

/** "998901234567" -> "+998 90 123 45 67" */
export function formatPhone(e164: string): string {
  const d = e164.replace(/\D/g, "");
  if (d.length !== 12) return "+" + d;
  return `+${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10, 12)}`;
}

export function normalizeName(raw: string): string | null {
  const name = (raw || "").trim().replace(/\s+/g, " ");
  if (name.length < 2 || name.length > 60) return null;
  if (!/[\p{L}]/u.test(name)) return null;
  return name;
}

export function validateLead(form: FormData):
  | { ok: true; data: LeadInput }
  | { ok: false; error: string } {
  const name = normalizeName(String(form.get("name") ?? ""));
  if (!name) return { ok: false, error: "Ismingizni to'liq kiriting." };

  const phone = normalizePhone(String(form.get("phone") ?? ""));
  if (!phone)
    return { ok: false, error: "Telefon raqam noto'g'ri. Masalan: +998 90 123 45 67" };

  return { ok: true, data: { name, phone } };
}
