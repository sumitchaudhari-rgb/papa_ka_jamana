/* ==========================================================================
   SONGSWALA - Retro Barber Shop Radio Player Application (Local MP3 Version)
   ========================================================================== */

// Curated List of Classic Hindi Songs
let PLAYLIST = [
  {
    id: 0,
    title: "Aa Chal Ke Tujhe (आ चल के तुझे)",
    artist: "Kishore Kumar",
    audioUrl: "songs/Aa_Chal_Ke_Tujhe(0).mp3",
    coverUrl: "assets/cover_aa_chal_ke_tujhe.jpg"
  },
  {
    id: 1,
    title: "Aaj Kal Tere Mere Pyar Ke Charche",
    artist: "Mohd. Rafi",
    audioUrl: "songs/Aaj_Kal_Tere_Mere_Pyar_Ke_Charche_-_Mohd.Rafi___Shammi_Kapoor,_Mumtaz___Brahmachari(0).mp3",
    coverUrl: "assets/cover_aaj_kal.jpg"
  },
  {
    id: 2,
    title: "Chura Liya Hai Tumne Jo Dil Ko",
    artist: "Asha Bhosle & Mohammed Rafi",
    audioUrl: "songs/Chura_Liya_Hai_Tumne_Jo_Dil_Ko___Asha_Bhosle___Mohammed_Rafi___Yaadon_Ki_Baaraat___Evergreen_Song(0).mp3",
    coverUrl: "assets/cover_chura_liya.jpg"
  },
  {
    id: 3,
    title: "Ek Main Aur Ek Tu (एक मैं और एक तू)",
    artist: "Kishore Kumar",
    audioUrl: "songs/Ek_Main_Aur_Ek_Tu(0).mp3",
    coverUrl: "assets/cover_ek_main.jpg"
  },
  {
    id: 4,
    title: "Hum Tere Pyar Mein Sara Aalam",
    artist: "Lata Mangeshkar",
    audioUrl: "songs/Hum_Tere_Pyar_Mein_Sara_Aalam__4k____Dil_Ek_Mandir___Lata_Mangeshkar_Romantic_Song___Romantic_Song(0).mp3",
    coverUrl: "assets/cover_hum_tere_sara_aalam.jpg"
  },
  {
    id: 5,
    title: "In Aankhon Ki Masti Ke",
    artist: "Asha Bhosle",
    audioUrl: "songs/In_Akhon_Ki_Masti_Ke___Asha_Bhosle___Lyrical_Video___Rekha_Songs___Umrao_Jaan___Ghazal_Romantic(0).mp3",
    coverUrl: "assets/cover_in_aankhon.jpg"
  },
  {
    id: 6,
    title: "Jaane Wo Kaise Log The",
    artist: "Hemant Kumar",
    audioUrl: "songs/Jaane_Wo_Kaise_Log_The_Jinke_Pyar_Ko_Pyar_Mila_-_Hemant_Kumar_Best_Sad_Song(0).mp3",
    coverUrl: "assets/cover_jaane_wo_kaise.jpg"
  },
  {
    id: 7,
    title: "Jahan Mein Aesa Kaun Hai",
    artist: "Asha Bhosle",
    audioUrl: "songs/Jahan_Mein_Aesa_Kaun_Hai___Hum_Dono___Asha_Bhosle___Dev_Anand___Sahir_Ludhianvi___Old_Is_Gold(0).mp3",
    coverUrl: "assets/cover_jahan_mein_aesa.jpg"
  },
  {
    id: 8,
    title: "Kabhi Kabhie Mere Dil Mein",
    artist: "Mukesh",
    audioUrl: "songs/Kabhi_Kabhie_Mere_Dil_Mein_-_Amitabh_Bachchan_-_Mukesh_-_Kabhi_Kabhie_[1976](0).mp3",
    coverUrl: "assets/cover_kabhi_kabhie.jpg"
  },
  {
    id: 9,
    title: "Bahon Mein Chale Aao",
    artist: "Lata Mangeshkar",
    audioUrl: "songs/Lata_Mangeshkar___Bahon_Mein_Chale_Aao_Full_Song___Sanjeev_Kumar___Jaya_Bhaduri___70s_Old_Hindi_Song(0).mp3",
    coverUrl: "assets/cover_bahon_mein.jpg"
  },
  {
    id: 10,
    title: "Lag Ja Gale",
    artist: "Lata Mangeshkar",
    audioUrl: "songs/Lata_Mangeshkar___Lag_Ja_Gale___Old_Hindi_Sad_Song___Iconic_Bollywood_Song(0).mp3",
    coverUrl: "assets/cover_lag_ja_gale.jpg"
  },
  {
    id: 11,
    title: "Main Pal Do Pal Ka Shayar Hoon",
    artist: "Mukesh",
    audioUrl: "songs/Main_Pal_Do_Pal_Ka_Shayar_Hoon_Full_Song___Kabhi_Kabhie___Amitabh_Bachchan,_Rakhee___Mukesh,_Khayyam(0).mp3",
    coverUrl: "assets/cover_main_pal_do_pal.jpg"
  },
  {
    id: 12,
    title: "Pal Pal Dil Ke Paas",
    artist: "Kishore Kumar",
    audioUrl: "songs/Pal_Pal_Dil_Ke_Paas__4K____Black_Mail_1973___Kishore_Kumar_Romantic_Hits___Dharmendra,_Rakhee(0).mp3",
    coverUrl: "assets/cover_pal_pal_dil_ke_paas.jpg"
  },
  {
    id: 13,
    title: "Saagar Jaisi Aankhon Wali",
    artist: "Kishore Kumar",
    audioUrl: "songs/Saagar_Jaisi_Aankhon_Wali__Lyrical_Video____Kishore_Kumar___R._D._Burman___Revibe___Hindi_Songs(0).mp3",
    coverUrl: "assets/cover_saagar.jpg"
  },
  {
    id: 14,
    title: "Tera Mujhse Hai Pehle Ka Naata Koi",
    artist: "Kishore Kumar",
    audioUrl: "songs/Tera_Mujhse_Hai_Pehle_Ka_Naata_Koi___Kishore_Kumar___Aa_Gale_Lag_Jaa_1973_Songs__Sharmila_Tagore(0).mp3",
    coverUrl: "assets/cover_tera_mujhse.jpg"
  },
  {
    id: 15,
    title: "Unko Bhi Humse Mohabbat Ho Zaroori To Nahin",
    artist: "Unknown",
    audioUrl: "songs/Unko_Bhi_Humse_Mohabbat_Ho_Zaroori_To_Nahin(0).mp3",
    coverUrl: "assets/cover_unko_bhi.jpg"
  },
  {
    id: 16,
    title: "जाने कहाँ मेरा जिगर गया जी",
    artist: "Mohd. Rafi",
    audioUrl: "songs/Jane_Kahan_Mera_Jigar_Gaya_Ji(0).mp3",
    coverUrl: "assets/cover_jane_kahan.jpg"
  },
  {
    id: 17,
    title: "हम तेरे प्यार में",
    artist: "Lata Mangeshkar",
    audioUrl: "songs/Hum_Tere_Pyar_Mein_HD(0).mp3",
    coverUrl: "assets/cover_hum_tere_hd.jpg"
  },
  {
    id: 18,
    title: "होठों से छूलो तुम (Hothon Se Chhulo Tum)",
    artist: "Jagjit Singh",
    audioUrl: "songs/Hothon_Se_Chhulo_Tum(0).mp3",
    coverUrl: "assets/cover_hothon_se_chhulo_tum.jpg"
  }
];

