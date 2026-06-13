import ReviewSlider from "@/components/ui/ReviewSlider";
import DiagnosisModalButton from "@/components/ui/DiagnosisModalButton";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ReviewSection() {
  return (
    <section
      className="relative flex min-h-[calc(100vh-4.5rem)] flex-col justify-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-labelledby="home-reviews-title"
    >
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-400/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 via-transparent to-blue-950/10 pointer-events-none" />

      <ScrollReveal
        as="header"
        name="home-reviews-heading"
        className="relative mx-auto mb-[clamp(3.25rem,7vw,6rem)] flex w-full max-w-7xl items-center justify-between gap-4"
      >
        <h2
          id="home-reviews-title"
          className="fluid-section-title text-keep font-black text-white"
        >
          고객 후기
        </h2>
        <DiagnosisModalButton className="text-keep inline-flex cursor-pointer items-center justify-center whitespace-nowrap text-[clamp(0.78rem,1.25vw,0.9rem)] font-bold text-blue-300 transition-colors duration-200 hover:text-cyan-300">
          후기 더보기 →
        </DiagnosisModalButton>
      </ScrollReveal>

      <ScrollReveal name="home-reviews-slider" delay={120}>
        <ReviewSlider size="large" direction="horizontal" duration={58} rows={2} />
      </ScrollReveal>
    </section>
  );
}
