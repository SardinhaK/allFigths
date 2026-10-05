export const ACADEMY = {
  name: "All Fights",
  legalName: "Academia All Fights",
  kanji: "武",
  motto: "Onde a disciplina encontra a força.",
  tagline: "Academia de artes marciais em Caxangá",
  city: "Recife",
  state: "PE",
  neighborhood: "Caxangá",
  addressLine: "Rua Pedro Ernesto, 46",
  addressRest: "Caxangá — Recife/PE",
  postalCode: "50800-190",
  phone: "(81) 99323-3254",
  phoneE164: "+5581993233254",
  whatsappUrl: "https://wa.me/5581993233254",
  email: undefined,
  instagramHandle: "allfightscaxanga",
  instagramUrl: "https://www.instagram.com/allfightscaxanga/",
  brandInstagramHandle: "academiaallfights",
  hours: [
    { days: "Segunda a sexta", time: "06:00 – 22:00" },
    { days: "Sábado e domingo", time: "08:00 – 14:00" },
  ],
  amenities: [
    "Área infantil",
    "Armários",
    "Chuveiro",
    "Vestiário",
    "Estacionamento",
    "Wi-Fi",
  ],
} as const;

export const MARTIAL_ARTS = [
  "Jiu-Jitsu",
  "Muay Thai",
  "MMA",
  "Kickboxing",
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
      "Adultos e kids no tatame. Controle, alavancas e finalizações — inclusive linha Morganti Ju-Jitsu.",
  },
  {
    name: "Muay Thai",
    japanese: "ムエタイ",
    summary:
      "A arte das oito armas. Base firme, clinch, joelhos e cotovelos no ritmo certo.",
  },
  {
    name: "MMA",
    japanese: "総合格闘",
    summary:
      "Integração de striking e grappling. Preparação completa para quem quer cruzar as artes.",
  },
  {
    name: "Kickboxing",
    japanese: "蹴拳",
    summary:
      "Socos e chutes em alta intensidade. Condicionamento, guarda e combinações limpas.",
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
      "Kids, teens e adultos. Quedas, agarre e o uso da força do outro — o caminho suave com rigor.",
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

export const DEMO_MANAGER = {
  email: "gerente@allfights.com.br",
  password: "katana2026",
} as const;
