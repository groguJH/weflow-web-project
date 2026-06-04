import Link from 'next/link';
import { CheckCircle2, Search } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { DIAGNOSIS } from '@/data/homeText';

export default function DiagnosisSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24" aria-labelledby="home-diagnosis-title">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[31.25rem] h-64 bg-cyan-400/7 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/10 via-transparent to-blue-950/10 pointer-events-none" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <ScrollReveal name="home-diagnosis-heading">
          <SectionHeader
            titleId="home-diagnosis-title"
            title={DIAGNOSIS.title}
            description={DIAGNOSIS.subtitle}
            align="left"
            titleClassName="leading-tight sm:text-4xl lg:text-5xl"
            descriptionClassName="max-w-lg sm:text-lg"
          />
        </ScrollReveal>

        <ScrollReveal
          as="article"
          name="home-diagnosis-card"
          delay={120}
          className="overflow-hidden rounded-2xl border border-slate-800 bg-[#080d1a] shadow-xl shadow-black/40"
        >
          <ul className="px-6 pt-6 sm:px-8 sm:pt-8 lg:px-10 lg:pt-10">
            {DIAGNOSIS.items.map((item, idx) => (
              <ScrollReveal
                as="li"
                key={item.main}
                name={`home-diagnosis-item-${idx + 1}`}
                delay={idx * 90}
                className={`flex items-start gap-4 py-5 ${
                  idx < DIAGNOSIS.items.length - 1 ? 'border-b border-slate-800' : ''
                }`}
              >
                <CheckCircle2 size="1em" className="mt-1 flex-shrink-0 text-[1.5rem] text-cyan-400" aria-hidden="true" />
                <p className="text-pretty text-keep text-base leading-relaxed text-slate-200 lg:text-lg">
                  <span className="font-semibold text-white">{item.main}</span>
                  {' '}
                  <span className="text-slate-400">({item.detail})</span>
                </p>
              </ScrollReveal>
            ))}
          </ul>

          <ScrollReveal name="home-diagnosis-cta" delay={180} className="px-6 pb-6 pt-6 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
            <Link
              href="/reservation"
              className="text-keep flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 px-4 py-4 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:from-blue-500 hover:to-cyan-300 sm:text-base"
            >
              <Search size="1em" className="text-[1rem]" aria-hidden="true" />
              {DIAGNOSIS.ctaButton}
            </Link>
          </ScrollReveal>
        </ScrollReveal>
      </div>
    </section>
  );
}
