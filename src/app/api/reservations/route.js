import { addReservation } from '@/server/adminStore';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request) {
  const payload = await request.json();

  if (
    !payload.name ||
    !payload.phone ||
    !payload.type ||
    !payload.industry ||
    !payload.preferredDate ||
    !payload.preferredTime
  ) {
    return Response.json(
      { message: '예약 필수 정보를 모두 입력해 주세요.' },
      { status: 400 }
    );
  }

  const reservation = await addReservation(payload);
  return Response.json({ reservation }, { status: 201 });
}
