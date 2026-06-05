import LegalDocumentSection from '@/features/legal_page/sections/LegalDocumentSection';
import { TERMS_PAGE } from '@/data/legalText';

export const metadata = {
  title: 'WEFLOW 이용약관',
  description: 'WEFLOW 홈페이지 제작, 랜딩페이지 제작, 광고 운영 및 상담 서비스 이용약관입니다.',
};

export default function TermsPage() {
  return (
    <div className="pt-[4.5rem]">
      <LegalDocumentSection document={TERMS_PAGE} />
    </div>
  );
}
