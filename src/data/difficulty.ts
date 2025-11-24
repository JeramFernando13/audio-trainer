// Centralized difficulty configuration for all training modules

import { SCALES_GUIDE } from "./scales";

export type Difficulty = 'easy' | 'medium' | 'hard' | 'pro';

export interface DifficultyMeta {
  label: string;
  color: string;
}

export const DIFFICULTY_META: Record<Difficulty, DifficultyMeta> = {
  easy: {
    label: 'Easy',
    color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 cdark:border-green-700'
  },
  medium: {
    label: 'Medium',
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-300 cdark:border-yellow-700'
  },
  hard: {
    label: 'Hard',
    color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-300 cdark:border-orange-700'
  },
  pro: {
    label: 'Pro',
    color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 cdark:border-red-700'
  }
};

// ============================================
// FREQUENCY TRAINING CONFIGURATION
// ============================================

export interface FrequencyBand {
  freq: number;
  name: string;
}

export interface FrequencyDifficultyConfig {
  bands: FrequencyBand[];
  timeLimit: number | null;
  showFrequency: boolean;
  description: string;
}

export const FREQUENCY_DIFFICULTY_CONFIG: Record<Difficulty, FrequencyDifficultyConfig> = {
  easy: {
    bands: [
      { freq: 80, name: 'Sub Bass' },
      { freq: 150, name: 'Bass' },
      { freq: 300, name: 'Low Mids' },
      { freq: 600, name: 'Mids' },
      { freq: 1200, name: 'Upper Mids' },
      { freq: 3000, name: 'Presence' },
      { freq: 6000, name: 'Brilliance' }
    ],
    timeLimit: null,
    showFrequency: true,
    description: '7 bande - Nessun limite di tempo - Livello base'
  },
  medium: {
    bands: [
      { freq: 60, name: 'Deep Sub' },
      { freq: 120, name: 'Sub Bass' },
      { freq: 250, name: 'Bass' },
      { freq: 500, name: 'Low Mids' },
      { freq: 1000, name: 'Mids' },
      { freq: 2000, name: 'Upper Mids' },
      { freq: 4000, name: 'Presence' },
      { freq: 8000, name: 'Brilliance' }
    ],
    timeLimit: 12,
    showFrequency: true,
    description: '8 bande - 12 secondi - Livello intermedio'
  },
  hard: {
    bands: [
      { freq: 40, name: 'Sub Deep' },
      { freq: 60, name: 'Deep Sub' },
      { freq: 100, name: 'Sub Bass' },
      { freq: 160, name: 'Bass' },
      { freq: 250, name: 'Upper Bass' },
      { freq: 400, name: 'Low Mids' },
      { freq: 630, name: 'True Mids' },
      { freq: 1000, name: 'Mids' },
      { freq: 1600, name: 'Upper Mids' },
      { freq: 2500, name: 'Presence' },
      { freq: 5000, name: 'Brilliance' },
      { freq: 10000, name: 'Air' }
    ],
    timeLimit: 10,
    showFrequency: true,
    description: '12 bande - 10 secondi - Alta difficoltà (40Hz-10kHz)'
  },
  pro: {
    bands: [
      { freq: 20, name: 'Infra Sub' },
      { freq: 32, name: 'Deep Sub' },
      { freq: 50, name: 'Low Sub' },
      { freq: 70, name: 'Sub Bass' },
      { freq: 100, name: 'Punch Bass' },
      { freq: 160, name: 'Upper Bass' },
      { freq: 250, name: 'Low Mids' },
      { freq: 400, name: 'Body Mids' },
      { freq: 630, name: 'True Mids' },
      { freq: 1000, name: 'Upper Mids' },
      { freq: 1600, name: 'High Mids' },
      { freq: 2500, name: 'Presence' },
      { freq: 4000, name: 'High Presence' },
      { freq: 6000, name: 'Brilliance' },
      { freq: 10000, name: 'Upper Brilliance' },
      { freq: 14000, name: 'Air' },
      { freq: 18000, name: 'Ultra Air' }
    ],
    timeLimit: 10,
    showFrequency: false,
    description: '17 bande – 10 secondi – Ultra Full Spectrum (20Hz–18kHz) – Blind Master Mode'
  }

};

