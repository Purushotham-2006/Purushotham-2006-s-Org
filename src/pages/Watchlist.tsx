import React from 'react';
import { Bookmark, Play, Trash2 } from 'lucide-react';
import { movieService } from '../services/movieService';
import { Movie } from '../types';
import { MovieCard } from '../components/MovieCard';

export const Watchlist = () => {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchWatchlist = async () => {
      const ids = await movieService.getWatchlist();
      const allMovies = await movieService.getMovies();
      const watchlistMovies = allMovies.filter(m => ids.includes(m.id));
      setMovies(watchlistMovies);
      setLoading(false);
    };
    fetchWatchlist();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pt-24 px-4 md:px-12 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="bg-red-600 p-3 rounded-2xl">
            <Bookmark className="w-8 h-8 text-white fill-white" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">Your Watchlist</h1>
            <p className="text-gray-400 font-medium">{movies.length} movies saved for later</p>
          </div>
        </div>

        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movies.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <Bookmark className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Your watchlist is empty</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Explore our collection and add movies you want to watch later. They'll appear here for easy access.
            </p>
            <a href="/movies" className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-all">
              Browse Movies
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
