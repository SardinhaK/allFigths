export const ACADEMY = {
  name: "AllFights",
  legalName: "AllFights Academia de Artes Marciais",
  kanji: "武",
  motto: "Disciplina antes do golpe.",
  foundedYear: 2014,
  city: "São Paulo",
  neighborhood: "Vila Madalena",
  addressLine: "Rua Harmonia, 412",
  addressRest: "Vila Madalena — São Paulo/SP",
  postalCode: "05435-000",
  phone: "(11) 3814-2090",
  email: "contato@allfights.com.br",
  hours: [
    { days: "Segunda a sexta", time: "06:00 – 22:00" },
    { days: "Sábado", time: "08:00 – 18:00" },
    { days: "Domingo", time: "09:00 – 13:00 · treino livre" },
  ],
} as const;

export const MARTIAL_ARTS = [
  "Jiu-Jitsu",
  "Muay Thai",
  "Karatê",
  "Judô",
  "Boxe",
  "Taekwondo",
] as const;

export type MartialArt = (typeof MARTIAL_ARTS)[number];

export const ART_DETAILS: {
  name: MartialArt;
  japanese: string;
  summary: string;
}[] = [
  {
    name: "Jiu-Jitsu",
    japanese: "柔術",
    summary:
      "Controle, alavancas e persistência no chão. Guardas, passagens e finalizações com calma.",
  },
  {
    name: "Muay Thai",
    japanese: "ムエタイ",
    summary:
      "A arte das oito armas. Base firme, clinch, joelhos e cotovelos no ritmo certo.",
  },
  {
    name: "Karatê",
    japanese: "空手",
    summary:
      "Kihon, kata e kumite. Precisão da linha, respeito ao oponente, golpe limpo.",
  },
  {
    name: "Judô",
    japanese: "柔道",
    summary:
      "Quedas, agarre e o uso da força do outro. O caminho suave, executado com rigor.",
  },
  {
    name: "Boxe",
    japanese: "拳闘",
    summary:
      "Guarda alta, deslocamento e combinação. Trabalho de pés antes da potência.",
  },
  {
    name: "Taekwondo",
    japanese: "跆拳道",
    summary:
      "Chutes longos, equilíbrio e explosão. Distância medida, impacto controlado.",
  },
];

export const WEEKLY_SCHEDULE: {
  days: string;
  slots: { time: string; art: string }[];
}[] = [
  {
    days: "Segunda, quarta e sexta",
    slots: [
      { time: "07:00", art: "Judô" },
      { time: "12:00", art: "Boxe" },
      { time: "19:00", art: "Jiu-Jitsu" },
      { time: "20:30", art: "Muay Thai" },
    ],
  },
  {
    days: "Terça e quinta",
    slots: [
      { time: "07:00", art: "Karatê" },
      { time: "12:00", art: "Taekwondo" },
      { time: "19:00", art: "Jiu-Jitsu" },
      { time: "20:30", art: "Muay Thai" },
    ],
  },
  {
    days: "Sábado",
    slots: [
      { time: "09:00", art: "Karatê" },
      { time: "10:30", art: "Jiu-Jitsu" },
      { time: "16:00", art: "Treino livre" },
    ],
  },
];

export const DEMO_MANAGER = {
  email: "gerente@allfights.com.br",
  password: "katana2026",
} as const;
