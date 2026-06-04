import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { CASES_SECTION } from '@/data/homeText';
import { CASES_PAGE } from '@/data/casesText';

export default function CasesSection() {
  const cards = CASES_PAGE.cases.slice(0, 4);

  return (
    <section className="relative flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24" aria-labelledby="home-cases-title">
      <div className="absolute -top-20 left-0 w-80 h-80 bg-cyan-400/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/6 to-transparent pointer-events-none" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 sm:gap-12 lg:flex-row lg:items-stretch lg:gap-16 xl:gap-20">

        {/* 좌측: 텍스트 영역 */}
        <div className="flex flex-shrink-0 flex-col justify-between lg:w-[23rem]">
          <ScrollReveal name="home-cases-copy">
            <h2 id="home-cases-title" className="text-balance text-keep mb-4 text-3xl font-black leading-tight text-white sm:mb-5 sm:text-4xl lg:text-5xl">
              {CASES_SECTION.heading.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            <p className="text-pretty text-keep mb-6 text-base leading-relaxed text-slate-400 sm:mb-8 sm:text-lg">
              {CASES_SECTION.sub}
            </p>
          </ScrollReveal>
          <ScrollReveal name="home-cases-cta" delay={120}>
            <Link
              href="/reservation"
              className="inline-flex cursor-pointer items-center self-start whitespace-nowrap rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-blue-500 active:translate-y-0"
            >
              {CASES_SECTION.moreButton}
            </Link>
          </ScrollReveal>
        </div>

        {/* 우측: 4개 카드 고정 */}
        <ul className="grid flex-1 grid-cols-2 gap-3 sm:gap-5 lg:gap-6">
          {cards.map((item, idx) => {
            const badge = item.title.charAt(0);
            return (
              <ScrollReveal
                as="li"
                key={item.title}
                name={`home-case-${idx + 1}`}
                delay={idx * 90}
                className="flex min-h-[16.5rem] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 sm:min-h-[24rem] lg:min-h-[25rem]"
              >
                <article className="flex h-full flex-col">
                  <div className="relative min-h-[10rem] flex-1 overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900 sm:min-h-[16rem] lg:min-h-[17rem]">
                    {item.img ? (
                      <Image src={item.img} alt={item.title} fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-blue-500/15 border border-blue-500/25 flex items-center justify-center">
                          <span className="text-xl font-black text-blue-300">{badge}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="px-3 py-4 sm:px-5 sm:py-5 lg:px-6">
                    <h3 className="text-keep text-sm font-bold leading-snug text-white sm:text-lg lg:text-xl">{item.title}</h3>
                    <p className="text-keep mt-1 text-xs text-slate-500 sm:mt-2 sm:text-sm">{item.category}</p>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </ul>

      </div>
    </section>
  );
}
