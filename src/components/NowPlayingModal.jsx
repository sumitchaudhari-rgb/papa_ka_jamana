import { X, Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1, Volume2, VolumeX, Heart, Music2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

function formatTime(sec) {
  if (!sec || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// Vinyl record component with spinning animation
function VinylRecord({ song, isPlaying }) {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
      {/* Outer vinyl disc */}
      <div
        className={`vinyl-disc w-full h-full ${isPlaying ? 'animate-spin-slow' : ''}`}
      >
        {/* Inner label */}
        <div className="vinyl-label" style={{ background: song?.coverGradient }}>
          <div className="text-center p-2">
            <Music2 size={20} className="text-white/70 mx-auto mb-1" />
            <p className="text-white/60 text-[8px] font-dev-hero leading-tight">{song?.titleHindi?.slice(0, 12)}</p>
          </div>
        </div>
      </div>

      {/* Tonearm */}
      <div
        className={`absolute top-0 right-0 w-24 h-36 tonearm ${isPlaying ? 'playing' : 'paused'}`}
        style={{ transformOrigin: 'top right' }}
      >
        <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Pivot point */}
          <circle cx="72" cy="8" r="6" fill="#888" stroke="#aaa" strokeWidth="1" />
          <circle cx="72" cy="8" r="3" fill="#555" />
          {/* Arm */}
          <path d="M 72 14 Q 60 40 30 100" stroke="#999" strokeWidth="3" strokeLinecap="round" />
          {/* Head shell */}
          <path d="M 26 98 L 34 102 L 36 110 L 24 106 Z" fill="#777" />
          {/* Needle */}
          <line x1="30" y1="108" x2="30" y2="115" stroke="#ccc" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Center spindle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gray-600 border border-gray-500 z-10" />
    </div>
  );
}

export default function NowPlayingModal() {
  const {
    currentSong, isPlaying, progress, currentTime, duration,
    volume, isMuted, isShuffle, repeatMode,
    togglePlay, handleNext, handlePrev, seek, setVolume, toggleMute,
    toggleShuffle, cycleRepeat,
    isLiked, toggleLike,
    isNowPlayingOpen, setIsNowPlayingOpen,
  } = usePlayer();

  if (!isNowPlayingOpen || !currentSong) return null;

  const RepeatIcon = repeatMode === 'one' ? Repeat1 : Repeat;

  return (
    <div className="fixed inset-0 z-[100] modal-backdrop flex flex-col">
      {/* Ambient glow from song color */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ background: currentSong.coverGradient }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 z-10">
        <button
          onClick={() => setIsNowPlayingOpen(false)}
          className="p-2 rounded-full glass text-white/70 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        <div className="text-center">
          <p className="text-white/40 text-xs font-mukta uppercase tracking-widest">अभी बज रहा है</p>
        </div>
        <button
          onClick={() => toggleLike(currentSong.id)}
          className={`p-2 rounded-full glass transition-all heart-btn ${isLiked(currentSong.id) ? 'liked' : 'text-white/40 hover:text-white'}`}
        >
          <Heart size={20} fill={isLiked(currentSong.id) ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Vinyl Record */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 z-10 gap-8">
        <VinylRecord song={currentSong} isPlaying={isPlaying} />

        {/* Song info */}
        <div className="text-center">
          <h2 className="font-dev-hero text-3xl md:text-4xl text-white mb-1" style={{ textShadow: '0 0 30px rgba(139,124,246,0.5)' }}>
            {currentSong.titleHindi}
          </h2>
          <p className="font-mukta text-white/60 text-lg">{currentSong.artistHindi}</p>
          <p className="font-mukta text-white/30 text-sm mt-1">
            {currentSong.movieHindi} · {currentSong.year}
          </p>
        </div>

        {/* Progress */}
        <div className="w-full max-w-md flex flex-col gap-2">
          <input
            type="range"
            min={0} max={1} step={0.001}
            value={progress || 0}
            onChange={e => seek(parseFloat(e.target.value))}
            className="progress-bar"
            style={{
              background: `linear-gradient(to right, #8b7cf6 ${(progress||0)*100}%, rgba(255,255,255,0.15) ${(progress||0)*100}%)`
            }}
          />
          <div className="flex justify-between text-white/40 text-xs font-outfit tabular-nums">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button onClick={toggleShuffle} className={`transition-colors ${isShuffle ? 'text-accent-violet' : 'text-white/30 hover:text-white'}`}>
            <Shuffle size={20} />
          </button>
          <button onClick={handlePrev} className="text-white/70 hover:text-white transition-colors">
            <SkipBack size={28} />
          </button>
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform shadow-xl glow-violet"
          >
            {isPlaying
              ? <Pause size={28} fill="#0c1829" className="text-bg-800" />
              : <Play size={28} fill="#0c1829" className="text-bg-800 ml-1" />
            }
          </button>
          <button onClick={handleNext} className="text-white/70 hover:text-white transition-colors">
            <SkipForward size={28} />
          </button>
          <button onClick={cycleRepeat} className={`transition-colors ${repeatMode !== 'none' ? 'text-accent-violet' : 'text-white/30 hover:text-white'}`}>
            <RepeatIcon size={20} />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3 w-full max-w-xs">
          <button onClick={toggleMute} className="text-white/40 hover:text-white transition-colors">
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input
            type="range"
            min={0} max={1} step={0.01}
            value={isMuted ? 0 : volume}
            onChange={e => setVolume(parseFloat(e.target.value))}
            className="volume-bar flex-1"
            style={{
              background: `linear-gradient(to right, #8b7cf6 ${(isMuted?0:volume)*100}%, rgba(255,255,255,0.2) ${(isMuted?0:volume)*100}%)`
            }}
          />
        </div>

        {/* Mood tags */}
        <div className="flex gap-2 flex-wrap justify-center">
          {currentSong.moodHindi?.map(mood => (
            <span key={mood} className="decade-badge px-3 py-1 rounded-full text-accent-violet text-xs font-mukta">{mood}</span>
          ))}
          <span className="decade-badge px-3 py-1 rounded-full text-white/40 text-xs font-mukta">{currentSong.decade}</span>
        </div>
      </div>
    </div>
  );
}
