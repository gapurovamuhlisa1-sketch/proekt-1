/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Chap pastdagi "Static route" / kompilyatsiya belgilari.
  // Faqat dev rejimida chiqadi, saytga hech qanday ta'siri yo'q.
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
};

export default nextConfig;
