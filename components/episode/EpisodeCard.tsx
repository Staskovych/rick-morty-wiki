import type { Episode } from "@/types/rick-morty";

interface EpisodeCardProps {
  episode: Episode;
}

export default function EpisodeCard({
  episode,
}: EpisodeCardProps): React.ReactElement {
  return (
    <article className="rounded-lg border-2 border-[#0b5ed7] bg-white p-3">
      <span className="mb-2 inline-block rounded bg-[#0b5ed7] px-2 py-1 text-sm font-medium text-white">
        {episode.episode}
      </span>
      <h2 className="mb-2 text-lg font-bold text-[#212529]">{episode.name}</h2>
      <div className="mb-1">
        <span className="text-sm text-[#6c757d]">Air Date: </span>
        <span className="text-base text-[#212529]">{episode.air_date}</span>
      </div>
      <div>
        <span className="text-sm text-[#6c757d]">Characters: </span>
        <span className="text-base text-[#212529]">
          {episode.characters.length}
        </span>
      </div>
    </article>
  );
}
