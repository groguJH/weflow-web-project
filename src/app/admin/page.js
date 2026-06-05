import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminAntdProvider from '@/components/admin/AdminAntdProvider';
import AdminLoginForm from '@/features/admin/components/AdminLoginForm';
import {
  ADMIN_SESSION_COOKIE,
  getAdminBySession,
} from '@/server/adminStore';

export const metadata = {
  title: 'WEFLOW 관리자 로그인',
  description: 'WEFLOW 예약 및 문의 관리를 위한 관리자 로그인 페이지입니다.',
};

export const runtime = 'nodejs';

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const admin = await getAdminBySession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);

  if (admin) {
    redirect('/admin/dashboard');
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-28 sm:px-6 lg:px-8">
      <div className="absolute -top-32 right-0 h-[30rem] w-[30rem] rounded-full bg-cyan-400/8 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative flex w-full justify-center">
        <AdminAntdProvider>
          <AdminLoginForm />
        </AdminAntdProvider>
      </div>
    </section>
  );
}
