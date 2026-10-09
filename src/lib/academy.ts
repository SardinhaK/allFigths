export const ACADEMY = {
  name: "AllFights",
  legalName: "AllFights Academia de Artes Marciais",
  kanji: "武",
  motto: "Disciplina antes do golpe.",
  foundedYear: 2014,
  city: "Recife",
  state: "PE",
  email: "contato@allfights.com.br",
  history:
    "A AllFights nasceu em 2014 com um tatame improviso e a ideia simples de treinar sério, sem vitrine. De lá para cá viramos três unidades em Recife — Caxangá, Nova Descoberta e Correio Galeria — mantendo a mesma regra: técnica, respeito e repetição.",
} as const;

export const MARTIAL_ARTS = [
  "Jiu-Jitsu",
  "Muay Thai",
  "Karatê",
  "Judô",
  "Boxe",
  "Taekwondo",
  "Karatê Kids",
  "Treino livre",
] as const;

export type MartialArt = (typeof MARTIAL_ARTS)[number];

export const STORE = {
  name: "Império dos Tatãs",
  tagline: "Tatames e equipamentos para quem leva o treino a sério.",
  summary:
    "O Império dos Tatãs é a loja parceira da AllFights. Tatames, kimono, luvas e proteção — do mesmo padrão que usamos nas três unidades.",
  address: "Av. Caxangá, 2450 — anexo da Unidade Caxangá — Recife/PE",
  phone: "(81) 3125-4411",
  email: "loja@imperiodostatas.com.br",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Av.+Caxangá,+2450,+Recife,+PE",
  hours: [
    { days: "Segunda a sexta", time: "09:00 – 19:00" },
    { days: "Sábado", time: "09:00 – 14:00" },
  ],
} as const;

export const DEMO_PASSWORD = "katana2026";

export const DEMO_ATTENDANTS = [
  { email: "caxanga@allfights.com.br", unit: "Caxangá" },
  { email: "nova@allfights.com.br", unit: "Nova Descoberta" },
  { email: "correio@allfights.com.br", unit: "Correio Galeria" },
] as const;
