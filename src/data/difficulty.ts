// Centralized difficulty configuration for all training modules

export type Difficulty = 'easy' | 'medium' | 'hard' | 'pro';

export interface DifficultyMeta {
  label: string;
  emoji: string;
  color: string;
}

export const DIFFICULTY_META: Record<Difficulty, DifficultyMeta> = {
  easy: {
    label: 'Easy',
    emoji: '🟢',
    color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700'
  },
  medium: {
    label: 'Medium',
    emoji: '🟡',
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700'
  },
  hard: {
    label: 'Hard',
    emoji: '🟠',
    color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700'
  },
  pro: {
    label: 'Pro',
    emoji: '🔴',
    color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700'
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
      { freq: 100, name: 'Bass' },
      { freq: 400, name: 'Low Mids' },
      { freq: 1000, name: 'Mids' },
      { freq: 5000, name: 'Presence' }
    ],
    timeLimit: null,
    showFrequency: true,
    description: '4 bande ben distanziate • Nessun limite di tempo'
  },
  medium: {
    bands: [
      { freq: 60, name: 'Sub Bass' },
      { freq: 120, name: 'Bass' },
      { freq: 400, name: 'Low Mids' },
      { freq: 1000, name: 'Mids' },
      { freq: 2500, name: 'Upper Mids' },
      { freq: 5000, name: 'Presence' },
      { freq: 8000, name: 'Brilliance' }
    ],
    timeLimit: 15,
    showFrequency: true,
    description: '7 bande • 15 secondi per rispondere'
  },
  hard: {
    bands: [
      { freq: 40, name: 'Deep Sub' },
      { freq: 80, name: 'Sub Bass' },
      { freq: 200, name: 'Bass' },
      { freq: 500, name: 'Low Mids' },
      { freq: 1000, name: 'Mids' },
      { freq: 2000, name: 'Upper Mids' },
      { freq: 4000, name: 'Presence' },
      { freq: 8000, name: 'Brilliance' },
      { freq: 12000, name: 'Air' }
    ],
    timeLimit: 10,
    showFrequency: true,
    description: '9 bande • 10 secondi • Range esteso (40Hz-12kHz)'
  },
  pro: {
    bands: [
      { freq: 20, name: 'Infra Sub' },
      { freq: 40, name: 'Deep Sub' },
      { freq: 80, name: 'Sub Bass' },
      { freq: 150, name: 'Bass' },
      { freq: 300, name: 'Low Mids' },
      { freq: 600, name: 'Mids' },
      { freq: 1200, name: 'Upper Mids' },
      { freq: 2500, name: 'High Mids' },
      { freq: 5000, name: 'Presence' },
      { freq: 8000, name: 'Brilliance' },
      { freq: 12000, name: 'Air' },
      { freq: 16000, name: 'Ultra Air' }
    ],
    timeLimit: 8,
    showFrequency: false,
    description: '12 bande • 8 secondi • Full spectrum (20Hz-16kHz) • Blind mode'
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
    intervalIndices: [0, 4, 5, 7, 12], // Unisono, 3M, 4G, 5G, 8va
    timeLimit: null,
    showIntervalName: true,
    description: '5 intervalli consonanti • Nessun limite di tempo'
  },
  medium: {
    intervalIndices: [0, 2, 4, 5, 7, 9, 12], // + 2M, 6M
    timeLimit: 15,
    showIntervalName: true,
    description: '7 intervalli • 15 secondi per rispondere'
  },
  hard: {
    intervalIndices: [0, 1, 2, 3, 4, 5, 7, 9, 10, 12], // + semitoni, 7m
    timeLimit: 10,
    showIntervalName: true,
    description: '10 intervalli • 10 secondi • Include dissonanze'
  },
  pro: {
    intervalIndices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // Tutti
    timeLimit: 8,
    showIntervalName: false,
    description: '13 intervalli • 8 secondi • Tutti i semitoni • Blind mode'
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
    description: '2 accordi • Maggiore e Minore • Nessun limite • Arpeggio • Root: C'
  },
  medium: {
    chordTypes: ['major', 'minor', 'diminished', 'augmented', 'sus2', 'sus4'],
    timeLimit: 15,
    showChordName: true,
    playMode: 'arpeggio',
    randomRoot: false,
    description: '6 accordi • Triadi complete • 15 secondi • Arpeggio • Root: C'
  },
  hard: {
    chordTypes: ['major', 'minor', 'diminished', 'augmented', 'maj7', 'dom7', 'min7', 'm7b5'],
    timeLimit: 10,
    showChordName: true,
    playMode: 'mixed',
    randomRoot: true,
    description: '8 accordi • Triadi + Settime • 10 secondi • Arpeggio/Blocco • Root casuale'
  },
  pro: {
    chordTypes: ['major', 'minor', 'diminished', 'augmented', 'maj7', 'dom7', 'min7', 'm7b5', 'sus2', 'sus4', 'add9', 'ninth'],
    timeLimit: 8,
    showChordName: false,
    playMode: 'block',
    randomRoot: true,
    description: '12 accordi • Full spectrum • 8 secondi • Blind mode • Blocco • Root casuale'
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
  allowance: number; // cents di tolleranza per accuracy
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
    allowance: 50, // ±50 cents
    description: '5 note centrali • Nessun limite • Range ristretto (C4-A4)'
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
    allowance: 40, // ±40 cents
    description: '7 note • 15 secondi • Range medio (C4-B4)'
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
    allowance: 30, // ±30 cents
    description: '12 note • 10 secondi • Range esteso (G3-E5) • Salti d\'ottava'
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
    showNoteName: false, // Blind mode
    allowance: 20, // ±20 cents (molto preciso)
    description: '15 note • 8 secondi • Full range (F3-F5) • Blind mode • Precisione massima'
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getDifficultyLabel = (difficulty: Difficulty): string => {
  return `${DIFFICULTY_META[difficulty].emoji} ${DIFFICULTY_META[difficulty].label}`;
};

export const getDifficultyColor = (difficulty: Difficulty): string => {
  return DIFFICULTY_META[difficulty].color;
};