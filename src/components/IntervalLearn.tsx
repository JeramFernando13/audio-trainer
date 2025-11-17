import { useState } from 'react';
import { useAudio } from '../hooks/useAudio';

const INTERVALS_GUIDE = [
  {
    name: 'Unisono',
    semitones: 0,
    symbol: 'P1',
    description: 'Stessa nota. Nessun movimento.',
    song: 'Due persone che cantano la stessa nota',
    feeling: 'Stabilità totale, nessuna tensione',
    color: 'bg-gray-700',
  },
  {
    name: 'Seconda minore',
    semitones: 1,
    symbol: 'm2',
    description: 'Mezzo tono. L\'intervallo più piccolo nella musica occidentale.',
    song: '🎬 "Jaws" (Lo Squalo) - tema principale',
    feeling: 'Tensione, suspense, dissonanza forte',
    color: 'bg-red-900',
  },
  {
    name: 'Seconda maggiore',
    semitones: 2,
    symbol: 'M2',
    description: 'Un tono intero. Base delle scale maggiori.',
    song: '🎵 "Happy Birthday" - "Hap-py"',
    feeling: 'Movimento naturale, voglia di continuare',
    color: 'bg-red-800',
  },
  {
    name: 'Terza minore',
    semitones: 3,
    symbol: 'm3',
    description: 'Carattere triste/malinconico. Base degli accordi minori.',
    song: '🎵 "Greensleeves" - prime due note',
    feeling: 'Tristezza, malinconia, introspezione',
    color: 'bg-orange-900',
  },
  {
    name: 'Terza maggiore',
    semitones: 4,
    symbol: 'M3',
    description: 'Carattere allegro/luminoso. Base degli accordi maggiori.',
    song: '🎵 "Oh When The Saints" - "Oh when"',
    feeling: 'Gioia, luminosità, apertura',
    color: 'bg-orange-800',
  },
  {
    name: 'Quarta giusta',
    semitones: 5,
    symbol: 'P4',
    description: 'Intervallo "perfetto". Molto stabile.',
    song: '🎵 "Here Comes The Bride" - prime due note',
    feeling: 'Stabilità, solennità, apertura',
    color: 'bg-yellow-900',
  },
  {
    name: 'Tritono',
    semitones: 6,
    symbol: 'A4/d5',
    description: 'Il "diavolo in musica". Massima instabilità.',
    song: '🎵 "The Simpsons" - "The Simp-"',
    feeling: 'Tensione estrema, instabilità, inquietudine',
    color: 'bg-yellow-800',
  },
  {
    name: 'Quinta giusta',
    semitones: 7,
    symbol: 'P5',
    description: 'L\'intervallo più consonante dopo l\'ottava. Power chords!',
    song: '🎵 "Star Wars" - tema principale "da-DA"',
    feeling: 'Potenza, apertura, epico',
    color: 'bg-green-900',
  },
  {
    name: 'Sesta minore',
    semitones: 8,
    symbol: 'm6',
    description: 'Carattere dolce-amaro.',
    song: '🎵 "Love Story" (tema) - inizio',
    feeling: 'Romantico malinconico, dolce-amaro',
    color: 'bg-teal-900',
  },
  {
    name: 'Sesta maggiore',
    semitones: 9,
    symbol: 'M6',
    description: 'Dolce e luminoso.',
    song: '🎵 "My Bonnie Lies Over The Ocean" - "My Bon-"',
    feeling: 'Dolcezza, nostalgia positiva',
    color: 'bg-teal-800',
  },
  {
    name: 'Settima minore',
    semitones: 10,
    symbol: 'm7',
    description: 'Tensione "blues". Vuole risolvere.',
    song: '🎵 "Somewhere" (West Side Story) - "There\'s a"',
    feeling: 'Tensione morbida, blues, jazz',
    color: 'bg-blue-900',
  },
  {
    name: 'Settima maggiore',
    semitones: 11,
    symbol: 'M7',
    description: 'Tensione sofisticata. Suono "jazz".',
    song: '🎵 "Take On Me" - "Take on"',
    feeling: 'Sofisticato, sognante, quasi dissonante',
    color: 'bg-blue-800',
  },
  {
    name: 'Ottava',
    semitones: 12,
    symbol: 'P8',
    description: 'Stessa nota, frequenza doppia. Consonanza perfetta.',
    song: '🎵 "Somewhere Over The Rainbow" - "Some-where"',
    feeling: 'Completezza, pienezza, risoluzione totale',
    color: 'bg-purple-900',
  },
];
const ROOT_NOTES = [
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
];

