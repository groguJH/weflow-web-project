import { requireAdmin } from '@/server/adminApi';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request) {
  const admin = await requireAdmin(request);

  if (!admin) {
    return Response.json({ authenticated: false }, { status: 401 });
  }

  return Response.json({ authenticated: true, admin });
}
