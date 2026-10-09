import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { currentYearMonth } from "@/lib/format";

type Params = { params: Promise<{ id: string }> };

const studentInclude = {
  plan: true,
  payments: { orderBy: { yearMonth: "desc" as const } },
};

function serializeStudent(
  student: {
    id: string;
    name: string;
    address: string;
    phone: string;
    martialArt: string;
    createdAt: Date;
    plan: { id: string; name: string; priceCents: number; description: string };
    payments: { yearMonth: string; paid: boolean; paidAt: Date | null }[];
  },
  yearMonth: string
) {
  const current = student.payments.find((p) => p.yearMonth === yearMonth);
  return {
    id: student.id,
    name: student.name,
    address: student.address,
    phone: student.phone,
    martialArt: student.martialArt,
    createdAt: student.createdAt.toISOString(),
    plan: student.plan,
    paidThisMonth: current?.paid ?? false,
    payments: student.payments.map((payment) => ({
      yearMonth: payment.yearMonth,
      paid: payment.paid,
      paidAt: payment.paidAt?.toISOString() ?? null,
    })),
  };
}

export async function GET(_request: Request, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { id } = await params;
  const student = await prisma.student.findFirst({
    where: { id, unitId: session.unitId },
    include: studentInclude,
  });
  if (!student) {
    return NextResponse.json({ error: "Aluno não encontrado." }, { status: 404 });
  }

  return NextResponse.json({
    student: serializeStudent(student, currentYearMonth()),
  });
}

export async function PATCH(request: Request, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.student.findFirst({
    where: { id, unitId: session.unitId },
  });
  if (!existing) {
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

    const name = typeof body.name === "string" ? body.name.trim() : existing.name;
    const address =
      typeof body.address === "string" ? body.address.trim() : existing.address;
    const phone =
      typeof body.phone === "string" ? body.phone.trim() : existing.phone;
    const martialArt =
      typeof body.martialArt === "string"
        ? body.martialArt.trim()
        : existing.martialArt;
    let planId = existing.planId;

    if (name.length < 3) {
      return NextResponse.json(
        { error: "Informe o nome completo do aluno." },
        { status: 400 }
      );
    }
    if (address.length < 5) {
      return NextResponse.json(
        { error: "Informe o endereço do aluno." },
        { status: 400 }
      );
    }
    if (phone.length < 8) {
      return NextResponse.json(
        { error: "Informe um telefone válido." },
        { status: 400 }
      );
    }
    if (!martialArt) {
      return NextResponse.json(
        { error: "Escolha a arte marcial." },
        { status: 400 }
      );
    }

    if (typeof body.planId === "string") {
      const plan = await prisma.plan.findFirst({
        where: { id: body.planId.trim(), unitId: session.unitId },
      });
      if (!plan) {
        return NextResponse.json(
          { error: "Plano inválido para esta unidade." },
          { status: 400 }
        );
      }
      planId = plan.id;
    }

    const updated = await prisma.student.update({
      where: { id },
      data: { name, address, phone, martialArt, planId },
      include: studentInclude,
    });

    return NextResponse.json({
      student: serializeStudent(updated, currentYearMonth()),
    });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível atualizar o aluno." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.student.findFirst({
    where: { id, unitId: session.unitId },
  });
  if (!existing) {
    return NextResponse.json({ error: "Aluno não encontrado." }, { status: 404 });
  }

  try {
    await prisma.student.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível excluir o aluno." },
      { status: 500 }
    );
  }
}
