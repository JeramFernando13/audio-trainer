import { useState } from 'react';
import { useAudio } from '../hooks/useAudio';

const CHORDS_GUIDE = [
  // TRIADI
  {
    name: 'Maggiore',
    symbol: 'C / Cmaj',
    intervals: [0, 4, 7],
    formula: '1 - 3 - 5',
    description: 'La triade più comune. Suono brillante e stabile.',
    feeling: 'Felicità, stabilità, risoluzione, luminosità',
    context: 'Base della musica pop, rock, folk. Accordo "felice".',
    color: 'bg-yellow-900',
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
    color: 'bg-blue-900',
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
    color: 'bg-red-900',
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
    color: 'bg-purple-900',
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
    color: 'bg-orange-900',
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
    color: 'bg-teal-900',
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
    color: 'bg-indigo-900',
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
    color: 'bg-pink-900',
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
    color: 'bg-red-800',
    category: 'Settime',
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
export const ChordsLearn = () => {
  const { playNote } = useAudio();
  const [selectedChord, setSelectedChord] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playMode, setPlayMode] = useState<'arpeggio' | 'block'>('block');
   const [rootNote, setRootNote] = useState(0);

  const playChord = async (index: number) => {
    setSelectedChord(index);
    setIsPlaying(true);
    
    // const baseFreq = 261.63; // C4
    const baseFreq = ROOT_NOTES[rootNote].freq;
    const chord = CHORDS_GUIDE[index];
    
    if (playMode === 'block') {
      // Suona tutte le note insieme
      chord.intervals.forEach((semitones) => {
        const freq = baseFreq * Math.pow(2, semitones / 12);
        playNote(freq, '2n');
      });
      setTimeout(() => setIsPlaying(false), 1500);
    } else {
      // Arpeggio
      chord.intervals.forEach((semitones, i) => {
        setTimeout(() => {
          const freq = baseFreq * Math.pow(2, semitones / 12);
          playNote(freq, '8n');
        }, i * 300);
      });
      setTimeout(() => setIsPlaying(false), chord.intervals.length * 300 + 500);
    }
  };

  const categories = [...new Set(CHORDS_GUIDE.map(c => c.category))];

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">🎓 Impara gli Accordi</h2>
        <p className="text-gray-400 mb-4">
          Clicca su ogni accordo per ascoltarlo. Tutti costruiti partendo dal Do (C4).
        </p>
        
         <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">
            Nota base (Root):
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
            onClick={() => setPlayMode('block')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
                playMode === 'block' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            >
            Accordo (tutte insieme)
            </button>
            <button
            onClick={() => setPlayMode('arpeggio')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
                playMode === 'arpeggio' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            >
            Arpeggio (una alla volta)
            </button>
        </div>

        <p className="text-sm text-yellow-500">
            💡 Attualmente: <span className="font-mono font-bold">{ROOT_NOTES[rootNote].name}</span> - 
            Prova diversi accordi sulla stessa root, poi cambia root per sentire come "trasporta"!
        </p>
      </div>

      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h3 className="text-xl font-bold text-gray-300 border-b border-gray-700 pb-2">
            {category}
          </h3>
          
          <div className="grid gap-4">
            {CHORDS_GUIDE.filter(c => c.category === category).map((chord) => {
              const index = CHORDS_GUIDE.indexOf(chord);
              return (
                <div
                  key={chord.name}
                  className={`rounded-lg overflow-hidden transition-all ${
                    selectedChord === index ? 'ring-2 ring-white' : ''
                  }`}
                >
                  <button
                    onClick={() => playChord(index)}
                    disabled={isPlaying}
                    className={`w-full p-4 text-left ${chord.color} hover:brightness-110 transition`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-bold">{chord.name}</h3>
                        <p className="text-sm opacity-80 font-mono"> {chord.symbol.replace(/C/g, ROOT_NOTES[rootNote].name.split('/')[0])}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-mono">{chord.formula}</p>
                        <p className="text-sm opacity-60">{chord.intervals.length} note</p>
                      </div>
                    </div>
                  </button>

                  {selectedChord === index && (
                    <div className="bg-gray-800 p-4 space-y-3 border-t border-gray-700">
                      <p className="text-gray-300">{chord.description}</p>
                      
                      <div className="bg-purple-900/30 p-3 rounded">
                        <p className="font-semibold text-purple-400 mb-1">😊 Sensazione/Carattere:</p>
                        <p>{chord.feeling}</p>
                      </div>

                      <div className="bg-green-900/30 p-3 rounded">
                        <p className="font-semibold text-green-400 mb-1">🎸 Contesto musicale:</p>
                        <p>{chord.context}</p>
                      </div>

                      <div className="bg-gray-700 p-3 rounded">
                        <p className="font-semibold text-gray-300 mb-1">📐 Intervalli dal basso:</p>
                        <p className="font-mono">
                          {chord.intervals.map((s, i) => (
                            <span key={i}>
                              {i > 0 && ' → '}
                              {s === 0 ? 'Root' : `+${s} semitoni`}
                            </span>
                          ))}
                        </p>
                      </div>

                      <button
                        onClick={() => playChord(index)}
                        disabled={isPlaying}
                        className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
                      >
                        🔄 Riascolta
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};