// Synthesised plucked-string sound for the awards dividers (components/ui/PluckString.jsx).
// Uses the Karplus–Strong algorithm: a short burst of noise is fed through a decaying delay line,
// which naturally sounds like a plucked string. No audio files are needed.

// Notes the strings cycle through (D3 to G4, in Hz)
const NOTES = [146.83, 164.81, 196, 220, 261.63, 293.66, 329.63, 392];

// Resonances that give the sound a hollow "guitar body"
const BODY_RESONANCES = [
  { frequency: 100, q: 1.2, gain: 0.5 },
  { frequency: 220, q: 2, gain: 0.3 },
];

const DURATION = 3.2; // seconds

let audioContext = null;
let masterGain = null;
let reverbSend = null;
let noteIndex = 0;

// Creates the audio graph once: master gain → compressor → speakers, plus a reverb send.
function getAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioContext = new AudioContextClass();

    masterGain = audioContext.createGain();
    masterGain.gain.value = 1;

    const compressor = audioContext.createDynamicsCompressor();
    compressor.threshold.value = -14;
    compressor.knee.value = 12;
    compressor.ratio.value = 4;
    compressor.attack.value = 0.006;
    compressor.release.value = 0.22;
    masterGain.connect(compressor);
    compressor.connect(audioContext.destination);

    // Short synthetic room reverb: decaying white noise as the impulse response
    const length = Math.floor(2.2 * audioContext.sampleRate);
    const impulse = audioContext.createBuffer(2, length, audioContext.sampleRate);
    for (let channel = 0; channel < 2; channel += 1) {
      const data = impulse.getChannelData(channel);
      for (let i = 0; i < length; i += 1) {
        data[i] = (2 * Math.random() - 1) * Math.pow(1 - i / length, 1.8);
      }
    }
    const convolver = audioContext.createConvolver();
    convolver.buffer = impulse;
    reverbSend = audioContext.createGain();
    reverbSend.gain.value = 0.42;
    reverbSend.connect(convolver);
    convolver.connect(masterGain);
  }

  // Browsers start audio suspended until a user gesture
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

// Builds the raw string waveform with Karplus–Strong
function renderString(context, frequency, strength) {
  const sampleRate = context.sampleRate;
  const period = Math.max(2, Math.floor(sampleRate / frequency));
  const totalSamples = Math.floor(DURATION * sampleRate);
  const buffer = context.createBuffer(1, totalSamples, sampleRate);
  const output = buffer.getChannelData(0);

  // Initial burst of smoothed noise; harder plucks are brighter
  const ring = new Float32Array(period);
  const brightness = 0.1 + 0.12 * strength;
  let smoothed = 0;
  for (let i = 0; i < period; i += 1) {
    smoothed += (2 * Math.random() - 1 - smoothed) * brightness;
    ring[i] = smoothed * Math.min(1, i / (0.4 * period));
  }

  // Loop the burst through a low-pass filtered, decaying delay line
  const decay = 0.996 - (1 - strength) * 0.003;
  let position = 0;
  let previous = 0;
  for (let i = 0; i < totalSamples; i += 1) {
    const current = ring[position];
    const next = 0.75 * ((current + ring[(position + 1) % period]) * 0.5) + 0.25 * previous;
    previous = next;
    ring[position] = next * decay;
    output[i] = current;
    position = (position + 1) % period;
  }
  return buffer;
}

/**
 * Plays one plucked note. `amount` is how far the string was pulled (pixels);
 * it controls volume and brightness. Very small pulls are silent.
 */
export function playPluck(amount) {
  const context = getAudioContext();
  if (!context) return;

  const strength = Math.min(Math.abs(amount) / 60, 1);
  if (strength < 0.05) return;

  // Step to a nearby note, with a tiny random detune so repeats don't sound robotic
  noteIndex = (noteIndex + 1 + Math.floor(2 * Math.random())) % NOTES.length;
  const frequency = NOTES[noteIndex] * (1 + (2 * Math.random() - 1) * 0.004);

  const source = context.createBufferSource();
  source.buffer = renderString(context, frequency, strength);

  const lowpass = context.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 750 + 700 * strength;
  lowpass.Q.value = 0.5;

  const highpass = context.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 70;

  source.connect(lowpass);
  lowpass.connect(highpass);

  const body = context.createGain();
  body.gain.value = 1;
  highpass.connect(body);
  const resonanceNodes = BODY_RESONANCES.map(({ frequency: resonance, q, gain }) => {
    const bandpass = context.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = resonance;
    bandpass.Q.value = q;
    const resonanceGain = context.createGain();
    resonanceGain.gain.value = gain;
    highpass.connect(bandpass);
    bandpass.connect(resonanceGain);
    resonanceGain.connect(body);
    return [bandpass, resonanceGain];
  });

  // Volume envelope: quick attack, gentle fade
  const envelope = context.createGain();
  const peak = 0.16 + 0.34 * strength;
  const now = context.currentTime;
  envelope.gain.setValueAtTime(1e-4, now);
  envelope.gain.exponentialRampToValueAtTime(peak, now + 0.025);
  envelope.gain.exponentialRampToValueAtTime(0.45 * peak, now + 0.6);
  envelope.gain.exponentialRampToValueAtTime(1e-4, now + DURATION);
  body.connect(envelope);

  // Random stereo position
  const panner = context.createStereoPanner?.();
  if (panner) {
    panner.pan.value = (2 * Math.random() - 1) * 0.35;
    envelope.connect(panner);
    panner.connect(masterGain);
    panner.connect(reverbSend);
  } else {
    envelope.connect(masterGain);
    envelope.connect(reverbSend);
  }

  source.start(now);
  source.stop(now + DURATION);
  source.onended = () => {
    [source, lowpass, highpass, body, envelope, panner, ...resonanceNodes.flat()].forEach((node) => node?.disconnect());
  };
}
