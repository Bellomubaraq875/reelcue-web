# Reelcue — Web

The Next.js application: UI, auth, and API routes. Deploys standalone to Vercel.

## Setup
```bash
npm install              # also runs `prisma generate` via postinstall
cp .env.example .env
# fill in DATABASE_URL / DIRECT_URL (Neon), NEXTAUTH_SECRET, etc.

npm run prisma:migrate   # creates tables from prisma/schema.prisma
npm run dev               # localhost:3000
```

## Deploying
Push this folder to its own repo (or set it as the Vercel project's root
directory if you keep it alongside reelcue-worker in one repo). Vercel
auto-detects Next.js — no extra config needed beyond environment variables.

## Note on the schema
`prisma/schema.prisma` here is a **copy** shared conceptually with
`reelcue-worker/prisma/schema.prisma` — both apps read/write the same
Postgres database. If you change the schema, copy the updated file to
the worker folder too before deploying either one.
