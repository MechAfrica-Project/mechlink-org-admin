# MechLink Admin

Admin panel for [mechlink.org](https://mechlink.org) — manages team members, the
contact inbox, and site settings. Deployed standalone at
**[admin.mechlink.org](https://admin.mechlink.org)**.

Split out of the `mechlink-org-website` repo so the public marketing site and the
internal tool deploy, version, and scale independently.

## Stack

Next.js 16 (App Router) · Auth.js v5 (credentials) · Prisma 7 + Neon Postgres ·
Tailwind v4 · Vercel Blob (photo uploads)

## Local setup

```bash
pnpm install
cp .env.example .env.local   # then fill in the values
pnpm prisma generate
pnpm dev
```

Sign in at `/login`. To create the first admin user, run `pnpm db:seed` — it
prints a generated password on first run and leaves any existing user untouched.

## Shared database

This app talks to the **same Neon database as the public site**. The Prisma
schema here is the full shared schema, and both repos ship the same migration
history.

> Run migrations from **one** repo only. Applying the same migration from both
> will fail the second time — the migrations table already records it.

## Routes

| Path        | Purpose                                  |
| ----------- | ---------------------------------------- |
| `/`         | Dashboard (counts + shortcuts)           |
| `/login`    | Sign in — the only unauthenticated page  |
| `/team`     | Team member CRUD, photo upload           |
| `/inbox`    | Contact form submissions                 |
| `/settings` | Contact emails and social links          |

Everything except `/login` is gated in [`proxy.ts`](./proxy.ts), which defaults
to protected — a new page is private unless explicitly excepted.

## PWA

Installable as a standalone app (manifest at `/manifest.webmanifest`, icon
generated at `/icon-512`). Install from the address bar on Chrome/Edge, or
Share → Add to Home Screen on iOS Safari. No offline support — every page needs
the database.

## Deployment

Vercel, auto-deploying from `main`. Required environment variables are listed in
[`.env.example`](./.env.example); all four must be set in the Vercel project.
