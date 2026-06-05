# Rick & Morty Wiki

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/)

A Next.js wiki app for browsing Rick & Morty characters, episodes, and locations via the [Rick and Morty API](https://rickandmortyapi.com). Search and filter characters, paginate through results, and save favorites to a PostgreSQL database.

## Live Demo

[https://rick-morty-wiki-ti7q.vercel.app](https://rick-morty-wiki-ti7q.vercel.app)

## Features

- **Character wiki** — browse and view character detail pages
- **Search** — search characters by name
- **Filters** — filter by status, species, and gender
- **Pagination** — paginated character list
- **Favorites** — save characters to a personal favorites list (PostgreSQL + Prisma)
- **Episodes** — browse episodes
- **Locations** — browse locations

## Tech Stack

- **Framework** — Next.js 16 (App Router), React 19
- **Language** — TypeScript
- **Styling** — Tailwind CSS 4
- **Data** — Prisma ORM 7, PostgreSQL 17
- **API** — Rick and Morty REST API
- **DevOps** — Docker Compose, Vercel

## Installation & Setup

**Prerequisites:** Node.js 20+, pnpm, Docker

1. **Clone the repository**

   ```bash
   git clone https://github.com/Staskovych/rick-morty-wiki.git
   cd rick-morty-wiki
   ```

2. **Start PostgreSQL with Docker**

   ```bash
   docker compose up -d
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Values match the defaults in `docker-compose.yml`.

4. **Install dependencies**

   ```bash
   pnpm install
   ```

5. **Run database migrations**

   ```bash
   pnpm prisma migrate dev
   ```

6. **Start the development server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) — the root path redirects to `/characters`.

## Available Scripts

| Script  | Command      | Description                                     |
| ------- | ------------ | ----------------------------------------------- |
| `dev`   | `pnpm dev`   | Start Next.js dev server                        |
| `build` | `pnpm build` | Generate Prisma client and build for production |
| `start` | `pnpm start` | Run production server                           |
| `lint`  | `pnpm lint`  | Run ESLint                                      |

**Prisma commands:**

| Command                    | Description                          |
| -------------------------- | ------------------------------------ |
| `pnpm prisma migrate dev`  | Apply migrations in development      |
| `pnpm prisma studio`       | Open visual database editor          |

## Author

**Stanislav Mosakov** — [GitHub](https://github.com/Staskovych)
