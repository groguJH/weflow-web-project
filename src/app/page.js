import HeroSection from '@/features/home_page/sections/HeroSection';
import BenefitsSection from '@/features/home_page/sections/BenefitsSection';
import ProcessSection from '@/features/home_page/sections/ProcessSection';
import CasesSection from '@/features/home_page/sections/CasesSection';
import DiagnosisSection from '@/features/home_page/sections/DiagnosisSection';
import ReviewSection from '@/features/home_page/sections/ReviewSection';
import { createPageMetadata } from '@/data/metadata';

export const metadata = createPageMetadata({
  title: '문의로 이어지는 홈페이지 제작',
  description:
    'WEFLOW는 홈페이지 제작부터 랜딩페이지, 광고 연동, 운영 관리까지 문의가 들어오는 구조로 설계합니다.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <CasesSection />
      <ProcessSection />
      <DiagnosisSection />
      <ReviewSection />
    </>
  );
}
