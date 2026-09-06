import { useParams, useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import { SongListItem } from '../components/SongCard';
import { Play, ArrowLeft, Trash2, Music2 } from 'lucide-react';

export default function PlaylistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allPlaylists, getPlaylistSongs, playSong, deletePlaylist } = usePlayer();

  const playlist = allPlaylists.find(p => p.id === id);
  if (!playlist) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
        <Music2 size={48} className="text-white/15" />
        <p className="text-white/30 font-mukta">प्लेलिस्ट नहीं मिली</p>
        <button onClick={() => navigate('/browse')} className="text-accent-violet font-mukta text-sm hover:text-purple-300">
          वापस जाएँ
        </button>
      </div>
    );
  }

  const songs = getPlaylistSongs(playlist);

  const handleDelete = () => {
    if (!playlist.isSystem && window.confirm('क्या आप इस प्लेलिस्ट को हटाना चाहते हैं?')) {
      deletePlaylist(playlist.id);
      navigate('/browse');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-40 px-4 md:px-8 lg:px-12 max-w-5xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mt-4 mb-6 text-sm font-mukta"
      >
        <ArrowLeft size={16} /> वापस
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 mb-8">
        <div
          className="w-44 h-44 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl"
          style={{ background: playlist.coverGradient, boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
        >
          <span className="text-6xl">{playlist.emoji}</span>
        </div>
        <div className="flex-1 min-w-0">
          {!playlist.isSystem && (
            <span className="text-white/30 text-xs font-mukta uppercase tracking-widest block mb-1">आपकी प्लेलिस्ट</span>
          )}
          {playlist.isSystem && (
            <span className="text-accent-teal text-xs font-mukta uppercase tracking-widest block mb-1">✦ क्यूरेटेड</span>
          )}
          <h1 className="font-dev-hero text-4xl md:text-5xl text-white mb-2 leading-tight">{playlist.name}</h1>
          <p className="text-white/50 font-mukta text-sm mb-1">{playlist.description}</p>
          <p className="text-white/30 font-mukta text-xs">{songs.length} गाने</p>

          <div className="flex items-center gap-3 mt-5">
            {songs.length > 0 && (
              <button
                onClick={() => playSong(songs[0], songs)}
                className="flex items-center gap-2 bg-accent-violet hover:bg-purple-500 text-white px-6 py-2.5 rounded-full text-sm font-mukta transition-all hover:scale-105 glow-violet"
              >
                <Play size={16} fill="white" />
                सभी चलाएँ
              </button>
            )}
            {!playlist.isSystem && (
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 glass hover:bg-red-900/30 border-red-900/40 text-red-400 px-4 py-2.5 rounded-full text-sm font-mukta transition-all"
              >
                <Trash2 size={14} />
                हटाएँ
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Songs */}
      {songs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Music2 size={48} className="text-white/15" />
          <p className="text-white/30 font-mukta">इस प्लेलिस्ट में कोई गाना नहीं</p>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {songs.map((song, idx) => (
            <SongListItem key={song.id} song={song} index={idx} allSongs={songs} />
          ))}
        </div>
      )}
    </div>
  );
}
