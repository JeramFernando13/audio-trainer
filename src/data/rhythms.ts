// Rhythm patterns and configurations

export interface RhythmPattern {
  name: string;
  category: 'Basic' | 'Syncopation' | 'Triplets' | 'Advanced' | 'Polyrhythm';
  timeSignature: string;
  bpm: number;
  pattern: number[]; // Durations in 16th notes (1 = sixteenth, 2 = eighth, 4 = quarter, etc.)
  notation: string; // Visual representation
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'pro';
  examples: string; // Famous songs/contexts
  color: string;
}

export const RHYTHM_PATTERNS: RhythmPattern[] = [
  // ============================================
  // BASIC PATTERNS (Easy)
  // ============================================
  {
    name: 'Quarter Notes',
    category: 'Basic',
    timeSignature: '4/4',
    bpm: 80,
    pattern: [4, 4, 4, 4], // Four quarter notes
    notation: '♩ ♩ ♩ ♩',
    description: 'Four steady quarter notes. The most basic rhythm pattern.',
    difficulty: 'easy',
    examples: 'Rock steady beat, We Will Rock You (Queen)',
    color: 'bg-blue-900',
  },
  {
    name: 'Half Notes',
    category: 'Basic',
    timeSignature: '4/4',
    bpm: 80,
    pattern: [8, 8], // Two half notes
    notation: '𝅗𝅥 𝅗𝅥',
    description: 'Two half notes filling the bar.',
    difficulty: 'easy',
    examples: 'Slow ballads, hymns',
    color: 'bg-blue-900',
  },
  {
    name: 'Eighth Notes',
    category: 'Basic',
    timeSignature: '4/4',
    bpm: 80,
    pattern: [2, 2, 2, 2, 2, 2, 2, 2], // Eight eighth notes
    notation: '♫ ♫ ♫ ♫',
    description: 'Eight steady eighth notes. Twice as fast as quarters.',
    difficulty: 'easy',
    examples: 'Rock hi-hat, pop bass lines',
    color: 'bg-blue-900',
  },
  {
    name: 'Whole Note',
    category: 'Basic',
    timeSignature: '4/4',
    bpm: 80,
    pattern: [16], // One whole note
    notation: '𝅝',
    description: 'One sustained note for the entire bar.',
    difficulty: 'easy',
    examples: 'Orchestra holds, ambient music',
    color: 'bg-blue-900',
  },

  // ============================================
  // SYNCOPATION (Medium)
  // ============================================
  {
    name: 'Basic Syncopation',
    category: 'Syncopation',
    timeSignature: '4/4',
    bpm: 90,
    pattern: [2, 2, 4, 2, 2, 4], // Eighth-eighth-quarter-eighth-eighth-quarter
    notation: '♫ ♩ ♫ ♩',
    description: 'Off-beat emphasis. Classic syncopated rhythm.',
    difficulty: 'medium',
    examples: 'Reggae, ska, funk grooves',
    color: 'bg-purple-900',
  },
  {
    name: 'Charleston Rhythm',
    category: 'Syncopation',
    timeSignature: '4/4',
    bpm: 100,
    pattern: [3, 1, 3, 1, 3, 1, 3, 1], // Dotted eighth + sixteenth pattern
    notation: '♩. 𝅘𝅥𝅯 ♩. 𝅘𝅥𝅯',
    description: 'Dotted eighth + sixteenth note pattern. Swinging feel.',
    difficulty: 'medium',
    examples: 'Jazz, swing, Charleston dance',
    color: 'bg-purple-900',
  },
  {
    name: 'Backbeat',
    category: 'Syncopation',
    timeSignature: '4/4',
    bpm: 100,
    pattern: [4, 4, 4, 4], // Quarter notes but emphasized on 2 and 4
    notation: '♩ ♩* ♩ ♩*',
    description: 'Quarter notes with emphasis on beats 2 and 4.',
    difficulty: 'medium',
    examples: 'Rock, pop, R&B - snare on 2 and 4',
    color: 'bg-purple-900',
  },
  {
    name: 'Son Clave (3-2)',
    category: 'Syncopation',
    timeSignature: '4/4',
    bpm: 100,
    pattern: [3, 3, 2, 3, 5], // Latin clave pattern
    notation: '○ ○ ○ ○ ○',
    description: 'Latin/Afro-Cuban clave pattern. Foundation of salsa.',
    difficulty: 'medium',
    examples: 'Salsa, Latin jazz, Afro-Cuban music',
    color: 'bg-purple-900',
  },

  // ============================================
  // TRIPLETS (Medium-Hard)
  // ============================================
  {
    name: 'Quarter Note Triplets',
    category: 'Triplets',
    timeSignature: '4/4',
    bpm: 80,
    pattern: [5, 6, 5], // Three notes in space of two quarters (adjusted for 16ths)
    notation: '♩₃ ♩₃ ♩₃',
    description: 'Three quarter notes in the time of two. Feels like 3 against 2.',
    difficulty: 'hard',
    examples: 'Progressive rock, fusion, Dream Theater',
    color: 'bg-orange-900',
  },
  {
    name: 'Eighth Note Triplets',
    category: 'Triplets',
    timeSignature: '4/4',
    bpm: 90,
    pattern: [2, 3, 2, 3, 2, 3], // Six triplet eighths (simplified)
    notation: '♫₃ ♫₃ ♫₃ ♫₃',
    description: 'Six triplet eighth notes. Three notes per beat.',
    difficulty: 'hard',
    examples: 'Blues shuffle, jazz walking, Hallelujah (Cohen)',
    color: 'bg-orange-900',
  },
  {
    name: 'Shuffle (Swing)',
    category: 'Triplets',
    timeSignature: '4/4',
    bpm: 100,
    pattern: [3, 1, 3, 1, 3, 1, 3, 1], // Long-short pattern
    notation: '♩. 𝅘𝅥𝅯 ♩. 𝅘𝅥𝅯',
    description: 'Swung eighth notes. First note longer than second.',
    difficulty: 'hard',
    examples: 'Blues, jazz, swing music',
    color: 'bg-orange-900',
  },

  // ============================================
  // ADVANCED PATTERNS (Hard)
  // ============================================
  {
    name: 'Sixteenth Notes',
    category: 'Advanced',
    timeSignature: '4/4',
    bpm: 80,
    pattern: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 16 sixteenth notes
    notation: '𝅘𝅥𝅯 𝅘𝅥𝅯 𝅘𝅥𝅯 𝅘𝅥𝅯 ...',
    description: 'Sixteen fast notes. Requires precision.',
    difficulty: 'hard',
    examples: 'Metal double bass, drum fills, shredding',
    color: 'bg-red-900',
  },
  {
    name: 'Hemiola',
    category: 'Advanced',
    timeSignature: '3/4',
    bpm: 90,
    pattern: [4, 4, 4], // Three quarters in 3/4 that feel like 6/8
    notation: '♩ ♩ ♩ (feels like 2 groups of 3)',
    description: 'Three against two feel. Pattern shifts between groupings.',
    difficulty: 'hard',
    examples: 'Classical music, Bernstein, progressive rock',
    color: 'bg-red-900',
  },
  {
    name: 'Rumba Clave (3-2)',
    category: 'Advanced',
    timeSignature: '4/4',
    bpm: 100,
    pattern: [3, 3, 2, 2, 6], // Rumba variation
    notation: '○ ○ ○ ○ ○',
    description: 'Rumba clave variation. More syncopated than son clave.',
    difficulty: 'hard',
    examples: 'Afro-Cuban rumba, Latin jazz',
    color: 'bg-red-900',
  },
  {
    name: 'Bossa Nova',
    category: 'Advanced',
    timeSignature: '4/4',
    bpm: 110,
    pattern: [3, 3, 2, 2, 3, 3], // Brazilian bossa pattern
    notation: '○ ○ ○ ○ ○ ○',
    description: 'Brazilian bossa nova pattern. Smooth and syncopated.',
    difficulty: 'hard',
    examples: 'Girl from Ipanema, bossa nova jazz',
    color: 'bg-red-900',
  },

  // ============================================
  // POLYRHYTHM (Pro)
  // ============================================
  {
    name: '3 Against 4',
    category: 'Polyrhythm',
    timeSignature: '4/4',
    bpm: 80,
    pattern: [5, 5, 6], // Simplified 3 over 4
    notation: '3:4 polyrhythm',
    description: 'Three notes evenly spaced against four beats. Mind-bending!',
    difficulty: 'pro',
    examples: 'African music, progressive metal, Tool',
    color: 'bg-slate-900',
  },
  {
    name: '5 Against 4',
    category: 'Polyrhythm',
    timeSignature: '4/4',
    bpm: 80,
    pattern: [3, 3, 3, 4, 3], // Simplified 5 over 4
    notation: '5:4 polyrhythm',
    description: 'Five notes evenly distributed over four beats. Very complex.',
    difficulty: 'pro',
    examples: 'Tool, Meshuggah, prog metal',
    color: 'bg-slate-900',
  },
  {
    name: '7/8 Time',
    category: 'Polyrhythm',
    timeSignature: '7/8',
    bpm: 120,
    pattern: [2, 2, 2, 2, 2, 2, 4], // Seven eighth notes grouped 2+2+3
    notation: '♫ ♫ ♫ ♩.',
    description: 'Seven eighth notes. Odd time signature with uneven feel.',
    difficulty: 'pro',
    examples: 'Money (Pink Floyd), Balkan music, prog rock',
    color: 'bg-slate-900',
  },
  {
    name: '5/4 Time',
    category: 'Polyrhythm',
    timeSignature: '5/4',
    bpm: 100,
    pattern: [4, 4, 4, 4, 4], // Five quarter notes
    notation: '♩ ♩ ♩ ♩ ♩',
    description: 'Five quarter notes. Asymmetric and challenging.',
    difficulty: 'pro',
    examples: 'Take Five (Dave Brubeck), Mission Impossible theme',
    color: 'bg-slate-900',
  },
];

