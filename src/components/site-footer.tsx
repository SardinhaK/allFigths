import { ACADEMY } from "@/lib/academy";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="font-heading tracking-[0.22em] text-foreground">
            {ACADEMY.name.toUpperCase()}
          </p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            {ACADEMY.legalName}. Três unidades em {ACADEMY.city}/{ACADEMY.state},
            desde {ACADEMY.foundedYear}.
          </p>
        </div>
        <p className="font-jp text-sm text-primary">{ACADEMY.motto}</p>
      </div>
    </footer>
  );
}
