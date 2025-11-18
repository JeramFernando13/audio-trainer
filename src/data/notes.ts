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