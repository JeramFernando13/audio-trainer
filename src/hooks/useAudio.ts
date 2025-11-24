import { useCallback, useState, useRef } from 'react';
import * as Tone from 'tone';

export const useAudio = () => {
  const [volume, setVolume] = useState(-12);
  const isAudioStartedRef = useRef(false);

  // ✅ Initialize audio context on first user interaction
  const ensureAudioStarted = useCallback(async () => {
    if (!isAudioStartedRef.current) {
      await Tone.start();
      isAudioStartedRef.current = true;
    }
    // Apply volume after audio is started
    Tone.Destination.volume.value = volume;
  }, [volume]);

  // Play a single note (for intervals, chords, vocal training)
  const playNote = useCallback(async (frequency: number, duration: string = '4n') => {
    await ensureAudioStarted();
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(frequency, duration);
    
    setTimeout(() => synth.dispose(), 2000);
  }, [ensureAudioStarted]);

  // Play an interval (two notes)
  const playInterval = useCallback(async (
    baseFreq: number, 
    semitones: number, 
    mode: 'harmonic' | 'melodic' = 'harmonic'
  ) => {
    await ensureAudioStarted();
    const secondFreq = baseFreq * Math.pow(2, semitones / 12);

    if (mode === 'harmonic') {
      // Play both notes together
      const polySynth = new Tone.PolySynth(Tone.Synth).toDestination();
      polySynth.triggerAttackRelease([baseFreq, secondFreq], '1n');
      setTimeout(() => polySynth.dispose(), 2000);
    } else {
      // Play notes in sequence
      const synth = new Tone.Synth().toDestination();
      synth.triggerAttackRelease(baseFreq, '4n');
      
      setTimeout(() => {
        const synth2 = new Tone.Synth().toDestination();
        synth2.triggerAttackRelease(secondFreq, '4n');
        setTimeout(() => {
          synth.dispose();
          synth2.dispose();
        }, 1000);
      }, 500);
    }
  }, [ensureAudioStarted]);

  // Play a chord (multiple notes)
  const playChord = useCallback(async (
    rootFreq: number, 
    intervals: number[], 
    mode: 'arpeggio' | 'block' = 'block'
  ) => {
    await ensureAudioStarted();
    const frequencies = intervals.map(interval => rootFreq * Math.pow(2, interval / 12));

    if (mode === 'block') {
      const polySynth = new Tone.PolySynth(Tone.Synth).toDestination();
      polySynth.triggerAttackRelease(frequencies, '1n');
      setTimeout(() => polySynth.dispose(), 2000);
    } else {
      // Arpeggio
      frequencies.forEach((freq, index) => {
        setTimeout(() => {
          const synth = new Tone.Synth().toDestination();
          synth.triggerAttackRelease(freq, '8n');
          setTimeout(() => synth.dispose(), 500);
        }, index * 200);
      });
    }
  }, [ensureAudioStarted]);

  // Play pink noise with frequency boost (for frequency training)
  const playFrequencyBoosted = useCallback(async (frequency: number, duration: number = 3) => {
    await ensureAudioStarted();
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
  }, [ensureAudioStarted]);

  // Play pure sine wave at specific frequency
  const playSineWave = useCallback(async (frequency: number, duration: number = 2) => {
    await ensureAudioStarted();
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
  }, [ensureAudioStarted]);

  // Play frequency sweep (chirp)
  const playFrequencySweep = useCallback(async (
    startFreq: number, 
    endFreq: number, 
    duration: number = 3
  ) => {
    await ensureAudioStarted();
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
  }, [ensureAudioStarted]);

  // Play scale
  const playScale = useCallback(async (
    intervals: number[],
    direction: 'ascending' | 'descending' = 'ascending'
  ): Promise<void> => {
    await ensureAudioStarted();
    const synth = new Tone.Synth().toDestination();
    const baseFreq = 261.63; // C4

    const frequencies = intervals.map((semitone) =>
      baseFreq * Math.pow(2, semitone / 12)
    );

    const playOrder = direction === 'descending' 
      ? [...frequencies].reverse() 
      : frequencies;

    const now = Tone.now();
    playOrder.forEach((freq, index) => {
      synth.triggerAttackRelease(freq, '8n', now + index * 0.3);
    });

    await new Promise(resolve => 
      setTimeout(resolve, playOrder.length * 300 + 500)
    );
    
    synth.dispose();
  }, [ensureAudioStarted]);

  // Play rhythm pattern
  const playRhythm = useCallback(async (
    pattern: number[],
    bpm: number
  ): Promise<void> => {
    await ensureAudioStarted();
    const synth = new Tone.Synth({
      oscillator: { type: 'square' },
      envelope: {
        attack: 0.001,
        decay: 0.05,
        sustain: 0,
        release: 0.05,
      },
    }).toDestination();

    Tone.getTransport().bpm.value = bpm;

    const sixteenthNote = 60 / bpm / 4;
    let currentTime = 0;
    
    pattern.forEach((duration, index) => {
      const isAccent = index === 0;
      const freq = isAccent ? 880 : 440;
      const noteTime = Tone.now() + currentTime;
      
      synth.triggerAttackRelease(freq, '32n', noteTime);
      
      currentTime += duration * sixteenthNote;
    });

    await new Promise(resolve => 
      setTimeout(resolve, currentTime * 1000 + 500)
    );

    synth.dispose();
  }, [ensureAudioStarted]);

  return {
    playNote,
    playInterval,
    playChord,
    playFrequencyBoosted,
    playSineWave,
    playFrequencySweep,
    playScale,
    playRhythm,
    volume,
    setVolume,
  };
};