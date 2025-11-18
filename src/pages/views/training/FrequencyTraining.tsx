import { useState } from 'react';
import { useAudio } from '../../../hooks/useAudio';
import { FREQUENCY_BANDS } from '../../../data/frequencies';
import {Sliders, AlertTriangle, Play, Shuffle, RotateCcw, Lightbulb } from 'lucide-react';


export const FrequencyTraining = () => {
  const { playFrequencyBoost } = useAudio();
  const [currentFreq, setCurrentFreq] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);

  const generateNewFrequency = () => {
    const randomIndex = Math.floor(Math.random() * FREQUENCY_BANDS.length);
    const freq = FREQUENCY_BANDS[randomIndex].freq;
    setCurrentFreq(randomIndex);
    setFeedback('');
    setShowAnswer(false);
    playFrequencyBoost(freq);
  };

  const handleGuess = (index: number) => {
    if (currentFreq === null) return;

    const isCorrect = index === currentFreq;
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    if (isCorrect) {
      setFeedback('✅ Corretto!');
    } else {
      setFeedback(`❌ Sbagliato! Era: ${FREQUENCY_BANDS[currentFreq].name} (${FREQUENCY_BANDS[currentFreq].freq >= 1000 ? `${FREQUENCY_BANDS[currentFreq].freq / 1000}k` : FREQUENCY_BANDS[currentFreq].freq} Hz)`);
    }
    setShowAnswer(true);
  };

  const repeatFrequency = () => {
    if (currentFreq === null) return;
    playFrequencyBoost(FREQUENCY_BANDS[currentFreq].freq);
  };

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Sliders className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Frequency Quiz</h2>
              <p className="text-gray-600 dark:text-gray-400">Training per Sound Engineers</p>
            </div>
          </div>
          <button
            onClick={() => setScore({ correct: 0, total: 0 })}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition"
          >
            Reset Stats
          </button>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Ascolta il pink noise con una frequenza boostata (+12dB) e indovina quale banda è stata enfatizzata.
        </p>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0" />
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              Usa cuffie di qualità e volume moderato per risultati migliori!
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Accuracy</div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{accuracy}%</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Corrette</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">{score.correct}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Totale</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{score.total}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-900 dark:bg-gray-950 rounded-xl shadow-lg border border-gray-700 dark:border-gray-800 p-6">
        <div className="flex gap-4 justify-center">
          <button
            onClick={generateNewFrequency}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition shadow-md hover:shadow-lg flex items-center gap-2"
          >
            {currentFreq === null ? (
              <>
                <Play className="w-5 h-5" />
                Inizia
              </>
            ) : (
              <>
                <Shuffle className="w-5 h-5" />
                Nuova Frequenza
              </>
            )}
          </button>
          {currentFreq !== null && (
            <button
              onClick={repeatFrequency}
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg transition flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Ripeti
            </button>
          )}
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`rounded-xl p-4 ${feedback.includes('✅') ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
          <p className={`text-lg font-semibold ${feedback.includes('✅') ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
            {feedback}
          </p>
        </div>
      )}

      {/* Answer Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Seleziona la frequenza:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FREQUENCY_BANDS.map((band, index) => (
            <button
              key={band.name}
              onClick={() => handleGuess(index)}
              disabled={currentFreq === null || showAnswer}
              className={`p-4 rounded-lg font-medium transition-all ${
                currentFreq === null || showAnswer
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-md'
              } ${showAnswer && index === currentFreq ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/30' : ''}`}
            >
              <div className="font-semibold">{band.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {band.freq >= 1000 ? `${band.freq / 1000}k` : band.freq} Hz
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <div className="flex gap-3">
          <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
          <div className="space-y-2">
            <p className="font-semibold text-blue-900 dark:text-blue-300">Tips per migliorare:</p>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
              <li>• Concentrati sul "carattere" della frequenza, non solo sul pitch</li>
              <li>• Le vocali di riferimento (UU, OO, AH, EH, II) aiutano molto</li>
              <li>• Ripeti più volte lo stesso suono per memorizzare</li>
              <li>• Inizia con le frequenze più caratteristiche (400Hz, 2.5kHz, 8kHz)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};