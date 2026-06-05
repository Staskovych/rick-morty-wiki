---
name: rick-morty-api
description: Rick & Morty REST API structure — endpoints, response types, pagination, filters. Use when writing fetch requests or defining TypeScript types for API data.
---

# Rick & Morty API

Base URL: `https://rickandmortyapi.com/api`

## Endpoints

GET /character # paginated character list
GET /character/{id} # single character
GET /episode # paginated episode list
GET /episode/{id} # single episode
GET /location # paginated location list
GET /location/{id} # single location

## Pagination — Info Object

All list endpoints return:

```typescript
interface ApiInfo {
 count: number; // total records (826 characters)
 pages: number; // total pages (42)
 next: string | null; // URL of next page
 prev: string | null; // URL of previous page
}
```

Pagination param: `?page=2`

## TypeScript Types

```typescript
// types/rick-morty.ts

export interface ApiResponse<T> {
 info: ApiInfo;
 results: T[];
}

export interface ApiInfo {
 count: number;
 pages: number;
 next: string | null;
 prev: string | null;
}

export interface Character {
 id: number;
 name: string;
 status: "Alive" | "Dead" | "unknown";
 species: string;
 type: string;
 gender: "Female" | "Male" | "Genderless" | "unknown";
 origin: { name: string; url: string };
 location: { name: string; url: string };
 image: string; // avatar URL
 episode: string[]; // array of episode URLs
 url: string;
 created: string;
}

export interface Episode {
 id: number;
 name: string;
 air_date: string;
 episode: string; // format: S01E01
 characters: string[]; // array of character URLs
 url: string;
 created: string;
}

export interface Location {
 id: number;
 name: string;
 type: string;
 dimension: string;
 residents: string[]; // array of character URLs
 url: string;
 created: string;
}
```

## Character Filters

GET /character?name=rick&status=alive&gender=male&species=human&page=1

| Param   | Values                             |
| ------- | ---------------------------------- |
| name    | any string                         |
| status  | alive, dead, unknown               |
| gender  | female, male, genderless, unknown  |
| species | human, alien, humanoid, and others |
| page    | page number                        |

## API Fetcher

```typescript
// lib/api/rick-morty.ts
const BASE_URL = "https://rickandmortyapi.com/api";

export async function getCharacters(params?: {
 page?: number;
 name?: string;
 status?: string;
 gender?: string;
 species?: string;
}): Promise<ApiResponse<Character>> {
 const searchParams = new URLSearchParams();
 if (params?.page) searchParams.set("page", String(params.page));
 if (params?.name) searchParams.set("name", params.name);
 if (params?.status) searchParams.set("status", params.status);
 if (params?.gender) searchParams.set("gender", params.gender);
 if (params?.species) searchParams.set("species", params.species);

 const res = await fetch(`${BASE_URL}/character?${searchParams}`, {
  next: { revalidate: 3600 },
 });
 if (!res.ok) throw new Error("Failed to fetch characters");
 return res.json();
}

export async function getCharacterById(id: number): Promise<Character> {
 const res = await fetch(`${BASE_URL}/character/${id}`, {
  next: { revalidate: 3600 },
 });
 if (!res.ok) throw new Error(`Character ${id} not found`);
 return res.json();
}

export async function getEpisodes(
 page?: number,
): Promise<ApiResponse<Episode>> {
 const res = await fetch(`${BASE_URL}/episode?page=${page ?? 1}`, {
  next: { revalidate: 3600 },
 });
 if (!res.ok) throw new Error("Failed to fetch episodes");
 return res.json();
}

export async function getLocations(
 page?: number,
): Promise<ApiResponse<Location>> {
 const res = await fetch(`${BASE_URL}/location?page=${page ?? 1}`, {
  next: { revalidate: 3600 },
 });
 if (!res.ok) throw new Error("Failed to fetch locations");
 return res.json();
}
```
