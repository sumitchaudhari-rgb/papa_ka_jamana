import { Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import Navbar from './components/Navbar';
import PlayerBar from './components/PlayerBar';
import NowPlayingModal from './components/NowPlayingModal';
import QueueDrawer from './components/QueueDrawer';
import Home from './pages/Home';
import Browse from './pages/Browse';
import SearchResults from './pages/SearchResults';
import LikedSongs from './pages/LikedSongs';
import PlaylistDetail from './pages/PlaylistDetail';

function AppContent() {
  return (
    <div className="relative min-h-screen bg-bg-900">
      {/* Subtle background gradient orbs — always visible */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="orb orb-1" style={{ opacity: 0.07 }} />
        <div className="orb orb-2" style={{ opacity: 0.05 }} />
        <div className="orb orb-3" style={{ opacity: 0.06 }} />
      </div>

      <Navbar />

      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/liked" element={<LikedSongs />} />
          <Route path="/playlist/:id" element={<PlaylistDetail />} />
        </Routes>
      </main>

      {/* Global overlays */}
      <QueueDrawer />
      <NowPlayingModal />

      {/* Persistent player bar */}
      <PlayerBar />
    </div>
  );
}

export default function App() {
  return (
    <PlayerProvider>
      <AppContent />
    </PlayerProvider>
  );
}
