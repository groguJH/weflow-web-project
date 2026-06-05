'use client';

import { MessageSquare, Rocket, Coins, Phone, TrendingUp, Target } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { LANDING_QUOTE } from '@/data/landingText';
import { BENEFITS } from '@/data/homeText';

const ICONS = [MessageSquare, Rocket, Coins, Phone, TrendingUp, Target];

export default function LandingFeaturesSection() {
  "use no memo";

  return (
    <section className="relative py-16" aria-labelledby="landing-benefits-title">
      <SectionHeader titleId="landing-benefits-title" title={BENEFITS.sectionTitle} className="mb-8 px-4" />

      {/* Desktop: 메인페이지 BenefitsSection 동일 레이아웃 */}
      <div className="hidden md:block px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden">
          <ul className="flex divide-x divide-slate-800/60">
            {BENEFITS.cards.map((card, idx) => {
              const Icon = ICONS[idx];
              const num = String(idx + 1).padStart(2, '0');
              return (
                <li
                  key={card.title}
                  className="flex-1 flex items-center gap-3 px-4 py-5 hover:bg-slate-800/30 transition-colors duration-200"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-blue-900/40 border border-blue-500/20 flex items-center justify-center">
                    <Icon size="1em" className="text-[1rem] text-cyan-400" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.625rem] font-bold text-blue-400 leading-none mb-1">{num}</p>
                    <p className="text-xs font-bold text-white leading-tight">{card.title}</p>
                    <p className="text-[0.6875rem] text-slate-400 leading-tight mt-0.5 truncate">{card.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Mobile: 메인페이지 BenefitsSection 동일 레이아웃 */}
      <div className="md:hidden mb-12">
        <div className="px-4">
          <div className="overflow-x-auto mobile-scrollbar rounded-2xl border border-slate-800/60 bg-slate-900/40 pb-[0.375rem]">
            <ul className="flex divide-x divide-slate-800/60">
              {BENEFITS.cards.map((card, idx) => {
                const Icon = ICONS[idx];
                const num = String(idx + 1).padStart(2, '0');
                return (
                  <li
                    key={card.title}
                    className="flex-none w-[10rem] flex items-center gap-3 px-4 py-5"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-blue-900/40 border border-blue-500/20 flex items-center justify-center">
                      <Icon size="1em" className="text-[1rem] text-cyan-400" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[0.625rem] font-bold text-blue-400 leading-none mb-1">{num}</p>
                      <p className="text-xs font-bold text-white leading-tight">{card.title}</p>
                      <p className="text-[0.6875rem] text-slate-400 leading-tight mt-0.5">{card.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* 인용 섹션 */}
      <figure className="py-16 flex flex-col items-center text-center px-4">
        {/* 따옴표 아이콘 */}
        <div className="w-14 h-14 rounded-full bg-blue-900/50 border border-blue-700/30 flex items-center justify-center mb-8">
          <span className="text-blue-400 text-2xl font-black leading-none select-none"></span>
        </div>

        {/* 메인 헤드라인 */}
        <blockquote className="mb-8 space-y-1">
          {LANDING_QUOTE.headline.map((line, i) => (
            <p key={i} className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {line}
            </p>
          ))}
        </blockquote>

        {/* 서브 텍스트 */}
        <figcaption className="space-y-1">
          {LANDING_QUOTE.sub.map((line, i) => (
            <p key={i} className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {line}
            </p>
          ))}
        </figcaption>
      </figure>
    </section>
  );
}
