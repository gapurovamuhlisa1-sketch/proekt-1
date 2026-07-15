import Link from "next/link";
import { site, stats, hero } from "@/lib/content";
import { Photo } from "@/components/Photo";

export function Hero() {
  return (
    <header className="relative overflow-hidden bg-ink-hero">
      {/* Nav */}
      <nav className="container-x flex h-[68px] items-center justify-between">
        <span className="flex items-center gap-2.5">
          <Photo
            src={site.avatar}
            name={site.author}
            className="h-9 w-9 shrink-0 rounded-full text-xs"
          />
          <span className="font-display text-[15px] font-medium tracking-tight text-white">
            {site.author}
          </span>
        </span>
        <div className="hidden items-center gap-7 text-sm text-soft md:flex">
          <a href="#men-haqimda" className="transition-colors hover:text-white">
            Men haqimda
          </a>
          <a href="#dastur" className="transition-colors hover:text-white">
            Dastur
          </a>
          <a href="#otzivlar" className="transition-colors hover:text-white">
            Otzivlar
          </a>
        </div>
        <a
          href="#ariza"
          className="rounded-full border border-line-strong px-4 py-2 text-sm
                     text-ink-200 transition-colors hover:border-ink-400 hover:text-white"
        >
          Ariza qoldirish
        </a>
      </nav>

      <div className="container-x pb-24 pt-14 sm:pt-20">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-500/60 bg-ink-400/15 px-3.5 py-1.5 text-xs text-ink-200">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-ink-300" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink-300" />
            </span>
            {hero.badge} · {site.stream}
          </span>
        </div>

        <h1
          className="mt-6 max-w-3xl animate-fade-up font-display text-[34px] font-medium
                     leading-[1.15] tracking-tight text-white sm:text-[52px]"
          style={{ animationDelay: "80ms" }}
        >
          {hero.title[0]}{" "}
          <span className="text-ink-300">{hero.title[1]}</span> {hero.title[2]}
        </h1>

        <p
          className="mt-5 max-w-xl animate-fade-up text-[15px] leading-relaxed text-soft sm:text-base"
          style={{ animationDelay: "160ms" }}
        >
          {hero.text}
        </p>

        <div
          className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "240ms" }}
        >
          <a
            href="#ariza"
            className="rounded-xl bg-ink-btn px-6 py-3.5 text-center text-[15px]
                       font-semibold text-white transition-transform active:scale-[0.98]"
          >
            {hero.primaryCta}
          </a>
          <Link
            href="#dastur"
            className="rounded-xl border border-line-strong px-6 py-3.5 text-center
                       text-[15px] text-soft transition-colors hover:border-ink-400 hover:text-white"
          >
            {hero.secondaryCta}
          </Link>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-ink-400/20 pt-8 sm:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="animate-fade-up"
              style={{ animationDelay: `${320 + i * 70}ms` }}
            >
              <dt className="font-display text-2xl font-medium text-ink-300 sm:text-[28px]">
                {s.value}
              </dt>
              <dd className="mt-1 text-xs text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
