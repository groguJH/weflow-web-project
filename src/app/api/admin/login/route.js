import { NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  getSessionTokenForAdmin,
  verifyAdmin,
} from '@/server/adminStore';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request) {
  const { username, password } = await request.json();
  const admin = await verifyAdmin(username, password);

  if (!admin) {
    return NextResponse.json(
      { message: '관리자 계정 정보를 확인해 주세요.' },
      { status: 401 }
    );
  }

  const sessionToken = await getSessionTokenForAdmin(admin.id);
  const response = NextResponse.json({
    admin,
    redirectTo: '/admin/dashboard',
  });

  response.cookies.set(ADMIN_SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });

  return response;
}
