import { useState } from 'react';
import { useAudio } from '../../../hooks/useAudio';
import { INTERVALS_GUIDE } from '../../../data/intervals';
import { ROOT_NOTES } from '../../../data/notes';
import { Music, Lightbulb, RotateCcw, Smile } from 'lucide-react';

export const IntervalsLearn = () => {
  const { playInterval } = useAudio();
  const [selectedInterval, setSelectedInterval] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rootNote, setRootNote] = useState(0);

  const playSelectedInterval = async (index: number) => {
    setSelectedInterval(index);
    setIsPlaying(true);
    const baseFreq = ROOT_NOTES[rootNote].freq;
    await playInterval(baseFreq, INTERVALS_GUIDE[index].semitones, 'melodic');
    setTimeout(() => setIsPlaying(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl"><Music /></span>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Intervalli Musicali</h2>
            <p className="text-gray-600 dark:text-gray-400">Per Musicisti e Cantanti</p>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Clicca su ogni intervallo per ascoltarlo. Gli intervalli sono sempre ascendenti e melodici (una nota dopo l'altra).
        </p>

        {/* Root Note Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nota di partenza:
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

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
          <div className="flex gap-3">
            <span className="text-xl"><Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" /></span>
            <div>
              <p className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Tip</p>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Memorizza le canzoni di riferimento! Ti aiuteranno a riconoscere gli intervalli "al volo" durante il training.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Intervals Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {INTERVALS_GUIDE.map((interval, index) => (
          <div
            key={interval.name}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all ${
              selectedInterval === index ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
            }`}
          >
            {/* Interval Header - Clickable */}
            <button
              onClick={() => playSelectedInterval(index)}
              disabled={isPlaying}
              className={`w-full p-4 text-left transition-all ${
                isPlaying ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-14 h-14 rounded-lg bg-linear-to-br ${interval.color} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                  {interval.semitones}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{interval.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{interval.symbol}</p>
                </div>
              </div>
            </button>

            {/* Interval Details - Expanded */}
            {selectedInterval === index && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3 bg-gray-50 dark:bg-gray-900/50">
                <p className="text-sm text-gray-700 dark:text-gray-300">{interval.description}</p>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <p className="font-semibold text-blue-700 dark:text-blue-400 text-sm mb-1">
                    <Music className="w-8 h-8 text-blue-600 dark:text-blue-400" /> Canzone di riferimento
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-300">{interval.song}</p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
                  <p className="font-semibold text-purple-700 dark:text-purple-400 text-sm mb-1">
                    <Smile className="w-4 h-4" /> Sensazione
                  </p>
                  <p className="text-sm text-purple-600 dark:text-purple-300">{interval.feeling}</p>
                </div>
                
                <button
                  onClick={() => playSelectedInterval(index)}
                  disabled={isPlaying}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition text-sm  flex justify-center items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Riascolta
                </button>

                
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};