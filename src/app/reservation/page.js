import ReservationFormSection from '@/features/reservation_page/sections/ReservationFormSection';
import { createPageMetadata } from '@/data/metadata';

export const metadata = createPageMetadata({
  title: '무료 진단 상담 예약',
  description:
    '원하는 날짜와 시간대를 선택해 WEFLOW 홈페이지 제작, 랜딩페이지 제작, 케어 플랜 무료 상담을 예약하세요.',
  path: '/reservation',
});

export default function ReservationPage() {
  return (
    <div>
      <ReservationFormSection />
    </div>
  );
}