// Audio Elements
const musicAudio = document.getElementById('music-audio');
const ambientAudio = document.getElementById('ambient-audio');

// Local audio path for Ambient Sound
const AMBIENT_AUDIO_URL = "songs/barber_ambient.mp3";

// Application State Variables
let currentTrackIndex = 0;
let isPlaying = false;
let isAmbientActive = false;
let isMuted = false;
let isUserSeeking = false;

// DOM Elements Cache
const el = {
  bgImage: document.querySelector('.bg-image'),
  liveClock: document.getElementById('live-clock'),

  vinylDisc: document.getElementById('vinyl-disc'),
  vinylArtwork: document.getElementById('vinyl-artwork'),
  vinylWrapper: document.querySelector('.vinyl-wrapper'),

  trackTitle: document.getElementById('track-title'),
  trackArtist: document.getElementById('track-artist'),
  playlistCount: document.getElementById('playlist-count'),

  progressSlider: document.getElementById('progress-slider'),
  progressBarFill: document.getElementById('progress-bar-fill'),
  timeCurrent: document.getElementById('time-current'),
  timeTotal: document.getElementById('time-total'),
  sliderWrapper: document.querySelector('.time-slider-wrapper'),

  prevBtn: document.getElementById('prev-btn'),
  playBtn: document.getElementById('play-btn'),
  nextBtn: document.getElementById('next-btn'),
  iconPlay: document.getElementById('icon-play'),
  iconPause: document.getElementById('icon-pause'),

  volumeMuteBtn: document.getElementById('volume-mute-btn'),
  volIconHigh: document.getElementById('vol-icon-high'),
  volIconMuted: document.getElementById('vol-icon-muted'),
  musicVolume: document.getElementById('music-volume'),

  ambientToggleBtn: document.getElementById('ambient-toggle-btn'),
  ambientVolume: document.getElementById('ambient-volume'),

  playlistToggleBtn: document.getElementById('playlist-toggle-btn'),
  playlistCloseBtn: document.getElementById('playlist-close-btn'),
  playlistDrawer: document.getElementById('playlist-drawer'),
  playlistItems: document.getElementById('playlist-items')
};

