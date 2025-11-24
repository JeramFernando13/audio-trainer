import { useRef, useState, useCallback } from 'react';
import * as Tone from 'tone';

export const useAudioContext = () => {
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const noiseRef = useRef<Tone.Noise | null>(null);
  const filterRef = useRef<Tone.Filter | null>(null);
  const volumeRef = useRef<Tone.Volume | null>(null);
  const [volume, setVolume] = useState(-12);
  const isInitializedRef = useRef(false);

  // ✅ LAZY INITIALIZATION - chiamata solo al primo play
  const initializeAudio = useCallback(async () => {
    if (isInitializedRef.current) return;
    
    await Tone.start(); // Start AudioContext
    
    // Now create all audio nodes
    volumeRef.current = new Tone.Volume(volume).toDestination();
    synthRef.current = new Tone.PolySynth().connect(volumeRef.current);
    noiseRef.current = new Tone.Noise('pink');
    filterRef.current = new Tone.Filter(1000, 'peaking');
    filterRef.current.Q.value = 5;
    filterRef.current.gain.value = 12;
    noiseRef.current.connect(filterRef.current);
    filterRef.current.connect(volumeRef.current);
    
    isInitializedRef.current = true;
  }, [volume]);

  // Update volume quando cambia
  const updateVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (volumeRef.current) {
      volumeRef.current.volume.value = newVolume;
    }
  }, []);

  // ✅ TUTTE le funzioni play inizializzano l'audio al primo utilizzo
  
  const playNote = async (frequency: number, duration: string = '8n') => {
    await initializeAudio();
    synthRef.current?.triggerAttackRelease(frequency, duration);
  };
  
  const playChord = async (frequencies: number[], duration: string = '2n') => {
    await initializeAudio();
    synthRef.current?.triggerAttackRelease(frequencies, duration);
  };

  const playInterval = async (
    baseFreq: number, 
    semitones: number,
    mode: 'sequential' | 'harmonic' = 'sequential'
  ) => {
    await initializeAudio();
    const secondFreq = baseFreq * Math.pow(2, semitones / 12);
    
    if (mode === 'harmonic') {
      synthRef.current?.triggerAttackRelease([baseFreq, secondFreq], '1n');
    } else {
      synthRef.current?.triggerAttackRelease(baseFreq, '4n');
      setTimeout(() => {
        synthRef.current?.triggerAttackRelease(secondFreq, '4n');
      }, 600);
    }
  };

  const playFrequencyBoosted = async (frequency: number, duration: number = 3000) => {
    await initializeAudio();
    if (filterRef.current && noiseRef.current) {
      filterRef.current.frequency.value = frequency;
      noiseRef.current.start();
      setTimeout(() => {
        noiseRef.current?.stop();
      }, duration);
    }
  };

  const playSineWave = async (frequency: number, duration: number = 3000) => {
    await initializeAudio();
    const osc = new Tone.Oscillator(frequency, 'sine').toDestination();
    osc.volume.value = volume;
    osc.start();
    
    setTimeout(() => {
      osc.stop();
      osc.dispose();
    }, duration);
  };

  const playScale = async (
    intervals: number[],
    direction: 'ascending' | 'descending' = 'ascending',
    rootFreq: number = 261.63 // C4
  ) => {
    await initializeAudio();
    
    const frequencies = intervals.map(interval => rootFreq * Math.pow(2, interval / 12));
    const notesToPlay = direction === 'ascending' ? frequencies : [...frequencies].reverse();

    for (const freq of notesToPlay) {
      synthRef.current?.triggerAttackRelease(freq, '8n');
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  };

  const playRhythm = async (pattern: number[], bpm: number = 120) => {
    await initializeAudio();
    
    const beatDuration = (60 / bpm) * 1000; // ms per beat
    
    for (const note of pattern) {
      if (note === 1) {
        synthRef.current?.triggerAttackRelease(440, '16n'); // A4
      }
      await new Promise(resolve => setTimeout(resolve, beatDuration / 4));
    }
  };

  return { 
    playNote, 
    playChord, 
    playInterval, 
    playFrequencyBoosted,
    playSineWave,
    playScale,
    playRhythm,
    volume, 
    setVolume: updateVolume
  };
};