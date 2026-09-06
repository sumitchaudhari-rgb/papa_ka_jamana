import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import songsData from '../data/songs.json';
import playlistsData from '../data/playlists.json';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const player = useAudioPlayer();

  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isNowPlayingOpen, setIsNowPlayingOpen] = useState(false);

  // Liked songs from localStorage
  const [likedIds, setLikedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pkz_liked') || '[]');
    } catch { return []; }
  });

  // Custom user playlists
  const [userPlaylists, setUserPlaylists] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pkz_playlists') || '[]');
    } catch { return []; }
  });

  // Recently played
  const [recentlyPlayed, setRecentlyPlayed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pkz_recent') || '[]');
    } catch { return []; }
  });

  // All songs
  const allSongs = songsData;
  const systemPlaylists = playlistsData;

  // Persist liked songs
  useEffect(() => {
    localStorage.setItem('pkz_liked', JSON.stringify(likedIds));
  }, [likedIds]);

  // Persist user playlists
  useEffect(() => {
    localStorage.setItem('pkz_playlists', JSON.stringify(userPlaylists));
  }, [userPlaylists]);

  // Persist recently played
  useEffect(() => {
    localStorage.setItem('pkz_recent', JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  // Track current song changes → add to recently played
  useEffect(() => {
    if (player.currentSong) {
      setRecentlyPlayed(prev => {
        const filtered = prev.filter(id => id !== player.currentSong.id);
        return [player.currentSong.id, ...filtered].slice(0, 20);
      });
    }
  }, [player.currentSong?.id]);

  const toggleLike = useCallback((songId) => {
    setLikedIds(prev =>
      prev.includes(songId) ? prev.filter(id => id !== songId) : [...prev, songId]
    );
  }, []);

  const isLiked = useCallback((songId) => likedIds.includes(songId), [likedIds]);

  const getLikedSongs = useCallback(() =>
    allSongs.filter(s => likedIds.includes(s.id)), [allSongs, likedIds]);

  const createPlaylist = useCallback((name, nameEn, emoji = '🎵') => {
    const pl = {
      id: `user-${Date.now()}`,
      name, nameEn, emoji,
      description: 'मेरी पसंद के गाने',
      coverGradient: 'linear-gradient(135deg, #8b7cf6, #14b8a6)',
      songIds: [],
      isSystem: false,
    };
    setUserPlaylists(prev => [...prev, pl]);
    return pl;
  }, []);

  const addToPlaylist = useCallback((playlistId, songId) => {
    setUserPlaylists(prev => prev.map(pl =>
      pl.id === playlistId && !pl.songIds.includes(songId)
        ? { ...pl, songIds: [...pl.songIds, songId] }
        : pl
    ));
  }, []);

  const removeFromPlaylist = useCallback((playlistId, songId) => {
    setUserPlaylists(prev => prev.map(pl =>
      pl.id === playlistId
        ? { ...pl, songIds: pl.songIds.filter(id => id !== songId) }
        : pl
    ));
  }, []);

  const deletePlaylist = useCallback((playlistId) => {
    setUserPlaylists(prev => prev.filter(pl => pl.id !== playlistId));
  }, []);

  const getPlaylistSongs = useCallback((playlist) =>
    allSongs.filter(s => playlist.songIds.includes(s.id)), [allSongs]);

  const allPlaylists = [...systemPlaylists, ...userPlaylists];

  return (
    <PlayerContext.Provider value={{
      ...player,
      allSongs,
      allPlaylists,
      systemPlaylists,
      userPlaylists,
      recentlyPlayed,
      likedIds,
      toggleLike,
      isLiked,
      getLikedSongs,
      createPlaylist,
      addToPlaylist,
      removeFromPlaylist,
      deletePlaylist,
      getPlaylistSongs,
      isQueueOpen,
      setIsQueueOpen,
      isNowPlayingOpen,
      setIsNowPlayingOpen,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
}
