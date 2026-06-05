import CasesGridSection from '@/features/cases_page/sections/CasesGridSection';
import { getCaseItems } from '@/server/adminStore';
import { createPageMetadata } from '@/data/metadata';

export const metadata = createPageMetadata({
  title: '성공사례',
  description:
    'PT샵, 필라테스, 헬스장, 보험 설계, 법률 사무소 등 다양한 업종의 WEFLOW 홈페이지·랜딩페이지 제작 사례를 확인하세요.',
  path: '/cases',
});

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default async function CasesPage() {
  const cases = await getCaseItems();

  return (
    <div className="pt-[4.5rem]">
      <CasesGridSection cases={cases} />
    </div>
  );
}
