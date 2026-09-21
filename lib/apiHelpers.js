import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";

export async function requireAdmin(request) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
