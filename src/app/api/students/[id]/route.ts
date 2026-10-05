import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { currentYearMonth } from "@/lib/format";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
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
      name?: string;
      address?: string;
      phone?: string;
      martialArt?: string;
      planId?: string;
    };

    const data: {
      name?: string;
      address?: string;
      phone?: string;
      martialArt?: string;
      planId?: string;
    } = {};

    if (typeof body.name === "string") data.name = body.name.trim();
    if (typeof body.address === "string") data.address = body.address.trim();
    if (typeof body.phone === "string") data.phone = body.phone.trim();
    if (typeof body.martialArt === "string") {
      data.martialArt = body.martialArt.trim();
    }
    if (typeof body.planId === "string") {
      const plan = await prisma.plan.findFirst({
        where: { id: body.planId, unitId: session.unitId },
      });
      if (!plan) {
        return NextResponse.json(
          { error: "Plano inválido para esta unidade." },
          { status: 400 }
        );
      }
      data.planId = plan.id;
    }

    const updated = await prisma.student.update({
      where: { id },
      data,
      include: {
        plan: true,
        payments: { orderBy: { yearMonth: "desc" } },
      },
    });

    const yearMonth = currentYearMonth();
    const current = updated.payments.find((p) => p.yearMonth === yearMonth);

    return NextResponse.json({
      student: {
        id: updated.id,
        name: updated.name,
        address: updated.address,
        phone: updated.phone,
        martialArt: updated.martialArt,
        createdAt: updated.createdAt.toISOString(),
        plan: updated.plan,
        paidThisMonth: current?.paid ?? false,
        payments: updated.payments.map((payment) => ({
          yearMonth: payment.yearMonth,
          paid: payment.paid,
          paidAt: payment.paidAt?.toISOString() ?? null,
        })),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível atualizar o aluno." },
      { status: 500 }
    );
  }
}
