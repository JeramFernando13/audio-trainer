import { useCallback, useState } from 'react';
import * as Tone from 'tone';

export const useAudio = () => {
  const [volume, setVolume] = useState(-12); // Default volume in dB

  // Apply volume to all audio output
  const applyVolume = useCallback(() => {
    Tone.Destination.volume.value = volume;
  }, [volume]);

  // Play a single note (for intervals, chords, vocal training)
  const playNote = useCallback((frequency: number, duration: string = '4n') => {
    applyVolume();
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(frequency, duration);
  }, [applyVolume]);

  // Play an interval (two notes)
  const playInterval = useCallback((baseFreq: number, semitones: number, mode: 'harmonic' | 'melodic' = 'harmonic') => {
    applyVolume();
    const secondFreq = baseFreq * Math.pow(2, semitones / 12);
    const synth = new Tone.Synth().toDestination();

    if (mode === 'harmonic') {
      // Play both notes together
      synth.triggerAttackRelease(baseFreq, '1n');
      const synth2 = new Tone.Synth().toDestination();
      synth2.triggerAttackRelease(secondFreq, '1n');
    } else {
      // Play notes in sequence
      synth.triggerAttackRelease(baseFreq, '4n', Tone.now());
      setTimeout(() => {
        const synth2 = new Tone.Synth().toDestination();
        synth2.triggerAttackRelease(secondFreq, '4n');
      }, 500);
    }
  }, [applyVolume]);

  // Play a chord (multiple notes)
  const playChord = useCallback((
    rootFreq: number, 
    intervals: number[], 
    mode: 'arpeggio' | 'block' = 'block'
  ) => {
    applyVolume();
    const frequencies = intervals.map(interval => rootFreq * Math.pow(2, interval / 12));

    if (mode === 'block') {
      // FIXED: Use PolySynth for perfect sync
      const polySynth = new Tone.PolySynth(Tone.Synth).toDestination();
      polySynth.triggerAttackRelease(frequencies, '1n');
      
      setTimeout(() => {
        polySynth.dispose();
      }, 2000);
    } else {
      // Play notes in sequence (arpeggio)
      frequencies.forEach((freq, index) => {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease(freq, '8n', Tone.now() + index * 0.2);
      });
    }
  }, [applyVolume]);

  // Play pink noise with frequency boost (for frequency training)
  const playFrequencyBoosted = useCallback((frequency: number, duration: number = 3) => {
    applyVolume();
    const noise = new Tone.Noise('pink').start();
    const filter = new Tone.Filter(frequency, 'bandpass', -24).toDestination();
    const gain = new Tone.Gain(0.3).connect(filter);
    
    noise.connect(gain);
    
    setTimeout(() => {
      noise.stop();
      noise.dispose();
      filter.dispose();
      gain.dispose();
    }, duration * 1000);
  }, [applyVolume]);

  // Play pure sine wave at specific frequency (NEW for sine wave training)
  const playSineWave = useCallback((frequency: number, duration: number = 2) => {
    applyVolume();
    const oscillator = new Tone.Oscillator({
      frequency: frequency,
      type: 'sine',
      volume: -12,
    }).toDestination();

    oscillator.start();
    
    setTimeout(() => {
      oscillator.stop();
      oscillator.dispose();
    }, duration * 1000);
  }, [applyVolume]);

  // Play frequency sweep (chirp) - bonus for advanced training
  const playFrequencySweep = useCallback((
    startFreq: number, 
    endFreq: number, 
    duration: number = 3
  ) => {
    applyVolume();
    const oscillator = new Tone.Oscillator({
      frequency: startFreq,
      type: 'sine',
      volume: -12,
    }).toDestination();

    oscillator.start();
    oscillator.frequency.rampTo(endFreq, duration);

    setTimeout(() => {
      oscillator.stop();
      oscillator.dispose();
    }, duration * 1000);
  }, [applyVolume]);

  // Aggiungi questa funzione dentro il tuo hook useAudio

const playScale = async (
  intervals: number[],
  direction: 'ascending' | 'descending' = 'ascending'
): Promise<void> => {
  const synth = new Tone.Synth().toDestination();
  const baseFreq = 261.63; // C4

  const frequencies = intervals.map((semitone) =>
    baseFreq * Math.pow(2, semitone / 12)
  );

  // Reverse if descending
  const playOrder = direction === 'descending' 
    ? [...frequencies].reverse() 
    : frequencies;

  const now = Tone.now();
  playOrder.forEach((freq, index) => {
    synth.triggerAttackRelease(freq, '8n', now + index * 0.3);
  });

  // Wait for scale to finish
  await new Promise(resolve => 
    setTimeout(resolve, playOrder.length * 300 + 500)
  );
  
  synth.dispose();
};

  return {
    playNote,
    playInterval,
    playChord,
    playFrequencyBoosted,
    playSineWave,
    playFrequencySweep,
    volume,
    setVolume,
    playScale,
  };
};