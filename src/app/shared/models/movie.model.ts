export interface StarWarsResponse {
  message: string;
  result: StarWarsFilm[];
}

export interface StarWarsFilmDetailsResponse {
  message: string;
  result: StarWarsFilm;
}

export interface StarWarsFilm {
  properties: FilmProperties;
  description: string;
  _id: string;
  uid: string;
  __v: number;
}

interface FilmProperties {
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  producer: string;
  title: string;
  episode_id: number;
  director: string;
  release_date: string;
  opening_crawl: string;
  url: string;
}
