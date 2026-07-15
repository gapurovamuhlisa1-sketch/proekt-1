import { LeadForm } from "@/components/LeadForm";
import { site, cta } from "@/lib/content";

export function CtaSection() {
  return (
    <section id="ariza" className="scroll-mt-8 bg-ink-cta py-20 sm:py-24">
      <div className="container-x max-w-3xl">
        <h2 className="font-display text-2xl font-medium text-white sm:text-[32px]">
          {cta.title}
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-200">{cta.text}</p>

        <LeadForm />
      </div>
    </section>
  );
}

export function Footer() {
  const channel = process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL;

  return (
    <footer className="border-t border-line bg-ink-950 py-10">
      <div className="container-x flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-sm text-white">{site.author}</p>
          <p className="mt-1 text-xs text-muted">
            © {new Date().getFullYear()} {site.domain}
          </p>
        </div>

        {channel && (
          <a
            href={channel}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-soft transition-colors hover:text-white"
          >
            Telegram kanal →
          </a>
        )}
      </div>
    </footer>
  );
}