export const IntervalsLearn = () => {
  const { playInterval } = useAudio();
  const [selectedInterval, setSelectedInterval] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playMode, setPlayMode] = useState<'melodic' | 'harmonic'>('melodic');
  const [rootNote, setRootNote] = useState(0);


  const playSelectedInterval = async (index: number) => {
    setSelectedInterval(index);
    setIsPlaying(true);
    const baseFreq = ROOT_NOTES[rootNote].freq; // C4
    await playInterval(baseFreq, INTERVALS_GUIDE[index].semitones);
    setTimeout(() => setIsPlaying(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">🎓 Impara gli Intervalli</h2>
        <p className="text-gray-400 mb-4">
          Clicca su ogni intervallo per ascoltarlo. Partiamo sempre dal Do centrale (C4 = 261.63 Hz).
        </p>

        <div className="my-4">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Nota di partenza:
          </label>
          <div className="flex flex-wrap gap-2">
            {ROOT_NOTES.map((note, index) => (
              <button
                key={note.name}
                onClick={() => setRootNote(index)}
                className={`px-3 py-1 rounded font-mono text-sm transition ${
                  rootNote === index
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {note.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setPlayMode('melodic')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              playMode === 'melodic' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Melodico (sequenziale)
          </button>
          <button
            onClick={() => setPlayMode('harmonic')}
            disabled
            className="px-4 py-2 rounded-lg font-medium bg-gray-700 text-gray-500 cursor-not-allowed"
            title="Coming soon!"
          >
            Armonico (simultaneo) 🔜
          </button>
        </div>

        <p className="text-sm text-yellow-500">
          💡 Tip: Memorizza le canzoni di riferimento, ti aiuteranno a riconoscere gli intervalli!
        </p>
      </div>

      <div className="grid gap-4">
        {INTERVALS_GUIDE.map((interval, index) => (
          <div
            key={interval.name}
            className={`rounded-lg overflow-hidden transition-all ${
              selectedInterval === index ? 'ring-2 ring-white' : ''
            }`}
          >
            <button
              onClick={() => playSelectedInterval(index)}
              disabled={isPlaying}
              className={`w-full p-4 text-left ${interval.color} hover:brightness-110 transition`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{interval.name}</h3>
                  <p className="text-sm opacity-80">{interval.symbol} • {interval.semitones} semitoni</p>
                </div>
                <div className="text-4xl font-mono opacity-60">
                  {interval.semitones}
                </div>
              </div>
            </button>

            {selectedInterval === index && (
              <div className="bg-gray-800 p-4 space-y-3 border-t border-gray-700">
                <p className="text-gray-300">{interval.description}</p>
                
                <div className="bg-blue-900/30 p-3 rounded">
                  <p className="font-semibold text-blue-400 mb-1">🎵 Canzone di riferimento:</p>
                  <p className="text-lg">{interval.song}</p>
                </div>

                <div className="bg-purple-900/30 p-3 rounded">
                  <p className="font-semibold text-purple-400 mb-1">😊 Sensazione/Carattere:</p>
                  <p>{interval.feeling}</p>
                </div>

                <button
                  onClick={() => playSelectedInterval(index)}
                  disabled={isPlaying}
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
                >
                  🔄 Riascolta
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};