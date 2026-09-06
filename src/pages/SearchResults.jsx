import { useState, useMemo } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { SongListItem } from '../components/SongCard';
import SearchBar from '../components/SearchBar';
import { Music2 } from 'lucide-react';

export default function SearchResults() {
  const { allSongs } = usePlayer();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allSongs.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.titleHindi.includes(query) ||
      s.artist.toLowerCase().includes(q) ||
      s.artistHindi.includes(query) ||
      s.movie.toLowerCase().includes(q) ||
      s.movieHindi.includes(query) ||
      s.decade.includes(query)
    );
  }, [allSongs, query]);

  // Suggested searches
  const suggestions = ['किशोर कुमार', 'लता मंगेशकर', 'रफ़ी', 'जगजीत', '1960s', 'romantic', 'ghazal'];

  return (
    <div className="min-h-screen pt-20 pb-40 px-4 md:px-8 lg:px-12 max-w-5xl mx-auto">
      <h1 className="font-dev-hero text-4xl text-white mb-2 mt-4">खोजें</h1>
      <p className="text-white/40 font-mukta text-sm mb-6">गाना, कलाकार, या फ़िल्म</p>

      <SearchBar value={query} onChange={setQuery} />

      {!query && (
        <div className="mt-10">
          <p className="text-white/30 text-xs font-mukta uppercase tracking-widest mb-4">सुझाव</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="px-4 py-2 glass rounded-xl text-sm font-mukta text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Decorative mood banners */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'रोमांटिक गाने', emoji: '❤️', gradient: 'linear-gradient(135deg, #6b1a3a, #b42d6e)' },
              { label: '60s क्लासिक', emoji: '📻', gradient: 'linear-gradient(135deg, #4a2d6b, #8b4db8)' },
              { label: 'ग़ज़लें', emoji: '🎸', gradient: 'linear-gradient(135deg, #1a3a2d, #2d7a56)' },
              { label: 'दर्द भरे गाने', emoji: '🌧️', gradient: 'linear-gradient(135deg, #1a2d4a, #2d5080)' },
              { label: 'किशोर दा', emoji: '🎤', gradient: 'linear-gradient(135deg, #1a4a6b, #2d8ab4)' },
              { label: 'देशभक्ति', emoji: '🇮🇳', gradient: 'linear-gradient(135deg, #6b4a1a, #c48b1e)' },
            ].map(({ label, emoji, gradient }) => (
              <button
                key={label}
                onClick={() => setQuery(label)}
                className="relative rounded-2xl overflow-hidden h-20 group text-left"
                style={{ background: gradient }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="relative z-10 p-4 flex items-center gap-3 h-full">
                  <span className="text-2xl">{emoji}</span>
                  <span className="font-dev-body text-white font-semibold text-sm">{label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {query && (
        <div className="mt-6">
          <p className="text-white/40 text-sm font-mukta mb-4">
            "{query}" के लिए {results.length} परिणाम
          </p>
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Music2 size={48} className="text-white/15" />
              <p className="text-white/30 font-mukta">कोई गाना नहीं मिला</p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {results.map((song, idx) => (
                <SongListItem key={song.id} song={song} index={idx} allSongs={results} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
