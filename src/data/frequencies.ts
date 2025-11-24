// ============================================
// EQ TRAINING - DATA FILE
// ============================================
// Tutti i contenuti per la pagina EQ Training (Pink Noise)

// 8 Main Frequency Bands (con vocali e colori)
export const FREQUENCY_GUIDE = [
  {
    name: 'Sub Bass',
    freq: 60,
    range: '20-60 Hz',
    vowel: '—',
    description: 'Non è una vocale, è il "peso" fisico che senti nel petto. Fondamentale di kick e bass.',
    tooMuch: 'Mix "rimbombante", confuso, mangia headroom',
    tooLittle: 'Mix "leggero", senza potenza, manca il punch',
    instruments: 'Kick drum, Sub bass, Bass synth (ottava bassa)',
    mixTip: 'Taglia sotto i 30Hz su tutto tranne kick e bass. Usa high-pass filter!',
    color: 'from-red-500 to-red-600',
  },
  {
    name: 'Bass',
    freq: 120,
    range: '60-250 Hz',
    vowel: 'UU',
    description: 'Fondamentale della voce maschile. Il "corpo" e calore degli strumenti.',
    tooMuch: 'Mix "fangoso" (muddy), poco definito',
    tooLittle: 'Mix "sottile", senza corpo, voci deboli',
    instruments: 'Basso elettrico, toms, voce maschile (fondamentale)',
    mixTip: 'Zona critica: spesso serve TAGLIARE per fare spazio. Bass e kick competono qui.',
    color: 'from-orange-500 to-orange-600',
  },
  {
    name: 'Low Mids',
    freq: 400,
    range: '250-500 Hz',
    vowel: 'UU (uno)',
    description: 'Vocale chiusa e scura. Zona "scatolosa" - la più problematica nel mix.',
    tooMuch: 'Suono "inscatolato" (boxy), nasale, claustrofobico',
    tooLittle: 'Manca corpo, suono "vuoto"',
    instruments: 'Snare (corpo), chitarre (fondamentale), voce (calore)',
    mixTip: 'Spesso la prima zona da tagliare (-3dB) su voci e chitarre. "Boxy" vive qui.',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    name: 'Mids',
    freq: 1000,
    range: '500-2000 Hz',
    vowel: 'OO → AH',
    description: 'Da vocale rotonda a aperta. Centro del mix, dove vive la maggior parte dell\'energia.',
    tooMuch: 'Mix "aggressivo", stancante, "honky"',
    tooLittle: 'Mix "scavato", manca presenza, distante',
    instruments: 'Voce (corpo principale), chitarre, snare (crack)',
    mixTip: '1kHz è il "centro di gravità". Piccoli tagli qui fanno spazio per tutto.',
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'Upper Mids',
    freq: 2500,
    range: '2-4 kHz',
    vowel: 'EH (bene)',
    description: 'Vocale nasale. INTELLIGIBILITÀ della voce - capisci le parole qui.',
    tooMuch: 'Voce "nasale", harsh, stancante per le orecchie',
    tooLittle: 'Voce sepolta nel mix, non si capiscono le parole',
    instruments: 'Voce (presenza), chitarra elettrica (bite), snare (crack)',
    mixTip: 'Boost moderato (+2-3dB) sulla voce per farla emergere. Troppo = harsh!',
    color: 'from-teal-500 to-teal-600',
  },
  {
    name: 'Presence',
    freq: 5000,
    range: '4-6 kHz',
    vowel: 'II (vino)',
    description: 'Vocale brillante. Definizione e "attacco" degli strumenti.',
    tooMuch: 'Suono "metallico", sibilante, faticoso',
    tooLittle: 'Mix "opaco", senza vita, distante',
    instruments: 'Piatti (definizione), voce (aria), chitarra acustica (brillantezza)',
    mixTip: 'De-esser lavora qui! Controlla le sibilanti "S" e "T".',
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Brilliance',
    freq: 8000,
    range: '6-12 kHz',
    vowel: 'SSS',
    description: 'Consonanti fricative. "Aria" e brillantezza, dettaglio stereo.',
    tooMuch: 'Sibilanti eccessive, suono "graffiante"',
    tooLittle: 'Mix "scuro", manca apertura e dettaglio',
    instruments: 'Hi-hat, piatti, shaker, respiro vocale',
    mixTip: 'Shelf boost qui aggiunge "aria" al mix. Ma attenzione al rumore!',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    name: 'Air',
    freq: 12000,
    range: '12-20 kHz',
    vowel: 'Respiro',
    description: 'Frequenze altissime. "Spazio" e apertura del mix. Molti non le sentono bene.',
    tooMuch: 'Rumore di fondo amplificato, harsh',
    tooLittle: 'Mix "chiuso", manca spazialità',
    instruments: 'Overhead drums, room mics, synth pad (shimmer)',
    mixTip: 'Con l\'età perdiamo sensibilità qui. Non esagerare con i boost!',
    color: 'from-purple-500 to-purple-600',
  },
] as const;

// ISO Standard Octave Bands (10 bande aggiuntive per practice)
export const ISO_OCTAVE_BANDS = [
  { freq: 31.5, label: '31.5 Hz' },
  { freq: 63, label: '63 Hz' },
  { freq: 125, label: '125 Hz' },
  { freq: 250, label: '250 Hz' },
  { freq: 500, label: '500 Hz' },
  { freq: 1000, label: '1 kHz' },
  { freq: 2000, label: '2 kHz' },
  { freq: 4000, label: '4 kHz' },
  { freq: 8000, label: '8 kHz' },
  { freq: 16000, label: '16 kHz' },
];