// Difficulty configuration for training
export const RHYTHM_DIFFICULTY_CONFIG = {
  easy: {
    patterns: RHYTHM_PATTERNS.filter(p => p.difficulty === 'easy').map(p => p.name),
    bpm: 80,
    showMetronome: true,
    showVisual: true,
    timeLimit: null,
    label: 'Easy 🟢',
    description: 'Basic note values in 4/4 time',
  },
  medium: {
    patterns: RHYTHM_PATTERNS.filter(p => 
      p.difficulty === 'easy' || p.difficulty === 'medium'
    ).map(p => p.name),
    bpm: 100,
    showMetronome: true,
    showVisual: true,
    timeLimit: 20,
    label: 'Medium 🟡',
    description: 'Syncopation and basic variations',
  },
  hard: {
    patterns: RHYTHM_PATTERNS.filter(p => 
      p.difficulty === 'easy' || p.difficulty === 'medium' || p.difficulty === 'hard'
    ).map(p => p.name),
    bpm: 110,
    showMetronome: true,
    showVisual: false,
    timeLimit: 15,
    label: 'Hard 🟠',
    description: 'Triplets, sixteenths, and complex patterns',
  },
  pro: {
    patterns: RHYTHM_PATTERNS.map(p => p.name), // ALL patterns
    bpm: 120,
    showMetronome: false,
    showVisual: false,
    timeLimit: 10,
    label: 'Pro 🔴',
    description: 'Polyrhythms and odd time signatures (blind mode)',
  },
};

