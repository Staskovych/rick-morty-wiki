---
name: docker
description: Docker Compose setup for local development with PostgreSQL 17. Use when configuring docker-compose, connecting the database, or working with volumes.
---

# Docker Compose — Rick & Morty Wiki

## docker-compose.yml

```yaml
name: rick-morty-wiki

services:
 postgres:
  image: postgres:17-alpine
  container_name: rick-morty-postgres
  restart: unless-stopped
  ports:
   - "${POSTGRES_PORT:-5432}:5432"
  environment:
   POSTGRES_USER: ${POSTGRES_USER:-postgres}
   POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-postgres}
   POSTGRES_DB: ${POSTGRES_DB:-rick_morty_db}
  volumes:
   - postgres_data:/var/lib/postgresql/data
  healthcheck:
   test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-postgres}"]
   interval: 5s
   timeout: 5s
   retries: 5

volumes:
 postgres_data:
```

## .env.local

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/rick_morty_db?schema=public
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=rick_morty_db
POSTGRES_PORT=5432
```

## Commands

```bash
docker compose up -d              # start DB in background
docker compose down               # stop (data preserved)
docker compose down -v            # stop + delete volumes (DELETES DATA)
docker compose logs -f postgres   # live logs
docker compose ps                 # container status
```

## Prisma + Docker Workflow

```bash
docker compose up -d              # 1. start DB
pnpm prisma migrate dev           # 2. run migrations
pnpm prisma studio                # 3. visual DB editor
```
