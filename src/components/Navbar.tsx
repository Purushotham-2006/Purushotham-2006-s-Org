import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Film, Bookmark, User, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'Watchlist', path: '/watchlist' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-12 py-4 flex items-center justify-between",
      isScrolled ? "bg-black/90 backdrop-blur-md py-3" : "bg-gradient-to-b from-black/80 to-transparent"
    )}>
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-red-600 p-1.5 rounded-lg group-hover:bg-red-500 transition-colors">
            <Film className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">CINEVERSE</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-red-500",
                location.pathname === link.path ? "text-red-500" : "text-gray-300"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-300 hover:text-white transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <Link to="/watchlist" className="p-2 text-gray-300 hover:text-white transition-colors relative">
          <Bookmark className="w-5 h-5" />
        </Link>
        <button className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-medium transition-all">
          <User className="w-4 h-4" />
          Sign In
        </button>
        
        <button 
          className="md:hidden p-2 text-gray-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black border-t border-white/10 p-4 md:hidden flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-lg font-medium py-2",
                location.pathname === link.path ? "text-red-500" : "text-gray-300"
              )}
            >
              {link.name}
            </Link>
          ))}
          <button className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-xl text-white font-bold transition-all mt-2">
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
};
