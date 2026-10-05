"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { currentMonthLabel, formatBRL } from "@/lib/students";
import { useStudents } from "@/hooks/use-students";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function AccountingBoard() {
  const { students, status, errorMessage, restoreDemo } = useStudents();
  const month = currentMonthLabel();
  const debtors = students.filter((student) => !student.paidThisMonth);
  const missingTotal = debtors.reduce(
    (sum, student) => sum + student.monthlyFee,
    0
  );
  const receivedTotal = students
    .filter((student) => student.paidThisMonth)
    .reduce((sum, student) => sum + student.monthlyFee, 0);

  if (status === "loading") {
    return (
      <Card className="rounded-sm bg-card/80">
        <CardHeader>
          <CardTitle>Financeiro</CardTitle>
          <CardDescription>Calculando débitos do mês…</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3 py-10 text-muted-foreground">
          <Loader2 className="size-4 animate-spin text-primary" />
          Conferindo mensalidades salvas.
        </CardContent>
      </Card>
    );
  }

  if (status === "error") {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>Falha ao ler o financeiro</AlertTitle>
        <AlertDescription>
          {errorMessage}{" "}
          <Button variant="outline" size="sm" className="mt-3" onClick={restoreDemo}>
            Restaurar lista de demonstração
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <SummaryTile
          label="Em débito"
          value={String(debtors.length)}
          hint={`${students.length} matriculados`}
        />
        <SummaryTile
          label="Ainda falta"
          value={formatBRL(missingTotal)}
          hint={month}
          accent
        />
        <SummaryTile
          label="Já recebido"
          value={formatBRL(receivedTotal)}
          hint="Pagamentos deste mês"
        />
      </div>

      <Card className="rounded-sm bg-card/80">
        <CardHeader className="border-b border-white/8">
          <CardTitle className="font-heading tracking-[0.14em] text-lg uppercase">
            Quem está em débito
          </CardTitle>
          <CardDescription>
            Alunos que ainda não quitaram a mensalidade de {month}.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {students.length === 0 ? (
            <div className="border border-dashed border-white/15 px-4 py-12 text-center">
              <p className="font-heading tracking-[0.16em] uppercase">
                Sem matrículas
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Cadastre alunos para ver quem deve e o total em aberto.
              </p>
            </div>
          ) : debtors.length === 0 ? (
            <div className="border border-dashed border-primary/40 px-4 py-12 text-center">
              <p className="font-heading tracking-[0.16em] text-primary uppercase">
                Ninguém em débito
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Todas as mensalidades de {month} estão em dia.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aluno</TableHead>
                      <TableHead>Arte</TableHead>
                      <TableHead>Valor em aberto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {debtors.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">
                          {student.name}
                        </TableCell>
                        <TableCell>{student.martialArt}</TableCell>
                        <TableCell>{formatBRL(student.monthlyFee)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={2}>Total ainda em falta</TableCell>
                      <TableCell>{formatBRL(missingTotal)}</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
              <ul className="grid gap-3 md:hidden">
                {debtors.map((student) => (
                  <li
                    key={student.id}
                    className="flex items-center justify-between gap-3 border border-white/10 bg-background/40 p-4"
                  >
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {student.martialArt}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="destructive">Débito</Badge>
                      <p className="mt-2 text-sm">{formatBRL(student.monthlyFee)}</p>
                    </div>
                  </li>
                ))}
                <li className="flex items-center justify-between border border-primary/40 bg-primary/5 p-4">
                  <span className="text-sm tracking-[0.12em] uppercase">
                    Total em falta
                  </span>
                  <span className="font-medium text-primary">
                    {formatBRL(missingTotal)}
                  </span>
                </li>
              </ul>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryTile({
  label,
  value,
  hint,
  accent = false,
}: {
  label: string;
  value: string;
  hint: string;
  accent?: boolean;
}) {
  return (
    <Card className="rounded-sm bg-card/80">
      <CardHeader className="gap-1">
        <CardDescription className="tracking-[0.16em] uppercase">
          {label}
        </CardDescription>
        <CardTitle
          className={
            accent
              ? "font-heading text-2xl text-primary"
              : "font-heading text-2xl"
          }
        >
          {value}
        </CardTitle>
        <CardDescription>{hint}</CardDescription>
      </CardHeader>
    </Card>
  );
}
