---
name: nextjs-prisma
description: Next.js 15 App Router + Prisma ORM patterns — Server Components, Server Actions, Route Handlers, caching. Use when creating pages, API routes, or database queries.
---

# Next.js 15 + Prisma

## Server Components (default)

```tsx
import { prisma } from "@/lib/prisma";

export default async function CharactersPage() {
 const favorites = await prisma.favorite.findMany({
  orderBy: { createdAt: "desc" },
 });
 return <CharacterGrid favorites={favorites} />;
}
```

Add `'use client'` ONLY for components with onClick, onChange, useState, useEffect.

## Singleton Prisma Client

```typescript
// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

## Server Actions — Favorites

```typescript
"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addFavorite(characterId: number): Promise<void> {
 await prisma.favorite.create({
  data: { characterId },
 });
 revalidatePath("/");
}

export async function removeFavorite(characterId: number): Promise<void> {
 await prisma.favorite.delete({
  where: { characterId },
 });
 revalidatePath("/");
}
```

## Route Handlers

```typescript
// app/api/characters/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
 const { searchParams } = request.nextUrl;
 const page = searchParams.get("page") ?? "1";
 const name = searchParams.get("name") ?? "";

 const res = await fetch(
  `https://rickandmortyapi.com/api/character?page=${page}&name=${name}`,
  { next: { revalidate: 3600 } },
 );
 const data = await res.json();
 return NextResponse.json(data);
}
```

## Dynamic Pages

```tsx
// app/characters/[id]/page.tsx
import { notFound } from "next/navigation";

export default async function CharacterPage({
 params,
}: {
 params: Promise<{ id: string }>;
}): Promise<JSX.Element> {
 const { id } = await params;
 const character = await getCharacterById(Number(id));
 if (!character) notFound();
 return <CharacterDetail character={character} />;
}
```

## Caching

```typescript
const res = await fetch(url, {
 next: { revalidate: 3600 }, // revalidate every hour
});
```

## App Router UI Files

app/
├── loading.tsx # shown while page is loading
├── error.tsx # 'use client' — error boundary
├── not-found.tsx # 404 page

## Prisma Queries — Favorites

```typescript
// Get all favorites
const favorites = await prisma.favorite.findMany();

// Check if favorited
const isFavorite = await prisma.favorite.findUnique({
 where: { characterId: id },
});

// Add favorite
await prisma.favorite.create({ data: { characterId: id } });

// Remove favorite
await prisma.favorite.delete({ where: { characterId: id } });
```
