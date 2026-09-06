import {
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1,
  Volume2, VolumeX, ListMusic, Maximize2, Music2
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

function formatTime(sec) {
  if (!sec || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function CoverArt({ song, size = 'md' }) {
  const sizes = { sm: 'w-10 h-10', md: 'w-14 h-14', lg: 'w-20 h-20' };
  return (
    <div
      className={`${sizes[size]} rounded-lg flex-shrink-0 flex items-center justify-center relative overflow-hidden`}
      style={{ background: song?.coverGradient || 'linear-gradient(135deg, #8b7cf6, #6d5de6)' }}
    >
      {song?.coverArt ? (
        <img src={song.coverArt} alt={song.title} className="w-full h-full object-cover" />
      ) : (
        <Music2 size={size === 'sm' ? 16 : size === 'md' ? 22 : 30} className="text-white/60" />
      )}
    </div>
  );
}

export default function PlayerBar() {
  const {
    currentSong, isPlaying, progress, currentTime, duration,
    volume, isMuted, isShuffle, repeatMode,
    togglePlay, handleNext, handlePrev, seek, setVolume, toggleMute,
    toggleShuffle, cycleRepeat, setIsQueueOpen, setIsNowPlayingOpen,
  } = usePlayer();

  if (!currentSong) return null;

  const RepeatIcon = repeatMode === 'one' ? Repeat1 : Repeat;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:bottom-4 md:left-1/2 md:-translate-x-1/2 md:w-[min(900px,95vw)] md:rounded-2xl player-bar px-3 py-2 md:px-6 md:py-3">
      <div className="flex items-center gap-3 md:gap-4">

        {/* Album art + song info */}
        <button
          className="flex items-center gap-3 min-w-0 flex-1 md:flex-none md:w-56 group"
          onClick={() => setIsNowPlayingOpen(true)}
        >
          <CoverArt song={currentSong} size="md" />
          <div className="min-w-0 text-left">
            <p className="text-white font-mukta font-semibold text-sm truncate group-hover:text-accent-violet transition-colors">
              {currentSong.titleHindi}
            </p>
            <p className="text-white/50 text-xs truncate font-mukta">
              {currentSong.artistHindi}
            </p>
          </div>
          {/* Eq bars when playing */}
          {isPlaying && (
            <div className="eq-bars flex-shrink-0 hidden md:flex">
              {[1,2,3,4,5].map(i => <div key={i} className="eq-bar" style={{ animationDelay: `${i*0.12}s` }} />)}
            </div>
          )}
        </button>

        {/* Center — progress + controls */}
        <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
          {/* Controls row */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={toggleShuffle}
              className={`p-1.5 rounded-full transition-all hidden md:block ${isShuffle ? 'text-accent-violet' : 'text-white/40 hover:text-white'}`}
              title="Shuffle"
            >
              <Shuffle size={16} />
            </button>

            <button
              onClick={handlePrev}
              className="p-2 text-white/70 hover:text-white transition-colors"
              title="पिछला"
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={togglePlay}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
              title={isPlaying ? 'रोकें' : 'चलाएँ'}
            >
              {isPlaying
                ? <Pause size={20} fill="#0c1829" className="text-bg-800" />
                : <Play size={20} fill="#0c1829" className="text-bg-800 ml-0.5" />
              }
            </button>

            <button
              onClick={handleNext}
              className="p-2 text-white/70 hover:text-white transition-colors"
              title="अगला"
            >
              <SkipForward size={20} />
            </button>

            <button
              onClick={cycleRepeat}
              className={`p-1.5 rounded-full transition-all hidden md:block ${repeatMode !== 'none' ? 'text-accent-violet' : 'text-white/40 hover:text-white'}`}
              title="Repeat"
            >
              <RepeatIcon size={16} />
            </button>
          </div>

          {/* Progress bar row */}
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-white/40 text-[10px] font-outfit tabular-nums w-8 text-right">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0} max={1} step={0.001}
              value={progress || 0}
              onChange={e => seek(parseFloat(e.target.value))}
              className="progress-bar flex-1"
              style={{
                background: `linear-gradient(to right, #8b7cf6 ${(progress||0)*100}%, rgba(255,255,255,0.15) ${(progress||0)*100}%)`
              }}
            />
            <span className="text-white/40 text-[10px] font-outfit tabular-nums w-8">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Volume — desktop only */}
          <div className="hidden md:flex items-center gap-2">
            <button onClick={toggleMute} className="text-white/40 hover:text-white transition-colors">
              {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>
            <input
              type="range"
              min={0} max={1} step={0.01}
              value={isMuted ? 0 : volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              className="volume-bar"
              style={{
                background: `linear-gradient(to right, #8b7cf6 ${(isMuted ? 0 : volume)*100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume)*100}%)`
              }}
            />
          </div>

          {/* Queue drawer button */}
          <button
            onClick={() => setIsQueueOpen(true)}
            className="p-2 text-white/40 hover:text-accent-violet transition-colors"
            title="Queue"
          >
            <ListMusic size={18} />
          </button>

          {/* Expand to full player */}
          <button
            onClick={() => setIsNowPlayingOpen(true)}
            className="p-2 text-white/40 hover:text-accent-violet transition-colors hidden md:block"
            title="Full player"
          >
            <Maximize2 size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
