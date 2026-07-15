"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { submitLead, type LeadState } from "@/app/actions/submit-lead";
import { trackLead } from "@/components/MetaPixel";
import { site } from "@/lib/content";

const initialState: LeadState = { status: "idle" };

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

/** 901234567 -> "90 123 45 67" */
function maskPhone(raw: string) {
  const d = raw.replace(/\D/g, "").replace(/^998/, "").slice(0, 9);
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)];
  return parts.filter(Boolean).join(" ");
}

function Submit({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="h-12 shrink-0 rounded-xl bg-white px-7 text-[15px] font-semibold
                 text-ink-800 transition-all hover:bg-ink-100
                 active:scale-[0.98] disabled:opacity-60"
    >
      {pending ? "Yuborilmoqda…" : "Yuborish"}
    </button>
  );
}

export function LeadForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const [phone, setPhone] = useState("");
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [pageUrl, setPageUrl] = useState("");
  const redirected = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const v = params.get(key);
      if (v) found[key] = v;
    }
    setUtm(found);
    setPageUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (state.status === "ok" && state.eventId && !redirected.current) {
      redirected.current = true;
      trackLead(state.eventId);
      router.push("/rahmat");
    }
  }, [state, router]);

  return (
    <form action={formAction} className="mt-6">
      {UTM_KEYS.map((key) => (
        <input key={key} type="hidden" name={key} value={utm[key] ?? ""} />
      ))}
      <input type="hidden" name="page_url" value={pageUrl} />

      {/* Honeypot — ekranda ko'rinmaydi, faqat botlar to'ldiradi */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 opacity-0"
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex-1">
          <span className="sr-only">Ismingiz</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Ismingiz"
            className="field"
          />
        </label>

        <label className="flex-1">
          <span className="sr-only">Telefon raqamingiz</span>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-soft">
              +998
            </span>
            <input
              name="phone"
              type="tel"
              inputMode="numeric"
              required
              autoComplete="tel"
              placeholder="90 123 45 67"
              value={phone}
              onChange={(e) => setPhone(maskPhone(e.target.value))}
              className="field pl-[4.25rem]"
            />
          </div>
        </label>

        <Submit pending={pending} />
      </div>

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="mt-3 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
        >
          {state.message}
        </p>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Tugmani bosish orqali siz bilan bog'lanishimizga rozilik bildirasiz.
        Raqamingiz uchinchi shaxslarga berilmaydi. Guruhda {site.seatsTotal} ta
        joy — {site.seatsLeft} tasi qoldi.
      </p>
    </form>
  );
}
