import MarketingContactSection from '@/features/marketing_landing_page/sections/MarketingContactSection';
import MarketingHeroSection from '@/features/marketing_landing_page/sections/MarketingHeroSection';
import MarketingProblemSection from '@/features/marketing_landing_page/sections/MarketingProblemSection';
import MarketingProofSection from '@/features/marketing_landing_page/sections/MarketingProofSection';
import MarketingServiceSection from '@/features/marketing_landing_page/sections/MarketingServiceSection';
import { createPageMetadata } from '@/data/metadata';

export const metadata = createPageMetadata({
  title: '회사홍보용 랜딩페이지 제작',
  description:
    'WEFLOW가 회사 소개, 서비스 강점, 성공 사례, 상담 신청 흐름을 담은 회사홍보용 랜딩페이지를 제작합니다.',
  path: '/marketing',
});

export default function MarketingPage() {
  return (
    <div className="pt-[4.5rem]">
      <MarketingHeroSection />
      <MarketingProblemSection />
      <MarketingServiceSection />
      <MarketingProofSection />
      <MarketingContactSection />
    </div>
  );
}
