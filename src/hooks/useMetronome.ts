import { useState, useEffect, useRef, useCallback } from 'react';
import * as Tone from 'tone';
import { BPM_DEFAULT, VOLUME_DEFAULT } from '../data/metronome';

interface UseMetronomeProps {
  initialBpm?: number;
  initialTimeSignature?: string;
  initialVolume?: number;
}

export const useMetronome = ({
  initialBpm = BPM_DEFAULT,
  initialTimeSignature = '4/4',
  initialVolume = VOLUME_DEFAULT,
}: UseMetronomeProps = {}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(initialBpm);
  const [timeSignature, setTimeSignature] = useState(initialTimeSignature);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [volume, setVolume] = useState(initialVolume);
  const [clickSound, setClickSound] = useState('woodblock');
  const [accentFirst, setAccentFirst] = useState(true);
  const [showSubdivision, setShowSubdivision] = useState(false);
  const [subdivisionType, setSubdivisionType] = useState('quarter');

  const synthRef = useRef<Tone.Synth | null>(null);
  const loopRef = useRef<Tone.Loop | null>(null);
  const volumeNodeRef = useRef<Tone.Volume | null>(null);

  // Tap tempo
  const [tapTimes, setTapTimes] = useState<number[]>([]);
  const tapTimeoutRef = useRef<number | null>(null);

  // Parse time signature
  const [beatsPerBar, noteValue] = timeSignature.split('/').map(Number);

  // Get click sound frequencies based on type
  const getClickFrequencies = useCallback((isAccent: boolean) => {
    switch (clickSound) {
      case 'woodblock':
        return isAccent ? 1200 : 800;
      case 'beep':
        return isAccent ? 1000 : 600;
      case 'click':
        return isAccent ? 2000 : 1500;
      case 'cowbell':
        return isAccent ? 800 : 540;
      case 'rim':
        return isAccent ? 3000 : 2500;
      case 'clap':
        return isAccent ? 1500 : 1000;
      default:
        return isAccent ? 880 : 440;
    }
  }, [clickSound]);

  // Initialize audio nodes
  useEffect(() => {
    volumeNodeRef.current = new Tone.Volume(volume).toDestination();
    
    synthRef.current = new Tone.Synth({
      oscillator: { type: 'square' },
      envelope: {
        attack: 0.001,
        decay: 0.01,
        sustain: 0,
        release: 0.01,
      },
    }).connect(volumeNodeRef.current);

    return () => {
      if (loopRef.current) {
        loopRef.current.stop();
        loopRef.current.dispose();
      }
      if (synthRef.current) {
        synthRef.current.dispose();
      }
      if (volumeNodeRef.current) {
        volumeNodeRef.current.dispose();
      }
    };
  }, [volume]);

  // Update volume
  useEffect(() => {
    if (volumeNodeRef.current) {
      volumeNodeRef.current.volume.value = volume;
    }
  }, [volume]);

  // Main metronome loop
  useEffect(() => {
    if (!synthRef.current) return;

    // Stop existing loop
    if (loopRef.current) {
      loopRef.current.stop();
      loopRef.current.dispose();
    }

    if (isPlaying) {
      let beat = 0;

      // Create new loop
      loopRef.current = new Tone.Loop((time) => {
        // Determine if this is an accent beat
        // beat === 0 means it's the FIRST beat of the bar (beat 1 in musical notation)
        const isAccent = beat === 0 && accentFirst;
        const freq = getClickFrequencies(isAccent);
        
        // Play click sound
        synthRef.current?.triggerAttackRelease(freq, '16n', time);

        // Update visual beat
        Tone.Draw.schedule(() => {
          setCurrentBeat(beat);
        }, time);

        beat = (beat + 1) % beatsPerBar;
      }, `${beatsPerBar}n`);

      // Set tempo and start
      Tone.getTransport().bpm.value = bpm;
      loopRef.current.start(0);
      Tone.getTransport().start();
    } else {
      Tone.getTransport().stop();
    }

    return () => {
      if (loopRef.current) {
        loopRef.current.stop();
      }
      Tone.getTransport().stop();
      setCurrentBeat(0);
    };
  }, [isPlaying, bpm, beatsPerBar, accentFirst, getClickFrequencies]);

  // Start metronome
  const start = useCallback(async () => {
    await Tone.start();
    setIsPlaying(true);
  }, []);

  // Stop metronome
  const stop = useCallback(() => {
    setIsPlaying(false);
    setCurrentBeat(0);
  }, []);

  // Toggle play/pause
  const toggle = useCallback(async () => {
    if (isPlaying) {
      stop();
    } else {
      await start();
    }
  }, [isPlaying, start, stop]);

  // Tap tempo
  const tap = useCallback(() => {
    const now = Date.now();
    
    // Clear timeout if exists
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }

    // Add current tap time
    const newTapTimes = [...tapTimes, now];
    
    // Keep only last 4 taps
    if (newTapTimes.length > 4) {
      newTapTimes.shift();
    }

    setTapTimes(newTapTimes);

    // Calculate BPM if we have at least 2 taps
    if (newTapTimes.length >= 2) {
      const intervals = [];
      for (let i = 1; i < newTapTimes.length; i++) {
        intervals.push(newTapTimes[i] - newTapTimes[i - 1]);
      }
      
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      
      // Validate BPM range
      if (calculatedBpm >= 40 && calculatedBpm <= 300) {
        setBpm(calculatedBpm);
      }
    }

    // Reset tap times after 2 seconds of inactivity
    tapTimeoutRef.current = window.setTimeout(() => {
      setTapTimes([]);
    }, 2000);
  }, [tapTimes]);

  // Increment/Decrement BPM
  const incrementBpm = useCallback((amount: number = 1) => {
    setBpm((prev) => Math.min(300, Math.max(40, prev + amount)));
  }, []);

  const decrementBpm = useCallback((amount: number = 1) => {
    setBpm((prev) => Math.min(300, Math.max(40, prev - amount)));
  }, []);

  return {
    // State
    isPlaying,
    bpm,
    timeSignature,
    currentBeat,
    beatsPerBar,
    noteValue,
    volume,
    clickSound,
    accentFirst,
    showSubdivision,
    subdivisionType,
    tapTimes,
    
    // Actions
    start,
    stop,
    toggle,
    tap,
    setBpm,
    setTimeSignature,
    setVolume,
    setClickSound,
    setAccentFirst,
    setShowSubdivision,
    setSubdivisionType,
    incrementBpm,
    decrementBpm,
  };
};