import Link from 'next/link';
import { Zap } from 'lucide-react';
import InfoNotice from '@/components/ui/InfoNotice';
import { PRODUCTION_PLANS, PRICING_NOTICE } from '@/data/pricingText';

export default function ProductionPlansSection() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[37.5rem] h-64 bg-cyan-400/7 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {PRODUCTION_PLANS.plans.map((plan) => {
          const isTop = plan.popular;
          const duration = plan.checklist.find((c) => c.item.includes('빠른 제작'))?.item;

          return (
            <li
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                isTop
                  ? 'bg-slate-900/60 border border-blue-500/40 shadow-xl shadow-blue-500/10 hover:border-blue-400/60 hover:shadow-blue-500/25'
                  : 'bg-slate-900/40 border border-slate-800/60 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10'
              }`}
            >
              {/* Top glow line */}
              {isTop && (
                <>
                  <div className="absolute inset-x-0 top-0 h-[0.0625rem] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                  <div className="absolute inset-x-8 top-0 h-[0.375rem] bg-cyan-400/40 blur-md" />
                </>
              )}

              {/* 추천 badge */}
              {isTop && (
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold text-white gradient-blue">
                  추천
                </span>
              )}

              {/* Tier badge */}
              <span className="inline-block self-start mb-3 px-2.5 py-0.5 rounded-md bg-blue-900/40 border border-blue-800/50 text-blue-400 text-[0.625rem] font-bold tracking-wider">
                {plan.tier}
              </span>

              {/* Plan name */}
              <h3 className="text-lg font-black text-white mb-2.5">{plan.name}</h3>

              {/* Duration badge */}
              {duration && (
                <div className="inline-flex items-center gap-1.5 self-start mb-5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
                  <Zap size="1em" className="text-[0.6875rem] text-blue-400" />
                  {duration}
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                {plan.originalPrice && (
                  <p className="text-sm text-slate-500 line-through decoration-red-400 mb-1">{plan.originalPrice}</p>
                )}
                <div className="flex items-end gap-1">
                  <span className={`font-black leading-none ${isTop ? 'text-4xl text-blue-300' : 'text-3xl text-white'}`}>
                    {plan.price}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">VAT 포함</p>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.checklist.map((item) => (
                  <li key={item.item} className="flex items-start gap-2.5">
                    <span className={`mt-0.5 font-bold text-sm flex-shrink-0 ${item.ok ? 'text-blue-400' : 'text-slate-600'}`}>
                      {item.ok ? '✓' : '✗'}
                    </span>
                    <span className={`text-sm ${item.ok ? 'text-slate-300' : 'text-slate-600'}`}>{item.item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/reservation"
                className={`block text-center py-3 rounded-xl font-bold text-sm transition-all ${
                  isTop
                    ? 'gradient-blue text-white'
                    : 'bg-slate-800/60 border border-white/[0.08] text-white hover:border-blue-500/40'
                }`}
              >
                신청하기
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex justify-center mt-8">
        <InfoNotice>
          {PRICING_NOTICE}
        </InfoNotice>
      </div>
    </section>
  );
}