/* ==========================================================================
   Track Loader & Audio API Event Bindings
   ========================================================================== */
function initPlayer() {
  // 1. Initial State Config
  musicAudio.volume = el.musicVolume.value / 100;
  ambientAudio.volume = el.ambientVolume.value / 100;
  ambientAudio.src = AMBIENT_AUDIO_URL;

  // 2. Load the first track details
  if (PLAYLIST.length > 0) {
    loadTrackDetails(currentTrackIndex);
    el.playBtn.removeAttribute('disabled');
  } else {
    el.trackTitle.textContent = "कोई गाना उपलब्ध नहीं";
    el.trackArtist.textContent = "कृपया नए गाने जोड़ें";
    el.playlistCount.textContent = "0";
  }
  renderPlaylistDrawer();
}

function loadTrackDetails(index) {
  if (PLAYLIST.length === 0) return;
  const track = PLAYLIST[index];
  if (!track) return;

  // Set source path
  musicAudio.src = track.audioUrl;

  // Update texts
  el.trackTitle.textContent = track.title;
  el.trackArtist.textContent = track.artist;

  // Load Cover Art Thumbnail with standard fallbacks
  const img = new Image();
  img.src = track.coverUrl;

  img.onload = () => {
    el.vinylArtwork.src = track.coverUrl;
  };
  img.onerror = () => {
    el.vinylArtwork.src = "assets/image.png";
  };

  // Reset timeline slider positions
  el.progressSlider.value = 0;
  el.progressBarFill.style.width = "0%";
  el.sliderWrapper.style.setProperty('--slider-percent', "0%");
  el.timeCurrent.textContent = "0:00";
  el.timeTotal.textContent = "0:00";

  // Update playlist active item highlighting
  updateActivePlaylistItem(index);
}

function playTrack(index) {
  if (PLAYLIST.length === 0) return;
  currentTrackIndex = index;
  loadTrackDetails(index);

  // Play immediately
  const playPromise = musicAudio.play();
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.warn("Audio auto-playback prevented or file not found:", error);
      if (isPlaying) togglePlayUI(false);
    });
  }
}

function togglePlay() {
  if (PLAYLIST.length === 0) return;
  if (musicAudio.paused) {
    const playPromise = musicAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error("Failed to play audio:", error);
        el.trackArtist.textContent = "Check songs/ folder for MP3!";
      });
    }
  } else {
    musicAudio.pause();
  }
}

function nextTrack() {
  if (PLAYLIST.length === 0) return;
  let nextIndex = currentTrackIndex + 1;
  if (nextIndex >= PLAYLIST.length) {
    nextIndex = 0;
  }
  playTrack(nextIndex);
}

function prevTrack() {
  if (PLAYLIST.length === 0) return;
  let nextIndex = currentTrackIndex - 1;
  if (nextIndex < 0) {
    nextIndex = PLAYLIST.length - 1;
  }
  playTrack(nextIndex);
}

function togglePlayUI(playing) {
  isPlaying = playing;
  if (playing) {
    el.iconPlay.classList.add('hidden');
    el.iconPause.classList.remove('hidden');
    el.vinylDisc.classList.add('spin');
    el.vinylWrapper.classList.add('active-arm');
  } else {
    el.iconPlay.classList.remove('hidden');
    el.iconPause.classList.add('hidden');
    el.vinylDisc.classList.remove('spin');
    el.vinylWrapper.classList.remove('active-arm');
  }
}

/* ==========================================================================
   Timeline / Seeking Sync handlers
   ========================================================================== */
function handleAudioTimeUpdate() {
  if (isUserSeeking) return;

  const currentTime = musicAudio.currentTime || 0;
  const duration = musicAudio.duration || 0;

  if (duration > 0) {
    const percentage = (currentTime / duration) * 100;

    // Sync slider track fills
    el.progressSlider.value = percentage;
    el.progressBarFill.style.width = `${percentage}%`;
    el.sliderWrapper.style.setProperty('--slider-percent', `${percentage}%`);

    // Labels formatting
    el.timeCurrent.textContent = formatTime(currentTime);
    el.timeTotal.textContent = formatTime(duration);
  }
}

