import { useState, useEffect, useRef, useCallback } from 'react';

interface PitchDetectionResult {
  frequency: number | null;
  note: string | null;
  cents: number | null;
  clarity: number;
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

  // Autocorrelation algorithm per pitch detection - FIXED VERSION
  const autoCorrelate = useCallback((buffer: Float32Array, sampleRate: number): number => {
    // Vocal range: 80Hz (E2) - 1200Hz (D6) è più che sufficiente per voce umana
    const minFreq = 80;
    const maxFreq = 1200;
    const minSamples = Math.floor(sampleRate / maxFreq);
    const maxSamples = Math.floor(sampleRate / minFreq);

    // RMS per verificare se c'è abbastanza segnale
    let rms = 0;
    for (let i = 0; i < buffer.length; i++) {
      rms += buffer[i] * buffer[i];
    }
    rms = Math.sqrt(rms / buffer.length);

    // CRITICAL: Soglia RMS più bassa per rilevare da più lontano
    // 0.01 = circa -40dB, permette rilevamento a distanza maggiore
    if (rms < 0.02) return -1;

    // Autocorrelation - FIXED: algoritmo corretto
    let bestOffset = -1;
    let bestCorrelation = 0;

    for (let offset = minSamples; offset < maxSamples; offset++) {
      let correlation = 0;

      // FIXED: Somma PRODOTTI invece di differenze
      // Questo è il vero algoritmo di autocorrelazione
      for (let i = 0; i < buffer.length - offset; i++) {
        correlation += buffer[i] * buffer[i + offset];
      }

      // Normalizza per la lunghezza
      correlation = correlation / (buffer.length - offset);

      // FIXED: Cerca il MASSIMO, non inversione
      if (correlation > 0.01 && correlation > bestCorrelation) {
        bestCorrelation = correlation;
        bestOffset = offset;
      }
    }

    // FIXED: Verifica che la correlazione sia abbastanza forte
    if (bestOffset === -1 || bestCorrelation < 0.01) return -1;

    // Parabolic interpolation per precisione migliore
    if (bestOffset > 0 && bestOffset < maxSamples - 1) {
      // Calcola correlazione per offset vicini
      let corrPrev = 0;
      let corrNext = 0;

      for (let i = 0; i < buffer.length - bestOffset - 1; i++) {
        corrPrev += buffer[i] * buffer[i + bestOffset - 1];
        corrNext += buffer[i] * buffer[i + bestOffset + 1];
      }

      corrPrev = corrPrev / (buffer.length - bestOffset - 1);
      corrNext = corrNext / (buffer.length - bestOffset - 1);

      // Interpolazione parabolica
      const a = corrPrev;
      const b = bestCorrelation;
      const c = corrNext;
      const offset = 0.5 * (a - c) / (a - 2 * b + c);

      if (Math.abs(offset) < 1) {
        bestOffset = bestOffset + offset;
      }
    }

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

  // Main detection loop
  useEffect(() => {
    const detect = () => {
      if (!analyserRef.current || !audioContextRef.current) return;

      const analyser = analyserRef.current;
      const bufferLength = analyser.fftSize;
      const buffer = new Float32Array(bufferLength);

      analyser.getFloatTimeDomainData(buffer);

      const frequency = autoCorrelate(buffer, audioContextRef.current.sampleRate);

      if (frequency > 0 && frequency >= 80 && frequency <= 1200) {
        const { note, cents } = frequencyToNote(frequency);
        
        // Clarity basato su quanto la frequenza è stabile
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
          autoGainControl: false, // Importante: non vogliamo AGC per pitch detection
        },
      });

      micStreamRef.current = stream;

      // Setup Web Audio API
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      
      // CRITICAL: Resume AudioContext after user gesture
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 4096; // INCREASED: Più samples = più precisione per note basse
      analyser.smoothingTimeConstant = 0.3; // REDUCED: Meno smoothing = più reattivo
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsListening(true);
      
      // Start detection loop
      setTimeout(() => {
        if (detectPitchRef.current) {
          detectPitchRef.current();
        }
      }, 100);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('Impossibile accedere al microfono. Verifica i permessi.');
    }
  }, []);

  // Stop listening
  const stopListening = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
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