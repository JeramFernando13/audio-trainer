import { useState } from 'react';
import { useAudio } from '../../../hooks/useAudio';
import { FREQUENCY_GUIDE } from '../../../data/frequencies';
import { Sliders, AlertTriangle, RotateCcw, TrendingUp, TrendingDown, Guitar, Lightbulb } from 'lucide-react';

export const FrequencyLearn = () => {
  const { playFrequencyBoost } = useAudio();
  const [selectedBand, setSelectedBand] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playBand = async (index: number) => {
    setSelectedBand(index);
    setIsPlaying(true);
    await playFrequencyBoost(FREQUENCY_GUIDE[index].freq);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Sliders className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Frequenze & EQ</h2>
            <p className="text-gray-600 dark:text-gray-400">Per Sound Engineers</p>
          </div>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Clicca su ogni banda per ascoltare come suona con un boost di +12dB su pink noise. 
          Usa cuffie di qualità per sentire bene le differenze!
        </p>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0" />
            <div>
              <p className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">Attenzione</p>
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                Volume moderato! Le frequenze alte possono essere fastidiose ad alto volume.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Frequency Bands */}
      <div className="space-y-4">
        {FREQUENCY_GUIDE.map((band, index) => (
          <div
            key={band.name}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all ${
              selectedBand === index ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
            }`}
          >
            {/* Band Header - Clickable */}
            <button
              onClick={() => playBand(index)}
              disabled={isPlaying}
              className={`w-full p-6 text-left transition-all ${
                isPlaying ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-lg bg-linear-to-br ${band.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                    {band.freq >= 1000 ? `${band.freq / 1000}k` : band.freq}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{band.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{band.range}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-400 dark:text-gray-600">{band.vowel}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Vocale</div>
                </div>
              </div>
            </button>

            {/* Band Details - Expanded */}
            {selectedBand === index && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4 bg-gray-50 dark:bg-gray-900/50">
                <p className="text-gray-700 dark:text-gray-300">{band.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="font-semibold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Troppo boost
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-300">{band.tooMuch}</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4" />
                      Troppo cut
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-300">{band.tooLittle}</p>
                  </div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Guitar className="w-4 h-4" />
                    Strumenti tipici
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{band.instruments}</p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Mix Tip
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-300">{band.mixTip}</p>
                </div>

                <button
                  onClick={() => playBand(index)}
                  disabled={isPlaying}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Riascolta
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};