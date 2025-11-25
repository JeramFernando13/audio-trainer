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
  label: string;
  description: string;
}

export const FREQUENCY_DIFFICULTY_CONFIG: Record<Difficulty, FrequencyDifficultyConfig> = {
  easy: {
    bands: [
      { freq: 60, name: 'Sub Bass' },
      { freq: 120, name: 'Bass' },
      { freq: 400, name: 'Low Mids' },
      { freq: 1000, name: 'Mids' },
      { freq: 2500, name: 'Upper Mids' },
      { freq: 5000, name: 'Presence' },
      { freq: 8000, name: 'Brilliance' }
    ],
    timeLimit: null,
    showFrequency: true,
    label: 'Easy',
    description: '7 bande - Nessun limite di tempo - Livello base'
  },
  medium: {
    bands: [
      { freq: 60, name: 'Sub Bass' },
      { freq: 120, name: 'Bass' },
      { freq: 400, name: 'Low Mids' },
      { freq: 1000, name: 'Mids' },
      { freq: 2500, name: 'Upper Mids' },
      { freq: 5000, name: 'Presence' },
      { freq: 8000, name: 'Brilliance' },
      { freq: 12000, name: 'Air' }
    ],
    timeLimit: 15,
    showFrequency: true,
    label: 'Medium',
    description: '8 bande - 15 secondi - Tutte le bande'
  },
  hard: {
    bands: [
      { freq: 60, name: 'Sub Bass' },
      { freq: 120, name: 'Bass' },
      { freq: 400, name: 'Low Mids' },
      { freq: 1000, name: 'Mids' },
      { freq: 2500, name: 'Upper Mids' },
      { freq: 5000, name: 'Presence' },
      { freq: 8000, name: 'Brilliance' },
      { freq: 12000, name: 'Air' }
    ],
    timeLimit: 10,
    showFrequency: true,
    label: 'Hard',
    description: '8 bande - 10 secondi'
  },
  pro: {
    bands: [
      { freq: 60, name: 'Sub Bass' },
      { freq: 120, name: 'Bass' },
      { freq: 400, name: 'Low Mids' },
      { freq: 1000, name: 'Mids' },
      { freq: 2500, name: 'Upper Mids' },
      { freq: 5000, name: 'Presence' },
      { freq: 8000, name: 'Brilliance' },
      { freq: 12000, name: 'Air' }
    ],
    timeLimit: 8,
    showFrequency: false,
    label: 'Pro',
    description: '8 bande - 8 secondi - Blind mode'
  }
};

// ============================================
// INTERVAL TRAINING CONFIGURATION
// ============================================

export interface IntervalDifficultyConfig {
  intervalIndices: number[];
  timeLimit: number | null;
  showIntervalName: boolean;
  label: string;
  description: string;
}

export const INTERVAL_DIFFICULTY_CONFIG: Record<Difficulty, IntervalDifficultyConfig> = {
  easy: {
    intervalIndices: [0, 4, 5, 7, 12],
    timeLimit: null,
    showIntervalName: true,
    label: 'Easy',
    description: '5 intervalli consonanti - Nessun limite di tempo'
  },
  medium: {
    intervalIndices: [0, 2, 4, 5, 7, 9, 12],
    timeLimit: 15,
    showIntervalName: true,
    label: 'Medium',
    description: '7 intervalli - 15 secondi per rispondere'
  },
  hard: {
    intervalIndices: [0, 1, 2, 3, 4, 5, 7, 9, 10, 12],
    timeLimit: 10,
    showIntervalName: true,
    label: 'Hard',
    description: '10 intervalli - 10 secondi - Include dissonanze'
  },
  pro: {
    intervalIndices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    timeLimit: 8,
    showIntervalName: false,
    label: 'Pro',
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
  label: string;  
  description: string;
}

export const CHORDS_DIFFICULTY_CONFIG: Record<Difficulty, ChordsDifficultyConfig> = {
  easy: {
    chordTypes: ['major', 'minor'],
    timeLimit: null,
    showChordName: true,
    playMode: 'arpeggio',
    randomRoot: false,
    label: 'Easy',  
    description: '2 accordi - Maggiore e Minore - Nessun limite - Arpeggio - Root: C'
  },
  medium: {
    chordTypes: ['major', 'minor', 'diminished', 'augmented', 'sus2', 'sus4'],
    timeLimit: 15,
    showChordName: true,
    playMode: 'arpeggio',
    randomRoot: false,
    label: 'Medium',  
    description: '6 accordi - Triadi complete - 15 secondi - Arpeggio - Root: C'
  },
  hard: {
    chordTypes: ['major', 'minor', 'diminished', 'augmented', 'maj7', 'dom7', 'min7', 'm7b5'],
    timeLimit: 10,
    showChordName: true,
    playMode: 'mixed',
    randomRoot: true,
    label: 'Hard',  
    description: '8 accordi - Triadi + Settime - 10 secondi - Arpeggio/Blocco - Root casuale'
  },
  pro: {
    chordTypes: ['major', 'minor', 'diminished', 'augmented', 'maj7', 'dom7', 'min7', 'm7b5', 'sus2', 'sus4', 'add9', 'ninth'],
    timeLimit: 8,
    showChordName: false,
    playMode: 'block',
    randomRoot: true,
    label: 'Pro',  
    description: '12 accordi - Full spectrum - 8 secondi - Blind mode - Blocco - Root casuale'
  }
};;

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
// RHYTHM TRAINING CONFIGURATION
// ============================================
// Add this to your difficulty.ts file after SCALES_DIFFICULTY_CONFIG

export interface RhythmDifficultyConfig {
  patterns: string[]; // Pattern category IDs to include (e.g., 'basic', 'syncopated', 'complex', 'polyrhythm')
  timeSignatures: string[];
  timeLimit: number | null;
  showNotation: boolean;
  numOptions: number;
  label: string;
  description: string;
}


export const RHYTHM_DIFFICULTY_CONFIG: Record<Difficulty, RhythmDifficultyConfig> = {
  easy: {
    patterns: ['Basic'], // Only basic patterns
    timeSignatures: ['4/4'],
    timeLimit: null,
    showNotation: true,
    numOptions: 4,
    label: 'Easy',
    description: 'Pattern base - 4/4 - Nessun limite - Solo quarti e ottavi'
  },
  medium: {
    patterns: ['Basic', 'Syncopation',],
    timeSignatures: ['4/4', '3/4'],
    timeLimit: 20,
    showNotation: true,
    numOptions: 6,
    label: 'Medium',
    description: '6 pattern - 4/4 e 3/4 - 20 secondi - Include sincopi'
  },
  hard: {
    patterns:['Basic', 'Syncopation', 'Triplets', 'Advanced'],
    timeSignatures: ['4/4', '3/4', '6/8', '5/4'],
    timeLimit: 15,
    showNotation: true,
    numOptions: 8,
    label: 'Hard',
    description: '8 pattern - Tempi composti - 15 secondi - Pattern complessi'
  },
  pro: {
    patterns: ['Basic', 'Syncopation', 'Triplets', 'Advanced', 'Polyrhythm'],
    timeSignatures: ['4/4', '3/4', '6/8', '5/4', '7/8'],
    timeLimit: 10,
    showNotation: false,
    numOptions: 10,
    label: 'Pro',
    description: '10 pattern - Tutti i tempi - 10 secondi - Poliritmie - Blind mode'
  }
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