# AllFights

Academia de artes marciais em Recife (PE). Site público com unidades, eventos e loja parceira, mais área do atendente para matrículas e mensalidades.

## O que tem

- Home contínua: história + seções das unidades Caxangá, Nova Descoberta e Correio Galeria (horários, planos, mapa)
- Página de eventos (`/eventos`) — lista pronta; vazia até publicar eventos
- Império dos Tatãs (`/imperio-dos-tatas`) — loja de tatames com mapa
- Login de atendente por unidade + gestão mobile de alunos no banco SQLite/Prisma
- Campos do aluno: nome, endereço, telefone, plano, arte, pago no mês e histórico mensal

## Como rodar

```bash
npm install
cp .env.example .env
npx prisma migrate deploy
npx prisma db seed
npm run dev
```

Servidor: [http://127.0.0.1:43127](http://127.0.0.1:43127)

## Acessos demo (atendentes)

Senha de todas as unidades: `katana2026`

| Unidade | E-mail |
|---|---|
| Caxangá | `caxanga@allfights.com.br` |
| Nova Descoberta | `nova@allfights.com.br` |
| Correio Galeria | `correio@allfights.com.br` |

Cada atendente só vê e edita alunos da própria unidade. Os dados ficam no banco (`prisma/dev.db`), acessíveis de qualquer dispositivo que use o mesmo servidor.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Prisma + SQLite.
