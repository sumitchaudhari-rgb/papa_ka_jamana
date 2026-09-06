import { Play, Music2, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';

export function PlaylistCard({ playlist }) {
  const { getPlaylistSongs, playSong } = usePlayer();
  const songs = getPlaylistSongs(playlist);

  const handlePlay = (e) => {
    e.preventDefault();
    if (songs.length > 0) playSong(songs[0], songs);
  };

  return (
    <Link to={`/playlist/${playlist.id}`} className="block">
      <div className="song-card glass rounded-2xl overflow-hidden group">
        {/* Gradient art */}
        <div
          className="relative aspect-square flex items-center justify-center"
          style={{ background: playlist.coverGradient }}
        >
          <span className="text-5xl">{playlist.emoji}</span>

          {/* Song count grid preview */}
          {songs.slice(0, 4).length > 0 && (
            <div className="absolute bottom-2 right-2 grid grid-cols-2 gap-0.5 w-10 h-10">
              {songs.slice(0, 4).map((s, i) => (
                <div
                  key={i}
                  className="rounded-sm"
                  style={{ background: s.coverGradient, opacity: 0.7 }}
                />
              ))}
            </div>
          )}

          {/* Play button */}
          <button
            onClick={handlePlay}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <Play size={20} className="text-white ml-0.5" fill="white" />
            </div>
          </button>

          {/* System badge */}
          {playlist.isSystem && (
            <div className="absolute top-2 right-2">
              <span className="decade-badge px-1.5 py-0.5 rounded-full text-[9px] font-outfit text-accent-teal">
                ✦ क्लासिक
              </span>
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="font-dev-body font-semibold text-sm text-white truncate">{playlist.name}</h3>
          <p className="text-white/40 text-xs font-mukta truncate mt-0.5">{playlist.description}</p>
          <p className="text-white/25 text-xs font-mukta mt-1">{songs.length} गाने</p>
        </div>
      </div>
    </Link>
  );
}

export function CreatePlaylistModal({ onClose, onConfirm }) {
  const [name, setName] = useState('');
  const emojis = ['🎵', '🎶', '🎸', '🎹', '🎺', '🎻', '🌙', '🌧️', '❤️', '🌹', '⭐', '🎤'];
  const [selectedEmoji, setSelectedEmoji] = useState('🎵');

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim()) {
      onConfirm(name.trim(), name.trim(), selectedEmoji);
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-dark rounded-2xl p-6 w-full max-w-sm z-10 border border-white/10">
        <h2 className="font-dev-body font-semibold text-white text-lg mb-4">नई प्लेलिस्ट बनाएँ</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="प्लेलिस्ट का नाम..."
            className="search-input rounded-xl px-4 py-3 text-sm font-mukta w-full"
            autoFocus
          />
          <div>
            <p className="text-white/40 text-xs font-mukta mb-2">आइकन चुनें</p>
            <div className="flex flex-wrap gap-2">
              {emojis.map(e => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setSelectedEmoji(e)}
                  className={`w-9 h-9 rounded-lg text-lg transition-all ${selectedEmoji === e ? 'bg-accent-violet/30 border border-accent-violet/60 scale-110' : 'glass hover:scale-105'}`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl glass text-white/60 text-sm font-mukta hover:bg-white/10 transition-colors"
            >
              रद्द करें
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 py-2.5 rounded-xl bg-accent-violet text-white text-sm font-mukta font-semibold hover:bg-purple-500 transition-colors disabled:opacity-40"
            >
              बनाएँ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState } from 'react';
