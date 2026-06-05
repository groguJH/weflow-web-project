import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ReviewSlider from '@/components/ui/ReviewSlider';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ReviewSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4.5rem)] flex-col justify-center overflow-hidden py-16 sm:py-20 lg:py-24" aria-labelledby="home-reviews-title">
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-400/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 via-transparent to-blue-950/10 pointer-events-none" />

      <ScrollReveal
        as="header"
        name="home-reviews-heading"
        className="relative mx-auto mb-8 flex w-full max-w-7xl flex-col items-center px-4 text-center sm:mb-10 sm:px-6 lg:px-8"
      >
        <h2 id="home-reviews-title" className="text-keep text-3xl font-black text-white sm:text-4xl lg:text-5xl">고객 후기</h2>
      </ScrollReveal>

      <ScrollReveal name="home-reviews-slider" delay={120}>
        <ReviewSlider size="large" direction="vertical" duration={88} />
      </ScrollReveal>

      <ScrollReveal name="home-reviews-more" delay={180} className="relative mt-8 flex justify-center px-4 sm:mt-10">
        <Link
          href="/reservation"
          className="group inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/[0.08] bg-slate-900/70 px-6 py-3 text-sm font-bold text-white transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-slate-800/95 hover:text-white active:translate-y-0"
        >
          후기 더보기
          <ArrowRight size="1em" className="text-[1rem] transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </ScrollReveal>
    </section>
  );
}
