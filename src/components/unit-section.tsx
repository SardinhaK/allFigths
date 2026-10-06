import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type UnitSectionData = {
  slug: string;
  name: string;
  shortName: string;
  address: string;
  city: string;
  mapsUrl: string;
  phone: string;
  summary: string;
  schedules: {
    id: string;
    dayOfWeek: string;
    time: string;
    martialArt: string;
  }[];
};

const DAY_ORDER = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
] as const;

function buildWeeklyGrid(
  schedules: UnitSectionData["schedules"]
): { days: string[]; times: string[]; cells: Record<string, string> } {
  const daySet = new Set(schedules.map((slot) => slot.dayOfWeek));
  const days = DAY_ORDER.filter((day) => daySet.has(day));
  // Inclui dias fora da ordem padrão, se existirem.
  for (const day of daySet) {
    if (!days.includes(day)) days.push(day);
  }

  const times = Array.from(new Set(schedules.map((slot) => slot.time))).sort(
    (a, b) => a.localeCompare(b, "pt-BR", { numeric: true })
  );

  const cells: Record<string, string> = {};
  for (const slot of schedules) {
    cells[`${slot.dayOfWeek}|${slot.time}`] = slot.martialArt;
  }

  return { days, times, cells };
}

export function UnitSection({
  unit,
  index,
}: {
  unit: UnitSectionData;
  index: number;
}) {
  const { days, times, cells } = buildWeeklyGrid(unit.schedules);

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

        <div className="mt-10">
          <h3 className="font-heading text-lg tracking-[0.14em] uppercase">
            Horários da semana
          </h3>
          <div className="mt-4 overflow-x-auto border border-white/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky left-0 z-10 min-w-20 bg-card">
                    Horário
                  </TableHead>
                  {days.map((day) => (
                    <TableHead key={day} className="min-w-28 text-center">
                      {day}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {times.map((time) => (
                  <TableRow key={time}>
                    <TableCell className="sticky left-0 z-10 bg-card font-mono text-primary">
                      {time}
                    </TableCell>
                    {days.map((day) => {
                      const art = cells[`${day}|${time}`];
                      return (
                        <TableCell
                          key={`${day}-${time}`}
                          className="text-center text-sm"
                        >
                          {art ?? (
                            <span className="text-muted-foreground/40">—</span>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
