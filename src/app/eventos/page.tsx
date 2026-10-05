import Link from "next/link";
import { getPublishedEvents } from "@/lib/content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const dynamic = "force-dynamic";

export default async function EventosPage() {
  const events = await getPublishedEvents();

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-[11px] tracking-[0.32em] text-primary uppercase">
          Agenda
        </p>
        <h1 className="mt-3 font-heading text-4xl tracking-[0.16em] uppercase sm:text-5xl">
          Eventos
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Campeonatos, seminários e aberturas de turma. Role a página e veja cada
          poster conforme forem publicados.
        </p>

        {events.length === 0 ? (
          <div className="mt-12 border border-dashed border-white/20 px-6 py-16 text-center">
            <p className="font-heading text-xl tracking-[0.14em] uppercase">
              Em breve
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Ainda não há eventos publicados. A estrutura já está pronta — os
              posters entram aqui assim que forem adicionados.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex min-h-11 items-center text-sm tracking-[0.14em] text-primary uppercase hover:underline"
            >
              Voltar à academia
            </Link>
          </div>
        ) : (
          <ul className="mt-12 grid gap-8">
            {events.map((event) => (
              <li
                key={event.id}
                className="overflow-hidden border border-white/10 bg-card/60"
              >
                {event.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="aspect-[16/10] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[16/10] items-end bg-[linear-gradient(135deg,oklch(0.22_0.04_25),oklch(0.14_0.02_25))] p-6">
                    <p className="font-heading text-2xl tracking-[0.12em] uppercase">
                      {event.title}
                    </p>
                  </div>
                )}
                <div className="p-6">
                  <p className="text-xs tracking-[0.18em] text-primary uppercase">
                    {new Date(event.startsAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h2 className="mt-2 font-heading text-2xl tracking-[0.1em] uppercase">
                    {event.title}
                  </h2>
                  <p className="mt-3 text-muted-foreground">{event.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
