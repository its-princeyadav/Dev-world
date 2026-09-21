import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const ADMIN_COOKIE_NAME = "devworld_admin_session";
const JWT_SECRET = process.env.JWT_SECRET || "dev-only-insecure-secret";

export function hashPassword(plain) {
  return bcrypt.hash(plain, 10);
}

export function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

export function signAdminToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAdminToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
