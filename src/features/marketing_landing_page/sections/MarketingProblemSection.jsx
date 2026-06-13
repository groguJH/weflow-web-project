import SectionHeader from '@/components/ui/SectionHeader';
import { MARKETING_PROBLEMS } from '@/data/marketingLandingText';

export default function MarketingProblemSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="marketing-problem-title">
      <div className="absolute left-1/2 top-0 h-64 w-[34rem] -translate-x-1/2 rounded-full bg-blue-600/7 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          titleId="marketing-problem-title"
          eyebrow={MARKETING_PROBLEMS.eyebrow}
          title={MARKETING_PROBLEMS.title}
          description={MARKETING_PROBLEMS.description}
          descriptionClassName="max-w-2xl"
          className="mb-10"
        />

        <ul className="grid gap-4 md:grid-cols-3">
          {MARKETING_PROBLEMS.items.map((item, index) => (
            <li key={item.title} className="rounded-2xl border border-white/[0.08] bg-slate-900/55 p-6">
              <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 text-sm font-black text-cyan-300">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-keep text-lg font-black text-white">{item.title}</h3>
              <p className="text-pretty text-keep mt-3 text-sm leading-relaxed text-slate-400">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
