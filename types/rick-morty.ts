export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ApiResponse<T> {
  info: ApiInfo;
  results: T[];
}

export interface ApiIndex {
  characters: string;
  locations: string;
  episodes: string;
}

export interface ResourceRef {
  name: string;
  url: string;
}

export type CharacterStatus = "Alive" | "Dead" | "unknown";

export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

export type CharacterStatusFilter = "alive" | "dead" | "unknown";

export type CharacterGenderFilter =
  | "female"
  | "male"
  | "genderless"
  | "unknown";

export interface PaginationParams {
  page?: number;
}

export interface CharacterFilters extends PaginationParams {
  name?: string;
  status?: CharacterStatusFilter;
  species?: string;
  type?: string;
  gender?: CharacterGenderFilter;
}

export interface EpisodeFilters extends PaginationParams {
  name?: string;
  episode?: string;
}

export interface LocationFilters extends PaginationParams {
  name?: string;
  type?: string;
  dimension?: string;
}

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: ResourceRef;
  location: ResourceRef;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export type CharactersResponse = ApiResponse<Character>;
export type EpisodesResponse = ApiResponse<Episode>;
export type LocationsResponse = ApiResponse<Location>;
