import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { MovieDetail } from './pages/MovieDetail';
import { Movies } from './pages/Movies';
import { Watchlist } from './pages/Watchlist';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </main>
        
        <footer className="bg-black border-t border-white/10 py-12 px-4 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-red-600 p-1.5 rounded-lg">
                  <span className="text-white font-black">CV</span>
                </div>
                <span className="text-2xl font-bold tracking-tighter text-white">CINEVERSE</span>
              </div>
              <p className="text-gray-500 text-sm max-w-xs text-center md:text-left">
                Your ultimate destination for discovering and tracking the best movies from around the world.
              </p>
            </div>
            
            <div className="flex gap-12">
              <div className="flex flex-col gap-4">
                <h4 className="text-white font-bold uppercase text-xs tracking-widest">Platform</h4>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Browse</a>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Trending</a>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Watchlist</a>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-white font-bold uppercase text-xs tracking-widest">Legal</h4>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy</a>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms</a>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Cookies</a>
              </div>
            </div>
            
            <div className="text-gray-500 text-sm">
              © 2026 CineVerse. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
