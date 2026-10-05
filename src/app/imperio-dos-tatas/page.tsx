import Link from "next/link";
import { STORE } from "@/lib/academy";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ImperioDosTatasPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(160,40,40,0.22),transparent_45%),linear-gradient(180deg,oklch(0.15_0.02_25),oklch(0.12_0.015_25))]"
          />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <p className="text-[11px] tracking-[0.32em] text-primary uppercase">
              Loja parceira
            </p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl tracking-[0.12em] uppercase sm:text-6xl">
              {STORE.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              {STORE.tagline}
            </p>
            <p className="mt-4 max-w-2xl text-muted-foreground">{STORE.summary}</p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link
                  href={STORE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Como chegar
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl tracking-[0.14em] uppercase">
              O que você encontra
            </h2>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li>Tatames e placas para montagem de dojo</li>
              <li>Kimonos, faixas e luvas</li>
              <li>Protetores e equipamentos de impacto</li>
              <li>Atendimento alinhado às turmas AllFights</li>
            </ul>
          </div>
          <address className="not-italic border border-white/10 bg-card/70 p-6">
            <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
              Endereço e horário
            </p>
            <p className="mt-4 font-heading text-xl tracking-[0.08em]">
              {STORE.address}
            </p>
            <Separator className="my-5" />
            <dl className="grid gap-3 text-sm">
              {STORE.hours.map((item) => (
                <div key={item.days}>
                  <dt className="tracking-[0.14em] text-muted-foreground uppercase">
                    {item.days}
                  </dt>
                  <dd className="mt-1">{item.time}</dd>
                </div>
              ))}
            </dl>
            <Separator className="my-5" />
            <p>
              <a className="hover:text-primary" href={`tel:${STORE.phone}`}>
                {STORE.phone}
              </a>
            </p>
            <p className="mt-1">
              <a className="hover:text-primary" href={`mailto:${STORE.email}`}>
                {STORE.email}
              </a>
            </p>
            <p className="mt-6">
              <Link
                href={STORE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center border border-primary/50 px-4 text-sm tracking-[0.14em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Abrir no Google Maps
              </Link>
            </p>
          </address>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
