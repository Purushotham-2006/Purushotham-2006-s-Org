import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Play, Info, Plus, Check } from 'lucide-react';
import { Movie } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { movieService } from '../services/movieService';

interface MovieCardProps {
  movie: Movie;
  variant?: 'default' | 'large';
}

export const MovieCard = ({ movie, variant = 'default' }: MovieCardProps) => {
  const [isInWatchlist, setIsInWatchlist] = React.useState(false);

  const handleWatchlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWatchlist) {
      await movieService.removeFromWatchlist(movie.id);
    } else {
      await movieService.addToWatchlist(movie.id);
    }
    setIsInWatchlist(!isInWatchlist);
  };

  return (
    <Link 
      to={`/movie/${movie.id}`}
      className={cn(
        "group relative block overflow-hidden rounded-xl transition-all duration-500",
        variant === 'large' ? "aspect-[2/3] w-64" : "aspect-[2/3] w-44 md:w-52"
      )}
    >
      <img 
        src={movie.posterUrl} 
        alt={movie.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-bold text-white">{movie.rating}</span>
          </div>
          <h3 className="text-lg font-bold text-white leading-tight mb-2">{movie.title}</h3>
          
          <div className="flex items-center gap-2">
            <button className="flex-1 bg-white text-black py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors">
              <Play className="w-3 h-3 fill-black" />
              Watch
            </button>
            <button 
              onClick={handleWatchlist}
              className="p-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/30 transition-colors"
            >
              {isInWatchlist ? <Check className="w-4 h-4 text-green-400" /> : <Plus className="w-4 h-4 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Rating Badge (Visible always) */}
      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1">
        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
        <span className="text-[10px] font-bold text-white">{movie.rating}</span>
      </div>
    </Link>
  );
};
