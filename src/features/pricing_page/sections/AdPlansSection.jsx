import Link from "next/link";
import { MapPin, Search } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import InfoNotice from "@/components/ui/InfoNotice";
import TiltPricingCard from "@/components/ui/TiltPricingCard";
import {
  AD_PLANS,
  PRICING_NOTICE,
  PRICING_DETAIL_NOTICE,
} from "@/data/pricingText";

const THEME = {
  green: {
    border: "border-l-4 border-l-green-500",
    iconBg: "bg-green-500/10 border-green-500/20",
    icon: Search,
    iconColor: "text-green-400",
    title: "text-green-300",
    price: "text-green-300",
    checkBg: "bg-green-400/10",
    checkText: "text-green-300",
    button: "bg-green-600 text-white hover:bg-green-500",
  },
  orange: {
    border: "border-l-4 border-l-orange-500",
    iconBg: "bg-orange-500/10 border-orange-500/20",
    icon: MapPin,
    iconColor: "text-orange-400",
    title: "text-orange-300",
    price: "text-orange-300",
    checkBg: "bg-orange-400/10",
    checkText: "text-orange-300",
    button: "bg-orange-600 text-white hover:bg-orange-500",
  },
};

export default function AdPlansSection() {
  return (
    <section
      className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      aria-labelledby="ad-plans-title"
    >
      <div className="pointer-events-none absolute right-1/3 top-0 h-80 w-80 rounded-full bg-cyan-400/6 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-600/8 blur-3xl" />

      <SectionHeader
        titleId="ad-plans-title"
        title={AD_PLANS.sectionTitle}
        className="mb-12"
      />

      <ul className="relative mx-auto grid w-full max-w-[40rem] grid-cols-1 gap-5 sm:gap-6">
        {AD_PLANS.plans.map((plan, index) => {
          const theme = THEME[plan.theme] || THEME.green;
          const Icon = theme.icon;

          return (
            <li key={plan.name}>
              <TiltPricingCard
                name={`ad-plan-${plan.theme}`}
                delay={index * 90}
                direction={index % 2 === 0 ? "left" : "right"}
                className={`p-[clamp(1.125rem,1.5rem,1.5rem)] ${theme.border}`}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border ${theme.iconBg}`}
                  >
                    <Icon
                      size="1em"
                      className={`${theme.iconColor} text-[1.125rem]`}
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <h3
                      className={`text-[clamp(1.15rem,1.35rem,1.35rem)] font-black leading-snug ${theme.title}`}
                    >
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-[0.875rem] text-slate-400">
                      {plan.subtitle}
                    </p>
                  </div>
                </div>

                <ul className="mb-6 space-y-3">
                  {plan.checklist.map((item) => (
                    <li key={item.item} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[0.75rem] font-black ${theme.checkBg} ${theme.checkText}`}
                      >
                        ✓
                      </span>
                      <span className="text-[1rem] leading-relaxed text-slate-300">
                        {item.item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mb-6 border-t border-dashed border-slate-700/80 pt-5">
                  <p className="mb-1 text-[1rem] font-semibold text-slate-500 line-through decoration-red-400 decoration-2">
                    {plan.originalPrice}
                  </p>

                  <div className="flex flex-wrap items-end gap-2">
                    <span
                      className={`text-[clamp(2rem,2.45rem,2.45rem)] font-black leading-none ${theme.price}`}
                    >
                      {plan.price}
                    </span>
                    <span className="mb-1 rounded-full border border-red-400/30 bg-red-500/10 px-2 py-0.5 text-[0.6875rem] font-bold text-red-300">
                      파격 세일
                    </span>
                  </div>

                  <p className="mt-2 text-[0.75rem] text-slate-500">
                    {PRICING_NOTICE}
                  </p>
                </div>

                <Link
                  href="/reservation"
                  className={`block rounded-xl py-3 text-center text-[1rem] font-bold transition-all ${theme.button}`}
                >
                  신청하기
                </Link>
              </TiltPricingCard>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex flex-col items-center gap-4">
        <InfoNotice>{PRICING_NOTICE}</InfoNotice>

        <ul className="w-full max-w-[40rem] space-y-2 rounded-2xl border border-slate-800/70 bg-slate-900/40 p-5">
          {PRICING_DETAIL_NOTICE.map((notice) => (
            <li
              key={notice}
              className="flex items-start gap-2 text-[0.75rem] leading-relaxed text-slate-500"
            >
              <span className="mt-0.5 flex-shrink-0 text-cyan-400">✓</span>
              <span>{notice}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
