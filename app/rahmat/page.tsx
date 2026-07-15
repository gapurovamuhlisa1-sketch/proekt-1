import type { Metadata } from "next";
import { ThankYou } from "@/components/ThankYou";

export const metadata: Metadata = {
  title: "Rahmat! Arizangiz qabul qilindi",
  robots: { index: false, follow: false },
};

export default function RahmatPage() {
  const channelUrl =
    process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL || "https://t.me/telegram";

  return <ThankYou channelUrl={channelUrl} />;
}
