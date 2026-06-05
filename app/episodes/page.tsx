import type { Metadata } from "next";
import { Suspense } from "react";
import EpisodeCard from "@/components/episode/EpisodeCard";
import Pagination from "@/components/ui/Pagination";
import { getEpisodes } from "@/lib/api/rick-morty";
import type { ApiInfo, Episode } from "@/types/rick-morty";

export const metadata: Metadata = {
  title: "Episodes | Rick & Morty Wiki",
};

interface EpisodesPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

const EMPTY_INFO: ApiInfo = {
  count: 0,
  pages: 0,
  next: null,
  prev: null,
};

async function fetchEpisodes(
  page: number,
): Promise<{ episodes: Episode[]; info: ApiInfo }> {
  try {
    const { results, info } = await getEpisodes({ page });
    return { episodes: results, info };
  } catch {
    return { episodes: [], info: EMPTY_INFO };
  }
}

export default async function EpisodesPage({
  searchParams,
}: EpisodesPageProps): Promise<React.ReactElement> {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const { episodes, info } = await fetchEpisodes(page);

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-[#212529]">
        Episodes
      </h1>
      {episodes.length === 0 ? (
        <p className="text-center text-[#6c757d]">No episodes found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      )}
      <Suspense fallback={null}>
        <Pagination currentPage={page} totalPages={info.pages} />
      </Suspense>
    </main>
  );
}