// ============================================
// INTERVAL TRAINING CONFIGURATION
// ============================================

export interface IntervalDifficultyConfig {
  intervalIndices: number[];
  timeLimit: number | null;
  showIntervalName: boolean;
  description: string;
}

export const INTERVAL_DIFFICULTY_CONFIG: Record<Difficulty, IntervalDifficultyConfig> = {
  easy: {
    intervalIndices: [0, 4, 5, 7, 12],
    timeLimit: null,
    showIntervalName: true,
    description: '5 intervalli consonanti - Nessun limite di tempo'
  },
  medium: {
    intervalIndices: [0, 2, 4, 5, 7, 9, 12],
    timeLimit: 15,
    showIntervalName: true,
    description: '7 intervalli - 15 secondi per rispondere'
  },
  hard: {
    intervalIndices: [0, 1, 2, 3, 4, 5, 7, 9, 10, 12],
    timeLimit: 10,
    showIntervalName: true,
    description: '10 intervalli - 10 secondi - Include dissonanze'
  },
  pro: {
    intervalIndices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    timeLimit: 8,
    showIntervalName: false,
    description: '13 intervalli - 8 secondi - Tutti i semitoni - Blind mode'
  }
};

// ============================================
// CHORDS TRAINING CONFIGURATION
// ============================================

export interface ChordsDifficultyConfig {
  chordTypes: string[];
  timeLimit: number | null;
  showChordName: boolean;
  playMode: 'arpeggio' | 'block' | 'mixed';
  randomRoot: boolean;
  description: string;
}

export const CHORDS_DIFFICULTY_CONFIG: Record<Difficulty, ChordsDifficultyConfig> = {
  easy: {
    chordTypes: ['major', 'minor'],
    timeLimit: null,
    showChordName: true,
    playMode: 'arpeggio',
    randomRoot: false,
    description: '2 accordi - Maggiore e Minore - Nessun limite - Arpeggio - Root: C'
  },
  medium: {
    chordTypes: ['major', 'minor', 'diminished', 'augmented', 'sus2', 'sus4'],
    timeLimit: 15,
    showChordName: true,
    playMode: 'arpeggio',
    randomRoot: false,
    description: '6 accordi - Triadi complete - 15 secondi - Arpeggio - Root: C'
  },
  hard: {
    chordTypes: ['major', 'minor', 'diminished', 'augmented', 'maj7', 'dom7', 'min7', 'm7b5'],
    timeLimit: 10,
    showChordName: true,
    playMode: 'mixed',
    randomRoot: true,
    description: '8 accordi - Triadi + Settime - 10 secondi - Arpeggio/Blocco - Root casuale'
  },
  pro: {
    chordTypes: ['major', 'minor', 'diminished', 'augmented', 'maj7', 'dom7', 'min7', 'm7b5', 'sus2', 'sus4', 'add9', 'ninth'],
    timeLimit: 8,
    showChordName: false,
    playMode: 'block',
    randomRoot: true,
    description: '12 accordi - Full spectrum - 8 secondi - Blind mode - Blocco - Root casuale'
  }
};

// ============================================
// VOCAL TRAINING CONFIGURATION
// ============================================

export interface VocalNote {
  note: string;
  frequency: number;
}

export interface VocalDifficultyConfig {
  notes: VocalNote[];
  timeLimit: number | null;
  showNoteName: boolean;
  allowance: number;
  description: string;
}

