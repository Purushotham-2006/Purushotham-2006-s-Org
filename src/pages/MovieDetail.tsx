import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Plus, Star, Clock, Globe, Calendar, User, ChevronLeft } from 'lucide-react';
import { movieService } from '../services/movieService';
import { Movie } from '../types';
import { MovieRow } from '../components/MovieRow';
import { motion } from 'motion/react';

export const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = React.useState<Movie | null>(null);
  const [recommendations, setRecommendations] = React.useState<Movie[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      setLoading(true);
      const data = await movieService.getMovieById(id);
      if (data) {
        setMovie(data);
        const recs = await movieService.getRecommendations(id);
        setRecommendations(recs);
      }
      setLoading(false);
      window.scrollTo(0, 0);
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!movie) return <div className="text-white p-20">Movie not found</div>;

  return (
    <div className="bg-black min-h-screen">
      {/* Backdrop Section */}
      <div className="relative h-[60vh] w-full">
        <img 
          src={movie.backdropUrl} 
          alt={movie.title}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        
        <Link to="/" className="absolute top-24 left-4 md:left-12 flex items-center gap-2 text-white/70 hover:text-white transition-colors bg-black/40 backdrop-blur-md px-4 py-2 rounded-full">
          <ChevronLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-40 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-64 md:w-80 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10"
          >
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>

          {/* Info */}
          <div className="flex-1 pt-8 md:pt-20">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {movie.genre.map(g => (
                <span key={g} className="bg-white/10 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                  {g}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase italic">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-400 font-medium">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-5 h-5 fill-yellow-500" />
                <span className="text-white font-bold">{movie.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{movie.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{movie.releaseYear}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>{movie.language}</span>
              </div>
            </div>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
              {movie.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button className="bg-red-600 text-white px-10 py-4 rounded-xl font-black text-lg flex items-center gap-2 hover:bg-red-700 transition-all transform hover:scale-105 active:scale-95">
                <Play className="w-6 h-6 fill-white" />
                WATCH NOW
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white px-10 py-4 rounded-xl font-black text-lg flex items-center gap-2 hover:bg-white/20 transition-all transform hover:scale-105 active:scale-95">
                <Plus className="w-6 h-6" />
                ADD TO WATCHLIST
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div>
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Director</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-bold text-lg">{movie.director}</span>
                </div>
              </div>
              <div>
                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Top Cast</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map(c => (
                    <span key={c} className="bg-white/5 text-white px-4 py-2 rounded-lg font-medium border border-white/5">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-20 pb-20">
          <MovieRow title="Recommended For You" movies={recommendations} />
        </div>
      </div>
    </div>
  );
};
