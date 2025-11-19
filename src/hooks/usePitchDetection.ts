import { useState, useEffect, useRef, useCallback } from 'react';

interface PitchDetectionResult {
  frequency: number | null;
  note: string | null;
  cents: number | null;
  clarity: number; // 0-1, quanto è chiaro il pitch
}

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const usePitchDetection = () => {
  const [isListening, setIsListening] = useState(false);
  const [pitch, setPitch] = useState<PitchDetectionResult>({
    frequency: null,
    note: null,
    cents: null,
    clarity: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const detectPitchRef = useRef<(() => void) | null>(null);

  // Autocorrelation algorithm per pitch detection
  const autoCorrelate = useCallback((buffer: Float32Array, sampleRate: number): number => {
    // Minimum e maximum frequency (da ~80Hz a ~1000Hz per voce umana)
    const minFreq = 80;
    const maxFreq = 1000;
    const minSamples = Math.floor(sampleRate / maxFreq);
    const maxSamples = Math.floor(sampleRate / minFreq);

    // RMS per verificare se c'è abbastanza segnale
    let rms = 0;
    for (let i = 0; i < buffer.length; i++) {
      rms += buffer[i] * buffer[i];
    }
    rms = Math.sqrt(rms / buffer.length);

    // Se il segnale è troppo debole, ritorna -1
    if (rms < 0.01) return -1;

    // Autocorrelation
    let bestOffset = -1;
    let bestCorrelation = 0;

    for (let offset = minSamples; offset < maxSamples; offset++) {
      let correlation = 0;

      for (let i = 0; i < buffer.length - offset; i++) {
        correlation += Math.abs(buffer[i] - buffer[i + offset]);
      }

      correlation = 1 - correlation / (buffer.length - offset);

      if (correlation > 0.9 && correlation > bestCorrelation) {
        bestCorrelation = correlation;
        bestOffset = offset;
      }
    }

    if (bestOffset === -1) return -1;

    return sampleRate / bestOffset;
  }, []);

  // Converti frequenza in nota + cents
  const frequencyToNote = useCallback((frequency: number) => {
    const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    const roundedNoteNum = Math.round(noteNum);
    const cents = Math.floor((noteNum - roundedNoteNum) * 100);
    
    const noteIndex = (roundedNoteNum + 69) % 12;
    const octave = Math.floor((roundedNoteNum + 69) / 12);
    
    return {
      note: NOTE_NAMES[noteIndex < 0 ? noteIndex + 12 : noteIndex] + octave,
      cents,
    };
  }, []);

  // Main detection loop - using ref to avoid circular dependency
  useEffect(() => {
    const detect = () => {
      if (!analyserRef.current || !audioContextRef.current) return;

      const analyser = analyserRef.current;
      const bufferLength = analyser.fftSize;
      const buffer = new Float32Array(bufferLength);

      analyser.getFloatTimeDomainData(buffer);

      const frequency = autoCorrelate(buffer, audioContextRef.current.sampleRate);

      if (frequency > 0) {
        const { note, cents } = frequencyToNote(frequency);
        const clarity = Math.min(1, frequency / 1000);

        setPitch({
          frequency: Math.round(frequency * 10) / 10,
          note,
          cents,
          clarity,
        });
      } else {
        setPitch({
          frequency: null,
          note: null,
          cents: null,
          clarity: 0,
        });
      }

      if (isListening) {
        animationFrameRef.current = requestAnimationFrame(detect);
      }
    };

    detectPitchRef.current = detect;
  }, [autoCorrelate, frequencyToNote, isListening]);

  // Start listening
  const startListening = useCallback(async () => {
    try {
      setError(null);

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false,
        },
      });

      micStreamRef.current = stream;

      // Setup Web Audio API
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsListening(true);
      
      // Start detection loop after setting isListening
      setTimeout(() => {
        if (detectPitchRef.current) {
          detectPitchRef.current();
        }
      }, 0);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('Impossibile accedere al microfono. Verifica i permessi.');
    }
  }, []);

  // Stop listening
  const stopListening = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    setIsListening(false);
    setPitch({
      frequency: null,
      note: null,
      cents: null,
      clarity: 0,
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    isListening,
    pitch,
    error,
    startListening,
    stopListening,
  };
};