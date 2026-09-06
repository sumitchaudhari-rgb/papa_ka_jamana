import { Link, useLocation } from 'react-router-dom';
import { Music2, Heart, Library, Home, Search, ListMusic, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { useLiveClock } from '../hooks/useLiveClock';

const navItems = [
  { path: '/', label: 'होम', labelEn: 'Home', icon: Home },
  { path: '/browse', label: 'गाने', labelEn: 'Browse', icon: Library },
  { path: '/search', label: 'खोजें', labelEn: 'Search', icon: Search },
  { path: '/liked', label: 'पसंदीदा', labelEn: 'Liked', icon: Heart },
];

export default function Navbar() {
  const location = useLocation();
  const { greeting } = useLiveClock();
  const { likedIds } = usePlayer();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 glass-dark">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-violet to-purple-800 flex items-center justify-center glow-violet">
            <Music2 size={16} className="text-white" />
          </div>
          <span className="font-dev-hero text-lg text-white leading-none hidden sm:block">
            पापा का ज़माना
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-mukta transition-all duration-200 ${
                  active
                    ? 'bg-accent-violet/20 text-accent-violet border border-accent-violet/40'
                    : 'text-white/60 hover:text-white hover:bg-white/8'
                }`}
              >
                <Icon size={15} />
                <span>{label}</span>
                {path === '/liked' && likedIds.length > 0 && (
                  <span className="ml-1 bg-rose-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                    {likedIds.length}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: greeting */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-white/40 text-xs font-mukta">{greeting}</span>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/70 hover:text-white p-1"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="fixed top-14 left-0 right-0 z-40 glass-dark border-t border-white/8 py-3 px-4 md:hidden">
          <p className="text-white/40 text-xs font-mukta mb-3">{greeting}</p>
          {navItems.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl mb-1 text-sm font-mukta transition-all ${
                  active ? 'bg-accent-violet/20 text-accent-violet' : 'text-white/70 hover:text-white hover:bg-white/8'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Bottom mobile nav bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-dark border-t border-white/8 flex justify-around py-2"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {navItems.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-mukta transition-colors ${
                active ? 'text-accent-violet' : 'text-white/50'
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
