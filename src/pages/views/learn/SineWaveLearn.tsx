import { useState } from 'react';
import { Radio, Waves, Volume2, Zap, Mic, Speaker, AlertTriangle, Lightbulb } from 'lucide-react';
import { useAudio } from '../../../hooks/useAudio';

const USE_CASES = [
  {
    icon: AlertTriangle,
    title: 'Feedback Hunting',
    pink: '❌ Impossibile identificare la frequenza esatta',
    sine: '✅ Identifica ESATTAMENTE la frequenza problematica',
    color: 'from-red-400 to-red-500',
  },
  {
    icon: Speaker,
    title: 'Speaker Testing',
    pink: '⚠️ Test generale, ma non preciso',
    sine: '✅ Testa response esatta di ogni frequenza',
    color: 'from-blue-400 to-blue-500',
  },
  {
    icon: Radio,
    title: 'Room Resonance',
    pink: '⚠️ Identifica zone generali',
    sine: '✅ Trova frequenze risonanti precise',
    color: 'from-purple-400 to-purple-500',
  },
  {
    icon: Mic,
    title: 'Mic Calibration',
    pink: '⚠️ Test generale',
    sine: '✅ Calibrazione precisa per ogni banda',
    color: 'from-green-400 to-green-500',
  },
];

const COMPARISON_TABLE = [
  { aspect: 'Contenuto Frequenze', pink: 'Tutte le frequenze simultaneamente', sine: 'Una sola frequenza pura' },
  { aspect: 'Suono', pink: 'Naturale, simile a "shhh"', sine: 'Sintetico, tono puro' },
  { aspect: 'Uso Primario', pink: 'EQ training, room calibration', sine: 'Troubleshooting, testing preciso' },
  { aspect: 'Realismo', pink: 'Alto (simula audio reale)', sine: 'Basso (nessun suono reale è puro)' },
  { aspect: 'Precisione', pink: 'Media (identifica bande)', sine: 'Alta (identifica Hz esatti)' },
  { aspect: 'Training', pink: 'Mixing, general ear training', sine: 'Frequency memorization, tecnico' },
];

export const SineWaveLearn = () => {
  const { playFrequencyBoosted, playSineWave, playFrequencySweep } = useAudio();
  const [compareFreq, setCompareFreq] = useState(1000);
  const [isPlaying, setIsPlaying] = useState<'pink' | 'sine' | 'sweep' | null>(null);

  const handlePlayPink = () => {
    setIsPlaying('pink');
    playFrequencyBoosted(compareFreq, 3);
    setTimeout(() => setIsPlaying(null), 3000);
  };

  const handlePlaySine = () => {
    setIsPlaying('sine');
    playSineWave(compareFreq, 3);
    setTimeout(() => setIsPlaying(null), 3000);
  };

  const handlePlaySweep = () => {
    setIsPlaying('sweep');
    playFrequencySweep(20, 20000, 5);
    setTimeout(() => setIsPlaying(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header - Matching FrequencyLearn style */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Waves className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sine Wave Training</h2>
            <p className="text-gray-600 dark:text-gray-400">Frequenze Pure per SE Professionisti</p>
          </div>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Impara a riconoscere frequenze pure (sine wave) per troubleshooting professionale. 
          Fondamentale per feedback hunting, speaker testing e room calibration.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex gap-3">
            <Radio className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <div>
              <p className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Cosa sono le Sine Wave?</p>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Onde sinusoidali pure con una sola frequenza, senza armonici. Perfette per identificare problemi specifici in modo chirurgico.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Comparison Tool */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Volume2 className="w-6 h-6" />
          Tool Interattivo: Confronta i Suoni
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-gray-200 dark:border-gray-700">
          {/* Frequency Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Seleziona Frequenza: {compareFreq} Hz
            </label>
            <input
              type="range"
              min="20"
              max="20000"
              step="10"
              value={compareFreq}
              onChange={(e) => setCompareFreq(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>20 Hz</span>
              <span>1 kHz</span>
              <span>20 kHz</span>
            </div>
          </div>

          {/* Play Buttons */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={handlePlayPink}
              disabled={isPlaying !== null}
              className="bg-linear-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-400 text-white py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Radio className="w-5 h-5" />
              {isPlaying === 'pink' ? 'Playing...' : 'Play Pink Noise'}
            </button>
            <button
              onClick={handlePlaySine}
              disabled={isPlaying !== null}
              className="bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-400 text-white py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Waves className="w-5 h-5" />
              {isPlaying === 'sine' ? 'Playing...' : 'Play Sine Wave'}
            </button>
          </div>

          {/* Bonus: Frequency Sweep */}
          <div className="border-t dark:border-gray-700 pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              <strong>Bonus:</strong> Frequency Sweep (20Hz → 20kHz in 5 secondi)
            </p>
            <button
              onClick={handlePlaySweep}
              disabled={isPlaying !== null}
              className="w-full bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Zap className="w-5 h-5" />
              {isPlaying === 'sweep' ? 'Sweeping...' : 'Play Frequency Sweep'}
            </button>
          </div>

          {/* Explanation */}
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Nota la differenza:</strong> Pink noise suona "pieno" e naturale, 
              mentre sine wave è un tono puro e "laser-like". Il sweep ti permette di sentire 
              tutto lo spettro da bass a treble in pochi secondi.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Pink Noise vs Sine Wave
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
          <table className="w-full">
            <thead className="bg-linear-to-r from-blue-500 to-purple-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Aspetto</th>
                <th className="px-6 py-4 text-left font-semibold">Pink Noise</th>
                <th className="px-6 py-4 text-left font-semibold">Sine Wave</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_TABLE.map((row, index) => (
                <tr
                  key={row.aspect}
                  className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : 'bg-white dark:bg-gray-800'}
                >
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {row.aspect}
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {row.pink}
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {row.sine}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Use Cases */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Quando Usare Cosa?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {USE_CASES.map((useCase) => (
            <div
              key={useCase.title}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700"
            >
              <div className={`bg-linear-to-r ${useCase.color} p-3 rounded-xl inline-block mb-4`}>
                <useCase.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                {useCase.title}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="bg-pink-50 dark:bg-pink-900/20 p-3 rounded-lg">
                  <strong className="text-pink-600 dark:text-pink-400">Pink Noise:</strong>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{useCase.pink}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <strong className="text-blue-600 dark:text-blue-400">Sine Wave:</strong>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{useCase.sine}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Tips */}
      <div className="bg-linear-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          Pro Tips per Sound Engineers
        </h3>
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li className="flex gap-3">
            <span className="text-yellow-600 dark:text-yellow-400 font-bold">1.</span>
            <span><strong>Feedback hunting live:</strong> Usa sine wave sweep lento per trovare la frequenza esatta del feedback, poi taglia con EQ chirurgico.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-yellow-600 dark:text-yellow-400 font-bold">2.</span>
            <span><strong>Speaker testing:</strong> Usa sine wave da 20Hz a 20kHz per testare la risposta completa dei monitor. Cerca distorsione o drop-out.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-yellow-600 dark:text-yellow-400 font-bold">3.</span>
            <span><strong>Room modes:</strong> Cammina nella stanza mentre suona una sine wave (50-200Hz). Le zone dove il bass aumenta/diminuisce sono room modes.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-yellow-600 dark:text-yellow-400 font-bold">4.</span>
            <span><strong>Ear training:</strong> Memorizza le sine wave di 100Hz, 1kHz, 10kHz come "anchor points". Ti aiuterà a identificare velocemente problemi in mix.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};