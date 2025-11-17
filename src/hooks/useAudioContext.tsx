import { useRef, useEffect } from 'react';
import * as Tone from 'tone';

export const useAudioContext = () => {
  const synthRef = useRef<Tone.Synth | null>(null);
  const noiseRef = useRef<Tone.Noise | null>(null);
  const filterRef = useRef<Tone.Filter | null>(null);

  useEffect(() => {
    synthRef.current = new Tone.Synth().toDestination();
    noiseRef.current = new Tone.Noise('pink');
    filterRef.current = new Tone.Filter(1000, 'peaking').toDestination();
    filterRef.current.Q.value = 5;
    filterRef.current.gain.value = 12;
    noiseRef.current.connect(filterRef.current);

    return () => {
      synthRef.current?.dispose();
      noiseRef.current?.dispose();
      filterRef.current?.dispose();
    };
  }, []);

  const playNote = async (frequency: number, duration: string = '8n') => {
    await Tone.start();
    synthRef.current?.triggerAttackRelease(frequency, duration);
  };

  const playInterval = async (baseFreq: number, semitones: number) => {
    await Tone.start();
    const secondFreq = baseFreq * Math.pow(2, semitones / 12);
    
    synthRef.current?.triggerAttackRelease(baseFreq, '4n');
    setTimeout(() => {
      synthRef.current?.triggerAttackRelease(secondFreq, '4n');
    }, 600);
  };

  const playFrequencyBoost = async (frequency: number) => {
    await Tone.start();
    if (filterRef.current && noiseRef.current) {
      filterRef.current.frequency.value = frequency;
      noiseRef.current.start();
      setTimeout(() => {
        noiseRef.current?.stop();
      }, 2000);
    }
  };

  return { playNote, playInterval, playFrequencyBoost };
};