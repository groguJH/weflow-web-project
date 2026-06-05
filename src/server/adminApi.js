import { ADMIN_SESSION_COOKIE, getAdminBySession } from '@/server/adminStore';

export function jsonError(message, status = 400) {
  return Response.json({ message }, { status });
}

export async function requireAdmin(request) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return getAdminBySession(token);
}