function handleAudioLoadedMetadata() {
  const duration = musicAudio.duration || 0;
  el.timeTotal.textContent = formatTime(duration);
}

// Convert seconds to MM:SS format
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Seek interactive gestures
function handleSeekStart() {
  isUserSeeking = true;
}

function handleSeekDrag() {
  const percentage = el.progressSlider.value;
  el.progressBarFill.style.width = `${percentage}%`;
  el.sliderWrapper.style.setProperty('--slider-percent', `${percentage}%`);

  const duration = musicAudio.duration || 0;
  const current = (percentage / 100) * duration;
  el.timeCurrent.textContent = formatTime(current);
}

function handleSeekEnd() {
  const percentage = el.progressSlider.value;
  const duration = musicAudio.duration || 0;

  if (duration > 0) {
    musicAudio.currentTime = (percentage / 100) * duration;
  }
  isUserSeeking = false;
}

// Ambient Web Audio Synthesizer (Vinyl crackle & vintage radio static fallback)
let ambientAudioCtx = null;
let ambientNoiseNode = null;
let ambientGainNode = null;

function createRadioNoise() {
  if (!ambientAudioCtx) {
    ambientAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (ambientAudioCtx.state === 'suspended') {
    ambientAudioCtx.resume();
  }

  const bufferSize = ambientAudioCtx.sampleRate * 2;
  const buffer = ambientAudioCtx.createBuffer(1, bufferSize, ambientAudioCtx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    // Warm pink noise with occasional vinyl ticks
    const white = Math.random() * 2 - 1;
    const isTick = Math.random() < 0.001;
    data[i] = (white * 0.04) + (isTick ? (Math.random() * 0.3 - 0.15) : 0);
  }

  const noise = ambientAudioCtx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const filter = ambientAudioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1200;
  filter.Q.value = 1.2;

  ambientGainNode = ambientAudioCtx.createGain();
  ambientGainNode.gain.value = (el.ambientVolume.value / 100) * 0.4;

  noise.connect(filter);
  filter.connect(ambientGainNode);
  ambientGainNode.connect(ambientAudioCtx.destination);

  noise.start(0);
  return noise;
}

function toggleAmbientSound() {
  isAmbientActive = !isAmbientActive;

  if (isAmbientActive) {
    el.ambientToggleBtn.classList.add('active');

    // Attempt real file playback first
    const playPromise = ambientAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Silently use realistic synthetic vintage radio static / vinyl crackle!
        ambientNoiseNode = createRadioNoise();
      });
    }
  } else {
    el.ambientToggleBtn.classList.remove('active');
    ambientAudio.pause();
    if (ambientNoiseNode) {
      try { ambientNoiseNode.stop(); } catch (e) { }
      ambientNoiseNode = null;
    }
  }
}

function handleAmbientVolumeChange() {
  const vol = el.ambientVolume.value / 100;
  ambientAudio.volume = vol;
  if (ambientGainNode) {
    ambientGainNode.gain.value = vol * 0.4;
  }
}

/* ==========================================================================
   Music Volume & Muting
   ========================================================================== */
function handleMusicVolumeChange() {
  const vol = el.musicVolume.value / 100;
  musicAudio.volume = vol;

  if (isMuted && vol > 0) {
    toggleMute(false);
  }
}

function toggleMute(forceState = null) {
  isMuted = forceState !== null ? forceState : !isMuted;

  if (isMuted) {
    el.volIconHigh.classList.add('hidden');
    el.volIconMuted.classList.remove('hidden');
    musicAudio.muted = true;
  } else {
    el.volIconHigh.classList.remove('hidden');
    el.volIconMuted.classList.add('hidden');
    musicAudio.muted = false;
    musicAudio.volume = el.musicVolume.value / 100;
  }
}

/* ==========================================================================
   Playlist Drawer Management
   ========================================================================== */
