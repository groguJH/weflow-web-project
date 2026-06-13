import StickyForm from "@/components/ui/StickyForm";
import ScrollReveal from "@/components/ui/ScrollReveal";
import LandingAdPlansSection from "@/features/landing_page/sections/LandingAdPlansSection";
import LandingCarePlansSection from "@/features/landing_page/sections/LandingCarePlansSection";
import LandingProductionPlansSection from "@/features/landing_page/sections/LandingProductionPlansSection";
import MarketingContactSection from "@/features/marketing_landing_page/sections/MarketingContactSection";
import MarketingHeroSection from "@/features/marketing_landing_page/sections/MarketingHeroSection";
import MarketingProblemSection from "@/features/marketing_landing_page/sections/MarketingProblemSection";
import MarketingProofSection from "@/features/marketing_landing_page/sections/MarketingProofSection";
import MarketingServiceSection from "@/features/marketing_landing_page/sections/MarketingServiceSection";
import ReviewSection from "@/features/home_page/sections/ReviewSection";
import ServiceProcessSection from "@/features/services_page/sections/ServiceProcessSection";
import { createPageMetadata } from "@/data/metadata";

export const metadata = createPageMetadata({
  title: "문의로 이어지는 홈페이지 제작",
  description:
    "기획부터 제작, 광고 연동, 운영 관리까지 WEFLOW가 함께하며 문의 증가 구조를 설계합니다.",
  path: "/marketing",
});

export default function MarketingPage() {
  return (
    <div className="px-4 pt-20 sm:px-6 xl:px-10">
      <div className="flex flex-col lg:flex-row lg:gap-10 xl:gap-14">
        <div className="min-w-0 flex-1">
          <MarketingHeroSection />
          <MarketingServiceSection />
          <MarketingProblemSection />
          <MarketingProofSection />

          <ScrollReveal
            as="section"
            className="relative overflow-hidden py-12"
            aria-labelledby="marketing-pricing-title"
          >
            <div className="absolute -top-20 right-0 h-[31.25rem] w-[31.25rem] rounded-full bg-cyan-400/7 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-blue-600/8 blur-3xl pointer-events-none" />
            <div className="relative flex flex-col items-center justify-center gap-4 text-center">
              <span className="rounded-full border border-blue-800/50 bg-blue-900/30 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
                P R I C I N G
              </span>
              <h2
                id="marketing-pricing-title"
                className="text-keep text-2xl font-black text-white sm:text-3xl"
              >
                홈페이지 가격 안내
              </h2>
              <p className="text-keep text-sm text-slate-400">
                제작 플랜, 케어 플랜, 광고 플랜까지 필요한 카드형 가격 정보를 한
                번에 확인하세요.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={60}>
            <LandingProductionPlansSection />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <LandingCarePlansSection />
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <LandingAdPlansSection />
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <ServiceProcessSection />
          </ScrollReveal>

          <MarketingContactSection />

          <ScrollReveal delay={80}>
            <ReviewSection />
          </ScrollReveal>
        </div>

        <aside className="hidden w-[21.25rem] flex-shrink-0 py-6 lg:block xl:w-[23.75rem]">
          <div className="sticky-sidebar">
            <StickyForm id="marketing-form" />
          </div>
        </aside>
      </div>
    </div>
  );
}
