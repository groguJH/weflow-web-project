import ServiceProcessSection from '@/features/services_page/sections/ServiceProcessSection';
import ManagementSystemSection from '@/features/services_page/sections/ManagementSystemSection';
import { createPageMetadata } from '@/data/metadata';

export const metadata = createPageMetadata({
  title: '서비스 제작 과정 및 사후관리',
  description:
    '상담·진단, 기획·설계, 디자인, 개발·테스트, SEO 상단등록, 광고운영·사후관리까지 WEFLOW의 제작 과정을 확인하세요.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <div className="pt-[4.5rem]">
      <ServiceProcessSection />
      <ManagementSystemSection />
    </div>
  );
}
