import Link from 'next/link';
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
        className="relative mx-auto mb-10 flex w-full max-w-7xl flex-col items-start gap-4 px-4 sm:mb-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"
      >
        <h2 id="home-reviews-title" className="text-keep text-3xl font-black text-white sm:text-4xl lg:text-5xl">고객 후기</h2>
        <Link href="/reservation" className="inline-flex cursor-pointer whitespace-nowrap text-sm font-medium text-blue-400 transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-blue-300 active:translate-y-0">
          후기 더보기 →
        </Link>
      </ScrollReveal>

      <ScrollReveal name="home-reviews-slider" delay={120}>
        <ReviewSlider size="large" />
      </ScrollReveal>
    </section>
  );
}
