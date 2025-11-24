/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Play, RotateCcw, Volume2, Clock, TrendingUp, Waves } from 'lucide-react';
import { useAudio } from '../../../hooks/useAudio';
import { useStats } from '../../../hooks/useStats';
import { DifficultySelector } from '../../../components/ui/DifficultySelector';
import { StatsPanel } from '../../../components/ui/StatsPanel';
import { type Difficulty } from '../../../data/difficulty';

interface SineWaveBand {
  freq: number;
  name: string;
  note?: string;
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
    showFrequency: false, // ❌ HIDDEN durante quiz
    description: '4 frequenze • Nessun limite'
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
    showFrequency: false, // ❌ HIDDEN
    description: '8 frequenze • 15 secondi'
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
    showFrequency: false, // ❌ HIDDEN
    description: '12 frequenze • 10 secondi (40Hz-16kHz)'
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
    showFrequency: false, // ❌ HIDDEN
    description: '13 frequenze • 8 secondi • Blind (20Hz-20kHz)'
  }
};

export const SineWaveTraining = () => {
  const { playSineWave } = useAudio();
  const { currentStreak, recordAnswer, resetStreak, getStats, getOverallAccuracy } = useStats();

  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [currentFreqIndex, setCurrentFreqIndex] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const config = SINE_WAVE_CONFIG[difficulty];
  const savedStats = getStats('sinewave', difficulty);
  const currentFreq = currentFreqIndex !== null ? config.bands[currentFreqIndex] : null;

  const handleTimeout = () => {
    if (currentFreqIndex === null) return;
    setScore((prev) => ({ ...prev, total: prev.total + 1 }));
    recordAnswer('sinewave', difficulty, false);
    setFeedback(`⏰ Tempo scaduto! Era: ${config.bands[currentFreqIndex].freq}Hz (${config.bands[currentFreqIndex].name})`);
    setShowAnswer(true);
  };

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || showAnswer) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) { handleTimeout(); return null; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showAnswer]);

  const generateNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * config.bands.length);
    const freq = config.bands[randomIndex];
    setCurrentFreqIndex(randomIndex);
    setFeedback('');
    setShowAnswer(false);
    setTimeLeft(config.timeLimit);
    playSineWave(freq.freq, 2);
  };

  const handleAnswer = (selectedIndex: number) => {
    if (currentFreqIndex === null || showAnswer) return;
    const isCorrect = selectedIndex === currentFreqIndex;
    setScore((prev) => ({ correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1 }));
    recordAnswer('sinewave', difficulty, isCorrect);
    setFeedback(isCorrect 
      ? `✅ Corretto! Era ${config.bands[currentFreqIndex].freq}Hz (${config.bands[currentFreqIndex].name})` 
      : `❌ Sbagliato! Era ${config.bands[currentFreqIndex].freq}Hz (${config.bands[currentFreqIndex].name}), hai scelto ${config.bands[selectedIndex].freq}Hz`
    );
    setShowAnswer(true);
    setTimeLeft(null);
  };

  const replayFrequency = () => {
    if (currentFreq) playSineWave(currentFreq.freq, 2);
  };

  const resetScore = () => {
    setScore({ correct: 0, total: 0 });
    setCurrentFreqIndex(null);
    setFeedback('');
    setShowAnswer(false);
    setTimeLeft(null);
    resetStreak();
  };

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Waves className="w-6 md:w-8 h-6 md:h-8 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Sine Wave Training
            </h1>
          </div>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Riconosci frequenze pure
          </p>
        </div>

        <div className="mb-4">
          <DifficultySelector difficulty={difficulty} onChange={(d: Difficulty) => {
            setDifficulty(d);
            resetScore();
          }} />
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
            {config.description}
          </p>
        </div>

        <div className="mb-4">
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

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl text-center">
            <div className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">{score.correct}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Correct</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl text-center">
            <div className="text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400">{score.total}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-xl text-center">
            <div className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">{accuracy}%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Accuracy</div>
          </div>
        </div>

        {timeLeft !== null && !showAnswer && (
          <div className="mb-4 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-xl flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-base md:text-lg font-bold text-yellow-600 dark:text-yellow-400">{timeLeft}s</span>
          </div>
        )}

        {currentFreq && (
          <div className="mb-4 bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 md:p-8 border-2 border-blue-200 dark:border-blue-800 text-center">
            <Waves className="w-12 md:w-16 h-12 md:h-16 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
           
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              Ascolta e indovina la frequenza
            </p>
          </div>
        )}

        {currentFreqIndex !== null && !showAnswer && (
          <div className="mb-4 grid grid-cols-2 gap-2 md:gap-3">
            {config.bands.map((band, index) => (
              <button
                key={band.freq}
                onClick={() => handleAnswer(index)}
                className="bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-900 dark:text-white py-3 md:py-4 px-3 md:px-6 rounded-xl font-semibold transition border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500"
              >
                <div className="text-sm md:text-lg">{band.freq} Hz</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{band.name}</div>
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-3 mb-4">
          {currentFreqIndex === null ? (
            <button onClick={generateNewQuestion}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Start Quiz
            </button>
          ) : !showAnswer ? (
            <button onClick={replayFrequency}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2">
              <Volume2 className="w-5 h-5" />
              Replay
            </button>
          ) : (
            <button onClick={generateNewQuestion}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Next
            </button>
          )}
          <button onClick={resetScore}
            className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2">
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>

        {feedback && (
          <div className={`mb-4 p-3 md:p-4 rounded-xl text-center text-sm md:text-base font-semibold ${
            feedback.startsWith('✅') ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
          }`}>
            {feedback}
          </div>
        )}

        {currentFreqIndex === null && (
          <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 p-4 md:p-6 rounded-xl">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-1 shrink-0" />
              <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                <strong className="block mb-2">Come funziona:</strong>
                <ol className="space-y-1 list-decimal list-inside">
                  <li>Ascolta attentamente la sine wave</li>
                  <li>Memorizza il "carattere" della frequenza</li>
                  <li>Le frequenze basse = "growl", alte = "whistle"</li>
                  <li>Usa "Replay" se necessario</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};