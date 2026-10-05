"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { MartialArt } from "@/lib/academy";
import { useHydrated } from "@/hooks/use-hydrated";
import {
  parseStudents,
  SEED_STUDENTS,
  STUDENTS_STORAGE_KEY,
  type Student,
} from "@/lib/students";

const CORRUPT = "__corrupt__";
const listeners = new Set<() => void>();

type StudentsStatus = "loading" | "ready" | "error";

type NewStudent = {
  name: string;
  martialArt: MartialArt;
  monthlyFee: number;
  paidThisMonth: boolean;
};

type StudentsContextValue = {
  students: Student[];
  status: StudentsStatus;
  errorMessage: string | null;
  addStudent: (input: NewStudent) => void;
  setPaid: (id: string, paid: boolean) => void;
  restoreDemo: () => void;
};

const StudentsContext = createContext<StudentsContextValue | null>(null);

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STUDENTS_STORAGE_KEY || event.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  try {
    const raw = localStorage.getItem(STUDENTS_STORAGE_KEY);
    if (raw === null) {
      const seeded = JSON.stringify(SEED_STUDENTS);
      localStorage.setItem(STUDENTS_STORAGE_KEY, seeded);
      return seeded;
    }
    return raw;
  } catch {
    return CORRUPT;
  }
}

function getServerSnapshot() {
  return null;
}

function persist(students: Student[]) {
  localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(students));
  emit();
}

export function StudentsProvider({ children }: { children: ReactNode }) {
  const hydrated = useHydrated();
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const parsed = useMemo(() => {
    if (!hydrated || raw === null) {
      return {
        students: [] as Student[],
        status: "loading" as const,
        errorMessage: null as string | null,
      };
    }
    if (raw === CORRUPT) {
      return {
        students: [] as Student[],
        status: "error" as const,
        errorMessage:
          "Não foi possível ler a lista de alunos salva neste navegador.",
      };
    }
    try {
      return {
        students: parseStudents(raw),
        status: "ready" as const,
        errorMessage: null as string | null,
      };
    } catch {
      return {
        students: [] as Student[],
        status: "error" as const,
        errorMessage:
          "Não foi possível ler a lista de alunos salva neste navegador.",
      };
    }
  }, [hydrated, raw]);

  const addStudent = useCallback(
    (input: NewStudent) => {
      const next: Student = {
        id:
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `stu_${Date.now()}`,
        name: input.name.trim(),
        martialArt: input.martialArt,
        monthlyFee: input.monthlyFee,
        paidThisMonth: input.paidThisMonth,
        createdAt: new Date().toISOString(),
      };
      persist([next, ...parsed.students]);
    },
    [parsed.students]
  );

  const setPaid = useCallback(
    (id: string, paid: boolean) => {
      persist(
        parsed.students.map((student) =>
          student.id === id ? { ...student, paidThisMonth: paid } : student
        )
      );
    },
    [parsed.students]
  );

  const restoreDemo = useCallback(() => {
    persist(SEED_STUDENTS);
  }, []);

  const value = useMemo(
    () => ({
      students: parsed.students,
      status: parsed.status,
      errorMessage: parsed.errorMessage,
      addStudent,
      setPaid,
      restoreDemo,
    }),
    [parsed, addStudent, setPaid, restoreDemo]
  );

  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentsContext);
  if (!context) {
    throw new Error("useStudents precisa estar dentro de StudentsProvider");
  }
  return context;
}
