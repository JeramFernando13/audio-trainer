import { useState, useEffect, useCallback } from 'react';
import { Play, RotateCcw, Volume2, Clock, TrendingUp, Waves } from 'lucide-react';
import { useAudio } from '../../../hooks/useAudio';
import { useStats } from '../../../hooks/useStats';
import { DifficultySelector } from '../../../components/ui/DifficultySelector';
import { StatsPanel } from '../../../components/ui/StatsPanel';
import { type Difficulty } from '../../../data/difficulty';

// Sine Wave specific frequency bands (more precise than pink noise)
interface SineWaveBand {
  freq: number;
  name: string;
  note?: string; // Musical note reference
}

const SINE_WAVE_CONFIG: Record<Difficulty, {
  bands: SineWaveBand[];
  timeLimit: number | null;
  showFrequency: boolean;
  description: string;
}> = {
  easy: {
    bands: [
      { freq: 100, name: 'Bass', note: 'G2' },
      { freq: 440, name: 'Mid', note: 'A4' },
      { freq: 1000, name: 'Upper Mid', note: 'B5' },
      { freq: 5000, name: 'Presence', note: 'D#8' },
    ],
    timeLimit: null,
    showFrequency: true,
    description: '4 frequenze ben distanziate • Nessun limite • Con nota musicale'
  },
  medium: {
    bands: [
      { freq: 60, name: 'Sub Bass', note: 'B1' },
      { freq: 120, name: 'Bass', note: 'B2' },
      { freq: 240, name: 'Low Mid', note: 'B3' },
      { freq: 500, name: 'Mid', note: 'B4' },
      { freq: 1000, name: 'Upper Mid', note: 'B5' },
      { freq: 2000, name: 'High Mid', note: 'B6' },
      { freq: 4000, name: 'Presence', note: 'B7' },
      { freq: 8000, name: 'Brilliance', note: 'B8' },
    ],
    timeLimit: 15,
    showFrequency: true,
    description: '8 frequenze • 15 secondi • Full spectrum'
  },
  hard: {
    bands: [
      { freq: 40, name: 'Deep Sub' },
      { freq: 80, name: 'Sub Bass' },
      { freq: 150, name: 'Bass' },
      { freq: 250, name: 'Low Mid' },
      { freq: 500, name: 'Mid' },
      { freq: 1000, name: 'Upper Mid' },
      { freq: 2000, name: 'High Mid' },
      { freq: 3000, name: 'Presence' },
      { freq: 5000, name: 'High Presence' },
      { freq: 8000, name: 'Brilliance' },
      { freq: 12000, name: 'Air' },
      { freq: 16000, name: 'Ultra Air' },
    ],
    timeLimit: 10,
    showFrequency: true,
    description: '12 frequenze • 10 secondi • Range esteso (40Hz-16kHz)'
  },
  pro: {
    bands: [
      { freq: 20, name: 'Infra Sub' },
      { freq: 31.5, name: 'Deep Sub' },
      { freq: 63, name: 'Sub Bass' },
      { freq: 125, name: 'Bass' },
      { freq: 250, name: 'Low Mid' },
      { freq: 500, name: 'Mid' },
      { freq: 1000, name: 'Upper Mid' },
      { freq: 2000, name: 'High Mid' },
      { freq: 4000, name: 'Presence' },
      { freq: 8000, name: 'Brilliance' },
      { freq: 12000, name: 'Air' },
      { freq: 16000, name: 'Ultra Air' },
      { freq: 20000, name: 'Extreme High' },
    ],
    timeLimit: 8,
    showFrequency: false,
    description: '13 frequenze • 8 secondi • ISO standard • Blind mode (20Hz-20kHz)'
  }
};

