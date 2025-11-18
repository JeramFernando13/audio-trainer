import { useRef, useEffect, useState } from 'react';
import * as Tone from 'tone';

export const useAudioContext = () => {
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const noiseRef = useRef<Tone.Noise | null>(null);
  const filterRef = useRef<Tone.Filter | null>(null);
  const volumeRef = useRef<Tone.Volume | null>(null);
  const [volume, setVolume] = useState(-12);

  useEffect(() => {
    volumeRef.current = new Tone.Volume(volume).toDestination();
    synthRef.current = new Tone.PolySynth().connect(volumeRef.current);
    noiseRef.current = new Tone.Noise('pink');
    filterRef.current = new Tone.Filter(1000, 'peaking');
    filterRef.current.Q.value = 5;
    filterRef.current.gain.value = 12;
    noiseRef.current.connect(filterRef.current);
    filterRef.current.connect(volumeRef.current);

    return () => {
      synthRef.current?.dispose();
      noiseRef.current?.dispose();
      filterRef.current?.dispose();
      volumeRef.current?.dispose();
    };
  }, [volume]);

  useEffect(() => {
    if (volumeRef.current) {
      volumeRef.current.volume.value = volume;
    }
  }, [volume]);

  const playNote = async (frequency: number, duration: string = '8n') => {
    await Tone.start();
    synthRef.current?.triggerAttackRelease(frequency, duration);
  };
  
  const playChord = async (frequencies: number[], duration: string = '2n') => {
    await Tone.start();
    synthRef.current?.triggerAttackRelease(frequencies, duration);
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
      }, 3000);
    }
  };

  return { playNote,playChord, playInterval, playFrequencyBoost, volume, setVolume };
};