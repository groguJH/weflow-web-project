import Link from 'next/link';
import { CheckCircle2, Search } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { DIAGNOSIS } from '@/data/homeText';

export default function DiagnosisSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24" aria-labelledby="home-diagnosis-title">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[31.25rem] h-64 bg-cyan-400/7 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/10 via-transparent to-blue-950/10 pointer-events-none" />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-[clamp(3rem,7vw,5.5rem)]">
        <ScrollReveal name="home-diagnosis-heading" className="mx-auto max-w-3xl text-center">
          <SectionHeader
            titleId="home-diagnosis-title"
            title={DIAGNOSIS.title}
            description={DIAGNOSIS.subtitle}
            align="center"
            titleClassName="fluid-section-title"
            descriptionClassName="fluid-section-copy mx-auto max-w-2xl"
          />
        </ScrollReveal>

        <ScrollReveal
          as="article"
          name="home-diagnosis-card"
          delay={120}
          className="diagnosis-card mx-auto w-[min(100%,clamp(20rem,44vw,36rem))] overflow-hidden rounded-2xl border border-slate-800 bg-[#080d1a] shadow-xl shadow-black/40"
        >
          <ul className="px-[clamp(1rem,2vw,1.5rem)] pt-[clamp(1.2rem,2.4vw,1.9rem)]">
            {DIAGNOSIS.items.map((item, idx) => (
              <li
                key={item}
                className="diagnosis-item flex items-start gap-[clamp(0.65rem,1.5vw,0.9rem)] py-[clamp(0.7rem,1.45vw,0.95rem)]"
                style={{ '--diagnosis-item-delay': `${360 + idx * 180}ms` }}
              >
                <CheckCircle2 size="1em" className="mt-1 flex-shrink-0 text-[clamp(1.25rem,3vw,1.5rem)] text-cyan-400" aria-hidden="true" />
                <p className="fluid-card-copy text-pretty text-keep text-slate-200">
                  <span className="font-semibold text-white">{item}</span>
                </p>
              </li>
            ))}
          </ul>

          <div
            className="diagnosis-item px-[clamp(1rem,2vw,1.5rem)] pb-[clamp(1rem,2vw,1.5rem)] pt-[clamp(0.85rem,1.8vw,1.1rem)]"
            style={{ '--diagnosis-item-delay': `${360 + DIAGNOSIS.items.length * 180}ms` }}
          >
            <Link
              href="/reservation"
              className="diagnosis-cta-pulse fluid-section-button text-keep flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 text-center font-bold text-white transition-all hover:from-blue-500 hover:to-cyan-300"
            >
              <Search size="1em" className="text-[1rem]" aria-hidden="true" />
              {DIAGNOSIS.ctaButton}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
