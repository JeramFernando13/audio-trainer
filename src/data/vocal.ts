export interface VoiceType {
  name: string;
  gender: string;
  lowNote: string;
  highNote: string;
  lowFreq: number;
  highFreq: number;
  color: string;
}

export const VOICE_TYPES: VoiceType[] = [
  { name: 'Soprano', gender: 'Donna', lowNote: 'C4', highNote: 'C6', lowFreq: 261.63, highFreq: 1046.50, color: 'from-pink-400 to-pink-500' },
  { name: 'Mezzosoprano', gender: 'Donna', lowNote: 'A3', highNote: 'A5', lowFreq: 220.00, highFreq: 880.00, color: 'from-purple-400 to-purple-500' },
  { name: 'Contralto', gender: 'Donna', lowNote: 'F3', highNote: 'F5', lowFreq: 174.61, highFreq: 698.46, color: 'from-indigo-400 to-indigo-500' },
  { name: 'Tenore', gender: 'Uomo', lowNote: 'C3', highNote: 'C5', lowFreq: 130.81, highFreq: 523.25, color: 'from-blue-400 to-blue-500' },
  { name: 'Baritono', gender: 'Uomo', lowNote: 'A2', highNote: 'A4', lowFreq: 110.00, highFreq: 440.00, color: 'from-teal-400 to-teal-500' },
  { name: 'Basso', gender: 'Uomo', lowNote: 'E2', highNote: 'E4', lowFreq: 82.41, highFreq: 329.63, color: 'from-green-400 to-green-500' },
];

export const RANGE_STORAGE_KEY = 'audioTrainer_vocalRange';

export const loadSavedRange = (): { low: string; high: string; type: string } | null => {
  const saved = localStorage.getItem(RANGE_STORAGE_KEY);
  return saved ? JSON.parse(saved) : null;
};