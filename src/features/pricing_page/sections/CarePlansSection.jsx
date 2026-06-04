import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import InfoNotice from '@/components/ui/InfoNotice';
import { CARE_PLANS, PRICING_NOTICE } from '@/data/pricingText';

export default function CarePlansSection() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden" aria-labelledby="care-plans-title">
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-400/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/8 to-transparent pointer-events-none" />

      <SectionHeader
        titleId="care-plans-title"
        title={CARE_PLANS.sectionTitle}
        description={CARE_PLANS.sub}
        className="relative mb-12"
      />

      <ul className="relative grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {CARE_PLANS.plans.map((plan) => (
          <li
            key={plan.name}
            className={`relative flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
              plan.isTop
                ? 'bg-gradient-to-b from-amber-950/40 to-slate-900/60 backdrop-blur-sm border border-amber-500/40 shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20'
                : plan.popular
                ? 'bg-blue-950/40 backdrop-blur-sm border border-blue-500/50 shadow-xl shadow-blue-500/15 hover:shadow-blue-500/25'
                : 'bg-slate-900/50 backdrop-blur-sm border border-white/[0.07] hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10'
            }`}
          >
            {plan.isTop && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-amber-900 bg-amber-400">
                👑 올인원
              </span>
            )}
            {plan.popular && !plan.isTop && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white gradient-blue">
                인기
              </span>
            )}

            {/* Tier badge */}
            <span className={`inline-block self-start mb-3 px-2.5 py-0.5 rounded-md text-[0.625rem] font-bold tracking-wider border ${
              plan.isTop
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-blue-900/40 border-blue-800/50 text-blue-400'
            }`}>
              {plan.tier}
            </span>

            <h3 className={`text-lg font-black mb-0.5 ${plan.isTop ? 'text-amber-400' : 'text-white'}`}>
              {plan.name}
            </h3>
            <p className={`text-xs mb-3 ${plan.isTop ? 'text-amber-300/70' : 'text-slate-400'}`}>{plan.subtitle}</p>

            {/* Price */}
            <div className="mb-5">
              {plan.originalPrice && (
                <p className="text-xs text-slate-500 line-through decoration-red-400 mb-0.5">{plan.originalPrice}</p>
              )}
              <span className={`text-2xl font-black ${plan.isTop ? 'text-amber-400' : 'text-blue-400'}`}>
                {plan.price}
              </span>
              <p className="text-[0.625rem] text-slate-500 mt-0.5">VAT 포함</p>
            </div>

            <ul className="space-y-2.5 flex-1 mb-6">
              {plan.checklist.map((item) => (
                <li key={item.item} className="flex items-start gap-2.5">
                  <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 ${item.ok ? (plan.isTop ? 'bg-amber-400' : 'bg-blue-400') : 'bg-slate-600'}`} />
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

      <div className="flex flex-col items-center mt-8 gap-2">
        <InfoNotice>
          {PRICING_NOTICE}
        </InfoNotice>
        <p className="text-[0.6875rem] text-slate-600 text-center leading-relaxed">
          ※ 유지보수는 텍스트, 이미지, 링크 등 경미한 수정 기준입니다.&nbsp;&nbsp;페이지 추가 및 기능 개발은 별도 비용이 발생할 수 있습니다.
        </p>
      </div>
    </section>
  );
}
