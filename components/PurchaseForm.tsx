"use client";

import { useActionState } from "react";
import { submitPurchase, type PurchaseState } from "@/app/actions/purchase";

const initial: PurchaseState = { status: "idle" };

export function PurchaseForm({
  token,
  name,
  phone,
  needPin,
  currency,
}: {
  token: string;
  name: string;
  phone: string;
  needPin: boolean;
  currency: string;
}) {
  const [state, action, pending] = useActionState(submitPurchase, initial);

  if (state.status === "ok") {
    return (
      <div className="rounded-2xl border border-line bg-ink-850 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink-btn">
          <svg viewBox="0 0 24 24" className="h-7 w-7">
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="mt-5 font-display text-xl font-medium text-white">
          Purchase yuborildi
        </h2>
        <p className="mt-2 text-sm text-soft">
          {name} bo'yicha sotuv Meta'ga qayd etildi. Endi bu oynani yopishingiz
          mumkin.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-2xl border border-line bg-ink-850 p-6 sm:p-8">
      <p className="eyebrow">Sotuvni qayd etish</p>
      <h1 className="mt-2 font-display text-2xl font-medium text-white">{name}</h1>
      <p className="mt-1 text-sm text-soft">+{phone}</p>

      <input type="hidden" name="token" value={token} />

      <label className="mt-6 block">
        <span className="text-sm text-soft">Sotuv summasi ({currency})</span>
        <input
          name="amount"
          type="number"
          inputMode="decimal"
          step="any"
          min="0"
          required
          autoFocus
          placeholder="0"
          className="field mt-2 text-lg"
        />
      </label>

      {needPin && (
        <label className="mt-4 block">
          <span className="text-sm text-soft">PIN</span>
          <input
            name="pin"
            type="password"
            required
            placeholder="••••"
            className="field mt-2"
            autoComplete="off"
          />
        </label>
      )}

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 h-12 w-full rounded-xl bg-white px-6 text-[15px] font-semibold
                   text-ink-800 transition-all hover:bg-ink-100 active:scale-[0.99]
                   disabled:opacity-60"
      >
        {pending ? "Yuborilmoqda…" : "Purchase yuborish"}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Bu ma'lumot faqat siz kiritgan summa bilan Meta Conversions API ga
        yuboriladi. Mijoz ma'lumotlari shifrlangan — havolada ko'rinmaydi.
      </p>
    </form>
  );
}