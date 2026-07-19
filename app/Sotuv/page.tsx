import type { Metadata } from "next";
import { open, type SealedLead } from "@/lib/crypto";
import { PurchaseForm } from "@/components/PurchaseForm";
import { CURRENCY } from "@/lib/meta";

export const metadata: Metadata = {
  title: "Sotuvni qayd etish.",
  robots: { index: false, follow: false },
};

// Har doim serverda ishlasin (token har safar yangi)
export const dynamic = "force-dynamic";

export default async function SotuvPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const { t } = await searchParams;
  const lead = t ? open<SealedLead>(t) : null;

  return (
    <main className="flex min-h-dvh items-center justify-center bg-ink-hero px-5 py-16">
      <div className="w-full max-w-md">
        {!lead ? (
          <div className="rounded-2xl border border-line bg-ink-850 p-8 text-center">
            <h1 className="font-display text-xl font-medium text-white">
              Havola yaroqsiz
            </h1>
            <p className="mt-2 text-sm text-soft">
              Havola buzilgan yoki muddati o'tgan. Telegramdagi eng so'nggi
              ariza xabaridan qayta oching.
            </p>
          </div>
        ) : (
          <PurchaseForm
            token={t!}
            name={lead.name}
            phone={lead.phone}
            needPin={Boolean(process.env.ADMIN_PIN)}
            currency={CURRENCY}
          />
        )}
      </div>
    </main>
  );
}