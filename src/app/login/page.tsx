"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { DEMO_ATTENDANTS, DEMO_PASSWORD } from "@/lib/academy";
import { useSession } from "@/hooks/use-session";
import { DojoStamp } from "@/components/dojo-stamp";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === "ready" && isAuthenticated) {
      router.replace("/gestao");
    }
  }, [isAuthenticated, router, status]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Informe e-mail e senha do atendente.");
      return;
    }

    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);

    if (!result.ok) {
      setError("Acesso negado. Confira as credenciais da sua unidade.");
      return;
    }

    router.push("/gestao");
  }

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
        <Card className="w-full max-w-md rounded-sm bg-card/85">
          <CardHeader className="items-center text-center">
            <DojoStamp size="sm" />
            <CardTitle className="mt-2 font-heading tracking-[0.2em] uppercase">
              Login do atendente
            </CardTitle>
            <CardDescription>
              Cada unidade tem seu acesso. Os alunos ficam no banco compartilhado.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              {error ? (
                <Alert variant="destructive">
                  <AlertCircle />
                  <AlertTitle>Não foi possível entrar</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="username"
                  inputMode="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="unidade@allfights.com.br"
                  className="min-h-11"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="min-h-11"
                />
              </div>
              <Button type="submit" disabled={submitting} size="lg" className="min-h-11">
                {submitting ? "Entrando…" : "Entrar"}
              </Button>
            </form>
            <div className="mt-6 border border-white/10 bg-black/20 p-3 text-xs text-muted-foreground">
              <p className="tracking-[0.16em] text-foreground uppercase">
                Demonstração
              </p>
              <p className="mt-2">Senha de todas as unidades: {DEMO_PASSWORD}</p>
              <ul className="mt-2 space-y-1">
                {DEMO_ATTENDANTS.map((item) => (
                  <li key={item.email}>
                    {item.unit}: {item.email}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Voltar à página da academia
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
