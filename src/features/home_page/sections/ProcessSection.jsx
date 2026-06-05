import Link from 'next/link';
import { ArrowRight, MessageSquare, LayoutTemplate, Palette, Code2, Search, Megaphone } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { PROCESS } from '@/data/homeText';

const STEP_ICONS = {
  message: MessageSquare,
  layout: LayoutTemplate,
  palette: Palette,
  code: Code2,
  search: Search,
  megaphone: Megaphone,
};

export default function ProcessSection() {
  const { sixSteps } = PROCESS;

  return (
    <section className="relative flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24" aria-labelledby="home-process-title">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

      <div className="relative mx-auto w-full max-w-7xl">
        <ScrollReveal name="home-process-heading" className="mx-auto mb-10 max-w-3xl sm:mb-14">
          <SectionHeader
            titleId="home-process-title"
            title={sixSteps.title}
            description={sixSteps.sub}
            titleClassName="sm:text-4xl lg:text-5xl"
            descriptionClassName="sm:text-lg"
          />
        </ScrollReveal>

        <ol className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-6 lg:gap-4 xl:gap-5">
          {sixSteps.steps.map((step, idx) => {
            const Icon = STEP_ICONS[step.icon];
            const isLast = idx === sixSteps.steps.length - 1;

            return (
              <ScrollReveal
                as="li"
                key={step.number}
                name={`home-process-step-${idx + 1}`}
                delay={idx * 80}
                className={`relative flex min-h-[11rem] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/[0.07] bg-slate-900/60 px-3 py-6 text-center transition duration-300 hover:-translate-y-1 hover:bg-slate-900/80 sm:min-h-[14rem] sm:px-5 sm:py-8 lg:min-h-[16rem] ${!isLast ? 'lg:after:absolute lg:after:left-full lg:after:top-1/2 lg:after:z-10 lg:after:h-[0.0625rem] lg:after:w-4 xl:after:w-5 lg:after:-translate-y-1/2 lg:after:bg-blue-400/25' : ''}`}
              >
                <span className="absolute right-3 top-2 text-5xl font-black leading-none text-white/[0.04] sm:right-4 sm:top-3 sm:text-6xl">
                  {step.number}
                </span>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/25 bg-blue-500/10 sm:mb-5 sm:h-16 sm:w-16">
                  <Icon size="1em" className="text-[1.35rem] text-cyan-400 sm:text-[1.75rem]" aria-hidden="true" />
                </div>
                <p className="mb-2 text-xs font-black tracking-widest text-blue-400 sm:mb-3 sm:text-sm">{step.number}</p>
                <h3 className="text-keep text-sm font-bold leading-snug text-white sm:text-lg lg:text-xl">{step.label}</h3>
              </ScrollReveal>
            );
          })}
        </ol>

        <ScrollReveal name="home-process-more" delay={180} className="mt-10 flex justify-center sm:mt-14">
          <Link
            href="/services"
            className="group inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/[0.08] bg-slate-900/70 px-6 py-3 text-sm font-bold text-white transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-slate-800/95 hover:text-white active:translate-y-0"
          >
            서비스 더 알아보기
            <ArrowRight size="1em" className="text-[1rem] transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
