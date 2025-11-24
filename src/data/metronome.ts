// ============================================
// METRONOME - DATA FILE
// ============================================

export interface MetronomePreset {
  name: string;
  bpm: number;
  timeSignature: string;
  description: string;
  genre?: string;
}

export interface TimeSignature {
  label: string;
  value: string;
  beatsPerBar: number;
  noteValue: number;
}

export interface ClickSoundType {
  id: string;
  name: string;
  type: 'synth' | 'sample';
  description: string;
}

export interface SubdivisionType {
  id: string;
  name: string;
  value: number; // beats per quarter note
  display: string[];
}

// Preset BPM comuni
export const METRONOME_PRESETS: MetronomePreset[] = [
  { name: 'Ballad', bpm: 60, timeSignature: '4/4', description: 'Slow ballad tempo', genre: 'Ballad' },
  { name: 'Adagio', bpm: 70, timeSignature: '4/4', description: 'Slow and stately', genre: 'Classical' },
  { name: 'Andante', bpm: 80, timeSignature: '4/4', description: 'Walking pace', genre: 'Classical' },
  { name: 'Moderato', bpm: 95, timeSignature: '4/4', description: 'Moderate tempo', genre: 'Classical' },
  { name: 'Pop/Rock', bpm: 120, timeSignature: '4/4', description: 'Standard pop tempo', genre: 'Pop' },
  { name: 'Funk', bpm: 110, timeSignature: '4/4', description: 'Groovy funk tempo', genre: 'Funk' },
  { name: 'Disco', bpm: 125, timeSignature: '4/4', description: 'Classic disco beat', genre: 'Disco' },
  { name: 'House', bpm: 128, timeSignature: '4/4', description: 'Four-on-the-floor', genre: 'EDM' },
  { name: 'Techno', bpm: 135, timeSignature: '4/4', description: 'Fast electronic', genre: 'EDM' },
  { name: 'Drum & Bass', bpm: 174, timeSignature: '4/4', description: 'High energy DnB', genre: 'EDM' },
  { name: 'Punk Rock', bpm: 180, timeSignature: '4/4', description: 'Fast and aggressive', genre: 'Rock' },
  { name: 'Jazz Waltz', bpm: 140, timeSignature: '3/4', description: 'Swinging waltz', genre: 'Jazz' },
  { name: 'Shuffle', bpm: 90, timeSignature: '12/8', description: 'Triplet feel shuffle', genre: 'Blues' },
  { name: '5/4 Groove', bpm: 160, timeSignature: '5/4', description: 'Take Five style', genre: 'Jazz' },
  { name: '7/8 Odd', bpm: 120, timeSignature: '7/8', description: 'Progressive odd meter', genre: 'Prog' },
];

// Time Signatures disponibili
export const TIME_SIGNATURES: TimeSignature[] = [
  { label: '1/4', value: '1/4', beatsPerBar: 1, noteValue: 4 },
  { label: '2/4', value: '2/4', beatsPerBar: 2, noteValue: 4 },
  { label: '3/4', value: '3/4', beatsPerBar: 3, noteValue: 4 },
  { label: '4/4', value: '4/4', beatsPerBar: 4, noteValue: 4 },
  { label: '5/4', value: '5/4', beatsPerBar: 5, noteValue: 4 },
  { label: '6/4', value: '6/4', beatsPerBar: 6, noteValue: 4 },
  { label: '7/4', value: '7/4', beatsPerBar: 7, noteValue: 4 },
  { label: '3/8', value: '3/8', beatsPerBar: 3, noteValue: 8 },
  { label: '6/8', value: '6/8', beatsPerBar: 6, noteValue: 8 },
  { label: '7/8', value: '7/8', beatsPerBar: 7, noteValue: 8 },
  { label: '9/8', value: '9/8', beatsPerBar: 9, noteValue: 8 },
  { label: '12/8', value: '12/8', beatsPerBar: 12, noteValue: 8 },
];

// Tipi di Click Sound
export const CLICK_SOUNDS: ClickSoundType[] = [
  { 
    id: 'woodblock', 
    name: 'Woodblock', 
    type: 'synth',
    description: 'Classic metronome sound'
  },
  { 
    id: 'beep', 
    name: 'Electronic Beep', 
    type: 'synth',
    description: 'Clean sine wave beep'
  },
  { 
    id: 'click', 
    name: 'Stick Click', 
    type: 'synth',
    description: 'Sharp percussive click'
  },
  { 
    id: 'cowbell', 
    name: 'Cowbell', 
    type: 'synth',
    description: 'More cowbell!'
  },
  { 
    id: 'rim', 
    name: 'Rim Shot', 
    type: 'synth',
    description: 'Snare rim sound'
  },
  { 
    id: 'clap', 
    name: 'Clap', 
    type: 'synth',
    description: 'Hand clap sound'
  },
];

// Subdivision Types
export const SUBDIVISIONS: SubdivisionType[] = [
  { 
    id: 'quarter', 
    name: 'Quarter Notes', 
    value: 1,
    display: ['1', '2', '3', '4']
  },
  { 
    id: 'eighth', 
    name: 'Eighth Notes', 
    value: 2,
    display: ['1', '&', '2', '&', '3', '&', '4', '&']
  },
  { 
    id: 'triplet', 
    name: 'Triplets', 
    value: 3,
    display: ['1', 'la', 'li', '2', 'la', 'li', '3', 'la', 'li', '4', 'la', 'li']
  },
  { 
    id: 'sixteenth', 
    name: 'Sixteenth Notes', 
    value: 4,
    display: ['1', 'e', '&', 'a', '2', 'e', '&', 'a', '3', 'e', '&', 'a', '4', 'e', '&', 'a']
  },
];

// Training Programs
export interface TrainingProgram {
  name: string;
  description: string;
  startBpm: number;
  endBpm: number;
  duration: number; // minutes
  increment: number; // BPM per step
}

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    name: 'Beginner Warm-up',
    description: 'Gradual increase from 60 to 100 BPM',
    startBpm: 60,
    endBpm: 100,
    duration: 10,
    increment: 4,
  },
  {
    name: 'Speed Builder',
    description: 'Build speed from 80 to 140 BPM',
    startBpm: 80,
    endBpm: 140,
    duration: 15,
    increment: 4,
  },
  {
    name: 'Shred Training',
    description: 'Push limits from 120 to 200 BPM',
    startBpm: 120,
    endBpm: 200,
    duration: 20,
    increment: 4,
  },
  {
    name: 'Custom Range',
    description: 'Set your own start/end BPM',
    startBpm: 60,
    endBpm: 120,
    duration: 10,
    increment: 5,
  },
];

// BPM Limits
export const BPM_MIN = 40;
export const BPM_MAX = 300;
export const BPM_DEFAULT = 120;

// Volume Limits
export const VOLUME_MIN = -40;
export const VOLUME_MAX = 0;
export const VOLUME_DEFAULT = -10;