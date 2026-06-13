import SectionHeader from '@/components/ui/SectionHeader';
import { MARKETING_SERVICES } from '@/data/marketingLandingText';

export default function MarketingServiceSection() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="marketing-service-title">
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-400/7 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeader
          titleId="marketing-service-title"
          eyebrow={MARKETING_SERVICES.eyebrow}
          title={MARKETING_SERVICES.title}
          align="left"
          titleClassName="sm:text-4xl"
        />

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {MARKETING_SERVICES.items.map((item) => (
            <li key={item} className="flex min-h-[8rem] items-end rounded-2xl border border-white/[0.08] bg-slate-900/55 p-5 transition-colors hover:border-cyan-400/30">
              <span className="text-keep text-sm font-black leading-snug text-white sm:text-base">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
