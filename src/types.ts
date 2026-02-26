export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string[];
  releaseYear: number;
  rating: number;
  duration: string;
  language: string;
  posterUrl: string;
  backdropUrl: string;
  cast: string[];
  director: string;
}

export interface User {
  id: string;
  email: string;
  watchlist: string[]; // Movie IDs
}
