import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/components/ui/FavoriteButton";
import type { Character, CharacterStatus } from "@/types/rick-morty";

interface CharacterCardProps {
  character: Character;
  isFavorite: boolean;
  href?: string;
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

const linkClassName =
  "block transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b5ed7]";

export default function CharacterCard({
  character,
  isFavorite,
  href,
}: CharacterCardProps): React.ReactElement {
  const imageBlock = (
    <div className="relative aspect-square w-full">
      <Image
        src={character.image}
        alt={character.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="rounded-t-lg object-cover"
      />
      <span
        className={`absolute top-2 right-2 rounded px-2 py-1 text-sm font-medium ${getStatusBadgeClasses(character.status)}`}
      >
        {character.status}
      </span>
    </div>
  );

  const nameHeading = (
    <h2 className="text-lg font-bold text-[#212529]">{character.name}</h2>
  );

  const locationBlock = (
    <div>
      <span className="text-sm text-[#6c757d]">Last Location: </span>
      <span className="text-base text-[#212529]">
        {character.location.name}
      </span>
    </div>
  );

  return (
    <article className="overflow-hidden rounded-lg border-2 border-[#0b5ed7] bg-white">
      {href ? (
        <Link href={href} className={linkClassName}>
          {imageBlock}
        </Link>
      ) : (
        imageBlock
      )}
      <div className="p-3">
        <div className="mb-2 flex items-start justify-between gap-2">
          {href ? (
            <Link href={href} className={`min-w-0 flex-1 ${linkClassName}`}>
              {nameHeading}
            </Link>
          ) : (
            nameHeading
          )}
          <FavoriteButton
            characterId={character.id}
            isFavorite={isFavorite}
          />
        </div>
        {href ? (
          <Link href={href} className={linkClassName}>
            {locationBlock}
          </Link>
        ) : (
          locationBlock
        )}
      </div>
    </article>
  );
}
