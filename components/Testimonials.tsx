import { testimonials, faq } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

function Stars() {
  return (
    <span className="text-sm tracking-[0.15em] text-gold" aria-label="5 dan 5">
      ★★★★★
    </span>
  );
}

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="otzivlar" className="container-x scroll-mt-8 py-20 sm:py-28">
      <Reveal>
        <p className="eyebrow">O'quvchilarim otzivi</p>
      </Reveal>
      <Reveal delay={60}>
        <h2 className="mt-3 max-w-lg font-display text-2xl font-medium text-white sm:text-[32px]">
          Bitiruvchilar nima deydi
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 70}>
            <figure className="flex h-full flex-col rounded-2xl border border-line bg-ink-850 p-6">
              <Stars />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-200">
                {t.text}
              </blockquote>
              <figcaption className="mt-5 border-t border-line pt-4">
                <span className="block text-sm font-semibold text-white">{t.name}</span>
                <span className="mt-0.5 block text-xs text-muted">{t.meta}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="border-t border-line bg-ink-900 py-20 sm:py-28">
      <div className="container-x max-w-3xl">
        <Reveal>
          <p className="eyebrow">Savol-javob</p>
        </Reveal>

        <div className="mt-8 divide-y divide-line border-y border-line">
          {faq.map((item, i) => (
            <Reveal key={item.q} delay={i * 50}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <span className="text-[15px] font-medium text-white">{item.q}</span>
                  <span
                    className="mt-0.5 shrink-0 text-xl leading-none text-muted
                               transition-transform duration-300 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-soft">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
