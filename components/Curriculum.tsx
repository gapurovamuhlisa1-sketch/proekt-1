import { program, format } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Curriculum() {
  return (
    <section
      id="dastur"
      className="scroll-mt-8 border-y border-line bg-ink-900 py-20 sm:py-28"
    >
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">{program.eyebrow}</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-3 font-display text-2xl font-medium text-white sm:text-[32px]">
            {program.title}
          </h2>
        </Reveal>
        <Reveal delay={110}>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-soft">
            {program.text}
          </p>
        </Reveal>

        <dl className="mt-10 grid grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {program.facts.map((f, i) => (
            <Reveal key={f.label} delay={140 + i * 70}>
              <div className="px-0 py-7 sm:px-8 sm:first:pl-0">
                <dt className="font-display text-[38px] font-medium leading-none text-ink-300">
                  {f.value}
                </dt>
                <dd className="mt-2.5 text-sm text-soft">{f.label}</dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {format.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="h-full rounded-2xl border border-line bg-ink-850 p-5">
                <p className="text-sm font-semibold text-white">{f.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-soft">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
