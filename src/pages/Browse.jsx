import { useState, useMemo } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { SongCard } from '../components/SongCard';
import { SongListItem } from '../components/SongCard';
import { PlaylistCard, CreatePlaylistModal } from '../components/PlaylistCard';
import SearchBar from '../components/SearchBar';
import { LayoutGrid, List, Plus, Music2 } from 'lucide-react';

const DECADES = ['सभी', '1950s', '1960s', '1970s', '1980s', '1990s'];
const MOODS = [
  { key: 'all', label: 'सभी' },
  { key: 'romantic', label: 'रोमांटिक' },
  { key: 'sad', label: 'दर्द भरे' },
  { key: 'happy', label: 'खुशनुमा' },
  { key: 'ghazal', label: 'ग़ज़ल' },
  { key: 'patriotic', label: 'देशभक्ति' },
  { key: 'retro', label: 'रेट्रो' },
  { key: 'classic', label: 'क्लासिक' },
];

const SORT_OPTIONS = [
  { key: 'default', label: 'डिफ़ॉल्ट' },
  { key: 'year_asc', label: 'पुराने पहले' },
  { key: 'year_desc', label: 'नए पहले' },
  { key: 'title', label: 'नाम से' },
  { key: 'artist', label: 'कलाकार से' },
];

export default function Browse() {
  const { allSongs, allPlaylists, createPlaylist } = usePlayer();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDecade, setSelectedDecade] = useState('सभी');
  const [selectedMood, setSelectedMood] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [activeTab, setActiveTab] = useState('songs'); // 'songs' | 'playlists'
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredSongs = useMemo(() => {
    let songs = [...allSongs];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      songs = songs.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.titleHindi.includes(searchQuery) ||
        s.artist.toLowerCase().includes(q) ||
        s.artistHindi.includes(searchQuery) ||
        s.movieHindi.includes(searchQuery)
      );
    }

    if (selectedDecade !== 'सभी') {
      songs = songs.filter(s => s.decade === selectedDecade);
    }

    if (selectedMood !== 'all') {
      songs = songs.filter(s => s.mood.includes(selectedMood));
    }

    switch (sortBy) {
      case 'year_asc': songs.sort((a, b) => a.year - b.year); break;
      case 'year_desc': songs.sort((a, b) => b.year - a.year); break;
      case 'title': songs.sort((a, b) => a.titleHindi.localeCompare(b.titleHindi, 'hi')); break;
      case 'artist': songs.sort((a, b) => a.artistHindi.localeCompare(b.artistHindi, 'hi')); break;
      default: break;
    }

    return songs;
  }, [allSongs, searchQuery, selectedDecade, selectedMood, sortBy]);

  function handleCreatePlaylist(name, nameEn, emoji) {
    createPlaylist(name, nameEn, emoji);
  }

  return (
    <div className="min-h-screen pt-20 pb-40 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-dev-hero text-4xl md:text-5xl text-white mb-2">
          संगीत खोजें
        </h1>
        <p className="text-white/40 font-mukta text-sm">पुरानी यादों का ख़ज़ाना</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Tab row */}
      <div className="flex items-center gap-4 mb-6 border-b border-white/8 pb-4">
        {[
          { key: 'songs', label: `गाने (${allSongs.length})` },
          { key: 'playlists', label: `प्लेलिस्ट (${allPlaylists.length})` },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`text-sm font-mukta pb-3 -mb-4 border-b-2 transition-all ${
              activeTab === key
                ? 'text-accent-violet border-accent-violet'
                : 'text-white/40 border-transparent hover:text-white/70'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'songs' && (
        <>
          {/* Filters row */}
          <div className="flex flex-col gap-3 mb-6">
            {/* Decade chips */}
            <div className="chips-scroll flex gap-2">
              {DECADES.map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDecade(d)}
                  className={`filter-chip flex-shrink-0 px-4 py-1.5 rounded-full border text-xs font-mukta transition-all ${
                    selectedDecade === d
                      ? 'active border-accent-violet/60 text-accent-violet bg-accent-violet/20'
                      : 'border-white/15 text-white/50'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Mood chips */}
            <div className="chips-scroll flex gap-2">
              {MOODS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setSelectedMood(key)}
                  className={`filter-chip flex-shrink-0 px-4 py-1.5 rounded-full border text-xs font-mukta transition-all ${
                    selectedMood === key
                      ? 'active border-accent-teal/60 text-accent-teal bg-accent-teal/20'
                      : 'border-white/15 text-white/50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort + View toggle */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="text-white/30 text-xs font-mukta">{filteredSongs.length} गाने</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-transparent border border-white/15 text-white/60 text-xs rounded-lg px-3 py-1.5 font-mukta focus:outline-none focus:border-accent-violet"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.key} value={o.key} className="bg-bg-800">{o.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1 glass rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white/15 text-white' : 'text-white/30 hover:text-white'}`}
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white/15 text-white' : 'text-white/30 hover:text-white'}`}
              >
                <List size={15} />
              </button>
            </div>
          </div>

          {/* Songs */}
          {filteredSongs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Music2 size={48} className="text-white/15" />
              <p className="text-white/30 font-mukta">कोई गाना नहीं मिला</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedDecade('सभी'); setSelectedMood('all'); }}
                className="text-accent-violet text-sm font-mukta hover:text-purple-300 transition-colors"
              >
                फ़िल्टर हटाएँ
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredSongs.map(song => (
                <SongCard key={song.id} song={song} allSongs={filteredSongs} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {filteredSongs.map((song, idx) => (
                <SongListItem key={song.id} song={song} index={idx} allSongs={filteredSongs} />
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'playlists' && (
        <>
          {/* Create playlist button */}
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-accent-violet/20 hover:bg-accent-violet/30 border border-accent-violet/40 text-accent-violet px-4 py-2 rounded-xl text-sm font-mukta transition-all"
            >
              <Plus size={15} />
              प्लेलिस्ट बनाएँ
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allPlaylists.map(pl => (
              <PlaylistCard key={pl.id} playlist={pl} />
            ))}
          </div>
        </>
      )}

      {showCreateModal && (
        <CreatePlaylistModal
          onClose={() => setShowCreateModal(false)}
          onConfirm={handleCreatePlaylist}
        />
      )}
    </div>
  );
}
