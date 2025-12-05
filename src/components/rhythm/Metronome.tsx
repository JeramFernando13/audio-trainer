import { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import * as Tone from 'tone';

interface MetronomeProps {
  bpm: number;
  timeSignature?: string;
  isPlaying?: boolean;
  onToggle?: () => void;
  accent?: boolean;
}

export const Metronome = ({ 
  bpm, 
  timeSignature = '4/4',
  isPlaying = false,
  onToggle,
  accent = true
}: MetronomeProps) => {
  const [currentBeat, setCurrentBeat] = useState(0);
  const [internalPlaying, setInternalPlaying] = useState(false);
  const synthRef = useRef<Tone.Synth | null>(null);
  const loopRef = useRef<Tone.Loop | null>(null);

  const playing = onToggle !== undefined ? isPlaying : internalPlaying;
  
  // Parse time signature
  const [beatsPerBar] = timeSignature.split('/').map(Number);

  useEffect(() => {
    // Create synth for click sound
    synthRef.current = new Tone.Synth({
      oscillator: { type: 'square' },
      envelope: {
        attack: 0.001,
        decay: 0.01,
        sustain: 0,
        release: 0.01,
      },
    }).toDestination();

    return () => {
      if (loopRef.current) {
        loopRef.current.stop();
        loopRef.current.dispose();
      }
      if (synthRef.current) {
        synthRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (!synthRef.current) return;

    // Stop existing loop
    if (loopRef.current) {
      loopRef.current.stop();
      loopRef.current.dispose();
    }

    if (playing) {
      let beat = 0;

      // Create new loop
      loopRef.current = new Tone.Loop((time) => {
        // Play click sound
        const isAccent = beat === 0 && accent;
        const freq = isAccent ? 880 : 440; // High for accent, normal for others
        
        synthRef.current?.triggerAttackRelease(freq, '16n', time);

        // Update visual beat (schedule ahead of time for sync)
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
  }, [playing, bpm, beatsPerBar, accent]);

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalPlaying(!internalPlaying);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-2xl font-bold text-white tracking-tight">{bpm} BPM</div>
          <div className="text-sm text-gray-400">{timeSignature} Time</div>
        </div>
        <button
          onClick={handleToggle}
          className={`p-4 rounded-full transition-all ${
            playing
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {playing ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Visual Beats */}
      <div className="flex gap-2 justify-center">
        {Array.from({ length: beatsPerBar }).map((_, index) => (
          <div
            key={index}
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-100 ${
              currentBeat === index && playing
                ? index === 0 && accent
                  ? 'bg-red-500 text-white scale-125 shadow-lg shadow-red-500/50'
                  : 'bg-blue-500 text-white scale-110 shadow-lg shadow-blue-500/50'
                : 'bg-gray-700 text-gray-400'
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};