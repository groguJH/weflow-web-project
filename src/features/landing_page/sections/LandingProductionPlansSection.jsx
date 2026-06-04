import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import { PRODUCTION_PLANS } from '@/data/pricingText';

export default function LandingProductionPlansSection() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden" aria-labelledby="landing-production-title">
      <SectionHeader
        titleId="landing-production-title"
        title={PRODUCTION_PLANS.sectionTitle}
        description={PRODUCTION_PLANS.notice}
        className="mb-12"
      />

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {PRODUCTION_PLANS.plans.map((plan) => (
          <li
            key={plan.name}
            className={`relative flex flex-col rounded-2xl p-6 transition-all duration-300 ${
              plan.popular
                ? 'bg-blue-950/40 backdrop-blur-sm border border-blue-500/50 shadow-xl shadow-blue-500/15'
                : 'bg-slate-900/50 backdrop-blur-sm border border-white/[0.07] hover:border-blue-500/30'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white gradient-blue">
                인기
              </span>
            )}
            <h3 className="text-lg font-black text-white mb-1">{plan.name}</h3>
            <div className="mb-5">
              <span className="text-2xl font-black text-blue-400">{plan.price}</span>
              <span className="text-xs text-slate-500 ml-1">{plan.unit}</span>
            </div>

            <ul className="space-y-2.5 flex-1 mb-6">
              {plan.checklist.map((item) => (
                <li key={item.item} className="flex items-start gap-2.5">
                  <span className={`mt-0.5 font-bold text-sm ${item.ok ? 'text-blue-400' : 'text-slate-600'}`}>
                    {item.ok ? '✓' : '✗'}
                  </span>
                  <span className={`text-sm ${item.ok ? 'text-slate-300' : 'text-slate-600'}`}>{item.item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/reservation"
              className={`block text-center py-3 rounded-xl font-bold text-sm transition-all ${
                plan.popular
                  ? 'gradient-blue text-white'
                  : 'bg-slate-800/60 border border-white/[0.08] text-white hover:border-blue-500/40 transition-colors'
              }`}
            >
              신청하기
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
