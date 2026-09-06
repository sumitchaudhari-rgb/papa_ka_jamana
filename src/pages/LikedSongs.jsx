import { usePlayer } from '../context/PlayerContext';
import { SongListItem } from '../components/SongCard';
import { Heart, Music2, Play } from 'lucide-react';

export default function LikedSongs() {
  const { getLikedSongs, allSongs, playSong } = usePlayer();
  const liked = getLikedSongs();

  return (
    <div className="min-h-screen pt-20 pb-40 px-4 md:px-8 lg:px-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-end gap-6 mb-8 mt-4">
        <div
          className="w-36 h-36 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #be185d, #9333ea)' }}
        >
          <Heart size={52} className="text-white" fill="white" />
        </div>
        <div>
          <p className="text-white/40 text-xs font-mukta uppercase tracking-widest mb-1">प्लेलिस्ट</p>
          <h1 className="font-dev-hero text-4xl md:text-5xl text-white mb-2">पसंदीदा गाने</h1>
          <p className="text-white/50 font-mukta text-sm">{liked.length} गाने</p>
          {liked.length > 0 && (
            <button
              onClick={() => playSong(liked[0], liked)}
              className="mt-4 flex items-center gap-2 bg-accent-violet hover:bg-purple-500 text-white px-6 py-2.5 rounded-full text-sm font-mukta transition-all hover:scale-105"
            >
              <Play size={16} fill="white" />
              सभी चलाएँ
            </button>
          )}
        </div>
      </div>

      {/* Songs */}
      {liked.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Heart size={52} className="text-white/15" />
          <p className="text-white/30 font-dev-body text-xl">कोई पसंदीदा गाना नहीं</p>
          <p className="text-white/20 text-sm font-mukta">गानों पर ❤️ दबाकर यहाँ जोड़ें</p>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {liked.map((song, idx) => (
            <SongListItem key={song.id} song={song} index={idx} allSongs={liked} />
          ))}
        </div>
      )}
    </div>
  );
}
