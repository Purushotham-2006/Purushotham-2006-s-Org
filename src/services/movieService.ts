import { Movie } from '../types';
import { MOVIES } from '../data';
import { supabase } from '../lib/supabase';

class MovieService {
  async getMovies(): Promise<Movie[]> {
    try {
      const { data, error } = await supabase
        .from('movies')
        .select('*');
      
      if (error || !data || data.length === 0) {
        console.log('Falling back to local movie data');
        return MOVIES;
      }
      return data as Movie[];
    } catch (err) {
      console.error('Supabase error:', err);
      return MOVIES;
    }
  }

  async getMovieById(id: string): Promise<Movie | undefined> {
    try {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error || !data) {
        return MOVIES.find(m => m.id === id);
      }
      return data as Movie;
    } catch (err) {
      return MOVIES.find(m => m.id === id);
    }
  }

  async getMoviesByGenre(genre: string): Promise<Movie[]> {
    const movies = await this.getMovies();
    return movies.filter(m => m.genre.includes(genre));
  }

  async getTrendingMovies(): Promise<Movie[]> {
    const movies = await this.getMovies();
    return movies.slice(0, 5);
  }

  async getRecommendations(movieId: string): Promise<Movie[]> {
    const movie = await this.getMovieById(movieId);
    if (!movie) return [];
    
    const allMovies = await this.getMovies();
    return allMovies.filter(m => 
      m.id !== movieId && 
      m.genre.some(g => movie.genre.includes(g))
    ).sort((a, b) => b.rating - a.rating).slice(0, 6);
  }

  async searchMovies(query: string): Promise<Movie[]> {
    const q = query.toLowerCase();
    const movies = await this.getMovies();
    return movies.filter(m => 
      m.title.toLowerCase().includes(q) || 
      m.genre.some(g => g.toLowerCase().includes(q))
    );
  }

  // Watchlist using Supabase
  async getWatchlist(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('watchlist')
        .select('movie_id');
      
      if (error) {
        // Fallback to local API if table doesn't exist yet
        const res = await fetch('/api/watchlist');
        return res.json();
      }
      return data.map(item => item.movie_id);
    } catch (err) {
      const res = await fetch('/api/watchlist');
      return res.json();
    }
  }

  async addToWatchlist(movieId: string): Promise<string[]> {
    try {
      const { error } = await supabase
        .from('watchlist')
        .insert([{ movie_id: movieId }]);
      
      if (error) throw error;
      return this.getWatchlist();
    } catch (err) {
      const res = await fetch('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId })
      });
      return res.json();
    }
  }

  async removeFromWatchlist(movieId: string): Promise<string[]> {
    try {
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('movie_id', movieId);
      
      if (error) throw error;
      return this.getWatchlist();
    } catch (err) {
      const res = await fetch(`/api/watchlist/${movieId}`, {
        method: 'DELETE'
      });
      return res.json();
    }
  }
}

export const movieService = new MovieService();
