/**
 * Saytdagi barcha matn shu yerda. Dizaynga tegmasdan shu faylni tahrirlang.
 */

export const site = {
  author: "Muhlisa Alimjanovna",
  role: "Amaliyotchi targetolog",
  domain: "targetcourse.uz",
  stream: "12-oqim",
  seatsTotal: 15,
  seatsLeft: 4,

  /**
   * Rasmlar. Fayllarni /public papkasiga tashlang.
   * Bo'sh qoldirsangiz — ism harflari (MA) ko'rinadi, sayt buzilmaydi.
   */
  avatar: "/451.jpg", // tepadagi kichik dumaloq rasm — 200x200 px
  portrait: "/451.jpg", // "Men haqimda" bo'limidagi katta rasm — 800x1000 px
};

export const hero = {
  badge: "1 oylik intensiv",
  title: ["Targetolog bo'ling va oyiga", "$1000", "daromad qiling"],
  text:
    "Facebook va Instagram reklamasini noldan o'rganing. 15 ta dars davomida " +
    "jonli mashg'ulotlar va real byudjet bilan amaliyot — kurs oxirida sizda " +
    "birinchi keys va mijoz topish tizimi bo'ladi.",
  primaryCta: "Kursga yozilish",
  secondaryCta: "Dastur bilan tanishish",
};

export const stats = [
  { value: "20 ta", label: "offlayn bitiruvchi" },
  { value: "3 yil", label: "amaliy tajriba" },
  { value: "$100k", label: "boshqarilgan byudjet" },
  { value: "30 ta", label: "brend" },
];

export const about = {
  title: "Men haqimda",
  lead: "Nazariyani kitobdan emas, o'z byudjetimni yoqib o'rgandim.",
  paragraphs: [
    "2023-yilda birinchi reklamamni yoqdim va 500 dollarni hech qanday natijasiz sarfladim. O'sha xato meni to'xtatmadi — aksincha, tizim qurishga majbur qildi.",
    "Bugun 30 dan ortiq brendga reklama yuritaman: kiyim do'konlaridan tortib stomatologiya klinikalarigacha. Umumiy boshqarilgan byudjet 100 000 dollardan oshdi.",
    "Kursda men sizga 3 yilda to'plagan tizimimni beraman — nima ishlaydi, nima ishlamaydi va nima uchun. Har bir dars real kabinetda, real pul bilan.",
  ],
  facts: ["Meta Blueprint sertifikati"],
};

export const program = {
  eyebrow: "Dars dasturi",
  title: "7 ta modul, 25 ta dars",
  text: "Haftada 3 marta jonli dars. Har bir modul oldingisining ustiga quriladi.",
  facts: [
    { value: "7", label: "modul" },
    { value: "3", label: "haftada dars" },
    { value: "25", label: "umumiy darslar soni" },
  ],
};

export const format = [
  { title: "Jonli darslar", text: "Haftada 3 marta, yozuvi doim qoladi" },
  { title: "Real byudjet", text: "Amaliyot uchun o'quv byudjeti beriladi" },
  { title: "Kichik guruh", text: "Oqimda 15 tadan ko'p emas — har kimga vaqt yetadi" },
  { title: "Doimiy chat", text: "Savolga 24 soat ichida javob, kurs tugagach ham" },
];

/**
 * Otzivlar. Shu ro'yxatga o'zingiz qo'shasiz.
 * Bo'sh bo'lsa, "Otzivlar" bo'limi saytda umuman ko'rinmaydi.
 *
 * Namuna:
 * { text: "Otziv matni.", name: "Ism Familiya", meta: "9-oqim · freelance targetolog" },
 */
export const testimonials: { text: string; name: string; meta: string }[] = [];

export const faq = [
  {
    q: "Umuman bilimim yo'q, tushunolamanmi?",
    a: "Ha. Kurs noldan boshlanadi — birinchi darsda Business Manager ochishdan boshlaymiz. Bitiruvchilarning ko'pchiligi kursga kelganda reklama kabinetini ko'rmagan edi.",
  },
  {
    q: "Qancha vaqt kerak?",
    a: "Haftada 3 ta dars, har biri 1,5–2 soat. Darslar kechqurun bo'lgani uchun ishdan keyin ulgurasiz. Yozuvi qolgani uchun o'tkazib yuborsangiz ham orqada qolmaysiz.",
  },
];

export const cta = {
  title: "Joyingizni band qiling",
  text: "Tez orada operatorlarimiz aloqaga chiqadi.",
};
