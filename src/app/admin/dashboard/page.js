import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminAntdProvider from '@/components/admin/AdminAntdProvider';
import AdminDashboardClient from '@/features/admin/components/AdminDashboardClient';
import {
  ADMIN_SESSION_COOKIE,
  getAdminBySession,
} from '@/server/adminStore';

export const metadata = {
  title: 'WEFLOW 관리자 대시보드',
  description: 'WEFLOW 예약 및 문의 상태를 관리하는 관리자 대시보드입니다.',
};

export const runtime = 'nodejs';

export default async function AdminDashboardPage() {
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
          <AdminDashboardClient admin={admin} />
        </AdminAntdProvider>
      </div>
    </section>
  );
}
