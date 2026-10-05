import { MARTIAL_ARTS, type MartialArt } from "@/lib/academy";

export const STUDENTS_STORAGE_KEY = "allfights.students";
export const SESSION_STORAGE_KEY = "allfights.session";

export type ManagerSession = {
  email: string;
  loggedInAt: string;
};

export type Student = {
  id: string;
  name: string;
  martialArt: MartialArt;
  monthlyFee: number;
  paidThisMonth: boolean;
  createdAt: string;
};

export const SEED_STUDENTS: Student[] = [
  {
    id: "stu_marina",
    name: "Marina Costa",
    martialArt: "Jiu-Jitsu",
    monthlyFee: 240,
    paidThisMonth: true,
    createdAt: "2024-02-11T10:00:00.000Z",
  },
  {
    id: "stu_rafael",
    name: "Rafael Mendes",
    martialArt: "Muay Thai",
    monthlyFee: 210,
    paidThisMonth: false,
    createdAt: "2024-05-03T10:00:00.000Z",
  },
  {
    id: "stu_lucas",
    name: "Lucas Azevedo",
    martialArt: "Judô",
    monthlyFee: 190,
    paidThisMonth: true,
    createdAt: "2023-11-20T10:00:00.000Z",
  },
  {
    id: "stu_beatriz",
    name: "Beatriz Nakamura",
    martialArt: "Karatê",
    monthlyFee: 200,
    paidThisMonth: false,
    createdAt: "2025-01-14T10:00:00.000Z",
  },
  {
    id: "stu_thiago",
    name: "Thiago Oliveira",
    martialArt: "Boxe",
    monthlyFee: 220,
    paidThisMonth: false,
    createdAt: "2024-08-22T10:00:00.000Z",
  },
  {
    id: "stu_helena",
    name: "Helena Duarte",
    martialArt: "Taekwondo",
    monthlyFee: 180,
    paidThisMonth: true,
    createdAt: "2025-03-08T10:00:00.000Z",
  },
];

export function isMartialArt(value: string): value is MartialArt {
  return (MARTIAL_ARTS as readonly string[]).includes(value);
}

export function isStudent(value: unknown): value is Student {
  if (!value || typeof value !== "object") return false;
  const student = value as Partial<Student>;
  return (
    typeof student.id === "string" &&
    typeof student.name === "string" &&
    typeof student.martialArt === "string" &&
    isMartialArt(student.martialArt) &&
    typeof student.monthlyFee === "number" &&
    Number.isFinite(student.monthlyFee) &&
    typeof student.paidThisMonth === "boolean" &&
    typeof student.createdAt === "string"
  );
}

export function parseStudents(raw: string): Student[] {
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed) || !parsed.every(isStudent)) {
    throw new Error("Formato inválido");
  }
  return parsed;
}

export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function currentMonthLabel(): string {
  const label = new Date().toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
  return label.charAt(0).toUpperCase() + label.slice(1);
}
