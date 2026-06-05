import { requireAdmin, jsonError } from '@/server/adminApi';
import {
  deleteReservation,
  updateReservationStatus,
} from '@/server/adminStore';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function PATCH(request, { params }) {
  const admin = await requireAdmin(request);
  if (!admin) return jsonError('관리자 인증이 필요합니다.', 401);

  const { id } = await params;
  const { status } = await request.json();
  const reservation = await updateReservationStatus(id, status);

  if (!reservation) {
    return jsonError('예약 상태를 변경할 수 없습니다.', 404);
  }

  return Response.json({ reservation });
}

export async function DELETE(request, { params }) {
  const admin = await requireAdmin(request);
  if (!admin) return jsonError('관리자 인증이 필요합니다.', 401);

  const { id } = await params;
  const deleted = await deleteReservation(id);

  if (!deleted) {
    return jsonError('예약 데이터를 찾을 수 없습니다.', 404);
  }

  return Response.json({ ok: true });
}
