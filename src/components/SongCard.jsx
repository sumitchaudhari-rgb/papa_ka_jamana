import { Play, Pause, Heart, Plus, Music2, ListPlus } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

function formatDuration(sec) {
  if (!sec) return '--:--';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function SongCard({ song, allSongs }) {
  const { playSong, currentSong, isPlaying, toggleLike, isLiked, addToQueue } = usePlayer();
  const isCurrent = currentSong?.id === song.id;
  const liked = isLiked(song.id);

  return (
    <div className="song-card glass rounded-2xl overflow-hidden group cursor-pointer">
      {/* Art */}
      <div
        className="relative aspect-square flex items-center justify-center"
        style={{ background: song.coverGradient }}
        onClick={() => playSong(song, allSongs || [song])}
      >
        {song.coverArt ? (
          <img src={song.coverArt} alt={song.title} className="w-full h-full object-cover" />
        ) : (
          <Music2 size={40} className="text-white/40" />
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            {isCurrent && isPlaying
              ? <Pause size={20} className="text-white" fill="white" />
              : <Play size={20} className="text-white ml-0.5" fill="white" />
            }
          </div>
        </div>

        {/* Currently playing indicator */}
        {isCurrent && (
          <div className="absolute bottom-2 right-2 eq-bars bg-black/40 p-1 rounded">
            {[1,2,3,4].map(i => <div key={i} className="eq-bar" style={{ animationDelay: `${i*0.12}s` }} />)}
          </div>
        )}

        {/* Decade badge */}
        <div className="absolute top-2 left-2">
          <span className="decade-badge px-2 py-0.5 rounded-full text-white/70 text-[10px] font-outfit">
            {song.decade}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className={`font-dev-body font-semibold text-sm truncate ${isCurrent ? 'text-accent-violet' : 'text-white'}`}>
          {song.titleHindi}
        </h3>
        <p className="text-white/50 text-xs font-mukta truncate mt-0.5">{song.artistHindi}</p>
        <p className="text-white/30 text-xs font-mukta truncate">{song.movieHindi}</p>

        {/* Actions */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-white/25 text-xs font-outfit">{formatDuration(song.duration)}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); addToQueue(song); }}
              className="p-1.5 text-white/30 hover:text-accent-teal transition-colors"
              title="कतार में जोड़ें"
            >
              <ListPlus size={15} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); toggleLike(song.id); }}
              className={`p-1.5 transition-all heart-btn ${liked ? 'liked' : 'text-white/30 hover:text-rose-400'}`}
              title={liked ? 'पसंद हटाएँ' : 'पसंद करें'}
            >
              <Heart size={15} fill={liked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SongListItem({ song, index, allSongs }) {
  const { playSong, currentSong, isPlaying, toggleLike, isLiked, addToQueue } = usePlayer();
  const isCurrent = currentSong?.id === song.id;
  const liked = isLiked(song.id);

  return (
    <div
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all hover:bg-white/5 ${isCurrent ? 'bg-accent-violet/10 border border-accent-violet/20' : ''}`}
      onClick={() => playSong(song, allSongs || [song])}
    >
      {/* Index / playing */}
      <div className="w-7 text-center flex-shrink-0">
        {isCurrent ? (
          <div className="eq-bars mx-auto" style={{ width: '18px' }}>
            {[1,2,3].map(i => <div key={i} className="eq-bar" style={{ animationDelay: `${i*0.15}s` }} />)}
          </div>
        ) : (
          <>
            <span className="text-white/25 text-xs font-outfit group-hover:hidden">{index + 1}</span>
            <Play size={14} className="text-white hidden group-hover:block mx-auto" />
          </>
        )}
      </div>

      {/* Art thumbnail */}
      <div
        className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
        style={{ background: song.coverGradient }}
      >
        {song.coverArt
          ? <img src={song.coverArt} alt="" className="w-full h-full object-cover rounded-lg" />
          : <Music2 size={16} className="text-white/40" />
        }
      </div>

      {/* Title + artist */}
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-mukta font-medium truncate ${isCurrent ? 'text-accent-violet' : 'text-white/90'}`}>
          {song.titleHindi}
        </p>
        <p className="text-white/40 text-xs font-mukta truncate">{song.artistHindi}</p>
      </div>

      {/* Movie */}
      <div className="hidden sm:block w-36 text-right">
        <p className="text-white/30 text-xs font-mukta truncate">{song.movieHindi}</p>
      </div>

      {/* Decade */}
      <span className="hidden md:block decade-badge px-2 py-0.5 rounded-full text-white/40 text-[10px] font-outfit flex-shrink-0">
        {song.decade}
      </span>

      {/* Duration */}
      <span className="text-white/30 text-xs font-outfit tabular-nums w-10 text-right flex-shrink-0">
        {formatDuration(song.duration)}
      </span>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button
          onClick={(e) => { e.stopPropagation(); addToQueue(song); }}
          className="p-1.5 text-white/30 hover:text-accent-teal transition-colors"
          title="कतार में जोड़ें"
        >
          <ListPlus size={15} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); toggleLike(song.id); }}
          className={`p-1.5 transition-all heart-btn ${liked ? 'liked' : 'text-white/30 hover:text-rose-400'}`}
        >
          <Heart size={15} fill={liked ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
}
