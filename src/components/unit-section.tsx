import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatBRLFromCents } from "@/lib/format";

export type UnitSectionData = {
  slug: string;
  name: string;
  shortName: string;
  address: string;
  city: string;
  mapsUrl: string;
  phone: string;
  summary: string;
  plans: {
    id: string;
    name: string;
    priceCents: number;
    description: string;
  }[];
  schedules: {
    id: string;
    dayOfWeek: string;
    time: string;
    martialArt: string;
  }[];
};

export function UnitSection({
  unit,
  index,
}: {
  unit: UnitSectionData;
  index: number;
}) {
  return (
    <section
      id={unit.slug}
      className="scroll-mt-20 border-t border-white/10"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-[11px] tracking-[0.32em] text-primary uppercase">
          Unidade {String(index).padStart(2, "0")}
        </p>
        <h2 className="mt-3 font-heading text-3xl tracking-[0.14em] uppercase sm:text-4xl">
          {unit.shortName}
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">{unit.summary}</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-heading text-lg tracking-[0.14em] uppercase">
              Horários da semana
            </h3>
            <div className="mt-4 overflow-x-auto border border-white/10">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dia</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Arte</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unit.schedules.map((slot) => (
                    <TableRow key={slot.id}>
                      <TableCell>{slot.dayOfWeek}</TableCell>
                      <TableCell className="font-mono text-primary">
                        {slot.time}
                      </TableCell>
                      <TableCell>{slot.martialArt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg tracking-[0.14em] uppercase">
              Planos
            </h3>
            <div className="mt-4 overflow-x-auto border border-white/10">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plano</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Detalhe</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unit.plans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.name}</TableCell>
                      <TableCell>
                        {formatBRLFromCents(plan.priceCents)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {plan.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <div className="mt-10 border border-white/10 bg-black/20 p-6">
          <h3 className="font-heading text-lg tracking-[0.14em] uppercase">
            Como chegar
          </h3>
          <p className="mt-3 text-muted-foreground">
            {unit.address}
            <br />
            {unit.city}
          </p>
          <p className="mt-2">
            <a className="hover:text-primary" href={`tel:${unit.phone}`}>
              {unit.phone}
            </a>
          </p>
          <p className="mt-4">
            <Link
              href={unit.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center border border-primary/50 px-4 text-sm tracking-[0.14em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Abrir no Google Maps
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
