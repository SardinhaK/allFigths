"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { ACADEMY } from "@/lib/academy";
import { useSession } from "@/hooks/use-session";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const publicLinks = [
  { href: "/#artes", label: "Artes" },
  { href: "/#horarios", label: "Horários" },
  { href: "/#dojo", label: "O dojo" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, status, logout } = useSession();
  const onGestao = pathname.startsWith("/gestao");

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="font-jp text-xl leading-none text-primary">
            {ACADEMY.kanji}
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-lg tracking-[0.22em] text-foreground">
              {ACADEMY.name.toUpperCase()}
            </span>
            <span className="mt-1 text-[10px] tracking-[0.28em] text-muted-foreground uppercase">
              Caxangá · Recife · 道場
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          {status !== "loading" && isAuthenticated ? (
            <>
              <Link
                href="/gestao"
                className={
                  onGestao
                    ? "text-xs tracking-[0.18em] text-primary uppercase"
                    : "text-xs tracking-[0.18em] text-muted-foreground uppercase hover:text-foreground"
                }
              >
                Gestão
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Sair
              </Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">Acesso do gerente</Link>
            </Button>
          )}
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background">
            <SheetHeader>
              <SheetTitle className="font-heading tracking-[0.2em]">
                {ACADEMY.name.toUpperCase()}
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {publicLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className="py-2 text-sm tracking-[0.16em] text-muted-foreground uppercase"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
              <Separator className="my-3" />
              {status !== "loading" && isAuthenticated ? (
                <>
                  <SheetClose asChild>
                    <Link
                      href="/gestao"
                      className="py-2 text-sm tracking-[0.16em] uppercase"
                    >
                      Gestão
                    </Link>
                  </SheetClose>
                  <Button variant="outline" onClick={handleLogout}>
                    Sair
                  </Button>
                </>
              ) : (
                <SheetClose asChild>
                  <Button asChild>
                    <Link href="/login">Acesso do gerente</Link>
                  </Button>
                </SheetClose>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
