"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, History, Loader2, Plus } from "lucide-react";
import {
  formatBRLFromCents,
  formatYearMonthLabel,
} from "@/lib/format";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function StudentsLedger() {
  const {
    students,
    plans,
    martialArts,
    status,
    errorMessage,
    addStudent,
    setPaid,
    refresh,
  } = useStudents();
  const [open, setOpen] = useState(false);
  const [historyId, setHistoryId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [martialArt, setMartialArt] = useState("");
  const [planId, setPlanId] = useState("");
  const [paid, setPaidThisMonth] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const historyStudent = students.find((student) => student.id === historyId);

  function resetForm() {
    setName("");
    setAddress("");
    setPhone("");
    setMartialArt("");
    setPlanId("");
    setPaidThisMonth(false);
    setFormError(null);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);

    if (name.trim().length < 3) {
      setFormError("Informe o nome completo do aluno.");
      return;
    }
    if (address.trim().length < 5) {
      setFormError("Informe o endereço.");
      return;
    }
    if (phone.trim().length < 8) {
      setFormError("Informe um telefone válido.");
      return;
    }
    if (!martialArt) {
      setFormError("Escolha a arte marcial.");
      return;
    }
    if (!planId) {
      setFormError("Escolha o plano.");
      return;
    }

    setSaving(true);
    const result = await addStudent({
      name: name.trim(),
      address: address.trim(),
      phone: phone.trim(),
      martialArt,
      planId,
      paidThisMonth: paid,
    });
    setSaving(false);

    if (!result.ok) {
      setFormError(result.error);
      return;
    }

    resetForm();
    setOpen(false);
  }

  if (status === "loading") {
    return (
      <Card className="rounded-sm bg-card/80">
        <CardHeader>
          <CardTitle>Alunos</CardTitle>
          <CardDescription>Carregando matrículas da unidade…</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3 py-10 text-muted-foreground">
          <Loader2 className="size-4 animate-spin text-primary" />
          Buscando no banco.
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
          <Button variant="outline" size="sm" className="mt-3 min-h-11" onClick={refresh}>
            Tentar de novo
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <Card className="rounded-sm bg-card/80">
        <CardHeader className="border-b border-white/8">
          <div className="flex flex-col gap-4">
            <div>
              <CardTitle className="font-heading tracking-[0.14em] text-lg uppercase">
                Matrículas
              </CardTitle>
              <CardDescription>
                Nome, endereço, telefone, plano, arte e pagamento do mês — com
                histórico.
              </CardDescription>
            </div>
            <Button
              className="min-h-11 w-full sm:w-auto sm:self-start"
              onClick={() => setOpen(true)}
            >
              <Plus data-icon="inline-start" />
              Registrar aluno
            </Button>
            <Dialog
              open={open}
              onOpenChange={(next) => {
                setOpen(next);
                if (!next) resetForm();
              }}
            >
              <DialogContent className="max-h-[90vh] overflow-y-auto rounded-sm bg-background sm:max-w-md">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle className="font-heading tracking-[0.12em] uppercase">
                      Novo aluno
                    </DialogTitle>
                    <DialogDescription>
                      Cadastro simples desta unidade.
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
                        className="min-h-11"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="student-address">Endereço</Label>
                      <Input
                        id="student-address"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        placeholder="Rua, número, bairro"
                        className="min-h-11"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="student-phone">Telefone</Label>
                      <Input
                        id="student-phone"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="(81) 90000-0000"
                        inputMode="tel"
                        className="min-h-11"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="student-art">Arte marcial</Label>
                      <select
                        id="student-art"
                        value={martialArt}
                        onChange={(event) => setMartialArt(event.target.value)}
                        className="border-input bg-background min-h-11 w-full rounded-md border px-3 text-sm"
                      >
                        <option value="">Escolha a arte</option>
                        {martialArts.map((art) => (
                          <option key={art} value={art}>
                            {art}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="student-plan">Plano</Label>
                      <select
                        id="student-plan"
                        value={planId}
                        onChange={(event) => setPlanId(event.target.value)}
                        className="border-input bg-background min-h-11 w-full rounded-md border px-3 text-sm"
                      >
                        <option value="">Escolha o plano</option>
                        {plans.map((plan) => (
                          <option key={plan.id} value={plan.id}>
                            {plan.name} · {formatBRLFromCents(plan.priceCents)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <label className="flex min-h-11 items-center gap-3 text-sm">
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
                      className="min-h-11"
                      onClick={() => setOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" className="min-h-11" disabled={saving}>
                      {saving ? "Salvando…" : "Salvar matrícula"}
                    </Button>
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
                Registre o primeiro aluno desta unidade.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aluno</TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead>Arte / Plano</TableHead>
                      <TableHead>Este mês</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {student.address}
                          </p>
                        </TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell>
                          {student.martialArt}
                          <br />
                          <span className="text-muted-foreground">
                            {student.plan.name} ·{" "}
                            {formatBRLFromCents(student.plan.priceCents)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <label className="flex min-h-11 items-center gap-2 text-sm">
                            <Checkbox
                              checked={student.paidThisMonth}
                              onCheckedChange={(value) =>
                                void setPaid(student.id, value === true)
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
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            className="min-h-11"
                            onClick={() => setHistoryId(student.id)}
                          >
                            <History data-icon="inline-start" />
                            Histórico
                          </Button>
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
                        <p className="mt-1 text-sm text-muted-foreground">
                          {student.phone}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {student.address}
                        </p>
                        <p className="mt-2 text-sm">
                          {student.martialArt} · {student.plan.name} ·{" "}
                          {formatBRLFromCents(student.plan.priceCents)}
                        </p>
                      </div>
                      {student.paidThisMonth ? (
                        <Badge>Em dia</Badge>
                      ) : (
                        <Badge variant="destructive">Em débito</Badge>
                      )}
                    </div>
                    <label className="mt-4 flex min-h-11 items-center gap-3 text-sm">
                      <Checkbox
                        checked={student.paidThisMonth}
                        onCheckedChange={(value) =>
                          void setPaid(student.id, value === true)
                        }
                      />
                      Pagou este mês
                    </label>
                    <Button
                      variant="outline"
                      className="mt-3 min-h-11 w-full"
                      onClick={() => setHistoryId(student.id)}
                    >
                      <History data-icon="inline-start" />
                      Ver histórico de pagamentos
                    </Button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={Boolean(historyStudent)}
        onOpenChange={(next) => {
          if (!next) setHistoryId(null);
        }}
      >
        <DialogContent className="rounded-sm bg-background sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading tracking-[0.12em] uppercase">
              Histórico
            </DialogTitle>
            <DialogDescription>
              {historyStudent?.name} — meses registrados nesta unidade.
            </DialogDescription>
          </DialogHeader>
          {historyStudent ? (
            <ul className="mt-2 max-h-80 space-y-2 overflow-y-auto">
              {historyStudent.payments.length === 0 ? (
                <li className="border border-dashed border-white/15 px-4 py-8 text-center text-sm text-muted-foreground">
                  Nenhum mês registrado ainda.
                </li>
              ) : (
                historyStudent.payments.map((payment) => (
                  <li
                    key={payment.yearMonth}
                    className="flex items-center justify-between gap-3 border border-white/10 px-3 py-3"
                  >
                    <span>{formatYearMonthLabel(payment.yearMonth)}</span>
                    {payment.paid ? (
                      <Badge>Pago</Badge>
                    ) : (
                      <Badge variant="destructive">Em aberto</Badge>
                    )}
                  </li>
                ))
              )}
            </ul>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
