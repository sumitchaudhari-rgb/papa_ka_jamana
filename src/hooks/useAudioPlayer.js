import { useState, useEffect, useRef, useCallback } from 'react';
import { synthPlay, resumeContext } from '../utils/audioSynth';

export function useAudioPlayer() {
  const audioRef = useRef(null);
  const synthRef = useRef(null);

  const [currentSong, setCurrentSong] = useState(null);
  const [queue, setQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);       // 0–1
  const [currentTime, setCurrentTime] = useState(0); // seconds
  const [duration, setDuration] = useState(0);       // seconds
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none'); // 'none' | 'all' | 'one'
  const [isLoading, setIsLoading] = useState(false);

  // Simulate playback progress for synth (no real <audio> element needed)
  const synthTimerRef = useRef(null);
  const synthStartRef = useRef(null);
  const synthPausedAtRef = useRef(0);

  const stopSynth = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.stop();
      synthRef.current = null;
    }
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  }, []);

  const startSynthTimer = useCallback((song, fromSeconds = 0) => {
    const songDuration = song.duration || 240;
    setDuration(songDuration);
    synthStartRef.current = Date.now() - fromSeconds * 1000;

    synthTimerRef.current = setInterval(() => {
      const elapsed = (Date.now() - synthStartRef.current) / 1000;
      if (elapsed >= songDuration) {
        setCurrentTime(songDuration);
        setProgress(1);
        clearInterval(synthTimerRef.current);
        // Auto-next
        handleNext();
      } else {
        setCurrentTime(elapsed);
        setProgress(elapsed / songDuration);
      }
    }, 250);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadSong = useCallback((song, autoPlay = true, startAt = 0) => {
    stopSynth();
    setCurrentSong(song);
    setCurrentTime(startAt);
    setProgress(startAt / (song.duration || 240));
    setDuration(song.duration || 240);
    setIsLoading(true);

    if (song.audioUrl) {
      // Real audio file path
      if (!audioRef.current) audioRef.current = new Audio();
      const audio = audioRef.current;
      audio.src = song.audioUrl;
      audio.volume = isMuted ? 0 : volume;
      audio.currentTime = startAt;
      if (autoPlay) {
        audio.play().catch(console.warn);
        setIsPlaying(true);
      }
    } else {
      // Synth fallback
      resumeContext();
      setIsLoading(false);
      if (autoPlay) {
        synthRef.current = synthPlay(song);
        startSynthTimer(song, startAt);
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
    setIsLoading(false);
  }, [stopSynth, startSynthTimer, isMuted, volume]);

  const handlePlay = useCallback(() => {
    if (!currentSong) return;
    resumeContext();
    if (currentSong.audioUrl && audioRef.current) {
      audioRef.current.play().catch(console.warn);
    } else {
      synthRef.current = synthPlay(currentSong);
      startSynthTimer(currentSong, synthPausedAtRef.current);
    }
    setIsPlaying(true);
  }, [currentSong, startSynthTimer]);

  const handlePause = useCallback(() => {
    synthPausedAtRef.current = currentTime;
    if (currentSong?.audioUrl && audioRef.current) {
      audioRef.current.pause();
    } else {
      stopSynth();
    }
    setIsPlaying(false);
  }, [currentSong, currentTime, stopSynth]);

  const togglePlay = useCallback(() => {
    if (isPlaying) handlePause();
    else handlePlay();
  }, [isPlaying, handlePlay, handlePause]);

  const handleNext = useCallback(() => {
    if (queue.length === 0) return;
    let nextIndex;
    if (repeatMode === 'one') {
      nextIndex = queueIndex;
    } else if (isShuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = (queueIndex + 1) % queue.length;
    }
    setQueueIndex(nextIndex);
    loadSong(queue[nextIndex], true);
  }, [queue, queueIndex, repeatMode, isShuffle, loadSong]);

  const handlePrev = useCallback(() => {
    // If more than 3 seconds in, restart; otherwise go to prev
    if (currentTime > 3) {
      setCurrentTime(0);
      setProgress(0);
      synthPausedAtRef.current = 0;
      if (isPlaying) {
        stopSynth();
        synthRef.current = synthPlay(currentSong);
        startSynthTimer(currentSong, 0);
      }
      return;
    }
    if (queue.length === 0) return;
    const prevIndex = queueIndex === 0 ? queue.length - 1 : queueIndex - 1;
    setQueueIndex(prevIndex);
    loadSong(queue[prevIndex], true);
  }, [currentTime, isPlaying, currentSong, queue, queueIndex, stopSynth, startSynthTimer, loadSong]);

  const seek = useCallback((fraction) => {
    const newTime = fraction * duration;
    synthPausedAtRef.current = newTime;
    setCurrentTime(newTime);
    setProgress(fraction);
    if (currentSong?.audioUrl && audioRef.current) {
      audioRef.current.currentTime = newTime;
    } else if (isPlaying && currentSong) {
      // Restart synth from new position
      stopSynth();
      synthRef.current = synthPlay(currentSong);
      startSynthTimer(currentSong, newTime);
    }
  }, [duration, currentSong, isPlaying, stopSynth, startSynthTimer]);

  const setVolume = useCallback((val) => {
    const v = Math.max(0, Math.min(1, val));
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
    if (v > 0) setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(m => {
      if (audioRef.current) audioRef.current.volume = m ? volume : 0;
      return !m;
    });
  }, [volume]);

  const toggleShuffle = useCallback(() => setIsShuffle(s => !s), []);

  const cycleRepeat = useCallback(() => {
    setRepeatMode(r => r === 'none' ? 'all' : r === 'all' ? 'one' : 'none');
  }, []);

  const playSong = useCallback((song, allSongs = null) => {
    const songList = allSongs || (currentSong ? queue : [song]);
    const idx = songList.findIndex(s => s.id === song.id);
    setQueue(songList);
    setQueueIndex(idx >= 0 ? idx : 0);
    loadSong(song, true);
  }, [currentSong, queue, loadSong]);

  const addToQueue = useCallback((song) => {
    setQueue(q => [...q, song]);
  }, []);

  const removeFromQueue = useCallback((idx) => {
    setQueue(q => q.filter((_, i) => i !== idx));
    if (idx < queueIndex) setQueueIndex(i => i - 1);
  }, [queueIndex]);

  const reorderQueue = useCallback((from, to) => {
    setQueue(q => {
      const arr = [...q];
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      return arr;
    });
    if (queueIndex === from) setQueueIndex(to);
    else if (from < queueIndex && to >= queueIndex) setQueueIndex(i => i - 1);
    else if (from > queueIndex && to <= queueIndex) setQueueIndex(i => i + 1);
  }, [queueIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSynth();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [stopSynth]);

  return {
    currentSong,
    queue,
    queueIndex,
    isPlaying,
    progress,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    isLoading,
    togglePlay,
    handleNext,
    handlePrev,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeat,
    playSong,
    addToQueue,
    removeFromQueue,
    reorderQueue,
    setQueue,
    setQueueIndex,
  };
}
