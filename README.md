# AllFights

Academia de artes marciais em Recife (PE). Site público com unidades, eventos e loja parceira, mais área do atendente para matrículas e mensalidades.

## Requisitos

- **Node.js 22 LTS** (recomendado). Node 24 pode dar problemas com algumas dependências.
- npm (vem com o Node)

## Como rodar (passo a passo)

Na pasta do projeto (onde está o `package.json`):

```bash
git checkout cursor/multi-unit-site-skeleton-2aaa
git pull
```

### 1. Instalar dependências

```bash
npm install
```

No **Windows**, se aparecer `EPERM` ao apagar pastas:

1. Feche o Cursor/VS Code e qualquer terminal com `npm run dev` rodando.
2. Apague a pasta manualmente: `node_modules`
3. Rode `npm install` de novo no Git Bash **como administrador** (se precisar).

### 2. Variáveis de ambiente

```bash
cp .env.example .env
```

No Windows (PowerShell): `Copy-Item .env.example .env`

### 3. Banco de dados (SQLite via libSQL — sem compilar C++ no Windows)

Use os scripts do projeto (Prisma **local**, não o `npx prisma` genérico da internet):

```bash
npm run setup
```

Isso roda: `prisma generate` → `migrate deploy` → `db seed`.

Ou passo a passo:

```bash
npm run db:generate
npm run db:deploy
npm run db:seed
```

### 4. Subir o site

```bash
npm run dev
```

Abra: [http://127.0.0.1:43127](http://127.0.0.1:43127)

## Login demo (atendentes)

Senha de todas as unidades: `katana2026`

| Unidade | E-mail |
|---|---|
| Caxangá | `caxanga@allfights.com.br` |
| Nova Descoberta | `nova@allfights.com.br` |
| Correio Galeria | `correio@allfights.com.br` |

## Erros comuns

### `npx prisma` — `No command registered for migrate/seed/generate`

O `npm install` **não terminou** ou você está na branch antiga (`cursor/allfights-enrollment-app`, sem Prisma). Solução:

```bash
git checkout cursor/multi-unit-site-skeleton-2aaa
npm install
npm run setup
```

Use **`npm run db:deploy`** em vez de `npx prisma migrate deploy` sozinho.

### `'next' não é reconhecido`

Falta `npm install`. O `next` fica em `node_modules/.bin/next`.

### `better-sqlite3` / Visual Studio / `node-gyp`

Versões antigas usavam `better-sqlite3`. A branch atual usa **`@prisma/adapter-libsql`**, que não exige Visual Studio Build Tools. Faça `git pull` na branch correta e `npm install` de novo.

### Node 24

Se ainda tiver erro estranho, instale **Node 22 LTS** em [https://nodejs.org](https://nodejs.org), reinstale dependências:

```bash
rm -rf node_modules
npm install
npm run setup
```

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Prisma + SQLite (libSQL).
