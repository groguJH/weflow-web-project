import { Search, MapPin } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import InfoNotice from '@/components/ui/InfoNotice';
import { AD_PLANS, PRICING_NOTICE } from '@/data/pricingText';

const THEME = {
  green: {
    border: 'border-l-4 border-l-green-500',
    iconBg: 'bg-green-500/10 border-green-500/20',
    icon: Search,
    iconColor: 'text-green-400',
    price: 'text-green-400',
    tag: 'border-green-500/30 text-green-400 bg-green-500/5',
    btn: 'bg-green-600 hover:bg-green-500 text-white',
  },
  orange: {
    border: 'border-l-4 border-l-orange-500',
    iconBg: 'bg-orange-500/10 border-orange-500/20',
    icon: MapPin,
    iconColor: 'text-orange-400',
    price: 'text-orange-400',
    tag: 'border-orange-500/30 text-orange-400 bg-orange-500/5',
    btn: 'bg-orange-600 hover:bg-orange-500 text-white',
  },
};

export default function AdPlansSection() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden" aria-labelledby="ad-plans-title">
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-cyan-400/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
      <SectionHeader titleId="ad-plans-title" title={AD_PLANS.sectionTitle} className="mb-12" />

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {AD_PLANS.plans.map((plan) => {
          const t = THEME[plan.theme];
          const Icon = t.icon;
          return (
            <li
              key={plan.name}
              className={`flex flex-col bg-slate-900/50 backdrop-blur-sm border border-slate-800/60 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg min-h-[34.625rem] ${t.border}`}
            >
              {/* Icon + name */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${t.iconBg}`}>
                  <Icon size="1em" className={`${t.iconColor} text-[1.125rem]`} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-black text-white">{plan.name}</h3>
              </div>

              {/* Price */}
              <p className={`text-2xl font-black mb-3 ${t.price}`}>{plan.price}</p>

              {/* Description */}
              <p className="text-sm text-slate-400 leading-relaxed mb-6 whitespace-pre-line">{plan.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {plan.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-1 rounded-full border text-[0.625rem] font-medium ${t.tag}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex justify-center mt-8">
        <InfoNotice>
          {PRICING_NOTICE}
        </InfoNotice>
      </div>

      {/* 도메인 안내 */}
      <div className="text-center mt-6 space-y-1">
        <p className="text-xs text-slate-500">도메인은 고객님 명의로 등록되며 비용은 별도입니다.</p>
        <p className="text-xs text-slate-500">위플로우에서 등록 및 연결 세팅은 무료 지원해드립니다.</p>
        <p className="text-xs text-slate-500">✓ 도메인 연결 지원 &nbsp;&nbsp; ✓ 도메인 등록 대행 가능</p>
        <p className="text-xs text-slate-500">※ 도메인 비용 별도</p>
        <p className="text-xs text-slate-500">※ 광고비는 고객 계정에서 고객 결제수단으로 직접 결제되며, 위플로우는 운영 및 세팅만 진행합니다.</p>
      </div>
    </section>
  );
}
