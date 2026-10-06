"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type PlanOption = {
  id: string;
  name: string;
  priceCents: number;
  description: string;
};

export type PaymentRecord = {
  yearMonth: string;
  paid: boolean;
  paidAt: string | null;
};

export type StudentRecord = {
  id: string;
  name: string;
  address: string;
  phone: string;
  martialArt: string;
  createdAt: string;
  plan: PlanOption;
  paidThisMonth: boolean;
  payments: PaymentRecord[];
};

export type StudentInput = {
  name: string;
  address: string;
  phone: string;
  martialArt: string;
  planId: string;
  paidThisMonth?: boolean;
};

type ActionResult = { ok: true } | { ok: false; error: string };

type StudentsContextValue = {
  students: StudentRecord[];
  plans: PlanOption[];
  martialArts: string[];
  yearMonth: string;
  unitName: string;
  status: "loading" | "ready" | "error";
  errorMessage: string | null;
  refresh: () => Promise<void>;
  addStudent: (input: StudentInput) => Promise<ActionResult>;
  updateStudent: (id: string, input: StudentInput) => Promise<ActionResult>;
  deleteStudent: (id: string) => Promise<ActionResult>;
  setPaid: (
    id: string,
    paid: boolean,
    yearMonth?: string
  ) => Promise<ActionResult>;
};

const StudentsContext = createContext<StudentsContextValue | null>(null);

function sortStudents(list: StudentRecord[]) {
  return [...list].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}

export function StudentsProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [plans, setPlans] = useState<PlanOption[]>([]);
  const [martialArts, setMartialArts] = useState<string[]>([]);
  const [yearMonth, setYearMonth] = useState("");
  const [unitName, setUnitName] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setStatus("loading");
    setErrorMessage(null);
    try {
      const response = await fetch("/api/students", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Falha ao carregar alunos da unidade.");
      }
      const data = (await response.json()) as {
        students: StudentRecord[];
        plans: PlanOption[];
        martialArts: string[];
        yearMonth: string;
        unit: { name: string };
      };
      setStudents(data.students);
      setPlans(data.plans);
      setMartialArts(data.martialArts);
      setYearMonth(data.yearMonth);
      setUnitName(data.unit.name);
      setStatus("ready");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar os alunos."
      );
    }
  }, []);

  useEffect(() => {
    // Carrega alunos da unidade autenticada no mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch inicial da unidade
    void refresh();
  }, [refresh]);

  const addStudent = useCallback(async (input: StudentInput) => {
    const response = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = (await response.json()) as {
      student?: StudentRecord;
      error?: string;
    };
    if (!response.ok || !data.student) {
      return { ok: false as const, error: data.error ?? "Falha ao cadastrar." };
    }
    setStudents((current) => sortStudents([...current, data.student!]));
    return { ok: true as const };
  }, []);

  const updateStudent = useCallback(async (id: string, input: StudentInput) => {
    const response = await fetch(`/api/students/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = (await response.json()) as {
      student?: StudentRecord;
      error?: string;
    };
    if (!response.ok || !data.student) {
      return { ok: false as const, error: data.error ?? "Falha ao atualizar." };
    }
    setStudents((current) =>
      sortStudents(
        current.map((student) => (student.id === id ? data.student! : student))
      )
    );
    return { ok: true as const };
  }, []);

  const deleteStudent = useCallback(async (id: string) => {
    const response = await fetch(`/api/students/${id}`, { method: "DELETE" });
    const data = (await response.json()) as { ok?: boolean; error?: string };
    if (!response.ok || !data.ok) {
      return { ok: false as const, error: data.error ?? "Falha ao excluir." };
    }
    setStudents((current) => current.filter((student) => student.id !== id));
    return { ok: true as const };
  }, []);

  const setPaid = useCallback(
    async (id: string, paid: boolean, targetMonth?: string) => {
      const response = await fetch(`/api/students/${id}/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paid, yearMonth: targetMonth }),
      });
      const data = (await response.json()) as {
        payment?: PaymentRecord;
        error?: string;
      };
      if (!response.ok || !data.payment) {
        return {
          ok: false as const,
          error: data.error ?? "Falha ao atualizar pagamento.",
        };
      }

      setStudents((current) =>
        current.map((student) => {
          if (student.id !== id) return student;
          const payments = [...student.payments];
          const index = payments.findIndex(
            (payment) => payment.yearMonth === data.payment!.yearMonth
          );
          if (index >= 0) {
            payments[index] = data.payment!;
          } else {
            payments.unshift(data.payment!);
          }
          const paidThisMonth =
            data.payment!.yearMonth === yearMonth
              ? data.payment!.paid
              : student.paidThisMonth;
          return { ...student, payments, paidThisMonth };
        })
      );
      return { ok: true as const };
    },
    [yearMonth]
  );

  const value = useMemo(
    () => ({
      students,
      plans,
      martialArts,
      yearMonth,
      unitName,
      status,
      errorMessage,
      refresh,
      addStudent,
      updateStudent,
      deleteStudent,
      setPaid,
    }),
    [
      students,
      plans,
      martialArts,
      yearMonth,
      unitName,
      status,
      errorMessage,
      refresh,
      addStudent,
      updateStudent,
      deleteStudent,
      setPaid,
    ]
  );

  return (
    <StudentsContext.Provider value={value}>{children}</StudentsContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentsContext);
  if (!context) {
    throw new Error("useStudents precisa estar dentro de StudentsProvider");
  }
  return context;
}
