import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { currentYearMonth } from "@/lib/format";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { id } = await params;
  const student = await prisma.student.findFirst({
    where: { id, unitId: session.unitId },
  });
  if (!student) {
    return NextResponse.json({ error: "Aluno não encontrado." }, { status: 404 });
  }

  try {
    const body = (await request.json()) as {
      yearMonth?: string;
      paid?: boolean;
    };

    const yearMonth =
      body.yearMonth && /^\d{4}-\d{2}$/.test(body.yearMonth)
        ? body.yearMonth
        : currentYearMonth();
    const paid = Boolean(body.paid);

    const payment = await prisma.payment.upsert({
      where: {
        studentId_yearMonth: {
          studentId: id,
          yearMonth,
        },
      },
      create: {
        studentId: id,
        yearMonth,
        paid,
        paidAt: paid ? new Date() : null,
      },
      update: {
        paid,
        paidAt: paid ? new Date() : null,
      },
    });

    return NextResponse.json({
      payment: {
        yearMonth: payment.yearMonth,
        paid: payment.paid,
        paidAt: payment.paidAt?.toISOString() ?? null,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível atualizar o pagamento." },
      { status: 500 }
    );
  }
}
