import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import DiagnosisModalButton from '@/components/ui/DiagnosisModalButton';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { CASES_SECTION } from '@/data/homeText';
import { CASES_PAGE, getCaseSlug } from '@/data/casesText';

const HOME_CASE_TITLES = ['PT샵', '필라테스', '헬스장', '보험 설계', '자동차 디테일링'];

export default function CasesSection() {
  const cards = HOME_CASE_TITLES
    .map((title) => CASES_PAGE.cases.find((item) => item.title === title))
    .filter(Boolean)
    .map((item) => (
      item.title === '자동차 디테일링'
        ? { ...item, slug: getCaseSlug(item), title: '카센타', category: '자동차' }
        : item
    ));

  return (
    <section className="relative flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24" aria-labelledby="home-cases-title">
      <div className="absolute -top-20 left-0 w-80 h-80 bg-cyan-400/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/6 to-transparent pointer-events-none" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 sm:gap-12 lg:flex-row lg:items-stretch lg:gap-16 xl:gap-20">

        {/* 좌측: 성공 사례 안내 박스 */}
        <ScrollReveal
          name="home-cases-copy"
          className="flex flex-shrink-0 flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/55 p-[clamp(1.25rem,3vw,2rem)] lg:w-[clamp(19rem,24vw,23rem)]"
        >
          <div>
            <h2 id="home-cases-title" className="text-balance text-keep mb-[clamp(0.875rem,2vw,1.25rem)] text-[clamp(1.45rem,3.2vw,2.5rem)] font-black leading-[1.12] text-white">
              다양한 업종의 성공 사례를 확인 하세요.
            </h2>
            <p className="text-pretty text-keep text-[clamp(0.8125rem,1.55vw,1rem)] font-semibold leading-[1.65] text-slate-400">
              {CASES_SECTION.sub}
            </p>
          </div>
          <div className="mt-[clamp(1.75rem,4vw,2.75rem)]">
            <DiagnosisModalButton
              className="fluid-section-button group inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/[0.08] bg-slate-900/70 font-bold text-white transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-slate-800/95 hover:text-white active:translate-y-0"
            >
              {CASES_SECTION.moreButton.replace(' →', '')}
              <ArrowRight size="1em" className="text-[1rem] transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </DiagnosisModalButton>
          </div>
        </ScrollReveal>

        {/* 우측: 5개 성공 사례 이미지 패널 */}
        <ScrollReveal
          name="home-cases-gallery"
          delay={120}
          className="flex-1"
        >
          <div className="mb-[clamp(0.875rem,2vw,1.25rem)] flex items-center justify-between gap-4">
            <p className="text-[clamp(0.875rem,1.7vw,1rem)] font-black text-white">
              성공사례
            </p>
            <Link
              href="/cases"
              className="group inline-flex items-center gap-1 whitespace-nowrap text-[clamp(0.75rem,1.4vw,0.875rem)] font-bold text-blue-300 transition-colors hover:text-white"
            >
              더보기
              <ArrowRight size="1em" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>

          <ul className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4 md:grid-cols-3 xl:grid-cols-5">
            {cards.map((item, idx) => (
              <ScrollReveal
                as="li"
                key={item.title}
                name={`home-case-${idx + 1}`}
                delay={idx * 70}
                className="h-full"
              >
                <Link
                  href={`/cases/${getCaseSlug(item)}`}
                  className="block h-full"
                  aria-label={`${item.title} 성공사례 상세 보기`}
                >
                <article className="group flex h-full min-h-[clamp(13.25rem,21vw,15.75rem)] flex-col overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/35 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-blue-400/35">
                  <div className="relative h-[clamp(8.5rem,14vw,10.5rem)] shrink-0 overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900">
                    <Image src={item.img} alt={item.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 24vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/8 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col justify-start px-[clamp(0.875rem,2vw,1.125rem)] py-[clamp(0.75rem,1.7vw,1rem)]">
                    <h3 className="text-keep text-[clamp(0.8125rem,1.65vw,1rem)] font-black leading-snug text-white">{item.title}</h3>
                    <p className="text-keep mt-1 text-[clamp(0.6875rem,1.25vw,0.8125rem)] font-semibold text-slate-500">{item.category}</p>
                  </div>
                </article>
                </Link>
              </ScrollReveal>
            ))}
          </ul>
        </ScrollReveal>

      </div>
    </section>
  );
}
