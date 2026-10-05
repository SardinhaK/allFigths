"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { currentMonthLabel } from "@/lib/students";
import { StudentsProvider } from "@/hooks/use-students";
import { useSession } from "@/hooks/use-session";
import { AccountingBoard } from "@/components/accounting-board";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StudentsLedger } from "@/components/students-ledger";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GestaoPage() {
  const router = useRouter();
  const { isAuthenticated, status } = useSession();

  useEffect(() => {
    if (status === "ready" && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router, status]);

  if (status === "loading" || !isAuthenticated) {
    return (
      <div className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center px-4 py-16">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin text-primary" />
            {status === "loading"
              ? "Lendo a sessão do gerente…"
              : "Redirecionando para o acesso…"}
          </p>
        </main>
      </div>
    );
  }

  return (
    <StudentsProvider>
      <div className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
          <p className="text-[11px] tracking-[0.32em] text-primary uppercase">
            Livro do dojo · {currentMonthLabel()}
          </p>
          <h1 className="mt-3 font-heading text-3xl tracking-[0.16em] uppercase sm:text-4xl">
            Gestão
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Matrículas e mensalidades ficam neste navegador. Nada é enviado a um
            servidor.
          </p>
          <Tabs defaultValue="alunos" className="mt-8">
            <TabsList variant="line" className="w-full max-w-md">
              <TabsTrigger value="alunos">Alunos</TabsTrigger>
              <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
            </TabsList>
            <TabsContent value="alunos" className="mt-6">
              <StudentsLedger />
            </TabsContent>
            <TabsContent value="financeiro" className="mt-6">
              <AccountingBoard />
            </TabsContent>
          </Tabs>
        </main>
        <SiteFooter />
      </div>
    </StudentsProvider>
  );
}