export const VOCAL_DIFFICULTY_CONFIG: Record<Difficulty, VocalDifficultyConfig> = {
  easy: {
    notes: [
      { note: 'C4', frequency: 261.63 },
      { note: 'D4', frequency: 293.66 },
      { note: 'E4', frequency: 329.63 },
      { note: 'G4', frequency: 392.00 },
      { note: 'A4', frequency: 440.00 },
    ],
    timeLimit: null,
    showNoteName: true,
    allowance: 50,
    description: '5 note centrali - Nessun limite - Range ristretto (C4-A4)'
  },
  medium: {
    notes: [
      { note: 'C4', frequency: 261.63 },
      { note: 'D4', frequency: 293.66 },
      { note: 'E4', frequency: 329.63 },
      { note: 'F4', frequency: 349.23 },
      { note: 'G4', frequency: 392.00 },
      { note: 'A4', frequency: 440.00 },
      { note: 'B4', frequency: 493.88 },
    ],
    timeLimit: 15,
    showNoteName: true,
    allowance: 40,
    description: '7 note - 15 secondi - Range medio (C4-B4)'
  },
  hard: {
    notes: [
      { note: 'G3', frequency: 196.00 },
      { note: 'A3', frequency: 220.00 },
      { note: 'C4', frequency: 261.63 },
      { note: 'D4', frequency: 293.66 },
      { note: 'E4', frequency: 329.63 },
      { note: 'F4', frequency: 349.23 },
      { note: 'G4', frequency: 392.00 },
      { note: 'A4', frequency: 440.00 },
      { note: 'B4', frequency: 493.88 },
      { note: 'C5', frequency: 523.25 },
      { note: 'D5', frequency: 587.33 },
      { note: 'E5', frequency: 659.25 },
    ],
    timeLimit: 10,
    showNoteName: true,
    allowance: 30,
    description: '12 note - 10 secondi - Range esteso (G3-E5) - Salti d\'ottava'
  },
  pro: {
    notes: [
      { note: 'F3', frequency: 174.61 },
      { note: 'G3', frequency: 196.00 },
      { note: 'A3', frequency: 220.00 },
      { note: 'B3', frequency: 246.94 },
      { note: 'C4', frequency: 261.63 },
      { note: 'D4', frequency: 293.66 },
      { note: 'E4', frequency: 329.63 },
      { note: 'F4', frequency: 349.23 },
      { note: 'G4', frequency: 392.00 },
      { note: 'A4', frequency: 440.00 },
      { note: 'B4', frequency: 493.88 },
      { note: 'C5', frequency: 523.25 },
      { note: 'D5', frequency: 587.33 },
      { note: 'E5', frequency: 659.25 },
      { note: 'F5', frequency: 698.46 },
    ],
    timeLimit: 8,
    showNoteName: false,
    allowance: 20,
    description: '15 note - 8 secondi - Full range (F3-F5) - Blind mode - Precisione massima'
  }
};

export interface ScalesDifficultyConfig {
  scales: string[];
  direction: string;
  timeLimit: number | null;
  showHints: boolean;
  label: string;
  description: string;

}
// Difficulty configuration for training
export const SCALES_DIFFICULTY_CONFIG: Record<Difficulty, ScalesDifficultyConfig> = {
  easy: {
    scales: ['Major (Ionian)', 'Natural Minor (Aeolian)', 'Major Pentatonic', 'Minor Pentatonic'],
    direction: 'ascending',
    timeLimit: null,
    showHints: true,
    label: 'Easy',
    description: 'Basic scales: Major, Minor, Pentatonics (ascending only)',
  },
  medium: {
    scales: [
      'Major (Ionian)',
      'Natural Minor (Aeolian)',
      'Dorian',
      'Mixolydian',
      'Phrygian',
      'Major Pentatonic',
      'Minor Pentatonic',
      'Blues Scale',
    ],
    direction: 'both',
    timeLimit: 20,
    showHints: true,
    label: 'Medium',
    description: 'Main modes + pentatonics + blues (both directions)',
  },
  hard: {
    scales: [
      'Major (Ionian)',
      'Natural Minor (Aeolian)',
      'Harmonic Minor',
      'Melodic Minor',
      'Dorian',
      'Phrygian',
      'Lydian',
      'Mixolydian',
      'Locrian',
      'Major Pentatonic',
      'Minor Pentatonic',
      'Blues Scale',
      'Bebop Dominant',
      'Lydian Dominant',
    ],
    direction: 'both',
    timeLimit: 15,
    showHints: false,
    label: 'Hard',
    description: 'All modes + jazz bebop scales',
  },
  pro: {
    scales: SCALES_GUIDE.map((s) => s.name), // ALL scales
    direction: 'both',
    timeLimit: 10,
    showHints: false,
    label: 'Pro ',
    description: 'All scales including exotic & altered (blind mode)',
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getDifficultyLabel = (difficulty: Difficulty): string => {
  return DIFFICULTY_META[difficulty].label;
};

export const getDifficultyColor = (difficulty: Difficulty): string => {
  return DIFFICULTY_META[difficulty].color;
};