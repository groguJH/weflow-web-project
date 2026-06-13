import Link from "next/link";
import { Crown } from "lucide-react";
import InfoNotice from "@/components/ui/InfoNotice";
import TiltPricingCard from "@/components/ui/TiltPricingCard";
import { PRODUCTION_PLANS, PRICING_NOTICE } from "@/data/pricingText";

export default function ProductionPlansSection() {
  return (
    <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[32rem] -translate-x-1/2 rounded-full bg-cyan-400/7 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-600/8 blur-3xl" />

      <div className="relative mx-auto mb-8 max-w-[40rem] text-center">
        <p className="mb-3 text-[0.75rem] font-bold tracking-[0.24em] text-cyan-400">
          {PRODUCTION_PLANS.notice}
        </p>
        <h2 className="text-[clamp(1.6rem,2.2rem,2.2rem)] font-black leading-tight text-white">
          {PRODUCTION_PLANS.sectionTitle}
        </h2>
      </div>

      <ul className="relative mx-auto grid w-full max-w-[40rem] grid-cols-1 gap-5 sm:gap-6">
        {PRODUCTION_PLANS.plans.map((plan, index) => {
          const isTop = Boolean(plan.popular);

          return (
            <li key={plan.name}>
              <TiltPricingCard
                name={`production-plan-${plan.tier}`}
                delay={index * 90}
                direction={index % 2 === 0 ? "left" : "right"}
                className={`p-[clamp(1.125rem,1.5rem,1.5rem)] ${
                  isTop
                    ? "border-amber-400/45 bg-gradient-to-b from-amber-950/25 to-slate-950/45 shadow-amber-500/10"
                    : "border-slate-800/70 bg-slate-950/35"
                }`}
              >
                {isTop && (
                  <>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
                    <div className="absolute inset-x-10 top-0 h-2 bg-amber-400/25 blur-md" />
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-[0.75rem] font-black text-amber-950">
                      <Crown size={14} />
                      추천
                    </span>
                  </>
                )}

                <div className="mb-5">
                  <span
                    className={`mb-3 inline-block rounded-md border px-2.5 py-0.5 text-[0.6875rem] font-bold tracking-wider ${
                      isTop
                        ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                        : "border-blue-800/50 bg-blue-900/40 text-blue-400"
                    }`}
                  >
                    {plan.tier}
                  </span>

                  <h3
                    className={`text-[clamp(1.15rem,1.35rem,1.35rem)] font-black leading-snug ${
                      isTop ? "text-amber-300" : "text-white"
                    }`}
                  >
                    {isTop ? `👑 ${plan.name}` : plan.name}
                  </h3>
                </div>

                <ul className="mb-6 space-y-3">
                  {plan.checklist.map((item) => (
                    <li key={item.item} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[0.75rem] font-black ${
                          isTop
                            ? "bg-amber-400/15 text-amber-300"
                            : "bg-cyan-400/10 text-cyan-300"
                        }`}
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
                      className={`text-[clamp(2rem,2.45rem,2.45rem)] font-black leading-none ${
                        isTop ? "text-amber-300" : "text-cyan-300"
                      }`}
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
                  className={`block rounded-xl py-3 text-center text-[1rem] font-bold transition-all ${
                    isTop
                      ? "bg-amber-400 text-amber-950 hover:bg-amber-300"
                      : "border border-white/[0.08] bg-slate-800/70 text-white hover:border-white/25 hover:bg-white/[0.08]"
                  }`}
                >
                  신청하기
                </Link>
              </TiltPricingCard>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex justify-center">
        <InfoNotice>{PRICING_NOTICE}</InfoNotice>
      </div>
    </section>
  );
}
