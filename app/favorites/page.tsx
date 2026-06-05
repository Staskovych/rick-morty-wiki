import type { Metadata } from "next";
import CharacterCard from "@/components/character/CharacterCard";
import { getCharactersByIds } from "@/lib/api/rick-morty";
import { prisma } from "@/lib/prisma";
import type { Character } from "@/types/rick-morty";

export const metadata: Metadata = {
  title: "Favorites | Rick & Morty Wiki",
};

async function fetchFavoriteCharacters(
  ids: number[],
): Promise<Character[]> {
  try {
    const characters = await getCharactersByIds(ids);
    const byId = new Map(characters.map((character) => [character.id, character]));
    return ids
      .map((id) => byId.get(id))
      .filter((character): character is Character => character !== undefined);
  } catch {
    return [];
  }
}

export default async function FavoritesPage(): Promise<React.ReactElement> {
  const favorites = await prisma.favorite.findMany({
    orderBy: { createdAt: "desc" },
    select: { characterId: true },
  });

  const ids = favorites.map((favorite: { characterId: number }) => favorite.characterId);
  const characters = ids.length === 0 ? [] : await fetchFavoriteCharacters(ids);

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-[#212529]">
        Favorites
      </h1>
      {characters.length === 0 ? (
        <p className="text-center text-[#6c757d]">
          You have no favorites yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              isFavorite={true}
              href={`/characters/${character.id}`}
            />
          ))}
        </div>
      )}
    </main>
  );
}
