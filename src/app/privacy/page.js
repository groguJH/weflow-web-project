import LegalDocumentSection from '@/features/legal_page/sections/LegalDocumentSection';
import { PRIVACY_PAGE } from '@/data/legalText';
import { createPageMetadata } from '@/data/metadata';

export const metadata = createPageMetadata({
  title: '개인정보처리방침',
  description: 'WEFLOW 개인정보 수집, 이용, 보관 및 권리 행사 기준을 안내합니다.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="pt-[4.5rem]">
      <LegalDocumentSection document={PRIVACY_PAGE} />
    </div>
  );
}
