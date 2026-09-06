/**
 * audioSynth.js — Generates soothing retro melodic audio tones using Web Audio API.
 * This provides ambient playback when real audio URLs are not available,
 * so the UI/player logic can be fully demoed end-to-end.
 *
 * Each song has a "raagBase" field and "tempo" that this synth uses to
 * generate a gentle, atmospheric rendition of that raga's scale.
 */

const RAAG_SCALES = {
  yaman:    [0, 2, 4, 6, 7, 9, 11],    // Kalyan thaat — slightly dreamlike
  bhairavi: [0, 1, 3, 5, 7, 8, 10],   // All-komal — deeply emotive, melancholic
  kafi:     [0, 2, 3, 5, 7, 9, 10],   // Morning/evening — nostalgic
  khamaj:   [0, 2, 4, 5, 7, 9, 10],   // Romantic, light classical
  desh:     [0, 2, 4, 5, 7, 9, 11],   // Patriotic, peaceful
  pahadi:   [0, 2, 4, 7, 9],          // Folk, mountainous, open
};

// Simple melodic pattern — ascending & descending with rests
const MELODY_PATTERNS = [
  [0, 2, 4, 2, 0, -1, 4, 5, 4, 2],   // gentle rise-fall
  [0, 4, 2, 5, 4, 2, 0, -1, 0, 2],   // flowing
  [2, 4, 5, 4, 2, 0, 2, 4, 5, 7],    // ascending mood
  [4, 2, 0, 2, 4, 5, 4, 2, 0, -1],   // descending, sad
];

let _ctx = null;

function getCtx() {
  if (!_ctx || _ctx.state === 'closed') {
    _ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (_ctx.state === 'suspended') {
    _ctx.resume();
  }
  return _ctx;
}

/**
 * Creates a master gain + reverb chain for the synth.
 */
function createReverb(ctx) {
  const convolver = ctx.createConvolver();
  const length = ctx.sampleRate * 2.5;
  const impulse = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const ch = impulse.getChannelData(c);
    for (let i = 0; i < length; i++) {
      ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.5);
    }
  }
  convolver.buffer = impulse;
  return convolver;
}

/**
 * Plays a single note using a sitar-like plucked tone.
 */
function playNote(ctx, dest, freq, startTime, duration, gainVal = 0.18) {
  if (freq <= 0) return; // rest

  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  // Sitar-like: sawtooth + slight detuning
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(freq, startTime);
  // Slight pitch bend for sitar feel
  osc.frequency.exponentialRampToValueAtTime(freq * 1.003, startTime + 0.02);
  osc.frequency.exponentialRampToValueAtTime(freq, startTime + 0.1);

  // Envelope: sharp attack, slow decay
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(gainVal, startTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.9);

  // Warm filter
  filter.type = 'lowpass';
  filter.frequency.value = 2200;
  filter.Q.value = 0.8;

  osc.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(dest);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

/**
 * Plays a soft tanpura drone (root + fifth).
 */
function playDrone(ctx, dest, rootFreq, duration) {
  const drone = (freq, gain) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(gain, ctx.currentTime + 1.0);
    g.gain.setValueAtTime(gain, ctx.currentTime + duration - 1.0);
    g.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
    osc.connect(g);
    g.connect(dest);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  };
  drone(rootFreq / 2, 0.06);      // Sub-root
  drone(rootFreq, 0.05);           // Root
  drone(rootFreq * 1.5, 0.04);    // Fifth
  drone(rootFreq * 2, 0.03);      // Octave
}

/**
 * Main function: generate and play a soothing raga-based ambient melody.
 * Returns an object with a `stop()` method to silence playback.
 */
export function synthPlay(song) {
  const ctx = getCtx();
  const masterGain = ctx.createGain();
  masterGain.gain.value = 0.7;

  let reverb;
  try {
    reverb = createReverb(ctx);
    reverb.connect(masterGain);
  } catch {
    reverb = masterGain; // fallback: no reverb
  }
  masterGain.connect(ctx.destination);

  const scale = RAAG_SCALES[song.raagBase] || RAAG_SCALES.yaman;
  const tempo = song.tempo || 72;
  const beatDuration = 60 / tempo;

  // Root frequency — Sa in C3 area, slightly varied per song id
  const baseFreq = 130.81 * Math.pow(2, (parseInt(song.id, 10) % 4) * 0.25);

  // Tanpura drone
  playDrone(ctx, reverb, baseFreq, 30);

  // Melodic pattern — loop for ~30 seconds
  const pattern = MELODY_PATTERNS[parseInt(song.id, 10) % MELODY_PATTERNS.length];
  let t = ctx.currentTime + 0.5;
  const totalDuration = 30;
  const endTime = ctx.currentTime + totalDuration;

  while (t < endTime) {
    for (let i = 0; i < pattern.length && t < endTime; i++) {
      const scaleIndex = pattern[i];
      if (scaleIndex === -1) {
        // rest
        t += beatDuration * 1.5;
        continue;
      }
      const semitone = scale[Math.abs(scaleIndex) % scale.length];
      const octaveMult = scaleIndex >= scale.length ? 2 : 1;
      const freq = baseFreq * octaveMult * Math.pow(2, semitone / 12);
      const noteDuration = beatDuration * (i % 3 === 0 ? 1.5 : 1.0);
      playNote(ctx, reverb, freq, t, noteDuration);
      t += beatDuration * 0.85;
    }
    // Small pause between pattern repeats
    t += beatDuration * 2;
  }

  let stopped = false;
  return {
    stop() {
      if (stopped) return;
      stopped = true;
      masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
    },
    context: ctx,
  };
}

export function resumeContext() {
  if (_ctx && _ctx.state === 'suspended') {
    _ctx.resume();
  }
}
