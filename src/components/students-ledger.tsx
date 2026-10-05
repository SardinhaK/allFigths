"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, Loader2, Plus } from "lucide-react";
import { MARTIAL_ARTS } from "@/lib/academy";
import { formatBRL } from "@/lib/students";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function StudentsLedger() {
  const { students, status, errorMessage, addStudent, setPaid, restoreDemo } =
    useStudents();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [martialArt, setMartialArt] = useState("");
  const [fee, setFee] = useState("220");
  const [paid, setPaidThisMonth] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function resetForm() {
    setName("");
    setMartialArt("");
    setFee("220");
    setPaidThisMonth(false);
    setFormError(null);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = name.trim();
    const monthlyFee = Number(fee.replace(",", "."));

    if (trimmed.length < 3) {
      setFormError("Informe o nome completo do aluno.");
      return;
    }
    if (!martialArt) {
      setFormError("Escolha a arte marcial.");
      return;
    }
    if (!Number.isFinite(monthlyFee) || monthlyFee <= 0) {
      setFormError("A mensalidade precisa ser maior que zero.");
      return;
    }

    addStudent({
      name: trimmed,
      martialArt: martialArt as (typeof MARTIAL_ARTS)[number],
      monthlyFee,
      paidThisMonth: paid,
    });
    resetForm();
    setOpen(false);
  }

  if (status === "loading") {
    return (
      <Card className="rounded-sm bg-card/80">
        <CardHeader>
          <CardTitle>Alunos</CardTitle>
          <CardDescription>Carregando o livro de matrículas…</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3 py-10 text-muted-foreground">
          <Loader2 className="size-4 animate-spin text-primary" />
          Abrindo registros locais.
        </CardContent>
      </Card>
    );
  }

  if (status === "error") {
    return (
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>Falha ao ler os alunos</AlertTitle>
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
    <Card className="rounded-sm bg-card/80">
      <CardHeader className="border-b border-white/8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="font-heading tracking-[0.14em] text-lg uppercase">
              Matrículas
            </CardTitle>
            <CardDescription>
              Cadastro local dos alunos do dojo. Os dados ficam neste navegador.
            </CardDescription>
          </div>
          <Dialog
            open={open}
            onOpenChange={(next) => {
              setOpen(next);
              if (!next) resetForm();
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus data-icon="inline-start" />
                Registrar aluno
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-sm bg-background sm:max-w-md">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle className="font-heading tracking-[0.12em] uppercase">
                    Novo aluno
                  </DialogTitle>
                  <DialogDescription>
                    Nome, arte que treina, mensalidade e situação deste mês.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 grid gap-4">
                  {formError ? (
                    <Alert variant="destructive">
                      <AlertCircle />
                      <AlertTitle>Revise o cadastro</AlertTitle>
                      <AlertDescription>{formError}</AlertDescription>
                    </Alert>
                  ) : null}
                  <div className="grid gap-2">
                    <Label htmlFor="student-name">Nome</Label>
                    <Input
                      id="student-name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Nome completo"
                      autoComplete="name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="student-art">Arte marcial</Label>
                    <Select value={martialArt} onValueChange={setMartialArt}>
                      <SelectTrigger id="student-art" className="w-full">
                        <SelectValue placeholder="Escolha a arte" />
                      </SelectTrigger>
                      <SelectContent>
                        {MARTIAL_ARTS.map((art) => (
                          <SelectItem key={art} value={art}>
                            {art}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="student-fee">Mensalidade (R$)</Label>
                    <Input
                      id="student-fee"
                      type="number"
                      min={1}
                      step={10}
                      value={fee}
                      onChange={(event) => setFee(event.target.value)}
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={paid}
                      onCheckedChange={(value) =>
                        setPaidThisMonth(value === true)
                      }
                    />
                    Pagou a mensalidade deste mês
                  </label>
                </div>
                <DialogFooter className="mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">Salvar matrícula</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {students.length === 0 ? (
          <div className="border border-dashed border-white/15 px-4 py-12 text-center">
            <p className="font-heading tracking-[0.16em] uppercase">
              Nenhum aluno matriculado
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              O livro está vazio. Registre o primeiro aluno para acompanhar
              treino e mensalidade.
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
                    <TableHead>Mensalidade</TableHead>
                    <TableHead>Este mês</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.martialArt}</TableCell>
                      <TableCell>{formatBRL(student.monthlyFee)}</TableCell>
                      <TableCell>
                        <label className="flex items-center gap-2 text-sm">
                          <Checkbox
                            checked={student.paidThisMonth}
                            onCheckedChange={(value) =>
                              setPaid(student.id, value === true)
                            }
                            aria-label={`Marcar pagamento de ${student.name}`}
                          />
                          {student.paidThisMonth ? (
                            <Badge>Em dia</Badge>
                          ) : (
                            <Badge variant="destructive">Em débito</Badge>
                          )}
                        </label>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <ul className="grid gap-3 md:hidden">
              {students.map((student) => (
                <li
                  key={student.id}
                  className="border border-white/10 bg-background/40 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {student.martialArt} · {formatBRL(student.monthlyFee)}
                      </p>
                    </div>
                    {student.paidThisMonth ? (
                      <Badge>Em dia</Badge>
                    ) : (
                      <Badge variant="destructive">Em débito</Badge>
                    )}
                  </div>
                  <label className="mt-4 flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={student.paidThisMonth}
                      onCheckedChange={(value) =>
                        setPaid(student.id, value === true)
                      }
                    />
                    Pagou este mês
                  </label>
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
}
