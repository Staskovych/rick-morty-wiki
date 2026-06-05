import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import BackButton from "@/components/ui/BackButton";
import FavoriteButton from "@/components/ui/FavoriteButton";
import { getCharacterById } from "@/lib/api/rick-morty";
import { prisma } from "@/lib/prisma";
import type { CharacterStatus } from "@/types/rick-morty";

interface CharacterPageProps {
  params: Promise<{ id: string }>;
}

function getStatusBadgeClasses(status: CharacterStatus): string {
  switch (status) {
    case "Alive":
      return "bg-green-500 text-white";
    case "Dead":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

export async function generateMetadata({
  params,
}: CharacterPageProps): Promise<Metadata> {
  const { id } = await params;
  const characterId = Number(id);

  if (!Number.isInteger(characterId) || characterId < 1) {
    return { title: "Character | Rick & Morty Wiki" };
  }

  try {
    const character = await getCharacterById(characterId);
    return { title: `${character.name} | Rick & Morty Wiki` };
  } catch {
    return { title: "Character | Rick & Morty Wiki" };
  }
}

export default async function CharacterPage({
  params,
}: CharacterPageProps): Promise<React.ReactElement> {
  const { id } = await params;
  const characterId = Number(id);

  if (!Number.isInteger(characterId) || characterId < 1) {
    notFound();
  }

  const [character, favorite] = await Promise.all([
    getCharacterById(characterId).catch(() => null),
    prisma.favorite.findUnique({ where: { characterId } }),
  ]);

  if (!character) {
    notFound();
  }

  const isFavorite = favorite !== null;
  const episodeCount = character.episode.length;

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-8">
      <BackButton>&larr; Back to Characters</BackButton>
      <article className="rounded-lg border-2 border-[#0b5ed7] bg-white p-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="relative mx-auto aspect-square w-full max-w-md shrink-0 lg:w-2/5">
            <Image
              src={character.image}
              alt={character.name}
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className="rounded-lg object-cover"
              priority
            />
            <span
              className={`absolute top-3 right-3 rounded px-3 py-1 text-sm font-medium ${getStatusBadgeClasses(character.status)}`}
            >
              {character.status}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-bold text-[#212529]">
                {character.name}
              </h1>
              <FavoriteButton
                characterId={character.id}
                isFavorite={isFavorite}
              />
            </div>
            <dl className="flex flex-col gap-3">
              <div>
                <dt className="text-sm text-[#6c757d]">Species</dt>
                <dd className="text-base text-[#212529]">{character.species}</dd>
              </div>
              <div>
                <dt className="text-sm text-[#6c757d]">Gender</dt>
                <dd className="text-base text-[#212529]">{character.gender}</dd>
              </div>
              <div>
                <dt className="text-sm text-[#6c757d]">Origin</dt>
                <dd className="text-base text-[#212529]">
                  {character.origin.name}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[#6c757d]">Last Location</dt>
                <dd className="text-base text-[#212529]">
                  {character.location.name}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[#6c757d]">Episodes</dt>
                <dd className="text-base text-[#212529]">
                  {episodeCount} {episodeCount === 1 ? "episode" : "episodes"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </article>
    </main>
  );
}
