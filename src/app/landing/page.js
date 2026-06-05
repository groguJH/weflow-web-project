import StickyForm from '@/components/ui/StickyForm';
import ReviewSlider from '@/components/ui/ReviewSlider';
import LandingHeroSection from '@/features/landing_page/sections/LandingHeroSection';
import LandingFeaturesSection from '@/features/landing_page/sections/LandingFeaturesSection';
import LandingStructureSection from '@/features/landing_page/sections/LandingStructureSection';
import LandingDiagnosisSection from '@/features/landing_page/sections/LandingDiagnosisSection';
import ServiceProcessSection from '@/features/services_page/sections/ServiceProcessSection';
import LandingProductionPlansSection from '@/features/landing_page/sections/LandingProductionPlansSection';
import LandingCarePlansSection from '@/features/landing_page/sections/LandingCarePlansSection';
import LandingAdPlansSection from '@/features/landing_page/sections/LandingAdPlansSection';
import { LANDING_NOTICE } from '@/data/landingText';
import { createPageMetadata } from '@/data/metadata';

export const metadata = createPageMetadata({
  title: '랜딩페이지 제작',
  description:
    '문의로 이어지는 랜딩페이지를 기획부터 제작, 광고 연동, 운영 관리까지 WEFLOW가 함께합니다.',
  path: '/landing',
});

export default function LandingPage() {
  return (
    <div className="pt-20 px-4 sm:px-6 xl:px-10">
      {/* 랜딩 전용 안내 문구 */}
      <div className="mb-0">
        <p className="text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-2 inline-block">
          {LANDING_NOTICE}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-10 xl:gap-14">
        <div className="flex-1 min-w-0">
          <LandingHeroSection />
          <LandingFeaturesSection />
          <LandingStructureSection />

          {/* 제작 진행 과정 */}
          <ServiceProcessSection />

          {/* 가격 안내 */}
          <div>
            <div className="relative py-12 overflow-hidden">
              <div className="absolute -top-20 right-0 w-[31.25rem] h-[31.25rem] bg-cyan-400/7 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
              <div className="relative flex flex-col items-center justify-center text-center gap-4">
                <span className="px-5 py-1.5 rounded-full border border-blue-800/50 bg-blue-900/30 text-blue-400 text-xs tracking-[0.3em] font-semibold uppercase">
                  P R I C I N G
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  제작 플랜 &amp; 가격 안내
                </h2>
                <p className="text-slate-400 text-sm">비즈니스 목적에 맞는 플랜을 선택하세요</p>
              </div>
            </div>
            <LandingProductionPlansSection />
            <LandingCarePlansSection />
            <LandingAdPlansSection />
          </div>

          {/* 고객 후기 슬라이더 */}
          <section className="py-16 bg-slate-900/50 overflow-hidden">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-white">고객 후기</h2>
            </div>
            <ReviewSlider />
          </section>

          <LandingDiagnosisSection />
        </div>

        {/* 우측 고정 문의 폼 (데스크탑) */}
        <aside className="hidden lg:block w-[21.25rem] xl:w-[23.75rem] flex-shrink-0 py-6">
          <div className="sticky-sidebar">
            <StickyForm id="landing-form" />
          </div>
        </aside>
      </div>

    </div>
  );
}
