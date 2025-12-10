export interface Movie {
  _id: string;
  id: number;
  ids: {
    imdb: string | null;
    rotten: string | null;
    tmdb: string | null;
  };
  title: string;
  alternativeTitles: string;
  year: string;
  durationMinutes: number;
  genres: Genre[];
  poster: string;
  actors_abridged: { name: string }[];
  directors_abridged: { name: string }[];
  ratings: {
    imdb: string | null;
    rotten_audience: number | null;
    rotten_critics: number | null;
  };
  showtimes: Showtime[];
  certificate: {
    is: string;
    color: string;
    number: string;
  };
  trailers: Trailer[];
  omdb: OMDBEntry[];
  plot: string;
}

export interface Genre {
  ID: number;
  Name: string;
  NameEN?: string;
}

export interface Showtime {
  cinema: {
    id: number;
    name: string;
  };
  schedule: {
    time: string;
    purchase_url: string;
  }[];
}

export interface Trailer {
  id: number;
  results: {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
  }[];
}

export interface OMDBEntry {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  tomatoMeter: string;
  tomatoImage: string;
  tomatoRating: string;
  tomatoReviews: string;
  tomatoFresh: string;
  tomatoRotten: string;
  tomatoConsensus: string;
  tomatoUserMeter: string | "N/A";
  tomatoUserRating: string | "N/A";
  tomatoUserReviews: string;
  tomatoURL: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}
