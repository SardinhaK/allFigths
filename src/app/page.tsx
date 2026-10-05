import {
  ACADEMY,
  ART_DETAILS,
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
                Academia · Caxangá · Recife
              </p>
              <h1 className="mt-5 font-heading text-5xl tracking-[0.18em] text-foreground sm:text-7xl">
                ALL FIGHTS
              </h1>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                O tatame onde você descobre sua melhor versão. Condicionamento,
                defesa pessoal e formação de campeões — com a maior variedade de
                modalidades da região.
              </p>
              <p className="mt-3 font-jp text-primary">{ACADEMY.motto}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a
                    href={ACADEMY.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Falar no WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#artes">Ver as artes</a>
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
                  <dd>Seg–sex 06:00–22:00 · sáb/dom 08:00–14:00</dd>
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
              01 — Modalidades
            </p>
            <h2 className="mt-3 font-heading text-3xl tracking-[0.16em] uppercase sm:text-4xl">
              Artes que ensinamos
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Boxe, Muay Thai, MMA, Jiu-Jitsu, Kickboxing, Taekwondo, Karatê e
              Judô — com turmas kids e teens. Ambiente familiar e coaching
              profissional.
            </p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              02 — Funcionamento
            </p>
            <h2 className="mt-3 font-heading text-3xl tracking-[0.16em] uppercase sm:text-4xl">
              Horários
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Portas abertas o dia inteiro durante a semana. Confirme a grade
              das aulas pelo Instagram ou WhatsApp.
            </p>
            <dl className="mt-8 grid gap-3 sm:grid-cols-2">
              {ACADEMY.hours.map((item) => (
                <div key={item.days} className="border border-white/10 p-4">
                  <dt className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    {item.days}
                  </dt>
                  <dd className="mt-2 font-heading text-lg">{item.time}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="outline">
                <a
                  href={ACADEMY.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  @{ACADEMY.instagramHandle}
                </a>
              </Button>
              <Button asChild>
                <a
                  href={ACADEMY.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Grade e matrícula no WhatsApp
                </a>
              </Button>
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
                A All Fights Caxangá fica na Rua Pedro Ernesto, no coração do
                bairro. Estrutura com área infantil, vestiários, chuveiros,
                armários, estacionamento e Wi-Fi — pensada para treinar em
                família e com seriedade.
              </p>
              <p className="mt-4 text-muted-foreground">
                Desafie seus limites. Venha ser All Fights. Matrículas e
                mensalidades são acompanhadas pela área do gerente; a grade e
                as novidades saem primeiro no Instagram.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2 text-xs tracking-[0.14em] text-muted-foreground uppercase">
                {ACADEMY.amenities.map((item) => (
                  <li
                    key={item}
                    className="border border-white/10 px-3 py-1.5"
                  >
                    {item}
                  </li>
                ))}
              </ul>
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
                <a
                  className="hover:text-primary"
                  href={`tel:${ACADEMY.phoneE164}`}
                >
                  {ACADEMY.phone}
                </a>
                <span className="text-muted-foreground"> · WhatsApp</span>
              </p>
              <p className="mt-2">
                <a
                  className="hover:text-primary"
                  href={ACADEMY.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  @{ACADEMY.instagramHandle}
                </a>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Marca: @{ACADEMY.brandInstagramHandle}
              </p>
            </address>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
