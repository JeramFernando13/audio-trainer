import { useState } from 'react';
import { useAudio } from '../../../hooks/useAudio';
import { ROOT_NOTES } from '../../../data/notes';
import { INTERVALS} from '../../../data/intervals';
import {Music, Play, Shuffle, RotateCcw, Lightbulb } from 'lucide-react';

export const IntervalTraining = () => {
  const { playInterval } = useAudio();
  const [currentInterval, setCurrentInterval] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [rootNote, setRootNote] = useState(0);

  const generateNewInterval = () => {
    const randomIndex = Math.floor(Math.random() * INTERVALS.length);
    setCurrentInterval(randomIndex);
    setFeedback('');
    setShowAnswer(false);
    
    const baseFreq = ROOT_NOTES[rootNote].freq;
    playInterval(baseFreq, INTERVALS[randomIndex].semitones);
  };

  const handleGuess = (index: number) => {
    if (currentInterval === null) return;

    const isCorrect = index === currentInterval;
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    if (isCorrect) {
      setFeedback('✅ Corretto!');
    } else {
      setFeedback(`❌ Sbagliato! Era: ${INTERVALS[currentInterval].name}`);
    }
    setShowAnswer(true);
  };

  const repeatInterval = () => {
    if (currentInterval === null) return;
    const baseFreq = ROOT_NOTES[rootNote].freq;
    playInterval(baseFreq, INTERVALS[currentInterval].semitones);
  };

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
           <Music className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Interval Quiz</h2>
              <p className="text-gray-600 dark:text-gray-400">Training per Musicisti</p>
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
          Ascolta l'intervallo melodico ascendente e indovina quale è.
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
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Accuracy</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{accuracy}%</div>
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
          onClick={generateNewInterval}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition shadow-md hover:shadow-lg flex items-center gap-2"
        >
          {currentInterval === null ? (
            <>
              <Play className="w-5 h-5" />
              Inizia
            </>
          ) : (
            <>
              <Shuffle className="w-5 h-5" />
              Nuovo Intervallo
            </>
          )}
        </button>
        {currentInterval !== null && (
          <button
            onClick={repeatInterval}
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
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Seleziona l'intervallo:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {INTERVALS.map((interval, index) => (
            <button
              key={interval.name}
              onClick={() => handleGuess(index)}
              disabled={currentInterval === null || showAnswer}
              className={`p-3 rounded-lg font-medium text-sm transition-all ${
                currentInterval === null || showAnswer
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-md'
              } ${showAnswer && index === currentInterval ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/30' : ''}`}
            >
              {interval.name}
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
              <li>• Ricorda le canzoni di riferimento dalla sezione Learn</li>
              <li>• Gli intervalli "perfetti" (4a, 5a, 8a) sono più stabili</li>
              <li>• Le terze definiscono il carattere maggiore/minore</li>
              <li>• Il tritono (6 semitoni) è inconfondibile - massima tensione!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};