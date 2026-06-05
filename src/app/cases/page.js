import CasesGridSection from '@/features/cases_page/sections/CasesGridSection';
import { getCaseItems } from '@/server/adminStore';

export const metadata = {
  title: 'WEFLOW 제작 사례',
  description: 'WEFLOW가 제작한 다양한 업종의 홈페이지·랜딩페이지 제작 사례를 확인하세요.',
};

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
