import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { currentYearMonth } from "@/lib/format";
import { MARTIAL_ARTS } from "@/lib/academy";

function serializeStudent(
  student: {
    id: string;
    name: string;
    address: string;
    phone: string;
    martialArt: string;
    createdAt: Date;
    plan: { id: string; name: string; priceCents: number };
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

const studentInclude = {
  plan: true,
  payments: { orderBy: { yearMonth: "desc" as const } },
};

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  const yearMonth = currentYearMonth();
  const students = await prisma.student.findMany({
    where: { unitId: session.unitId },
    include: studentInclude,
    orderBy: { name: "asc" },
  });

  const plans = await prisma.plan.findMany({
    where: { unitId: session.unitId },
    orderBy: { priceCents: "asc" },
  });

  return NextResponse.json({
    unit: {
      id: session.unitId,
      slug: session.unitSlug,
      name: session.unitName,
    },
    yearMonth,
    martialArts: MARTIAL_ARTS,
    plans,
    students: students.map((student) => serializeStudent(student, yearMonth)),
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      name?: string;
      address?: string;
      phone?: string;
      martialArt?: string;
      planId?: string;
      paidThisMonth?: boolean;
    };

    const name = body.name?.trim() ?? "";
    const address = body.address?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const martialArt = body.martialArt?.trim() ?? "";
    const planId = body.planId?.trim() ?? "";

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
    if (!planId) {
      return NextResponse.json(
        { error: "Escolha o plano." },
        { status: 400 }
      );
    }

    const plan = await prisma.plan.findFirst({
      where: { id: planId, unitId: session.unitId },
    });
    if (!plan) {
      return NextResponse.json(
        { error: "Plano inválido para esta unidade." },
        { status: 400 }
      );
    }

    const yearMonth = currentYearMonth();
    const student = await prisma.student.create({
      data: {
        unitId: session.unitId,
        planId: plan.id,
        name,
        address,
        phone,
        martialArt,
        payments: {
          create: {
            yearMonth,
            paid: Boolean(body.paidThisMonth),
            paidAt: body.paidThisMonth ? new Date() : null,
          },
        },
      },
      include: studentInclude,
    });

    return NextResponse.json(
      { student: serializeStudent(student, yearMonth) },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Não foi possível cadastrar o aluno." },
      { status: 500 }
    );
  }
}
