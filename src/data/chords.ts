// Root notes with frequencies
export const ROOT_NOTES = [
  { name: 'C', freq: 261.63 },
  { name: 'C#/Db', freq: 277.18 },
  { name: 'D', freq: 293.66 },
  { name: 'D#/Eb', freq: 311.13 },
  { name: 'E', freq: 329.63 },
  { name: 'F', freq: 349.23 },
  { name: 'F#/Gb', freq: 369.99 },
  { name: 'G', freq: 392.00 },
  { name: 'G#/Ab', freq: 415.30 },
  { name: 'A', freq: 440.00 },
  { name: 'A#/Bb', freq: 466.16 },
  { name: 'B', freq: 493.88 },
] as const;

export type RootNote = typeof ROOT_NOTES[number];

// Simplified roots for training (short names)
export interface Root {
  freq: number;
  name: string;
  nameFull: string;
}

export const ROOTS: Root[] = [
  { freq: 261.63, name: 'C', nameFull: 'Do' },
  { freq: 277.18, name: 'C#', nameFull: 'Do#' },
  { freq: 293.66, name: 'D', nameFull: 'Re' },
  { freq: 311.13, name: 'D#', nameFull: 'Re#' },
  { freq: 329.63, name: 'E', nameFull: 'Mi' },
  { freq: 349.23, name: 'F', nameFull: 'Fa' },
  { freq: 369.99, name: 'F#', nameFull: 'Fa#' },
  { freq: 392.00, name: 'G', nameFull: 'Sol' },
  { freq: 415.30, name: 'G#', nameFull: 'Sol#' },
  { freq: 440.00, name: 'A', nameFull: 'La' },
  { freq: 466.16, name: 'A#', nameFull: 'La#' },
  { freq: 493.88, name: 'B', nameFull: 'Si' },
];

// Chord Types for Training (simplified structure)
export interface ChordType {
  name: string;
  intervals: number[];
  symbol: string;
  category: 'triad' | 'seventh' | 'extended' | 'suspended';
}

export const CHORD_TYPES: Record<string, ChordType> = {
  major: { 
    name: 'Maggiore', 
    intervals: [0, 4, 7], 
    symbol: '', 
    category: 'triad' 
  },
  minor: { 
    name: 'Minore', 
    intervals: [0, 3, 7], 
    symbol: 'm', 
    category: 'triad' 
  },
  diminished: { 
    name: 'Diminuito', 
    intervals: [0, 3, 6], 
    symbol: 'dim', 
    category: 'triad' 
  },
  augmented: { 
    name: 'Aumentato', 
    intervals: [0, 4, 8], 
    symbol: 'aug', 
    category: 'triad' 
  },
  maj7: { 
    name: 'Settima Maggiore', 
    intervals: [0, 4, 7, 11], 
    symbol: 'maj7', 
    category: 'seventh' 
  },
  dom7: { 
    name: 'Settima Dominante', 
    intervals: [0, 4, 7, 10], 
    symbol: '7', 
    category: 'seventh' 
  },
  min7: { 
    name: 'Settima Minore', 
    intervals: [0, 3, 7, 10], 
    symbol: 'm7', 
    category: 'seventh' 
  },
  m7b5: { 
    name: 'Semi-diminuito', 
    intervals: [0, 3, 6, 10], 
    symbol: 'm7♭5', 
    category: 'seventh' 
  },
  sus2: { 
    name: 'Sospeso 2', 
    intervals: [0, 2, 7], 
    symbol: 'sus2', 
    category: 'suspended' 
  },
  sus4: { 
    name: 'Sospeso 4', 
    intervals: [0, 5, 7], 
    symbol: 'sus4', 
    category: 'suspended' 
  },
  add9: { 
    name: 'Add 9', 
    intervals: [0, 4, 7, 14], 
    symbol: 'add9', 
    category: 'extended' 
  },
  ninth: { 
    name: 'Nona', 
    intervals: [0, 4, 7, 10, 14], 
    symbol: '9', 
    category: 'extended' 
  },
};

// Helper to get chord types by category
export const getChordsByCategory = (category: ChordType['category']) => {
  return Object.entries(CHORD_TYPES)
    .filter(([, chord]) => chord.category === category)
    .map(([key, chord]) => ({ key, ...chord }));
};

// Helper functions
export const getTriads = () => getChordsByCategory('triad');
export const getSevenths = () => getChordsByCategory('seventh');
export const getSuspended = () => getChordsByCategory('suspended');
export const getExtended = () => getChordsByCategory('extended');

// ============================================
// CHORDS GUIDE (for ChordsLearn component)
// ============================================

