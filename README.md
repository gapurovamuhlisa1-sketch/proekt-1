# Target kursi — landing (Deep Ink)

Next.js 15 (App Router) + TypeScript + Tailwind. Forma → Server Action → Telegram bot + Meta Conversions API → `/rahmat` → 10 soniyadan keyin Telegram kanal.

## Ishga tushirish

```bash
npm install
cp .env.local.example .env.local   # keyin qiymatlarni to'ldiring
npm run dev
```

## .env.local

| O'zgaruvchi | Nima | Qayerdan |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Bot tokeni | [@BotFather](https://t.me/BotFather) → `/newbot` |
| `TELEGRAM_CHAT_ID` | Arizalar tushadigan chat | Pastda qarang |
| `NEXT_PUBLIC_TELEGRAM_CHANNEL_URL` | Rahmat sahifasi o'tkazadigan kanal | `https://t.me/kanal_nomi` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Pixel ID | Events Manager → Data sources |
| `META_CAPI_ACCESS_TOKEN` | CAPI tokeni | Events Manager → Settings → Generate access token |
| `META_TEST_EVENT_CODE` | Test kodi | Events Manager → Test events. **Ishga tushirgach o'chiring** |
| `NEXT_PUBLIC_SITE_URL` | Sayt manzili | `https://targetcourse.uz` |

`NEXT_PUBLIC_` prefiksi bor o'zgaruvchilar brauzerga chiqadi — token va maxfiy kalitlarga bu prefiksni **qo'ymang**.

### TELEGRAM_CHAT_ID ni topish

1. Botni guruhga qo'shing va admin qiling (yoki botga shaxsan `/start` yozing).
2. Guruhga bitta xabar tashlang.
3. Brauzerda oching: `https://api.telegram.org/bot<TOKEN>/getUpdates`
4. `"chat":{"id":-1001234567890}` — o'sha raqam. Guruh ID manfiy bo'ladi.

## Meta ulanishi

Bitta Lead hodisasi ikki yo'ldan ketadi va Meta ularni **bitta** qilib biriktiradi:

- **Pixel (brauzer)** — `components/MetaPixel.tsx`, `fbq('track','Lead',{},{eventID})`
- **CAPI (server)** — `lib/meta.ts`, `event_id` bir xil

Deduplikatsiya `event_id` orqali ishlaydi. Server tarafda telefon va ism SHA-256 bilan xeshlanadi, `_fbp` / `_fbc` cookie'lari va IP qo'shiladi — bu Event Match Quality ballini oshiradi.

Tekshirish: Events Manager → **Test events** → `META_TEST_EVENT_CODE` ni kiriting → formani to'ldiring. Ikkita manba (Browser + Server) ko'rinib, "Deduplicated" deb belgilanishi kerak.

## Matnni o'zgartirish

Saytdagi deyarli barcha matn bitta faylda: `lib/content.ts`.

| Blok | Nima |
|---|---|
| `site` | Ism, lavozim, domen, oqim, joylar soni, rasm yo'llari |
| `hero` | Tepadagi sarlavha va matn |
| `stats` | 4 ta raqam (bitiruvchi, tajriba, byudjet, brend) |
| `about` | "Men haqimda" matni va teglar |
| `program` | "7 ta modul, 25 ta dars" bloki |
| `format` | 4 ta kartochka (jonli darslar, byudjet, guruh, chat) |
| `testimonials` | Otzivlar — **hozircha bo'sh**, o'zingiz to'ldirasiz |
| `faq` | Savol-javob |
| `cta` | Forma bo'limi sarlavhasi |

### Otziv qo'shish

`testimonials` massiviga shu ko'rinishda yozing:

```ts
export const testimonials = [
  { text: "Otziv matni.", name: "Ism Familiya", meta: "9-oqim · freelance targetolog" },
];
```

Massiv bo'sh turganda "Otzivlar" bo'limi saytda umuman ko'rinmaydi.

### Rasm qo'yish

Fayllarni `/public` papkasiga tashlang:

- `muhlisa.jpg` — tepadagi kichik dumaloq rasm, 200x200 px
- `muhlisa-portret.jpg` — "Men haqimda" bo'limidagi katta rasm, 800x1000 px

Boshqa nom bersangiz, `lib/content.ts` → `site.avatar` va `site.portrait` ni yangilang. Rasm bo'lmasa sayt buzilmaydi — o'rniga ism harflari (`MA`) chiqib turadi.

## Ranglar

`tailwind.config.ts` → `colors.ink`. Gradientlar `backgroundImage` da (`ink-hero`, `ink-cta`, `ink-btn`) — bitta joydan butun saytni qayta bo'yash mumkin.

## Deploy (Vercel)

1. Repoyni GitHub'ga yuklang.
2. Vercel → Import → environment variables ni `.env.local` dan ko'chiring (Production + Preview).
3. Deploy.

`.env.local` git'ga tushmaydi — `.gitignore` da.

## Xavfsizlik

- Honeypot maydoni (`website`) botlarni ushlaydi.
- Telefon server tarafda ham qayta tekshiriladi (`lib/validation.ts`).
- Trafik ko'paysa `submit-lead.ts` ga IP bo'yicha rate limit qo'shish tavsiya etiladi (Upstash Redis yoki Vercel KV).

## Tez-tez uchraydigan xatolar

**`Attempted to call X() from the server but X is on the client`**
`"use client"` yozilgan fayldan oddiy funksiyani server komponentiga import qilgansiz. Server komponentidan client fayldagi *komponent* render qilinadi, lekin *funksiya* chaqirilmaydi. Funksiyani `lib/` dagi neytral faylga ko'chiring.

**Forma "Ariza yuborilmadi" deydi**
`.env.local` da `TELEGRAM_BOT_TOKEN` yoki `TELEGRAM_CHAT_ID` yo'q/noto'g'ri. `.env.local` ni o'zgartirgach dev serverni qayta ishga tushiring — Next uni faqat startda o'qiydi.

Dev rejimida bot umuman sozlanmagan bo'lsa, ariza terminalga chiqadi va `/rahmat` sahifasi ochiladi — flow'ni shunday sinab ko'rasiz.

**Rasm o'rnida "MA" turibdi**
`/public/muhlisa.jpg` yo'q yoki nomi boshqacha. Faylni qo'ying yoki `lib/content.ts` → `site.avatar` ni to'g'rilang.

**Chap pastdagi "Static route" belgisi**
Next.js ning dev indikatori, saytning qismi emas. `next.config.mjs` da o'chirilgan. `npm run build && npm start` da umuman chiqmaydi.
# proekt-1
# proekt-1