function renderPlaylistDrawer() {
  el.playlistItems.innerHTML = '';

  if (PLAYLIST.length === 0) {
    el.playlistItems.innerHTML = `
      <li style="padding: 2.5rem 1rem; text-align: center; color: rgba(255,255,255,0.4); font-size: 0.9rem; list-style: none;">
        <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🎵</div>
        <p style="font-weight: 600; color: rgba(255,255,255,0.8); margin-bottom: 0.25rem;">कोई गाना उपलब्ध नहीं है</p>
        <p style="font-size: 0.8rem; color: rgba(255,255,255,0.4);">नए गाने जोड़ने के लिए app.js में PLAYLIST भरें</p>
      </li>
    `;
    el.playlistCount.textContent = "0";
    return;
  }

  PLAYLIST.forEach((track, index) => {
    const li = document.createElement('li');
    li.className = `track-item ${index === currentTrackIndex ? 'active' : ''}`;
    li.dataset.index = index;

    li.innerHTML = `
      <div class="track-item-artwork">
        <img class="drawer-thumb" src="${track.coverUrl}" alt="${track.title} Cover">
      </div>
      <div class="track-item-meta">
        <div class="track-item-title">${track.title}</div>
        <div class="track-item-artist">${track.artist}</div>
      </div>
      ${index === currentTrackIndex ? `
        <div class="equalizer-icon">
          <span class="eq-bar"></span>
          <span class="eq-bar"></span>
          <span class="eq-bar"></span>
        </div>
      ` : ''}
    `;

    // Drawer thumb fallback if cover image is missing
    const img = li.querySelector('.drawer-thumb');
    img.onerror = () => {
      img.src = "assets/bg.png";
    };

    li.addEventListener('click', () => {
      playTrack(index);
      if (window.innerWidth <= 640) {
        closePlaylist();
      }
    });

    el.playlistItems.appendChild(li);
  });

  el.playlistCount.textContent = PLAYLIST.length;
}

function updateActivePlaylistItem(activeIndex) {
  const items = el.playlistItems.querySelectorAll('.track-item');
  items.forEach((item, idx) => {
    if (idx === activeIndex) {
      item.classList.add('active');
      if (!item.querySelector('.equalizer-icon')) {
        const eq = document.createElement('div');
        eq.className = 'equalizer-icon';
        eq.innerHTML = '<span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span>';
        item.appendChild(eq);
      }
    } else {
      item.classList.remove('active');
      const eq = item.querySelector('.equalizer-icon');
      if (eq) eq.remove();
    }
  });
}

function openPlaylist() {
  el.playlistDrawer.classList.add('open');
}

function closePlaylist() {
  el.playlistDrawer.classList.remove('open');
}

/* ==========================================================================
   Ambient HUD Features (Clock & simulated Counter)
   ========================================================================== */
function initHUD() {
  // 1. Digital Clock
  function updateClock() {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    el.liveClock.textContent = `${hrs}:${mins}:${secs}`;
  }
  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   Event Bindings & Audio Hook listeners
   ========================================================================== */
function bindEvents() {
  // Native Audio API Listeners
  musicAudio.addEventListener('timeupdate', handleAudioTimeUpdate);
  musicAudio.addEventListener('loadedmetadata', handleAudioLoadedMetadata);
  musicAudio.addEventListener('play', () => togglePlayUI(true));
  musicAudio.addEventListener('pause', () => togglePlayUI(false));
  musicAudio.addEventListener('ended', nextTrack);

  musicAudio.addEventListener('error', (e) => {
    console.warn("Audio file failed to load. Make sure the file exists in songs/ directory.", e);
    el.trackArtist.textContent = "Audio not found (Check songs/ folder)";
  });

  // Playback Controls
  el.playBtn.addEventListener('click', togglePlay);
  el.nextBtn.addEventListener('click', nextTrack);
  el.prevBtn.addEventListener('click', prevTrack);

  // Seek Timeline Interactions
  el.progressSlider.addEventListener('mousedown', handleSeekStart);
  el.progressSlider.addEventListener('touchstart', handleSeekStart, { passive: true });

  el.progressSlider.addEventListener('input', handleSeekDrag);

  el.progressSlider.addEventListener('mouseup', handleSeekEnd);
  el.progressSlider.addEventListener('touchend', handleSeekEnd, { passive: true });

  // Volume Controls
  el.musicVolume.addEventListener('input', handleMusicVolumeChange);
  el.volumeMuteBtn.addEventListener('click', () => toggleMute());

  // Ambient Sound controls
  el.ambientToggleBtn.addEventListener('click', toggleAmbientSound);
  el.ambientVolume.addEventListener('input', handleAmbientVolumeChange);

  // Playlist Drawer Toggles
  el.playlistToggleBtn.addEventListener('click', openPlaylist);
  el.playlistCloseBtn.addEventListener('click', closePlaylist);

  // Close playlist drawer when clicking outside it
  document.addEventListener('click', (e) => {
    if (
      el.playlistDrawer.classList.contains('open') &&
      !el.playlistDrawer.contains(e.target) &&
      !el.playlistToggleBtn.contains(e.target)
    ) {
      closePlaylist();
    }
  });
}

// Self-Initializing on DOM Content Load
document.addEventListener('DOMContentLoaded', () => {
  initPlayer();
  initHUD();
  bindEvents();
});