export const SineWaveTraining = () => {
  const { playSineWave } = useAudio();
  const {
    currentStreak,
    recordAnswer,
    resetStreak,
    getStats,
    getOverallAccuracy,
  } = useStats();

  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [currentFreqIndex, setCurrentFreqIndex] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const config = SINE_WAVE_CONFIG[difficulty];
  const savedStats = getStats('sinewave', difficulty);

  const currentFreq = currentFreqIndex !== null ? config.bands[currentFreqIndex] : null;

  const handleTimeout = useCallback(() => {
    if (currentFreqIndex === null) return;
    setScore((prev) => ({ ...prev, total: prev.total + 1 }));
    recordAnswer('sinewave', difficulty, false);
    setFeedback(`⏰ Tempo scaduto! Era: ${config.bands[currentFreqIndex].freq}Hz (${config.bands[currentFreqIndex].name})`);
    setShowAnswer(true);
  }, [currentFreqIndex, config.bands, recordAnswer, difficulty]);

  // Timer logic
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || showAnswer) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          handleTimeout();
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showAnswer, handleTimeout]);

  const generateNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * config.bands.length);
    const freq = config.bands[randomIndex];

    setCurrentFreqIndex(randomIndex);
    setFeedback('');
    setShowAnswer(false);
    setTimeLeft(config.timeLimit);

    // Play sine wave
    playSineWave(freq.freq, 2);
  };

  const handleAnswer = (selectedIndex: number) => {
    if (currentFreqIndex === null || showAnswer) return;

    const isCorrect = selectedIndex === currentFreqIndex;

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    recordAnswer('sinewave', difficulty, isCorrect);

    if (isCorrect) {
      setFeedback(`✅ Corretto! Era ${config.bands[currentFreqIndex].freq}Hz (${config.bands[currentFreqIndex].name})`);
    } else {
      setFeedback(`❌ Sbagliato! Era ${config.bands[currentFreqIndex].freq}Hz (${config.bands[currentFreqIndex].name}), hai scelto ${config.bands[selectedIndex].freq}Hz`);
    }

    setShowAnswer(true);
    setTimeLeft(null);
  };

  const replayFrequency = () => {
    if (currentFreq) {
      playSineWave(currentFreq.freq, 2);
    }
  };

  const resetScore = () => {
    setScore({ correct: 0, total: 0 });
    setCurrentFreqIndex(null);
    setFeedback('');
    setShowAnswer(false);
    setTimeLeft(null);
    resetStreak();
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    resetScore();
  };

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Waves className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Sine Wave Training
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Riconosci frequenze pure per troubleshooting professionale
          </p>
        </div>

        {/* Difficulty Selector */}
        <div className="mb-6">
          <DifficultySelector difficulty={difficulty} onChange={handleDifficultyChange} />
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
            {config.description}
          </p>
        </div>

        {/* Stats Panel */}
        <div className="mb-6">
          <StatsPanel
            quizType="sinewave"
            currentCorrect={score.correct}
            currentTotal={score.total}
            currentStreak={currentStreak}
            bestStreak={savedStats.bestStreak}
            overallAccuracy={getOverallAccuracy('sinewave')}
            lastPlayed={savedStats.lastPlayed}
          />
        </div>

        {/* Current Session Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {score.correct}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Correct</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {score.total}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {accuracy}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Accuracy</div>
          </div>
        </div>

        {/* Timer */}
        {timeLeft !== null && !showAnswer && (
          <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl flex items-center justify-center gap-2">
            <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
              {timeLeft}s
            </span>
          </div>
        )}

        {/* Question Display */}
        {currentFreq && (
          <div className="mb-6 bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-800 text-center">
            <Waves className="w-16 h-16 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {config.showFrequency ? `${currentFreq.freq} Hz` : '???'}
            </h2>
            {currentFreq.note && config.showFrequency && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Nota musicale: {currentFreq.note}
              </p>
            )}
          </div>
        )}

        {/* Answer Options */}
        {currentFreqIndex !== null && !showAnswer && (
          <div className="mb-6 grid grid-cols-2 gap-3">
            {config.bands.map((band, index) => (
              <button
                key={band.freq}
                onClick={() => handleAnswer(index)}
                className="bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-900 dark:text-white py-4 px-6 rounded-xl font-semibold transition border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500"
              >
                <div className="text-lg">{band.freq} Hz</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{band.name}</div>
              </button>
            ))}
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-4 mb-6">
          {currentFreqIndex === null ? (
            <button
              onClick={generateNewQuestion}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Play className="w-5 h-5" />
              Start Quiz
            </button>
          ) : !showAnswer ? (
            <button
              onClick={replayFrequency}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Volume2 className="w-5 h-5" />
              Replay Sine Wave
            </button>
          ) : (
            <button
              onClick={generateNewQuestion}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Play className="w-5 h-5" />
              Next Question
            </button>
          )}

          <button
            onClick={resetScore}
            className="bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`mb-6 p-4 rounded-xl text-center font-semibold ${
              feedback.startsWith('✅')
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
            }`}
          >
            {feedback}
          </div>
        )}

        {/* Tips */}
        {currentFreqIndex === null && (
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 shrink-0" />
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <strong className="block mb-2">Come funziona:</strong>
                <ol className="space-y-1 list-decimal list-inside">
                  <li>Ascolta attentamente la sine wave pura</li>
                  <li>Cerca di memorizzare il "carattere" della frequenza</li>
                  <li>Le frequenze basse sono "growl", le alte sono "whistle"</li>
                  <li>Usa "Replay" se necessario (nessun limite)</li>
                  <li>Pro mode è blind - nessuna info sulla frequenza!</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};