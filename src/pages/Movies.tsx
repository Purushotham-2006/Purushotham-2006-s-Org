import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, Star, Calendar } from 'lucide-react';
import { movieService } from '../services/movieService';
import { Movie } from '../types';
import { MovieCard } from '../components/MovieCard';
import { GENRES } from '../data';
import { cn } from '../lib/utils';

export const Movies = () => {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = React.useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedGenre, setSelectedGenre] = React.useState('All');
  const [sortBy, setSortBy] = React.useState('rating');
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();

  React.useEffect(() => {
    const fetchMovies = async () => {
      const data = await movieService.getMovies();
      setMovies(data);
      setFilteredMovies(data);
      
      // Handle query params
      const params = new URLSearchParams(location.search);
      const q = params.get('q');
      const genre = params.get('genre');
      
      if (q) setSearchQuery(q);
      if (genre) setSelectedGenre(genre);
      
      setLoading(false);
    };
    fetchMovies();
  }, [location.search]);

  React.useEffect(() => {
    let result = [...movies];

    if (searchQuery) {
      result = result.filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedGenre !== 'All') {
      result = result.filter(m => m.genre.includes(selectedGenre));
    }

    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'year') {
      result.sort((a, b) => b.releaseYear - a.releaseYear);
    }

    setFilteredMovies(result);
  }, [searchQuery, selectedGenre, sortBy, movies]);

  return (
    <div className="bg-black min-h-screen pt-24 px-4 md:px-12 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic mb-2">Explore Movies</h1>
            <p className="text-gray-400 font-medium">Find your next favorite movie from our curated collection.</p>
          </div>

          <div className="relative group max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-red-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search movies, genres, actors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            <button 
              onClick={() => setSelectedGenre('All')}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border",
                selectedGenre === 'All' 
                  ? "bg-red-600 border-red-600 text-white" 
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
              )}
            >
              All Genres
            </button>
            {GENRES.map(genre => (
              <button 
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border",
                  selectedGenre === genre 
                    ? "bg-red-600 border-red-600 text-white" 
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                )}
              >
                {genre}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
              <button 
                onClick={() => setSortBy('rating')}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  sortBy === 'rating' ? "bg-white/10 text-white" : "text-gray-500 hover:text-white"
                )}
                title="Sort by Rating"
              >
                <Star className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setSortBy('year')}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  sortBy === 'year' ? "bg-white/10 text-white" : "text-gray-500 hover:text-white"
                )}
                title="Sort by Year"
              >
                <Calendar className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredMovies.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl font-medium">No movies found matching your criteria.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedGenre('All'); }}
              className="mt-4 text-red-500 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
