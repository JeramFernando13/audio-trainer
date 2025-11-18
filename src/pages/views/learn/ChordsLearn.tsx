import { useState } from 'react';
import { useAudio } from '../../../hooks/useAudio';
import { CHORDS_GUIDE } from '../../../data/chords';
import { ROOT_NOTES } from '../../../data/notes';
import { Music } from 'lucide-react';
import { Piano, Lightbulb, RotateCcw, Smile, Guitar, Ruler } from 'lucide-react';

export const ChordsLearn = () => {
  const { playNote, playChord } = useAudio();
  const [selectedChord, setSelectedChord] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playMode, setPlayMode] = useState<'arpeggio' | 'block'>('block');
  const [rootNote, setRootNote] = useState(0);

  const playChordSound = async (index: number) => {
    setSelectedChord(index);
    setIsPlaying(true);
    
    const baseFreq = ROOT_NOTES[rootNote].freq;
    const chord = CHORDS_GUIDE[index];
    
    if (playMode === 'block') {
      const frequencies = chord.intervals.map(
        semitones => baseFreq * Math.pow(2, semitones / 12)
      );
      playChord(frequencies, '2n');
      setTimeout(() => setIsPlaying(false), 1500);
    } else {
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
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl"><Piano className="w-8 h-8 text-indigo-600 dark:text-indigo-400" /></span>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Accordi</h2>
            <p className="text-gray-600 dark:text-gray-400">Per Musicisti</p>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Clicca su ogni accordo per ascoltarlo. Puoi scegliere la nota di partenza e la modalità di esecuzione.
        </p>

        {/* Controls */}
        <div className="space-y-4">
          {/* Root Note Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nota base (Root):
            </label>
            <div className="flex flex-wrap gap-2">
              {ROOT_NOTES.map((note, index) => (
                <button
                  key={note.name}
                  onClick={() => setRootNote(index)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-sm font-medium transition-all ${
                    rootNote === index
                      ? 'bg-green-600 text-white shadow-md scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {note.name}
                </button>
              ))}
            </div>
          </div>

          {/* Play Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Modalità:
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setPlayMode('block')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  playMode === 'block'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Piano className="w-4 h-4" />
                Accordo (blocco)
              </button>
              <button
                onClick={() => setPlayMode('arpeggio')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  playMode === 'arpeggio'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Music className="w-4 h-4" />
                Arpeggio
              </button>
            </div>
          </div>
        </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
            <div className="flex gap-3">
             <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <div>
              <p className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Tip</p>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Ascolta prima in arpeggio per sentire le singole note, poi in blocco per il "colore" completo dell'accordo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chords by Category */}
      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            {category}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {CHORDS_GUIDE.filter(c => c.category === category).map((chord) => {
              const index = CHORDS_GUIDE.indexOf(chord);
              const rootNoteName = ROOT_NOTES[rootNote].name.split('/')[0];
              const displaySymbol = chord.symbol.replace(/C/g, rootNoteName);

              return (
                <div
                  key={chord.name}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all ${
                    selectedChord === index ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
                  }`}
                >
                  {/* Chord Header - Clickable */}
                  <button
                    onClick={() => playChordSound(index)}
                    disabled={isPlaying}
                    className={`w-full p-4 text-left transition-all ${
                      isPlaying ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-14 h-14 rounded-lg bg-linear-to-br ${chord.color} flex items-center justify-center text-white text-lg font-bold shadow-lg`}>
                          {chord.intervals.length}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{chord.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{displaySymbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-mono text-gray-600 dark:text-gray-400">{chord.formula}</p>
                      </div>
                    </div>
                  </button>

                  {/* Chord Details - Expanded */}
                  {selectedChord === index && (
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3 bg-gray-50 dark:bg-gray-900/50">
                      <p className="text-sm text-gray-700 dark:text-gray-300">{chord.description}</p>

                      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
                        <p className="font-semibold text-purple-700 dark:text-purple-400 text-sm mb-1 flex items-center gap-2">
                          <Smile className="w-4 h-4" />
                          Sensazione
                        </p>
                        <p className="text-sm text-purple-600 dark:text-purple-300">{chord.feeling}</p>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                        <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1 flex items-center gap-2">
                          <Guitar className="w-4 h-4" />
                          Contesto musicale
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-300">{chord.context}</p>
                      </div>

                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1 flex items-center gap-2">
                          <Ruler className="w-4 h-4" />
                          Intervalli
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                          {chord.intervals.map((s, i) => (
                            <span key={i}>
                              {i > 0 && ' → '}
                              {s === 0 ? 'Root' : `+${s}st`}
                            </span>
                          ))}
                        </p>
                      </div>

                     <button
                      onClick={() => playChordSound(index)}
                      disabled={isPlaying}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition text-sm flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Riascolta
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