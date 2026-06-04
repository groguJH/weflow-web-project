import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import { CARE_PLANS } from '@/data/pricingText';

export default function LandingCarePlansSection() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden" aria-labelledby="landing-care-title">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/8 to-transparent pointer-events-none" />

      <SectionHeader
        titleId="landing-care-title"
        title={CARE_PLANS.sectionTitle}
        description={CARE_PLANS.notice}
        className="relative mb-12"
      />

      <ul className="relative grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {CARE_PLANS.plans.map((plan) => (
          <li
            key={plan.name}
            className={`relative flex flex-col rounded-2xl p-6 transition-all duration-300 ${
              plan.isTop
                ? 'bg-gradient-to-b from-amber-950/40 to-slate-900/60 backdrop-blur-sm border border-amber-500/40 shadow-xl shadow-amber-500/10'
                : plan.popular
                ? 'bg-blue-950/40 backdrop-blur-sm border border-blue-500/50 shadow-xl shadow-blue-500/15'
                : 'bg-slate-900/50 backdrop-blur-sm border border-white/[0.07] hover:border-blue-500/30'
            }`}
          >
            {plan.isTop && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-amber-900 bg-amber-400">
                올인원
              </span>
            )}
            {plan.popular && !plan.isTop && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white gradient-blue">
                인기
              </span>
            )}

            <h3 className={`text-lg font-black mb-1 ${plan.isTop ? 'text-amber-400' : 'text-white'}`}>
              {plan.name}
            </h3>
            <div className="mb-5">
              <span className={`text-2xl font-black ${plan.isTop ? 'text-amber-400' : 'text-blue-400'}`}>
                {plan.price}
              </span>
            </div>

            <ul className="space-y-2.5 flex-1 mb-6">
              {plan.checklist.map((item) => (
                <li key={item.item} className="flex items-start gap-2.5">
                  <span className={`mt-0.5 font-bold text-sm ${item.ok ? (plan.isTop ? 'text-amber-400' : 'text-blue-400') : 'text-slate-600'}`}>
                    {item.ok ? 'O' : 'X'}
                  </span>
                  <span className={`text-sm ${item.ok ? 'text-slate-300' : 'text-slate-600'}`}>{item.item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/reservation"
              className={`block text-center py-3 rounded-xl font-bold text-sm transition-all ${
                plan.isTop
                  ? 'crown-gradient text-amber-900 font-black'
                  : plan.popular
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
