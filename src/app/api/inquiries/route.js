import { addInquiry } from '@/server/adminStore';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request) {
  const payload = await request.json();

  if (!payload.name || !payload.phone || !payload.type || !payload.industry) {
    return Response.json(
      { message: '이름, 연락처, 제작 종류, 업종은 필수입니다.' },
      { status: 400 }
    );
  }

  const inquiry = await addInquiry(payload);
  return Response.json({ inquiry }, { status: 201 });
}
