import React from 'react';
import { Hero } from '../components/Hero';
import { MovieRow } from '../components/MovieRow';
import { movieService } from '../services/movieService';
import { Movie } from '../types';
import { GENRES } from '../data';

export const Home = () => {
  const [trending, setTrending] = React.useState<Movie[]>([]);
  const [genreMovies, setGenreMovies] = React.useState<Record<string, Movie[]>>({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      const trendingMovies = await movieService.getTrendingMovies();
      setTrending(trendingMovies);

      const genresToFetch = ['Action', 'Sci-Fi', 'Drama', 'Crime', 'Adventure'];
      const genreData: Record<string, Movie[]> = {};
      
      for (const genre of genresToFetch) {
        genreData[genre] = await movieService.getMoviesByGenre(genre);
      }
      
      setGenreMovies(genreData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pb-20">
      {trending.length > 0 && <Hero movie={trending[0]} />}
      
      <div className="relative z-10 -mt-20">
        {(Object.entries(genreMovies) as [string, Movie[]][]).map(([genre, movies]) => (
          movies.length > 0 && (
            <MovieRow key={genre} title={genre} movies={movies} />
          )
        ))}
      </div>
    </div>
  );
};
