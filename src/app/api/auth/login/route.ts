import { NextResponse } from "next/server";
import {
  authenticateAttendant,
  createSessionToken,
  setSessionCookie,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (!body.email?.trim() || !body.password) {
      return NextResponse.json(
        { error: "Informe e-mail e senha." },
        { status: 400 }
      );
    }

    const session = await authenticateAttendant(body.email, body.password);
    if (!session) {
      return NextResponse.json(
        { error: "Credenciais inválidas." },
        { status: 401 }
      );
    }

    const token = await createSessionToken(session);
    await setSessionCookie(token);

    return NextResponse.json({
      attendant: {
        email: session.email,
        name: session.name,
        unitId: session.unitId,
        unitSlug: session.unitSlug,
        unitName: session.unitName,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível entrar." },
      { status: 500 }
    );
  }
}
