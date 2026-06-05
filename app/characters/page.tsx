import type { Metadata } from "next";
import { Suspense } from "react";
import CharacterCard from "@/components/character/CharacterCard";
import CharacterFilters from "@/components/character/CharacterFilters";
import Pagination from "@/components/ui/Pagination";
import SearchBar from "@/components/ui/SearchBar";
import { getCharacters } from "@/lib/api/rick-morty";
import { prisma } from "@/lib/prisma";
import type {
  ApiInfo,
  Character,
  CharacterFilters as CharacterFiltersParams,
  CharacterGenderFilter,
  CharacterStatusFilter,
} from "@/types/rick-morty";

export const metadata: Metadata = {
  title: "Characters | Rick & Morty Wiki",
};

interface CharactersPageProps {
  searchParams: Promise<{
    page?: string;
    name?: string;
    status?: string;
    species?: string;
    gender?: string;
  }>;
}

const STATUS_VALUES = ["alive", "dead", "unknown"] as const;
const GENDER_VALUES = ["female", "male", "genderless", "unknown"] as const;
const SPECIES_VALUES = [
  "human",
  "alien",
  "humanoid",
  "animal",
  "robot",
  "unknown",
] as const;

const EMPTY_INFO: ApiInfo = {
  count: 0,
  pages: 0,
  next: null,
  prev: null,
};

function parseStatus(value?: string): CharacterStatusFilter | undefined {
  if (!value) return undefined;
  const normalized = value.toLowerCase();
  return STATUS_VALUES.includes(normalized as CharacterStatusFilter)
    ? (normalized as CharacterStatusFilter)
    : undefined;
}

function parseGender(value?: string): CharacterGenderFilter | undefined {
  if (!value) return undefined;
  const normalized = value.toLowerCase();
  return GENDER_VALUES.includes(normalized as CharacterGenderFilter)
    ? (normalized as CharacterGenderFilter)
    : undefined;
}

function parseSpecies(value?: string): string | undefined {
  if (!value) return undefined;
  const normalized = value.toLowerCase();
  return SPECIES_VALUES.includes(normalized as (typeof SPECIES_VALUES)[number])
    ? normalized
    : undefined;
}

async function fetchCharacters(
  filters: CharacterFiltersParams,
): Promise<{ characters: Character[]; info: ApiInfo }> {
  try {
    const { results, info } = await getCharacters(filters);
    return { characters: results, info };
  } catch {
    return { characters: [], info: EMPTY_INFO };
  }
}

export default async function CharactersPage({
  searchParams,
}: CharactersPageProps): Promise<React.ReactElement> {
  const { page: pageParam, name, status, species, gender } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const searchName = name?.trim() || undefined;

  const apiFilters: CharacterFiltersParams = {
    page,
    name: searchName,
    status: parseStatus(status),
    species: parseSpecies(species),
    gender: parseGender(gender),
  };

  const [{ characters, info }, favorites] = await Promise.all([
    fetchCharacters(apiFilters),
    prisma.favorite.findMany({ select: { characterId: true } }),
  ]);

  const favoriteIds = new Set(favorites.map((f: { characterId: number }) => f.characterId));

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-[#212529]">
        Characters
      </h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-[280px] shrink-0 lg:sticky lg:top-8">
          <Suspense fallback={null}>
            <CharacterFilters />
          </Suspense>
        </aside>
        <div className="min-h-[500px] min-w-0 flex-1">
          <Suspense fallback={null}>
            <SearchBar defaultValue={name ?? ""} />
          </Suspense>
          {characters.length === 0 ? (
            <p className="text-center text-[#6c757d]">
              No characters found{searchName ? ` for "${searchName}"` : ""}.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {characters.map((character: Character) => (
                <CharacterCard
                  key={character.id}
                  href={`/characters/${character.id}`}
                  character={character}
                  isFavorite={favoriteIds.has(character.id)}
                />
              ))}
            </div>
          )}
          <Suspense fallback={null}>
            <Pagination currentPage={page} totalPages={info.pages} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
