import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminAntdProvider from '@/components/admin/AdminAntdProvider';
import AdminCasesClient from '@/features/admin/components/AdminCasesClient';
import { createPageMetadata } from '@/data/metadata';
import {
  ADMIN_SESSION_COOKIE,
  getAdminBySession,
} from '@/server/adminStore';

export const metadata = createPageMetadata({
  title: '사례 페이지 수정',
  description: 'WEFLOW 성공 사례 카드의 문구, 이미지, 링크를 수정하는 관리자 페이지입니다.',
  path: '/admin/cases',
  noIndex: true,
});

export const runtime = 'nodejs';

export default async function AdminCasesPage() {
  const cookieStore = await cookies();
  const admin = await getAdminBySession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);

  if (!admin) {
    redirect('/admin');
  }

  return (
    <section className="relative min-h-screen overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <div className="absolute -top-32 left-1/2 h-[28rem] w-[42rem] -translate-x-1/2 rounded-full bg-cyan-400/6 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-[90rem]">
        <AdminAntdProvider>
          <AdminCasesClient admin={admin} />
        </AdminAntdProvider>
      </div>
    </section>
  );
}
