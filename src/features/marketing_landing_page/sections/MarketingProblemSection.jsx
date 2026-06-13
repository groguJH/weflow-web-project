import SectionHeader from "@/components/ui/SectionHeader";
import TiltPricingCard from "@/components/ui/TiltPricingCard";
import { MARKETING_PROBLEMS } from "@/data/marketingLandingText";

export default function MarketingProblemSection() {
  return (
    <section
      className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="marketing-problem-title"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[34rem] -translate-x-1/2 rounded-full bg-blue-600/7 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-cyan-400/6 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          titleId="marketing-problem-title"
          eyebrow={MARKETING_PROBLEMS.eyebrow}
          title={MARKETING_PROBLEMS.title}
          description={MARKETING_PROBLEMS.description}
          descriptionClassName="max-w-2xl"
          className="mb-10"
        />

        <div className="mx-auto w-full max-w-[46rem]">
          <TiltPricingCard
            name="marketing-problem-glass-card"
            direction="left"
            className="p-[clamp(1.5rem,3vw,2.5rem)] text-center"
          >
            <div className="mx-auto mb-7 flex max-w-2xl flex-wrap justify-center gap-2">
              {["인스타", "스레드", "블로그", "카카오톡", "당근 플레이스"].map(
                (channel) => (
                  <span
                    key={channel}
                    className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[0.75rem] font-bold text-cyan-200 transition-colors duration-300 group-hover:border-white/25 group-hover:bg-white/[0.08] group-hover:text-white"
                  >
                    {channel}
                  </span>
                ),
              )}
            </div>

            <div className="mx-auto flex max-w-3xl flex-col gap-3">
              {MARKETING_PROBLEMS.paragraphs.map((text) => (
                <p
                  key={text}
                  className="text-keep text-pretty text-[0.95rem] font-semibold leading-relaxed text-slate-300 transition-colors duration-300 group-hover:text-slate-100 sm:text-[1.05rem]"
                >
                  {text}
                </p>
              ))}
            </div>
          </TiltPricingCard>
        </div>
      </div>
    </section>
  );
}
