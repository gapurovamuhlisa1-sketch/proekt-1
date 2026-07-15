"use client";

import { useState } from "react";

/**
 * Rasm bo'lsa — rasmni, bo'lmasa ism harflarini ko'rsatadi.
 * /public ga fayl tashlamaguningizcha ham sayt buzilmaydi.
 *
 * Diqqat: bu client komponent. Server komponentlaridan faqat
 * <Photo ... /> ko'rinishida render qilinadi — ichidagi funksiyalar
 * tashqariga chiqarilmaydi.
 */
export function Photo({
  src,
  name,
  className = "",
}: {
  src?: string;
  /** To'liq ism. Rasm bo'lmasa shundan harflar olinadi. */
  name: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={name}
        className={`flex items-center justify-center bg-ink-700 font-display text-ink-200 ${className}`}
      >
        {initials}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
