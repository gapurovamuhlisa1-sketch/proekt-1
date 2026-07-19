"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 10_0000;
const R = 54;
const CIRCUMFERENCE = 2 * Math.PI * R;

export function ThankYou({ channelUrl }: { channelUrl: string }) {
  const [progress, setProgress] = useState(0); // 0 -> 1
  const [seconds, setSeconds] = useState(15);
  const done = useRef(false);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION_MS, 1);
      setProgress(p);
      setSeconds(Math.ceil((1 - p) * (DURATION_MS / 1000)));

      if (p < 1) {
        frame = requestAnimationFrame(tick);
      } else if (!done.current) {
        done.current = true;
        window.location.href = channelUrl;
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [channelUrl]);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-ink-hero px-5 py-16 text-center">
      {/* Belgi */}
      <div className="relative animate-check-in">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-ink-400/40" />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-ink-btn">
          <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <h1
        className="mt-8 animate-fade-up font-display text-[26px] font-medium leading-tight text-white sm:text-[34px]"
        style={{ animationDelay: "120ms" }}
      >
        Rahmat! Arizangiz qabul qilindi
      </h1>

      <p
        className="mt-4 max-w-md animate-fade-up text-[15px] leading-relaxed text-soft"
        style={{ animationDelay: "200ms" }}
      >
        15 daqiqa ichida qo'ng'iroq qilamiz. Shu vaqt ichida Telegram kanalimga
        qo'shiling — u yerda bepul darslar va real keyslarni chiqaraman.
      </p>

      {/* Countdown */}
      <div
        className="relative mt-12 animate-fade-up"
        style={{ animationDelay: "280ms" }}
        role="status"
        aria-live="polite"
      >
        <svg width="128" height="128" viewBox="0 0 128 128" className="-rotate-90">
          <circle
            cx="64"
            cy="64"
            r={R}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-ink-400/20"
          />
          <circle
            cx="64"
            cy="64"
            r={R}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-ink-300"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * progress}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-medium tabular-nums text-white">
            {seconds}
          </span>
          <span className="mt-0.5 text-[11px] text-muted">soniya</span>
        </div>
      </div>

      <p
        className="mt-6 animate-fade-up text-sm text-soft"
        style={{ animationDelay: "340ms" }}
      >
        Telegram kanalga o'tkazilmoqda…
      </p>

      <a
        href={channelUrl}
        className="mt-6 animate-fade-up rounded-xl bg-white px-6 py-3 text-[15px]
                   font-semibold text-ink-800 transition-transform active:scale-[0.98]"
        style={{ animationDelay: "400ms" }}
      >
        Hoziroq o'tish
      </a>

      <a
        href="/"
        className="mt-4 animate-fade-up text-xs text-muted underline-offset-4 transition-colors hover:text-soft hover:underline"
        style={{ animationDelay: "460ms" }}
      >
        Bosh sahifaga qaytish
      </a>
    </main>
  );
}