// Time signatures info
export const TIME_SIGNATURES = [
  {
    signature: '4/4',
    name: 'Common Time',
    description: '4 beats per bar, quarter note gets the beat',
    feel: 'Strong-Weak-Medium-Weak',
    examples: 'Most pop, rock, jazz',
  },
  {
    signature: '3/4',
    name: 'Waltz Time',
    description: '3 beats per bar, quarter note gets the beat',
    feel: 'Strong-Weak-Weak',
    examples: 'Waltz, country, some classical',
  },
  {
    signature: '6/8',
    name: 'Compound Duple',
    description: '6 beats per bar, eighth note gets the beat (feels like 2)',
    feel: 'Strong-weak-weak-Medium-weak-weak',
    examples: 'Irish jigs, some ballads',
  },
  {
    signature: '5/4',
    name: 'Quintuple Time',
    description: '5 beats per bar, quarter note gets the beat',
    feel: 'Usually grouped 3+2 or 2+3',
    examples: 'Take Five, Mission Impossible',
  },
  {
    signature: '7/8',
    name: 'Septuple Time',
    description: '7 beats per bar, eighth note gets the beat',
    feel: 'Usually grouped 2+2+3 or 3+2+2',
    examples: 'Money (Pink Floyd), Balkan music',
  },
];

// Note values reference
export const NOTE_VALUES = [
  { name: 'Whole Note', duration: 16, notation: '𝅝', description: '4 beats in 4/4' },
  { name: 'Half Note', duration: 8, notation: '𝅗𝅥', description: '2 beats in 4/4' },
  { name: 'Quarter Note', duration: 4, notation: '♩', description: '1 beat in 4/4' },
  { name: 'Eighth Note', duration: 2, notation: '♫', description: '1/2 beat in 4/4' },
  { name: 'Sixteenth Note', duration: 1, notation: '𝅘𝅥𝅯', description: '1/4 beat in 4/4' },
  { name: 'Dotted Half', duration: 12, notation: '𝅗𝅥.', description: '3 beats in 4/4' },
  { name: 'Dotted Quarter', duration: 6, notation: '♩.', description: '1.5 beats in 4/4' },
  { name: 'Triplet Quarter', duration: 5, notation: '♩₃', description: '3 in space of 2' },
  { name: 'Triplet Eighth', duration: 3, notation: '♫₃', description: '3 per beat' },
];