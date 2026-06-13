import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import { AD_PLANS, PRICING_NOTICE } from '@/data/pricingText';

export default function LandingAdPlansSection() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden" aria-labelledby="landing-ad-title">
      <SectionHeader titleId="landing-ad-title" title={AD_PLANS.sectionTitle} className="mb-12" />

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
        {AD_PLANS.plans.map((plan) => (
          <li
            key={plan.name}
            className="flex flex-col bg-slate-900/50 backdrop-blur-sm border border-white/[0.07] rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 card-glow"
          >
            <h3 className="text-lg font-black text-white mb-1">{plan.name}</h3>
            <div className="mb-5">
              <span className="text-2xl font-black text-blue-400">{plan.price}</span>
            </div>

            <ul className="space-y-2.5 flex-1 mb-6">
              {(plan.tags ?? plan.checklist ?? []).map((tag) => (
                <li key={typeof tag === 'string' ? tag : tag.item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 font-bold text-sm text-blue-400" aria-hidden="true">✓</span>
                  <span className="text-sm text-slate-300">
                    {typeof tag === 'string' ? tag : tag.item}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/reservation"
              className="block text-center py-3 rounded-xl font-bold text-sm bg-slate-800/60 border border-white/[0.08] text-white hover:border-blue-500/40 transition-colors"
            >
              신청하기
            </Link>
          </li>
        ))}
      </ul>

      <p className="text-center text-sm text-slate-500">{PRICING_NOTICE}</p>
    </section>
  );
}
