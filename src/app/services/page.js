import ServiceProcessSection from '@/features/services_page/sections/ServiceProcessSection';
import ManagementSystemSection from '@/features/services_page/sections/ManagementSystemSection';

export const metadata = {
  title: 'WEFLOW 서비스 — 제작 과정 및 사후관리',
  description: '상담·진단부터 광고운영·사후관리까지 WEFLOW의 전체 서비스 과정을 확인하세요.',
};

export default function ServicesPage() {
  return (
    <div className="pt-[4.5rem]">
      <ServiceProcessSection />
      <ManagementSystemSection />
    </div>
  );
}
