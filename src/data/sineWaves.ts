// ============================================
// SINE WAVE LEARN - DATA FILE
// ============================================
// Tutti i contenuti didattici per la pagina SineWaveLearn
// Facilmente espandibile e migrabile su Supabase

// Quick Check Questions (Mini Quiz)
export const QUICK_CHECKS = [
  {
    question: 'Una sine wave pura contiene...',
    options: ['Tutte le frequenze', 'Una sola frequenza', 'Frequenze casuali', 'Armoniche multiple'],
    correct: 1,
    explanation: 'Una sine wave pura contiene UNA SOLA frequenza fondamentale, senza armoniche. Per questo ha THD = 0%.',
  },
  {
    question: 'Il THD di una sine wave pura teorica è...',
    options: ['0%', '0.1%', '1%', '10%'],
    correct: 0,
    explanation: 'THD = 0% perché una sine wave perfetta non ha armoniche. È solo la frequenza fondamentale, niente altro.',
  },
  {
    question: 'A quale frequenza l\'orecchio umano è più sensibile?',
    options: ['1 kHz', '2 kHz', '4 kHz', '8 kHz'],
    correct: 2,
    explanation: '4 kHz è il picco di sensibilità secondo la curva Fletcher-Munson. L\'orecchio percepisce 4kHz circa 13dB più forte di altre frequenze.',
  },
];

// Visual Spectrum Guide
export const SPECTRUM_BANDS = [
  { range: '20-60 Hz', label: 'Sub Bass', color: 'bg-red-600', usage: 'Kick fundamentale, rimbombo', width: '10%' },
  { range: '60-250 Hz', label: 'Bass', color: 'bg-orange-600', usage: 'Basso, kick, calore', width: '15%' },
  { range: '250-500 Hz', label: 'Low Mids', color: 'bg-yellow-600', usage: 'Corpo voce, muddiness', width: '15%' },
  { range: '500-2k Hz', label: 'Mids', color: 'bg-green-600', usage: 'Voce, chitarre, presenza', width: '20%' },
  { range: '2k-4k Hz', label: 'High Mids', color: 'bg-cyan-600', usage: 'Definizione, chiarezza', width: '15%' },
  { range: '4k-8k Hz', label: 'Presence', color: 'bg-blue-600', usage: 'Sibilanti, brillantezza', width: '15%' },
  { range: '8k-20k Hz', label: 'Air', color: 'bg-purple-600', usage: 'Aria, apertura, shimmer', width: '10%' },
];

// Real-World Scenarios
export const SCENARIOS = [
  {
    title: 'Scenario 1: Feedback Live',
    problem: 'Durante il soundcheck, appena il cantante si avvicina al monitor, parte un fischio acuto.',
    question: 'Quale strumento usi per trovare la frequenza esatta?',
    options: ['Pink Noise', 'Sine Wave Sweep', 'White Noise', 'Music Track'],
    correct: 1,
    solution: 'Sine wave sweep! Fai partire uno sweep lento 20Hz-20kHz. Quando senti il feedback, fermi e leggi la frequenza (es: 3.2kHz). Poi tagli quella frequenza con Q=12-15 per -6dB.',
    proTip: 'Nel mondo reale, feedback sono spesso a: 2-3kHz (vocals), 4-5kHz (sibilanti), 250-500Hz (room modes)',
  },
  {
    title: 'Scenario 2: Mix Fangoso',
    problem: 'Il mix suona "muddy" e poco chiaro. Sospetti accumulo sui bassi.',
    question: 'Quale frequenza tipicamente causa muddiness?',
    options: ['63 Hz', '125 Hz', '250 Hz', '500 Hz'],
    correct: 2,
    solution: '250 Hz è la "muddy zone"! È dove si accumula l\'energia dei bassi e della voce maschile. Tagliare 2-4dB qui con Q=2-3 schiarisce il mix senza perdere peso.',
    proTip: 'Test rapido: boost +6dB @ 250Hz con Q=2. Se suona subito "fangoso", hai trovato il problema!',
  },
  {
    title: 'Scenario 3: Speaker Testing',
    problem: 'Hai comprato speaker usati e vuoi testare se sono danneggiati.',
    question: 'Quale test fai per rivelare danni al woofer?',
    options: ['Pink noise full range', 'Sine wave 100Hz volume crescente', 'Music track bassa', 'Frequency sweep'],
    correct: 1,
    solution: 'Sine wave 100Hz a volume crescente! Speaker sano gestisce 100-110dB SPL senza distorsione. Se senti distorsione sotto 85dB SPL, il woofer è probabilmente danneggiato (voicecoil o sospensione).',
    proTip: 'Altri test: sine @ 1kHz per mid-range, sine @ 10kHz per tweeter. THD dovrebbe rimanere <3% fino a volume massimo.',
  },
];

// Technical Specs
export const TECHNICAL_SPECS = [
  {
    parameter: 'Densità Spettrale',
    sine: 'Infinita su singola frequenza',
    explanation: 'La sine wave concentra tutta la sua energia su UN SOLO punto dello spettro. Questo la rende ideale per identificare frequenze precise.',
  },
  {
    parameter: 'THD (Total Harmonic Distortion)',
    sine: '0.00% (teorico)',
    explanation: 'THD = 0% perché una sine wave perfetta non ha armoniche. È solo la frequenza fondamentale. Usata per testare purezza di amplificatori.',
  },
  {
    parameter: 'Crest Factor',
    sine: '3.01 dB',
    explanation: 'Differenza tra picco massimo e livello medio (RMS). Sine wave ha picchi costanti e prevedibili, sempre 3.01 dB.',
  },
];

// Critical Frequencies for Practice
export const CRITICAL_FREQUENCIES = [
  { freq: 63, label: '63', color: 'from-red-500 to-red-600', note: 'Room Mode' },
  { freq: 100, label: '100', color: 'from-orange-500 to-orange-600', note: 'Kick Fund.' },
  { freq: 250, label: '250', color: 'from-yellow-500 to-yellow-600', note: 'Muddy' },
  { freq: 500, label: '500', color: 'from-green-500 to-green-600', note: 'Reference' },
  { freq: 1000, label: '1k', color: 'from-cyan-500 to-cyan-600', note: 'Standard' },
  { freq: 2000, label: '2k', color: 'from-blue-500 to-blue-600', note: 'Presence' },
  { freq: 4000, label: '4k', color: 'from-purple-500 to-purple-600', note: 'Ear Peak' },
  { freq: 8000, label: '8k', color: 'from-pink-500 to-pink-600', note: 'Sibilance' },
];

// ISO Standard Octave Bands
export const ISO_OCTAVE_BANDS = [31.5, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];

// Musical Notes (A440 Standard)
export const MUSICAL_NOTES = [
  { freq: 110, label: 'A2' },
  { freq: 220, label: 'A3' },
  { freq: 261.63, label: 'C4' },
  { freq: 293.66, label: 'D4' },
  { freq: 329.63, label: 'E4' },
  { freq: 392, label: 'G4' },
  { freq: 440, label: 'A4' },
  { freq: 523.25, label: 'C5' },
  { freq: 587.33, label: 'D5' },
  { freq: 659.25, label: 'E5' },
  { freq: 880, label: 'A5' },
  { freq: 1046.5, label: 'C6' },
];