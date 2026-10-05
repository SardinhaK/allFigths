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
            {ACADEMY.legalName}. Dojo em {ACADEMY.neighborhood}, {ACADEMY.city}/
            {ACADEMY.state}.
          </p>
          <p className="mt-2 text-sm">
            <a
              className="text-muted-foreground transition-colors hover:text-primary"
              href={ACADEMY.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              @{ACADEMY.instagramHandle}
            </a>
            <span className="text-muted-foreground"> · </span>
            <a
              className="text-muted-foreground transition-colors hover:text-primary"
              href={ACADEMY.whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              {ACADEMY.phone}
            </a>
          </p>
        </div>
        <p className="font-jp text-sm text-primary">{ACADEMY.motto}</p>
      </div>
    </footer>
  );
}