export const CHORDS_GUIDE = [
  // TRIADI
  {
    name: 'Maggiore',
    symbol: 'C / Cmaj',
    intervals: [0, 4, 7],
    formula: '1 - 3 - 5',
    description: 'La triade più comune. Suono brillante e stabile.',
    feeling: 'Felicità, stabilità, risoluzione, luminosità',
    context: 'Base della musica pop, rock, folk. Accordo "felice".',
    color: 'from-yellow-400 to-yellow-500',
    category: 'Triadi',
  },
  {
    name: 'Minore',
    symbol: 'Cm / Cmin / C-',
    intervals: [0, 3, 7],
    formula: '1 - b3 - 5',
    description: 'Terza abbassata di un semitono rispetto al maggiore.',
    feeling: 'Tristezza, malinconia, introspezione, serietà',
    context: 'Ballad tristi, metal, musica drammatica. Accordo "triste".',
    color: 'from-blue-400 to-blue-500',
    category: 'Triadi',
  },
  {
    name: 'Diminuito',
    symbol: 'Cdim / C°',
    intervals: [0, 3, 6],
    formula: '1 - b3 - b5',
    description: 'Triade instabile. Quinta abbassata.',
    feeling: 'Tensione, instabilità, suspense, paura',
    context: 'Musica horror, jazz (accordo di passaggio), tensione drammatica.',
    color: 'from-red-500 to-red-600',
    category: 'Triadi',
  },
  {
    name: 'Aumentato',
    symbol: 'Caug / C+',
    intervals: [0, 4, 8],
    formula: '1 - 3 - #5',
    description: 'Triade simmetrica. Quinta alzata.',
    feeling: 'Sospensione, mistero, instabilità "magica"',
    context: 'Jazz, musical theatre, transizioni misteriose. Raro nel pop.',
    color: 'from-purple-500 to-purple-600',
    category: 'Triadi',
  },
  // QUADRIADI (7th)
  {
    name: 'Settima dominante',
    symbol: 'C7 / Cdom7',
    intervals: [0, 4, 7, 10],
    formula: '1 - 3 - 5 - b7',
    description: 'L\'accordo che "vuole risolvere". Fondamentale nel blues.',
    feeling: 'Tensione che cerca risoluzione, blues, funk',
    context: 'Blues, funk, jazz. V7 che risolve al I. Rock\'n\'roll.',
    color: 'from-orange-500 to-orange-600',
    category: 'Settime',
  },
  {
    name: 'Settima maggiore',
    symbol: 'Cmaj7 / CΔ7',
    intervals: [0, 4, 7, 11],
    formula: '1 - 3 - 5 - 7',
    description: 'Suono sofisticato e sognante. La settima è naturale.',
    feeling: 'Sofisticato, sognante, rilassato, "lounge"',
    context: 'Jazz, bossa nova, neo-soul, R&B moderno. Suono "elegante".',
    color: 'from-teal-500 to-teal-600',
    category: 'Settime',
  },
  {
    name: 'Settima minore',
    symbol: 'Cm7 / Cmin7 / C-7',
    intervals: [0, 3, 7, 10],
    formula: '1 - b3 - 5 - b7',
    description: 'Minore con settima minore. Molto usato nel jazz.',
    feeling: 'Morbido, malinconico ma caldo, jazzy',
    context: 'Jazz, R&B, neo-soul, hip-hop. II-7 nelle progressioni jazz.',
    color: 'from-indigo-500 to-indigo-600',
    category: 'Settime',
  },
  {
    name: 'Semidiminuito',
    symbol: 'Cm7b5 / Cø',
    intervals: [0, 3, 6, 10],
    formula: '1 - b3 - b5 - b7',
    description: 'Diminuito con settima minore. "Half-diminished".',
    feeling: 'Tensione sofisticata, ambiguo, jazzy',
    context: 'Jazz (ii nel minore), bossa nova. Accordo di passaggio elegante.',
    color: 'from-pink-500 to-pink-600',
    category: 'Settime',
  },
  {
    name: 'Diminuito settima',
    symbol: 'Cdim7 / C°7',
    intervals: [0, 3, 6, 9],
    formula: '1 - b3 - b5 - bb7',
    description: 'Completamente simmetrico. Ogni nota equidistante.',
    feeling: 'Massima tensione, drammatico, cinematografico',
    context: 'Musica classica, jazz, colonne sonore. Tensione estrema.',
    color: 'from-red-600 to-red-700',
    category: 'Settime',
  },
] as const;

export type Chord = typeof CHORDS_GUIDE[number];