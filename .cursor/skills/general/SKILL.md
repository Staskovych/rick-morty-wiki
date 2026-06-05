---
name: general
description: General project conventions for Rick & Morty Wiki — folder structure, naming, TypeScript patterns. Always use as base project rules.
---

# General Project Rules — Rick & Morty Wiki

## Stack

- Next.js 15 App Router
- TypeScript (strict mode)
- Tailwind CSS
- Prisma ORM + PostgreSQL
- Docker for local DB
- pnpm as package manager

## Project Structure

app/
├── characters/
│ └── [id]/
│ └── page.tsx
├── episodes/
│ └── page.tsx
├── locations/
│ └── page.tsx
├── api/
│ ├── characters/
│ │ └── route.ts
│ ├── episodes/
│ │ └── route.ts
│ └── favorites/
│ └── route.ts
├── layout.tsx
└── page.tsx
components/
├── character/
│ ├── CharacterCard.tsx
│ ├── CharacterGrid.tsx
│ └── CharacterFilters.tsx
├── ui/
│ ├── Pagination.tsx
│ ├── SearchBar.tsx
│ └── FavoriteButton.tsx
└── layout/
└── Navbar.tsx
lib/
├── prisma.ts
└── api/
└── rick-morty.ts
types/
└── rick-morty.ts

## Naming Conventions

- Components: PascalCase (`CharacterCard.tsx`)
- Utilities & hooks: camelCase (`useCharacters.ts`)
- Constants: UPPER_SNAKE_CASE
- Styles: Tailwind utility classes only, no custom class names

## TypeScript Rules

- Always explicit return types on functions
- `interface` for API objects, `type` for union types
- Never use `any`, use `unknown` if type is uncertain
- All component props must be typed via interface

## Imports Order

1. React / Next.js
2. External libraries
3. Internal modules via `@/` alias
