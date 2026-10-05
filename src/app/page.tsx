import Link from "next/link";
import {
  ACADEMY,
  ART_DETAILS,
  WEEKLY_SCHEDULE,
} from "@/lib/academy";
import { DojoStamp } from "@/components/dojo-stamp";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 right-6 hidden font-jp text-[18rem] leading-none text-primary/10 select-none md:block">
            {ACADEMY.kanji}
          </div>
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
            <div>
              <p className="text-[11px] tracking-[0.38em] text-primary uppercase">
                Academia · Vila Madalena · {ACADEMY.foundedYear}
              </p>
              <h1 className="mt-5 font-heading text-5xl tracking-[0.18em] text-foreground sm:text-7xl">
                ALLFIGHTS
              </h1>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                Dojo sério para quem trata o treino como ofício. Jiu-Jitsu, Muay
                Thai, Karatê, Judô, Boxe e Taekwondo — no mesmo tatame, com a
                mesma exigência.
              </p>
              <p className="mt-3 font-jp text-primary">{ACADEMY.motto}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href="#artes">Ver as artes</a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/login">Área do gerente</Link>
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-start justify-end gap-6 lg:items-end">
              <DojoStamp size="lg" />
              <dl className="grid gap-3 text-sm">
                <div>
                  <dt className="tracking-[0.16em] text-muted-foreground uppercase">
                    Horário
                  </dt>
                  <dd>Seg–sex 06:00–22:00</dd>
                </div>
                <div>
                  <dt className="tracking-[0.16em] text-muted-foreground uppercase">
                    Endereço
                  </dt>
                  <dd>
                    {ACADEMY.addressLine}
                    <br />
                    {ACADEMY.addressRest}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <Separator />

        <section id="artes" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <p className="text-[11px] tracking-[0.32em] text-primary uppercase">
              01 — Caminhos
            </p>
            <h2 className="mt-3 font-heading text-3xl tracking-[0.16em] uppercase sm:text-4xl">
              Artes que ensinamos
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Seis disciplinas, uma casa. Cada aula começa em silêncio e termina
              com o mesmo padrão: técnica, respeito, repetição.
            </p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ART_DETAILS.map((art) => (
                <li
                  key={art.name}
                  className="border border-white/10 bg-card/70 p-5"
                >
                  <p className="font-jp text-primary">{art.japanese}</p>
                  <h3 className="mt-2 font-heading text-xl tracking-[0.12em] uppercase">
                    {art.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {art.summary}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="horarios" className="scroll-mt-20 border-y border-white/10 bg-black/20">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <p className="text-[11px] tracking-[0.32em] text-primary uppercase">
              02 — Grade
            </p>
            <h2 className="mt-3 font-heading text-3xl tracking-[0.16em] uppercase sm:text-4xl">
              Horários
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Portas abertas o dia inteiro. Chegue quinze minutos antes: o tatame
              não espera.
            </p>
            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              {ACADEMY.hours.map((item) => (
                <div key={item.days} className="border border-white/10 p-4">
                  <dt className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    {item.days}
                  </dt>
                  <dd className="mt-2 font-heading text-lg">{item.time}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {WEEKLY_SCHEDULE.map((block) => (
                <div key={block.days} className="border border-white/10 p-5">
                  <h3 className="font-heading tracking-[0.12em] uppercase">
                    {block.days}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm">
                    {block.slots.map((slot) => (
                      <li
                        key={`${block.days}-${slot.time}`}
                        className="flex items-baseline justify-between gap-4 border-b border-white/8 py-2 last:border-0"
                      >
                        <span className="font-mono text-primary">{slot.time}</span>
                        <span>{slot.art}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="dojo" className="scroll-mt-20">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
            <div>
              <p className="text-[11px] tracking-[0.32em] text-primary uppercase">
                03 — Casa
              </p>
              <h2 className="mt-3 font-heading text-3xl tracking-[0.16em] uppercase sm:text-4xl">
                O dojo
              </h2>
              <p className="mt-4 text-muted-foreground">
                A AllFights ocupa um sobrado na Rua Harmonia, em Vila Madalena.
                Tatame no piso superior, saco e ringue no térreo, vestiários
                separados. Sem vitrine de academia. Quem entra, treina.
              </p>
              <p className="mt-4 text-muted-foreground">
                Visitantes assistem a uma aula antes de matricular. Mensalidades
                são cobradas no mês vigente; o gerente registra cada aluno e o
                financeiro do dojo.
              </p>
            </div>
            <address className="not-italic border border-white/10 bg-card/70 p-6">
              <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
                Local e contato
              </p>
              <p className="mt-4 font-heading text-xl tracking-[0.08em]">
                {ACADEMY.addressLine}
              </p>
              <p className="mt-1 text-muted-foreground">{ACADEMY.addressRest}</p>
              <p className="text-muted-foreground">CEP {ACADEMY.postalCode}</p>
              <Separator className="my-5" />
              <p>
                <a className="hover:text-primary" href={`tel:+551138142090`}>
                  {ACADEMY.phone}
                </a>
              </p>
              <p className="mt-1">
                <a
                  className="hover:text-primary"
                  href={`mailto:${ACADEMY.email}`}
                >
                  {ACADEMY.email}
                </a>
              </p>
            </address>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
