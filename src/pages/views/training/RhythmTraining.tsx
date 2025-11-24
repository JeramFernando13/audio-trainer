/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { Play, RotateCcw, Volume2, Clock, TrendingUp,Drum } from 'lucide-react';   
import { useAudio } from '../../../hooks/useAudio';
import { useStats } from '../../../hooks/useStats';
import { DifficultySelector } from '../../../components/ui/DifficultySelector';
import { StatsPanel } from '../../../components/ui/StatsPanel';
import { RHYTHM_PATTERNS, RHYTHM_DIFFICULTY_CONFIG } from '../../../data/rhythms';
import { RhythmVisualizer } from '../../../components/rhythm/RhythmVisualizer';
import { Metronome } from '../../../components/rhythm/Metronome';
import { type Difficulty } from '../../../data/difficulty';

export const RhythmTraining = () => {
  const { playRhythm } = useAudio();
  const {
    currentStreak,
    recordAnswer,
    resetStreak,
    getStats,
    getOverallAccuracy,
  } = useStats();

  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [currentPatternIndex, setCurrentPatternIndex] = useState<number | null>(null);
  const [options, setOptions] = useState<typeof RHYTHM_PATTERNS>([]);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState<string>('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const config = RHYTHM_DIFFICULTY_CONFIG[difficulty];
  const availablePatterns = RHYTHM_PATTERNS.filter((p) => config.patterns.includes(p.name));
  const savedStats = getStats('rhythm', difficulty);

  const handleTimeout = useCallback(() => {
    if (currentPatternIndex === null) return;
    setScore((prev) => ({ ...prev, total: prev.total + 1 }));
    recordAnswer('rhythm' as any, difficulty, false);
    setFeedback(`⏰ Tempo scaduto! Era: ${options[currentPatternIndex].name}`);
    setShowAnswer(true);
  }, [currentPatternIndex, options, recordAnswer, difficulty]);

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

  const generateNewPattern = () => {
    if (availablePatterns.length < 4) return;

    // Pick random correct pattern
    const correctIndex = Math.floor(Math.random() * availablePatterns.length);
    const correct = availablePatterns[correctIndex];

    // Generate 3 wrong options
    const wrongOptions: typeof RHYTHM_PATTERNS = [];
    const otherPatterns = availablePatterns.filter((p) => p.name !== correct.name);

    while (wrongOptions.length < 3 && otherPatterns.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherPatterns.length);
      wrongOptions.push(otherPatterns.splice(randomIndex, 1)[0]);
    }

    // Shuffle all options
    const allOptions = [correct, ...wrongOptions].sort(() => Math.random() - 0.5);
    const correctIndexInOptions = allOptions.findIndex(p => p.name === correct.name);

    setCurrentPatternIndex(correctIndexInOptions);
    setOptions(allOptions);
    setFeedback('');
    setShowAnswer(false);
    setTimeLeft(config.timeLimit);

    // Play rhythm
    playRhythm(correct.pattern, correct.bpm);
  };

  const handleGuess = (index: number) => {
    if (currentPatternIndex === null || showAnswer) return;

    const isCorrect = index === currentPatternIndex;
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    recordAnswer('rhythm' as any, difficulty, isCorrect);

    if (isCorrect) {
      setFeedback('✅ Corretto!');
    } else {
      setFeedback(`❌ Sbagliato! Era: ${options[currentPatternIndex].name}`);
    }
    setShowAnswer(true);
    setTimeLeft(null);
  };

  const repeatPattern = () => {
    if (currentPatternIndex === null) return;
    const pattern = options[currentPatternIndex];
    playRhythm(pattern.pattern, pattern.bpm);
  };

  const resetScore = () => {
    setScore({ correct: 0, total: 0 });
    setCurrentPatternIndex(null);
    setOptions([]);
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
  const currentPattern = currentPatternIndex !== null ? options[currentPatternIndex] : null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Drum className="w-6 md:w-8 h-6 md:h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Rhythm Training
            </h1>
          </div>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Riconosci il pattern ritmico
          </p>
        </div>

        {/* Difficulty Selector */}
        <div className="mb-4">
          <DifficultySelector difficulty={difficulty} onChange={handleDifficultyChange} />
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
            {config.description}
          </p>
        </div>

        {/* Stats Panel */}
        <div className="mb-4">
          <StatsPanel
            quizType="rhythm"
            currentCorrect={score.correct}
            currentTotal={score.total}
            currentStreak={currentStreak}
            bestStreak={savedStats.bestStreak}
            overallAccuracy={getOverallAccuracy('rhythm')}
            lastPlayed={savedStats.lastPlayed}
          />
        </div>

        {/* Current Session Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl text-center">
            <div className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
              {score.correct}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Correct</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl text-center">
            <div className="text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400">
              {score.total}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-xl text-center">
            <div className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">
              {accuracy}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Accuracy</div>
          </div>
        </div>

        {/* Timer */}
        {timeLeft !== null && !showAnswer && (
          <div className="mb-4 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-xl flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-base md:text-lg font-bold text-yellow-600 dark:text-yellow-400">
              {timeLeft}s
            </span>
          </div>
        )}

        {/* Metronome */}
        {config.showMetronome && currentPattern && currentPatternIndex !== null && (
          <div className="mb-4">
            <Metronome bpm={currentPattern.bpm} timeSignature={currentPattern.timeSignature} />
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <button
            onClick={generateNewPattern}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg text-sm md:text-base"
          >
            <Play className="w-5 h-5" />
            {currentPatternIndex === null ? 'Start Quiz' : 'Next Question'}
          </button>

          {currentPatternIndex !== null && (
            <button
              onClick={repeatPattern}
              className="flex-1 md:flex-initial bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg text-sm md:text-base"
            >
              <Volume2 className="w-5 h-5" />
              Replay
            </button>
          )}

          <button
            onClick={resetScore}
            className="md:w-auto bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-lg text-sm md:text-base"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`mb-4 p-3 md:p-4 rounded-xl text-center text-sm md:text-base font-semibold ${
              feedback.startsWith('✅')
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
            }`}
          >
            {feedback}
          </div>
        )}

        {/* Rhythm Visualizer (if enabled and answered) */}
        {config.showVisual && showAnswer && currentPattern && (
          <div className="mb-4">
            <RhythmVisualizer pattern={currentPattern.pattern} showLabels={true} />
          </div>
        )}

        {/* Options */}
        {currentPatternIndex !== null && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {options.map((pattern, index) => (
              <button
                key={index}
                onClick={() => handleGuess(index)}
                disabled={showAnswer}
                className={`p-3 md:p-4 rounded-xl font-semibold transition border-2 text-left ${
                  showAnswer && index === currentPatternIndex
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-500'
                    : showAnswer
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-600 cursor-not-allowed'
                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                }`}
              >
                <div className="text-sm md:text-base">{pattern.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {pattern.timeSignature} • {pattern.bpm} BPM
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-500 mt-1">
                  {pattern.notation}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Tips */}
        {currentPatternIndex === null && (
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 md:p-6 rounded-xl">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 shrink-0" />
              <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
                <strong className="block mb-2">Tips:</strong>
                <ul className="space-y-1 list-disc list-inside">
                  <li><strong>Easy:</strong> Pattern base in 4/4</li>
                  <li><strong>Medium:</strong> Sincope e variazioni</li>
                  <li><strong>Hard:</strong> Terzine e pattern complessi</li>
                  <li><strong>Pro:</strong> Poliritmi e tempi dispari</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};