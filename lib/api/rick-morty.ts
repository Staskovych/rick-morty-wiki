import type {
  ApiIndex,
  Character,
  CharacterFilters,
  CharactersResponse,
  Episode,
  EpisodeFilters,
  EpisodesResponse,
  Location,
  LocationFilters,
  LocationsResponse,
} from "@/types/rick-morty";

const BASE_URL = "https://rickandmortyapi.com/api";
const REVALIDATE_SECONDS = 3600;

const fetchOptions = { next: { revalidate: REVALIDATE_SECONDS } } as const;

function buildSearchParams(
  filters: Record<string, string | number | undefined>,
): URLSearchParams {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  }
  return searchParams;
}

async function fetchJson<T>(url: string, errorMessage: string): Promise<T> {
  const res = await fetch(url, fetchOptions);
  if (!res.ok) {
    throw new Error(errorMessage);
  }
  return res.json() as Promise<T>;
}

function listUrl(path: string, searchParams: URLSearchParams): string {
  const query = searchParams.toString();
  return query ? `${BASE_URL}/${path}?${query}` : `${BASE_URL}/${path}`;
}

export async function getApiIndex(): Promise<ApiIndex> {
  return fetchJson<ApiIndex>(BASE_URL, "Failed to fetch API index");
}

export async function getCharacters(
  params?: CharacterFilters,
): Promise<CharactersResponse> {
  const searchParams = buildSearchParams({
    page: params?.page,
    name: params?.name,
    status: params?.status,
    species: params?.species,
    type: params?.type,
    gender: params?.gender,
  });
  return fetchJson<CharactersResponse>(
    listUrl("character", searchParams),
    "Failed to fetch characters",
  );
}

export async function getCharacterById(id: number): Promise<Character> {
  return fetchJson<Character>(
    `${BASE_URL}/character/${id}`,
    `Character ${id} not found`,
  );
}

export async function getCharactersByIds(ids: number[]): Promise<Character[]> {
  if (ids.length === 0) {
    return [];
  }
  const data = await fetchJson<Character | Character[]>(
    `${BASE_URL}/character/${ids.join(",")}`,
    "Failed to fetch characters",
  );
  return Array.isArray(data) ? data : [data];
}

export async function getEpisodes(
  params?: EpisodeFilters,
): Promise<EpisodesResponse> {
  const searchParams = buildSearchParams({
    page: params?.page,
    name: params?.name,
    episode: params?.episode,
  });
  return fetchJson<EpisodesResponse>(
    listUrl("episode", searchParams),
    "Failed to fetch episodes",
  );
}

export async function getEpisodeById(id: number): Promise<Episode> {
  return fetchJson<Episode>(
    `${BASE_URL}/episode/${id}`,
    `Episode ${id} not found`,
  );
}

export async function getEpisodesByIds(ids: number[]): Promise<Episode[]> {
  if (ids.length === 0) {
    return [];
  }
  return fetchJson<Episode[]>(
    `${BASE_URL}/episode/${ids.join(",")}`,
    "Failed to fetch episodes",
  );
}

export async function getLocations(
  params?: LocationFilters,
): Promise<LocationsResponse> {
  const searchParams = buildSearchParams({
    page: params?.page,
    name: params?.name,
    type: params?.type,
    dimension: params?.dimension,
  });
  return fetchJson<LocationsResponse>(
    listUrl("location", searchParams),
    "Failed to fetch locations",
  );
}

export async function getLocationById(id: number): Promise<Location> {
  return fetchJson<Location>(
    `${BASE_URL}/location/${id}`,
    `Location ${id} not found`,
  );
}

export async function getLocationsByIds(ids: number[]): Promise<Location[]> {
  if (ids.length === 0) {
    return [];
  }
  return fetchJson<Location[]>(
    `${BASE_URL}/location/${ids.join(",")}`,
    "Failed to fetch locations",
  );
}
