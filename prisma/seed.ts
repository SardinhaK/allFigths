import "dotenv/config";
import path from "node:path";
import { hash } from "bcryptjs";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const databaseUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
const raw = databaseUrl.replace(/^file:/, "");
const absolute = path.isAbsolute(raw)
  ? raw
  : path.join(process.cwd(), raw.replace(/^\.\//, ""));
const adapter = new PrismaBetterSqlite3({ url: `file:${absolute}` });
const prisma = new PrismaClient({ adapter });

const DEMO_PASSWORD = "katana2026";

const UNITS = [
  {
    slug: "caxanga",
    name: "Unidade Caxangá",
    shortName: "Caxangá",
    address: "Av. Caxangá, 2450 — Madalena",
    city: "Recife/PE",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Av.+Caxangá,+2450,+Recife,+PE",
    phone: "(81) 3125-4410",
    summary:
      "Nossa casa-mãe no eixo da Caxangá. Tatame amplo, ringue e vestiários separados.",
    schedule: [
      { dayOfWeek: "Segunda", time: "07:00", martialArt: "Judô", sortOrder: 1 },
      { dayOfWeek: "Segunda", time: "19:00", martialArt: "Jiu-Jitsu", sortOrder: 2 },
      { dayOfWeek: "Segunda", time: "20:30", martialArt: "Muay Thai", sortOrder: 3 },
      { dayOfWeek: "Terça", time: "07:00", martialArt: "Karatê", sortOrder: 4 },
      { dayOfWeek: "Terça", time: "19:00", martialArt: "Boxe", sortOrder: 5 },
      { dayOfWeek: "Quarta", time: "07:00", martialArt: "Judô", sortOrder: 6 },
      { dayOfWeek: "Quarta", time: "19:00", martialArt: "Jiu-Jitsu", sortOrder: 7 },
      { dayOfWeek: "Quarta", time: "20:30", martialArt: "Muay Thai", sortOrder: 8 },
      { dayOfWeek: "Quinta", time: "07:00", martialArt: "Karatê", sortOrder: 9 },
      { dayOfWeek: "Quinta", time: "19:00", martialArt: "Boxe", sortOrder: 10 },
      { dayOfWeek: "Sexta", time: "19:00", martialArt: "Jiu-Jitsu", sortOrder: 11 },
      { dayOfWeek: "Sábado", time: "09:00", martialArt: "Karatê", sortOrder: 12 },
      { dayOfWeek: "Sábado", time: "10:30", martialArt: "Jiu-Jitsu", sortOrder: 13 },
    ],
    plans: [
      {
        name: "Mensal",
        priceCents: 18900,
        description: "Uma modalidade, acesso livre aos horários da unidade.",
      },
      {
        name: "Duas artes",
        priceCents: 24900,
        description: "Duas modalidades na mesma unidade.",
      },
      {
        name: "All Access",
        priceCents: 31900,
        description: "Todas as artes desta unidade + treino livre no sábado.",
      },
    ],
    attendant: {
      email: "caxanga@allfights.com.br",
      name: "Atendente Caxangá",
    },
    students: [
      {
        name: "Marina Costa",
        address: "Rua da Hora, 120 — Espinheiro",
        phone: "(81) 98811-2200",
        martialArt: "Jiu-Jitsu",
        planName: "Mensal",
        paidThisMonth: true,
      },
      {
        name: "Rafael Mendes",
        address: "Av. Beira Rio, 80 — Madalena",
        phone: "(81) 98700-3311",
        martialArt: "Muay Thai",
        planName: "Duas artes",
        paidThisMonth: false,
      },
    ],
  },
  {
    slug: "nova-descoberta",
    name: "Unidade Nova Descoberta",
    shortName: "Nova Descoberta",
    address: "Rua Nova Descoberta, 318 — Nova Descoberta",
    city: "Recife/PE",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Rua+Nova+Descoberta,+318,+Recife,+PE",
    phone: "(81) 3445-2290",
    summary:
      "Unidade de bairro com turmas de manhã e noite. Foco em iniciantes e kids no sábado.",
    schedule: [
      { dayOfWeek: "Segunda", time: "18:30", martialArt: "Jiu-Jitsu", sortOrder: 1 },
      { dayOfWeek: "Segunda", time: "20:00", martialArt: "Muay Thai", sortOrder: 2 },
      { dayOfWeek: "Terça", time: "18:30", martialArt: "Karatê", sortOrder: 3 },
      { dayOfWeek: "Quarta", time: "18:30", martialArt: "Jiu-Jitsu", sortOrder: 4 },
      { dayOfWeek: "Quarta", time: "20:00", martialArt: "Boxe", sortOrder: 5 },
      { dayOfWeek: "Quinta", time: "18:30", martialArt: "Taekwondo", sortOrder: 6 },
      { dayOfWeek: "Sexta", time: "19:00", martialArt: "Muay Thai", sortOrder: 7 },
      { dayOfWeek: "Sábado", time: "09:00", martialArt: "Karatê Kids", sortOrder: 8 },
      { dayOfWeek: "Sábado", time: "10:30", martialArt: "Jiu-Jitsu", sortOrder: 9 },
    ],
    plans: [
      {
        name: "Mensal",
        priceCents: 15900,
        description: "Uma modalidade nos horários da unidade.",
      },
      {
        name: "Kids",
        priceCents: 12900,
        description: "Turmas infantis de sábado + reforço na semana.",
      },
      {
        name: "Duas artes",
        priceCents: 21900,
        description: "Duas modalidades na Unidade Nova Descoberta.",
      },
    ],
    attendant: {
      email: "nova@allfights.com.br",
      name: "Atendente Nova Descoberta",
    },
    students: [
      {
        name: "Lucas Azevedo",
        address: "Rua Alto do Céu, 45 — Nova Descoberta",
        phone: "(81) 98654-1100",
        martialArt: "Judô",
        planName: "Mensal",
        paidThisMonth: true,
      },
      {
        name: "Beatriz Nakamura",
        address: "Rua da Paz, 200 — Nova Descoberta",
        phone: "(81) 99122-4455",
        martialArt: "Karatê",
        planName: "Kids",
        paidThisMonth: false,
      },
    ],
  },
  {
    slug: "correio-galeria",
    name: "Unidade Correio Galeria",
    shortName: "Correio Galeria",
    address: "Rua do Sol, 155 — Loja 12, Correio Galeria — Santo Antônio",
    city: "Recife/PE",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Correio+Galeria,+Recife,+PE",
    phone: "(81) 3224-9088",
    summary:
      "Unidade no centro, dentro da Correio Galeria. Ideal para quem treina no intervalo do trabalho.",
    schedule: [
      { dayOfWeek: "Segunda", time: "12:00", martialArt: "Boxe", sortOrder: 1 },
      { dayOfWeek: "Segunda", time: "18:00", martialArt: "Jiu-Jitsu", sortOrder: 2 },
      { dayOfWeek: "Terça", time: "12:00", martialArt: "Muay Thai", sortOrder: 3 },
      { dayOfWeek: "Terça", time: "18:00", martialArt: "Karatê", sortOrder: 4 },
      { dayOfWeek: "Quarta", time: "12:00", martialArt: "Boxe", sortOrder: 5 },
      { dayOfWeek: "Quarta", time: "18:00", martialArt: "Jiu-Jitsu", sortOrder: 6 },
      { dayOfWeek: "Quinta", time: "12:00", martialArt: "Muay Thai", sortOrder: 7 },
      { dayOfWeek: "Quinta", time: "18:00", martialArt: "Taekwondo", sortOrder: 8 },
      { dayOfWeek: "Sexta", time: "12:00", martialArt: "Boxe", sortOrder: 9 },
      { dayOfWeek: "Sábado", time: "10:00", martialArt: "Treino livre", sortOrder: 10 },
    ],
    plans: [
      {
        name: "Mensal",
        priceCents: 17900,
        description: "Uma modalidade, horários de almoço e noite.",
      },
      {
        name: "Executivo",
        priceCents: 22900,
        description: "Acesso aos horários de 12h + uma modalidade à noite.",
      },
      {
        name: "All Access",
        priceCents: 28900,
        description: "Todas as artes desta unidade.",
      },
    ],
    attendant: {
      email: "correio@allfights.com.br",
      name: "Atendente Correio Galeria",
    },
    students: [
      {
        name: "Thiago Oliveira",
        address: "Av. Conde da Boa Vista, 900 — Boa Vista",
        phone: "(81) 99988-7766",
        martialArt: "Boxe",
        planName: "Executivo",
        paidThisMonth: false,
      },
      {
        name: "Helena Duarte",
        address: "Rua da Imperatriz, 50 — Santo Antônio",
        phone: "(81) 98877-6655",
        martialArt: "Taekwondo",
        planName: "Mensal",
        paidThisMonth: true,
      },
    ],
  },
] as const;

function currentYearMonth() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${now.getFullYear()}-${month}`;
}

async function main() {
  const passwordHash = await hash(DEMO_PASSWORD, 10);
  const yearMonth = currentYearMonth();

  await prisma.payment.deleteMany();
  await prisma.student.deleteMany();
  await prisma.scheduleSlot.deleteMany();
  await prisma.plan.deleteMany();
  await prisma.attendant.deleteMany();
  await prisma.event.deleteMany();
  await prisma.unit.deleteMany();

  for (const unitData of UNITS) {
    const unit = await prisma.unit.create({
      data: {
        slug: unitData.slug,
        name: unitData.name,
        shortName: unitData.shortName,
        address: unitData.address,
        city: unitData.city,
        mapsUrl: unitData.mapsUrl,
        phone: unitData.phone,
        summary: unitData.summary,
      },
    });

    await prisma.attendant.create({
      data: {
        email: unitData.attendant.email,
        name: unitData.attendant.name,
        passwordHash,
        unitId: unit.id,
      },
    });

    const planIds = new Map<string, string>();
    for (const plan of unitData.plans) {
      const created = await prisma.plan.create({
        data: {
          unitId: unit.id,
          name: plan.name,
          priceCents: plan.priceCents,
          description: plan.description,
        },
      });
      planIds.set(plan.name, created.id);
    }

    for (const slot of unitData.schedule) {
      await prisma.scheduleSlot.create({
        data: {
          unitId: unit.id,
          dayOfWeek: slot.dayOfWeek,
          time: slot.time,
          martialArt: slot.martialArt,
          sortOrder: slot.sortOrder,
        },
      });
    }

    for (const student of unitData.students) {
      const planId = planIds.get(student.planName);
      if (!planId) throw new Error(`Plano não encontrado: ${student.planName}`);

      const created = await prisma.student.create({
        data: {
          unitId: unit.id,
          planId,
          name: student.name,
          address: student.address,
          phone: student.phone,
          martialArt: student.martialArt,
        },
      });

      await prisma.payment.create({
        data: {
          studentId: created.id,
          yearMonth,
          paid: student.paidThisMonth,
          paidAt: student.paidThisMonth ? new Date() : null,
        },
      });
    }
  }

  console.log("Seed concluído.");
  console.log(`Senha demo dos atendentes: ${DEMO_PASSWORD}`);
  for (const unit of UNITS) {
    console.log(`  ${unit.shortName}: ${unit.attendant.email}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
