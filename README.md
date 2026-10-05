# All Fights Caxangá

Academia de artes marciais em Caxangá (Recife/PE). Site público do dojo e área do gerente para matrículas e mensalidades, com visual samurai em vermelho, preto e branco.

Dados públicos alinhados à conta [@allfightscaxanga](https://www.instagram.com/allfightscaxanga/) e à ficha da academia: Rua Pedro Ernesto, 46 — Caxangá, Recife/PE — (81) 99323-3254.

A fatia pronta cobre:

- Página inicial com artes, horários, endereço e contato (WhatsApp / Instagram)
- Login do gerente (credenciais de demonstração, sessão no `localStorage`)
- Cadastro de alunos (nome, arte, mensalidade, pagamento do mês)
- Visão financeira de quem está em débito e o total em aberto
- Persistência dos alunos no `localStorage`, com lista de demonstração na primeira visita

Não há banco de dados nem provedor de autenticação.

## Como rodar

Rode na raiz do repositório (a pasta que contém o `package.json`):

```bash
npm install
npm run dev
```

O servidor sobe em [http://127.0.0.1:43127](http://127.0.0.1:43127).

## Acesso do gerente (demo)

- E-mail: `gerente@allfights.com.br`
- Senha: `katana2026`

A sessão e os alunos ficam apenas neste navegador. Um recarregamento mantém os dados.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS e shadcn/ui.
