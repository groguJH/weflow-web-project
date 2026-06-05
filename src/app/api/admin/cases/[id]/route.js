import { requireAdmin, jsonError } from '@/server/adminApi';
import { updateCaseItem } from '@/server/adminStore';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function PATCH(request, { params }) {
  const admin = await requireAdmin(request);
  if (!admin) return jsonError('관리자 인증이 필요합니다.', 401);

  const { id } = await params;
  const payload = await request.json();

  if (!payload.title || !payload.category) {
    return jsonError('사례명과 카테고리를 입력해 주세요.');
  }

  const caseItem = await updateCaseItem(id, payload);

  if (!caseItem) {
    return jsonError('수정할 사례를 찾을 수 없습니다.', 404);
  }

  return Response.json({ case: caseItem });
}
