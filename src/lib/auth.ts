import { compare } from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  verifySessionToken,
  type SessionPayload,
} from "@/lib/session";

export {
  SESSION_COOKIE,
  createSessionToken,
  verifySessionToken,
  type SessionPayload,
};

export async function authenticateAttendant(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  const attendant = await prisma.attendant.findUnique({
    where: { email: normalized },
    include: { unit: true },
  });
  if (!attendant) return null;

  const valid = await compare(password, attendant.passwordHash);
  if (!valid) return null;

  const session: SessionPayload = {
    attendantId: attendant.id,
    email: attendant.email,
    name: attendant.name,
    unitId: attendant.unitId,
    unitSlug: attendant.unit.slug,
    unitName: attendant.unit.name,
  };
  return session;
}

export async function getSession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function setSessionCookie(token: string) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}
