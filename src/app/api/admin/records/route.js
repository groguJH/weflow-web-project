import { requireAdmin, jsonError } from '@/server/adminApi';
import { getAdminRecords } from '@/server/adminStore';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request) {
  const admin = await requireAdmin(request);
  if (!admin) return jsonError('관리자 인증이 필요합니다.', 401);

  const records = await getAdminRecords();
  return Response.json(records);
}
