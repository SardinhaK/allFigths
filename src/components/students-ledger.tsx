"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, History, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import {
  formatBRLFromCents,
  formatYearMonthLabel,
} from "@/lib/format";
import {
  useStudents,
  type StudentRecord,
} from "@/hooks/use-students";
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

type FormMode = "create" | "edit";

export function StudentsLedger() {
  const {
    students,
    plans,
    martialArts,
    status,
    errorMessage,
    addStudent,
    updateStudent,
    deleteStudent,
    setPaid,
    refresh,
  } = useStudents();

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("create");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [historyId, setHistoryId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<StudentRecord | null>(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [martialArt, setMartialArt] = useState("");
  const [planId, setPlanId] = useState("");
  const [paid, setPaidThisMonth] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const historyStudent = students.find((student) => student.id === historyId);

  function resetForm() {
    setName("");
    setAddress("");
    setPhone("");
    setMartialArt("");
    setPlanId("");
    setPaidThisMonth(false);
    setFormError(null);
    setEditingId(null);
    setFormMode("create");
  }

  function openCreate() {
    resetForm();
    setFormMode("create");
    setFormOpen(true);
  }

  function openEdit(student: StudentRecord) {
    setFormMode("edit");
    setEditingId(student.id);
    setName(student.name);
    setAddress(student.address);
    setPhone(student.phone);
    setMartialArt(student.martialArt);
    setPlanId(student.plan.id);
    setPaidThisMonth(student.paidThisMonth);
    setFormError(null);
    setFormOpen(true);
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
    const payload = {
      name: name.trim(),
      address: address.trim(),
      phone: phone.trim(),
      martialArt,
      planId,
      paidThisMonth: paid,
    };

    const result =
      formMode === "create"
        ? await addStudent(payload)
        : editingId
          ? await updateStudent(editingId, payload)
          : { ok: false as const, error: "Aluno inválido." };

    setSaving(false);

    if (!result.ok) {
      setFormError(result.error);
      return;
    }

    resetForm();
    setFormOpen(false);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError(null);
    const result = await deleteStudent(deleteTarget.id);
    setDeleting(false);
    if (!result.ok) {
      setDeleteError(result.error);
      return;
    }
    if (historyId === deleteTarget.id) setHistoryId(null);
    setDeleteTarget(null);
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
          <Button
            variant="outline"
            size="sm"
            className="mt-3 min-h-11"
            onClick={refresh}
          >
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
                CRUD completo: cadastrar, editar, excluir e acompanhar
                pagamentos.
              </CardDescription>
            </div>
            <Button
              className="min-h-11 w-full sm:w-auto sm:self-start"
              onClick={openCreate}
            >
              <Plus data-icon="inline-start" />
              Registrar aluno
            </Button>
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
                      <TableHead className="text-right">Ações</TableHead>
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
                          <div className="flex flex-wrap justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="min-h-11"
                              onClick={() => openEdit(student)}
                            >
                              <Pencil data-icon="inline-start" />
                              Editar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="min-h-11"
                              onClick={() => setHistoryId(student.id)}
                            >
                              <History data-icon="inline-start" />
                              Histórico
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="min-h-11"
                              onClick={() => setDeleteTarget(student)}
                            >
                              <Trash2 data-icon="inline-start" />
                              Excluir
                            </Button>
                          </div>
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
                    <div className="mt-3 grid gap-2">
                      <Button
                        variant="outline"
                        className="min-h-11 w-full"
                        onClick={() => openEdit(student)}
                      >
                        <Pencil data-icon="inline-start" />
                        Editar aluno
                      </Button>
                      <Button
                        variant="outline"
                        className="min-h-11 w-full"
                        onClick={() => setHistoryId(student.id)}
                      >
                        <History data-icon="inline-start" />
                        Histórico de pagamentos
                      </Button>
                      <Button
                        variant="destructive"
                        className="min-h-11 w-full"
                        onClick={() => setDeleteTarget(student)}
                      >
                        <Trash2 data-icon="inline-start" />
                        Excluir aluno
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={formOpen}
        onOpenChange={(next) => {
          setFormOpen(next);
          if (!next) resetForm();
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-sm bg-background sm:max-w-md">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="font-heading tracking-[0.12em] uppercase">
                {formMode === "create" ? "Novo aluno" : "Editar aluno"}
              </DialogTitle>
              <DialogDescription>
                {formMode === "create"
                  ? "Cadastro simples desta unidade."
                  : "Atualize os dados do aluno nesta unidade."}
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
              {formMode === "create" ? (
                <label className="flex min-h-11 items-center gap-3 text-sm">
                  <Checkbox
                    checked={paid}
                    onCheckedChange={(value) =>
                      setPaidThisMonth(value === true)
                    }
                  />
                  Pagou a mensalidade deste mês
                </label>
              ) : null}
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                className="min-h-11"
                onClick={() => setFormOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" className="min-h-11" disabled={saving}>
                {saving
                  ? "Salvando…"
                  : formMode === "create"
                    ? "Salvar matrícula"
                    : "Salvar alterações"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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

      <Dialog
        open={Boolean(deleteTarget)}
        onOpenChange={(next) => {
          if (!next) {
            setDeleteTarget(null);
            setDeleteError(null);
          }
        }}
      >
        <DialogContent className="rounded-sm bg-background sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading tracking-[0.12em] uppercase">
              Excluir aluno
            </DialogTitle>
            <DialogDescription>
              Remover {deleteTarget?.name}? O histórico de pagamentos também
              será apagado. Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          {deleteError ? (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle />
              <AlertTitle>Falha ao excluir</AlertTitle>
              <AlertDescription>{deleteError}</AlertDescription>
            </Alert>
          ) : null}
          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              className="min-h-11"
              onClick={() => setDeleteTarget(null)}
              disabled={deleting}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="min-h-11"
              onClick={() => void handleDelete()}
              disabled={deleting}
            >
              {deleting ? "Excluindo…" : "Excluir definitivamente"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