// Quiz Questions
export const QUIZ_QUESTIONS = [
  {
    question: 'Quale banda causa il suono "muddy" o fangoso?',
    options: ['Sub Bass (20-60 Hz)', 'Bass (60-250 Hz)', 'Low Mids (250-500 Hz)', 'Mids (500-2000 Hz)'],
    correct: 1,
    explanation: 'La banda Bass (60-250 Hz) è la principale causa di "muddy" mix. Spesso serve tagliare qui per fare spazio.',
  },
  {
    question: 'In quale banda si trova l\'intelligibilità della voce?',
    options: ['Mids (500-2k Hz)', 'Upper Mids (2-4k Hz)', 'Presence (4-6k Hz)', 'Brilliance (6-12k Hz)'],
    correct: 1,
    explanation: 'Upper Mids (2-4 kHz) è dove si capiscono le parole. Boost qui fa emergere la voce nel mix.',
  },
  {
    question: 'Cosa succede con troppo boost su Presence (4-6 kHz)?',
    options: ['Suono muddy', 'Suono metallico e sibilante', 'Suono scuro', 'Suono boxy'],
    correct: 1,
    explanation: 'Troppo boost su Presence (4-6 kHz) rende il suono metallico, harsh e sibilante. Usa con moderazione!',
  },
  {
    question: 'Perché si usa l\'high-pass filter sotto i 30-80 Hz?',
    options: ['Per aumentare i bassi', 'Per rimuovere rumore e rimbombi', 'Per aumentare il volume', 'Per aggiungere presenza'],
    correct: 1,
    explanation: 'High-pass filter sotto 30-80 Hz rimuove sub-bass inutile, rumore e rimbombi che mangiano headroom senza aggiungere contenuto musicale.',
  },
];

// Mix Scenarios
export const MIX_SCENARIOS = [
  {
    title: 'Scenario 1: Voce Sepolta',
    problem: 'La voce del cantante è sepolta nel mix. Si sente ma non si capiscono le parole chiaramente.',
    question: 'Quale banda boostare per aumentare l\'intelligibilità?',
    options: ['Bass (60-250 Hz)', 'Low Mids (250-500 Hz)', 'Upper Mids (2-4 kHz)', 'Air (12-20 kHz)'],
    correct: 2,
    solution: 'Upper Mids (2-4 kHz) è la banda dell\'intelligibilità! Boost +2-3dB con Q medio (2-3) sulla voce. Attenzione a non esagerare o diventa nasale.',
    proTip: 'Prova prima a tagliare -2dB su Low Mids (250-500 Hz) per fare spazio, poi boost Upper Mids se serve ancora.',
  },
  {
    title: 'Scenario 2: Mix Fangoso',
    problem: 'Il mix suona "muddy" e confuso. Bass e chitarre si sovrappongono creando un suono poco definito.',
    question: 'Quale banda tagliare per schiarire il mix?',
    options: ['Sub Bass (20-60 Hz)', 'Bass (60-250 Hz)', 'Upper Mids (2-4 kHz)', 'Presence (4-6 kHz)'],
    correct: 1,
    solution: 'Bass (60-250 Hz) causa muddiness! Taglia -3/-4dB con Q medio (2-3) su chitarre e synth. Lascia questa banda solo a kick e bass.',
    proTip: 'High-pass filter a 80-100 Hz su TUTTO tranne kick e bass è la regola d\'oro per mix puliti.',
  },
  {
    title: 'Scenario 3: Sibilanti Eccessive',
    problem: 'La voce ha troppo "SSS" e "TTT". Le sibilanti sono fastidiose e stancanti per le orecchie.',
    question: 'Quale banda controllare con il de-esser?',
    options: ['Upper Mids (2-4 kHz)', 'Presence (4-6 kHz)', 'Brilliance (6-12 kHz)', 'Air (12-20 kHz)'],
    correct: 1,
    solution: 'Presence (4-6 kHz) è dove vivono le sibilanti! De-esser lavora qui. Settaggi tipici: 5-7 kHz, threshold fino a -3/-6dB di riduzione sulle "S".',
    proTip: 'Se non hai de-esser, usa EQ dinamico o compressore multibanda su 4-8 kHz. Ratio 3:1, attack veloce.',
  },
  {
    title: 'Scenario 4: Chitarra Boxy',
    problem: 'La chitarra acustica suona "inscatolata" (boxy) e occupa troppo spazio nel mix.',
    question: 'Quale banda tagliare?',
    options: ['Bass (60-250 Hz)', 'Low Mids (250-500 Hz)', 'Mids (500-2k Hz)', 'Presence (4-6k Hz)'],
    correct: 1,
    solution: 'Low Mids (250-500 Hz) è la zona "boxy"! Taglia -3/-5dB con Q stretto (4-6) intorno a 300-400 Hz. La chitarra suonerà più aperta.',
    proTip: 'Sweep con boost +10dB per trovare la frequenza esatta che suona peggio, poi taglia quella.',
  },
];

export type FrequencyBand = typeof FREQUENCY_GUIDE[number];

// For training (simplified)
export const FREQUENCY_BANDS = FREQUENCY_GUIDE.map(({ name, freq }) => ({ name, freq }));