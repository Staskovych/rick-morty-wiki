import type { Metadata } from "next";
import { Suspense } from "react";
import LocationCard from "@/components/location/LocationCard";
import Pagination from "@/components/ui/Pagination";
import { getLocations } from "@/lib/api/rick-morty";
import type { ApiInfo, Location } from "@/types/rick-morty";

export const metadata: Metadata = {
  title: "Locations | Rick & Morty Wiki",
};

interface LocationsPageProps {
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

async function fetchLocations(
  page: number,
): Promise<{ locations: Location[]; info: ApiInfo }> {
  try {
    const { results, info } = await getLocations({ page });
    return { locations: results, info };
  } catch {
    return { locations: [], info: EMPTY_INFO };
  }
}

export default async function LocationsPage({
  searchParams,
}: LocationsPageProps): Promise<React.ReactElement> {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const { locations, info } = await fetchLocations(page);

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-[#212529]">
        Locations
      </h1>
      {locations.length === 0 ? (
        <p className="text-center text-[#6c757d]">No locations found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      )}
      <Suspense fallback={null}>
        <Pagination currentPage={page} totalPages={info.pages} />
      </Suspense>
    </main>
  );
}
