import Link from "next/link";
import { ACADEMY } from "@/lib/academy";
import { getUnitsWithDetails } from "@/lib/content";
import { DojoStamp } from "@/components/dojo-stamp";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { UnitSection } from "@/components/unit-section";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const units = await getUnitsWithDetails();

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(128,28,28,0.28),transparent_55%),linear-gradient(160deg,oklch(0.16_0.02_25),oklch(0.11_0.015_25)_55%,oklch(0.14_0.02_30))]"
          />
          <div className="pointer-events-none absolute inset-y-0 right-6 hidden font-jp text-[18rem] leading-none text-primary/10 select-none md:block">
            {ACADEMY.kanji}
          </div>
          <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
            <div>
              <p className="text-[11px] tracking-[0.38em] text-primary uppercase">
                Academia · Recife · {ACADEMY.foundedYear}
              </p>
              <h1 className="mt-5 font-heading text-5xl tracking-[0.18em] text-foreground sm:text-7xl">
                ALLFIGHTS
              </h1>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                {ACADEMY.history}
              </p>
              <p className="mt-3 font-jp text-primary">{ACADEMY.motto}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href="#caxanga">Ver unidades</a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/eventos">Eventos</Link>
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-start justify-end gap-6 lg:items-end">
              <DojoStamp size="lg" />
              <dl className="grid gap-3 text-sm">
                <div>
                  <dt className="tracking-[0.16em] text-muted-foreground uppercase">
                    Unidades
                  </dt>
                  <dd>Caxangá · Nova Descoberta · Correio Galeria</dd>
                </div>
                <div>
                  <dt className="tracking-[0.16em] text-muted-foreground uppercase">
                    Contato
                  </dt>
                  <dd>{ACADEMY.email}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {units.map((unit, index) => (
          <UnitSection key={unit.id} unit={unit} index={index + 1} />
        ))}
      </main>
      <SiteFooter />
    </div>
  );
}
