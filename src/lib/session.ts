import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "allfights_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export type SessionPayload = {
  attendantId: string;
  email: string;
  name: string;
  unitId: string;
  unitSlug: string;
  unitName: string;
};

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET não configurado");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (
      typeof payload.attendantId !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.name !== "string" ||
      typeof payload.unitId !== "string" ||
      typeof payload.unitSlug !== "string" ||
      typeof payload.unitName !== "string"
    ) {
      return null;
    }
    return {
      attendantId: payload.attendantId,
      email: payload.email,
      name: payload.name,
      unitId: payload.unitId,
      unitSlug: payload.unitSlug,
      unitName: payload.unitName,
    } satisfies SessionPayload;
  } catch {
    return null;
  }
}
