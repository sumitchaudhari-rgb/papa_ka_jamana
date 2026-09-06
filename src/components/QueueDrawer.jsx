import { X, Play, Pause, GripVertical, Trash2, Music2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export default function QueueDrawer() {
  const {
    queue, queueIndex, currentSong, isPlaying,
    playSong, removeFromQueue, reorderQueue,
    isQueueOpen, setIsQueueOpen,
  } = usePlayer();

  if (!isQueueOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsQueueOpen(false)}
      />

      {/* Drawer panel */}
      <div className="relative z-10 w-full max-w-sm glass-dark flex flex-col h-full border-l border-white/8">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <div>
            <h2 className="text-white font-mukta font-semibold text-base">अगले गाने</h2>
            <p className="text-white/40 text-xs font-mukta mt-0.5">{queue.length} गाने कतार में</p>
          </div>
          <button
            onClick={() => setIsQueueOpen(false)}
            className="p-2 rounded-full hover:bg-white/8 text-white/60 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Now playing */}
        {currentSong && (
          <div className="px-5 py-4 border-b border-white/8">
            <p className="text-white/30 text-xs font-mukta uppercase tracking-widest mb-3">अभी बज रहा है</p>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center"
                style={{ background: currentSong.coverGradient }}
              >
                <Music2 size={20} className="text-white/60" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white font-mukta font-semibold text-sm truncate">{currentSong.titleHindi}</p>
                <p className="text-white/50 text-xs font-mukta truncate">{currentSong.artistHindi}</p>
              </div>
              {isPlaying && (
                <div className="eq-bars flex-shrink-0">
                  {[1,2,3,4].map(i => <div key={i} className="eq-bar" style={{ animationDelay: `${i*0.13}s` }} />)}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Queue list */}
        <div className="flex-1 overflow-y-auto py-2">
          {queue.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 px-6 text-center">
              <Music2 size={40} className="text-white/15" />
              <p className="text-white/30 text-sm font-mukta">कतार खाली है</p>
              <p className="text-white/20 text-xs font-mukta">किसी गाने पर क्लिक करें</p>
            </div>
          ) : (
            queue.map((song, idx) => {
              const isCurrent = idx === queueIndex;
              return (
                <div
                  key={`${song.id}-${idx}`}
                  className={`queue-item flex items-center gap-3 px-4 py-2.5 rounded-lg mx-2 my-0.5 ${isCurrent ? 'bg-accent-violet/15 border border-accent-violet/20' : ''}`}
                >
                  {/* Index / playing indicator */}
                  <div className="w-6 text-center flex-shrink-0">
                    {isCurrent ? (
                      <div className="eq-bars mx-auto" style={{ width: '16px' }}>
                        {[1,2,3].map(i => <div key={i} className="eq-bar" style={{ animationDelay: `${i*0.15}s` }} />)}
                      </div>
                    ) : (
                      <span className="text-white/20 text-xs font-outfit">{idx + 1}</span>
                    )}
                  </div>

                  {/* Art */}
                  <div
                    className="w-10 h-10 rounded-md flex-shrink-0 flex items-center justify-center"
                    style={{ background: song.coverGradient }}
                  >
                    <Music2 size={14} className="text-white/50" />
                  </div>

                  {/* Info */}
                  <div
                    className="min-w-0 flex-1 cursor-pointer"
                    onClick={() => playSong(song, queue)}
                  >
                    <p className={`text-sm font-mukta truncate ${isCurrent ? 'text-accent-violet' : 'text-white/80'}`}>
                      {song.titleHindi}
                    </p>
                    <p className="text-white/40 text-xs font-mukta truncate">{song.artistHindi}</p>
                  </div>

                  {/* Remove */}
                  {!isCurrent && (
                    <button
                      onClick={() => removeFromQueue(idx)}
                      className="p-1.5 text-white/20 hover:text-rose-400 transition-colors flex-shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/8">
          <p className="text-white/20 text-xs font-mukta text-center">
            गानों को क्लिक करके चलाएँ
          </p>
        </div>
      </div>
    </div>
  );
}
