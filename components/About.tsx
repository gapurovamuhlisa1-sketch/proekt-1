import { about, site } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";

export function About() {
  return (
    <section id="men-haqimda" className="container-x scroll-mt-8 py-20 sm:py-28">
      <Reveal>
        <p className="eyebrow">{about.title}</p>
      </Reveal>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
        <div>
          <Reveal delay={60}>
            <h2 className="max-w-xl font-display text-2xl font-medium leading-snug text-white sm:text-[30px]">
              {about.lead}
            </h2>
          </Reveal>

          <div className="mt-7 space-y-4 text-[15px] leading-relaxed text-soft">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={120 + i * 60}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={320}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {about.facts.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-line bg-ink-850 px-3.5 py-1.5 text-xs text-ink-200"
                >
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="overflow-hidden rounded-2xl border border-line bg-ink-850">
            <Photo
              src={site.portrait}
              name={site.author}
              className="aspect-[4/5] w-full text-3xl"
            />
          </div>
          <p className="mt-3 text-center font-display text-sm text-white">
            {site.author}
          </p>
          <p className="mt-1 text-center text-xs text-muted">{site.role}</p>
        </Reveal>
      </div>
    </section>
  );
}
