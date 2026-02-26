import React from 'react';
import { Search } from 'lucide-react';
import { Movie } from '../types';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  movie: Movie;
}

export const Hero = ({ movie }: HeroProps) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={movie.backdropUrl} 
          alt={movie.title}
          className="h-full w-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase italic drop-shadow-2xl">
            Discover Movies You'll Love
          </h1>
          
          <form onSubmit={handleSearch} className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-red-500 transition-colors" />
            <input 
              type="text"
              placeholder="Search for movies, genres, or actors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-6 pl-16 pr-6 text-white text-xl placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-red-500/30 focus:border-red-500 transition-all shadow-2xl"
            />
            <button 
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all transform active:scale-95"
            >
              Search
            </button>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['Action', 'Sci-Fi', 'Comedy', 'Drama', 'Thriller'].map(genre => (
              <button 
                key={genre}
                onClick={() => navigate(`/movies?genre=${genre}`)}
                className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all"
              >
                {genre}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
